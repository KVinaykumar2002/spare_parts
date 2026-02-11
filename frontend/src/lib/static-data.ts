/**
 * Static data for fully static storefront (no backend).
 * Products and banners – Indian Oil, Hindustan Oil, Bharat Petrol.
 * Images from frontend/public/products/
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

// Indian Oil Petrol Bunk
const INDIAN_OIL_SLUG = 'indian-oil-petrol-bunk-products';
const INDIAN_OIL_NAME = 'Indian Oil Petrol Bunk Products';
const INDIAN_OIL_DIR = '/products/Indian_oil_petrol_bump_products';
const INDIAN_OIL_IMAGES = [
  '0.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png',
  '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png',
  '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png',
  '24.png', '25.png', '26.png', '27.jpg',
];

// Hindustan Oil (folder: Hindhustan_oil_products)
const HINDUSTAN_SLUG = 'hindustan-oil-products';
const HINDUSTAN_NAME = 'Hindustan Oil Products';
const HINDUSTAN_DIR = '/products/Hindhustan_oil_products';
const HINDUSTAN_IMAGES = [
  '0.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png',
  '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png',
  '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png', '24.jpg',
];

// Bharat Petrol
const BHARAT_SLUG = 'bharat-petrol-products';
const BHARAT_NAME = 'Bharat Petrol Products';
const BHARAT_DIR = '/products/Bharat_petrol_products';
const BHARAT_IMAGES = [
  '0.jpg', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png',
  '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png',
  '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.jpg',
];

function buildProductsForCategory(
  slug: string,
  name: string,
  imgDir: string,
  images: string[],
  productLabel: string,
  priceBase: number,
  startId: number
): StaticProduct[] {
  const category = { _id: slug, name, slug };
  return images.map((filename, index) => ({
    _id: `prod-static-${startId + index}`,
    name: `${productLabel} ${index + 1}`,
    images: [imgDir + (imgDir.endsWith('/') ? '' : '/') + filename],
    price: priceBase + (index + 1) * 500,
    compareAtPrice: index % 3 === 0 ? priceBase + (index + 1) * 500 + 500 : undefined,
    isFeatured: index % 4 === 0,
    category,
    stock: 50,
  }));
}

function buildStaticProducts(): StaticProduct[] {
  let idOffset = 0;
  const indian = buildProductsForCategory(
    INDIAN_OIL_SLUG,
    INDIAN_OIL_NAME,
    INDIAN_OIL_DIR,
    INDIAN_OIL_IMAGES,
    'Indian Oil Petrol Bunk Product',
    5000,
    (idOffset += 1) - 1
  );
  idOffset += indian.length;

  const hindustan = buildProductsForCategory(
    HINDUSTAN_SLUG,
    HINDUSTAN_NAME,
    HINDUSTAN_DIR,
    HINDUSTAN_IMAGES,
    'Hindustan Oil Product',
    4500,
    idOffset
  );
  idOffset += hindustan.length;

  const bharat = buildProductsForCategory(
    BHARAT_SLUG,
    BHARAT_NAME,
    BHARAT_DIR,
    BHARAT_IMAGES,
    'Bharat Petrol Product',
    4800,
    idOffset
  );
  idOffset += bharat.length;

  return [...indian, ...hindustan, ...bharat];
}

const staticProducts = buildStaticProducts();

export const staticCategories: StaticCategory[] = [
  { _id: INDIAN_OIL_SLUG, name: INDIAN_OIL_NAME, slug: INDIAN_OIL_SLUG },
  { _id: HINDUSTAN_SLUG, name: HINDUSTAN_NAME, slug: HINDUSTAN_SLUG },
  { _id: BHARAT_SLUG, name: BHARAT_NAME, slug: BHARAT_SLUG },
];

const HERO_IMAGES_DIR = '/hero_images';

export const staticBannersHero: StaticBanner[] = [
  { _id: 'banner-hero-1', title: INDIAN_OIL_NAME, subtitle: 'Shop Now', image: `${HERO_IMAGES_DIR}/1.png`, link: `/collections/${INDIAN_OIL_SLUG}`, position: 'hero', order: 1 },
  { _id: 'banner-hero-2', title: HINDUSTAN_NAME, subtitle: 'Discover', image: `${HERO_IMAGES_DIR}/2.png`, link: `/collections/${HINDUSTAN_SLUG}`, position: 'hero', order: 2 },
];

export const staticBannersMiddle: StaticBanner[] = [
  { _id: 'banner-mid-1', title: INDIAN_OIL_NAME, image: `${INDIAN_OIL_DIR}/7.png`, link: `/collections/${INDIAN_OIL_SLUG}`, position: 'middle', order: 1 },
  { _id: 'banner-mid-2', title: HINDUSTAN_NAME, image: `${HINDUSTAN_DIR}/7.png`, link: `/collections/${HINDUSTAN_SLUG}`, position: 'middle', order: 2 },
  { _id: 'banner-mid-3', title: BHARAT_NAME, image: `${BHARAT_DIR}/7.png`, link: `/collections/${BHARAT_SLUG}`, position: 'middle', order: 3 },
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
