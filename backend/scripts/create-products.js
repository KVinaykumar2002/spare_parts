const mongoose = require('mongoose');
require('dotenv').config();

// Define schemas inline
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, trim: true },
  image: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: { type: [String], default: [] },
  stock: { type: Number, required: true, min: 0, default: 0 },
  sku: { type: String, unique: true, sparse: true },
  tags: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Category name mapping from frontend to database
const categoryMapping = {
  'Staples': 'Staples',
  'Cold Pressed Oils': 'Oils',
  'Home Essentials': 'Home Essential',
  'Millets': 'Millets',
};

// Popular Products from home page
const popularProducts = [
  { name: 'Organic Rajmudi Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 152.00, compareAtPrice: null, category: 'Staples', variants: ['1kg'], stock: 100, tags: ['organic', 'rice'] },
  { name: 'Organic Tur/Toor Dal', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', price: 182.00, compareAtPrice: null, category: 'Staples', variants: ['500g'], stock: 100, tags: ['organic', 'dal', 'pulses'] },
  { name: 'Cold Pressed - Groundnut Oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop', price: 494.00, compareAtPrice: null, category: 'Cold Pressed Oils', variants: ['1L'], stock: 100, tags: ['organic', 'oil', 'cold-pressed'] },
  { name: 'Organic Groundnuts', image: 'https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop', price: 185.00, compareAtPrice: null, category: 'Staples', variants: ['500g'], stock: 100, tags: ['organic', 'nuts'] },
  { name: 'Organic Moong Dal', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', price: 162.00, compareAtPrice: null, category: 'Staples', variants: ['500g'], stock: 100, tags: ['organic', 'dal'] },
  { name: 'Cold Pressed - Coconut Oil', image: 'https://images.unsplash.com/photo-1606914469633-bd39206ea739?w=500&h=500&fit=crop', price: 110.00, compareAtPrice: null, category: 'Cold Pressed Oils', variants: ['200ml'], stock: 100, tags: ['organic', 'oil', 'coconut'] },
  { name: 'Organic Green Gram', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', price: 182.00, compareAtPrice: null, category: 'Staples', variants: ['500g'], stock: 100, tags: ['organic', 'pulses'] },
  { name: 'Organic Jaggery Powder', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&h=500&fit=crop', price: 95.00, compareAtPrice: null, category: 'Staples', variants: ['1kg'], stock: 100, tags: ['organic', 'sweetener'] },
  { name: 'Organic Kabuli Chana', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', price: 85.00, compareAtPrice: null, category: 'Staples', variants: ['500g'], stock: 100, tags: ['organic', 'chana'] },
  { name: 'Organic Ragi Flour', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 260.00, compareAtPrice: null, category: 'Staples', variants: ['1kg'], stock: 100, tags: ['organic', 'flour', 'millet'] },
  { name: 'Multi Millet Dosa Mix', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 295.00, compareAtPrice: null, category: 'Staples', variants: ['500g'], stock: 100, tags: ['organic', 'millet', 'ready-to-cook'] },
  { name: 'Cold Pressed- Safflower Oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop', price: 494.00, compareAtPrice: null, category: 'Cold Pressed Oils', variants: ['1L'], stock: 100, tags: ['organic', 'oil', 'safflower'] },
  { name: 'Sunflower Oil - Cold Pressed', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop', price: 455.00, compareAtPrice: null, category: 'Cold Pressed Oils', variants: ['1L'], stock: 100, tags: ['organic', 'oil', 'sunflower'] },
  { name: 'Herbal Tooth Powder', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c1c?w=500&h=500&fit=crop', price: 120.00, compareAtPrice: null, category: 'Home Essentials', variants: ['100g'], stock: 100, tags: ['herbal', 'personal-care'] },
  { name: 'Champa Agarbatti - 12pcs', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c1c?w=500&h=500&fit=crop', price: 50.00, compareAtPrice: null, category: 'Home Essentials', variants: ['12 Pcs'], stock: 100, tags: ['incense', 'home-essential'] },
  { name: 'Chilli Powder', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop', price: 265.00, compareAtPrice: null, category: 'Staples', variants: ['100g'], stock: 100, tags: ['spice', 'masala'] },
];

// Deals of the Day products
const dealProducts = [
  { name: 'Organic Foxtail Millet (Navane)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 125.00, compareAtPrice: 110.00, category: 'Millets', variants: ['500g'], stock: 100, tags: ['organic', 'millet', 'deal'] },
  { name: 'Organic Little Millet (Saame)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 130.00, compareAtPrice: 108.00, category: 'Millets', variants: ['500g'], stock: 100, tags: ['organic', 'millet', 'deal'] },
  { name: 'Organic Finger Millet (Ragi)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 135.00, compareAtPrice: 115.00, category: 'Millets', variants: ['1kg'], stock: 120, tags: ['organic', 'millet', 'ragi', 'deal'] },
  { name: 'Organic Kodo Millet (Harka)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 140.00, compareAtPrice: 112.00, category: 'Millets', variants: ['500g'], stock: 100, tags: ['organic', 'millet', 'deal'] },
  { name: 'Organic Barnyard Millet (Udala)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop', price: 160.00, compareAtPrice: 146.00, category: 'Millets', variants: ['500g'], stock: 100, tags: ['organic', 'millet', 'deal'] },
];

const allProducts = [...popularProducts, ...dealProducts];

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const createProducts = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eversol';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Get all categories
    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    let createdCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const productData of allProducts) {
      try {
        // Map category name
        const dbCategoryName = categoryMapping[productData.category] || productData.category;
        const categoryId = categoryMap[dbCategoryName];

        if (!categoryId) {
          console.error(`❌ Category "${dbCategoryName}" not found for product "${productData.name}"`);
          errorCount++;
          continue;
        }

        // Check if product already exists
        const slug = generateSlug(productData.name);
        const existingProduct = await Product.findOne({ 
          $or: [
            { name: productData.name },
            { slug: slug }
          ]
        });

        if (existingProduct) {
          console.log(`⏭️  Product "${productData.name}" already exists, skipping...`);
          skippedCount++;
          continue;
        }

        // Create product
        await Product.create({
          name: productData.name,
          slug: slug,
          description: `${productData.name} - Premium quality organic product. Available in ${productData.variants.join(', ')}.`,
          price: productData.price,
          compareAtPrice: productData.compareAtPrice,
          category: categoryId,
          images: [productData.image],
          stock: productData.stock,
          sku: `SKU-${productData.name.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}`,
          tags: productData.tags,
          isActive: true,
          isFeatured: productData.tags.includes('deal') || false,
        });

        console.log(`✅ Created product: ${productData.name}`);
        createdCount++;
      } catch (error) {
        console.error(`❌ Error creating product "${productData.name}":`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Created: ${createdCount} products`);
    console.log(`⏭️  Skipped: ${skippedCount} products (already exist)`);
    console.log(`❌ Errors: ${errorCount} products`);
    console.log(`📦 Total: ${allProducts.length} products`);
    console.log(`   - Popular products: ${popularProducts.length}`);
    console.log(`   - Deal products: ${dealProducts.length}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating products:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createProducts();

