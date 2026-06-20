import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import SizeSelector from "@/components/ui/SizeSelector";
import ProductGallery from "@/components/ui/ProductGallery";
import { fragrances } from "@/data/products";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

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

      <div className="bg-matte-black pt-24 pb-6 px-6 lg:px-12">
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
            {/* Product Gallery */}
            <ProductGallery
              cover={product.image}
              gallery={product.gallery}
              name={product.name}
            />

            {/* Product Details */}
            <div className="lg:pt-12">
              <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">
                {product.collectionLabel}
              </p>
              <h1 className="font-serif text-champagne-white text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-6">
                {product.name}
              </h1>
              <p className="text-champagne-white/70 font-sans text-sm leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Product Meta */}
              <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-champagne-gold/20">
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">
                    Longevity
                  </p>
                  <p className="text-champagne-white text-sm font-sans">
                    {product.longevity}
                  </p>
                </div>
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">
                    Gender
                  </p>
                  <p className="text-champagne-white text-sm font-sans">
                    {product.gender}
                  </p>
                </div>
                <div>
                  <p className="text-champagne-white/40 text-xs tracking-wider uppercase font-sans mb-1">
                    Best For
                  </p>
                  <p className="text-champagne-white text-sm font-sans">
                    {product.occasion.split(",")[0]}
                  </p>
                </div>
              </div>

              {/* Fragrance Pyramid */}
              <div className="mb-10 pb-10 border-b border-champagne-gold/20">
                <p className="text-champagne-white/40 text-xs tracking-[0.3em] uppercase font-sans mb-5">
                  Fragrance Pyramid
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Top Notes", notes: product.notes.top },
                    { label: "Heart Notes", notes: product.notes.heart },
                    { label: "Base Notes", notes: product.notes.base },
                  ].map((tier) => (
                    <div key={tier.label} className="flex items-start gap-4">
                      <span className="text-champagne-gold/60 text-xs font-sans tracking-wider uppercase w-24 flex-shrink-0 pt-0.5">
                        {tier.label}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {tier.notes.map((note) => (
                          <span
                            key={note}
                            className="px-3 py-1 border border-champagne-gold/30 text-champagne-white/70 text-xs font-sans tracking-wide"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selector + WhatsApp CTA */}
              <SizeSelector productName={product.name} sizes={product.sizes} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-champagne-white py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <p className="font-serif text-primary-text text-4xl font-light tracking-wide mb-12">
              You May Also Like
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.id} href={`/fragrances/${r.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-4">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="33vw"
                    />
                  </div>
                  <p className="text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans mb-1">
                    {r.collectionLabel}
                  </p>
                  <p className="font-serif text-primary-text text-xl font-medium group-hover:text-champagne-gold transition-colors duration-300">
                    {r.name}
                  </p>
                  <p className="font-sans text-secondary-text text-xs tracking-wide mt-1">
                    From ৳{r.sizes[0].price.toLocaleString()}
                  </p>
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
