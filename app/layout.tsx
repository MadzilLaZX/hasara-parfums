import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hasaraparfums.com"),
  title: {
    default: "Hasara Parfums | Luxury Fragrance House",
    template: "%s | Hasara Parfums",
  },
  description:
    "Discover Hasara Parfums — a luxury fragrance house offering premium oud, signature, men's and women's collections. Exquisite scents crafted for those who speak before they speak. Order via WhatsApp.",
  keywords: [
    "luxury perfume Bangladesh",
    "Hasara Parfums",
    "oud perfume BD",
    "premium fragrance Bangladesh",
    "perfume shop Bangladesh",
    "luxury fragrance house",
    "oud collection",
    "signature perfume",
    "best perfume BD",
    "fragrance WhatsApp order",
  ],
  authors: [{ name: "Hasara Parfums" }],
  creator: "Hasara Parfums",
  publisher: "Hasara Parfums",
  openGraph: {
    title: "Hasara Parfums | Luxury Fragrance House",
    description:
      "Premium luxury fragrances crafted for those who speak before they speak. Explore our signature oud, men's and women's collections.",
    url: "https://hasaraparfums.com",
    siteName: "Hasara Parfums",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasara Parfums | Luxury Fragrance House",
    description:
      "Premium luxury fragrances. Elegance in every drop. Order via WhatsApp.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0F0F",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hasara Parfums",
  description: "Luxury fragrance house offering premium oud and signature fragrances.",
  url: "https://hasaraparfums.com",
  telephone: "+8801767067130",
  email: "hasara.byabidhasan@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
  },
  sameAs: [
    "https://www.instagram.com/hasaraparfums",
    "https://www.facebook.com/profile.php?id=61576921379211",
  ],
  priceRange: "৳৳৳",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-champagne-white text-primary-text font-sans antialiased overflow-x-hidden">
        <CartProvider><WishlistProvider>{children}</WishlistProvider></CartProvider>
      </body>
    </html>
  );
}
