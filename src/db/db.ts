import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { Receipt } from '../types/receipt'

class ReceiptDatabase extends Dexie {
  receipts!: Table<Receipt>

  constructor() {
    super('receiptDB')

    this.version(1).stores({
      receipts: 'id,date,store,amount,createdAt'
    })
  }
}

export const db = new ReceiptDatabase()