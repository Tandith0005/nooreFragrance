import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://noorfragrance.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/shop/",
          "/collections/",
          "/perfumes/",
          "/attars/",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/checkout/",
          "/cart/",
          "/payment/",
          "/dashboard/",
          "/order/confirmation/",
          "/seller/dashboard/",
          "/account/",
          "/login/",
          "/register/",
          "/search",
          "/*filter*",
          "/*sort*",
          "/*page=*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}