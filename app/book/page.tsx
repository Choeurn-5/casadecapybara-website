"use client";

import Script from "next/script";

export default function BookPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] pt-24 pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1B5E20] mb-8 text-center">
          Book Your Stay
        </h1>
        
        <div className="w-full min-h-[700px] bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8F5E9]">
          <iframe
            id="innconnectbookingengine"
            width="100%"
            height="100%"
            style={{ minHeight: "700px" }}
            frameBorder="0"
            src="https://app.inn-connect.com/book2/?p=Casa%20de%20Capybara"
          ></iframe>
        </div>
      </div>

      <Script
        src="https://app.inn-connect.com/book2/Book/js/iframeResizer.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).iFrameResize) {
            (window as any).iFrameResize({ log: false }, '#innconnectbookingengine');
          }
        }}
      />
    </main>
  );
}
