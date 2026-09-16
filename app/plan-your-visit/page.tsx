import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Clock, Car, Footprints, Globe, Phone, Mail, Bed, Ticket, HelpCircle, Navigation } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FaqAccordion from "@/components/plan/FaqAccordion";
import { getGlobalSettings } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Plan Your Visit to Casa de Capybara Siem Reap | Hours, Location & FAQ",
  description: "Everything before visiting Casa de Capybara. Street 598 Ring Road off Highway 6, Siem Reap. Open daily 7am-9pm. Free parking, airport transfers. Walk-ins always welcome.",
};

export default async function PlanYourVisitPage() {
  const settings = await getGlobalSettings();
  const bookingUrl = settings.bookingEngineUrl || "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara";
  const whatsappRaw = settings.whatsappNumber?.replace(/[^0-9]/g, '') || '855968149795';

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFDFB] text-[#1A1A1A]">
      
      {/* SECTION 1: Hero Section */}
      <section className="relative w-full min-h-[75svh] flex flex-col justify-center items-center overflow-hidden bg-[#1B5E20] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery/plan/pv1.jpg"
            alt="Casa de Capybara Entrance"
            fill
            className="object-cover opacity-70"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20] via-black/40 to-black/60 z-10" />
        </div>
        
        <div className="w-full pt-20 sm:pt-24" />

        <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center flex-grow justify-center pb-20 px-4">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
              VISITOR GUIDE & ESSENTIAL INFO
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-xl">
              Everything You Need to Know <br className="hidden md:block"/> 
              <span className="text-[#E8F5E9]">Before You Arrive</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="max-w-2xl text-lg md:text-2xl text-gray-100 font-medium leading-relaxed mb-10 drop-shadow-md mx-auto">
              We are easy to find, easy to reach and impossible to forget.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <a href="#location" className="px-8 py-4 bg-[#E65100] hover:bg-[#c94600] text-white font-bold rounded-full transition-all text-lg shadow-xl shadow-[#E65100]/20 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" /> Get Directions
            </a>
            <a href="#faq" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full transition-all text-lg hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5" /> View FAQs
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: Opening Hours & Daily Operation */}
      <section className="py-20 px-4 bg-white relative -mt-10 z-30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0.1} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FAF7F2] p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Clock className="w-7 h-7 text-[#E65100]" />
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-3">Cafe & Experience</h3>
                <p className="text-gray-600 mb-2 font-medium">7:00 AM — 9:00 PM Daily</p>
                <p className="text-gray-500 text-sm">Walk-ins welcome at all times. No booking required to meet the capybaras.</p>
              </div>

              <div className="bg-[#1B5E20] p-8 rounded-3xl shadow-lg border border-[#2E7D32] text-white hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Bed className="w-7 h-7 text-[#F8BBD0]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Hotel Operations</h3>
                <p className="text-gray-200 mb-2 font-medium">Reception: 24 Hours</p>
                <div className="flex gap-4 text-gray-300 text-sm mt-4">
                  <span>Check-in: 2:00 PM</span>
                  <span>Check-out: 12:00 Noon</span>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Ticket className="w-7 h-7 text-[#E65100]" />
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-3">Family Access</h3>
                <p className="text-gray-600 mb-2 font-medium">Children under 3: Always Free</p>
                <p className="text-gray-500 text-sm">Our property is fully accessible and designed with families in mind.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: Location & Getting Here */}
      <section id="location" className="py-24 px-4 bg-[#E8F5E9] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#E65100] font-bold tracking-widest uppercase text-sm mb-4 block">FINDING US</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-4">Location & Getting Here</h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-[2rem] overflow-hidden shadow-xl border border-[#1B5E20]/10">
            {/* Guide Column */}
            <div className="w-full lg:w-1/2 p-8 md:p-12">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-[#1B5E20] flex items-center gap-2 mb-4">
                  <MapPin className="text-[#E65100] w-6 h-6" /> Address
                </h3>
                <p className="text-gray-600 text-lg">
                  Street 598, Krong Siem Reap 171002, Cambodia<br/>
                  Ring Road, just off National Highway 6.
                </p>
                <p className="text-gray-500 text-sm mt-2 italic">Search Google Maps for: Casa de Capybara Hotel or Capybara Cafe</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Navigation className="w-4 h-4 text-[#E65100]" /> By Tuk Tuk</h4>
                  <p className="text-gray-600 mb-4 text-sm">Tell your driver Casa de Capybara on Ring Road off Highway 6 — they will know us.</p>
                  
                  <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Show this to your driver:</p>
                    <p className="font-bold text-lg text-[#1B5E20] font-serif leading-relaxed">
                      សូមជូនខ្ញុំទៅ Casa de Capybara នៅផ្លូវ ៥៩៨ (ផ្លូវក្រវាត់ក្រុង) ក្បែរកន្ត្រកវិល Angkor Eye
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Car className="w-4 h-4 text-[#E65100]" /> By Taxi or Car & Parking</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">Enter Street 598, Krong Siem Reap 171002 into Google Maps for accurate directions.</p>
                  <p className="text-gray-600 text-sm leading-relaxed"><strong className="text-[#1B5E20]">PARKING:</strong> Free parking on site — spacious and secure. Rare for Siem Reap.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Airport Transfer</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Available for hotel guests. Contact us on WhatsApp or Telegram at least 24 hours before arrival.</p>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <a href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#E65100] text-white text-sm font-bold rounded-full hover:bg-[#c94600] transition-colors shadow-md">
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Map Column */}
            <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full bg-gray-100 relative group overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15541.455074900742!2d103.83401145!3d13.37563175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311017004f21db53%3A0xc61d6ce6d3532c25!2sCasa%20de%20Capybara!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh" 
                className="absolute inset-0 w-full h-full border-0 pointer-events-none lg:pointer-events-auto" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Casa de Capybara Location Map"
              ></iframe>
              {/* Mobile overlay to prevent scroll trapping */}
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none lg:hidden">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1B5E20] text-sm font-bold rounded-full shadow-lg pointer-events-auto opacity-0 group-active:opacity-100 transition-opacity">
                  Tap to interact
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Nearby Landmarks & Distances */}
      <section className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-[#1B5E20] mb-12 text-center">Nearby Landmarks</h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Angkor Wat", time: "Approx. 15 minutes", type: "Tuk tuk", icon: Car },
                { name: "Angkor Eye Ferris Wheel", time: "Approx. 5 minutes", type: "Walking on foot", icon: Footprints },
                { name: "Robam Theater", time: "Approx. 5 minutes", type: "Walking on foot", icon: Footprints },
                { name: "Pub Street", time: "Approx. 10 minutes", type: "Tuk tuk", icon: Car },
                { name: "Phare Cambodian Circus", time: "Approx. 10 minutes", type: "Tuk tuk", icon: Car },
                { name: "APOPO Hero Rat Experience", time: "Approx. 15 minutes", type: "Tuk tuk", icon: Car },
                { name: "National Highway 6", time: "Directly accessible, 2 minutes", type: "Driving", icon: Car }
              ].map((landmark, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#E65100]/30 hover:bg-[#FAF7F2] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                    <landmark.icon className="w-5 h-5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{landmark.name}</h4>
                    <p className="text-sm text-gray-500">{landmark.time} <span className="text-[#E65100] font-medium block sm:inline">({landmark.type})</span></p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: Prices at a Glance */}
      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-4">Prices at a Glance</h2>
              <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1} direction="up" className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-t-[#E65100]">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Capybara Encounter</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-end border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Per Person</span>
                  <span className="text-xl font-bold text-[#1B5E20]">$10</span>
                </li>
                <li className="flex justify-between items-end border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Family Package <br/><span className="text-xs text-gray-400">(2 adults + 2 children)</span></span>
                  <span className="text-xl font-bold text-[#1B5E20]">$30</span>
                </li>
                <li className="flex justify-between items-end pb-3">
                  <span className="text-gray-600">Children under 3</span>
                  <span className="text-lg font-bold text-[#E65100] uppercase tracking-wider">Free</span>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="up" className="bg-[#1B5E20] text-white p-8 rounded-3xl shadow-xl transform md:-translate-y-4">
              <h3 className="text-2xl font-bold mb-6 text-[#F8BBD0]">Hotel Rooms</h3>
              <div className="mb-6">
                <span className="text-gray-300 block mb-1">Starting from</span>
                <span className="text-5xl font-extrabold">$50<span className="text-lg font-normal text-gray-300">/night</span></span>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed mb-8">
                Experience Cambodia's only kids' hotel. Prices vary by season. Check our live booking engine for exact pricing and availability.
              </p>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-[#E65100] hover:bg-[#c94600] text-center font-bold rounded-xl transition-colors">
                Check Live Pricing
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="up" className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-t-[#2E7D32]">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Capybara Cafe</h3>
              <div className="flex items-center gap-4 mb-6 text-[#2E7D32]">
                <Footprints className="w-8 h-8" />
                <span className="font-bold text-lg">Walk-ins Welcome</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Drop by anytime between 7am and 9pm. Enjoy our beautiful grounds and fresh, locally sourced food.
              </p>
              <div className="inline-block px-4 py-2 bg-[#E8F5E9] text-[#1B5E20] rounded-full text-sm font-bold">
                No Minimum Spend
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 6: Our Team ("We Speak Your Language") */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-16 h-16 bg-[#F8BBD0] rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-[#1B5E20]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-8">We Speak Your Language</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
              Our team speaks English, Khmer and Hindi fluently. We welcome guests from all over the world and always do our best to make everyone feel completely at home.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-[#E8F5E9] text-[#1B5E20] font-bold rounded-full shadow-sm text-lg border border-[#1B5E20]/10 hover:scale-105 transition-transform">🇬🇧 English</span>
              <span className="px-6 py-3 bg-[#E8F5E9] text-[#1B5E20] font-bold rounded-full shadow-sm text-lg border border-[#1B5E20]/10 hover:scale-105 transition-transform">🇰🇭 Khmer</span>
              <span className="px-6 py-3 bg-[#E8F5E9] text-[#1B5E20] font-bold rounded-full shadow-sm text-lg border border-[#1B5E20]/10 hover:scale-105 transition-transform">🇮🇳 Hindi</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7: Expandable Accordion FAQs */}
      <section id="faq" className="py-24 px-4 bg-[#FBFDFB] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-4">Frequently Asked Questions</h2>
              <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 8: Final Call to Action */}
      <section className="py-24 px-4 bg-[#1B5E20] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#2E7D32]/50 rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">
              Ready? <br/>
              <span className="text-[#F8BBD0]">We Cannot Wait to Meet You.</span>
            </h2>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#E65100] hover:bg-[#c94600] text-white font-bold rounded-full transition-transform hover:-translate-y-1 shadow-lg">
                Book Your Room
              </a>
              <Link href="/capybara-experience" className="px-8 py-4 bg-white text-[#1B5E20] font-bold rounded-full transition-transform hover:-translate-y-1 shadow-lg">
                Capybara Experience
              </Link>
              <a href="#location" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-full transition-transform hover:-translate-y-1 shadow-lg">
                Get Directions
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-white/20 flex flex-wrap justify-center gap-6">
              <a href={`https://wa.me/${whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#F8BBD0] transition-colors font-medium">
                <Phone className="w-5 h-5" /> WhatsApp: {settings.whatsappNumber || '+855 968 149 795'}
              </a>
              <a href="https://t.me/capybaracambodia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#B3E5FC] transition-colors font-medium">
                <Mail className="w-5 h-5" /> Telegram: @capybaracambodia
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
