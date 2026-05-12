import type { Receipt } from '../../types/receipt'
import { formatCurrency } from '../../utils/formatCurrency'

interface Props {
  receipts: Receipt[]
}

export default function ReceiptStats({ receipts }: Props) {
  const total = receipts.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <div className="grid grid-cols-1 gap-4 rounded-[32px] bg-slate-50 p-4 sm:grid-cols-2">
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Toplam Fatura</div>
        <div className="mt-3 text-3xl font-semibold text-slate-900">{receipts.length}</div>
      </div>
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Toplam Tutar</div>
        <div className="mt-3 text-3xl font-semibold text-emerald-600">{formatCurrency(total)}</div>
      </div>
    </div>
  )
}
