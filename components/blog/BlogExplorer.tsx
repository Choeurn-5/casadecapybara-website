"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, Clock, Globe, ChevronDown, Check } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { BlogPost } from "@/lib/wordpress";

interface BlogExplorerProps {
  initialPosts: BlogPost[];
}

const CATEGORIES = ["All Topics", "Travel Guides", "Family Travel", "Capybara Stories", "Cafes & Food"];
const LANGUAGES = [
  { name: "All", id: "all", flag: "🌐" },
  { name: "English (EN)", id: "en", flag: "🇬🇧" },
  { name: "ភាសាខ្មែរ (KH)", id: "kh", flag: "🇰🇭" },
  { name: "Français (FR)", id: "fr", flag: "🇫🇷" },
  { name: "Deutsch (DE)", id: "de", flag: "🇩🇪" },
  { name: "한국어 (KR)", id: "kr", flag: "🇰🇷" },
  { name: "中文 (CN)", id: "cn", flag: "🇨🇳" },
  { name: "日本語 (JP)", id: "jp", flag: "🇯🇵" },
];

export function getPostLanguage(post: any): string {
  const slug = (post.slug || "").toLowerCase();
  const title = post.title || "";

  // 1. Detect by slug prefix or title suffix
  if (slug.startsWith("fr-") || title.includes("(FR)")) return "fr";
  if (slug.startsWith("de-") || title.includes("(DE)")) return "de";
  if (slug.startsWith("kr-") || title.includes("(KR)")) return "kr";
  if (slug.startsWith("cn-") || title.includes("(CN)")) return "cn";
  if (slug.startsWith("jp-") || title.includes("(JP)")) return "jp";
  if (slug.endsWith("-kh") || title.includes("(KH)")) return "kh";

  // 2. Detect by Unicode characters in title
  if (/[\u1780-\u17FF]/.test(title)) return "kh"; // Khmer
  if (/[\uAC00-\uD7AF]/.test(title)) return "kr"; // Korean
  if (/[\u3040-\u30FF]/.test(title)) return "jp"; // Japanese
  if (/[\u4E00-\u9FFF]/.test(title)) return "cn"; // Chinese

  // 3. Check ACF if set and not default 'en'
  if (post.blogPostSettings?.postLanguage) {
    const pl = String(post.blogPostSettings.postLanguage).toLowerCase();
    if (pl !== "en" && pl !== "gb english") {
      // Map known string values just in case
      if (pl.includes("kh")) return "kh";
      if (pl.includes("fr")) return "fr";
      if (pl.includes("de")) return "de";
      if (pl.includes("kr") || pl.includes("ko")) return "kr";
      if (pl.includes("cn") || pl.includes("zh")) return "cn";
      if (pl.includes("jp") || pl.includes("ja")) return "jp";
      return pl;
    }
  }

  // 4. Default to English
  return "en";
}

