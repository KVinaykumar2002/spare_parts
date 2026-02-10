/**
 * Static data for fully static storefront (no backend).
 * Products and banners – Indian Oil petrol bunk products only.
 * Images from frontend/public/products/Indian_oil_petrol_bump_products/
 */

export interface StaticCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface StaticProduct {
  _id: string;
  name: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  isFeatured?: boolean;
  category: { _id: string; name: string; slug: string };
  stock?: number;
}

export interface StaticBanner {
  _id: string;
  title?: string;
  subtitle?: string;
  image: string;
  link?: string;
  position?: string;
  order?: number;
}

const PETROL_BUNK_SLUG = 'indian-oil-petrol-bunk-products';
const PETROL_BUNK_NAME = 'Indian Oil Petrol Bunk Products';
const IMG_DIR = '/products/Indian_oil_petrol_bump_products';

// All images in Indian_oil_petrol_bump_products (0.jpg, 1.png … 27.jpg)
const PETROL_BUNK_IMAGES = [
  '0.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png',
  '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png',
  '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png',
  '24.png', '25.png', '26.png', '27.jpg',
];

function buildStaticProducts(): StaticProduct[] {
  const category = {
    _id: PETROL_BUNK_SLUG,
    name: PETROL_BUNK_NAME,
    slug: PETROL_BUNK_SLUG,
  };

  return PETROL_BUNK_IMAGES.map((filename, index) => ({
    _id: `prod-static-${index + 1}`,
    name: `Indian Oil Petrol Bunk Product ${index + 1}`,
    images: [`${IMG_DIR}/${filename}`],
    price: 5000 + (index + 1) * 500,
    compareAtPrice: index % 3 === 0 ? 6000 + (index + 1) * 500 : undefined,
    isFeatured: index % 4 === 0,
    category,
    stock: 50,
  }));
}

const staticProducts = buildStaticProducts();

export const staticCategories: StaticCategory[] = [
  {
    _id: PETROL_BUNK_SLUG,
    name: PETROL_BUNK_NAME,
    slug: PETROL_BUNK_SLUG,
  },
];

export const staticBannersHero: StaticBanner[] = [
  {
    _id: 'banner-hero-1',
    title: 'Indian Oil Petrol Bunk Products',
    subtitle: 'Shop Now',
    image: `${IMG_DIR}/0.jpg`,
    link: `/collections/${PETROL_BUNK_SLUG}`,
    position: 'hero',
    order: 1,
  },
  {
    _id: 'banner-hero-2',
    title: 'Petrol Pump Equipment & Spares',
    subtitle: 'Discover',
    image: `${IMG_DIR}/7.png`,
    link: `/collections/${PETROL_BUNK_SLUG}`,
    position: 'hero',
    order: 2,
  },
];

export const staticBannersMiddle: StaticBanner[] = [
  {
    _id: 'banner-mid-1',
    title: 'Indian Oil Petrol Bunk',
    image: `${IMG_DIR}/1.png`,
    link: `/collections/${PETROL_BUNK_SLUG}`,
    position: 'middle',
    order: 1,
  },
  {
    _id: 'banner-mid-2',
    title: 'Petrol Pump Products',
    image: `${IMG_DIR}/14.png`,
    link: `/collections/${PETROL_BUNK_SLUG}`,
    position: 'middle',
    order: 2,
  },
  {
    _id: 'banner-mid-3',
    title: 'Equipment & Spare Parts',
    image: `${IMG_DIR}/27.jpg`,
    link: `/collections/${PETROL_BUNK_SLUG}`,
    position: 'middle',
    order: 3,
  },
];

export function getStaticProducts(): StaticProduct[] {
  return [...staticProducts];
}

export function getStaticCategories(): StaticCategory[] {
  return [...staticCategories];
}

export function getStaticBanners(position?: string): StaticBanner[] {
  if (position === 'hero') return [...staticBannersHero];
  if (position === 'middle') return [...staticBannersMiddle];
  return [...staticBannersHero, ...staticBannersMiddle];
}
