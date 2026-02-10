'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Product {
  name: string;
  coopPrice: string;
  imageUrl: string;
  href: string;
}

interface Category {
  title: string;
  products: Product[];
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&h=200&fit=crop';
const NOZZLE = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop';
const SAFETY = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop';
const LIGHT = 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200&h=200&fit=crop';

const categoriesData: Category[] = [
  {
    title: 'Fuel Dispensers / Petrol Pump Equipment',
    products: [
      { name: 'Dual Hose Fuel Dispenser Unit', coopPrice: '1,57,250', imageUrl: PLACEHOLDER, href: '/collections/fuel-dispensers' },
      { name: 'Electronic Petrol Pump Dispenser', coopPrice: '1,91,250', imageUrl: PLACEHOLDER, href: '/collections/fuel-dispensers' },
      { name: 'Compact Single Nozzle Dispenser', coopPrice: '80,750', imageUrl: PLACEHOLDER, href: '/collections/fuel-dispensers' },
    ],
  },
  {
    title: 'Petrol Pump Spare Parts',
    products: [
      { name: 'Dispenser Display Board', coopPrice: '3,825', imageUrl: PLACEHOLDER, href: '/collections/petrol-pump-spare-parts' },
      { name: 'Pump Motor Assembly', coopPrice: '10,625', imageUrl: PLACEHOLDER, href: '/collections/petrol-pump-spare-parts' },
      { name: 'Valve Assembly Kit', coopPrice: '2,720', imageUrl: NOZZLE, href: '/collections/petrol-pump-spare-parts' },
    ],
  },
  {
    title: 'Nozzles & Hoses',
    products: [
      { name: 'Auto-Cut Nozzle 3/4"', coopPrice: '1,870', imageUrl: NOZZLE, href: '/collections/nozzles-hoses' },
      { name: 'Reinforced Fuel Hose 5m', coopPrice: '1,573', imageUrl: NOZZLE, href: '/collections/nozzles-hoses' },
      { name: 'Dispenser Hose with Nozzle', coopPrice: '3,825', imageUrl: NOZZLE, href: '/collections/nozzles-hoses' },
    ],
  },
  {
    title: 'Fire & Safety Equipment',
    products: [
      { name: 'Fire Extinguisher 9kg ABC', coopPrice: '2,720', imageUrl: SAFETY, href: '/collections/fire-safety-equipment' },
      { name: 'Safety Signage Kit', coopPrice: '723', imageUrl: SAFETY, href: '/collections/fire-safety-equipment' },
      { name: 'Fire Blanket', coopPrice: '1,020', imageUrl: SAFETY, href: '/collections/fire-safety-equipment' },
    ],
  },
  {
    title: 'LED / Canopy Lighting',
    products: [
      { name: 'Canopy LED Panel 40W', coopPrice: '2,720', imageUrl: LIGHT, href: '/collections/led-canopy-lighting' },
      { name: 'Strip Light 5m', coopPrice: '1,530', imageUrl: LIGHT, href: '/collections/led-canopy-lighting' },
      { name: 'Flood Light 50W', coopPrice: '2,125', imageUrl: LIGHT, href: '/collections/led-canopy-lighting' },
    ],
  },
];

const CategoryShowcases = () => {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-14">
      <div className="container mx-auto px-4 sm:px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {categoriesData.map((category, index) => (
            <div
              key={category.title}
              className={`p-6 border-border-gray-alt ${
                index > 0 ? 'border-t' : ''
              } md:border-t-0 ${index >= 2 ? 'md:border-t' : ''} ${
                index % 2 !== 0 ? 'md:border-l' : ''
              } lg:border-t-0 ${index > 0 ? 'lg:border-l' : ''}`}
            >
              <h4 className="font-display text-lg sm:text-xl font-semibold text-dark-gray-alt mb-4 sm:mb-6 pb-2 border-b-2 border-primary-green inline-block">
                {category.title}
              </h4>
              <div className="space-y-4 sm:space-y-6">
                {category.products.map(product => (
                  <div key={product.name} className="flex items-center space-x-3 sm:space-x-4 group">
                    <Link href={product.href} className="flex-shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={70}
                        height={70}
                        className="sm:w-20 sm:h-20 rounded-md bg-white shadow-sm ring-1 ring-border-gray-alt transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link href={product.href} className="no-underline">
                        <p className="font-body text-xs sm:text-sm font-medium text-dark-gray-alt hover:text-primary-green leading-tight transition-colors line-clamp-2">
                          {product.name}
                        </p>
                      </Link>
                      <p className="text-xs sm:text-sm mt-1">
                        <span className="font-semibold text-success-green">₹{product.coopPrice}</span>
                        <span className="text-[10px] sm:text-xs text-medium-gray-alt ml-1"> for Co-Op Members*</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcases;
