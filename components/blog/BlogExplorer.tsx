"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { BlogPost } from "@/lib/wordpress";

interface BlogExplorerProps {
  initialPosts: BlogPost[];
}

const CATEGORIES = ["All Topics", "Travel Guides", "Family Travel", "Capybara Stories", "Cafes & Food"];
const LANGUAGES = [
  { name: "All Languages", id: "all" },
  { name: "🇬🇧 English (EN)", id: "english" },
  { name: "🇰🇭 ភាសាខ្មែរ (KH)", id: "khmer" },
  { name: "🇫🇷 Français (FR)", id: "french" },
  { name: "🇩🇪 Deutsch (DE)", id: "deutsch" },
  { name: "🇰🇷 한국어 (KR)", id: "korean" },
  { name: "🇨🇳 中文 (CN)", id: "chinese" },
  { name: "🇯🇵 日本語 (JP)", id: "japanese" },
];

export default function BlogExplorer({ initialPosts }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

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
      let langMatch = true;
      if (selectedLanguage !== "all") {
        const langObj = LANGUAGES.find(l => l.id === selectedLanguage);
        const langName = langObj?.name.replace(/[^a-zA-Z ]/g, "").trim().split(" ")[0].toLowerCase();
        
        langMatch = 
          post.categories.nodes.some(c => c.name.toLowerCase().includes(langName || "")) ||
          post.tags?.nodes.some(t => t.name.toLowerCase().includes(langName || "")) || false;
      }

      return searchMatch && catMatch && langMatch;
    });
  }, [initialPosts, searchQuery, selectedCategory, selectedLanguage]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Controls */}
      <div className="mb-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-shadow shadow-sm"
              placeholder="Search stories, tips, and guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 hide-scrollbar gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
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

        {/* Languages Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar gap-6">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedLanguage === lang.id
                  ? "border-[#E65100] text-[#E65100]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {lang.name}
            </button>
          ))}
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
