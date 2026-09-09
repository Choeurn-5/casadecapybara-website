import Link from "next/link";
import { GlobalSettings } from "@/lib/wordpress";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Footer({ settings }: { settings: GlobalSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A2E1C] text-[#FAF7F2] pt-16 pb-8 border-t-4 border-[#2E7D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt={settings.siteTitle}
                  className="w-10 h-10 object-contain grayscale brightness-200"
                />
              )}
              <span className="font-bold text-xl tracking-wider text-[#E65100]">
                {settings.siteTitle}
              </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              {settings.siteDescription}
            </p>
            <div className="flex space-x-4 pt-2">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F8BBD0] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F8BBD0] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {settings.tiktokUrl && (
                <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F8BBD0] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.36 6.37 6.37 0 0 0 6.33-6.19V10.5a8.4 8.4 0 0 0 4.19 1.13V8.19a4.81 4.81 0 0 1-2.2-.5z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#F8BBD0] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/stay" className="text-sm opacity-80 hover:opacity-100 hover:text-[#E65100] transition-colors">Stay at the Eco-Resort</Link></li>
              <li><Link href="/capybara-experience" className="text-sm opacity-80 hover:opacity-100 hover:text-[#E65100] transition-colors">Capybara Experience</Link></li>
              <li><Link href="/cafe" className="text-sm opacity-80 hover:opacity-100 hover:text-[#E65100] transition-colors">Café & Dining</Link></li>
              <li><Link href="/gallery" className="text-sm opacity-80 hover:opacity-100 hover:text-[#E65100] transition-colors">Gallery</Link></li>
              <li><Link href="/faq" className="text-sm opacity-80 hover:opacity-100 hover:text-[#E65100] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#F8BBD0] mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#E65100] shrink-0 mt-0.5" />
                <span className="text-sm opacity-80 leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#E65100] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-sm opacity-80 hover:text-[#E65100] transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-semibold text-[#F8BBD0] mb-4">Sanctuary Hours</h3>
            <div className="bg-[#2E7D32]/30 p-4 rounded-lg border border-[#2E7D32]/50">
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-[#E65100] shrink-0 mt-0.5" />
                <p className="text-sm opacity-90 leading-relaxed">
                  {settings.operatingHours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2E7D32]/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-60">
            &copy; {currentYear} {settings.siteTitle}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs opacity-60">
            <Link href="/privacy" className="hover:text-[#F8BBD0] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#F8BBD0] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
