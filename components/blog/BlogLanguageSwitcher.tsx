"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Globe, Sparkles, Check, ExternalLink, RotateCcw } from "lucide-react";
import type { BlogPost } from "@/lib/wordpress";
import { getPostLanguage } from "@/components/blog/BlogExplorer";

interface BlogLanguageSwitcherProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

interface LanguageOption {
  code: string; // 'en', 'kh', 'fr', 'de', 'kr', 'cn', 'jp'
  label: string; // 'EN', 'KH', etc.
  name: string; // 'English', 'ភាសាខ្មែរ', etc.
  flag: string;
  googleCode: string; // 'en', 'km', 'fr', 'de', 'ko', 'zh-CN', 'ja'
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "EN", name: "English", flag: "🇬🇧", googleCode: "en" },
  { code: "kh", label: "KH", name: "ភាសាខ្មែរ", flag: "🇰🇭", googleCode: "km" },
  { code: "fr", label: "FR", name: "Français", flag: "🇫🇷", googleCode: "fr" },
  { code: "de", label: "DE", name: "Deutsch", flag: "🇩🇪", googleCode: "de" },
  { code: "kr", label: "KR", name: "한국어", flag: "🇰🇷", googleCode: "ko" },
  { code: "cn", label: "CN", name: "中文", flag: "🇨🇳", googleCode: "zh-CN" },
  { code: "jp", label: "JP", name: "日本語", flag: "🇯🇵", googleCode: "ja" },
];

function getCoreSlugKeywords(slug: string): string[] {
  const stripped = slug
    .toLowerCase()
    .replace(/^(kr|kh|cn|fr|jp|de)-/, "")
    .replace(/-kh$/, "");

  // Extract meaningful semantic words
  return stripped
    .split("-")
    .filter(
      (w) =>
        w.length > 2 &&
        ![
          "the",
          "and",
          "for",
          "with",
          "from",
          "into",
          "siem",
          "reap",
          "2026",
          "guide",
          "places",
          "things",
        ].includes(w)
    );
}

