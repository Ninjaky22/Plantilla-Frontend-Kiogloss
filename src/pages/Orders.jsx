import { useEffect, useState } from 'react'
import api from '../services/api'

const STATUS_MAP = {
  P: 'En Preparacion',
  E: 'En Camino',
  C: 'Entregado'
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0) // backend is 0-based
  const [pages, setPages] = useState(1)
  const [statusKey, setStatusKey] = useState(null)
  const [dateInitial, setDateInitial] = useState('')
  const [dateFinal, setDateFinal] = useState('')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access') || localStorage.getItem('accessToken')
      if (!token) {
        setOrders([])
        setLoading(false)
        return
      }

      const params = {
        page,
        statusOrder: statusKey ? STATUS_MAP[statusKey] : undefined,
        rangeDate_after: dateInitial || undefined,
        rangeDate_before: dateFinal || undefined
      }

      const resp = await api.get('/user/orders', { params, headers: { Authorization: `Bearer ${token}` } })
      const data = resp.data || {}
      const list = data.content || data.results || []
      setOrders(list)
      setPages(data.totalPages ?? data.pages ?? 1)
    } catch (e) {
      console.error('Error fetching orders', e)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusKey, dateInitial, dateFinal])

  const changePage = (newPage) => {
    if (newPage < 0 || newPage >= pages) return
    setPage(newPage)
  }

  const exportJSON = (order) => {
    const blob = new Blob([JSON.stringify(order, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `order-${order.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = async (order) => {
    try {
      // import jspdf and autotable, handle different module shapes
      const jspdfModule = await import('jspdf')
      const jsPDF = jspdfModule.jsPDF || jspdfModule.default || jspdfModule
      // import autotable plugin which augments jsPDF prototype
      await import('jspdf-autotable')

      if (!jsPDF) throw new Error('jsPDF not found after import')

      // Build the table data matching the user's layout
      const urlImage = '/img/logot.7ed45b26.png'
      const items = order.shopping || order.products || order.items || []
      const vm = (items || []).map(compra => ({
        descripcion: `${compra.title || compra.name || ''}\n Talla: ${compra.size || ''}, Color: ${compra.color || ''}`,
        cantidad: compra.quantity || compra.qty || 1,
        precioUnitario: `${compra.price ?? compra.unitPrice ?? ''}$`,
        importe: `${compra.priceXquantity ?? ( (compra.price || 0) * (compra.quantity || 1) ) }$`
      }))

      const columns = [
        { title: 'Descripcion', dataKey: 'descripcion' },
        { title: 'Cantidad', dataKey: 'cantidad' },
        { title: 'Precio Unitario', dataKey: 'precioUnitario' },
        { title: 'Importe', dataKey: 'importe' }
      ]

      // create doc using points as unit for more precise layout
      const doc = new jsPDF('p', 'pt')

      try {
        // add logo (if available)
        doc.addImage(urlImage, 'PNG', 40, 30, 94.5, 90.75)
      } catch (imgErr) {
        // image might not exist or fail to load in dev; ignore
        console.warn('Could not load invoice logo image:', imgErr)
      }

      doc.setFont('helvetica', 'bold')
      doc.text(`Factura N°${order.id}`, 450, 40)
      doc.text(order.date || '', 450, 60)
      doc.setFont('times', 'italic')
      doc.setFontSize(30)
      doc.text('Sueño de Mujer', 150, 60)
      doc.setFontSize(15)
      doc.text('3123655485', 150, 80)
      doc.text('email@empresa.com', 150, 100)

      doc.setFontSize(10)
      doc.text('El éxito es la suma de pequeños esfuerzos, repetidos día tras día (Robert Collier)', 60, 750)
      doc.text('Gracias por Su compra, Vuelva Pronto', 175, 770)

      // First small table: Facturar a
      const facturaBody = [
        [order.user?.name || ''],
        [order.user?.phoneNumber || order.user?.phone || ''],
        [order.user?.address || '']
      ]

      if (typeof doc.autoTable === 'function') {
        // Try UMD fallback: import the UMD build of jspdf and re-import autotable
        try {
          const jspdfUMD = await import('jspdf/dist/jspdf.umd')
          const jsPDF2 = jspdfUMD.jsPDF || jspdfUMD.default || jspdfUMD
          // re-import autotable which should attach to the prototype used by the UMD build
          await import('jspdf-autotable')
          const doc2 = new jsPDF2('p', 'pt')
          if (typeof doc2.autoTable === 'function') {
            // @ts-ignore
            doc2.autoTable({
              head: [['Facturar a']],
              body: facturaBody,
              headStyles: { fillColor: [118, 32, 139] },
              bodyStyles: { textColor: [0, 0, 0] },
              tableWidth: 150,
              margin: { top: 90, left: 404 }
            })

            // @ts-ignore
            doc2.autoTable({
              columns: columns,
              body: vm,
              headStyles: { fillColor: [118, 32, 139] },
              margin: { top: 250 },
              bodyStyles: { textColor: [0, 0, 0] }
            })
            // use doc2
            doc2.save(`factura-${order.id}.pdf`)
            return
          }
        } catch (umderr) {
          console.warn('UMD jspdf/autotable fallback failed:', umderr)
        }
        // head as single column table
        // @ts-ignore
        doc.autoTable({
          head: [['Facturar a']],
          body: facturaBody,
          headStyles: { fillColor: [118, 32, 139] },
          bodyStyles: { textColor: [0, 0, 0] },
          tableWidth: 150,
          margin: { top: 90, left: 404 }
        })

        // Main products table
        // @ts-ignore
        doc.autoTable({
          columns: columns,
          body: vm,
          headStyles: { fillColor: [118, 32, 139] },
          margin: { top: 250 },
          bodyStyles: { textColor: [0, 0, 0] }
        })
      } else {
        // fallback simple rendering
        let y = 120
        vm.forEach(row => {
          doc.text(row.descripcion.replace(/\n/g, ' '), 40, y)
          doc.text(String(row.cantidad), 350, y)
          doc.text(String(row.precioUnitario), 420, y)
          doc.text(String(row.importe), 500, y)
          y += 18
        })
      }

      // Totals block
      const subtotal = Number(order.amount ?? order.total ?? 0)
      const envio = 3
      const total = subtotal + envio

      if (typeof doc.autoTable === 'function') {
        // small table for totals at right side
        // @ts-ignore
        doc.autoTable({
          body: [
            ['Subtotal', subtotal],
            ['Valor del envio', `${envio}$`],
            ['Total', total]
          ],
          tableWidth: 150,
          columnStyles: {
            0: { halign: 'center', fillColor: [118, 32, 139], textColor: [255, 255, 255] },
            1: { halign: 'center', fillColor: [243, 196, 255], textColor: [0, 0, 0] }
          },
          margin: { left: 404 }
        })
      } else {
        doc.text(`Subtotal: ${subtotal}`, 404, 600)
        doc.text(`Valor del envio: ${envio}$`, 404, 620)
        doc.text(`Total: ${total}`, 404, 640)
      }

      doc.save(`factura-${order.id}.pdf`)
    } catch (e) {
      console.warn('Error generating PDF (jspdf/autotable):', e)
      // fallback to JSON download
      exportJSON(order)
      alert('PDF export no disponible. Se descargó JSON en su lugar. Para habilitar PDF instale: npm i jspdf jspdf-autotable')
    }
  }

  return (
    <div className="container pb-16">
      <div className="header flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Pedidos</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm">Fecha Inicial</label>
            <input type="date" value={dateInitial} onChange={e => setDateInitial(e.target.value)} className="input-box" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Fecha Final</label>
            <input type="date" value={dateFinal} onChange={e => setDateFinal(e.target.value)} className="input-box" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-2">Estado</h3>
        <div className="flex gap-3">
          <button onClick={() => setStatusKey('P')} className={`py-1 px-3 rounded ${statusKey === 'P' ? 'bg-primary text-white' : 'border'}`}>En Preparacion</button>
          <button onClick={() => setStatusKey('E')} className={`py-1 px-3 rounded ${statusKey === 'E' ? 'bg-primary text-white' : 'border'}`}>En Camino</button>
          <button onClick={() => setStatusKey('C')} className={`py-1 px-3 rounded ${statusKey === 'C' ? 'bg-primary text-white' : 'border'}`}>Entregado</button>
          <button onClick={() => setStatusKey(null)} className="py-1 px-3 rounded border">Todos</button>
        </div>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">No tienes Pedidos</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order, idx) => (
              <div key={order.id || idx} className="bg-white shadow rounded p-4 relative">
                <h4 className="font-medium">Factura N°{order.id}</h4>
                <p className="text-sm text-gray-500">Fecha: {order.date || order.createdAt || ''}</p>
                <p className="mt-2 font-semibold">Valor Total: {order.amount ?? order.total ?? ''}</p>
                <div className="mt-2">
                  <p className="font-medium">Productos:</p>
                  <ol className="ml-4 list-decimal">
                    {(order.shopping || order.products || order.items || []).map((p, i) => (
                      <li key={i}>{p.title || p.name || p.productName || ''}</li>
                    ))}
                  </ol>
                </div>
                <p className="mt-2">Estado: {order.status || ''}</p>
                <div className="absolute right-4 bottom-4 flex gap-2">
                  <button onClick={() => exportPDF(order)} className="py-1 px-3 bg-[#ef4444] text-white rounded">PDF</button>
                  <button onClick={() => exportJSON(order)} className="py-1 px-3 border rounded">JSON</button>
                </div>
              </div>
            ))}
          </div>

          {pages > 1 && (
            <nav className="pagination mt-8 flex justify-center items-center gap-3">
              <button onClick={() => changePage(page - 1)} className="text-2xl">◀</button>
              {[...Array(pages)].map((_, i) => (
                <button key={i} onClick={() => changePage(i)} className={`px-3 py-1 rounded ${page === i ? 'bg-primary text-white' : 'border'}`}>{i + 1}</button>
              ))}
              <button onClick={() => changePage(page + 1)} className="text-2xl">▶</button>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
