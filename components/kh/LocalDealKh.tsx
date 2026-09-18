"use client";

import React from "react";
import { Send, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface LocalDealKhProps {
  localSpend?: string;
  localCashback?: string;
  localDealText?: string;
  telegramUrl?: string;
}

export default function LocalDealKh({
  localSpend = "២០,០០០៛",
  localCashback = "២០,០០០៛",
  localDealText,
  telegramUrl = "https://t.me/capybaracambodia",
}: LocalDealKhProps) {
  return (
    <section className="py-16 px-4 bg-[#E8F5E9] border-y border-[#2E7D32]/20 font-battambang">
      <ScrollReveal direction="up">
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
            {localDealText || `យើងខ្ញុំមានសេចក្តីស្រឡាញ់យ៉ាងជ្រាលជ្រៅចំពោះសហគមន៍របស់យើង។ ប្រសិនបើបងប្អូនរស់នៅ បំពេញការងារ ឬកំពុងសិក្សានៅក្នុងខេត្តសៀមរាប — យើងខ្ញុំមានមោទនភាពក្នុងការផ្តល់ជូននូវតម្លៃពិសេសបំផុត ដើម្បីជាសក្ខីភាពបញ្ជាក់ពីក្តីស្រឡាញ់ និងការយកចិត្តទុកដាក់ចំពោះបងប្អូនខ្មែរយើង។`}
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
      </ScrollReveal>
    </section>
  );
}
