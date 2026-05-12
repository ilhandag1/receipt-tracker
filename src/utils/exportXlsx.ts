import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import type { Receipt } from '../types/receipt'

export async function exportReceipts(receipts: Receipt[]) {
  if (receipts.length === 0) {
    alert('Dışa aktarılacak fatura yok!')
    return
  }

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Faturalar')

  worksheet.columns = [
    {
      header: 'Tarih',
      key: 'date',
      width: 15
    },
    {
      header: 'Alışveriş Yeri',
      key: 'store',
      width: 30
    },
    {
      header: 'Tutar (€)',
      key: 'amount',
      width: 15
    }
  ]

  // Başlık stilini ayarla
  worksheet.getRow(1).font = { bold: true }
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  }

  // Faturalar kronolojik sırada
  const sorted = [...receipts].sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  )

  sorted.forEach((receipt) => {
    worksheet.addRow({
      date: new Date(receipt.date).toLocaleDateString('de-DE'),
      store: receipt.store,
      amount: receipt.amount.toFixed(2)
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const timestamp = new Date().toLocaleDateString('de-DE').replace(/\./g, '-')
  const filename = `Faturalar-${timestamp}.xlsx`

  saveAs(
    new Blob([buffer]),
    filename
  )
}