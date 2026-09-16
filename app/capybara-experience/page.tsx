import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEncounterTicketsApiData, getGlobalSettings } from "@/lib/wordpress";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoModal from "@/components/capybara-experience/VideoModal";
import ExperienceGallery from "@/components/capybara-experience/ExperienceGallery";
import { Check, Clock, MapPin, Users, Heart, Leaf, Stethoscope, Camera, Baby, Droplets, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Capybara Experience Siem Reap | Meet Molly & Alex | From $10 | Casa de Capybara",
  description: "Cambodia's only capybara encounter. Meet Molly & Alex privately, feed them, and take home a free souvenir. Open daily 7am-9pm. Walk-ins welcome. From $10 per person.",
};

export default async function CapybaraExperiencePage() {
  const [encounterData, globalSettings] = await Promise.all([
    getEncounterTicketsApiData(),
    getGlobalSettings(),
  ]);

  // Fallback data
  const individualImgSrc = encounterData?.individualImage?.node?.sourceUrl || "/gallery/experience/individual.jpg";
  const familyImgSrc = encounterData?.familyImage?.node?.sourceUrl || "/gallery/experience/family.jpg";
  const telegramBaseUrl = globalSettings.telegramUrl || "https://t.me/capybaracambodia";
  const whatsappUrl = globalSettings.whatsappUrl || "https://wa.me/855968149795";

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E1C]">
      
      {/* SECTION 1: Luxury Video Hero Section */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#0F1710] text-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Fallback Image / Poster */}
          <div className="absolute inset-0">
            <Image
              src="/gallery/experience/hero.jpg"
              alt="Capybara atmospheric background"
              fill
              className="object-cover opacity-60"
              unoptimized
            />
          </div>
          
          {/* Video Background */}
          <div className="absolute inset-0 scale-[1.35] md:scale-110">
            <iframe
              src="https://www.youtube-nocookie.com/embed/-ebdWZmMo2Q?autoplay=1&mute=1&loop=1&playlist=-ebdWZmMo2Q&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              className="w-full h-full object-cover border-0 opacity-90"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            ></iframe>
          </div>

          {/* Rich Multi-Layer Gradient Overlays */}
          {/* 1. Deep Vignette and Dark Tint for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/80" />

          {/* 2. Brand Color Washes: Forest Green + Twilight Warmth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/50 via-transparent to-[#E65100]/30 mix-blend-color-dodge" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0F1710]/30 to-[#0F1710]/90" />
        </div>
        
        {/* Top Spacer / Navigation buffer */}
        <div className="w-full pt-20 sm:pt-24" />

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center flex-grow justify-center pb-20 px-4">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#F8BBD0]/30 text-[#F8BBD0] text-xs sm:text-sm font-medium tracking-wider uppercase mb-8 shadow-lg shadow-black/20 hover:border-[#F8BBD0]/60 transition-all duration-300">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E65100] animate-pulse" />
              <span>Cambodia's First & Only Capybara Oasis</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 text-white drop-shadow-md">
              Meet Molly & Alex — <br className="hidden md:block"/> 
              <span className="bg-gradient-to-r from-[#F8BBD0] via-[#FFB300] to-[#E65100] bg-clip-text text-transparent drop-shadow-none px-2 relative inline-block">
                Cambodia's Only
                <span className="absolute -top-4 -right-6 text-[#FFB300] text-xl opacity-80 animate-bounce delay-100">✨</span>
              </span> 
              <br className="hidden md:block"/> Two Capybaras
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="max-w-2xl sm:max-w-3xl text-base sm:text-lg md:text-xl text-gray-200/90 font-light leading-relaxed mb-10 drop-shadow mx-auto">
              A private, guided encounter unlike anything else in Siem Reap. Unhurried, ethical, and completely unforgettable. Open daily 7am to 9pm — walk-ins welcome.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <a href="#pricing" className="px-8 py-4 bg-gradient-to-r from-[#E65100] to-[#FF9800] hover:from-[#d84c00] hover:to-[#e68900] text-white font-bold rounded-full transition-all text-lg shadow-xl shadow-[#E65100]/20 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center border border-white/10">
              Get Your Ticket — From ${encounterData?.individualPrice ?? 10}
            </a>
            <VideoModal youtubeId="-ebdWZmMo2Q" />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: Story & Animal Sanctuary Ethos */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left" duration={1}>
            <div className="space-y-8">
              <div>
                <p className="text-[#2E7D32] font-bold tracking-widest uppercase text-sm mb-4">The Story of Molly & Alex</p>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] leading-tight">Where Gentle Giants Find Sanctuary</h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Molly and Alex arrived as part of a meticulously planned conservation and education effort. Their private habitat was designed by qualified animal husbandry and botanical experts to replicate their South American natural habitat — lush vegetation, expansive swimming waterways, and a cascading waterfall.
              </p>
              
              <blockquote className="border-l-4 border-[#D48806] pl-6 py-2 transform hover:translate-x-2 transition-transform duration-300">
                <p className="text-2xl text-gray-800 italic font-medium">"They are not here for show. They are here because they are loved."</p>
              </blockquote>

              <div className="inline-flex items-center gap-3 bg-[#E8F5E9] border border-[#2E7D32]/20 px-4 py-2 rounded-lg hover:shadow-md transition-shadow cursor-default">
                <span className="text-2xl animate-pulse">🏆</span>
                <span className="text-[#1B5E20] font-semibold text-sm">Featured in Sovrin Magazine</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" duration={1}>
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image 
                src="/gallery/experience/story.jpg"
                alt="Molly and Alex the Capybaras"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: Daily Schedule & Visiting Strip */}
      <section className="bg-[#1B5E20] text-white py-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ScrollReveal delay={0.1} direction="up">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
              <Clock className="w-8 h-8 text-[#D48806] shrink-0 transform transition-transform group-hover:rotate-12" />
              <div>
                <h4 className="font-bold text-lg mb-1">Operating Hours</h4>
                <p className="text-sm text-gray-300">7:00 AM – 9:00 PM Daily<br/><span className="text-[#D48806] font-medium">Best Activity: 9AM – 11AM</span></p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} direction="up">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 group">
              <MapPin className="w-8 h-8 text-[#D48806] shrink-0 transform transition-transform group-hover:-translate-y-2 group-hover:scale-110" />
              <div>
                <h4 className="font-bold text-lg mb-1">Location</h4>
                <p className="text-sm text-gray-300">Street 598, Ring Road, Siem Reap<br/>(5 mins from Angkor Eye)</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 group">
              <Check className="w-8 h-8 text-[#D48806] shrink-0 transform transition-transform group-hover:scale-125" />
              <div>
                <h4 className="font-bold text-lg mb-1">Easy Access</h4>
                <p className="text-sm text-gray-300">Walk-ins always welcome without advance booking.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} direction="up">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 group">
              <Baby className="w-8 h-8 text-[#D48806] shrink-0 transform transition-transform group-hover:rotate-[-15deg] group-hover:scale-110" />
              <div>
                <h4 className="font-bold text-lg mb-1">Young Visitors</h4>
                <p className="text-sm text-gray-300">Children under 3 enter free.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: Dynamic Ticket Packages (#pricing) */}
      <section id="pricing" className="py-24 px-4 bg-[#FBFDFB]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6">Choose Your Experience</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">No reservations required for day visits. Simply arrive, check in at the reception, and enter the sanctuary.</p>
              <a href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#E65100] font-bold hover:underline">
                <MapPin className="w-5 h-5" /> Get Directions
              </a>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Individual Package */}
            <ScrollReveal>
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E8F5E9] h-full flex flex-col group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image src={individualImgSrc} alt="Individual Capybara Encounter" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute top-4 right-4 bg-white/95 text-[#1B5E20] px-4 py-1.5 rounded-full font-bold shadow-lg">
                    ${encounterData?.individualPrice ?? 10} / person
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#1B5E20] mb-2">Individual Sanctuary Ticket</h3>
                  {encounterData?.individualPaxNote && (
                    <p className="text-sm font-medium text-[#2E7D32] mb-6 border-b border-gray-100 pb-4">
                      {encounterData.individualPaxNote}
                    </p>
                  )}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {encounterData?.individualInclusions && encounterData.individualInclusions.length > 0 ? (
                      encounterData.individualInclusions.map((item: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item.inclusionText}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> <span className="text-gray-700">Private guided encounter with Molly & Alex</span></li>
                        <li className="flex items-start gap-3"><Camera className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> <span className="text-gray-700">Staff-assisted professional photography</span></li>
                        <li className="flex items-start gap-3"><Leaf className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> <span className="text-gray-700">Supervised feeding session with fresh botanical greens</span></li>
                        <li className="flex items-start gap-3"><Heart className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> <span className="text-gray-700">Complimentary keepsake souvenir to take home</span></li>
                        <li className="flex items-start gap-3"><Droplets className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> <span className="text-gray-700">Full day access to the swimming pool with water slide</span></li>
                        <li className="flex items-start gap-3"><Baby className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> <span className="text-gray-700 font-medium">Children under 3: Always Complimentary</span></li>
                      </>
                    )}
                  </ul>
                  <a href={telegramBaseUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-4 bg-[#E65100] hover:bg-[#F57C00] text-white font-bold rounded-xl transition-all shadow-md">
                    Message Us on Telegram
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Family Package */}
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-b from-[#1B5E20] to-[#2E7D32] rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col relative group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <div className="relative h-64 overflow-hidden">
                  <Image src={familyImgSrc} alt="Family Capybara Experience" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute top-4 left-4 bg-[#D48806] text-white px-4 py-1.5 rounded-full font-bold shadow-lg text-sm tracking-wide uppercase">Best Value</div>
                  <div className="absolute top-4 right-4 bg-white/95 text-[#1B5E20] px-4 py-1.5 rounded-full font-bold shadow-lg">
                    ${encounterData?.familyPrice ?? 30} / family
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow text-white relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Family Sanctuary Package</h3>
                  <p className="text-[#B3E5FC] mb-6 pb-4 border-b border-white/20">
                    {encounterData?.familyPaxNote || "Valid for up to 4 Pax"}
                  </p>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    {encounterData?.familyInclusions && encounterData.familyInclusions.length > 0 ? (
                      encounterData.familyInclusions.map((item: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#D48806] shrink-0 mt-0.5" />
                          <span className="text-gray-100">{item.inclusionText}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-3"><Users className="w-5 h-5 text-[#D48806] shrink-0 mt-0.5" /> <span className="text-gray-100">All individual inclusions for up to 4 guests</span></li>
                        <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#D48806] shrink-0 mt-0.5" /> <span className="text-gray-100">Dedicated family handler assistance</span></li>
                        <li className="flex items-start gap-3"><Clock className="w-5 h-5 text-[#D48806] shrink-0 mt-0.5" /> <span className="text-gray-100">Extended feeding time</span></li>
                        <li className="flex items-start gap-3"><Baby className="w-5 h-5 text-[#D48806] shrink-0 mt-0.5" /> <span className="text-gray-100 font-medium">Children under 3 always free</span></li>
                      </>
                    )}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-4 bg-white text-[#1B5E20] hover:bg-gray-100 font-bold rounded-xl transition-all shadow-md mt-auto">
                    Message Us on WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: Overnight Guests Privilege Banner */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <div className="bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#D48806]" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#1B5E20] mb-4">Complimentary & Unlimited for Hotel Guests</h3>
            <p className="text-gray-700 text-lg max-w-3xl mb-8">
              Guests residing at Casa de Capybara enjoy unrestricted, complimentary access to Molly & Alex throughout their stay. No tickets, no time limits — just peaceful moments whenever you wish.
            </p>
            <Link href="/stay" className="px-8 py-4 bg-[#1B5E20] text-white font-bold rounded-full hover:bg-[#2E7D32] transition-colors shadow-md hover:-translate-y-1">
              Explore Boutique Rooms — From $50/Night
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 6: The Natural Habitat */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B5E20] mb-4">A Purpose-Built Haven Designed for Natural Living</h2>
              <div className="w-24 h-1 bg-[#D48806] mx-auto rounded-full transition-all duration-500 hover:w-32"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" duration={1}>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl group cursor-default">
                <Image 
                  src="/gallery/experience/habitat.jpg"
                  alt="Lush green natural habitat"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  unoptimized
                />
              </div>
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={0.1} direction="right">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                  <div className="p-4 bg-[#E8F5E9] rounded-2xl shrink-0 group-hover:bg-[#2E7D32] transition-colors duration-500"><Leaf className="w-8 h-8 text-[#2E7D32] group-hover:text-white transition-colors duration-500" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1B5E20] mb-2 group-hover:text-[#2E7D32] transition-colors">Natural Semi-Aquatic Environment</h4>
                    <p className="text-gray-600">Expansive swimming lagoons and an interactive waterfall allow natural swimming and diving behaviors.</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2} direction="right">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                  <div className="p-4 bg-[#E8F5E9] rounded-2xl shrink-0 group-hover:bg-[#2E7D32] transition-colors duration-500"><Wind className="w-8 h-8 text-[#2E7D32] group-hover:text-white transition-colors duration-500" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1B5E20] mb-2 group-hover:text-[#2E7D32] transition-colors">Climate Comfort</h4>
                    <p className="text-gray-600">Temperature-regulated rest areas and shaded lounging decks for ultimate comfort during warm days.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3} direction="right">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                  <div className="p-4 bg-[#E8F5E9] rounded-2xl shrink-0 group-hover:bg-[#2E7D32] transition-colors duration-500"><Heart className="w-8 h-8 text-[#2E7D32] group-hover:text-white transition-colors duration-500 group-hover:animate-pulse" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1B5E20] mb-2 group-hover:text-[#2E7D32] transition-colors">Nutritionist-Curated Diet</h4>
                    <p className="text-gray-600">Organic daily diet with specific botanical greens and unlimited access to fresh, clean water.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4} direction="right">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                  <div className="p-4 bg-[#E8F5E9] rounded-2xl shrink-0 group-hover:bg-[#2E7D32] transition-colors duration-500"><Stethoscope className="w-8 h-8 text-[#2E7D32] group-hover:text-white transition-colors duration-500" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1B5E20] mb-2 group-hover:text-[#2E7D32] transition-colors">24/7 Professional Welfare</h4>
                    <p className="text-gray-600">Dedicated veterinary oversight, continuous CCTV monitoring, and expert handler care.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Encounter Etiquette & Safety Protocols */}
      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="down">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mb-4">Encounter Etiquette & Safety</h2>
              <p className="text-gray-600">To ensure a peaceful and safe experience for both you and our capybaras, please observe these guidelines.</p>
            </div>
          </ScrollReveal>
            
          <div className="space-y-4 relative">
            {/* Connecting line between numbers */}
            <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-[#E8F5E9] hidden md:block -z-10" />

            {[
              { title: "Peaceful Demeanor", desc: "Speak softly and approach calmly; capybaras respond deeply to gentle energy." },
              { title: "Guided Pacing", desc: "Never rush or corner; all interactions are led by Molly & Alex's comfort." },
              { title: "Monitored Nutrition", desc: "Only feed treats provided by trained handlers." },
              { title: "Hygiene Standards", desc: "Sanitization and hand-washing stations must be used before and after entry." },
              { title: "Family Guidance", desc: "Children must be accompanied and supervised by an adult at all times." }
            ].map((rule, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} direction="up">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-[#E8F5E9] flex items-center gap-4 group transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center shrink-0 text-[#2E7D32] font-bold group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B5E20]">{rule.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{rule.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.8}>
            <p className="text-xs text-gray-400 text-center mt-8 uppercase tracking-wider">Tickets are non-refundable and non-transferable.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7.5: Gallery Section */}
      <ExperienceGallery />

      {/* SECTION 8: Final Invitation & Concierge Contact */}
      <section className="bg-[#1B5E20] py-24 px-4 text-center border-t-8 border-[#D48806]">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Experience the Magic in Person</h2>
            <p className="text-xl text-[#E8F5E9]">Our handlers and gentle capybaras are ready to welcome you today.</p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <a href="https://maps.app.goo.gl/f4JgMDUz7BNEAhjWA" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#D48806] hover:bg-[#b57303] text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center">
                <MapPin className="w-5 h-5" /> Get Directions
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white hover:bg-gray-100 text-[#1B5E20] font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center border border-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Us
              </a>
              <a href={telegramBaseUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl transition-all border-2 border-white flex items-center gap-2 w-full sm:w-auto justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.894-15.65c.297-1.428-.485-2.028-1.4-1.688l-13.35 5.15c-1.385.556-1.378 1.33-.255 1.674l3.418 1.066 7.915-4.992c.375-.23.717-.107.433.146l-6.416 5.794-.251 3.753c.367 0 .526-.168.73-.367l1.753-1.704 3.648 2.695c.671.37 1.155.18 1.32-.61l2.39-11.267z" /></svg>
                Telegram Us
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
      
    </main>
  );
}
