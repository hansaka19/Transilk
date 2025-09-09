"use client";

import React, { useEffect, useState, useRef } from "react";

type Banner = {
  id: string;
  page: string;
  title: string;
  image?: string; // data URL or external
  alt?: string;
  active: boolean;
};

const DEFAULT_KEY = "admin_banners_v1";

const initial: Banner[] = [
  { id: "b1", page: "Home", title: "Summer Gems", image: "https://picsum.photos/seed/b1/1200/500", alt: "Summer Gems", active: true },
  { id: "b2", page: "Jewellery", title: "Gold Collection", image: "https://picsum.photos/seed/b2/1200/500", alt: "Gold Collection", active: false },
  { id: "b3", page: "Gemstones", title: "Exclusive Rings", image: "https://picsum.photos/seed/b3/1200/500", alt: "Exclusive Rings", active: false },
];

const PAGES = ["Home", "Gemstones", "Jewellery", "Auctions", "Contact"];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initial);

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dragIndex = useRef<number | null>(null);

  // form / edit state
  const [editing, setEditing] = useState<Banner | null>(null);
  const [formPage, setFormPage] = useState<string>(PAGES[0]);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formAlt, setFormAlt] = useState<string>("");
  const [formImage, setFormImage] = useState<string | undefined>(undefined);
  const [formActive, setFormActive] = useState<boolean>(true);

  // carousel
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<number | null>(null);

  useEffect(() => {
    // local persistence
    try { localStorage.setItem(DEFAULT_KEY, JSON.stringify(banners)); } catch {}
  }, [banners]);

  // fetch server-side persisted banners (if running in dev with file API)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/banners');
        if (!res.ok) throw new Error('no api');
        const j = await res.json();
        if (mounted && Array.isArray(j.data)) setBanners(j.data);
      } catch (e) {
        // fallback to localStorage if present
        try {
          const raw = localStorage.getItem(DEFAULT_KEY);
          if (raw) setBanners(JSON.parse(raw));
        } catch (err) {
          // ignore
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    // reset carousel index when active banners change
    setCarouselIndex(0);
  }, [banners]);

  const startUpload = () => fileRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setFormImage(url);
      setFormTitle(file.name);
      setFormAlt(file.name);
    };
    reader.readAsDataURL(file);
  };

  const openCreate = () => {
    setEditing(null);
    setFormPage(PAGES[0]);
    setFormTitle("");
    setFormAlt("");
    setFormImage(undefined);
    setFormActive(true);
    startUpload();
  };

  const openEdit = (b: Banner) => {
    setEditing(b);
    setFormPage(b.page);
    setFormTitle(b.title);
    setFormAlt(b.alt || "");
    setFormImage(b.image);
    setFormActive(b.active);
  };

  const saveBanner = () => {
    if (!formImage) return alert("Please upload an image.");
    if (!formTitle.trim()) return alert("Please set a title.");

    if (editing) {
      const updated = { id: editing.id, page: formPage, title: formTitle, alt: formAlt, image: formImage, active: formActive };
      // optimistic ui
      setBanners((prev) => prev.map((b) => (b.id === editing.id ? { ...b, ...updated } : b)));
      setEditing(null);
      // call API
      fetch('/api/admin/banners', { method: 'PUT', body: JSON.stringify(updated), headers: { 'Content-Type': 'application/json' } }).catch(() => {});
    } else {
      const payload = { page: formPage, title: formTitle, alt: formAlt, image: formImage, active: formActive };
      // optimistic add
      const tmpId = `tmp_${Date.now()}`;
      const tmp = { id: tmpId, ...payload } as Banner;
      setBanners((prev) => [tmp, ...prev]);
      // call API to persist
      fetch('/api/admin/banners', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
        .then((r) => r.json())
        .then((j) => {
          if (j.data) setBanners(j.data);
        })
        .catch(() => {
          // leave optimistic entry
        });
    }

    // reset form
    setFormImage(undefined);
    setFormAlt("");
    setFormTitle("");
  };

  const toggleActive = (id: string) => {
    setBanners((prev) => prev.map((b) => ({ ...b, active: b.id === id ? !b.active : b.active })));
  };

  const deleteOne = (id: string) => {
    if (!confirm("Delete this banner?")) return;
  // optimistic UI
  setBanners((prev) => prev.filter((b) => b.id !== id));
  setSelected((s) => ({ ...s, [id]: false }));
  fetch('/api/admin/banners', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } }).catch(() => {});
  };

  const bulkDelete = () => {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (!ids.length) return alert("No banners selected.");
    if (!confirm(`Delete ${ids.length} banners?`)) return;
  // optimistic
  setBanners((prev) => prev.filter((b) => !ids.includes(b.id)));
  setSelected({});
  // call delete for each id
  ids.forEach((id) => fetch('/api/admin/banners', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } }).catch(() => {}));
  };

  // Drag and drop reorder
  const onDragStart = (e: React.DragEvent, index: number) => {
    dragIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const start = dragIndex.current;
    if (start === null) return;
    setBanners((prev) => {
      const next = [...prev];
      const [moved] = next.splice(start, 1);
      next.splice(index, 0, moved);
      return next;
    });
    dragIndex.current = null;
  };

  const toggleSelect = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const selectAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    banners.forEach((b) => (next[b.id] = checked));
    setSelected(next);
  };

  // carousel controls
  const activeSlides = banners.filter((b) => b.active && !!b.image);
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    carouselRef.current = window.setInterval(() => {
      setCarouselIndex((i) => (i + 1) % activeSlides.length);
    }, 3500);
    return () => {
      if (carouselRef.current) clearInterval(carouselRef.current);
    };
  }, [activeSlides.length]);

  const prevSlide = () => setCarouselIndex((i) => (i - 1 + activeSlides.length) % activeSlides.length);
  const nextSlide = () => setCarouselIndex((i) => (i + 1) % activeSlides.length);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Banners</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => { setViewMode(viewMode === 'grid' ? 'table' : 'grid'); }} className="px-3 py-2 bg-gray-100 rounded">{viewMode === 'grid' ? 'Table View' : 'Grid View'}</button>
            <button onClick={openCreate} className="px-3 py-2 bg-blue-600 text-white rounded">Upload Banner</button>
            <button onClick={bulkDelete} className="px-3 py-2 bg-red-600 text-white rounded">Delete Selected</button>
          </div>
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />

        {/* Form area (inline) */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-medium mb-3">Add / Edit Banner</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Page</label>
                <select className="border p-2 rounded" value={formPage} onChange={(e) => setFormPage(e.target.value)}>
                  {PAGES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>

                <label className="text-sm mt-2">Title</label>
                <input className="border p-2 rounded" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Banner title" />

                <label className="text-sm mt-2">Alt Text</label>
                <input className="border p-2 rounded" value={formAlt} onChange={(e) => setFormAlt(e.target.value)} placeholder="Image alt text" />

                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" checked={formActive} onChange={(e) => setFormActive(e.target.checked)} />
                  <span className="text-sm">Active</span>
                </label>
              </div>
            </div>

            <div className="col-span-1">
              <div className="border rounded p-2 flex flex-col gap-2 items-stretch">
                <div className="h-40 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  {formImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formImage} alt={formAlt || formTitle} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-sm text-gray-400">No image selected</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-gray-100 rounded" onClick={startUpload}>Choose Image</button>
                  <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={saveBanner}>{editing ? 'Update' : 'Save'}</button>
                  {editing && <button className="px-3 py-2 bg-gray-200 rounded" onClick={() => { setEditing(null); setFormImage(undefined); }}>Cancel</button>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listing */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={(e) => selectAll(e.target.checked)} />
              <span className="text-sm text-gray-600">Select all</span>
            </label>
            <div className="text-sm text-gray-600">Drag to reorder (grid view)</div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {banners.map((b, i) => (
                <div
                  key={b.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, i)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, i)}
                  className={`rounded-xl shadow-md p-3 bg-white border ${b.active ? "ring-2 ring-amber-300" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={!!selected[b.id]} onChange={() => toggleSelect(b.id)} />
                      <div className="text-sm font-medium">{b.title}</div>
                    </label>
                    <div className="text-xs text-gray-500">#{i + 1}</div>
                  </div>

                  <div className="mt-3 h-44 bg-gray-100 overflow-hidden rounded">
                    {b.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.image} alt={b.alt || b.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        className={`px-2 py-1 rounded text-sm ${b.active ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => toggleActive(b.id)}
                      >
                        {b.active ? 'Active' : 'Set Active'}
                      </button>
                      <button className="px-2 py-1 rounded text-sm bg-gray-100" onClick={() => openEdit(b)}>Edit</button>
                    </div>

                    <button className="px-2 py-1 rounded text-sm text-red-600" onClick={() => deleteOne(b.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-gray-500 uppercase">
                  <tr>
                    <th className="p-2" />
                    <th className="p-2">Page</th>
                    <th className="p-2">Title</th>
                    <th className="p-2">Preview</th>
                    <th className="p-2">Alt Text</th>
                    <th className="p-2">Active</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((b) => (
                    <tr key={b.id} className="border-t">
                      <td className="p-2"><input type="checkbox" checked={!!selected[b.id]} onChange={() => toggleSelect(b.id)} /></td>
                      <td className="p-2">{b.page}</td>
                      <td className="p-2">{b.title}</td>
                      <td className="p-2 w-40">
                        <div className="h-16 w-32 bg-gray-100 overflow-hidden rounded">
                          {b.image ? (<img src={b.image} alt={b.alt || b.title} className="w-full h-full object-cover" />) : 'No image'}
                        </div>
                      </td>
                      <td className="p-2">{b.alt}</td>
                      <td className="p-2">{b.active ? 'Yes' : 'No'}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button className="text-blue-600" onClick={() => openEdit(b)}>Edit</button>
                          <button className="text-red-600" onClick={() => deleteOne(b.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-medium mb-3">Preview Slider</h2>
          <div className="relative">
            {activeSlides.length === 0 ? (
              <div className="h-52 flex items-center justify-center text-sm text-gray-400">No active banners</div>
            ) : (
              <div className="h-52 overflow-hidden rounded">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeSlides[carouselIndex].image} alt={activeSlides[carouselIndex].alt || activeSlides[carouselIndex].title} className="w-full h-52 object-cover rounded" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-1">
                  <button onClick={prevSlide} className="px-2">‹</button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 rounded-full p-1">
                  <button onClick={nextSlide} className="px-2">›</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
