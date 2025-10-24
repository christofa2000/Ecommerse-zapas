import { locales } from "@/lib/i18n-server";
import { sampleProducts } from "@/lib/products/sample";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/es/productos`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es/productos`,
          en: `${baseUrl}/en/productos`,
        },
      },
    },
    {
      url: `${baseUrl}/en/productos`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/es/productos`,
          en: `${baseUrl}/en/productos`,
        },
      },
    },
    {
      url: `${baseUrl}/es/carrito`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
      alternates: {
        languages: {
          es: `${baseUrl}/es/carrito`,
          en: `${baseUrl}/en/carrito`,
        },
      },
    },
    {
      url: `${baseUrl}/en/carrito`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
      alternates: {
        languages: {
          es: `${baseUrl}/es/carrito`,
          en: `${baseUrl}/en/carrito`,
        },
      },
    },
  ];

  // Product pages
  const productPages = sampleProducts.flatMap((product) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/productos/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/es/productos/${product.slug}`,
          en: `${baseUrl}/en/productos/${product.slug}`,
        },
      },
    }))
  );

  return [...staticPages, ...productPages];
}