export default function BlogLanguageSwitcher({
  currentPost,
  allPosts,
}: BlogLanguageSwitcherProps) {
  const router = useRouter();
  const [activeGoogleLang, setActiveGoogleLang] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const currentLangCode = useMemo(() => {
    return getPostLanguage(currentPost);
  }, [currentPost]);

  // Map each language code to a matching native post if one exists in WordPress
  const nativeTranslationsMap = useMemo(() => {
    const map: Record<string, BlogPost> = {};
    const currentKeywords = getCoreSlugKeywords(currentPost.slug);

    allPosts.forEach((post) => {
      const postLang = getPostLanguage(post);
      if (postLang === currentLangCode && post.id === currentPost.id) {
        map[postLang] = post;
        return;
      }

      // Check if this post is a sibling of the current post
      const postKeywords = getCoreSlugKeywords(post.slug);
      const matchCount = currentKeywords.filter((kw) =>
        postKeywords.includes(kw)
      ).length;

      // If at least 2 key terms match or single unique key matches
      if (matchCount >= 2 || (currentKeywords.length === 1 && matchCount === 1)) {
        if (!map[postLang]) {
          map[postLang] = post;
        }
      }
    });

    // Also ensure current post is mapped to its own language
    map[currentLangCode] = currentPost;
    return map;
  }, [currentPost, allPosts, currentLangCode]);

  // Check active Google Translate cookie on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const match = document.cookie.match(/googtrans=\/auto\/([a-zA-Z-]+)/);
      if (match && match[1]) {
        setActiveGoogleLang(match[1]);
      }
    }
  }, []);

  // Initialize window.googleTranslateElementInit handler
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).googleTranslateElementInit = () => {
        if ((window as any).google?.translate?.TranslateElement) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "auto",
              autoDisplay: false,
              includedLanguages: "en,km,fr,de,ko,zh-CN,ja",
            },
            "google_translate_element"
          );
        }
      };
    }
  }, []);

  // Trigger Google Translate for a specific language
  const handleGoogleTranslate = (lang: LanguageOption) => {
    setIsTranslating(true);
    const googleCode = lang.googleCode;

    // Set cookie
    document.cookie = `googtrans=/auto/${googleCode}; path=/;`;
    if (typeof window !== "undefined" && window.location.hostname) {
      document.cookie = `googtrans=/auto/${googleCode}; path=/; domain=${window.location.hostname};`;
    }

    setActiveGoogleLang(googleCode);

    // Try to trigger the Google Translate select dropdown if rendered
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = googleCode;
      select.dispatchEvent(new Event("change"));
      setTimeout(() => setIsTranslating(false), 800);
    } else {
      // Reload to apply the translation cookie seamlessly
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  // Reset translation back to original post language
  const handleResetTranslation = () => {
    setIsTranslating(true);
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (typeof window !== "undefined" && window.location.hostname) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    }
    setActiveGoogleLang(null);

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = "";
      select.dispatchEvent(new Event("change"));
    }
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  // Handle clicking a language pill
  const onLanguageSelect = (lang: LanguageOption) => {
    const nativePost = nativeTranslationsMap[lang.code];

    // If there is an authentic native post for this language
    if (nativePost && nativePost.slug !== currentPost.slug) {
      // Reset machine translation cookie so the native article displays authentically
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (typeof window !== "undefined" && window.location.hostname) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      }
      router.push(`/blog/${nativePost.slug}`);
      return;
    }

    // If it's already the current post's native language and translation was on, reset it
    if (lang.code === currentLangCode) {
      if (activeGoogleLang) {
        handleResetTranslation();
      }
      return;
    }

    // Otherwise, translate using Google Translate
    handleGoogleTranslate(lang);
  };

  return (
    <>
      {/* Hidden Google Translate Mount Point */}
      <div id="google_translate_element" className="hidden" style={{ display: "none" }} />
      
      {/* Google Translate Script */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Global CSS to clean up Google Translate UI frame if present */}
      <style jsx global>{`
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        .skiptranslate {
          display: inline !important;
        }
        #goog-gt-tt {
          display: none !important;
        }
      `}</style>

      {/* Translation Switcher Card */}
      <div className="bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#1B5E20]" />
            <span className="text-[#1B5E20] font-bold text-sm">
              Read this guide in:
            </span>
          </div>

          {/* Reset to Original Button if currently translated via Google Translate */}
          {activeGoogleLang && (
            <button
              onClick={handleResetTranslation}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E65100] hover:text-[#d84315] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show Original ({currentLangCode.toUpperCase()})</span>
            </button>
          )}
        </div>

        {/* Language Buttons */}
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const hasNative = Boolean(nativeTranslationsMap[lang.code]);
            const isCurrentNative = lang.code === currentLangCode && !activeGoogleLang;
            const isGoogleActive = activeGoogleLang === lang.googleCode;
            const isActive = isCurrentNative || isGoogleActive;

            return (
              <button
                key={lang.code}
                onClick={() => onLanguageSelect(lang)}
                disabled={isTranslating}
                title={
                  hasNative
                    ? `${lang.name} (Original Article)`
                    : `Translate to ${lang.name} with Google Translate`
                }
                className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/25 scale-105"
                    : "bg-white text-[#1B5E20] border border-[#2E7D32]/20 hover:bg-[#1B5E20] hover:text-white hover:border-transparent hover:shadow-xs"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>

                {/* Subtle indicator icon */}
                {isActive ? (
                  <Check className="w-3 h-3 text-white" />
                ) : !hasNative ? (
                  <Sparkles className="w-2.5 h-2.5 text-[#E65100] group-hover:text-white transition-colors" />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Informative Subtext */}
        <div className="mt-3 pt-2.5 border-t border-[#2E7D32]/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-600">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]" />
            <span>
              Articles available natively in multiple languages, with instant Google Translate for all others.
            </span>
          </div>

          {/* Direct Google Translate Web link in case user wants external browser view */}
          <a
            href={`https://translate.google.com/translate?sl=auto&tl=${
              SUPPORTED_LANGUAGES.find((l) => l.code === currentLangCode)?.googleCode || "en"
            }&u=${encodeURIComponent(
              typeof window !== "undefined"
                ? window.location.href
                : `https://casadecapybara.com/blog/${currentPost.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#1B5E20] hover:text-[#E65100] font-medium transition-colors"
          >
            <span>Open in Google Translate</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </>
  );
}
