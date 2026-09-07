import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GlobalSettings, defaultGlobalSettings } from "@/lib/wordpress";

interface FooterProps {
  settings?: GlobalSettings;
}

export default function Footer({
  settings = defaultGlobalSettings,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const siteTitle = settings?.siteTitle || "Casa de Capybara";
  const contactEmail = settings?.contactEmail || defaultGlobalSettings.contactEmail;
  const contactPhone = settings?.contactPhone || defaultGlobalSettings.contactPhone;
  const address = settings?.address || defaultGlobalSettings.address;
  const operatingHours =
    settings?.operatingHours || defaultGlobalSettings.operatingHours;

  return (
    <footer className="w-full bg-[#0D150E] text-gray-300 border-t border-white/10 pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Col 1 & 2: Sanctuary Brand & Bio */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={settings?.logoUrl || "/logo.png"}
                alt={siteTitle}
                width={200}
                height={58}
                className="h-12 w-auto object-contain brightness-105"
              />
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm mt-2">
              Cambodia&apos;s premier eco-sanctuary and retreat. Dedicated to ethical animal welfare, intimate capybara encounters, peaceful garden stays, and sustainable hospitality.
            </p>

            {/* Animal Welfare Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B5E20]/40 border border-[#2E7D32]/60 text-xs text-[#F8BBD0]">
              <span className="text-sm">🌿</span>
              <span>100% Ethical & Supervised Animal Encounters</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-3">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1B5E20] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}

              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E65100] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}

              {settings.tiktokUrl && (
                <a
                  href={settings.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#F8BBD0] text-gray-300 hover:text-black flex items-center justify-center transition-all duration-200 border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v9.64c0 3.39-2.07 6.45-5.28 7.42-3.21.97-6.72-.08-8.83-2.61-2.11-2.54-2.31-6.18-.5-8.91 1.82-2.74 5.16-4.04 8.35-3.26v4.18c-1.57-.42-3.3.17-4.25 1.46-.96 1.29-.93 3.1.06 4.36 1 1.26 2.75 1.8 4.29 1.34 1.54-.47 2.58-1.92 2.58-3.53V.02z" />
                  </svg>
                </a>
              )}

              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>

              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-sky-600 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Experiences & Stays */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider text-[#F8BBD0]">
              Sanctuary & Stays
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/capybara-experience"
                  className="hover:text-white transition-colors"
                >
                  Capybara Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/stay"
                  className="hover:text-white transition-colors"
                >
                  Eco Villas & Lodges
                </Link>
              </li>
              <li>
                <Link
                  href="/cafe-dining"
                  className="hover:text-white transition-colors"
                >
                  Garden Café & Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Sanctuary Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/families-safety"
                  className="hover:text-white transition-colors"
                >
                  Families & Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Guest Planning */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider text-[#FFB300]">
              Plan & Connect
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/plan-your-visit"
                  className="hover:text-white transition-colors"
                >
                  Plan Your Visit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact & Directions
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Sanctuary Blog & Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/kh"
                  className="hover:text-white transition-colors font-medium text-emerald-400"
                >
                  🇰🇭 ភាសាខ្មែរ (Khmer Edition)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider text-[#E65100]">
              Visit Us
            </h3>
            <div className="flex flex-col gap-3 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-0.5">📍</span>
                <span>{address}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-0.5">⏰</span>
                <span>{operatingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-0.5">✉️</span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white underline underline-offset-2"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-0.5">📞</span>
                <a
                  href={`tel:${contactPhone}`}
                  className="hover:text-white"
                >
                  {contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {currentYear} {siteTitle}. All rights reserved. Kingdom of Cambodia.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/families-safety" className="hover:text-gray-300 transition-colors">
              Safety & Ethics
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Direct Booking Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
