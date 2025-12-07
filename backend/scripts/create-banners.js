const mongoose = require('mongoose');
require('dotenv').config();

// Define Banner schema inline
const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  image: { type: String, required: true },
  link: { type: String, trim: true },
  position: { type: String, enum: ['hero', 'top', 'middle', 'bottom'], default: 'hero' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);

// Hero carousel banners (from hero-carousel.tsx)
const heroBanners = [
  {
    title: "Become a Co-Op Member",
    subtitle: "Join Now",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/Banner_CoSo_member-3.jpg",
    link: "/pages/membership",
    position: "hero",
    order: 1,
  },
  {
    title: "Organic Paneer",
    subtitle: "Promotional banner",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/HP_Paneer_Website_Banner-_Mumbai_Zama_Organic_Size-2.jpg",
    link: "#",
    position: "hero",
    order: 2,
  },
  {
    title: "Rs. 199 Trial Offer",
    subtitle: "Co-Op membership trial",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/199_trail_banner_1-4.jpg",
    link: "/pages/membership",
    position: "hero",
    order: 3,
  },
  {
    title: "Pure Chocolate Bliss",
    subtitle: "Promotional banner",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/Untitled-1_1-5.png",
    link: "#",
    position: "hero",
    order: 4,
  },
];

// Featured banners (from featured-banners.tsx)
const featuredBanners = [
  {
    title: "Natural, chemical-free cereals to start your day the organic way",
    subtitle: "Organic Cereals",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/cereals_banner-26.jpg",
    link: "#",
    position: "middle",
    order: 1,
  },
  {
    title: "Fuel your day with premium quality dry fruits and seeds",
    subtitle: "Dry Fruits & Seeds",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/dry_fruites_banner-27.jpg",
    link: "#",
    position: "middle",
    order: 2,
  },
  {
    title: "Organic, cold pressed cooking oils to nourish your health",
    subtitle: "Cold Pressed Oils",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/Oils_banner-28.jpg",
    link: "#",
    position: "middle",
    order: 3,
  },
];

const allBanners = [...heroBanners, ...featuredBanners];

const createBanners = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eversol';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    let createdCount = 0;
    let skippedCount = 0;

    for (const bannerData of allBanners) {
      // Check if banner already exists (by title and image)
      const existingBanner = await Banner.findOne({ 
        $or: [
          { title: bannerData.title },
          { image: bannerData.image }
        ]
      });

      if (existingBanner) {
        console.log(`⏭️  Banner "${bannerData.title}" already exists, skipping...`);
        skippedCount++;
        continue;
      }

      // Create banner
      await Banner.create(bannerData);

      console.log(`✅ Created banner: ${bannerData.title}`);
      createdCount++;
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Created: ${createdCount} banners`);
    console.log(`⏭️  Skipped: ${skippedCount} banners (already exist)`);
    console.log(`📦 Total: ${allBanners.length} banners`);
    console.log(`   - Hero banners: ${heroBanners.length}`);
    console.log(`   - Featured banners: ${featuredBanners.length}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating banners:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createBanners();

