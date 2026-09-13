import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCapyRoomBySlug, getAllCapyRooms } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Check, Users, Maximize, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const room = await getCapyRoomBySlug(resolvedParams.slug);
  if (!room) return { title: "Room Not Found | Casa de Capybara" };
  return {
    title: `${room.title} | Casa de Capybara`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const room = await getCapyRoomBySlug(resolvedParams.slug);

  if (!room) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(`Hello! I would like to check availability and book the ${room.title}.`);
  const whatsappUrl = `https://wa.me/855968149795?text=${whatsappMessage}`;
  const bookingUrl = (room.inngeniusUrl && room.inngeniusUrl !== "https://inngenius.com") ? room.inngeniusUrl : "/book";

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A2E1C]">
      
      {/* Hero Image Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src={room.thumbnailUrl}
          alt={room.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto">
          <Link href="/stay" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium w-fit">
            <ArrowLeft className="w-5 h-5" /> Back to All Rooms
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-sm">
            {room.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-medium">
              <Maximize className="w-5 h-5" /> {room.sizeSqm}
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-medium">
              <Users className="w-5 h-5" /> {room.occupancy}
            </div>
            <div className="flex items-center gap-2 bg-[#E65100]/90 backdrop-blur-md px-4 py-2 rounded-full font-bold shadow-lg">
              {room.priceFrom} / Night
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Description & Features */}
        <div className="lg:col-span-2 space-y-12">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-[#1B5E20] mb-6">About this Room</h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
              <p>{room.description}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl font-bold text-[#1B5E20] mb-6">Room Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-800 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <Check className="w-6 h-6 text-[#E65100] shrink-0" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Room Gallery */}
          {room.photoGallery && room.photoGallery.length > 0 && (
            <ScrollReveal delay={0.3}>
              <h2 className="text-2xl font-bold text-[#1B5E20] mb-6 mt-12">Room Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.photoGallery.map((imgUrl, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <Image
                      src={imgUrl}
                      alt={`${room.title} gallery image ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-1">
          <ScrollReveal delay={0.3} className="sticky top-32">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E8F5E9]">
              <h3 className="text-2xl font-bold text-[#1B5E20] mb-2">Reserve Your Stay</h3>
              <p className="text-gray-500 mb-8">Dynamic pricing guarantees our best available rates when booking direct.</p>
              
              <div className="text-4xl font-bold text-[#E65100] mb-8 pb-8 border-b border-gray-100">
                {room.priceFrom} <span className="text-base font-normal text-gray-500">/ night</span>
              </div>

              <div className="space-y-4">
                <a 
                  href={bookingUrl}
                  target={bookingUrl === "/book" ? "_self" : "_blank"}
                  className="block w-full text-center py-4 bg-[#E65100] hover:bg-[#F57C00] text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-1 text-lg"
                >
                  Book Online
                </a>
                
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-1 text-lg"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Book via WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </section>
    </main>
  );
}
