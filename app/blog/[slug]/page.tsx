import { notFound } from "next/navigation";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ChevronRight, Clock } from "lucide-react";
import { getPostBySlug, getBlogPosts } from "@/lib/wordpress";
import type { Metadata, ResolvingMetadata } from "next";
import SocialShareButtons from "@/components/blog/SocialShareButtons";

// Define the params interface
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | Casa de Capybara",
    };
  }

  // Use the excerpt as description, fallback to a default
  const description = post.excerpt ? post.excerpt.replace(/<[^>]*>?/gm, "").substring(0, 160) : "Read our latest stories and travel guides from Siem Reap.";

  return {
    title: `${post.title} | Casa de Capybara Blog`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
    },
  };
}

// Helper to estimate reading time
function getReadingTime(htmlContent: string = "") {
  const text = htmlContent.replace(/<[^>]*>?/gm, "");
  const wordCount = text.split(/\s+/).length;
  const time = Math.ceil(wordCount / 200);
  return time < 1 ? 1 : time;
}

export default async function SingleBlogPost({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Fetch all posts to find related ones
  const allPosts = await getBlogPosts();
  
  // Try to find posts in the same category, excluding the current post
  const primaryCategory = post.categories?.nodes[0]?.name;
  let relatedPosts = allPosts.filter(p => 
    p.id !== post.id && 
    p.categories?.nodes.some(c => c.name === primaryCategory)
  );

  // If not enough in category, just fill with latest
  if (relatedPosts.length < 3) {
    const additional = allPosts.filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id));
    relatedPosts = [...relatedPosts, ...additional];
  }
  
  // Take exactly 3
  relatedPosts = relatedPosts.slice(0, 3);

  const readingTime = getReadingTime(post.content);

  const processedContent = post.content
    ? post.content.replace(
        /<a\s+(href="https?:\/\/(?!cms\.casadecapybara\.com|casadecapybara\.com|localhost)[^"]+")/gi,
        '<a target="_blank" rel="noopener noreferrer" $1'
      )
    : "";

  return (
    <main className="bg-[#FAF7F2] min-h-screen pt-24 pb-20">
      
      {/* Breadcrumbs & Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/blog" className="hover:text-[#1B5E20] transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#1B5E20]">{primaryCategory || "Article"}</span>
        </nav>

        {/* Header Content */}
        <div className="flex items-center gap-3 text-sm text-[#2E7D32] font-semibold uppercase tracking-wider mb-6">
          <span className="bg-[#E8F5E9] px-3 py-1 rounded-full">{primaryCategory || "Uncategorized"}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]"></span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {readingTime} min read</span>
        </div>


        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B5E20] leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-gray-200 pb-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F8BBD0] flex items-center justify-center text-[#1B5E20] text-lg font-bold">
              {post.author?.node?.name?.[0] || "M"}
            </div>
            <div>
              <div className="font-bold text-gray-900">{post.author?.node?.name || "Manet Sisamouth"}</div>
              <div className="text-sm text-gray-500">Published {format(parseISO(post.date), "MMMM d, yyyy")}</div>
            </div>
          </div>
          
          {/* Interactive Social Share Bar */}
          <SocialShareButtons title={post.title} slug={post.slug} />
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage?.node?.sourceUrl && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl bg-[#E8F5E9]">
            <img 
              src={post.featuredImage.node.sourceUrl} 
              alt={post.featuredImage.node.altText || post.title}
              className="w-full h-full object-cover"
            />
          </div>
          {post.featuredImage.node.altText && (
            <p className="text-center text-sm text-gray-500 mt-4 italic">
              {post.featuredImage.node.altText}
            </p>
          )}
        </div>
      )}

      {/* Main Content & Sidebar Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Article Body */}
        <article 
          className="prose prose-lg md:prose-xl prose-headings:text-[#1B5E20] prose-a:text-[#E65100] hover:prose-a:underline prose-img:rounded-2xl max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 mb-16"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />

        {/* Contextual In-Article Callout Box */}
        <div className="bg-[#E8F5E9] border-l-4 border-[#1B5E20] rounded-r-2xl p-8 my-16 shadow-sm">
          <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">Planning a trip to Siem Reap?</h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Visiting Siem Reap? Casa de Capybara is located on Ring Road, minutes from Angkor Wat. Meet Molly & Alex ($10 day pass) or stay in our themed boutique rooms from $50/night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/stay" className="px-6 py-3 bg-[#1B5E20] text-white rounded-xl font-bold text-center hover:bg-[#2E7D32] transition-colors shadow-md">
              Book a Room — From $50
            </Link>
            <Link href="/capybara-experience" className="px-6 py-3 bg-[#E65100] text-white rounded-xl font-bold text-center hover:bg-[#ff6a1a] transition-colors shadow-md">
              Capybara Experience — $10
            </Link>
          </div>
        </div>

        {/* Author Profile Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start my-16">
          <div className="w-32 h-32 shrink-0 rounded-full bg-[#FCE4EC] border-4 border-white shadow-md overflow-hidden relative">
            {/* If Manet has a real photo it would go here. Using a placeholder or initial for now. */}
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#E65100]">
              {post.author?.node?.name?.[0] || "M"}
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm font-bold text-[#E65100] uppercase tracking-wider mb-2">Cambodian Travel Writer & Explorer</div>
            <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">Manet Sisamouth</h3>
            <p className="text-gray-600 leading-relaxed">
              Manet Sisamouth is a Cambodian travel writer, food lover and lifelong explorer of Siem Reap's hidden gems. From ancient temples to the city's most unique new experiences, Manet has spent years uncovering the stories that make Cambodia truly extraordinary.
            </p>
          </div>
        </div>

      </div>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 border-t border-gray-200 pt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-[#1B5E20]">Keep Reading</h2>
            <Link href="/blog" className="text-[#E65100] font-bold hover:underline flex items-center gap-1">
              View all articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rp) => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="relative h-48 overflow-hidden bg-[#E8F5E9]">
                  {rp.featuredImage?.node?.sourceUrl ? (
                    <img 
                      src={rp.featuredImage.node.sourceUrl} 
                      alt={rp.featuredImage.node.altText || rp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2E7D32] opacity-30">
                      <span className="text-4xl font-bold">C</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#1B5E20] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {rp.categories?.nodes[0]?.name || "Blog"}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#E65100] transition-colors">
                    {rp.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-4">
                    <div className="text-xs text-gray-500">{format(parseISO(rp.date), "MMM d, yyyy")}</div>
                    <div className="text-xs font-semibold text-[#2E7D32] flex items-center gap-1">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}