export default function BlogExplorer({ initialPosts }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLang = LANGUAGES.find((l) => l.id === selectedLanguage) || LANGUAGES[0];

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Search
      const searchMatch = 
        searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const catMatch = 
        selectedCategory === "All Topics" || 
        post.categories.nodes.some(c => c.name.toLowerCase() === selectedCategory.toLowerCase());

      // Language
      const lang = getPostLanguage(post);
      const langMatch = selectedLanguage === "all" || lang === selectedLanguage;

      return searchMatch && catMatch && langMatch;
    });
  }, [initialPosts, searchQuery, selectedCategory, selectedLanguage]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Controls */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Search Bar & Language Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:max-w-2xl">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all shadow-xs text-sm"
                placeholder="Search stories, tips, and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Language Dropdown */}
            <div className="relative shrink-0" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center justify-between gap-3 w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 hover:border-[#1B5E20]/40 rounded-2xl text-gray-800 text-sm font-semibold shadow-xs transition-all duration-200 hover:bg-[#FAF7F2]"
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#1B5E20]" />
                  <span>
                    {selectedLanguage === "all" ? "Select Language" : currentLang.name}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-100 mb-1">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang.id;
                    return (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(lang.id);
                          setIsLangOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors ${
                          isSelected
                            ? "bg-[#E8F5E9] text-[#1B5E20] font-bold"
                            : "text-gray-700 hover:bg-[#FAF7F2] hover:text-[#1B5E20] font-medium"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#1B5E20]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Categories */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 hide-scrollbar gap-2 shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1B5E20] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-[#E8F5E9] hover:text-[#1B5E20] border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-20">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl flex flex-col md:flex-row transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
              <div className="md:w-3/5 h-64 md:h-[450px] relative overflow-hidden bg-[#E8F5E9]">
                {featuredPost.featuredImage?.node?.sourceUrl ? (
                  <img 
                    src={featuredPost.featuredImage.node.sourceUrl} 
                    alt={featuredPost.featuredImage.node.altText || featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2E7D32] opacity-50">
                    <BookOpen className="w-20 h-20" />
                  </div>
                )}
                <div className="absolute top-6 left-6 bg-[#E65100] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  Featured Article
                </div>
              </div>
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-[#2E7D32] font-semibold uppercase tracking-wider mb-4">
                  <span>{featuredPost.categories?.nodes[0]?.name || "Uncategorized"}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]"></span>
                  <span className="flex items-center gap-1.5 text-gray-500"><Clock className="w-4 h-4" /> 4 min read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1B5E20] mb-4 leading-tight group-hover:text-[#2E7D32] transition-colors">
                  {featuredPost.title}
                </h2>
                <div 
                  className="text-gray-600 mb-8 line-clamp-3 text-lg"
                  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                />
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8BBD0] flex items-center justify-center text-[#1B5E20] font-bold">
                      {featuredPost.author?.node?.name?.[0] || "M"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{featuredPost.author?.node?.name || "Manet Sisamouth"}</div>
                      <div className="text-xs text-gray-500">{format(parseISO(featuredPost.date), "MMMM d, yyyy")}</div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#1B5E20] group-hover:bg-[#1B5E20] group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="relative h-56 overflow-hidden bg-[#E8F5E9]">
                {post.featuredImage?.node?.sourceUrl ? (
                  <img 
                    src={post.featuredImage.node.sourceUrl} 
                    alt={post.featuredImage.node.altText || post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2E7D32] opacity-30">
                    <BookOpen className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#1B5E20] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {post.categories?.nodes[0]?.name || "Blog"}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#E65100] transition-colors">
                  {post.title}
                </h3>
                <div 
                  className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <div className="text-xs text-gray-500 font-medium">
                    By {post.author?.node?.name || "Manet Sisamouth"}
                  </div>
                  <div className="text-xs font-semibold text-[#2E7D32] flex items-center gap-1">
                    Read Guide <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500">We couldn't find any articles matching your current filters.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Topics"); setSelectedLanguage("all"); }}
            className="mt-6 px-6 py-2 bg-[#E8F5E9] text-[#1B5E20] rounded-full font-medium hover:bg-[#C8E6C9] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Newsletter / CTA Banner */}
      <div className="mt-24 rounded-3xl bg-[#1B5E20] overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="relative z-20 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#F8BBD0]">Ready for your own adventure?</h3>
            <p className="text-white/80 text-lg mb-0 leading-relaxed">
              Visiting Siem Reap? Drop by Casa de Capybara on Ring Road to meet Molly & Alex, enjoy artisan brunch, or stay in our themed boutique rooms.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <Link href="/stay" className="px-8 py-4 bg-white text-[#1B5E20] rounded-xl font-bold text-center hover:bg-[#F8BBD0] transition-colors shadow-lg">
              Book a Room
            </Link>
            <Link href="/capybara-experience" className="px-8 py-4 bg-[#E65100] text-white rounded-xl font-bold text-center hover:bg-[#ff6a1a] transition-colors shadow-lg">
              Visit Capybaras
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
