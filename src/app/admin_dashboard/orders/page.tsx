"use client";

import React, { useMemo, useState, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

type Order = {
  id: string;
  customerName: string;
  amount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  date: string; // ISO
  items: { sku: string; name: string; qty: number; price: number }[];
};

const mockOrders: Order[] = [
  { id: "O-1001", customerName: "Alice Gomez", amount: 599, status: "Pending", date: "2025-08-01T10:12:00Z", items: [{ sku: "G-001", name: "Ruby Gemstone", qty: 1, price: 599 }] },
  { id: "O-1002", customerName: "Ben Turner", amount: 249, status: "Shipped", date: "2025-07-28T14:30:00Z", items: [{ sku: "G-003", name: "Topaz", qty: 1, price: 89 }, { sku: "J-003", name: "Silver Bracelet", qty: 1, price: 160 }] },
  { id: "O-1003", customerName: "Cathy Li", amount: 129, status: "Delivered", date: "2025-07-20T08:00:00Z", items: [{ sku: "J-002", name: "Gold Ring", qty: 1, price: 129 }] },
  { id: "O-1004", customerName: "Daniel Kim", amount: 199, status: "Pending", date: "2025-08-02T09:45:00Z", items: [{ sku: "G-002", name: "Sapphire Stone", qty: 1, price: 199 }] },
  { id: "O-1005", customerName: "Eva Stone", amount: 420, status: "Cancelled", date: "2025-07-15T11:20:00Z", items: [{ sku: "J-001", name: "Emerald Necklace", qty: 1, price: 420 }] },
  { id: "O-1006", customerName: "Frank Y", amount: 59, status: "Shipped", date: "2025-08-03T12:10:00Z", items: [{ sku: "J-003", name: "Silver Bracelet", qty: 1, price: 59 }] },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sort, setSort] = useState<string>("date_desc");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const chartsRef = useRef<HTMLDivElement | null>(null);

  const statuses = useMemo(() => ["All", "Pending", "Shipped", "Delivered", "Cancelled"], []);

  const filtered = useMemo(() => {
    let list = orders.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((o) => o.customerName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q));
    }
    if (statusFilter !== "All") list = list.filter((o) => o.status === statusFilter);
    // date range filter for table and charts
    if (startDate) {
      const s = new Date(startDate);
      list = list.filter((o) => new Date(o.date) >= s);
    }
    if (endDate) {
      // include the whole day for endDate
      const e = new Date(endDate);
      e.setHours(23, 59, 59, 999);
      list = list.filter((o) => new Date(o.date) <= e);
    }

    if (sort === "date_asc") list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    else if (sort === "date_desc") list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    else if (sort === "amount_asc") list.sort((a, b) => a.amount - b.amount);
    else if (sort === "amount_desc") list.sort((a, b) => b.amount - a.amount);

    return list;
  }, [orders, query, statusFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelect = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const selectAllOnPage = (checked: boolean) => {
    const pageIds = paged.map((p) => p.id);
    setSelected((s) => {
      const next = { ...s };
      pageIds.forEach((id) => (next[id] = checked));
      return next;
    });
  };

  const selectedIds = Object.keys(selected).filter((k) => selected[k]);

  const bulkUpdateStatus = () => {
    if (selectedIds.length === 0) return alert("No orders selected.");
    const newStatus = prompt("Enter new status (Pending, Shipped, Delivered, Cancelled):", "Shipped");
    if (!newStatus) return;
    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(newStatus)) return alert("Invalid status");
    setOrders((prev) => prev.map((o) => (selectedIds.includes(o.id) ? { ...o, status: newStatus as Order['status'] } : o)));
    setSelected({});
  };

  const exportCSV = (asExcel = false) => {
    const rows = [
      ["Order ID", "Customer", "Amount", "Status", "Date"],
      ...orders.map((o) => [o.id, o.customerName, o.amount.toString(), o.status, new Date(o.date).toISOString()]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = asExcel ? "orders.xls" : "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewDetails = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    alert(JSON.stringify(order, null, 2));
  };

  const changeStatus = (id: string) => {
    const newStatus = prompt("Set status (Pending, Shipped, Delivered, Cancelled):", "Shipped");
    if (!newStatus) return;
    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(newStatus)) return alert("Invalid status");
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus as Order['status'] } : o)));
  };

  const cancelOrder = (id: string) => {
    if (!confirm("Cancel this order?")) return;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o)));
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  // Chart datasets
  const ordersForCharts = useMemo(() => {
    // apply same filters (status/date) as above but independent of query
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (startDate && new Date(o.date) < new Date(startDate)) return false;
      if (endDate) {
        const e = new Date(endDate);
        e.setHours(23, 59, 59, 999);
        if (new Date(o.date) > e) return false;
      }
      return true;
    });
  }, [orders, statusFilter, startDate, endDate]);

  const ordersOverTime = useMemo(() => {
    const map: Record<string, number> = {};
    ordersForCharts.forEach((o) => {
      const d = new Date(o.date).toISOString().slice(0, 10); // YYYY-MM-DD
      map[d] = (map[d] || 0) + 1;
    });
    return Object.entries(map)
      .map(([date, count]) => ({ date, orders: count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [ordersForCharts]);

  const statusDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    ordersForCharts.forEach((o) => (map[o.status] = (map[o.status] || 0) + 1));
    return Object.entries(map).map(([status, count]) => ({ name: status, value: count }));
  }, [ordersForCharts]);

  const revenueByMonth = useMemo(() => {
    const map: Record<string, number> = {};
    ordersForCharts.forEach((o) => {
      const d = new Date(o.date);
      const key = d.toISOString().slice(0, 7); // YYYY-MM
      map[key] = (map[key] || 0) + o.amount;
    });
    return Object.entries(map)
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [ordersForCharts]);

  const CHART_COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#fb7185", "#7c3aed", "#06b6d4"];

  // export helpers for charts
  const exportChartCsv = (data: any[], fields: string[], filename: string) => {
    const rows = [fields, ...data.map((d) => fields.map((f) => {
      const v = (d as any)[f];
      if (v === null || v === undefined) return '';
      return String(v).replace(/"/g, '""');
    }))];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportChartPdf = (node: HTMLElement | null) => {
    if (!node) return alert('Nothing to export');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Charts</title><style>body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial;} .wrap{padding:20px;}</style></head><body><div class="wrap">${node.innerHTML}</div></body></html>`;
    const w = window.open('', '_blank');
    if (!w) return alert('Unable to open print window (popup blocked)');
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => exportCSV(false)} className="px-3 py-2 bg-gray-200 rounded">Export CSV</button>
            <button onClick={() => exportCSV(true)} className="px-3 py-2 bg-gray-200 rounded">Export Excel</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                className="border p-2 rounded w-full md:w-64"
                placeholder="Search by order ID or customer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <select className="border p-2 rounded" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select className="border p-2 rounded" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="date_desc">Newest</option>
                <option value="date_asc">Oldest</option>
                <option value="amount_desc">Amount High to Low</option>
                <option value="amount_asc">Amount Low to High</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={bulkUpdateStatus} className="px-3 py-2 bg-green-600 text-white rounded">Update Status (Bulk)</button>
              <button onClick={() => alert('Export selected (mock)')} className="px-3 py-2 bg-gray-200 rounded">Export Selected</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="p-2">
                    <input
                      type="checkbox"
                      onChange={(e) => selectAllOnPage(e.target.checked)}
                      checked={paged.every((p) => selected[p.id])}
                    />
                  </th>
                  <th className="p-2">Order ID</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="p-2"><input type="checkbox" checked={!!selected[o.id]} onChange={() => toggleSelect(o.id)} /></td>
                    <td className="p-2">{o.id}</td>
                    <td className="p-2">{o.customerName}</td>
                    <td className="p-2">${o.amount}</td>
                    <td className={`p-2 font-medium ${o.status === 'Pending' ? 'text-yellow-600' : o.status === 'Shipped' ? 'text-blue-600' : o.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>{o.status}</td>
                    <td className="p-2">{formatDate(o.date)}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button className="text-blue-600" onClick={() => viewDetails(o.id)}>View Details</button>
                        <button className="text-gray-600" onClick={() => changeStatus(o.id)}>Edit Status</button>
                        <button className="text-red-600" onClick={() => cancelOrder(o.id)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paged.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {Math.min(orders.length, (page - 1) * pageSize + 1)} - {Math.min(orders.length, page * pageSize)} of {filtered.length} results</div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <div className="px-3 py-1 border rounded">{page}</div>
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6" ref={chartsRef}>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Orders Over Time</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => exportChartCsv(ordersOverTime, ['date','orders'], 'orders_over_time.csv')} className="text-xs px-2 py-1 rounded bg-slate-100">CSV</button>
                <button onClick={() => exportChartCsv(ordersOverTime, ['date','orders'], 'orders_over_time.xls')} className="text-xs px-2 py-1 rounded bg-slate-100">Excel</button>
                <button onClick={() => exportChartPdf(chartsRef.current)} className="text-xs px-2 py-1 rounded bg-slate-100">PDF</button>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersOverTime} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#0ea5a4" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Order Status Distribution</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => exportChartCsv(statusDistribution, ['name','value'], 'order_status.csv')} className="text-xs px-2 py-1 rounded bg-slate-100">CSV</button>
                <button onClick={() => exportChartCsv(statusDistribution, ['name','value'], 'order_status.xls')} className="text-xs px-2 py-1 rounded bg-slate-100">Excel</button>
                <button onClick={() => exportChartPdf(chartsRef.current)} className="text-xs px-2 py-1 rounded bg-slate-100">PDF</button>
              </div>
            </div>
            <div className="h-56 flex items-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Revenue by Month</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => exportChartCsv(revenueByMonth, ['month','revenue'], 'revenue_by_month.csv')} className="text-xs px-2 py-1 rounded bg-slate-100">CSV</button>
                <button onClick={() => exportChartCsv(revenueByMonth, ['month','revenue'], 'revenue_by_month.xls')} className="text-xs px-2 py-1 rounded bg-slate-100">Excel</button>
                <button onClick={() => exportChartPdf(chartsRef.current)} className="text-xs px-2 py-1 rounded bg-slate-100">PDF</button>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByMonth} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-medium mb-3">Filters & Summary</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm">Date Range:</label>
                <input type="date" className="border p-2 rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <span className="text-sm">—</span>
                <input type="date" className="border p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm">Status:</label>
                <select className="border p-2 rounded" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="text-sm text-gray-600">
                <p>Total orders (filtered): {ordersForCharts.length}</p>
                <p>Total revenue (filtered): ${ordersForCharts.reduce((s, o) => s + o.amount, 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
