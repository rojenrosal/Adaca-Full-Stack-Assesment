"use client";
import React, { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

type Props = {
  children: ReactNode;
};


//added layout to show what the component looks like in a page

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar (desktop & mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-sky-700 to-sky-600 text-white flex flex-col shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-bold tracking-tight border-b border-sky-800 flex justify-between items-center lg:block">
          PatientCare
          {/* Close button (mobile only) */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { name: "Patients", href: "#" },
            { name: "Appointments", href: "#" },
            { name: "Reports", href: "#" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-white hover:bg-sky-500 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-sky-800 text-sm text-sky-200">
          © 2025 PatientCare
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800">
              Welcome Back 👋
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Dr. Rosal</span>
            <img
              src="https://ui-avatars.com/api/?name=Dr+Rosal&background=0EA5E9&color=fff"
              alt="User avatar"
              className="w-9 h-9 rounded-full border border-gray-200 shadow-sm"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
