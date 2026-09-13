import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCapyRooms } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Check, Users, Maximize, Wifi, Tv, Wind, Droplets, Clock, ShieldCheck, Ban } from "lucide-react";
import Hero from "@/components/home/Hero";
import StayGallery from "@/components/stay/StayGallery";

export const metadata: Metadata = {
  title: "Boutique Hotel Siem Reap | Capybara Themed Rooms from $50 | Near Angkor Wat",
  description: "Stay in Cambodia's most unique boutique hotel. 23 capybara-themed rooms with private balconies sleeping 1 to 6 guests. Pool, spa, gym & family facilities. Book direct from $50/night.",
};

export default async function StayPage() {
  const rooms = await getAllCapyRooms();

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E1C]">

      {/* SECTION 1: Hero Section */}
      <Hero
        youtubeId="3mTyoZkffn8"
        headline="Sleep Somewhere Truly Different"
        subheadline="It is not just a hotel room. It is a treasure hunt, a memory, and the best night your children will ever talk about."
        primaryCtaText="Check Availability"
        primaryCtaLink="/book"
        secondaryCtaText="Explore Our Rooms"
        secondaryCtaLink="#room-collection"
      />

      {/* SECTION 2: Introduction & Concept */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-[#1B5E20] mb-6">Every Room is an Adventure</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            Designed as a treasure hunt for children (capybara-themed bathroom tiles, neon lighting, custom capybara toothbrushes, slippers, cups, towels, pillows, and toys). For parents: dimmable lighting, silent AC & ceiling fan, large smart TV, spacious wardrobes, and private balconies overlooking lush botanical gardens.
          </p>
          <div className="inline-block px-6 py-3 bg-[#E8F5E9] rounded-full text-[#1B5E20] font-bold text-lg mb-8 border border-[#2E7D32]/20">
            Dynamic Pricing: From $50/Night
          </div>
          <div>
            <Link href="/book" className="inline-block px-8 py-4 bg-[#E65100] hover:bg-[#F57C00] text-white font-bold rounded-full transition-all shadow-md hover:-translate-y-1">
              Check Availability — From $50/Night
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 3: Guest Perks & Inclusions */}
      <section className="bg-[#1B5E20] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="w-16 h-16 bg-[#E65100]/20 rounded-full flex items-center justify-center mb-4 text-[#E65100]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">FREE Encounters</h3>
                <p className="text-sm text-gray-300">Meet Molly & Alex with no extra ticket or time limit throughout your stay.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="w-16 h-16 bg-[#B3E5FC]/20 rounded-full flex items-center justify-center mb-4 text-[#B3E5FC]">
                  <Wind className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Private Balcony</h3>
                <p className="text-sm text-gray-300">A quiet personal outdoor sanctuary in every single room.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="w-16 h-16 bg-[#F8BBD0]/20 rounded-full flex items-center justify-center mb-4 text-[#F8BBD0]">
                  <Droplets className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Pool & Water Slide</h3>
                <p className="text-sm text-gray-300">Daily water quality tested, fun, safe, and right outside your door.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="w-16 h-16 bg-[#2E7D32]/40 rounded-full flex items-center justify-center mb-4 text-[#4CAF50]">
                  <Wifi className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Free WiFi & Parking</h3>
                <p className="text-sm text-gray-300">High-speed internet and spacious on-site parking (rare for Siem Reap).</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: Dynamic Room Collection Grid */}
      <section id="room-collection" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4">Our Room Collection</h2>
            <p className="text-lg text-gray-600">Find the perfect capybara-themed sanctuary for your family or friends.</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10">
          {rooms.map((room) => (
            <ScrollReveal key={room.id}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#1B5E20]/10 flex flex-col md:flex-row hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-64 md:h-auto md:w-[45%] lg:w-2/5 overflow-hidden shrink-0 min-h-[300px]">
                  <Image
                    src={room.thumbnailUrl}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm text-[#1B5E20] px-4 py-1.5 rounded-full font-black shadow-lg text-sm tracking-wide">
                    {room.priceFrom} <span className="font-medium text-xs opacity-80">/ Night</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-grow md:w-[55%] lg:w-3/5">
                  <h3 className="text-3xl font-extrabold text-[#1B5E20] mb-4 tracking-tight">{room.title}</h3>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-1.5 bg-[#1B5E20]/5 text-[#1B5E20] px-3 py-1.5 rounded-lg font-bold text-sm border border-[#1B5E20]/10">
                      <Maximize className="w-4 h-4 text-[#E65100]" /> {room.sizeSqm}
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#1B5E20]/5 text-[#1B5E20] px-3 py-1.5 rounded-lg font-bold text-sm border border-[#1B5E20]/10">
                      <Users className="w-4 h-4 text-[#E65100]" /> {room.occupancy}
                    </div>
                  </div>

                  <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow">
                    {room.description}
                  </p>

                  <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href={`/stay/${room.slug}`}
                      className="flex-1 flex items-center justify-center py-4 bg-transparent border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-bold rounded-2xl transition-all duration-300"
                    >
                      View Room Details
                    </Link>
                    <a
                      href={room.inngeniusUrl || "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#E65100] text-white font-bold rounded-2xl hover:bg-[#d84315] shadow-lg shadow-[#E65100]/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <span>Direct Booking</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SECTION 5: "Every Room Includes" Amenities */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Every Room Includes</h2>
              <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: <Check />, label: "Capybara Decor" },
                { icon: <Droplets />, label: "Custom Amenity Kit" },
                { icon: <Wind />, label: "Silent AC & Fan" },
                { icon: <Tv />, label: "Large Smart TV" },
                { icon: <Wifi />, label: "Free High-Speed WiFi" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#E8F5E9]">
                  <div className="text-[#2E7D32] mb-3 p-3 bg-[#E8F5E9] rounded-full">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6: Resort Facilities */}
      <section className="py-20 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Resort Facilities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Beyond your room, Casa de Capybara offers a complete luxury resort experience designed for both parents and children.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8F5E9]">
                <h3 className="text-xl font-bold text-[#1B5E20] mb-4 border-b border-gray-100 pb-4">Relaxation</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Pool with Water Slide</li>
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Steam Room & Sauna</li>
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Beauty Salon & Spa</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8F5E9]">
                <h3 className="text-xl font-bold text-[#1B5E20] mb-4 border-b border-gray-100 pb-4">Entertainment</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Outdoor Playground</li>
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Indoor Playroom (200+ Costumes)</li>
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Capybara Cafe (7am–9pm)</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8F5E9]">
                <h3 className="text-xl font-bold text-[#1B5E20] mb-4 border-b border-gray-100 pb-4">Convenience</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Full Gym</li>
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Free Parking</li>
                  <li className="flex items-center gap-3 text-gray-700"><Check className="w-5 h-5 text-[#2E7D32]" /> Multilingual Staff (EN, KH, HI)</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* SECTION 7: Essential Stay Info & Safety */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-[#E8F5E9] rounded-3xl p-8 md:p-12 border border-[#2E7D32]/20">
              <h2 className="text-2xl font-bold text-[#1B5E20] mb-8 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8" /> Safety & Essentials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#2E7D32] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">Check-in / Check-out</h4>
                    <p className="text-gray-600 text-sm">Check-in: 2:00 PM<br />Check-out: 12:00 Noon</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Ban className="w-6 h-6 text-[#2E7D32] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">Strictly Smoke-Free</h4>
                    <p className="text-gray-600 text-sm">Smoking is strictly prohibited indoors (balconies only). Smoke alarms in every room.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Tv className="w-6 h-6 text-[#2E7D32] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">24/7 Security</h4>
                    <p className="text-gray-600 text-sm">Comprehensive CCTV surveillance throughout all public grounds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Droplets className="w-6 h-6 text-[#2E7D32] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">Water Hygiene</h4>
                    <p className="text-gray-600 text-sm">European kitchen hygiene standards with monthly water filter changes.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 8: Stay Gallery */}
      <StayGallery />

      {/* SECTION 9: Book Direct Banner */}
      <section className="bg-[#1B5E20] py-20 px-4 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Always Best to Book Direct</h2>
            <p className="text-xl text-gray-200">
              Booking directly through casadecapybara.com guarantees you the best available rate. Dynamic pricing from $50 to $150 per night.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link href="/book" className="px-10 py-5 bg-[#E65100] hover:bg-[#F57C00] text-white font-bold rounded-full transition-all text-lg shadow-xl hover:-translate-y-1 w-full sm:w-auto">
                Check Availability
              </Link>
            </div>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <a href="https://wa.me/855968149795" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp (+855 968 149 795)
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="https://t.me/capybaracambodia" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.894-15.65c.297-1.428-.485-2.028-1.4-1.688l-13.35 5.15c-1.385.556-1.378 1.33-.255 1.674l3.418 1.066 7.915-4.992c.375-.23.717-.107.433.146l-6.416 5.794-.251 3.753c.367 0 .526-.168.73-.367l1.753-1.704 3.648 2.695c.671.37 1.155.18 1.32-.61l2.39-11.267z" /></svg>
                Telegram (@capybaracambodia)
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6 pt-6 border-t border-white/20 inline-block">
              Also available on Booking.com | Agoda | Trip.com
            </p>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
