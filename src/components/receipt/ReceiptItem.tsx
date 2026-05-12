import type { Receipt } from '../../types/receipt'
import { Edit3, Trash2 } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

interface Props {
  receipt: Receipt
  onDelete: (id: string) => void
  onEdit: (receipt: Receipt) => void
}

export default function ReceiptItem({ receipt, onDelete, onEdit }: Props) {
  const formattedDate = new Date(receipt.date).toLocaleDateString('tr-TR')

  return (
    <tr className="table-card-row transition hover:bg-slate-50">
      <td className="text-sm text-slate-700">{formattedDate}</td>
      <td className="text-sm text-slate-700">{receipt.store}</td>
      <td className="text-sm font-semibold text-slate-900">{formatCurrency(receipt.amount)}</td>
      <td className="text-right">
        <div className="inline-flex items-center gap-2 justify-end">
          <button
            onClick={() => onEdit(receipt)}
            className="btn-pill inline-flex items-center gap-2 bg-amber-300 text-slate-900 hover:bg-amber-400"
          >
            <Edit3 className="h-4 w-4" />
            Düzenle
          </button>
          <button
            onClick={() => onDelete(receipt.id)}
            className="btn-pill inline-flex items-center gap-2 bg-rose-500 text-white hover:bg-rose-600"
          >
            <Trash2 className="h-4 w-4" />
            Sil
          </button>
        </div>
      </td>
    </tr>
  )
}
