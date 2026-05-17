import type { Metadata } from "next";
import { bodoniModa, hankenGrotesk } from "@/lib/fonts";
import "./globals.css";
import { seoConfig } from "@/config/seo";

export const metadata: Metadata = {
  title: {
    default: seoConfig.default.title || "NooréFragrance",
    template: seoConfig.default.titleTemplate || "%s | NooréFragrance",
  },
  description: seoConfig.default.description,
  keywords: seoConfig.default.keywords,

  // URL and canonical
  metadataBase: new URL(seoConfig.siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
    },
  },
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: seoConfig.default.openGraph.title,
    description: seoConfig.default.openGraph.description,
    url: seoConfig.default.openGraph.url,
    siteName: seoConfig.default.openGraph.siteName,
    images: seoConfig.default.openGraph.images,
    locale: seoConfig.default.openGraph.locale,
    type: seoConfig.default.openGraph.type,
  },
  // Robots
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

  // Verification (add your actual verification codes)
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '', // Add your Google Search Console code
  //   // yandex: '', // Optional
  //   // me: ['https://facebook.com/noorfragrance', 'https://instagram.com/noorfragrance'], // Optional
  // },

  // Icons
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo-16x16.jpg",
    apple: "/logo.jpg",
  },

  category: "ecommerce",

  // App links (for mobile)
  appLinks: {
    web: {
      url: seoConfig.siteUrl,
      should_fallback: true,
    },
  },

  // Authors
  authors: [{ name: "NooréFragrance Team", url: seoConfig.siteUrl }],

  // Creator
  creator: "Sadnan Zaman",

  // Publisher
  publisher: "Sadnan Zaman",

  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  // Other metadata
  other: {
    "contact:email": seoConfig.supportEmail,
    "contact:phone": seoConfig.phoneNumber,
    "business:hours": `Mon-Sun ${seoConfig.default.businessHours.mondayToFriday}`,
    "payment:methods": seoConfig.default.businessInfo.paymentMethods.join(", "),
  },
};

function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(seoConfig.getBusinessSchema()),
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
