import Image from 'next/image';
import Link from 'next/link';
import { 
  SendHorizontal, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  QrCode,
  Users,
  CheckCircle2,
  CalendarDays,
  Ticket
} from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { getGlobalSettings } from '@/lib/wordpress';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = {
  title: "Contact Casa de Capybara Siem Reap | WhatsApp, Telegram & Online Booking",
  description: "Book a room, reserve your capybara encounter or get in touch. WhatsApp +855 968 149 795 or Telegram @capybaracambodia. We reply fast — usually within the hour."
};

export default async function ContactPage() {
  const settings = await getGlobalSettings();
  const bookingUrl = settings.bookingEngineUrl || "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara";
  
  // Format WhatsApp link correctly (strip non-digits)
  const whatsappNumber = settings.whatsappNumber || '+855 968 149 795';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '') || '855968149795'}`;

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFDFB] text-[#1A1A1A]">
      
      {/* SECTION 1: Hero Header */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 bg-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F5E9] rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F8BBD0] rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal direction="down">
            <span className="inline-block py-1 px-3 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] font-bold text-sm tracking-widest mb-6 border border-[#1B5E20]/20 uppercase">
              Get in Touch with our Concierge
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#1B5E20] mb-6 leading-tight">
              We Would Love to Hear From You
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Book a room, plan your capybara encounter, arrange a group visit or simply say hello. Our English, Khmer and Hindi speaking team responds fast — usually within the hour.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#1B5E20] px-4 py-2 rounded-full font-bold text-sm border border-[#2E7D32]/20 shadow-sm">
              <span>⚡</span> Average response time: under 60 minutes (7am–9pm daily)
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: Contact Methods (MOST PROMINENT SECTION) */}
      <section className="py-16 px-4 bg-[#FBFDFB] relative z-20 -mt-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              {/* Telegram Card */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-8 border-t-[#229ED9] flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-[#229ED9]/10 text-[#229ED9] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6">
                  Recommended for Local & Regional Guests
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Telegram</h3>
                <p className="text-xl font-medium text-[#229ED9] mb-6">@capybaracambodia</p>
                
                <div className="w-52 h-52 bg-white p-3 rounded-2xl flex flex-col items-center justify-center border border-gray-200 shadow-sm mb-6 group relative">
                  <div className="relative w-40 h-40">
                    <Image
                      src="/qr/telegram-qr.svg"
                      alt="Scan to Chat on Telegram"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium mt-1">Scan to Chat</span>
                </div>
                
                <a 
                  href="https://t.me/capybaracambodia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#229ED9] hover:bg-[#1C88BA] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <SendHorizontal className="w-5 h-5" /> Tap to Message on Telegram
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-8 border-t-[#25D366] flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-[#25D366]/10 text-[#25D366] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6">
                  Recommended for International Travelers
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-xl font-medium text-[#25D366] mb-6">{whatsappNumber}</p>
                
                <div className="w-52 h-52 bg-white p-3 rounded-2xl flex flex-col items-center justify-center border border-gray-200 shadow-sm mb-6 group relative">
                  <div className="relative w-40 h-40">
                    <Image
                      src="/qr/whatsapp-qr.svg"
                      alt="Scan to Chat on WhatsApp"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium mt-1">Scan to Chat</span>
                </div>
                
                <a 
                  href="https://wa.me/qr/VYXIK6O4OLT3M1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-5 h-5" /> Tap to Message on WhatsApp
                </a>
              </div>

            </div>

            {/* Secondary Direct Channels Bar */}
            <div className="bg-[#0F2D15] text-white p-6 md:p-8 rounded-3xl shadow-xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 w-full lg:w-auto">
                {/* Email Item */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 text-[#81C784]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Email Inquiries</p>
                    <a 
                      href="mailto:info@casadecapybara.com" 
                      className="font-bold text-sm sm:text-base text-white hover:text-[#81C784] transition-colors"
                    >
                      info@casadecapybara.com
                    </a>
                  </div>
                </div>

                {/* Vertical Divider on Desktop */}
                <div className="hidden md:block w-px h-12 bg-white/10" />

                {/* Social Channels Item */}
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-2.5">
                    Official Social Channels
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/casadecapybaracambodia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#E1306C] text-white text-xs font-semibold border border-white/15 transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span>Instagram</span>
                    </a>

                    {/* TikTok */}
                    <a
                      href="https://www.tiktok.com/@casadecapybara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-black text-white text-xs font-semibold border border-white/15 transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.36 6.37 6.37 0 0 0 6.33-6.19V10.5a8.4 8.4 0 0 0 4.19 1.13V8.19a4.81 4.81 0 0 1-2.2-.5z"/>
                      </svg>
                      <span>TikTok</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://web.facebook.com/casadecapybara/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#1877F2] text-white text-xs font-semibold border border-white/15 transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Concierge Response Badge */}
              <div className="bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl flex items-center gap-3 w-full lg:w-auto shrink-0 justify-center lg:justify-start">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <div className="text-left">
                  <p className="text-xs font-bold text-white tracking-wide">Concierge Active Daily</p>
                  <p className="text-[11px] text-gray-300">Fast response: 7:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: Booking Options Grid (Dual Paths) */}
      <section className="py-24 px-4 bg-[#E8F5E9]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mb-4">How Can We Help You?</h2>
              <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              {/* Option 1: Room Booking */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-[#1B5E20]/10 flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-[#1B5E20]/10 rounded-2xl flex items-center justify-center mb-6">
                  <CalendarDays className="w-8 h-8 text-[#1B5E20]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">Reserve Your Boutique Room</h3>
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  Use our Inngenius booking engine for real-time availability and direct booking. Book direct for best rates — from $50 per night.
                </p>
                <div className="space-y-4">
                  <a 
                    href={bookingUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#E65100] hover:bg-[#c94600] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md text-center"
                  >
                    Check Live Availability & Book Direct
                  </a>
                  <p className="text-center text-sm font-medium text-gray-500">
                    Also available on Booking.com | Agoda | Trip.com
                  </p>
                </div>
              </div>

              {/* Option 2: Capybara Encounter */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-[#1B5E20]/10 flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-[#E65100]/10 rounded-2xl flex items-center justify-center">
                    <Ticket className="w-8 h-8 text-[#E65100]" />
                  </div>
                  <span className="bg-[#F8BBD0]/50 text-[#c2185b] font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                    No Online Booking Required
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">Capybara Encounter — Walk In Only</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  No booking required. Open every day 7am to 9pm. Simply arrive, purchase your ticket at the counter and our team will guide you from there.
                </p>
                <div className="bg-[#FAF7F2] p-4 rounded-xl mb-8 flex-grow">
                  <ul className="space-y-2 text-sm font-medium text-[#1B5E20]">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E65100]"/> $10 per person</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E65100]"/> $30 family package (2 adults + 2 children)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#E65100]"/> Children under 3 always free</li>
                  </ul>
                </div>
                <a 
                  href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md text-center"
                >
                  Get Directions (Google Maps)
                </a>
              </div>

            </div>

            <div className="bg-white/60 p-6 md:p-8 rounded-3xl border border-[#1B5E20]/10 text-center flex flex-col md:flex-row items-center justify-center gap-4">
              <Users className="w-8 h-8 text-[#E65100] shrink-0" />
              <p className="text-[#1B5E20] font-medium max-w-3xl text-left md:text-center">
                <strong>School trips, corporate events, birthday parties, family reunions</strong> — we welcome groups of all sizes. Please contact us in advance on WhatsApp or Telegram.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: Comprehensive Booking & Inquiry Form */}
      <section className="py-24 px-4 bg-white relative">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(#1B5E20 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.05 }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal direction="up">
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: Location & Navigation */}
      <section id="location" className="py-24 px-4 bg-[#FBFDFB] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-4">Find Us in Siem Reap</h2>
              <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#1B5E20] mb-2">Address</h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Street 598, Krong Siem Reap 171002, Cambodia <br/>
                      Ring Road, just off National Highway 6.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#1B5E20] mb-2">Operating Hours & Check-in</h4>
                    <ul className="text-gray-600 text-lg leading-relaxed space-y-2">
                      <li><strong>Cafe & Capybara:</strong> Open daily 7:00 AM to 9:00 PM</li>
                      <li><strong>Hotel Reception:</strong> 24 hours</li>
                      <li><strong>Check-in:</strong> 2:00 PM | <strong>Check-out:</strong> 12:00 Noon</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-gray-200">
                  <p className="font-medium text-[#1B5E20] flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E65100]" /> Free parking on site
                  </p>
                  <p className="font-medium text-[#1B5E20] flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E65100]" /> Airport transfers available
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold rounded-xl transition-colors flex items-center justify-center shadow-md"
                  >
                    Open in Google Maps
                  </a>
                  <a 
                    href="https://waze.com/ul?q=Casa+de+Capybara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-white hover:bg-gray-50 border-2 border-[#1B5E20] text-[#1B5E20] font-bold rounded-xl transition-colors flex items-center justify-center shadow-sm"
                  >
                    Open in Waze
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15541.748729583482!2d103.8587!3d13.3644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31101700445d4725%3A0x6b8bc2385dc62e8!2sCasa%20de%20Capybara!5e0!3m2!1sen!2skh!4v1709210000000!5m2!1sen!2skh" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full pointer-events-none lg:pointer-events-auto"
                ></iframe>
                {/* Mobile overlay to prevent scroll trapping */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none lg:hidden">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1B5E20] text-sm font-bold rounded-full shadow-lg pointer-events-auto opacity-0 group-active:opacity-100 transition-opacity">
                    Tap to interact
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 6: Final Call to Action Banner */}
      <section className="py-24 px-4 bg-[#1B5E20] relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2E7D32] rounded-full filter blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E65100] rounded-full filter blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Cambodia's Most Unique Experience Is Waiting For You
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Whether you are visiting for an afternoon or staying for a week — Casa de Capybara in Siem Reap will be the highlight of your trip to Cambodia. Molly and Alex cannot wait to meet you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/capybara-experience" className="px-8 py-4 bg-[#468CD0] hover:bg-[#3B7ABB] text-white font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto shadow-lg text-center">
                Capybara Experience — From $10
              </Link>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto shadow-lg text-center">
                Book Your Room — From $50
              </a>
              <a href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto shadow-lg text-center">
                Get Directions
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
