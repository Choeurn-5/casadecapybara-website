"use client";

import React from "react";
import Image from "next/image";
import { Waves, Dumbbell, Sparkles, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ResortAmenitiesKh() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-gray-200 font-battambang">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/20 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>សេវាកម្មកម្រិតផ្កាយ ៥</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1A2E1C] mb-6">
              សម្រាកលំហែរ និងថែរក្សាសុខភាព
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              រីករាយជាមួយអាងហែលទឹកដ៏ស្រស់ស្អាតរបស់យើង និងក្លឹបហាត់ប្រាណដែលបំពាក់ដោយឧបករណ៍ទំនើបៗចុងក្រោយបំផុត។ ឥតគិតថ្លៃសម្រាប់ភ្ញៀវស្នាក់នៅទាំងអស់។
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Pool Section */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image 
                src="https://cms.casadecapybara.com/wp-content/uploads/2026/09/G4-Dive-In-—-Casa-de-Capybaras-Signature-Pool-Water-Slide.jpg" 
                alt="Resort Pool" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                unoptimized 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Waves className="w-6 h-6 text-[#38BDF8]" />
                  <h3 className="text-2xl font-bold">អាងហែលទឹក និងរំអិលខ្នាតធំ</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#38BDF8]" /> តំបន់ទឹករាក់សម្រាប់កុមារ និងស្លាយរំអិលដ៏សប្បាយ</li>
                  <li className="flex items-center gap-2 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#38BDF8]" /> ទឹកថ្លាឈ្វេង ប្រើប្រព័ន្ធចម្រោះទឹកអំបិល ដែលល្អសម្រាប់ស្បែក</li>
                  <li className="flex items-center gap-2 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#38BDF8]" /> កន្លែងអង្គុយសម្រាក និងទទួលទានភេសជ្ជៈនៅក្បែរអាង</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Gym Section */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image 
                src="/gallery/families/g5.jpg" 
                alt="Modern Gym" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                unoptimized 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Dumbbell className="w-6 h-6 text-[#F43F5E]" />
                  <h3 className="text-2xl font-bold">ក្លឹបហាត់ប្រាណទំនើប</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#F43F5E]" /> បំពាក់ដោយឧបករណ៍ហាត់ប្រាណទំនើបៗ និងពេញលេញ</li>
                  <li className="flex items-center gap-2 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#F43F5E]" /> ម៉ាស៊ីនរត់ លើកទម្ងន់ និងកន្លែងហាត់យូហ្គា (Yoga)</li>
                  <li className="flex items-center gap-2 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#F43F5E]" /> បើកជូនដំណើរការ ២៤ម៉ោង សម្រាប់អ្នកស្នាក់នៅ</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
