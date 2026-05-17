// src/config/seo.ts

export const seoConfig = {
  // Site basics
  siteName: "NooréFragrance",
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://noorfragrance.vercel.app", 
  siteLogo: "/logo.png",
  siteImage: "/logo.jpg",
  
  // Contact/Support
  supportEmail: "support@noorfragrance.com",
  phoneNumber: "+8801636051204",
  address: {
    country: "Bangladesh",
    city: "Dhaka",
  },
  
  // Social media
  social: {
    facebook: "https://facebook.com/noorfragrance",
    instagram: "https://instagram.com/noorfragrance",
    twitter: "https://twitter.com/noorfragrance",
    whatsapp: "https://wa.me/8801636051204", 
  },
  
  // Default SEO metadata
  default: {
    title: "NooréFragrance - Premium Perfumes & Attars | Authentic Fragrances in Bangladesh",
    titleTemplate: "%s | NooréFragrance",
    description: "Discover authentic premium perfumes and traditional attars in Bangladesh. Shop genuine designer fragrances with COD, Bkash, and card payment. Trusted by thousands of fragrance lovers.",
    keywords: [
      "perfume Bangladesh",
      "attar Bangladesh",
      "authentic perfume",
      "designer fragrances",
      "traditional attar",
      "premium perfume shop",
      "noorfragrance",
      "perfume buy online",
      "COD perfume Bangladesh",
      "bkash payment perfume"
    ].join(", "),
    
    openGraph: {
      type: "website",
      locale: "bn_BD",
      alternateLocale: "en_US",
      url: process.env.NEXT_PUBLIC_APP_URL,
      siteName: "NooréFragrance",
      title: "NooréFragrance - Premium Perfumes & Attars",
      description: "Discover authentic premium perfumes and traditional attars in Bangladesh. Shop genuine designer fragrances with COD, bkash, and card payment.",
      images: [
        {
          url: "/logo.jpg",
          width: 1200,
          height: 630,
          alt: "NooréFragrance - Authentic Perfumes & Attars",
          type: "image/jpeg",
        },
      ],
    },
    
    
    // For local business schema
    businessInfo: {
      name: "NooréFragrance",
      legalName: "Nooré Fragrance Limited", 
      description: "Authentic perfume and attar e-commerce platform in Bangladesh",
      foundingDate: "2026", 
      founder: "Sadnan Zaman",
      paymentMethods: ["Cash on Delivery", "bKash", "Bank Transfer", "Stripe (Credit/Debit Card)"],
      currencies: ["BDT", "USD"],
      deliveryAreas: ["All over Dhaka", "All over Bangladesh", "International shipping available"],
    },
    
    // E-commerce specific
    productCategories: [
      "Premium Perfumes",
      "Traditional Attars",
      "Designer Fragrances",
      "Niche Perfumes",
      "Arabian Oud",
      "Gift Sets"
    ],
    
    // Business hours (BD time)
    businessHours: {
      mondayToFriday: "10:00 AM - 8:00 PM",
      saturday: "11:00 AM - 7:00 PM",
      sunday: "10:00 AM - 6:00 PM",
      timezone: "Asia/Dhaka"
    }
  },
  
  // Page-specific SEO templates
  pages: {
    home: {
      title: "NooréFragrance - Premium Perfumes & Attars in Bangladesh",
      description: "Shop authentic perfumes and traditional attars online in Bangladesh. Best prices, 100% genuine products, COD available. Free shipping on orders over ৳2000.",
      openGraph: {
        title: "NooréFragrance - Your Trusted Fragrance Destination",
        description: "Discover premium perfumes, traditional attars, and designer fragrances. Authentic products guaranteed."
      }
    },
    
    products: {
      title: "Shop Premium Perfumes & Attars",
      description: "Browse our collection of authentic perfumes and traditional attars. From designer brands to niche fragrances, find your perfect scent.",
    },
    
    productDetail: {
      titleTemplate: "%s | Buy Authentic Perfume Online",
      descriptionTemplate: "Buy %s at NooréFragrance Bangladesh. 100% authentic, best price, COD available. Shop now!"
    },
    
    about: {
      title: "About NooréFragrance - Your Authentic Fragrance Destination",
      description: "Learn about NooréFragrance, Bangladesh's trusted platform for authentic perfumes and traditional attars. Quality guaranteed since 2024.",
    },
    
    contact: {
      title: "Contact NooréFragrance - Support & Inquiries",
      description: "Get in touch with NooréFragrance for perfume inquiries, order support, or seller registration. We're here to help!",
    },
    
    sellerRegistration: {
      title: "Become a Seller at NooréFragrance",
      description: "Sell authentic perfumes and attars on Bangladesh's fastest-growing fragrance marketplace. Join trusted sellers today!",
    },
    
    faq: {
      title: "FAQ - Perfume Shopping & Delivery",
      description: "Find answers about product authenticity, payment methods (COD, bkash, card), shipping, returns, and more.",
    },
    
    returnPolicy: {
      title: "Return & Refund Policy - NooréFragrance",
      description: "Our return and refund policy for authentic perfumes and attars. Customer satisfaction guaranteed.",
    },
    
    privacyPolicy: {
      title: "Privacy Policy - NooréFragrance",
      description: "Learn how NooréFragrance protects your personal information and payment data.",
    },
    
    termsAndConditions: {
      title: "Terms & Conditions - NooréFragrance Marketplace",
      description: "Terms for buyers and sellers on NooréFragrance platform. Read about our seller authentication process.",
    }
  },
  
  // Structured data (JSON-LD) helpers
  getBusinessSchema: () => ({
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "NooréFragrance",
    "url": process.env.NEXT_PUBLIC_APP_URL,
    "logo": `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    "image": `${process.env.NEXT_PUBLIC_APP_URL}/logo.jpg`,
    "description": "Authentic perfume and attar e-commerce platform in Bangladesh",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@noorfragrance.com"
    },
    "paymentAccepted": "Cash on Delivery, bKash, Bank Transfer, Credit/Debit Card",
    "priceRange": "৳500 - ৳20000",
    "sameAs": [
      "https://facebook.com/noorfragrance",
      "https://instagram.com/noorfragrance"
    ]
  }),
  
  getProductSchema: (product: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.imageUrl,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "BDT",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.slug}`,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": product.price > 2000 ? "0" : "60",
          "currency": "BDT"
        },
        "deliveryTimes": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          }
        }
      }
    }
  }),
  
  getSellerSchema: (seller: any) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seller.storeName,
    "description": `Authentic fragrance seller on NooréFragrance marketplace. Verified seller of premium perfumes and attars.`,
    "url": `${process.env.NEXT_PUBLIC_APP_URL}/sellers/${seller.id}`,
    "brand": {
      "@type": "Brand",
      "name": seller.storeName
    },
    "makesOffer": seller.products.map((product: any) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": product.name
      }
    }))
  }),
  
  getBreadcrumbSchema: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${process.env.NEXT_PUBLIC_APP_URL}${item.url}`
    }))
  })
}