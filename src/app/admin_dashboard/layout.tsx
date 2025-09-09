import "../globals.css";
import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export const metadata = {
  title: "Admin - Transilk",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-slate-50">
          <div className="flex">
            <AdminSidebar className="" />

            <main className="flex-1 ml-0 md:ml-64 transition-all duration-300 p-6">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
