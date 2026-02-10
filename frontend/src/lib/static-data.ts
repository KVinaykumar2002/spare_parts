/**
 * Static data for fully static storefront (no backend).
 * Products, categories, and banners in API response shape.
 * Categories: Fuel dispensers, petrol pump equipment, spare parts, etc.
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

// Slug to display name for all categories
const slugToName: Record<string, string> = {
  'fuel-dispensers': 'Fuel Dispensers / Petrol Pump Equipment',
  'petrol-pump-spare-parts': 'Petrol Pump Spare Parts',
  'petrol-pump-accessories': 'Petrol Pump Accessories',
  'fuel-system-spare-parts': 'Fuel System Spare Parts',
  'nozzles-hoses': 'Nozzles & Hoses',
  'mpd-fuel-metering-accessories': 'MPD / Fuel Metering Accessories',
  'fire-safety-equipment': 'Fire & Safety Equipment',
  'uniforms': 'Uniforms',
  'testing-measurement-equipment': 'Testing & Measurement Equipment',
  'queue-management-systems': 'Queue Management Systems',
  'led-canopy-lighting': 'LED / Canopy Lighting',
};

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=500&fit=crop';
const PUMP_IMG = 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=500&fit=crop';
const NOZZLE_IMG = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=500&fit=crop';
const SAFETY_IMG = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=500&fit=crop';
const LIGHT_IMG = 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=500&fit=crop';

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

  // Fuel Dispensers / Petrol Pump Equipment
  add('fuel-dispensers', 'Dual Hose Fuel Dispenser Unit', PLACEHOLDER_IMG, 185000, 195000, true);
  add('fuel-dispensers', 'Electronic Petrol Pump Dispenser', PUMP_IMG, 225000);
  add('fuel-dispensers', 'Compact Single Nozzle Dispenser', PLACEHOLDER_IMG, 95000);

  // Petrol Pump Spare Parts
  add('petrol-pump-spare-parts', 'Dispenser Display Board', PUMP_IMG, 4500);
  add('petrol-pump-spare-parts', 'Pump Motor Assembly', PLACEHOLDER_IMG, 12500, 11500, true);
  add('petrol-pump-spare-parts', 'Valve Assembly Kit', NOZZLE_IMG, 3200);

  // Petrol Pump Accessories
  add('petrol-pump-accessories', 'Nozzle Holder Bracket', NOZZLE_IMG, 850);
  add('petrol-pump-accessories', 'Hose Reel Assembly', PLACEHOLDER_IMG, 4200);
  add('petrol-pump-accessories', 'Key Switch for Dispenser', PUMP_IMG, 650);

  // Fuel System Spare Parts
  add('fuel-system-spare-parts', 'Submersible Pump Unit', PLACEHOLDER_IMG, 28500);
  add('fuel-system-spare-parts', 'Pipeline Valve 2"', PUMP_IMG, 3500);
  add('fuel-system-spare-parts', 'Filter Assembly Fuel Line', NOZZLE_IMG, 1800);

  // Nozzles & Hoses
  add('nozzles-hoses', 'Auto-Cut Nozzle 3/4"', NOZZLE_IMG, 2200, 2500, true);
  add('nozzles-hoses', 'Reinforced Fuel Hose 5m', PLACEHOLDER_IMG, 1850);
  add('nozzles-hoses', 'Dispenser Hose with Nozzle', NOZZLE_IMG, 4500);

  // MPD / Fuel Metering Accessories
  add('mpd-fuel-metering-accessories', 'MPD Sensor Unit', PUMP_IMG, 8500);
  add('mpd-fuel-metering-accessories', 'Pulse Generator for Meter', PLACEHOLDER_IMG, 1200);
  add('mpd-fuel-metering-accessories', 'Flow Meter Assembly', PUMP_IMG, 15000);

  // Fire & Safety Equipment
  add('fire-safety-equipment', 'Fire Extinguisher 9kg ABC', SAFETY_IMG, 3200);
  add('fire-safety-equipment', 'Safety Signage Kit', SAFETY_IMG, 850);
  add('fire-safety-equipment', 'Fire Blanket', SAFETY_IMG, 1200);

  // Uniforms
  add('uniforms', 'Staff Shirt - Petrol Pump', PLACEHOLDER_IMG, 650);
  add('uniforms', 'Safety Vest Reflective', PLACEHOLDER_IMG, 450);
  add('uniforms', 'Cap with Logo', PLACEHOLDER_IMG, 280);

  // Testing & Measurement Equipment
  add('testing-measurement-equipment', 'Fuel Density Meter', PUMP_IMG, 8500);
  add('testing-measurement-equipment', 'Calibration Kit', PLACEHOLDER_IMG, 12000);
  add('testing-measurement-equipment', 'Pressure Gauge Set', PUMP_IMG, 2200);

  // Queue Management Systems
  add('queue-management-systems', 'Token Display Unit', PLACEHOLDER_IMG, 9500);
  add('queue-management-systems', 'Queue Management Software', PLACEHOLDER_IMG, 25000);
  add('queue-management-systems', 'Customer Display Screen', PLACEHOLDER_IMG, 6500);

  // LED / Canopy Lighting
  add('led-canopy-lighting', 'Canopy LED Panel 40W', LIGHT_IMG, 3200);
  add('led-canopy-lighting', 'Strip Light 5m', LIGHT_IMG, 1800);
  add('led-canopy-lighting', 'Flood Light 50W', LIGHT_IMG, 2500, 2800, true);

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
    title: 'Fuel Dispensers & Equipment',
    subtitle: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=600&fit=crop',
    link: '/collections/fuel-dispensers',
    position: 'hero',
    order: 1,
  },
  {
    _id: 'banner-hero-2',
    title: 'Petrol Pump Spare Parts',
    subtitle: 'Discover',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&h=600&fit=crop',
    link: '/collections/petrol-pump-spare-parts',
    position: 'hero',
    order: 2,
  },
];

export const staticBannersMiddle: StaticBanner[] = [
  {
    _id: 'banner-mid-1',
    title: 'Fuel Dispensers',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop',
    link: '/collections/fuel-dispensers',
    position: 'middle',
    order: 1,
  },
  {
    _id: 'banner-mid-2',
    title: 'Nozzles & Hoses',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    link: '/collections/nozzles-hoses',
    position: 'middle',
    order: 2,
  },
  {
    _id: 'banner-mid-3',
    title: 'Fire & Safety',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
    link: '/collections/fire-safety-equipment',
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
