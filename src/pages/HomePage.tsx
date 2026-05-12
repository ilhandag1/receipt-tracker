import { useState } from 'react'
import { FileSpreadsheet, LogOut } from 'lucide-react'
import ReceiptForm from '../components/receipt/ReceiptForm'
import ReceiptList from '../components/receipt/ReceiptList'
import EditPage from './EditPage'
import { useReceiptStore } from '../store/receiptStore'
import { exportReceipts } from '../utils/exportXlsx'
import type { Receipt } from '../types/receipt'

export default function HomePage() {
  const { receipts, addReceipt, deleteReceipt } = useReceiptStore()
  const [editingReceipt, setEditingReceipt] = useState<Receipt | null>(null)

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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Fiş Yönetimi</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Fatura girişini tek ekranda hallet</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => exportReceipts(receipts)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Kaydet
            </button>
            <button
              onClick={() => alert('Çıkış özelliği henüz aktif değil.')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Çıkış
            </button>
          </div>
        </div>

        <section className="mb-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Fiş Ekle</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Tarih, mağaza ve tutar</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">Modern form</span>
          </div>
          <ReceiptForm onAdd={addReceipt} />
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Eklenmiş Faturalar</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Fatura tablosu</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="text-slate-500">Toplam fatura girdisi</div>
                <div className="mt-2 text-xl font-semibold text-slate-900">{receipts.length}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                <div className="text-slate-500">Toplam tutar</div>
                <div className="mt-2 text-xl font-semibold text-emerald-600">{receipts.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2)} €</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200">
            <ReceiptList receipts={receipts} onDelete={deleteReceipt} onEdit={setEditingReceipt} />
          </div>
        </section>
      </div>
    </div>
  )
}
