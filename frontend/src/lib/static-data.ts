/**
 * Static data for fully static storefront (no backend).
 * Products and banners – Indian Oil, Hindustan Oil, Bharat Petrol, Other Products.
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
  '17.IOCL COT.jpg', '18.IOCL-Indian-Oil-CA-Uniform-Set-PantTshirtCap-Premium-Quality.webp',
  '19.IOCL-Uniform-1 F- SHIRT.webp', '21.IOCL LADIES UNIFORM SET.webp', '24.IOCL FLAGS.png',
  '25.IOCL ID CARD.webp', '26.0CASH BAGS.jpg', '26.2IOCL-New-Marshal-Coat.jpg',
  '26.3IOCL-UNiform-Cap.webp', '26.IOCL BELT.jpg', '27.OPW 11BDP NOZZLE.jpg',
];

// Hindustan Oil (folder: Hindhustan_oil_products)
const HINDUSTAN_SLUG = 'hindustan-oil-products';
const HINDUSTAN_NAME = 'Hindustan Oil Products';
const HINDUSTAN_DIR = '/products/Hindhustan_oil_products';
const HINDUSTAN_IMAGES = [
  '9.HPCL GENTS& LADIES UNIFORM.webp', '10.HPCL-Ladies-Uniform.jpg', '11. HPCL T SHIRT.webp',
  '14.HPCL-Hindustan-Petroleum-CA-Uniform-Set-PantTshirtCap-Premium-Quality.webp',
  '15.0 hpclcap-2.webp', '15.1 HPCL-COAT.jpg', '15.2hpclflags.webp', '15.3 HPCLIDCARD-2.webp',
  '15.HPCL_banner_for_website_2000x.webp',
];

// Bharat Petrol
const BHARAT_SLUG = 'bharat-petrol-products';
const BHARAT_NAME = 'Bharat Petrol Products';
const BHARAT_DIR = '/products/Bharat_petrol_products';
const BHARAT_IMAGES = [
  '1.bpcl formal shirt.jpg', '2.bpcl formal shirt.jpg', '3.bpcl full dress.jpg',
  '4.bpcl t-shirt.jpg', '5.bpcl t-shirt.jpg', '7.BPCL-Cap.webp',
  '8.2 bharat-petroleum-petrol-pump-id-card-500x500.webp', '8.BPCL MANAGER  F- SHIRT.jpg',
];

// Other Products
const OTHER_SLUG = 'other-products';
const OTHER_NAME = 'Other Products';
const OTHER_DIR = '/products/other products';
const OTHER_IMAGES = [
  '28.OPW 11AP NOZZLE.jpg', '29.opw-nozzles-.jpg', '30.1-inches-diesel NOZZLE.jpg',
  '31.NOZZLE COVER.png', '32.HOSEPIPES.jpg', '36.DENSITY METERS.jpg', '37.THERMO METERS.png',
  '38. WATER FINDING PASTE.jpg', '39.ETHANOL PASTE.jpg', '40.OIL FINDING PASTE.jpg',
  '41.1 5 LTR GLASS JAR.jpg', '41.Oil-Measure-Brass-Container-for-Petrol-Pump (1).webp',
  '42.FILTER PAPERS WT MAN-2.jpg', '43..PRINTING PAPER ROLLS.jpg', '43.1 PAPER ROLLS (1).jpg',
  '44.Q LINE BAR GATE.jpg', '45.SAFTY BAR CONES.jpg', '48.1FIRST AID BOX.jpg',
  '48.Alluminium-GVR-SAFETY-BREAKAWAY-COUPLING-Size-34-inch.jpg', '49.1 OPW BREAK WAY.jpg',
  '49.1 OPW SWIVEL JOINTS.jpeg', '49.2 TATSUNO SWIVEL JOINTS (3).jpg',
  '49.3 24 T SWIVEL JOINTS.jpg', '49.4 STEEL COTTED BRASS SWIVEL JOINT.jpg', '49.SWIVEL JOINT.png',
  '50.1-inches-nozzle-spout-.jpg', '51.2 CAMLOCK.jpg', '51.3CAMLOCK.jpg',
  '51.camlock-coupling-500x500-1.jpg', '52.2ANGLUR CHECK VALUE.jpg', '54.DUSTBIN.jpg',
  '56.safetyhelmet.jpg', '57.ELECTRICAL RUBBER MAT 2X1.jpg', '58.EARTH CLAMP SET.jpg',
  '59.1 HOSE GAURD.jpg', '59.HOSE GUARD.jpg', '60.GLASS SWIVEL JOINTS.jpg',
  '61.CRESTAL VAPER VENT.jpg', '62.SAMPLE TIN.png', '63.GVR KEYPAD ST.jpg',
  '64.MOTOR CLATCH.png', '65.HOSE PIPE.png', '66.BOARDS.jpg', '67.CASH BAGS.jpg',
  '68.KEY PADS ST.jpg', '69.PUMP COVER.jpg', '70. CVT.jpg', '71. 5KV STABLIZER.jpeg',
  '72.PUMP DOOR LOCKS.jpg', '73.SHARE VALUE LOCKS.jpg', '75.CR.2450N BATTERY.jpg',
  'STP-PMA-Gasket.jpg',
];

function formatProductName(filename: string): string {
  // Remove extension
  let name = filename.replace(/\.[^/.]+$/, "");
  // Remove leading numbers and dots (e.g., "17.IOCL" -> "IOCL")
  name = name.replace(/^\d+[.\-\s]*/, "");
  // Replace hyphens and underscores with spaces
  name = name.replace(/[-_]+/g, " ");
  // Trim and Title Case
  return name.trim();
}

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
    name: formatProductName(filename),
    images: [imgDir + (imgDir.endsWith('/') ? '' : '/') + filename],
    price: 0,
    compareAtPrice: undefined,
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

  const other = buildProductsForCategory(
    OTHER_SLUG,
    OTHER_NAME,
    OTHER_DIR,
    OTHER_IMAGES,
    'Petrol Pump Product',
    3500,
    idOffset
  );

  return [...indian, ...hindustan, ...bharat, ...other];
}

