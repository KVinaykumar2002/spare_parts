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

const categoriesData: Category[] = [
  {
    title: 'Indian Oil Petrol Bunk Products',
    products: [
      { name: 'Indian Oil Petrol Bunk Product 1', coopPrice: '4,675', imageUrl: '/products/Indian_oil_petrol_bump_products/0.jpg', href: '/collections/indian-oil-petrol-bunk-products' },
      { name: 'Indian Oil Petrol Bunk Product 2', coopPrice: '5,100', imageUrl: '/products/Indian_oil_petrol_bump_products/7.png', href: '/collections/indian-oil-petrol-bunk-products' },
      { name: 'Indian Oil Petrol Bunk Product 3', coopPrice: '5,525', imageUrl: '/products/Indian_oil_petrol_bump_products/14.png', href: '/collections/indian-oil-petrol-bunk-products' },
    ],
  },
  {
    title: 'Hindustan Oil Products',
    products: [
      { name: 'Hindustan Oil Product 1', coopPrice: '3,825', imageUrl: '/products/Hindhustan_oil_products/0.jpg', href: '/collections/hindustan-oil-products' },
      { name: 'Hindustan Oil Product 2', coopPrice: '4,250', imageUrl: '/products/Hindhustan_oil_products/7.png', href: '/collections/hindustan-oil-products' },
      { name: 'Hindustan Oil Product 3', coopPrice: '4,675', imageUrl: '/products/Hindhustan_oil_products/14.png', href: '/collections/hindustan-oil-products' },
    ],
  },
  {
    title: 'Bharat Petrol Products',
    products: [
      { name: 'Bharat Petrol Product 1', coopPrice: '4,080', imageUrl: '/products/Bharat_petrol_products/0.jpg', href: '/collections/bharat-petrol-products' },
      { name: 'Bharat Petrol Product 2', coopPrice: '4,505', imageUrl: '/products/Bharat_petrol_products/7.png', href: '/collections/bharat-petrol-products' },
      { name: 'Bharat Petrol Product 3', coopPrice: '4,930', imageUrl: '/products/Bharat_petrol_products/14.png', href: '/collections/bharat-petrol-products' },
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
