import Link from "next/link";
import { GlobalSettings } from "@/lib/wordpress";
import { MapPin, Clock, Phone, Mail, Send, Map } from "lucide-react";

export default function GlobalFooter({ settings }: { settings: GlobalSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070D18] text-white pt-16 pb-8 overflow-hidden">
      {/* Pink and Blue Luxury Accent Ribbon */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#F43F5E] via-[#0284C7] to-[#38BDF8]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand & Reviews */}
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-4">
              {/* If we have a logoUrl, use it. Otherwise, fallback to a placeholder circle */}
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Casa de Capybara" className="w-32 h-32 object-contain rounded-full bg-white shadow-lg" />
              ) : (
                <div className="w-32 h-32 bg-[#FFCDD2] rounded-full flex items-center justify-center text-[#E65100] font-bold text-2xl shadow-lg border-4 border-white">
                  LOGO
                </div>
              )}
              <h2 className="font-bold text-xl tracking-wide">Casa de Capybara</h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-100 font-medium">
              Cambodia's First & Only<br />
              Capybara Experience.<br />
              Boutique Hotel • Café • Siem Reap.
            </p>

            <div className="space-y-3 pt-4">
              <h3 className="font-bold text-sm">Leave a Review</h3>
              <a href="https://www.tripadvisor.com/UserReviewEdit-g297390-d34246657-Casa_de_Capybara-Siem_Reap_Siem_Reap_Province.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#0A7A3E] hover:bg-[#0B8B46] transition-colors py-2 px-4 rounded-md text-sm font-medium border border-[#118A4A]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-9.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm4 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" /></svg>
                Tripadvisor - Hotel
              </a>
              <a href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#0A7A3E] hover:bg-[#0B8B46] transition-colors py-2 px-4 rounded-md text-sm font-medium border border-[#118A4A]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                Google - Cafe & Sanctuary
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Capybara Experience', path: '/capybara-experience' },
                { name: 'Stay With Us', path: '/stay' },
                { name: 'Café & Dining', path: '/cafe' },
                { name: 'Families & Safety', path: '/families' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Plan Your Visit', path: '/plan-your-visit' },
                { name: 'Contact & Book', path: '/contact' },
                { name: 'Blog', path: '/blog' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="text-gray-200 hover:text-[#E65100] transition-colors inline-block text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white">Contact Us</h3>
            <div className="space-y-5 text-sm font-medium text-gray-200">
              {settings.address && (
                <a
                  href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:text-[#FFB74D] transition-colors group"
                >
                  <MapPin className="w-5 h-5 shrink-0 text-white group-hover:text-[#FFB74D] mt-0.5" />
                  <span className="leading-relaxed">{settings.address}</span>
                </a>
              )}

              {settings.operatingHours && (
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 shrink-0 text-white mt-0.5" />
                  <span className="leading-relaxed">{settings.operatingHours}</span>
                </div>
              )}

              {settings.whatsappNumber && (
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-white shrink-0" />
                  <span>{settings.whatsappNumber}</span>
                </div>
              )}

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <span>info@casadecapybara.com</span>
              </div>
            </div>

            {/* Contact Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {settings.telegramUrl && (
                <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#0A7A3E] hover:bg-[#0B8B46] py-2 rounded-md text-xs font-bold border border-[#118A4A]">
                  <Send className="w-4 h-4" /> Telegram
                </a>
              )}
              {settings.whatsappNumber && (
                <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#0A7A3E] hover:bg-[#0B8B46] py-2 rounded-md text-xs font-bold border border-[#118A4A]">
                  <Phone className="w-4 h-4" /> WhatsApp
                </a>
              )}
              <a href="https://web.facebook.com/casadecapybara/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#0A7A3E] hover:bg-[#0B8B46] py-2 rounded-md text-xs font-bold border border-[#118A4A]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> Facebook
              </a>
              <a href="https://www.instagram.com/casadecapybaracambodia/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#0A7A3E] hover:bg-[#0B8B46] py-2 rounded-md text-xs font-bold border border-[#118A4A]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> Instagram
              </a>
            </div>
          </div>

          {/* Column 4: We Accept & Follow Us */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white">We Accept</h3>

            {/* Payment Icons */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#1429A0] text-white text-[10px] font-bold px-2 py-1.5 rounded flex items-center">VISA</span>
              <span className="bg-white text-[10px] font-bold px-2 py-1.5 rounded flex items-center gap-0.5">
                <div className="w-3 h-3 rounded-full bg-[#EB001B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5 mix-blend-multiply"></div>
              </span>
              <span className="bg-[#0038A8] text-white text-[10px] font-bold px-2 py-1.5 rounded flex items-center">JCB</span>
              <span className="bg-[#DF0024] text-white text-[10px] font-bold px-2 py-1.5 rounded flex items-center">UnionPay</span>
              <span className="bg-[#008F4C] text-white text-[10px] font-bold px-2 py-1.5 rounded flex items-center">USD $</span>
              <span className="bg-[#F65314] text-white text-[10px] font-bold px-2 py-1.5 rounded flex items-center">KHR ៛</span>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-transparent border border-[#2E8F59] hover:bg-[#0A7A3E] transition-colors py-2.5 px-4 rounded-md text-sm font-bold w-full max-w-[200px]"
              >
                <MapPin className="w-4 h-4" /> View on Google Maps
              </a>
            </div>

            <h3 className="text-xs font-bold tracking-widest uppercase text-white pt-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {/* Social Round Buttons */}
              <a href="https://www.instagram.com/casadecapybaracambodia/" className="w-8 h-8 rounded bg-[#E1306C] flex items-center justify-center hover:opacity-90">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="https://www.tiktok.com/@casadecapybara" className="w-8 h-8 rounded bg-black flex items-center justify-center hover:opacity-90">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
              <a href="https://web.facebook.com/casadecapybara/" className="w-8 h-8 rounded bg-[#1877F2] flex items-center justify-center hover:opacity-90">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href={`https://wa.me/${settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : ''}`} className="w-8 h-8 rounded bg-[#25D366] flex items-center justify-center hover:opacity-90">
                <Phone className="w-4 h-4 text-white" />
              </a>
              <a href={settings.telegramUrl || '#'} className="w-8 h-8 rounded bg-[#229ED9] flex items-center justify-center hover:opacity-90">
                <Send className="w-4 h-4 text-white" />
              </a>
            </div>

            <div className="pt-2 font-bold text-sm flex items-center gap-2">
              <span className="text-[10px]">KH</span> ភាសាខ្មែរ
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#118A4A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-200">
            © {currentYear} Casa de Capybara · casadecapybara.com · All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-200">
            <Link href="/plan-your-visit" className="hover:text-white transition-colors">Plan Your Visit</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact & Directions</Link>
            <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
