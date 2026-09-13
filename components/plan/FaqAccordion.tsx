"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do I need to book in advance?",
    answer: "No — the capybara encounter is walk-in only, open every day 7am to 9pm. For hotel rooms we recommend booking in advance especially during peak season."
  },
  {
    question: "Is it suitable for very young children?",
    answer: "Absolutely. Casa de Capybara is Cambodia's first dedicated kids' hotel. We welcome babies, toddlers and children of all ages. Children under 3 always enter free."
  },
  {
    question: "Is there a time limit on the capybara encounter?",
    answer: "No time limit. On quieter days guests often spend a long relaxed time with Molly and Alex. During busy periods the flow is naturally managed by our team."
  },
  {
    question: "Are the capybaras safe for children?",
    answer: "Yes. Molly and Alex are gentle, well-cared-for animals supervised by our specialist team every day. Every encounter is fully guided."
  },
  {
    question: "Can non-guests visit the cafe and meet the capybaras?",
    answer: "Yes — both are open to absolutely everyone. No hotel stay required. Capybara encounter $10 per person or $30 family package."
  },
  {
    question: "Do you have vegetarian, vegan or gluten-free options?",
    answer: "Yes — throughout all menus. Always inform our team of any dietary requirements or allergies."
  },
  {
    question: "Is parking available?",
    answer: "Yes — free, spacious parking on site for all guests."
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes. Contact us on WhatsApp or Telegram at least 24 hours before arrival."
  },
  {
    question: "What languages does your team speak?",
    answer: "Our team speaks English, Khmer and Hindi fluently."
  },
  {
    question: "What is included in the $10 ticket?",
    answer: "Everything — private guided encounter, staff photography, feeding session, capybara facts, free souvenir, pool with slide, outdoor playground and indoor playroom. No hidden extras."
  },
  {
    question: "Is it suitable for couples and solo travellers too?",
    answer: "Absolutely. While we are Cambodia's first kids' hotel, the experience is for everyone. We regularly welcome couples, solo travellers and groups who tell us it was the highlight of their Siem Reap trip."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#E8F5E9] border-[#1B5E20]/30 shadow-md' : 'bg-white border-gray-200 hover:border-[#1B5E20]/30 hover:bg-[#FBFDFB]'}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className={`font-bold text-lg pr-8 transition-colors ${isOpen ? 'text-[#1B5E20]' : 'text-gray-800'}`}>
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-6 h-6 shrink-0 transition-transform duration-300 ${isOpen ? 'text-[#1B5E20] rotate-180' : 'text-gray-400'}`} 
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed border-t border-[#1B5E20]/10 mt-2">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
