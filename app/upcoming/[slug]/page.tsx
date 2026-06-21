import { notFound } from "next/navigation";
import Link from "next/link";
import { upcomingFragrances } from "@/data/upcoming";
import UpcomingDetailClient from "@/components/ui/UpcomingDetailClient";

export function generateStaticParams() {
  return upcomingFragrances.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fragrance = upcomingFragrances.find((f) => f.slug === slug);
  if (!fragrance) return {};
  return {
    title: `${fragrance.name} — Coming Soon | Hasara Parfums`,
    description: fragrance.description,
  };
}

export default async function UpcomingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fragrance = upcomingFragrances.find((f) => f.slug === slug);
  if (!fragrance) notFound();

  return <UpcomingDetailClient fragrance={fragrance} />;
}
