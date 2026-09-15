"use client";

import React, { useState, useEffect } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  slug: string;
}

export default function SocialShareButtons({ title, slug }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Determine the full share URL
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    } else {
      setShareUrl(`https://casadecapybara.com/blog/${slug}`);
    }
  }, [slug]);

  const currentUrl = shareUrl || `https://casadecapybara.com/blog/${slug}`;

  // 1. Native Web Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Read "${title}" on Casa de Capybara`,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or aborted
        if ((err as Error).name !== "AbortError") {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  // 2. WhatsApp Share
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  // 3. Facebook Share
  const handleFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer,width=600,height=500"
    );
  };

  // 4. Telegram Share
  const handleTelegram = () => {
    const url = encodeURIComponent(currentUrl);
    const text = encodeURIComponent(title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  // 5. Copy Link to Clipboard
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="flex items-center gap-2.5 sm:ml-auto relative">
      {/* 1. Native Share */}
      <button
        type="button"
        onClick={handleNativeShare}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1B5E20] hover:border-[#1B5E20] hover:bg-[#E8F5E9]/50 transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 group relative"
        aria-label="Share article"
        title="Share article"
      >
        <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
      </button>

      {/* 2. Facebook Share */}
      <button
        type="button"
        onClick={handleFacebook}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 group relative"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* 3. WhatsApp Share */}
      <button
        type="button"
        onClick={handleWhatsApp}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 group relative"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      {/* 4. Telegram Share */}
      <button
        type="button"
        onClick={handleTelegram}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#0088cc] hover:border-[#0088cc] hover:bg-[#0088cc]/10 transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 group relative"
        aria-label="Share on Telegram"
        title="Share on Telegram"
      >
        <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      </button>

      {/* 5. Copy Link Button with Toast / Tooltip */}
      <div className="relative">
        <button
          type="button"
          onClick={handleCopy}
          className={`w-10 h-10 rounded-full bg-white border flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 group ${
            copied
              ? "border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]"
              : "border-gray-200 text-gray-600 hover:text-[#1B5E20] hover:border-[#1B5E20] hover:bg-[#E8F5E9]/50"
          }`}
          aria-label="Copy link to clipboard"
          title={copied ? "Link copied!" : "Copy link"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#2E7D32] animate-in zoom-in-50 duration-200" />
          ) : (
            <LinkIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          )}
        </button>

        {/* Copied Feedback Bubble */}
        {copied && (
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1B5E20] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
            Copied!
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1B5E20]" />
          </div>
        )}
      </div>
    </div>
  );
}
