"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  Globe, 
  ChevronDown, 
  Check, 
  Sun, 
  Moon 
} from "lucide-react";
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
    <main className={`min-h-screen pt-24 pb-16 transition-colors duration-500 ${isDarkMode ? "bg-[#0B130D] text-gray-100" : "bg-[#FAF7F2] text-gray-900"}`}>
      {/* Hero Header with Dark Mode Toggle */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-[#E65100] font-bold text-xs sm:text-sm tracking-widest uppercase">
            STORIES, GUIDES & HIDDEN GEMS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]/50" />
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer shadow-xs ${
              isDarkMode
                ? "bg-[#162218] text-[#FFD54F] border border-[#263828] hover:bg-[#1E2E20]"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-[#FAF7F2] hover:text-[#1B5E20]"
            }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FFD54F]" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>

        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-[#1B5E20]"
        }`}>
          The Siem Reap Journal
        </h1>
        <p className={`text-lg sm:text-xl max-w-2xl mx-auto transition-colors duration-300 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          Curated travel stories, family adventures, and local secrets from ancient temples to friendly capybaras.
        </p>
      </div>

      {/* Explorer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Search Bar, Language Dropdown & Quick Theme Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:max-w-2xl">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-11 pr-4 py-3 rounded-2xl text-sm transition-all shadow-xs focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? "bg-[#141F16] border border-[#223525] text-white placeholder-gray-400 focus:ring-[#4CAF50] focus:border-transparent"
                      : "bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-[#2E7D32] focus:border-transparent"
                  }`}
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
                  className={`flex items-center justify-between gap-3 w-full sm:w-auto px-4 py-3 rounded-2xl text-sm font-semibold shadow-xs transition-all duration-200 cursor-pointer ${
                    isDarkMode
                      ? "bg-[#141F16] border border-[#223525] text-gray-200 hover:bg-[#1A2A1D] hover:border-[#4CAF50]/50"
                      : "bg-white border border-gray-200 text-gray-800 hover:bg-[#FAF7F2] hover:border-[#1B5E20]/40"
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isLangOpen}
                >
                  <div className="flex items-center gap-2">
                    <Globe className={`w-4 h-4 ${isDarkMode ? "text-[#81C784]" : "text-[#1B5E20]"}`} />
                    <span>
                      {selectedLanguage === "all" ? "Select Language" : currentLang.name}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isLangOpen && (
                  <div className={`absolute left-0 sm:right-0 sm:left-auto mt-2 w-64 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDarkMode
                      ? "bg-[#141F16] border border-[#223525] text-gray-100"
                      : "bg-white border border-gray-100 text-gray-800"
                  }`}>
                    <div className={`px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-bold border-b mb-1 ${
                      isDarkMode ? "text-gray-400 border-[#223525]" : "text-gray-400 border-gray-100"
                    }`}>
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
                          className={`flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                            isSelected
                              ? isDarkMode
                                ? "bg-[#1B5E20]/60 text-[#81C784] font-bold"
                                : "bg-[#E8F5E9] text-[#1B5E20] font-bold"
                              : isDarkMode
                                ? "text-gray-300 hover:bg-[#1A2A1D] hover:text-[#81C784] font-medium"
                                : "text-gray-700 hover:bg-[#FAF7F2] hover:text-[#1B5E20] font-medium"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                          {isSelected && (
                            <Check className={`w-4 h-4 ${isDarkMode ? "text-[#81C784]" : "text-[#1B5E20]"}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Categories */}
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 hide-scrollbar gap-2 shrink-0">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? isDarkMode
                          ? "bg-[#2E7D32] text-white shadow-lg shadow-[#2E7D32]/30 scale-105"
                          : "bg-[#1B5E20] text-white shadow-md scale-105"
                        : isDarkMode
                          ? "bg-[#141F16] text-gray-300 hover:bg-[#1A2A1D] hover:text-white border border-[#223525]"
                          : "bg-white text-gray-700 hover:bg-[#E8F5E9] hover:text-[#1B5E20] border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16 sm:mb-20">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className={`relative rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                isDarkMode 
                  ? "bg-[#141F16] border border-[#223525]" 
                  : "bg-white border border-gray-100"
              }`}>
                <div className={`md:w-3/5 h-64 md:h-[450px] relative overflow-hidden ${
                  isDarkMode ? "bg-[#1A261C]" : "bg-[#E8F5E9]"
                }`}>
                  {featuredPost.featuredImage?.node?.sourceUrl ? (
                    <img 
                      src={featuredPost.featuredImage.node.sourceUrl} 
                      alt={featuredPost.featuredImage.node.altText || featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? "text-[#81C784] opacity-40" : "text-[#2E7D32] opacity-50"
                    }`}>
                      <BookOpen className="w-20 h-20" />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-[#E65100] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    Featured Article
                  </div>
                </div>
                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-wider mb-4 ${
                    isDarkMode ? "text-[#81C784]" : "text-[#2E7D32]"
                  }`}>
                    <span>{featuredPost.categories?.nodes[0]?.name || "Uncategorized"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]"></span>
                    <span className={`flex items-center gap-1.5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      <Clock className="w-4 h-4" /> 4 min read
                    </span>
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-[#81C784]" 
                      : "text-[#1B5E20] group-hover:text-[#2E7D32]"
                  }`}>
                    {featuredPost.title}
                  </h2>
                  <div 
                    className={`mb-8 line-clamp-3 text-base sm:text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                  />
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F8BBD0] flex items-center justify-center text-[#1B5E20] font-bold">
                        {featuredPost.author?.node?.name?.[0] || "M"}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {featuredPost.author?.node?.name || "Manet Sisamouth"}
                        </div>
                        <div className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {format(parseISO(featuredPost.date), "MMMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isDarkMode 
                        ? "bg-[#1E2E20] text-[#81C784] group-hover:bg-[#2E7D32] group-hover:text-white" 
                        : "bg-[#E8F5E9] text-[#1B5E20] group-hover:bg-[#1B5E20] group-hover:text-white"
                    }`}>
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
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`} 
                className={`group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode 
                    ? "bg-[#141F16] border border-[#223525] shadow-md hover:shadow-2xl" 
                    : "bg-white border border-gray-100 shadow-sm hover:shadow-xl"
                }`}
              >
                <div className={`relative h-56 overflow-hidden ${
                  isDarkMode ? "bg-[#1A261C]" : "bg-[#E8F5E9]"
                }`}>
                  {post.featuredImage?.node?.sourceUrl ? (
                    <img 
                      src={post.featuredImage.node.sourceUrl} 
                      alt={post.featuredImage.node.altText || post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? "text-[#81C784] opacity-30" : "text-[#2E7D32] opacity-30"
                    }`}>
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  <div className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    isDarkMode 
                      ? "bg-black/80 text-[#81C784] border border-[#223525]" 
                      : "bg-white/95 text-[#1B5E20]"
                  }`}>
                    {post.categories?.nodes[0]?.name || "Blog"}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-[#FF8A65]" 
                      : "text-[#1A1A1A] group-hover:text-[#E65100]"
                  }`}>
                    {post.title}
                  </h3>
                  <div 
                    className={`text-sm mb-6 line-clamp-3 flex-grow ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <div className={`flex items-center justify-between border-t pt-4 mt-auto ${
                    isDarkMode ? "border-[#223525]" : "border-gray-100"
                  }`}>
                    <div className={`text-xs font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      By {post.author?.node?.name || "Manet Sisamouth"}
                    </div>
                    <div className={`text-xs font-semibold flex items-center gap-1 ${
                      isDarkMode ? "text-[#81C784]" : "text-[#2E7D32]"
                    }`}>
                      Read Guide <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 rounded-3xl border shadow-sm ${
            isDarkMode 
              ? "bg-[#141F16] border-[#223525] text-gray-300" 
              : "bg-white border-gray-100 text-gray-600"
          }`}>
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              No articles found
            </h3>
            <p className="text-sm text-gray-400">
              We couldn&apos;t find any articles matching your current filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All Topics"); setSelectedLanguage("all"); }}
              className={`mt-6 px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer ${
                isDarkMode 
                  ? "bg-[#1B5E20] text-white hover:bg-[#2E7D32]" 
                  : "bg-[#E8F5E9] text-[#1B5E20] hover:bg-[#C8E6C9]"
              }`}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Newsletter / CTA Banner */}
        <div className="mt-24 rounded-3xl bg-gradient-to-br from-[#1B5E20] via-[#154619] to-[#0D2D10] overflow-hidden relative shadow-2xl border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
          <div className="relative z-20 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#F8BBD0]">
                Ready for your own adventure?
              </h3>
              <p className="text-white/85 text-base sm:text-lg mb-0 leading-relaxed">
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
    </main>
  );
}
