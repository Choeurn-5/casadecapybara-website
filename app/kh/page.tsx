import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa de Capybara | ភាសាខ្មែរ (Khmer)",
  description: "សូមស្វាគមន៍មកកាន់ Casa de Capybara - ស្វែងយល់ពីបទពិសោធន៍កាពីបារ៉ា ការស្នាក់នៅ និងភោជនីយដ្ឋាន។",
};

export default function KhmerHomePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        សូមស្វាគមន៍មកកាន់ Casa de Capybara
      </h1>
      <p className="text-lg text-gray-600">
        រីករាយជាមួយបទពិសោធន៍ដ៏អស្ចារ្យជាមួយសត្វកាពីបារ៉ា ការស្នាក់នៅបែបធម្មជាតិ និងម្ហូបអាហារដ៏ឆ្ងាញ់ពិសា។
      </p>
    </main>
  );
}
