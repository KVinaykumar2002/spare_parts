import express, { Response, Request } from 'express';
import Product from '../models/Product';
import Banner from '../models/Banner';
import Category from '../models/Category';

const router = express.Router();

// @route   GET /api/public/products
// @desc    Get all active products (public)
// @access  Public
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 50, category, featured, search } = req.query;

    const query: any = { isActive: true };

    if (category) {
      // Try to find category by slug first (most common), then by name
      // Use case-insensitive matching for slug and exact match for name
      const categoryDoc = await Category.findOne({ 
        $or: [
          { slug: category.toLowerCase() },
          { name: { $regex: new RegExp(`^${category}$`, 'i') } }
        ],
        isActive: true
      });
      
      if (categoryDoc) {
        // Only include products from this specific category
        query.category = categoryDoc._id;
      } else {
        // If category not found, return empty results to ensure no products are shown
        return res.json({
          success: true,
          data: {
            products: [],
            pagination: {
              page: Number(page),
              limit: Number(limit),
              total: 0,
              pages: 0,
            },
          },
        });
      }
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/public/products/:id
// @desc    Get single product (public)
// @access  Public
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/public/banners
// @desc    Get all active banners (public)
// @access  Public
router.get('/banners', async (req: Request, res: Response) => {
  try {
    const { position } = req.query;
    const query: any = { isActive: true };
    
    if (position) {
      query.position = position;
    }

    const banners = await Banner.find(query).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: banners,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/public/categories
// @desc    Get all active categories (public)
// @access  Public
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    
    res.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

