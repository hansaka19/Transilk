"use client";

import { useMemo, useState } from "react";

type Report = {
  id: string;
  type: "Sales" | "Product" | "Order";
  name: string;
  date: string;
  amount?: number;
  status?: "Pending" | "Shipped" | "Delivered" | "Cancelled";
};

const MOCK: Report[] = [
  { id: "R-001", type: "Sales", name: "January Sales", date: "2025-01-31", amount: 12450 },
  { id: "R-002", type: "Product", name: "Top Products Q1", date: "2025-03-31" },
  { id: "R-003", type: "Order", name: "Orders - March", date: "2025-03-31", amount: 5200, status: "Delivered" },
  { id: "R-004", type: "Sales", name: "April Sales", date: "2025-04-30", amount: 9780 },
  { id: "R-005", type: "Order", name: "Pending Orders", date: "2025-05-10", status: "Pending" },
];

function exportToCsv(filename: string, rows: object[]) {
  if (!rows || !rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map(r => keys.map(k => JSON.stringify((r as any)[k] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminReportsPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const filtered = useMemo(() => {
    return MOCK.filter(r => {
      if (typeFilter !== "All" && r.type !== typeFilter) return false;
      if (query && !`${r.name} ${r.id} ${r.type}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (fromDate && r.date < fromDate) return false;
      if (toDate && r.date > toDate) return false;
      return true;
    });
  }, [query, typeFilter, fromDate, toDate]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Reports</h1>
          <div className="flex gap-2">
            <button
              onClick={() => exportToCsv("reports.csv", filtered)}
              className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
              Export CSV
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700">
              Export Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search reports..."
            className="col-span-1 md:col-span-2 p-2 border rounded"
          />

          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="p-2 border rounded">
            <option>All</option>
            <option>Sales</option>
            <option>Product</option>
            <option>Order</option>
          </select>

          <div className="flex gap-2">
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="p-2 border rounded" />
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="p-2 border rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="col-span-2 bg-white p-4 rounded shadow-sm">
            <h2 className="font-medium mb-3">Reports</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2">{r.id}</td>
                    <td className="p-2">{r.name}</td>
                    <td className="p-2">{r.type}</td>
                    <td className="p-2">{r.date}</td>
                    <td className="p-2">{r.amount ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="font-medium mb-3">Charts</h2>
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center text-gray-500">Line chart placeholder</div>
            <div className="mt-3 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-500">Pie chart placeholder</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-medium mb-3">Details</h3>
          <p className="text-sm text-gray-600">Select a report to view details and export options — this is a mocked UI for the reports feature.</p>
        </div>
      </div>
    </div>
  );
}
