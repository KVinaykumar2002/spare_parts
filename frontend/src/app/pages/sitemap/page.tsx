"use client";

import Link from "next/link";

export default function SitemapPage() {
  return (
    <div className="bg-white font-body">
      <div className="container mx-auto px-5 py-16 lg:px-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
          Sitemap
        </h1>
        <p className="text-sm text-medium-gray mb-4">
          This is a simple sitemap listing key pages in the ANANDH BunkStores website.
        </p>
        <ul className="list-disc list-inside text-sm text-dark-gray space-y-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/collections/all">All Products</Link>
          </li>
          <li>
            <Link href="/pages/membership">Co-Op Membership</Link>
          </li>
          <li>
            <Link href="/pages/store-locator">Store Locator</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}


