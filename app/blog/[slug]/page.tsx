import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} | Blog | Casa de Capybara`,
    description: `Read the story: ${title}`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4 capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="text-lg text-gray-600">
          Full blog post article content will be displayed here.
        </p>
      </article>
    </main>
  );
}
