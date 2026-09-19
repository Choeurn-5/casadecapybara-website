import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCapyRoomBySlug, getAllCapyRooms } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { 
  Check, 
  Users, 
  Maximize, 
  BedDouble, 
  Building, 
  Sun, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  HeartHandshake,
  CalendarCheck,
  Star,
  Coffee,
  Waves
} from "lucide-react";
import RoomMobileBookingBar from "@/components/stay/RoomMobileBookingBar";
import RoomGalleryViewer from "@/components/stay/RoomGalleryViewer";

export const dynamic = 'force-dynamic';

const BOOKING_URL = "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const room = await getCapyRoomBySlug(resolvedParams.slug);
  if (!room) return { title: "Room Not Found | Casa de Capybara" };
  return {
    title: `${room.title} | Luxury Stay at Casa de Capybara`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const room = await getCapyRoomBySlug(resolvedParams.slug);

  if (!room) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to check availability and book the ${room.title} at Casa de Capybara.`
  );
  const whatsappUrl = `https://wa.me/855968149795?text=${whatsappMessage}`;

  const cleanSize = room.sizeSqm?.replace(/\s*sqm\s*sqm/gi, ' sqm').replace(/m²\s*sqm/gi, ' m²');
  const cleanFloor = room.floor && /^\d+$/.test(room.floor)
    ? `${room.floor}${room.floor === '1' ? 'st' : room.floor === '2' ? 'nd' : room.floor === '3' ? 'rd' : 'th'} Floor`
    : room.floor;
  const cleanBalcony = room.balcony?.toLowerCase() === 'private' ? 'Private Balcony' : room.balcony;

  const specialList = room.specialFeature
    ? room.specialFeature.split(/[,•\n]+/).map((s: string) => s.trim()).filter(Boolean)
    : [];

  const galleryImages = room.photoGallery && room.photoGallery.length > 0 
    ? room.photoGallery 
    : [room.thumbnailUrl];

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A2E1C] pb-24 lg:pb-16">
      
      {/* 1. Cinematic Luxury Hero (Optimized for Mobile & Desktop) */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[58vh] md:h-[70vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <Image
          src={room.thumbnailUrl}
          alt={room.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        
        {/* Gradients for Luxury Ambience & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A140C]/95 via-black/35 to-black/50" />

        {/* Top Navigation Bar in Hero */}
        <div className="relative z-10 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-10 flex items-center justify-between">
          <Link 
            href="/stay" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-semibold text-xs sm:text-sm bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-black/60 shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>All Rooms</span>
          </Link>

          {room.priceFrom && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-lg">
              <span className="text-gray-300 text-[11px] font-normal">From</span>
              <span className="text-[#FFB74D] font-bold text-sm sm:text-base">{room.priceFrom}</span>
              <span className="text-gray-300 text-[11px] font-normal">/ night</span>
            </div>
          )}
        </div>

        {/* Bottom Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-10 flex flex-col justify-end">
          {/* Sanctuary Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B5E20]/80 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20 w-fit mb-3 shadow-md">
            <span>🐾</span>
            <span className="text-white/95">Free Daily Capybara Encounters Included</span>
          </div>

          {/* Room Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
            {room.title}
          </h1>

          {/* Mobile Horizontal Quick Specs Pills (Swipeable on small devices) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-white scrollbar-none">
            {room.occupancy && (
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full font-medium text-xs border border-white/15">
                <Users className="w-3.5 h-3.5 text-[#FFB74D]" /> {room.occupancy}
              </span>
            )}
            {cleanSize && (
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full font-medium text-xs border border-white/15">
                <Maximize className="w-3.5 h-3.5 text-[#FFB74D]" /> {cleanSize}
              </span>
            )}
            {room.bedType && (
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full font-medium text-xs border border-white/15">
                <BedDouble className="w-3.5 h-3.5 text-[#FFB74D]" /> {room.bedType}
              </span>
            )}
            {cleanBalcony && (
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full font-medium text-xs border border-white/15">
                <Sun className="w-3.5 h-3.5 text-[#FFB74D]" /> {cleanBalcony}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 2. Luxury "At a Glance" Spec Grid (Mobile Optimized) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 -mt-4 sm:-mt-6 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-[#E8F5E9] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#F0EBE1]">
            <div className="w-10 h-10 rounded-xl bg-[#E65100]/10 flex items-center justify-center text-[#E65100] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold">Guests</p>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1C] truncate">{room.occupancy || "2 Guests"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#F0EBE1]">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] shrink-0">
              <Maximize className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold">Room Size</p>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1C] truncate">{cleanSize || "Spacious Villa"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#F0EBE1]">
            <div className="w-10 h-10 rounded-xl bg-[#FF9800]/10 flex items-center justify-center text-[#FF9800] shrink-0">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold">Bed Configuration</p>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1C] truncate">{room.bedType || "King Bed"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#F0EBE1]">
            <div className="w-10 h-10 rounded-xl bg-[#00897B]/10 flex items-center justify-center text-[#00897B] shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold">Balcony / Outdoor</p>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1C] truncate">{cleanBalcony || cleanFloor || "Private Patio"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content & Booking Column */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Left Column: Room Story, Amenities & Gallery */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          
          {/* About Section */}
          <ScrollReveal>
            <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[#E8F5E9] shadow-xs">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E65100] mb-2 flex items-center gap-2">
                <span className="w-6 h-px bg-[#E65100]" />
                Sanctuary Living
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1B5E20] mb-4">
                About this Sanctuary Suite
              </h2>
              <div className="prose prose-base sm:prose-lg text-gray-700 leading-relaxed max-w-none font-light">
                <p>{room.description}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Room Highlights & Special Features */}
          {specialList.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#F4F9F4] to-[#FAF7F2] border border-[#E8F5E9] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E65100]/10 flex items-center justify-center text-[#E65100] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1B5E20]">
                      Signature Highlights
                    </h2>
                    <p className="text-xs text-gray-500">
                      Tailored boutique amenities for ultimate serenity
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {specialList.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-xs sm:text-sm font-semibold text-[#1A2E1C] rounded-full shadow-xs border border-[#E8F5E9]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* What's Included With Your Stay */}
          {room.keyFeatures && room.keyFeatures.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[#E8F5E9] shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B5E20] mb-4 sm:mb-6">
                  What&apos;s Included With Your Stay
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {room.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-800 bg-[#FAF7F2] p-3.5 sm:p-4 rounded-2xl border border-[#F0EBE1]">
                      <div className="w-6 h-6 rounded-full bg-[#1B5E20]/10 flex items-center justify-center text-[#1B5E20] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-xs sm:text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          {/* Interactive Photo Gallery with Tap-to-Lightbox */}
          <ScrollReveal delay={0.3}>
            <RoomGalleryViewer roomTitle={room.title} images={galleryImages} />
          </ScrollReveal>
        </div>

        {/* Right Column: Sticky Booking Box on Desktop / Primary Box on Mobile */}
        <div className="lg:col-span-1">
          <ScrollReveal delay={0.2} className="lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-[#E8F5E9]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F5E9] text-[#1B5E20] rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Direct Booking Guarantee</span>
              </div>
              <h3 className="text-2xl font-serif font-light text-[#1B5E20] mb-1">
                Reserve Your Room
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed font-light">
                Enjoy complimentary daily capybara encounters, artisan breakfast, and guaranteed lowest rates booking direct.
              </p>

              {/* Direct Booking Perks */}
              <div className="space-y-3 mb-6 p-4 bg-[#FAF7F2] rounded-2xl border border-[#F0EBE1]">
                <div className="flex items-center gap-2.5 text-xs font-medium text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Instant confirmation &amp; zero booking fees</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-gray-700">
                  <CalendarCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Flexible cancellation policies</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-gray-700">
                  <HeartHandshake className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Complimentary daily Capybara Encounter</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a 
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center py-4 bg-[#468CD0] hover:bg-[#3B7ABB] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#468CD0]/25 hover:-translate-y-0.5 text-sm sm:text-base active:scale-[0.99]"
                >
                  <span>Book Online Now</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] font-semibold uppercase tracking-wider">Or Concierge</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full text-center py-3.5 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold rounded-2xl transition-all shadow-md hover:-translate-y-0.5 text-sm sm:text-base active:scale-[0.99]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Chat &amp; Book via WhatsApp</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </section>

      {/* 4. Sticky Floating Mobile Booking Bar */}
      <RoomMobileBookingBar
        roomTitle={room.title}
        priceFrom={room.priceFrom}
        bookingUrl={BOOKING_URL}
        whatsappUrl={whatsappUrl}
      />
    </main>
  );
}
