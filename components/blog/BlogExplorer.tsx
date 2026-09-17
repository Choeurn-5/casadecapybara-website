"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Clock, 
  Globe, 
  ChevronDown, 
  Check, 
  Sun, 
  Moon,
  X,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@/lib/wordpress";

interface BlogExplorerProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

function getPaginationRange(current: number, total: number): (number | string)[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }
  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

const CATEGORIES = [
  "All Topics", 
  "Travel Guides", 
  "Family Travel", 
  "Capybara Stories", 
  "Cafes & Food"
];

const LANGUAGES = [
  { name: "All Languages", id: "all", flag: "🌐" },
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Initialize dark mode from localStorage or system preference on client mount
  useEffect(() => {
    const saved = localStorage.getItem("casa_blog_theme");
    if (saved === "dark") {
      setIsDarkMode(true);
    } else if (!saved && typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("casa_blog_theme", next ? "dark" : "light");
      }
      return next;
    });
  };

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

  // Reset pagination when search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLanguage]);

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

  const totalPosts = filteredPosts.length;
  // Page 1 shows 1 featured + 6 grid stories = 7 stories. Subsequent pages show 6 stories.
  const totalPages = Math.max(1, 1 + Math.ceil(Math.max(0, totalPosts - 7) / POSTS_PER_PAGE));

  // Only show the big featured hero card on page 1
  const featuredPost = currentPage === 1 && totalPosts > 0 ? filteredPosts[0] : null;

  // Paginated grid stories
  const gridPosts = useMemo(() => {
    if (currentPage === 1) {
      return filteredPosts.slice(1, 1 + POSTS_PER_PAGE);
    }
    const startIdx = 1 + (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const el = document.getElementById("blog-stories-feed");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "All Topics" || selectedLanguage !== "all";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Topics");
    setSelectedLanguage("all");
    setCurrentPage(1);
  };

  return (
    <main className={`min-h-screen pt-20 sm:pt-24 pb-16 transition-colors duration-500 ${
      isDarkMode ? "bg-[#0A110B] text-gray-100" : "bg-[#FAF7F2] text-gray-900"
    }`}>
      
      {/* 1. Hero Header (Optimized for Mobile Screens) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 sm:py-6 text-center">
        {/* Floating Top Pill Bar: Category Tag & Dark/Light Switcher */}
        <div className="inline-flex items-center justify-between sm:justify-center gap-2.5 sm:gap-4 p-1.5 sm:p-2 pr-2.5 sm:pr-3 rounded-full border mb-5 sm:mb-6 max-w-full shadow-xs transition-colors backdrop-blur-md ${
          isDarkMode ? 'bg-[#142017]/80 border-[#223525]' : 'bg-white/90 border-[#E8F5E9]'
        }">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#E65100] bg-[#E65100]/10">
            <Sparkles className="w-3 h-3 text-[#E65100]" />
            <span>Stories & Guides</span>
          </span>

          <span className="w-px h-4 bg-gray-300 dark:bg-gray-700 hidden sm:inline-block" />

          {/* Theme Toggle Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              isDarkMode
                ? "bg-[#1F3323] text-[#FFD54F] border border-[#2E4733] hover:bg-[#28422E]"
                : "bg-[#FAF7F2] text-gray-700 border border-gray-200 hover:bg-[#E8F5E9] hover:text-[#1B5E20]"
            }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FFD54F]" />
                <span className="text-[11px] sm:text-xs">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[11px] sm:text-xs">Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Main Title with Elegant Editorial Typography */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif mb-3 sm:mb-5 leading-[1.15] sm:leading-tight transition-colors ${
          isDarkMode ? "text-white" : "text-[#1B5E20]"
        }`}>
          The Siem Reap Journal
        </h1>
        <p className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-1 font-light transition-colors ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          Curated travel secrets, family adventures, and intimate stories from ancient temples to friendly capybaras.
        </p>
      </div>

      {/* 2. Interactive Search & Filters Bar (Touch-Optimized for Phones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 mb-8 sm:mb-12">
        <div className="space-y-3.5 sm:space-y-4">
          {/* Top Search & Language Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className={`block w-full pl-10 sm:pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl text-sm transition-all shadow-xs focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-[#142017] border border-[#223525] text-white placeholder-gray-400 focus:ring-[#4CAF50] focus:border-transparent"
                    : "bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-[#2E7D32] focus:border-transparent"
                }`}
                placeholder="Search stories, food, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative shrink-0" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center justify-between gap-2.5 w-full sm:w-auto px-4 py-3 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all duration-200 cursor-pointer ${
                  isDarkMode
                    ? "bg-[#142017] border border-[#223525] text-gray-200 hover:bg-[#1A2A1D] hover:border-[#4CAF50]/50"
                    : "bg-white border border-gray-200 text-gray-800 hover:bg-[#FAF7F2] hover:border-[#1B5E20]/40"
                }`}
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                <div className="flex items-center gap-2 truncate">
                  <Globe className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-[#81C784]" : "text-[#1B5E20]"}`} />
                  <span className="truncate">
                    {selectedLanguage === "all" ? "All Languages" : currentLang.name}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0 ${
                  isLangOpen ? "rotate-180" : ""
                }`} />
              </button>

              {/* Language Dropdown Menu */}
              {isLangOpen && (
                <div className={`absolute left-0 sm:right-0 sm:left-auto mt-2 w-64 max-h-[70vh] overflow-y-auto rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 border ${
                  isDarkMode
                    ? "bg-[#142017] border-[#223525] text-gray-100"
                    : "bg-white border-gray-100 text-gray-800"
                }`}>
                  <div className={`px-4 py-2 text-[10px] uppercase tracking-wider font-extrabold border-b mb-1 ${
                    isDarkMode ? "text-gray-400 border-[#223525]" : "text-gray-400 border-gray-100"
                  }`}>
                    Select Reading Language
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
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                          isSelected
                            ? isDarkMode
                              ? "bg-[#1B5E20]/60 text-[#81C784] font-bold"
                              : "bg-[#E8F5E9] text-[#1B5E20] font-bold"
                            : isDarkMode
                              ? "text-gray-300 hover:bg-[#1A2A1D] hover:text-[#81C784] font-medium"
                              : "text-gray-700 hover:bg-[#FAF7F2] hover:text-[#1B5E20] font-medium"
                        }`}
                      >
                        <span className="flex items-center gap-2.5 truncate">
                          <span className="text-base shrink-0">{lang.flag}</span>
                          <span className="truncate">{lang.name}</span>
                        </span>
                        {isSelected && (
                          <Check className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-[#81C784]" : "text-[#1B5E20]"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Swipeable Category Strip (Horizontal Scroll for Phones with Hidden Scrollbar) */}
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 snap-start cursor-pointer active:scale-95 ${
                      isActive
                        ? isDarkMode
                          ? "bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/30 scale-[1.02]"
                          : "bg-[#1B5E20] text-white shadow-md scale-[1.02]"
                        : isDarkMode
                          ? "bg-[#142017] text-gray-300 hover:bg-[#1A2A1D] hover:text-white border border-[#223525]"
                          : "bg-white text-gray-700 hover:bg-[#E8F5E9] hover:text-[#1B5E20] border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Pill & Count Indicator on Mobile */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1 pt-1">
            <span>
              Showing <strong className="text-[#1B5E20] dark:text-[#81C784] font-bold">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "story" : "stories"}
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#E65100] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Articles Feed (Mobile Responsive) */}
      <div id="blog-stories-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        {/* Featured Post (Hero Article) */}
        {featuredPost && (
          <div className="mb-10 sm:mb-16 lg:mb-20">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className={`relative rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col lg:flex-row border ${
                isDarkMode 
                  ? "bg-[#142017] border-[#223525]" 
                  : "bg-white border-[#E8F5E9]"
              }`}>
                {/* Image Section */}
                <div className={`w-full lg:w-3/5 h-60 sm:h-72 md:h-96 lg:h-[440px] relative overflow-hidden shrink-0 ${
                  isDarkMode ? "bg-[#17251B]" : "bg-[#E8F5E9]"
                }`}>
                  {featuredPost.featuredImage?.node?.sourceUrl ? (
                    <img 
                      src={featuredPost.featuredImage.node.sourceUrl} 
                      alt={featuredPost.featuredImage.node.altText || featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? "text-[#81C784] opacity-40" : "text-[#2E7D32] opacity-50"
                    }`}>
                      <BookOpen className="w-16 h-16" />
                    </div>
                  )}

                  {/* Gradient Overlay for Mobile Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#E65100] text-white px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md">
                    Featured Story
                  </div>

                  {/* Floating Category Pill on Mobile */}
                  <div className="absolute bottom-4 left-4 lg:hidden">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                      {featuredPost.categories?.nodes[0]?.name || "Uncategorized"}
                    </span>
                  </div>
                </div>

                {/* Content Section (Optimized for Mobile Spacing) */}
                <div className="w-full lg:w-2/5 p-5 sm:p-7 md:p-9 lg:p-10 flex flex-col justify-center">
                  <div className={`hidden lg:flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider mb-3 ${
                    isDarkMode ? "text-[#81C784]" : "text-[#2E7D32]"
                  }`}>
                    <span>{featuredPost.categories?.nodes[0]?.name || "Uncategorized"}</span>
                    <span className="w-1 h-1 rounded-full bg-[#E65100]" />
                    <span className={`flex items-center gap-1 font-normal lowercase ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      <Clock className="w-3.5 h-3.5" /> 4 min read
                    </span>
                  </div>

                  <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-2.5 sm:mb-4 leading-tight transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-[#81C784]" 
                      : "text-[#1B5E20] group-hover:text-[#E65100]"
                  }`}>
                    {featuredPost.title}
                  </h2>

                  <div 
                    className={`mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm md:text-base leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                  />

                  {/* Author & Read Story Action Bar */}
                  <div className={`flex items-center justify-between pt-4 border-t mt-auto ${
                    isDarkMode ? "border-[#223525]" : "border-gray-100"
                  }`}>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F8BBD0] flex items-center justify-center text-[#1B5E20] font-bold text-xs sm:text-sm shrink-0">
                        {featuredPost.author?.node?.name?.[0] || "M"}
                      </div>
                      <div className="truncate">
                        <div className={`text-xs sm:text-sm font-bold truncate ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {featuredPost.author?.node?.name || "Manet Sisamouth"}
                        </div>
                        <div className={`text-[10px] sm:text-xs truncate ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {format(parseISO(featuredPost.date), "MMMM d, yyyy")}
                        </div>
                      </div>
                    </div>

                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shrink-0 group-hover:scale-105 ${
                      isDarkMode 
                        ? "bg-[#1F3323] text-[#81C784] group-hover:bg-[#2E7D32] group-hover:text-white" 
                        : "bg-[#E8F5E9] text-[#1B5E20] group-hover:bg-[#1B5E20] group-hover:text-white"
                    }`}>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid Stories (1 col on Mobile, 2 on Tablet, 3 on Desktop) */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {gridPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                className={`group flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] border ${
                  isDarkMode 
                    ? "bg-[#142017] border-[#223525] shadow-md hover:shadow-2xl" 
                    : "bg-white border-[#E8F5E9] shadow-xs hover:shadow-xl"
                }`}
              >
                {/* Image Section */}
                <div className={`relative h-48 sm:h-52 md:h-56 overflow-hidden shrink-0 ${
                  isDarkMode ? "bg-[#17251B]" : "bg-[#E8F5E9]"
                }`}>
                  {post.featuredImage?.node?.sourceUrl ? (
                    <img 
                      src={post.featuredImage.node.sourceUrl} 
                      alt={post.featuredImage.node.altText || post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? "text-[#81C784] opacity-30" : "text-[#2E7D32] opacity-30"
                    }`}>
                      <BookOpen className="w-10 h-10" />
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold shadow-xs ${
                    isDarkMode 
                      ? "bg-black/70 text-[#81C784] border border-[#223525]" 
                      : "bg-white/95 text-[#1B5E20] border border-black/5"
                  }`}>
                    {post.categories?.nodes[0]?.name || "Blog"}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold font-serif mb-2 line-clamp-2 leading-snug transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-[#81C784]" 
                      : "text-[#1A2E1C] group-hover:text-[#E65100]"
                  }`}>
                    {post.title}
                  </h3>

                  <div 
                    className={`text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed flex-grow ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />

                  {/* Card Bottom Bar */}
                  <div className={`flex items-center justify-between border-t pt-3.5 mt-auto text-xs ${
                    isDarkMode ? "border-[#223525]" : "border-gray-100"
                  }`}>
                    <div className={`text-[11px] truncate max-w-[140px] sm:max-w-none ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      By {post.author?.node?.name || "Manet Sisamouth"}
                    </div>

                    <div className={`font-bold flex items-center gap-1 shrink-0 ${
                      isDarkMode ? "text-[#81C784]" : "text-[#1B5E20]"
                    }`}>
                      <span>Read Story</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className={`text-center py-16 sm:py-20 rounded-3xl border shadow-sm px-4 ${
            isDarkMode 
              ? "bg-[#142017] border-[#223525] text-gray-300" 
              : "bg-white border-gray-100 text-gray-600"
          }`}>
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className={`text-lg sm:text-xl font-bold mb-1.5 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              No stories found
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto mb-5">
              We couldn&apos;t find any stories matching your current search or category filter.
            </p>
            <button 
              onClick={clearAllFilters}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isDarkMode 
                  ? "bg-[#1B5E20] text-white hover:bg-[#2E7D32]" 
                  : "bg-[#E8F5E9] text-[#1B5E20] hover:bg-[#C8E6C9]"
              }`}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* 4. Modern Pagination Controls (Touch-Friendly UI/UX) */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/60 dark:border-[#223525]">
            {/* Story count summary */}
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium order-2 sm:order-1 text-center sm:text-left">
              Page <span className="font-bold text-[#1B5E20] dark:text-[#81C784]">{currentPage}</span> of{" "}
              <span className="font-bold text-[#1B5E20] dark:text-[#81C784]">{totalPages}</span> · Showing{" "}
              <span className="font-bold text-[#1B5E20] dark:text-[#81C784]">
                {currentPage === 1 
                  ? `1–${Math.min(7, totalPosts)}` 
                  : `${2 + (currentPage - 1) * POSTS_PER_PAGE}–${Math.min(1 + currentPage * POSTS_PER_PAGE, totalPosts)}`}
              </span>{" "}
              of <span className="font-bold text-[#1B5E20] dark:text-[#81C784]">{totalPosts}</span> stories
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                  currentPage === 1
                    ? "opacity-30 cursor-not-allowed border border-transparent"
                    : isDarkMode
                      ? "bg-[#142017] text-gray-200 border border-[#223525] hover:bg-[#1A2A1D] hover:border-[#4CAF50]/50"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-[#FAF7F2] hover:border-[#1B5E20]/40 shadow-xs"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Number Buttons */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {getPaginationRange(currentPage, totalPages).map((item, idx) => {
                  if (item === "...") {
                    return (
                      <span
                        key={`dots-${idx}`}
                        className="w-6 sm:w-8 text-center text-xs font-bold text-gray-400 select-none"
                      >
                        …
                      </span>
                    );
                  }
                  const pageNum = item as number;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      aria-label={`Go to page ${pageNum}`}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                        isActive
                          ? isDarkMode
                            ? "bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/30 scale-105"
                            : "bg-[#1B5E20] text-white shadow-md scale-105"
                          : isDarkMode
                            ? "bg-[#142017] text-gray-300 hover:bg-[#1A2A1D] hover:text-white border border-[#223525]"
                            : "bg-white text-gray-700 hover:bg-[#FAF7F2] hover:text-[#1B5E20] border border-gray-200 shadow-xs"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                  currentPage === totalPages
                    ? "opacity-30 cursor-not-allowed border border-transparent"
                    : isDarkMode
                      ? "bg-[#142017] text-gray-200 border border-[#223525] hover:bg-[#1A2A1D] hover:border-[#4CAF50]/50"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-[#FAF7F2] hover:border-[#1B5E20]/40 shadow-xs"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 5. Luxury Bottom Resort Invitation (Mobile Optimized) */}
        <div className="mt-14 sm:mt-20 lg:mt-24 rounded-3xl bg-gradient-to-br from-[#1B5E20] via-[#154619] to-[#0D2D10] overflow-hidden relative shadow-2xl border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-10" />
          <div className="relative z-20 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl text-white text-center lg:text-left">
              <span className="text-[#FFB74D] text-xs font-bold tracking-widest uppercase mb-2 block">
                Boutique Wildlife Retreat
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 text-[#F8BBD0] leading-tight">
                Experience Casa de Capybara
              </h3>
              <p className="text-white/85 text-xs sm:text-sm md:text-base mb-0 leading-relaxed font-light">
                Planning your Siem Reap escape? Drop by Ring Road to meet Molly &amp; Alex, relax in our artisan cafe, or stay in our luxury themed boutique villas.
              </p>
            </div>

            {/* Mobile Stacked Buttons with 48px Min Touch Targets */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <Link 
                href="/stay" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#1B5E20] rounded-2xl font-bold text-center hover:bg-[#F8BBD0] transition-colors shadow-lg text-xs sm:text-sm active:scale-95"
              >
                Book a Room
              </Link>
              <Link 
                href="/capybara-experience" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E65100] text-white rounded-2xl font-bold text-center hover:bg-[#ff6a1a] transition-colors shadow-lg text-xs sm:text-sm active:scale-95"
              >
                Meet Capybaras
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