const staticProducts = buildStaticProducts();

export const staticCategories: StaticCategory[] = [
  { _id: INDIAN_OIL_SLUG, name: INDIAN_OIL_NAME, slug: INDIAN_OIL_SLUG },
  { _id: HINDUSTAN_SLUG, name: HINDUSTAN_NAME, slug: HINDUSTAN_SLUG },
  { _id: BHARAT_SLUG, name: BHARAT_NAME, slug: BHARAT_SLUG },
  { _id: OTHER_SLUG, name: OTHER_NAME, slug: OTHER_SLUG },
];

const HERO_IMAGES_DIR = '/hero_images';

export const staticBannersHero: StaticBanner[] = [

  { _id: 'banner-hero-3', title: 'Anandh Bunk Stores', subtitle: 'Visit Us', image: `${HERO_IMAGES_DIR}/3.png`, link: '/', position: 'hero', order: 1 },
  { _id: 'banner-hero-4', title: 'Anandh Bunk Stores', subtitle: 'Shop Now', image: `${HERO_IMAGES_DIR}/4.png`, link: '/', position: 'hero', order: 2 },
];

export const staticBannersMiddle: StaticBanner[] = [
  { _id: 'banner-mid-1', title: INDIAN_OIL_NAME, image: `${INDIAN_OIL_DIR}/18.IOCL-Indian-Oil-CA-Uniform-Set-PantTshirtCap-Premium-Quality.webp`, link: `/collections/${INDIAN_OIL_SLUG}`, position: 'middle', order: 1 },
  { _id: 'banner-mid-2', title: HINDUSTAN_NAME, image: `${HINDUSTAN_DIR}/15.HPCL_banner_for_website_2000x.webp`, link: `/collections/${HINDUSTAN_SLUG}`, position: 'middle', order: 2 },
  { _id: 'banner-mid-3', title: BHARAT_NAME, image: `${BHARAT_DIR}/7.BPCL-Cap.webp`, link: `/collections/${BHARAT_SLUG}`, position: 'middle', order: 3 },
  { _id: 'banner-mid-4', title: OTHER_NAME, image: `${OTHER_DIR}/49.SWIVEL JOINT.png`, link: `/collections/${OTHER_SLUG}`, position: 'middle', order: 4 },
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
