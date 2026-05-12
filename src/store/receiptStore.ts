import { create } from 'zustand'
import type { Receipt } from '../types/receipt'

interface ReceiptStore {
  receipts: Receipt[]
  stores: string[]

  setReceipts: (receipts: Receipt[]) => void

  addReceipt: (receipt: Receipt) => void

  deleteReceipt: (id: string) => void

  updateReceipt: (receipt: Receipt) => void

  addStore: (store: string) => void

  getStores: () => string[]
}

export const useReceiptStore = create<ReceiptStore>((set, get) => ({
  receipts: [],
  stores: [],

  setReceipts: (receipts) => set({ receipts }),

  addReceipt: (receipt) =>
    set((state) => {
      const stores = new Set(state.stores)
      stores.add(receipt.store)
      return {
        receipts: [receipt, ...state.receipts],
        stores: Array.from(stores).sort()
      }
    }),

  deleteReceipt: (id) =>
    set((state) => ({
      receipts: state.receipts.filter((r) => r.id !== id)
    })),

  updateReceipt: (receipt) =>
    set((state) => {
      const stores = new Set(state.stores)
      stores.add(receipt.store)
      return {
        receipts: state.receipts.map((r) =>
          r.id === receipt.id ? receipt : r
        ),
        stores: Array.from(stores).sort()
      }
    }),

  addStore: (store) =>
    set((state) => {
      const stores = new Set(state.stores)
      stores.add(store)
      return {
        stores: Array.from(stores).sort()
      }
    }),

  getStores: () => get().stores
}))