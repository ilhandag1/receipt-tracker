import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { Receipt } from '../types/receipt'
import { useReceiptStore } from '../store/receiptStore'

interface Props {
  receipt: Receipt
  onBack: () => void
}

export default function EditPage({ receipt, onBack }: Props) {
  const { stores, updateReceipt } = useReceiptStore()
  const [date, setDate] = useState(receipt.date)
  const [store, setStore] = useState(receipt.store)
  const [newStore, setNewStore] = useState('')
  const [amount, setAmount] = useState(receipt.amount.toString())
  const [showNewStore, setShowNewStore] = useState(!stores.includes(receipt.store))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const selectedStore = showNewStore ? newStore : store
    if (!date || !selectedStore || !amount) return

    updateReceipt({
      ...receipt,
      date,
      store: selectedStore,
      amount: Number(amount)
    })

    onBack()
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">Düzenle</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Fatura güncelle</h1>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Geri
          </button>
        </div>

        <section className="rounded-[32px] bg-white p-8 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-[220px_1fr_160px]">
              <label className="block text-sm font-medium text-slate-700">
                Tarih
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Alışveriş Yeri
                {!showNewStore ? (
                  <div className="mt-2 flex items-center gap-3">
                    <select
                      value={store}
                      onChange={(e) => setStore(e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="">Mağaza seçin</option>
                      {stores.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewStore(true)
                        setStore('')
                      }}
                      className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      + Yeni
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Mağaza adı"
                      value={newStore}
                      onChange={(e) => setNewStore(e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewStore(false)
                        setNewStore('')
                      }}
                      className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Seç
                    </button>
                  </div>
                )}
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Tutar (€)
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                İptal
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Kaydet
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
