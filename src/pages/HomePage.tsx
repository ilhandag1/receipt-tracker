import { useEffect, useState } from 'react'
import { FileSpreadsheet } from 'lucide-react'
import ReceiptForm from '../components/receipt/ReceiptForm'
import ReceiptList from '../components/receipt/ReceiptList'
import EditPage from './EditPage'
import { useReceiptStore } from '../store/receiptStore'
import { exportReceipts } from '../utils/exportXlsx'
import type { Receipt } from '../types/receipt'

export default function HomePage() {
  const { receipts, addReceipt, deleteReceipt, loadReceipts, loaded } = useReceiptStore()
  const [editingReceipt, setEditingReceipt] = useState<Receipt | null>(null)

  useEffect(() => {
    if (!loaded) loadReceipts()
  }, [])

  const totalAmount = receipts.reduce((acc, cur) => acc + cur.amount, 0)

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-400">Yükleniyor...</p>
      </div>
    )
  }

  if (editingReceipt) {
    return (
      <EditPage
        receipt={editingReceipt}
        onBack={() => setEditingReceipt(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h1 className="text-base font-semibold text-slate-800">Fatura Ekle</h1>
            <button
              onClick={() => exportReceipts(receipts)}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Kaydet
            </button>
          </div>
          <div className="px-6 py-5">
            <ReceiptForm onAdd={addReceipt} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-800">Eklenmiş Faturalar</h2>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>
                <span className="font-semibold text-slate-800">{receipts.length}</span> fatura
              </span>
              <span className="text-slate-300">|</span>
              <span>
                Toplam:{' '}
                <span className="font-semibold text-emerald-600">
                  {totalAmount.toFixed(2)} €
                </span>
              </span>
            </div>
          </div>
          <ReceiptList
            receipts={receipts}
            onDelete={deleteReceipt}
            onEdit={setEditingReceipt}
          />
        </div>

      </div>
    </div>
  )
}