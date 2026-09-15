"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, Coffee, Bed, ArrowRight, ShieldCheck } from "lucide-react";

export default function GalleryStorySection() {
  return (
    <section className="py-20 md:py-28 bg-[#152818] text-white relative overflow-hidden">
      {/* Subtle organic background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2E7D32]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E65100]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FFB74D] text-xs uppercase tracking-widest font-semibold mb-4 border border-white/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Casa Experience</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight leading-tight mb-6"
          >
            Every Frame Holds a <span className="italic font-normal text-[#FFB74D]">Story</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 leading-relaxed font-light"
          >
            At Casa de Capybara, every detail is conceived to bring human harmony with 
            gentle wildlife, luxury hospitality, and lush tropical botanicals in the heart of Siem Reap.
          </motion.p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors duration-300"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E65100]/20 text-[#FFB74D] flex items-center justify-center mb-6 border border-[#E65100]/30">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                Ethical Wildlife Encounters
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Meet Molly &amp; Alex, Cambodia&apos;s most cherished capybaras, in a tranquil, 
                stress-free environment guided by caring zoological specialists.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#81C784]">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Welfare &amp; Safety</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors duration-300"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#4CAF50]/20 text-[#81C784] flex items-center justify-center mb-6 border border-[#4CAF50]/30">
                <Bed className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                Boutique Themed Suites
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Immerse your family in whimsical luxury: artisan capybara tiles, plush bedding, 
                private balconies, and direct tropical swimming pool access.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#81C784]">
              <ShieldCheck className="w-4 h-4" />
              <span>Complimentary Encounters Included</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors duration-300"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FF9800]/20 text-[#FFB74D] flex items-center justify-center mb-6 border border-[#FF9800]/30">
                <Coffee className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                Garden Café &amp; Refreshment
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Sip cold brew coffee, fresh tropical juices, and artisan treats while 
                watching the gentle water slides and garden paradise.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#81C784]">
              <ShieldCheck className="w-4 h-4" />
              <span>Organic Local Ingredients</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 md:p-14 bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] border border-white/20 shadow-2xl text-center flex flex-col items-center"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Turn These Moments into Your Next <span className="italic font-normal text-[#FFD54F]">Memory</span>
          </h3>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl font-light mb-8">
            Experience the calm, the joy, and the wonder of Casa de Capybara in person. 
            Limited daily encounters ensure intimate and serene visits.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/capybara-experience"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#E65100] hover:bg-[#F57C00] text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-xl hover:shadow-[#E65100]/40 hover:-translate-y-0.5"
            >
              <span>Book An Encounter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/stay"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Explore Boutique Rooms</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
