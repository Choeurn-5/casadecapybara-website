import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Flame, Activity, Droplets, ChefHat, Cctv, Bug, ShieldCheck, Ban, ArrowRight, Sparkles, Dumbbell, HeartPulse } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FamiliesGallery from "@/components/families/FamiliesGallery";
import { getGlobalSettings } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Family Hotel Cambodia | Kids Activities & Safety Standards | Casa de Capybara",
  description: "Cambodia's first and only dedicated kids' hotel. Real capybaras, themed rooms, pool with slide, 200+ costumes, full gym, sauna, steam room and the highest family safety standards in Cambodia. From $50/night.",
};

export default async function FamiliesPage() {
  const settings = await getGlobalSettings();
  const bookingUrl = settings.bookingEngineUrl || "https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara";

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFDFB] text-[#1A1A1A]">
      
      {/* SECTION 1: Hero Section */}
      <section className="relative w-full min-h-[90svh] flex flex-col justify-center items-center overflow-hidden bg-[#0C4A6E] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery/families/f1.jpg"
            alt="Children joyfully interacting with Molly & Alex"
            fill
            className="object-cover opacity-80"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C4A6E] via-black/45 to-black/65 z-10" />
        </div>
        
        <div className="w-full pt-20 sm:pt-24" />

        <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center flex-grow justify-center pb-20 px-4">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-950/60 backdrop-blur-md border border-sky-400/40 text-sky-200 text-xs sm:text-sm font-bold tracking-widest uppercase mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span>CAMBODIA'S FIRST & ONLY DEDICATED KIDS' HOTEL</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-xl">
              Built For Families. <br className="hidden md:block"/> 
              <span className="text-[#38BDF8]">Designed For Memories.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="max-w-2xl sm:max-w-3xl text-lg md:text-xl text-gray-100 font-medium leading-relaxed mb-10 drop-shadow-md mx-auto">
              Cambodia's first and only dedicated kids' hotel — where every experience is unforgettable and every safety detail has been thought of so you don't have to.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#468CD0] hover:bg-[#3B7ABB] text-white font-bold rounded-full transition-all text-lg shadow-xl shadow-[#468CD0]/30 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center">
              Check Availability
            </a>
            <Link href="/book" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full transition-all text-lg hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center">
              Plan Your Visit
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: Introduction */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-8 leading-tight">
              Adventure for Children. <br/>
              <span className="text-[#E65100]">Peace of Mind for Parents.</span>
            </h2>
            <div className="w-24 h-1 bg-[#2E7D32] mx-auto rounded-full mb-10"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              When parents ask us what makes Casa de Capybara different from every other family hotel in Cambodia, the answer is simple. We thought about your children in everything we designed. And we thought about your peace of mind in everything we built. From the moment your family arrives — the adventure begins for the children and the relaxation begins for you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: Interweaved Features (Alternating Layout) */}
      <section className="py-16 md:py-24 bg-[#E8F5E9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-24 md:space-y-32">
          
          {/* Feature 1: Molly & Alex */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <ScrollReveal direction="left" className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/gallery/families/f1.jpg" alt="Meet Molly & Alex" fill className="object-cover" unoptimized />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] font-bold text-sm tracking-wide uppercase">
                <Cctv className="w-4 h-4" /> Complimentary for Hotel Guests
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1B5E20]">Meet Molly & Alex</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                The highlight of every family stay — and completely free for hotel guests. Molly and Alex, Cambodia's only two capybaras, are gentle, curious and endlessly fascinating. As a hotel guest your encounter is complimentary and unlimited throughout your entire stay. No ticket. No time limit. Their habitat is monitored by full CCTV and managed daily by our specialist team.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Capybaras are naturally social animals who thrive on human interaction. Guests in their 60s and 70s have told us that spending quiet time with Molly and Alex was one of the most healing experiences of their entire trip.
              </p>
            </ScrollReveal>
          </div>

          {/* Feature 2: Pool & Slide */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <ScrollReveal direction="right" className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/gallery/families/f2.jpg" alt="Swimming Pool with Water Slide" fill className="object-cover" unoptimized />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1B5E20]">Swimming Pool with Water Slide</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Their new favourite place — guaranteed. Our outdoor swimming pool with water slide is clean, safe and maintained to the highest standards with regular water quality checks. Pool area under full CCTV surveillance at all times.
              </p>
            </ScrollReveal>
          </div>

          {/* Feature 3: Playroom */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <ScrollReveal direction="left" className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/gallery/families/f3.jpg" alt="Indoor Kids Playroom" fill className="object-cover" unoptimized />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1B5E20]">Indoor Kids Playroom</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                When the sun gets too hot — the fun moves inside. Our fully equipped indoor kids' playroom is stocked with toys, games and activities for children of all ages. Cool, safe and endlessly entertaining. Staff always present. Full CCTV.
              </p>
            </ScrollReveal>
          </div>

          {/* Feature 4: Costumes */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <ScrollReveal direction="right" className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/gallery/families/f4.jpg" alt="200+ Dress-Up Costumes" fill className="object-cover" unoptimized />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1B5E20]">200+ Dress-Up Costumes</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our legendary costume collection — over 200 outfits covering every character and theme — is one of the most talked-about features of any family stay. Watch their faces light up. Warning: choosing a costume may take longer than breakfast.
              </p>
            </ScrollReveal>
          </div>

          {/* Feature 5: Playground */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <ScrollReveal direction="left" className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/gallery/families/f5.jpg" alt="Outdoor Playground" fill className="object-cover" unoptimized />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1B5E20]">Outdoor Playground</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fresh air, sunshine and endless energy. Our outdoor playground gives children the freedom to run, climb and play in a safe, well-maintained environment. Full CCTV coverage.
              </p>
            </ScrollReveal>
          </div>

          {/* Feature 6: Themed Room */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <ScrollReveal direction="right" className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/gallery/families/f8.jpg" alt="Capybara Themed Room" fill className="object-cover" unoptimized />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E65100]/10 text-[#E65100] font-bold text-sm tracking-wide uppercase">
                <Flame className="w-4 h-4" /> A Treasure Hunt
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1B5E20]">Capybara Themed Room</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                The moment your children step inside — the adventure begins. Capybara themed tiles, glowing neon lights, a capybara toothbrush, slippers, cup, towel, pillow and toys waiting just for them. Dimmable lighting for bedtime. Night lamp for little ones. Fan and AC. Private balcony. Every room a memory.
              </p>
            </ScrollReveal>
          </div>

          {/* Feature 7: Parents Relaxation */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <ScrollReveal direction="left" className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#1B5E20] p-8 flex items-center justify-center text-center shadow-2xl">
                <Image src="/gallery/families/f6.jpg" alt="For the Parents" fill className="object-cover opacity-60 mix-blend-overlay" unoptimized />
                <h3 className="text-3xl md:text-5xl font-bold text-[#F8BBD0] leading-tight relative z-10">Because You<br/>Came On<br/>Holiday Too.</h3>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1B5E20]">For the Parents — You Came on Holiday Too</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Spa and massage services. Steam room and sauna. Fully equipped gym. Beauty salon. Room service. English, Khmer and Hindi speaking staff. Free WiFi and parking. Check-in 2pm, check-out 12 noon.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* SECTION 4: Dedicated Wellness & Fitness Facilities */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-4">Dedicated Wellness & Fitness</h2>
              <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full mb-10"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Full Modern Gym */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-md group h-full flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <Image src="/gallery/families/g5.jpg" alt="Full Modern Gym" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                </div>
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-3 mb-4 text-[#1B5E20]">
                    <Dumbbell className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">Full Modern Gym</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Clean, modern, fully air-conditioned fitness suite with professional cardio and strength equipment so you can maintain your fitness routine while away.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Steam Room & Sauna */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-md group h-full flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <Image src="/gallery/families/g6.jpg" alt="Steam Room & Sauna" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                </div>
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-3 mb-4 text-[#1B5E20]">
                    <Droplets className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">Steam Room & Sauna</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Clean, atmospheric, soothing thermal heat and eucalyptus steam room designed for complete muscle relief and rejuvenation after exploring Angkor Wat.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Supporting Amenity: Beauty Salon & Spa */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="bg-[#1B5E20] text-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row max-w-5xl mx-auto">
              <div className="w-full md:w-2/5 relative min-h-[250px]">
                <Image src="/gallery/families/g7.jpg" alt="Beauty Salon & Spa" fill className="object-cover" unoptimized />
              </div>
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 text-[#F8BBD0]">
                  <HeartPulse className="w-8 h-8" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Beauty Salon & Spa</h3>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Complete your day of relaxation with our professional massage therapies and beauty treatments. Designed to offer ultimate tranquility while the kids are safely entertained.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: Safety Credentials (Clean Icon Grid) */}
      <section className="py-24 px-4 bg-[#E8F5E9]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-4">Your Family's Safety Is Our Highest Priority</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">We do not just say it. We built it into every corner of this property.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Flame, title: "FIRE SAFETY", desc: "Smoke alarms in every single room. Fire extinguishers on every floor. Regular emergency training for all staff. Assembly point at the front gate. Full fire safety information in every room in English and Khmer." },
                { icon: Activity, title: "FIRST AID", desc: "Trained first aid available on site at all times." },
                { icon: Droplets, title: "MONTHLY WATER FILTER CHANGES", desc: "Clean, safe water throughout the property — guaranteed. We change our water filters every single month without exception." },
                { icon: ChefHat, title: "EUROPEAN GRADE KITCHEN & FOOD SAFETY", desc: "A-grade European kitchen equipment. Strict food safety and hygiene protocols. Professional allergen management. The same standards you would expect at home." },
                { icon: Cctv, title: "FULL CCTV", desc: "Complete CCTV coverage inside and outside the property — 24 hours a day, 7 days a week." },
                { icon: Bug, title: "MOSQUITO PREVENTION", desc: "One of the most rigorous mosquito prevention programmes in Siem Reap. We take malaria and dengue seriously — your family can enjoy our outdoor spaces without worry." },
                { icon: ShieldCheck, title: "PROFESSIONAL PEST CONTROL", desc: "Ongoing professional pest control throughout the property. Clean, safe and well-maintained at all times." },
                { icon: Ban, title: "SMOKE FREE", desc: "Smoking strictly prohibited indoors and in all rooms. Permitted on private balconies only." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl h-full border border-[#1B5E20]/10 hover:border-[#1B5E20]/30 hover:shadow-lg transition-all group flex flex-col hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#FAF7F2] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-[#E65100]" />
                  </div>
                  <h4 className="font-bold text-[#1B5E20] text-lg mb-3 leading-snug">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6: Family & Safety Moments Gallery */}
      <section className="py-24 px-4 bg-[#FBFDFB]">
        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-4">See It to Believe It — Family & Safety Moments</h2>
            <div className="w-24 h-1 bg-[#E65100] mx-auto rounded-full"></div>
          </div>
        </ScrollReveal>
        
        <FamiliesGallery />
      </section>

      {/* SECTION 7: Final CTA */}
      <section className="py-24 px-4 bg-[#1B5E20] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#2E7D32]/50 rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Cambodia's Safest, Most Unique Family Hotel <br/>
              <span className="text-[#F8BBD0]">Ready For Your Family.</span>
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              23 capybara themed rooms from $50/night. Minutes from Angkor Wat. Book direct for best rates.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#468CD0] hover:bg-[#3B7ABB] text-white font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto shadow-lg">
                Check Availability — Book Now
              </a>
              <Link href="/book" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto shadow-lg">
                Plan Your Visit
              </Link>
              <a href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '') || '855968149795'}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto shadow-lg">
                WhatsApp: {settings.whatsappNumber || '+855 968 149 795'}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
