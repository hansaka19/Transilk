"use client";

import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  stock: number;
  images?: string[];
  sales?: number; // sample sales metric for charts
};

const initialProducts: Product[] = [
  { id: "1", sku: "G-001", name: "Ruby Gemstone", category: "Gemstone", price: 299, stock: 12, sales: 120 },
  { id: "2", sku: "J-001", name: "Emerald Necklace", category: "Jewellery", price: 499, stock: 5, sales: 88 },
  { id: "3", sku: "G-002", name: "Sapphire Stone", category: "Gemstone", price: 199, stock: 0, sales: 45 },
  { id: "4", sku: "J-002", name: "Gold Ring", category: "Jewellery", price: 129, stock: 24, sales: 150 },
  { id: "5", sku: "G-003", name: "Topaz", category: "Gemstone", price: 89, stock: 42, sales: 60 },
  { id: "6", sku: "J-003", name: "Silver Bracelet", category: "Jewellery", price: 59, stock: 8, sales: 30 },
  { id: "7", sku: "G-004", name: "Aquamarine", category: "Gemstone", price: 219, stock: 3, sales: 20 },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("newest");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const categories = useMemo(() => ["All", "Gemstone", "Jewellery"], []);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "stock_asc") list.sort((a, b) => a.stock - b.stock);
    else if (sort === "stock_desc") list.sort((a, b) => b.stock - a.stock);
    else if (sort === "name_asc") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name_desc") list.sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [products, query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelect = (id: string) => {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  };

  const selectAllOnPage = (checked: boolean) => {
    const pageIds = paged.map((p) => p.id);
    setSelected((s) => {
      const next = { ...s };
      pageIds.forEach((id) => (next[id] = checked));
      return next;
    });
  };

  const selectedIds = Object.keys(selected).filter((k) => selected[k]);

  const bulkDelete = () => {
    if (selectedIds.length === 0) return alert("No products selected.");
    if (!confirm(`Delete ${selectedIds.length} selected products? This action cannot be undone.`)) return;
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelected({});
  };

  const exportCSV = (asExcel = false) => {
    const rows = [
      ["SKU", "Name", "Category", "Price", "Stock"],
      ...products.map((p) => [p.sku, p.name, p.category, p.price.toString(), p.stock.toString()]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = asExcel ? "products.xls" : "products.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteOne = (id: string) => {
    if (!confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelected((s) => ({ ...s, [id]: false }));
  };

  // Chart datasets derived from products
  const productsByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => (map[p.category] = (map[p.category] || 0) + 1));
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  }, [products]);

  const topSelling = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      .slice(0, 6)
      .map((p) => ({ name: p.name, sales: p.sales || 0 }));
  }, [products]);

  const stockLevels = useMemo(() => {
    return products.map((p) => ({ name: p.name, stock: p.stock }));
  }, [products]);

  const CHART_COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#fb7185", "#7c3aed", "#06b6d4"];

  // helper to export arbitrary chart datasets to CSV/Excel
  const exportChartCsv = (data: any[], fields: string[], filename: string) => {
    if (!Array.isArray(data) || data.length === 0) {
      const header = fields.join(',');
      const blob = new Blob([header + '\n'], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const rows = [fields, ...data.map((d) => fields.map((f) => {
      const v = (d as any)[f];
      if (v === null || v === undefined) return '';
      return String(v).replace(/"/g, '""');
    }))];

    const csv = rows
      .map((r) => r.map((v) => `"${v}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 bg-blue-600 text-white rounded">Add Product</button>
            <button onClick={() => exportCSV(false)} className="px-3 py-2 bg-gray-200 rounded">Export CSV</button>
            <button onClick={() => exportCSV(true)} className="px-3 py-2 bg-gray-200 rounded">Export Excel</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                className="border p-2 rounded w-full md:w-64"
                placeholder="Search by name or SKU"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <select className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select className="border p-2 rounded" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Sort: Default</option>
                <option value="name_asc">Name A-Z</option>
                <option value="name_desc">Name Z-A</option>
                <option value="price_asc">Price Low to High</option>
                <option value="price_desc">Price High to Low</option>
                <option value="stock_asc">Stock Low to High</option>
                <option value="stock_desc">Stock High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="px-3 py-2 bg-red-600 text-white rounded"
                onClick={bulkDelete}
              >
                Delete Selected
              </button>
              <button
                className="px-3 py-2 bg-green-600 text-white rounded"
                onClick={() => alert('Update stock action (mock)')}
              >
                Update Stock
              </button>
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
                  <th className="p-2">SKU</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">
                      <input type="checkbox" checked={!!selected[p.id]} onChange={() => toggleSelect(p.id)} />
                    </td>
                    <td className="p-2">{p.sku}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">${p.price}</td>
                    <td className={`p-2 ${p.stock === 0 ? "text-red-600" : ""}`}>{p.stock}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button className="text-blue-600" onClick={() => alert('Edit ' + p.id)}>Edit</button>
                        <button className="text-gray-600" onClick={() => alert('View ' + p.id)}>View</button>
                        <button className="text-red-600" onClick={() => deleteOne(p.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paged.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {Math.min(products.length, (page - 1) * pageSize + 1)} - {Math.min(products.length, page * pageSize)} of {filtered.length} results</div>

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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Products by Category</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => exportChartCsv(productsByCategory, ["category","count"], "products_by_category.csv")} className="text-xs px-2 py-1 rounded bg-slate-100">CSV</button>
                <button onClick={() => exportChartCsv(productsByCategory, ["category","count"], "products_by_category.xls")} className="text-xs px-2 py-1 rounded bg-slate-100">Excel</button>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productsByCategory} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0ea5a4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Top Selling Products</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => exportChartCsv(topSelling, ["name","sales"], "top_selling.csv")} className="text-xs px-2 py-1 rounded bg-slate-100">CSV</button>
                <button onClick={() => exportChartCsv(topSelling, ["name","sales"], "top_selling.xls")} className="text-xs px-2 py-1 rounded bg-slate-100">Excel</button>
              </div>
            </div>
            <div className="h-56 flex items-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={topSelling} dataKey="sales" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {topSelling.map((entry, index) => (
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
              <h3 className="text-lg font-medium">Stock Levels</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => exportChartCsv(stockLevels, ["name","stock"], "stock_levels.csv")} className="text-xs px-2 py-1 rounded bg-slate-100">CSV</button>
                <button onClick={() => exportChartCsv(stockLevels, ["name","stock"], "stock_levels.xls")} className="text-xs px-2 py-1 rounded bg-slate-100">Excel</button>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockLevels} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-medium mb-2">Summary</h3>
            <div className="text-sm text-gray-600">
              <p>Total products: {products.length}</p>
              <p>Categories: {productsByCategory.length}</p>
              <p>Out of stock: {products.filter((p) => p.stock === 0).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
