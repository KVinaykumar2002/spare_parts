import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_STORE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

type Props = { searchParams: Promise<{ image?: string; name?: string; price?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const imageParam = params.image;
  const name = params.name || "Product";
  const price = params.price;

  const imageUrlAbsolute =
    BASE_URL && imageParam
      ? imageParam.startsWith("http")
        ? imageParam
        : `${BASE_URL}${imageParam.startsWith("/") ? "" : "/"}${imageParam}`
      : undefined;

  const description = price ? `${name} – ₹${price}` : name;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      images: imageUrlAbsolute ? [{ url: imageUrlAbsolute, width: 1200, height: 630, alt: name }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: imageUrlAbsolute ? [imageUrlAbsolute] : undefined,
    },
  };
}

export default async function ProductPreviewPage({ searchParams }: Props) {
  const params = await searchParams;
  const name = params.name || "Product";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <p className="text-lg text-gray-700 text-center">
        <strong>{decodeURIComponent(name)}</strong>
      </p>
      <p className="text-sm text-gray-500 mt-2">Product preview for sharing</p>
    </div>
  );
}
