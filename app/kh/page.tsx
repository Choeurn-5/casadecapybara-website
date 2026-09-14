import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Noto_Sans_Khmer } from 'next/font/google';
import { 
  Send, 
  MapPin, 
  Clock, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Waves, 
  Utensils, 
  Baby, 
  Users, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

const notoKhmer = Noto_Sans_Khmer({
  weight: ['400', '500', '600', '700'],
  subsets: ['khmer'],
  display: 'swap',
  variable: '--font-noto-khmer',
});

// Dynamic GraphQL Data Fetcher
async function getKhmerData() {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.casadecapybara.com/graphql';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
      body: JSON.stringify({
        query: `
          query GetKhmerPage {
            page(id: "kh", idType: URI) {
              khmerPageSettings {
                khHeroTagline
                khHeroWelcome
                khHeroVideoUrl
                khSingleTicketPrice
                khFamilyTicketPrice
                khLocalDealActive
                khLocalDealSpend
                khLocalDealCashback
                khLocalDealText
                khRoomsIntro
                khCheckinTime
                khCheckoutTime
                khCafeHeadline
                khCafeDesc
                khCafeMenuKhmer
                khTelegramHandle
                khTelegramPhone
                khTelegramUrl
                khTelegramQr {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const json = await res.json();
    return json?.data?.page?.khmerPageSettings || {};
  } catch (error) {
    console.error('Error fetching Khmer page settings:', error);
    return {};
  }
}

export const metadata = {
  title: "Casa de Capybara សៀមរាប | សណ្ឋាគារគ្រួសារ ហាងកាហ្វេ និងសត្វកាពីបារ៉ាដំបូងបង្អស់នៅកម្ពុជា",
  description: "ជួបជាមួយសត្វកាពីបារ៉ាពិតៗ Molly & Alex, បន្ទប់ស្នាក់នៅបែបប៊ូទិក, អាងហែលទឹកមានរំអិល និងហាងកាហ្វេដ៏ស្រស់ស្អាតនៅជិតប្រាសាទអង្គរវត្ត។",
  openGraph: {
    title: "Casa de Capybara សៀមរាប | សណ្ឋាគារគ្រួសារ ហាងកាហ្វេ និងសត្វកាពីបារ៉ាដំបូងបង្អស់នៅកម្ពុជា",
    description: "ជួបជាមួយសត្វកាពីបារ៉ាពិតៗ Molly & Alex, បន្ទប់ស្នាក់នៅបែបប៊ូទិក, អាងហែលទឹកមានរំអិល និងហាងកាហ្វេដ៏ស្រស់ស្អាតនៅជិតប្រាសាទអង្គរវត្ត។",
    type: "website",
    locale: "km_KH",
  }
};

export default async function KhmerPage() {
  const data = await getKhmerData();

  // Fallback defaults from the official document
  const telegramHandle = data.khTelegramHandle || "@capybaracambodia";
  const telegramPhone = data.khTelegramPhone || "+855 968 149 795";
  const telegramUrl = data.khTelegramUrl || `https://t.me/capybaracambodia`;
  const singlePrice = data.khSingleTicketPrice || "៤០,០០០ រៀល / ១ នាក់";
  const familyPrice = data.khFamilyTicketPrice || "១២០,០០០ រៀល";
  const localSpend = data.khLocalDealSpend || "២០,០០០៛";
  const localCashback = data.khLocalDealCashback || "២០,០០០៛";

  const getYoutubeId = (url: string) => {
    if (!url) return "3mTyoZkffn8";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "3mTyoZkffn8";
  };
  const youtubeId = getYoutubeId(data.khHeroVideoUrl);

  return (
    <div className={`${notoKhmer.className} min-h-screen bg-[#FDFDFD] text-[#1A1A1A] antialiased selection:bg-[#F8BBD0] selection:text-[#1B5E20]`}>

      {/* ✈️ PERSISTENT FLOATING TELEGRAM BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <a 
          href={telegramUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/80"
        >
          <Send className="w-5 h-5 text-[#B3E5FC]" />
          <span className="font-semibold text-sm">Telegram {telegramHandle}</span>
        </a>
      </div>

      {/* ផ្នែកទី១ — HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden px-4">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-10" />
        
        {/* Video or Image Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Fallback & Loading Poster Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-90"
            style={{
              backgroundImage: `url('https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg')`,
              backgroundColor: "#1B5E20",
            }}
          />

          {/* YouTube Responsive Video Container */}
          <div className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%]">
            <iframe
              className="w-full h-full object-cover border-0"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
              title="Casa de Capybara Sanctuary Experience"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>

          {/* Rich Multi-Layer Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/40 via-transparent to-[#E65100]/30 mix-blend-color-dodge" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0F1710]/40 to-[#0F1710]/90" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto text-center text-white py-20">
          <div className="inline-block bg-[#1B5E20]/80 backdrop-blur-md border border-white/20 text-[#B3E5FC] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🐾 រីសតគ្រួសារដំបូងបង្អស់នៅកម្ពុជា
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#F8BBD0]">
            Casa de Capybara
          </h1>

          <p className="text-lg md:text-2xl font-medium text-white/95 max-w-2xl mx-auto mb-8 leading-relaxed">
            {data.khHeroTagline || "ជាកន្លែងដែលរាល់ការមកដល់របស់អ្នក នឹងក្លាយជាអនុស្សាវរីយ៍ដែលមិនអាចបំភ្លេចបាន"}
          </p>

          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-sm md:text-base text-white/85 max-w-3xl mx-auto leading-relaxed mb-8">
            {data.khHeroWelcome || `សូមស្វាគមន៍មកកាន់ Casa de Capybara! នេះគឺជារីសតដំបូងគេ និងតែមួយគត់ក្នុងប្រទេសកម្ពុជា ដែលត្រូវបានរៀបចំឡើងយ៉ាងសម្រិតសម្រាំងជាលក្ខណៈគ្រួសារ ហើយក៏ជាទីកន្លែងតែមួយគត់ដែលបងប្អូនកូនក្មួយអាចជួបជាមួយសត្វ Capybara ដ៏គួរឱ្យស្រឡាញ់។ យើងបានចាប់ផ្តើមបើកទ្វារទទួលស្វាគមន៍ភ្ញៀវតាំងពីខែមករា ឆ្នាំ២០២៦ មកម្ល៉េះ។`}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#capybara-experience" 
              className="bg-[#E65100] hover:bg-[#ff5d05] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:scale-105"
            >
              ស្វែងយល់បន្ថែមអំពី Molly & Alex
            </a>
            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-xl font-medium transition-colors"
            >
              ផ្ញើសារ Telegram ឥឡូវនេះ
            </a>
          </div>
        </div>
      </section>

      {/* ផ្នែកទី២ — CAPYBARA EXPERIENCE */}
      <section id="capybara-experience" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#1B5E20] font-semibold text-sm tracking-wider uppercase bg-[#E8F5E9] px-3.5 py-1 rounded-full">
            បទពិសោធន៍ពិសេស
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-4 mb-6 leading-snug">
            ជួបជាមួយ Molly និង Alex៖ សត្វកាពីបារ៉ាតែពីរក្បាលគត់ក្នុងប្រទេសកម្ពុជា!
          </h2>
          <p className="text-neutral-700 leading-relaxed text-base md:text-lg">
            បងប្អូនកូនក្មួយទាំងអស់គ្នា! បើសិនជាមានឱកាសបានមកដល់ទឹកដីសៀមរាបអង្គរ កុំភ្លេចមកស្គាល់ Molly និង Alex ដែលជាសត្វកាពីបារ៉ា (Capybara) តែពីរក្បាលគត់នៅក្នុងប្រទេសកម្ពុជាយើង។ ពួកវាជាសត្វកណ្ដុរយក្សដ៏គួរឱ្យស្រឡាញ់បំផុតនៅលើលោក ហើយក៏ជាអ្នករស់នៅដ៏ល្បីឈ្មោះប្រចាំទឹកដីសៀមរាបយើងដែរ។ បងប្អូនមិនបាច់បារម្ភពីរឿងសុវត្ថិភាពនោះទេ ព្រោះយើងមានបុគ្គលិកជំនាញចាំណែនាំ និងមើលថែយ៉ាងដិតដល់បំផុត។
          </p>
        </div>

        {/* 2 Clean Side-by-Side Pricing Cards with Green Borders */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Single Ticket */}
          <div className="bg-white border-2 border-[#1B5E20] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#1B5E20] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
              ពេញនិយម
            </div>
            <h3 className="text-xl font-bold text-[#1B5E20] mb-2">🐾 ប្រភេទសំបុត្រឯកជន</h3>
            <div className="text-3xl font-extrabold text-[#E65100] mb-6">
              {singlePrice}
            </div>
            <ul className="space-y-3.5 text-neutral-700 text-sm md:text-base mb-8">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ការជួបឯកជនជាមួយ Molly & Alex</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ជំនួយក្នុងការថតរូបដោយបុគ្គលិកជំនាញ</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ការផ្តល់ចំណីដោយមានការណែនាំត្រឹមត្រូវ</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ទទួលបានព័ត៌មាន និងចំណេះដឹងអំពីសត្វកាពីបារ៉ា</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ទទួលបានវត្ថុអនុស្សាវរីយ៍ពិសេសដោយឥតគិតថ្លៃ</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ប្រើប្រាស់អាងហែលទឹក + ទីធ្លាលេងកម្សាន្ត + បន្ទប់លេងកម្សាន្តម៉ាស៊ីនត្រជាក់</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5 font-bold" /> កុមារអាយុក្រោម ៣ ឆ្នាំ មិនគិតថ្លៃសំបុត្រ</li>
            </ul>
            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#1B5E20] hover:bg-[#2E7D32] text-white py-3.5 rounded-xl font-bold transition-colors"
            >
              សាកសួរ ឬកក់តាម Telegram
            </a>
          </div>

          {/* Family Package */}
          <div className="bg-white border-2 border-[#1B5E20] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#E65100] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
              កញ្ចប់សន្សំសំចៃ
            </div>
            <h3 className="text-xl font-bold text-[#1B5E20] mb-2">🐾🐾🐾🐾 កញ្ចប់គ្រួសារ</h3>
            <div className="text-3xl font-extrabold text-[#E65100] mb-6">
              {familyPrice}
            </div>
            <ul className="space-y-3.5 text-neutral-700 text-sm md:text-base mb-8">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5 font-semibold" /> សម្រាប់មនុស្សពេញវ័យ ២ នាក់ + កុមារ ២ នាក់</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> រួមបញ្ចូលការជួបឯកជន ការថតរូប និងការផ្តល់អាហារផ្ទាល់ជាមួយសត្វ</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ទទួលបានវត្ថុអនុស្សាវរីយ៍ឥតគិតថ្លៃ</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" /> ការប្រើប្រាស់អាងហែលទឹក និងកន្លែងក្មេងលេង</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5 font-bold" /> កុមារអាយុក្រោម ៣ ឆ្នាំ មិនគិតថ្លៃសំបុត្រជាដាច់ខាត</li>
            </ul>
            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#E65100] hover:bg-[#ff5d05] text-white py-3.5 rounded-xl font-bold transition-colors"
            >
              សាកសួរកញ្ចប់គ្រួសារតាម Telegram
            </a>
          </div>
        </div>

        {/* Free for Hotel Guests Banner */}
        <div className="bg-[#E8F5E9] border border-[#2E7D32]/30 rounded-2xl p-6 text-center">
          <p className="text-[#1B5E20] font-bold text-lg">
            🐾 សម្រាប់ភ្ញៀវស្នាក់នៅសណ្ឋាគារ៖ ជួបសត្វកាពីបារ៉ាដោយឥតគិតថ្លៃគ្មានដែនកំណត់!
          </p>
        </div>

        {/* Operational Info Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 bg-neutral-100 p-5 rounded-2xl text-center text-sm text-neutral-700">
          <div>⏰ <strong>ម៉ោងធ្វើការ៖</strong> ៧:០០ ព្រឹក – ៩:០០ យប់ (រាល់ថ្ងៃ)</div>
          <div>📍 <strong>ទីតាំង៖</strong> ផ្លូវក្រវាត់ក្រុង សៀមរាប (ជិតអង្គរវត្ត)</div>
          <div>🎟️ <strong>ការចូលទស្សនា៖</strong> Walk-ins ស្វាគមន៍ជានិច្ច មិនបាច់កក់ទុកមុន</div>
        </div>
      </section>

      {/* ផ្នែកទី៣ — LOCAL SPECIAL DEAL */}
      <section className="py-16 px-4 bg-[#E8F5E9] border-y border-[#2E7D32]/20">
        <div className="max-w-4xl mx-auto bg-white border-2 border-[#1B5E20] rounded-3xl p-8 md:p-12 shadow-md">
          <div className="text-center mb-8">
            <span className="bg-[#1B5E20] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              សម្រាប់អ្នកសៀមរាប
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B5E20] mt-4 mb-3">
              🐾 ព្រឹត្តិការណ៍ពិសេស សម្រាប់អ្នករស់នៅ ធ្វើការ ឬរៀននៅសៀមរាប
            </h2>
            <div className="text-xl md:text-2xl font-extrabold text-[#E65100]">
              ចំណាយលើសំបុត្រចូល {localSpend} — ទទួលបានមកវិញ {localCashback} ជាក្រេឌីតសម្រាប់ចំណាយក្នុងហាង
            </div>
          </div>

          <p className="text-neutral-700 leading-relaxed mb-6 text-center text-base">
            {data.khLocalDealText || `យើងខ្ញុំមានសេចក្តីស្រឡាញ់យ៉ាងជ្រាលជ្រៅចំពោះសហគមន៍របស់យើង។ ប្រសិនបើបងប្អូនរស់នៅ បំពេញការងារ ឬកំពុងសិក្សានៅក្នុងខេត្តសៀមរាប — យើងខ្ញុំមានមោទនភាពក្នុងការផ្តល់ជូននូវតម្លៃពិសេសបំផុត ដើម្បីជាសក្ខីភាពបញ្ជាក់ពីក្តីស្រឡាញ់ និងការយកចិត្តទុកដាក់ចំពោះបងប្អូនខ្មែរយើង។`}
          </p>

          <div className="bg-[#E8F5E9] rounded-2xl p-6 mb-8 max-w-xl mx-auto">
            <div className="font-bold text-[#1B5E20] mb-3 text-center">ក្រេឌីតនេះអាចប្រើប្រាស់បានសម្រាប់៖</div>
            <ul className="space-y-2 text-sm text-neutral-800">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2E7D32]" /> រាល់មុខម្ហូប និងភេសជ្ជៈទាំងអស់ នៅក្នង Capybara Café</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2E7D32]" /> បន្ថែមលើរាល់ទំនិញអនុស្សាវរីយ៍ទាំងអស់ ដែលមានដាក់លក់នៅទីតាំងផ្ទាល់</li>
            </ul>
          </div>

          <div className="text-center">
            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:scale-105"
            >
              <Send className="w-5 h-5 text-[#B3E5FC]" />
              ទាក់ទងមកកាន់ពួកយើងតាម Telegram
            </a>
          </div>
        </div>
      </section>

      {/* ផ្នែកទី៤ — បន្ទប់ស្នាក់នៅ (ROOMS) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#1B5E20] font-semibold text-sm tracking-wider uppercase bg-[#E8F5E9] px-3 py-1 rounded-full">
            សណ្ឋាគារប៊ូទិក
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-4 mb-4">
            ដំណើរកម្សាន្តក្នុងសណ្ឋាគារនៃក្តីស្រមៃរបស់យើង
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            {data.khRoomsIntro || `Casa de Capybara មានបន្ទប់ស្នាក់នៅចំនួន ២៣ បន្ទប់ ដែលត្រូវបានបែងចែកជា ៨ ប្រភេទផ្សេងៗគ្នា ទៅតាមតម្រូវការរបស់លោកអ្នក មិនថាមកម្នាក់ឯង ឬជាក្រុមគ្រួសាររហូតដល់ ៦ នាក់នោះឡើយ។`}
          </p>
        </div>

        {/* Room Table / Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { name: "Splash Pool Access", size: "៣៣ ម²", guests: "មនុស្សធំ ២ + កុមារ ១", desc: "បន្ទប់ជាប់នឹងអាងហែលទឹក" },
            { name: "Dreamland", size: "៤៣ ម²", guests: "មនុស្សធំ ៣ + កុមារ ២", desc: "ពិភពនៃក្តីស្រមៃដ៏ធំទូលាយបំផុត" },
            { name: "Capy Deluxe", size: "៣៥ ម²", guests: "មនុស្សធំ ៣ + កុមារ ២", desc: "ភាពប្រណីតជាន់ទី១ និងទី២" },
            { name: "Turtle Oasis", size: "២៦ ម²", guests: "មនុស្សធំ ២ + កុមារ ១", desc: "ជ្រកកោនដ៏កក់ក្តៅ និងស្ងប់ស្ងាត់" },
            { name: "La Familia", size: "៤០ ម²", guests: "មនុស្សធំ ៣ + កុមារ ៣", desc: "បន្ទប់គ្រួសារ ស្នាក់នៅបានដល់ ៦ នាក់" },
            { name: "Snuggle Nest", size: "៣៣ ម²", guests: "មនុស្សធំ ២ + កុមារ ១", desc: "សំបុកកក់ក្តៅ ពេញនិយមបំផុត" },
            { name: "Capy Cove", size: "៤០ ម²", guests: "មនុស្សធំ ៤ + កុមារ ៣", desc: "ជាន់ទី២ ផាសុកភាព" },
            { name: "Three Amigos/Amigas", size: "៣៣ ម²", guests: "មនុស្សធំ ៣ + កុមារ ១", desc: "បន្ទប់មិត្តភាពគ្រែ ៣" },
          ].map((room, idx) => (
            <div key={idx} className="bg-white border border-neutral-200 hover:border-[#1B5E20] rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
              <h3 className="font-bold text-[#1B5E20] text-lg mb-1">{room.name}</h3>
              <div className="text-xs text-neutral-500 mb-3 flex gap-2 font-medium">
                <span className="bg-neutral-100 px-2 py-0.5 rounded">{room.size}</span>
                <span className="bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded">{room.guests}</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{room.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-700">
            <strong>ពេលវេលា៖</strong> ចូលស្នាក់នៅ (Check-in) {data.khCheckinTime || "ម៉ោង ១៤:០០"} | ចាកចេញ (Check-out) {data.khCheckoutTime || "ម៉ោង ១២:០០ ថ្ងៃត្រង់"}
          </div>
          <a 
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-6 py-2.5 rounded-xl text-sm font-bold shrink-0 transition-colors"
          >
            ទូរស័ព្ទ Telegram ដើម្បីសាកសួរអំពីបន្ទប់
          </a>
        </div>
      </section>

      {/* ផ្នែកទី៥ — CAPYBARA CAFÉ */}
      <section className="py-20 px-4 bg-[#B3E5FC]/10 border-y border-[#B3E5FC]/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#1B5E20] font-semibold text-sm tracking-wider uppercase bg-white px-3 py-1 rounded-full border border-neutral-200">
              អាហារ & ភេសជ្ជៈ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-4 mb-4">
              {data.khCafeHeadline || "Capybara Café — ហាងកាហ្វេដែលអ្នករស់នៅសៀមរាបចូលចិត្ត"}
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {data.khCafeDesc || `នៅកណ្តាលបរិយាកាសដ៏សែនសុខដុម ជញ្ជាំងដែលលាបពណ៌ស្រទន់បែប Pastel រួមជាមួយពន្លឺភ្លើងនេអុងចម្រុះពណ៌ បានបង្កើតនូវសោភ័ណភាពដ៏ទាក់ទាញ និងភាពកក់ក្តៅ។ ម្ហូបខ្មែរ អាស៊ី និងអន្តរជាតិ នំបុ័ងដុតស្រស់ៗ និងភេសជ្ជៈពិសេសៗ។`}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-[#1B5E20] mb-2">🐾 អាហារពេលព្រឹក</h3>
              <p className="text-sm text-neutral-600">ចាប់ពីម៉ោង ៧:០០ ដល់ ១១:០០ ព្រឹក</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-[#1B5E20] mb-2">🐾 ម៉ឺនុយពេញថ្ងៃ</h3>
              <p className="text-sm text-neutral-600">ចាប់ពីម៉ោង ៧:០០ ព្រឹក ដល់ ៩:០០ យប់</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-[#1B5E20] mb-2">🐾 ម៉ឺនុយភោជនីយដ្ឋាន</h3>
              <p className="text-sm text-neutral-600">ចាប់ពីម៉ោង ៧:០០ ព្រឹក ដល់ ៩:០០ យប់</p>
            </div>
          </div>

          <div className="text-center text-sm font-medium text-[#1B5E20] bg-white p-4 rounded-xl border border-neutral-200 max-w-xl mx-auto">
            🌱 មហូបសម្រាប់អ្នកញ៉ាំបន្លែ (Vegetarian) ✅ | មហូបបែប Vegan ✅ | គ្មានជាតិគ្លុយតេន (Gluten-Free) ✅
          </div>
        </div>
      </section>

      {/* ផ្នែកទី៦ — កន្លែងសម្រាប់ក្រុមគ្រួសារ (FACILITIES) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#1B5E20] font-semibold text-sm tracking-wider uppercase bg-[#E8F5E9] px-3 py-1 rounded-full">
            សម្ភារបរិក្ខារ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-4 mb-4">
            កន្លែងសម្រាប់ក្រុមគ្រួសារ
          </h2>
          <p className="text-neutral-700">
            គ្រួសាររីករាយ — ឪពុកម្តាយសម្រាក។ Casa de Capybara ត្រូវបានរៀបចំយ៉ាងសមបូរណ៍បែបសម្រាប់មនុស្សគ្រប់វ័យ។
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For Kids */}
          <div className="bg-[#E8F5E9] rounded-3xl p-8 border border-[#2E7D32]/20">
            <h3 className="text-xl font-bold text-[#1B5E20] mb-6 flex items-center gap-2">
              <Baby className="w-6 h-6 text-[#2E7D32]" /> សម្រាប់កុមារ
            </h3>
            <ul className="space-y-4 text-neutral-800">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> អាងហែលទឹកដ៏ត្រជាក់ (មានរំអិល)</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> សួនលំហែកាយនៅពីមុខបន្ទប់គេង</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> បន្ទប់លេងកម្សាន្តកូនក្មេង — ឈុតសម្លៀកបំពាក់ជាង ២០០ ឈុត</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> ជួប Molly & Alex ឥតគិតថ្លៃ (សម្រាប់ភ្ញៀវស្នាក់នៅ)</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> ការផ្តល់ចំណីសត្វ និងទំនិញវត្ថុអនុស្សាវរីយ៍</li>
            </ul>
          </div>

          {/* For Parents */}
          <div className="bg-[#F8BBD0]/20 rounded-3xl p-8 border border-[#F8BBD0]">
            <h3 className="text-xl font-bold text-[#1B5E20] mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#1B5E20]" /> សម្រាប់ឪពុកម្តាយ
            </h3>
            <ul className="space-y-4 text-neutral-800">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E65100]" /> ស្ប៉ា និងម៉ាស្សា</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E65100]" /> ស្ទីម និង Sauna</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E65100]" /> បន្ទប់ហាត់ប្រាណ (Gym) ទំនើប</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E65100]" /> កន្លែង Make up</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E65100]" /> Capybara Café — ម្ហូបអាហារ និងភេសជ្ជៈ</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ផ្នែកទី៧ — សុវត្ថិភាពគ្រួសារ (SAFETY) */}
      <section className="py-20 px-4 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#1B5E20] font-semibold text-sm tracking-wider uppercase bg-[#E8F5E9] px-3 py-1 rounded-full">
              សុវត្ថិភាពចម្បង
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-4 mb-4">
              សុវត្ថិភាពគ្រួសាររបស់អ្នក គឺជាការទទួលខុសត្រូវដ៏ខ្ពស់បំផុតរបស់យើង
            </h2>
            <p className="text-neutral-700">
              យើងយកចិត្តទុកដាក់ខ្ពស់បំផុតលើសុវត្ថិភាពក្រុមគ្រួសាររបស់លោកអ្នកក្នុងគ្រប់ជ្រុងជ្រោយ។
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "សុវត្ថិភាពអគ្គិភ័យ", desc: "ឧបករណ៍សុវត្ថិភាព និងសំឡេងរោទ៍ផ្សែងគ្រប់បន្ទប់ទាំងអស់" },
              { title: "ការសង្គ្រោះបឋម", desc: "មានសម្ភារ និងឧបករណ៍ជំនួយបឋមត្រៀមជាស្រេចនៅនឹងកន្លែងជានិច្ច" },
              { title: "ភាពស្អាតនៃទឹកប្រើប្រាស់", desc: "ប្រព័ន្ធចម្រោះទឹកត្រូវបានផ្លាស់ប្តូរ និងត្រួតពិនិត្យយ៉ាងហ្មត់ចត់រៀងរាល់ខែ" },
              { title: "សុវត្ថិភាពចំណីអាហារ", desc: "រាល់អាហារត្រូវបានចម្អិនក្នុងផ្ទះបាយដែលមានស្តង់ដារឧបករណ៍កម្រិតអឺរ៉ុប" },
              { title: "សន្តិសុខរឹងមាំ", desc: "មានការត្រួតពិនិត្យតាមរយៈកាមេរ៉ាសុវត្ថិភាព (CCTV) ២៤ ម៉ោង ទាំងក្នុង និងក្រៅ" },
              { title: "ការការពារពីសត្វល្អិត", desc: "យើងមានវិធានការការពារមូសយ៉ាងដិតដល់ ដើម្បីការពារលោកអ្នកពីជំងឺគ្រុនចាញ់ និងគ្រុនឈាម" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#2E7D32] mb-3" />
                <h3 className="font-bold text-[#1B5E20] text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ផ្នែកទី៨ — រកយើងខ្ញុំនៅសៀមរាប (LOCATION) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#1B5E20] font-semibold text-sm tracking-wider uppercase bg-[#E8F5E9] px-3 py-1 rounded-full">
            ទីតាំង & ការធ្វើដំណើរ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-4 mb-4">
            រកយើងខ្ញុំនៅសៀមរាប
          </h2>
          <p className="text-neutral-700">
            ផ្លូវ ៥៩៨, Ring Road, ក្រុងសៀមរាប ១៧១០០២ (ចាកចេញពី National Highway 6)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-[#1B5E20] mb-4 text-lg">ចម្ងាយពីទីតាំងសំខាន់ៗ៖</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex justify-between border-b pb-2"><span>ប្រាសាទអង្គរវត្ត</span> <span className="font-bold">១៥ នាទី (តុ-តុក)</span></li>
              <li className="flex justify-between border-b pb-2"><span>Angkor Eye (កន្ត្រកវិល)</span> <span className="font-bold">៥ នាទី (ដើរ)</span></li>
              <li className="flex justify-between border-b pb-2"><span>Robam Theater</span> <span className="font-bold">៥ នាទី (ដើរ)</span></li>
              <li className="flex justify-between border-b pb-2"><span>Pub Street</span> <span className="font-bold">១០ នាទី (តុ-តុក)</span></li>
              <li className="flex justify-between border-b pb-2"><span>ម៉ោងបើកបម្រើការ</span> <span className="font-bold text-[#1B5E20]">៧ ព្រឹក ដល់ ៩ យប់</span></li>
              <li className="flex justify-between pt-1"><span>ចំណតរថយន្ត</span> <span className="font-bold text-[#2E7D32]">ឥតគិតថ្លៃ</span></li>
            </ul>
          </div>

          {/* Google Maps Card */}
          <div className="bg-neutral-100 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] border border-neutral-300">
            <MapPin className="w-12 h-12 text-[#E65100] mb-4" />
            <h3 className="font-bold text-lg text-neutral-800 mb-2">Google Maps</h3>
            <p className="text-sm text-neutral-600 mb-6 max-w-xs">
              ងាយស្រួលស្វែងរកនៅលើផែនទី Google Maps និង Waze
            </p>
            <a 
              href="https://maps.google.com/?q=Casa+de+Capybara+Siem+Reap" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" /> បើក Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ផ្នែកទី៩ — ទំនាក់ទំនងយើងខ្ញុំតាម TELEGRAM (PRIMARY CONTACT) */}
      <section className="py-20 px-4 bg-[#1B5E20] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="bg-white/10 text-[#B3E5FC] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20">
            ទំនាក់ទំនង
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-[#F8BBD0]">
            ទំនាក់ទំនងយើងខ្ញុំតាម Telegram
          </h2>
          <p className="text-white/85 text-base md:text-lg mb-8 leading-relaxed">
            នៅពេលដែលលោកអ្នកមានបំណងចង់សាកសួរព័ត៌មាន ឬមានមន្ទិលសង្ស័យណាមួយ ពួកយើងតែងតែរង់ចាំទទួលស្វាគមន៍លោកអ្នកដោយក្តីរីករាយបំផុត។
          </p>

          <div className="bg-white text-neutral-900 p-8 rounded-3xl max-w-md mx-auto shadow-2xl mb-8">
            <div className="w-48 h-48 mx-auto bg-neutral-100 border-2 border-dashed border-[#1B5E20] rounded-2xl flex flex-col items-center justify-center p-4 mb-6">
              {data.khTelegramQr?.node?.sourceUrl ? (
                <Image 
                  src={data.khTelegramQr.node.sourceUrl} 
                  alt="Telegram QR Code" 
                  width={180} 
                  height={180} 
                  className="rounded-xl object-contain"
                />
              ) : (
                <div className="text-center">
                  <Send className="w-10 h-10 text-[#1B5E20] mx-auto mb-2" />
                  <span className="text-xs text-neutral-500 font-mono">Scan Telegram QR</span>
                </div>
              )}
            </div>

            <div className="font-bold text-xl text-[#1B5E20] mb-1">{telegramHandle}</div>
            <div className="text-sm text-neutral-600 mb-6">{telegramPhone}</div>

            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#E65100] hover:bg-[#ff5d05] text-white py-3.5 rounded-xl font-bold text-base shadow-lg transition-transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
              ផ្ញើសារ Telegram ឥឡូវនេះ
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#123E15] text-white/70 py-12 px-4 text-center text-sm border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="font-bold text-white text-base">🐾 Casa de Capybara | casadecapybara.com</div>
          <div>ផ្លូវ ៥៩៨, Ring Road, ក្រុងសៀមរាប ១៧១០០២, កម្ពុជា</div>
          <div>Telegram: {telegramHandle} | {telegramPhone}</div>
          <div className="pt-4 text-xs text-white/40">
            © 2026 Casa de Capybara. រក្សាសិទ្ធិគ្រប់យ៉ាង។
          </div>
        </div>
      </footer>
    </div>
  );
}
