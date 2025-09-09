"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    url: "/admin_dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
  },
  {
    name: "Products",
    url: "/admin_dashboard/products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-4a2 2 0 00-2-2H10a2 2 0 00-2 2v4" />
      </svg>
    ),
  },
  {
    name: "Orders",
    url: "/admin_dashboard/orders",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    name: "Banners",
    url: "/admin_dashboard/banners",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16v12H4z" />
      </svg>
    ),
  },
  {
    name: "Reports",
    url: "/admin_dashboard/reports",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [hoverExpand, setHoverExpand] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin_sidebar_collapsed");
      if (saved === "true") setCollapsed(true);
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("admin_sidebar_collapsed", collapsed ? "true" : "false");
    } catch (e) {
      // ignore
    }
  }, [collapsed]);

  const effectiveCollapsed = collapsed && !hoverExpand;

  return (
    <>
      {/* Mobile top bar: show toggle */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300 font-bold">T</div>
          <span className="font-semibold">Admin</span>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((s) => !s)}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar + overlay for mobile */}
      <div className={`${className} relative` }>
        <aside
          onMouseEnter={() => setHoverExpand(true)}
          onMouseLeave={() => setHoverExpand(false)}
          className={`fixed left-0 top-0 z-40 h-full transform bg-slate-900 text-slate-100 border-r border-slate-800 transition-all duration-300 ease-in-out shadow-lg ${
            effectiveCollapsed ? "w-20" : "w-64"
          } md:static md:translate-x-0`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center text-white font-bold">T</div>
                {!effectiveCollapsed && <div>
                  <div className="text-lg font-semibold">Transilk</div>
                  <div className="text-xs text-slate-400">Admin panel</div>
                </div>}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-1 py-4">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.url || pathname?.startsWith(item.url + "/");
                  return (
                    <li key={item.url} className="px-1">
                      <Link
                        href={item.url}
                        title={effectiveCollapsed ? item.name : undefined}
                        className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                          active ? "bg-emerald-600/20 text-emerald-300" : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                      >
                        <span className={`flex-none ${active ? "text-emerald-300" : "text-slate-300"}`}>{item.icon}</span>
                        {!effectiveCollapsed && <span className="truncate">{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="px-3 py-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                {!effectiveCollapsed && <div className="text-xs text-slate-400">Appearance</div>}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCollapsed((s) => !s)}
                    className="p-2 rounded-md bg-white/5 hover:bg-white/10"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile overlay drawer */}
        <div
          className={`fixed inset-0 z-30 md:hidden transition-opacity ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          aria-hidden={!mobileOpen}
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className={`absolute left-0 top-0 h-full w-64 bg-slate-900 p-4 shadow-lg transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-500 flex items-center justify-center text-white">T</div>
                <div className="font-semibold">Admin</div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md bg-white/5">Close</button>
            </div>
            <nav className="mt-6">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.url}>
                    <Link href={item.url} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800/60">
                      <span className="text-slate-300">{item.icon}</span>
                      <span className="text-slate-100">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
