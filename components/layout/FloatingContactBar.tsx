"use client";

import React, { useState } from "react";
import { GlobalSettings, defaultGlobalSettings } from "@/lib/wordpress";

interface FloatingContactBarProps {
  settings?: GlobalSettings;
}

export default function FloatingContactBar({
  settings = defaultGlobalSettings,
}: FloatingContactBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl =
    settings?.whatsappUrl || defaultGlobalSettings.whatsappUrl;
  const telegramUrl =
    settings?.telegramUrl || defaultGlobalSettings.telegramUrl;

  return (
    <aside
      aria-label="Quick contact widget"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    >
      {/* Expanded Quick Action Pills */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 origin-bottom ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold text-xs sm:text-sm"
        >
          <span className="font-medium">WhatsApp Us</span>
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </div>
        </a>

        {/* Telegram Button */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on Telegram"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0088cc] text-white shadow-lg hover:shadow-xl hover:bg-[#007ab8] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold text-xs sm:text-sm"
        >
          <span className="font-medium">Telegram Direct</span>
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </div>
        </a>
      </div>

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:from-[#2E7D32] hover:to-[#1B5E20] text-white shadow-xl hover:shadow-2xl border-2 border-[#F8BBD0]/40 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label={isOpen ? "Close contact options" : "Open quick contact options"}
        aria-expanded={isOpen}
      >
        {/* Pulse ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E65100] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#E65100]" />
        </span>

        <span className="text-lg select-none">💬</span>
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          {isOpen ? "Close" : "Need Help?"}
        </span>
      </button>
    </aside>
  );
}
