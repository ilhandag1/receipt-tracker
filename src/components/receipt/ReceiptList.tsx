import type { Receipt } from '../../types/receipt'
import ReceiptItem from './ReceiptItem'

interface Props {
  receipts: Receipt[]
  onDelete: (id: string) => void
  onEdit: (receipt: Receipt) => void
}

export default function ReceiptList({ receipts, onDelete, onEdit }: Props) {
  if (receipts.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-slate-500">
        Henüz fatura eklenmedi. Sol taraftaki formu kullanarak hızlıca ekleyebilirsiniz.
      </div>
    )
  }

  return (
    <table className="min-w-full table-separated text-left">
      <thead className="table-head">
        <tr>
          <th>Tarih</th>
          <th>Alışveriş Yeri</th>
          <th>Tutar</th>
          <th className="text-right">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {receipts.map((receipt) => (
          <ReceiptItem
            key={receipt.id}
            receipt={receipt}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  )
}
