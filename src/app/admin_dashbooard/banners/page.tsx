"use client";

import React, { useState, useRef } from "react";

type Banner = {
  id: string;
  title: string;
  image?: string; // data URL or external
  active: boolean;
};

const initial: Banner[] = [
  { id: "b1", title: "Summer Gems", image: "https://picsum.photos/seed/b1/800/400", active: true },
  { id: "b2", title: "Gold Collection", image: "https://picsum.photos/seed/b2/800/400", active: false },
  { id: "b3", title: "Exclusive Rings", image: "https://picsum.photos/seed/b3/800/400", active: false },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initial);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dragIndex = useRef<number | null>(null);

  const onUploadClick = () => fileRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      const id = `b_${Date.now()}`;
      setBanners((s) => [{ id, title: file.name, image: url, active: false }, ...s]);
    };
    reader.readAsDataURL(file);
  };

  const toggleActive = (id: string) => {
    setBanners((prev) => prev.map((b) => ({ ...b, active: b.id === id })));
  };

  const deleteOne = (id: string) => {
    if (!confirm("Delete this banner?")) return;
    setBanners((prev) => prev.filter((b) => b.id !== id));
    setSelected((s) => ({ ...s, [id]: false }));
  };

  const bulkDelete = () => {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (!ids.length) return alert("No banners selected.");
    if (!confirm(`Delete ${ids.length} banners?`)) return;
    setBanners((prev) => prev.filter((b) => !ids.includes(b.id)));
    setSelected({});
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Banners</h1>
          <div className="flex items-center gap-3">
            <button onClick={onUploadClick} className="px-3 py-2 bg-blue-600 text-white rounded">Add Banner</button>
            <button onClick={bulkDelete} className="px-3 py-2 bg-red-600 text-white rounded">Delete Selected</button>
          </div>
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />

        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" onChange={(e) => selectAll(e.target.checked)} />
                <span className="text-sm text-gray-600">Select all</span>
              </label>
            </div>
            <div className="text-sm text-gray-600">Drag cards to reorder</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {banners.map((b, i) => (
              <div
                key={b.id}
                draggable
                onDragStart={(e) => onDragStart(e, i)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, i)}
                className={`rounded shadow p-3 bg-white border ${b.active ? "ring-2 ring-gold-primary" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={!!selected[b.id]} onChange={() => toggleSelect(b.id)} />
                    <div className="text-sm font-medium">{b.title}</div>
                  </label>
                  <div className="text-xs text-gray-500">#{i + 1}</div>
                </div>

                <div className="mt-3 h-36 bg-gray-100 overflow-hidden rounded">
                  {b.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
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
                    <button className="px-2 py-1 rounded text-sm bg-gray-100" onClick={() => alert('Edit banner (mock)')}>Edit</button>
                  </div>

                  <button className="px-2 py-1 rounded text-sm text-red-600" onClick={() => deleteOne(b.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-3">Preview Slider</h2>
          <div className="h-40 flex items-center justify-center text-sm text-gray-400">Carousel preview placeholder</div>
        </div>
      </div>
    </div>
  );
}
