import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Clock, Wifi, MessageCircle, Star, Utensils, CheckCircle2, Heart } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CafeFeaturedMenu from "@/components/cafe/CafeFeaturedMenu";
import CafeHeroSlider from "@/components/cafe/CafeHeroSlider";
import { getAllCafeMenuItems, getCafePageContent } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Capybara Cafe Siem Reap | Best Unique Cafe Near Angkor Wat | Open 7am-9pm",
  description: "Visit Capybara Cafe in Siem Reap — homemade food, fresh pastries, signature drinks and Cambodia's only capybaras. Vegetarian, vegan and gluten-free options. Open daily 7am-9pm.",
};

export default async function CafePage() {
  const [menuItems, cafeContent] = await Promise.all([
    getAllCafeMenuItems(),
    getCafePageContent(),
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-[#FBFDFB] text-[#1A1A1A]">
      
      {/* SECTION 1: Hero Section */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#1B5E20] text-white">
        <CafeHeroSlider />
        
        {/* Top Spacer / Navigation buffer */}
        <div className="w-full pt-20 sm:pt-24" />

        <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center flex-grow justify-center pb-20 px-4">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#F8BBD0]/50 text-[#F8BBD0] text-xs sm:text-sm font-medium tracking-wider uppercase mb-8 shadow-lg">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E65100] animate-pulse" />
              <span>{cafeContent?.heroEyebrow || "A Destination Cafe in Siem Reap"}</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-lg">
              {cafeContent?.heroHeadline ? (
                <div dangerouslySetInnerHTML={{ __html: cafeContent.heroHeadline }} />
              ) : (
                <>
                  Siem Reap's Most <br className="hidden md:block"/> 
                  <span className="bg-gradient-to-r from-[#F8BBD0] via-[#B3E5FC] to-[#F8BBD0] bg-clip-text text-transparent drop-shadow-none">Talked-About Cafe</span>
                </>
              )}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="max-w-2xl sm:max-w-3xl text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10 drop-shadow mx-auto">
              {cafeContent?.heroSubheadline || (
                <>
                  Great food. Signature drinks. Dreamy pastel atmosphere. <br className="hidden sm:block"/>
                  And Molly & Alex right here.
                </>
              )}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <a href="#menu" className="px-8 py-4 bg-[#E65100] hover:bg-[#c94600] text-white font-bold rounded-full transition-all text-lg shadow-xl shadow-[#E65100]/20 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center">
              Explore The Menu
            </a>
            <a href="#visit-info" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full transition-all text-lg hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center">
              Plan Your Visit
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: Atmosphere & Story */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left" duration={1}>
            <div className="relative h-[600px] w-full grid grid-cols-2 grid-rows-2 gap-4 rounded-3xl overflow-hidden group">
              <div className="relative row-span-2 rounded-2xl overflow-hidden">
                <Image src="/gallery/cafe/capybara-cafe-siem-reap-atmosphere-1.jpg" alt="capybara cafe siem reap pastel blue atmosphere" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" unoptimized />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#F8BBD0]">
                <Image src="/gallery/cafe/capybara-cafe-siem-reap-atmosphere-2.jpg" alt="capybara cafe siem reap watercolor wall" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#B3E5FC]">
                <Image src="/gallery/cafe/capybara-cafe-siem-reap-atmosphere-3.jpg" alt="capybara cafe siem reap neon sign" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 delay-100" unoptimized />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" duration={1}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-[#B3E5FC]/30 border border-[#B3E5FC]/50 px-4 py-2 rounded-lg text-[#1B5E20] font-semibold text-sm">
                <span className="text-xl">✨</span> The Most Instagrammable Cafe
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] leading-tight">More Than Just a Cafe</h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Step into a dreamy space where soft powder blues meet blush pink watercolor walls. It's a sanctuary for food lovers and animal lovers alike.
                </p>
                <p>
                  Everything you taste here is prepared fresh daily in-house — from our signature sauces and brioche burger buns to delicate pastries and handmade gnocchi. 
                </p>
                <p className="font-medium text-[#1B5E20]">
                  Open from 7am to 9pm every single day for breakfast, lunch, and dinner. Non-guests and day visitors are always welcome without reservations.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: Signature Specialties (Spotlight Grid) */}
      <section className="py-24 bg-[#E8F5E9] px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B5E20] mb-4">Signature Specialties</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Crafted with passion, served with love.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "The Capybara Burger",
                  desc: "House-ground beef patty, melted cheddar, brioche bun, caramelized onion jam, and homemade tropical mango salsa.",
                  img: "/gallery/cafe/capybara-cafe-siem-reap-special-burger.jpg"
                },
                {
                  title: "Artisanal Breakfast",
                  desc: "From the classic Full English and fluffy homemade pancakes to the Golden Croissant Club and Monte Cristo.",
                  img: "/gallery/cafe/capybara-cafe-siem-reap-special-breakfast.jpg"
                },
                {
                  title: "Signature Drinks",
                  desc: "Mango Matcha, Oat Hojicha, and Mango & Peach Latte served in custom collectible capybara mugs.",
                  img: "/gallery/cafe/capybara-cafe-siem-reap-special-drinks.jpg"
                },
                {
                  title: "Daily In-House Bakery",
                  desc: "Flaky croissants, homemade cakes, and fresh desserts baked fresh every morning by our pastry chef.",
                  img: "/gallery/cafe/capybara-cafe-siem-reap-special-bakery.jpg"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row h-full border border-white/50">
                  <div className="relative w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden bg-gray-100 shrink-0">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#1B5E20] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: Dynamic WordPress Menu Showcase (Teaser) */}
      <section className="py-24 px-4 bg-[#FBFDFB]">
        <CafeFeaturedMenu wpItems={menuItems} />
      </section>

      {/* SECTION 5: Dietary Options & European Kitchen Standards */}
      <section className="py-16 px-4 bg-[#E8F5E9] border-y border-[#2E7D32]/10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 text-[#1B5E20] font-bold text-lg">
              <span>🌱 Vegetarian</span>
              <span className="hidden md:inline text-[#2E7D32]/30">•</span>
              <span>🌿 Vegan</span>
              <span className="hidden md:inline text-[#2E7D32]/30">•</span>
              <span>🌾 Gluten-Free</span>
              <span className="hidden md:inline text-[#2E7D32]/30">•</span>
              <span>👶 Kids Menu</span>
              <span className="hidden md:inline text-[#2E7D32]/30">•</span>
              <span>🥩 Meat Lovers</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} direction="up">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center border border-[#1B5E20]/10 max-w-4xl mx-auto">
              <Utensils className="w-12 h-12 text-[#E65100] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">Uncompromising Kitchen Standards</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We operate with A-grade European kitchen equipment and maintain strict food hygiene protocols. 
                We use fresh, locally sourced produce and <strong className="text-[#1B5E20]">100% filtered water</strong> for all food preparation and ice. 
                Dine with complete peace of mind.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6: Meet Molly & Alex While You Dine */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1B5E20]">
           <Image src="/gallery/experience/habitat.jpg" alt="Capybara Habitat" fill className="object-cover opacity-20 mix-blend-overlay" unoptimized />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <ScrollReveal>
            <Heart className="w-16 h-16 text-[#F8BBD0] mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Molly & Alex are right next door!</h2>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Complete your visit with a private capybara encounter. Day passes are just $10/person or $30 for families. <br className="hidden md:block"/>
              <span className="text-[#F8BBD0] font-medium">(Complimentary for hotel guests)</span>
            </p>
            <Link href="/capybara-experience" className="inline-flex items-center justify-center px-8 py-4 bg-[#E65100] hover:bg-[#c94600] text-white font-bold rounded-full transition-transform hover:-translate-y-1 shadow-xl">
              Learn About Capybara Encounters
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7: Visit Info & Directions */}
      <section id="visit-info" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B5E20] mb-4">Plan Your Visit</h2>
              <div className="w-24 h-1 bg-[#D48806] mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <ScrollReveal delay={0.1} direction="up">
              <div className="bg-[#FAF7F2] p-8 rounded-3xl text-center h-full hover:shadow-md transition-shadow">
                <Clock className="w-10 h-10 text-[#E65100] mx-auto mb-4" />
                <h4 className="font-bold text-[#1B5E20] text-lg mb-2">Opening Hours</h4>
                <p className="text-gray-600">7:00 AM – 9:00 PM Daily<br/>Walk-ins always welcome.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="up">
              <a
                href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF7F2] p-8 rounded-3xl text-center h-full hover:shadow-md transition-all block group cursor-pointer"
              >
                <MapPin className="w-10 h-10 text-[#E65100] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-[#1B5E20] text-lg mb-2">Location</h4>
                <p className="text-gray-600">Street 598, Ring Road off NH6<br/>Siem Reap</p>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="up">
              <div className="bg-[#FAF7F2] p-8 rounded-3xl text-center h-full hover:shadow-md transition-shadow">
                <Wifi className="w-10 h-10 text-[#E65100] mx-auto mb-4" />
                <h4 className="font-bold text-[#1B5E20] text-lg mb-2">Amenities</h4>
                <p className="text-gray-600">Free spacious on-site parking<br/>High-speed WiFi available.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="up">
              <div className="bg-[#FAF7F2] p-8 rounded-3xl text-center h-full hover:shadow-md transition-shadow">
                <MessageCircle className="w-10 h-10 text-[#E65100] mx-auto mb-4" />
                <h4 className="font-bold text-[#1B5E20] text-lg mb-2">Contact</h4>
                <p className="text-gray-600">Instant WhatsApp concierge<br/>for group tables & queries.</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#1B5E20] hover:bg-[#124216] text-white font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto text-center shadow-lg">
                Get Directions (Google Maps)
              </a>
              <a href="https://wa.me/855968149795" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto text-center shadow-lg">
                WhatsApp: +855 968 149 795
              </a>
              <a href="https://t.me/capybaracambodia" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold rounded-full transition-transform hover:-translate-y-1 w-full sm:w-auto text-center shadow-lg">
                Telegram: @capybaracambodia
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
