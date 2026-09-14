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
  CalendarCheck
} from "lucide-react";

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

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A2E1C]">
      
      {/* Hero Image Section */}
      <section className="relative w-full h-[65vh] md:h-[75vh]">
        <Image
          src={room.thumbnailUrl}
          alt={room.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
          <Link 
            href="/stay" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors font-semibold text-sm bg-black/30 backdrop-blur-md px-4 py-2 rounded-full w-fit hover:bg-black/50"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Rooms
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            {room.title}
          </h1>
          
          {/* Key Specs Pills */}
          <div className="flex flex-wrap gap-3 text-white">
            {room.occupancy && (
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full font-medium text-sm border border-white/15">
                <Users className="w-4 h-4 text-[#E65100]" /> {room.occupancy}
              </div>
            )}
            {cleanSize && (
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full font-medium text-sm border border-white/15">
                <Maximize className="w-4 h-4 text-[#E65100]" /> {cleanSize}
              </div>
            )}
            {room.bedType && (
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full font-medium text-sm border border-white/15">
                <BedDouble className="w-4 h-4 text-[#E65100]" /> {room.bedType}
              </div>
            )}
            {cleanFloor && (
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full font-medium text-sm border border-white/15">
                <Building className="w-4 h-4 text-[#E65100]" /> {cleanFloor}
              </div>
            )}
            {cleanBalcony && (
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full font-medium text-sm border border-white/15">
                <Sun className="w-4 h-4 text-[#E65100]" /> {cleanBalcony}
              </div>
            )}
            <div className="flex items-center gap-2 bg-[#1B5E20]/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-sm text-white shadow-lg border border-white/20">
              🐾 Free Unlimited Capybara Encounter Included
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Description & Features */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* About Section */}
          <ScrollReveal>
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8F5E9] shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E65100] mb-2 block">
                Sanctuary Living
              </span>
              <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">About this Room</h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
                <p>{room.description}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Room Highlights & Special Features (Clean Luxury Tags) */}
          {specialList.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#F4F9F4] to-[#FAF7F2] border border-[#E8F5E9] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E65100]/10 flex items-center justify-center text-[#E65100] shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1B5E20]">Room Highlights & Amenities</h2>
                    <p className="text-xs text-gray-500">Carefully curated features for a serene boutique stay</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {specialList.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-sm font-semibold text-[#1A2E1C] rounded-full shadow-xs border border-[#E8F5E9] hover:border-[#1B5E20]/40 transition-colors"
                    >
                      <Check className="w-4 h-4 text-[#2E7D32]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Included Features / Services */}
          {room.keyFeatures && room.keyFeatures.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8F5E9] shadow-xs">
                <h2 className="text-2xl font-bold text-[#1B5E20] mb-6">What's Included With Your Stay</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {room.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-800 bg-[#FAF7F2] p-4 rounded-2xl border border-[#F0EBE1]">
                      <div className="w-6 h-6 rounded-full bg-[#1B5E20]/10 flex items-center justify-center text-[#1B5E20] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          {/* Room Gallery */}
          {room.photoGallery && room.photoGallery.length > 0 && (
            <ScrollReveal delay={0.3}>
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8F5E9] shadow-xs">
                <h2 className="text-2xl font-bold text-[#1B5E20] mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {room.photoGallery.map((imgUrl, i) => (
                    <div key={i} className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group">
                      <Image
                        src={imgUrl}
                        alt={`${room.title} gallery image ${i + 1}`}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-1">
          <ScrollReveal delay={0.2} className="sticky top-28">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#E8F5E9]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F5E9] text-[#1B5E20] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Direct Booking Guarantee
              </div>
              <h3 className="text-2xl font-extrabold text-[#1B5E20] mb-2">Reserve Your Room</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Enjoy complimentary, unlimited capybara encounters, free artisan breakfast, and the best available rates when booking direct.
              </p>

              {/* Direct Booking Perks */}
              <div className="space-y-3 mb-8 p-4 bg-[#FAF7F2] rounded-2xl border border-[#F0EBE1]">
                <div className="flex items-center gap-2.5 text-xs font-medium text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Instant confirmation & zero booking fees</span>
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

              <div className="space-y-3.5">
                <a 
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center py-4 bg-[#E65100] hover:bg-[#d84315] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#E65100]/25 hover:-translate-y-0.5 text-base"
                >
                  <span>Book Online Now</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">Or</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full text-center py-3.5 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold rounded-2xl transition-all shadow-md hover:-translate-y-0.5 text-base"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>Chat & Book via WhatsApp</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </section>
    </main>
  );
}
