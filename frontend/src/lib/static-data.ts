/**
 * Static data for fully static storefront (no backend).
 * Products, categories, and banners in API response shape.
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

const slugToName: Record<string, string> = {
  staples: 'Staples',
  oils: 'Oils',
  seeds: 'Seeds',
  'home-essential': 'Home Essential',
  'ready-to-cook': 'Ready To Cook',
  'dals-pulses': 'Dals & Pulses',
  'dry-fruits': 'Dry Fruits',
};

// Build flat products list in API shape from category slugs and mock entries
function buildStaticProducts(): StaticProduct[] {
  const products: StaticProduct[] = [];
  let idx = 0;

  const add = (slug: string, title: string, imageUrl: string, price: number, compareAtPrice?: number, isFeatured?: boolean) => {
    const name = slugToName[slug] || slug;
    products.push({
      _id: `prod-static-${++idx}`,
      name: title,
      images: [imageUrl],
      price,
      compareAtPrice,
      isFeatured: isFeatured ?? false,
      category: { _id: slug, name, slug },
      stock: 50,
    });
  };

  // Staples (price = original, compareAtPrice = deal price for "Deals of the day")
  add('staples', 'Organic Brown Rice', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', 95, 85, true);
  add('staples', 'Organic Whole Wheat Flour', 'https://images.unsplash.com/photo-1584270354949-c26d0c844b95?w=500&h=500&fit=crop', 48, 42, true);
  add('staples', 'Organic Basmati Rice', 'https://images.unsplash.com/photo-1603899122634-f86a96e84af2?w=500&h=500&fit=crop', 95, 110);
  add('staples', 'Organic Toor Dal', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', 105, 120);
  add('staples', 'Organic Rajmudi Rice', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', 152);

  // Oils
  add('oils', 'Cold Pressed Groundnut Oil', 'https://images.unsplash.com/photo-1615367423057-2fa3e65e5a0e?w=500&h=500&fit=crop', 165, 185, true);
  add('oils', 'Cold Pressed Sesame Oil', 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop', 175);
  add('oils', 'Cold Pressed Coconut Oil', 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=500&h=500&fit=crop', 195);
  add('oils', 'Cold Pressed Sunflower Oil', 'https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=500&h=500&fit=crop', 155);

  // Seeds
  add('seeds', 'Organic Flax Seeds', 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop', 270);
  add('seeds', 'Organic Sunflower Seeds', 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop', 290);
  add('seeds', 'Organic Chia Seeds', 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop', 350, 380, true);
  add('seeds', 'Organic Pumpkin Seeds', 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop', 390);

  // Home Essential
  add('home-essential', 'Organic Jaggery Powder', 'https://images.unsplash.com/photo-1603899122634-2f24c0b15c20?w=500&h=500&fit=crop', 95);
  add('home-essential', 'Organic Rock Salt', 'https://images.unsplash.com/photo-1584270354949-1f71a9a4aa13?w=500&h=500&fit=crop', 62);
  add('home-essential', 'Organic Turmeric Powder', 'https://images.unsplash.com/photo-1603899122634-2f24c0b15c20?w=500&h=500&fit=crop', 290);
  add('home-essential', 'Organic Red Chilli Powder', 'https://images.unsplash.com/photo-1584270354949-1f71a9a4aa13?w=500&h=500&fit=crop', 270);

  // Ready to cook
  add('ready-to-cook', 'Multi Millet Dosa Mix', 'https://images.unsplash.com/photo-1630383249896-56c33cdab5c9?w=500&h=500&fit=crop', 130);
  add('ready-to-cook', 'Ragi Idli Mix', 'https://images.unsplash.com/photo-1576406662615-2f2b8f4d6a5c?w=500&h=500&fit=crop', 125);
  add('ready-to-cook', 'Organic Upma Mix', 'https://images.unsplash.com/photo-1630383249896-56c33cdab5c9?w=500&h=500&fit=crop', 135);
  add('ready-to-cook', 'Organic Poha Mix', 'https://images.unsplash.com/photo-1576406662615-2f2b8f4d6a5c?w=500&h=500&fit=crop', 120);

  // Dals & Pulses
  add('dals-pulses', 'Organic Tur/Toor Dal', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', 350);
  add('dals-pulses', 'Organic Moong Dal', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', 162);

  // Dry Fruits
  add('dry-fruits', 'Organic Groundnuts', 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop', 185);

  return products;
}

const staticProducts = buildStaticProducts();

export const staticCategories: StaticCategory[] = Object.entries(slugToName).map(([slug, name], i) => ({
  _id: `cat-${i + 1}`,
  name,
  slug,
}));

export const staticBannersHero: StaticBanner[] = [
  {
    _id: 'banner-hero-1',
    title: 'Organic Staples',
    subtitle: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=600&fit=crop',
    link: '/collections/staples',
    position: 'hero',
    order: 1,
  },
  {
    _id: 'banner-hero-2',
    title: 'Cold Pressed Oils',
    subtitle: 'Discover',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1920&h=600&fit=crop',
    link: '/collections/oils',
    position: 'hero',
    order: 2,
  },
];

export const staticBannersMiddle: StaticBanner[] = [
  {
    _id: 'banner-mid-1',
    title: 'Staples',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
    link: '/collections/staples',
    position: 'middle',
    order: 1,
  },
  {
    _id: 'banner-mid-2',
    title: 'Oils & Seeds',
    image: 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=600&h=400&fit=crop',
    link: '/collections/oils',
    position: 'middle',
    order: 2,
  },
  {
    _id: 'banner-mid-3',
    title: 'Ready to Cook',
    image: 'https://images.unsplash.com/photo-1630383249896-56c33cdab5c9?w=600&h=400&fit=crop',
    link: '/collections/ready-to-cook',
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
