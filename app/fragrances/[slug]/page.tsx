import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import SizeSelector from "@/components/ui/SizeSelector";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductTabs from "@/components/ui/ProductTabs";
import { fragrances } from "@/data/products";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import WishlistButton from "@/components/ui/WishlistButton";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return fragrances.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = fragrances.find((f) => f.slug === params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Hasara Parfums`,
      description: product.description,
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = fragrances.find((f) => f.slug === params.slug);
  if (!product) notFound();

  const related = fragrances
    .filter((f) => f.collection === product.collection && f.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-champagne-white">
      <Navbar />

      <div className="bg-matte-black pt-28 pb-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/fragrances"
            className="inline-flex items-center gap-2 text-champagne-white/50 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            All Fragrances
          </Link>
        </div>
      </div>

      <section className="bg-matte-black pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ProductGallery cover={product.image} gallery={product.gallery} name={product.name} />

            <div className="lg:pt-8">
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-2">
                {product.collectionLabel}
              </p>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="font-serif text-champagne-white text-5xl lg:text-6xl font-light tracking-wide leading-tight">
                  {product.name}
                </h1>
                <div className="mt-2 flex-shrink-0 bg-champagne-white/10 rounded-full p-2.5">
                  <WishlistButton slug={product.slug} />
                </div>
              </div>
              <p className="font-sans text-champagne-white/40 text-xs tracking-wider italic mb-8">
                Inspired by {product.inspiredBy}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-champagne-gold/20">
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">Longevity</p>
                  <p className="text-champagne-white text-sm font-sans">{product.longevity}</p>
                </div>
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">Gender</p>
                  <p className="text-champagne-white text-sm font-sans">{product.gender}</p>
                </div>
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">When to Wear</p>
                  <p className="text-champagne-white text-sm font-sans">{product.dayNight}</p>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b border-champagne-gold/20">
                <p className="text-champagne-white/40 text-xs tracking-[0.3em] uppercase font-sans mb-4">Main Accords</p>
                <div className="flex flex-wrap gap-2">
                  {product.mainAccords.map((a) => (
                    <span key={a} className="px-3 py-1.5 border border-champagne-gold/30 text-champagne-white/70 text-xs font-sans tracking-wide rounded-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8 pb-8 border-b border-champagne-gold/20">
                <p className="text-champagne-white/40 text-xs tracking-[0.3em] uppercase font-sans mb-4">Best Seasons</p>
                <div className="flex flex-wrap gap-2">
                  {product.season.map((s) => (
                    <span key={s} className="px-3 py-1.5 border border-champagne-gold/30 text-champagne-white/70 text-xs font-sans tracking-wide rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <SizeSelector productName={product.name} productSlug={product.slug} productImage={product.image} sizes={product.sizes} />
            </div>
          </div>
        </div>
      </section>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <section className="bg-champagne-white py-20 px-6 lg:px-12 border-t border-stone-100">
          <div className="max-w-7xl mx-auto">
            <p className="font-serif text-primary-text text-4xl font-light tracking-wide mb-12">
              You May Also Like
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.id} href={`/fragrances/${r.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-4 rounded-sm">
                    <Image src={r.image} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="33vw" />
                  </div>
                  <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">{r.collectionLabel}</p>
                  <p className="font-serif text-primary-text text-xl font-medium group-hover:text-champagne-gold transition-colors duration-300">{r.name}</p>
                  <p className="font-sans text-secondary-text text-xs tracking-wide mt-0.5 italic">Inspired by {r.inspiredBy}</p>
                  <p className="font-sans text-secondary-text text-xs tracking-wide mt-1">From ৳{r.sizes[0].price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
