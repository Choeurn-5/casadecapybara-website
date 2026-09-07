import type { Metadata } from "next";

interface StayDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: StayDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} | Stay | Casa de Capybara`,
    description: `Details and booking information for ${title}.`,
  };
}

export default async function StayDetailPage({ params }: StayDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-lg text-gray-600">
        Accommodation details and amenities for this stay.
      </p>
    </main>
  );
}
