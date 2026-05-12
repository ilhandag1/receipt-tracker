import { create } from 'zustand'
import type { Receipt } from '../types/receipt'
import { db } from '../db/db'

interface ReceiptStore {
  receipts: Receipt[]
  stores: string[]
  loaded: boolean

  loadReceipts: () => Promise<void>
  addReceipt: (receipt: Receipt) => Promise<void>
  deleteReceipt: (id: string) => Promise<void>
  updateReceipt: (receipt: Receipt) => Promise<void>
  getStores: () => string[]
}

export const useReceiptStore = create<ReceiptStore>((set, get) => ({
  receipts: [],
  stores: [],
  loaded: false,

  loadReceipts: async () => {
    const receipts = await db.receipts.toArray()
    const stores = Array.from(new Set(receipts.map((r) => r.store))).sort()
    set({ receipts, stores, loaded: true })
  },

  addReceipt: async (receipt) => {
    await db.receipts.add(receipt)
    set((state) => {
      const stores = Array.from(new Set([...state.stores, receipt.store])).sort()
      return { receipts: [receipt, ...state.receipts], stores }
    })
  },

  deleteReceipt: async (id) => {
    await db.receipts.delete(id)
    set((state) => ({
      receipts: state.receipts.filter((r) => r.id !== id),
    }))
  },

  updateReceipt: async (receipt) => {
    await db.receipts.put(receipt)
    set((state) => {
      const receipts = state.receipts.map((r) => (r.id === receipt.id ? receipt : r))
      const stores = Array.from(new Set(receipts.map((r) => r.store))).sort()
      return { receipts, stores }
    })
  },

  getStores: () => get().stores,
}))