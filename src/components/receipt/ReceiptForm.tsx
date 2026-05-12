import { useState } from 'react'
import type { Receipt } from '../../types/receipt'
import { useReceiptStore } from '../../store/receiptStore'

interface Props {
  onAdd: (receipt: Receipt) => void
}

export default function ReceiptForm({ onAdd }: Props) {
  const { stores } = useReceiptStore()
  const [date, setDate] = useState('')
  const [store, setStore] = useState('')
  const [newStore, setNewStore] = useState('')
  const [amount, setAmount] = useState('')
  const [showNewStore, setShowNewStore] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const selectedStore = showNewStore ? newStore : store
    if (!date || !selectedStore || !amount) return

    onAdd({
      id: crypto.randomUUID(),
      date,
      store: selectedStore,
      amount: Number(amount),
      createdAt: new Date().toISOString()
    })

    setAmount('')
    setStore('')
    setNewStore('')
    setShowNewStore(false)
    setDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
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
                autoFocus
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
            placeholder="85,30"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-pill inline-flex items-center justify-center bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Ekle
        </button>
      </div>
    </form>
  )
}
