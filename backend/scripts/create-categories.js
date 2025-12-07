const mongoose = require('mongoose');
require('dotenv').config();

// Define Category schema inline
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, trim: true },
  image: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// Categories from home page and dropdown
const categoriesToCreate = [
  { name: 'Staples', description: 'Essential food staples' },
  { name: 'Oils', description: 'Edible oils and cooking oils' },
  { name: 'Seeds', description: 'Organic seeds' },
  { name: 'Home Essential', description: 'Home essential products' },
  { name: 'Ready To Cook', description: 'Ready to cook food items' },
  { name: 'Dals & Pulses', description: 'Dals and pulses' },
  { name: 'Spices & Masalas', description: 'Spices and masalas' },
  { name: 'Millets', description: 'Organic millets' },
];

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const createCategories = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eversol';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    let createdCount = 0;
    let skippedCount = 0;

    for (const categoryData of categoriesToCreate) {
      const slug = generateSlug(categoryData.name);
      
      // Check if category already exists
      const existingCategory = await Category.findOne({ 
        $or: [
          { name: categoryData.name },
          { slug: slug }
        ]
      });

      if (existingCategory) {
        console.log(`⏭️  Category "${categoryData.name}" already exists, skipping...`);
        skippedCount++;
        continue;
      }

      // Create category
      await Category.create({
        name: categoryData.name,
        slug: slug,
        description: categoryData.description,
        isActive: true,
      });

      console.log(`✅ Created category: ${categoryData.name}`);
      createdCount++;
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Created: ${createdCount} categories`);
    console.log(`⏭️  Skipped: ${skippedCount} categories (already exist)`);
    console.log(`📦 Total: ${categoriesToCreate.length} categories`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating categories:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createCategories();

