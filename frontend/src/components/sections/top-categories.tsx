"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
  items: string;
  image: string;
  bgColor: string;
  href: string;
}

const categoriesData: Category[] = [
  { name: "Indian Oil Petrol Bunk Products", items: "28 items", image: "/products/Indian_oil_petrol_bump_products/0.jpg", bgColor: "bg-[#E8F4F8]", href: "/collections/indian-oil-petrol-bunk-products" },
  { name: "Hindustan Oil Products", items: "25 items", image: "/products/Hindhustan_oil_products/0.jpg", bgColor: "bg-[#FBF3D4]", href: "/collections/hindustan-oil-products" },
  { name: "Bharat Petrol Products", items: "23 items", image: "/products/Bharat_petrol_products/0.jpg", bgColor: "bg-[#DDEFE0]", href: "/collections/bharat-petrol-products" },
];

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={category.href}
    className={`group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02] shadow-sm ${category.bgColor}`}
  >
    <div className="relative w-full aspect-square min-h-[120px] md:min-h-[160px] flex items-center justify-center p-4">
      <Image
        src={category.image}
        alt={category.name}
        width={160}
        height={160}
        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 120px, 160px"
      />
    </div>
    <div className="p-4 pt-2 flex flex-col justify-center min-h-[72px]">
      <h3 className="font-semibold text-primary-green text-sm md:text-base leading-tight line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
        {category.items}
      </p>
    </div>
  </Link>
);


const TopCategories = () => {
    return (
        <section className="bg-white py-12 md:py-16 font-body">
            <div className="container mx-auto px-4 md:px-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-dark-gray mb-6 md:mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                    Top Categories
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                    {categoriesData.map((category) => (
                        <CategoryCard key={category.name} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TopCategories;
