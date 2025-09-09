"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

type Overview = {
  totalSales: number;
  totalProducts: number;
  ordersPending: number;
  customers: number;
};

const mockProducts = [
  { id: "P-001", name: "Ruby Gemstone", price: 299, stock: 12 },
  { id: "P-002", name: "Emerald Necklace", price: 499, stock: 5 },
  { id: "P-003", name: "Sapphire Ring", price: 199, stock: 0 },
];

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const chartsRef = useRef<HTMLDivElement | null>(null);

  // Sample chart data
  const [salesData, setSalesData] = useState(
    [
      { month: "Jan", sales: 5400 },
      { month: "Feb", sales: 4300 },
      { month: "Mar", sales: 5200 },
      { month: "Apr", sales: 6100 },
      { month: "May", sales: 7200 },
      { month: "Jun", sales: 6800 },
      { month: "Jul", sales: 7900 },
      { month: "Aug", sales: 8300 },
      { month: "Sep", sales: 7600 },
      { month: "Oct", sales: 8800 },
      { month: "Nov", sales: 9400 },
      { month: "Dec", sales: 10200 },
    ] as { month: string; sales: number }[]
  );

  const [ordersStatus, setOrdersStatus] = useState(
    [
      { name: "Pending", value: 24 },
      { name: "Shipped", value: 68 },
      { name: "Delivered", value: 410 },
      { name: "Cancelled", value: 12 },
    ] as { name: string; value: number }[]
  );

  const [productsByCategory] = useState(
    [
      { category: "Gemstone", count: 78 },
      { category: "Jewellery", count: 50 },
    ] as { category: string; count: number }[]
  );

  const [live, setLive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverview({ totalSales: 12540, totalProducts: 128, ordersPending: 7, customers: 842 });
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Simulate live updates for sales when enabled
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setSalesData((prev) => {
        const next = prev.map((d) => ({ ...d }));
        // bump last month randomly
        const idx = Math.floor(Math.random() * next.length);
        next[idx].sales = Math.max(0, Math.round(next[idx].sales * (0.9 + Math.random() * 0.3)));
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [live]);

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="px-3 py-1 rounded bg-blue-600 text-white">New Product</button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="text-sm">Admin</div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6" ref={chartsRef}>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">Sales Trends</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => exportCsv(salesData, ['month','sales'], 'sales_trends.csv')}
                className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
              >CSV</button>
              <button
                onClick={() => exportPrintable(chartsRef.current)}
                className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
              >PDF</button>
              <label className="flex items-center gap-1 text-sm">
                <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} />
                <span className="text-xs">Live</span>
              </label>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#0ea5a4" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">Orders by Status</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => exportCsv(ordersStatus, ['name','value'], 'orders_status.csv')} className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">CSV</button>
              <button onClick={() => exportPrintable(chartsRef.current)} className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">PDF</button>
            </div>
          </div>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={ordersStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {ordersStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">Products by Category</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => exportCsv(productsByCategory, ['category','count'], 'products_by_category.csv')} className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">CSV</button>
              <button onClick={() => exportPrintable(chartsRef.current)} className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">PDF</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productsByCategory} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-3">Summary</h3>
          <div className="text-sm text-gray-600">
            <p>Sales and orders preview. Use CSV to export chart data or toggle Live for simulated real-time updates.</p>
          </div>
        </div>

  </section>

  <section className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-3">Recent Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="p-2">SKU</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">${p.price}</td>
                  <td className={`p-2 ${p.stock === 0 ? "text-red-600" : ""}`}>{p.stock}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <a className="text-blue-600">Edit</a>
                      <a className="text-red-600">Delete</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </div>
  );
}

// Helpers
const PIE_COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#fb7185"];

function exportCsv(data: any[], keys: string[], filename = "export.csv") {
  const rows = [keys.join(",")];
  data.forEach((d) => {
    const row = keys.map((k) => {
      const v = d[k as keyof typeof d];
      if (v === null || v === undefined) return "";
      return String(v).replace(/"/g, '""');
    });
    rows.push(row.join(","));
  });
  const csv = rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportPrintable(node: HTMLElement | null) {
  if (!node) return alert("Nothing to print.");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Charts</title><style>body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial;} .chart-wrap{padding:20px;}</style></head><body><div class="chart-wrap">${node.innerHTML}</div></body></html>`;
  const w = window.open("", "_blank");
  if (!w) return alert("Unable to open print window (popup blocked)");
  w.document.write(html);
  w.document.close();
  setTimeout(() => {
    w.print();
  }, 500);
}
