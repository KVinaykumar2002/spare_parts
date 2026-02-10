"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import { addToCart } from "@/lib/cart-functionality";
import { publicApi } from '@/lib/api';

type PageProps = {
  params: Promise<{ category: string }>;
};

// Category slug to category name mapping
const categorySlugToName: Record<string, string> = {
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

// Mock products data - fallback if API fails
const mockProductsByCategory: Record<string, any[]> = {
  'fuel-dispensers': [
    { id: 'fd-1', title: 'Dual Hose Fuel Dispenser Unit', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v1', name: 'Unit', price: 185000, coopPrice: 157250, stock: 50 }] },
  ],
  'petrol-pump-spare-parts': [{ id: 's-1', title: 'Dispenser Display Board', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v2', name: 'Unit', price: 4500, coopPrice: 3825, stock: 50 }] }],
  'petrol-pump-accessories': [{ id: 'a-1', title: 'Nozzle Holder Bracket', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v3', name: 'Unit', price: 850, coopPrice: 723, stock: 50 }] }],
  'fuel-system-spare-parts': [{ id: 'fs-1', title: 'Submersible Pump Unit', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v4', name: 'Unit', price: 28500, coopPrice: 24225, stock: 50 }] }],
  'nozzles-hoses': [{ id: 'n-1', title: 'Auto-Cut Nozzle 3/4"', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v5', name: 'Unit', price: 2200, coopPrice: 1870, stock: 50 }] }],
  'mpd-fuel-metering-accessories': [{ id: 'm-1', title: 'MPD Sensor Unit', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v6', name: 'Unit', price: 8500, coopPrice: 7225, stock: 50 }] }],
  'fire-safety-equipment': [{ id: 'f-1', title: 'Fire Extinguisher 9kg ABC', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v7', name: 'Unit', price: 3200, coopPrice: 2720, stock: 50 }] }],
  'uniforms': [{ id: 'u-1', title: 'Staff Shirt - Petrol Pump', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v8', name: 'Unit', price: 650, coopPrice: 553, stock: 50 }] }],
  'testing-measurement-equipment': [{ id: 't-1', title: 'Fuel Density Meter', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v9', name: 'Unit', price: 8500, coopPrice: 7225, stock: 50 }] }],
  'queue-management-systems': [{ id: 'q-1', title: 'Token Display Unit', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v10', name: 'Unit', price: 9500, coopPrice: 8075, stock: 50 }] }],
  'led-canopy-lighting': [{ id: 'l-1', title: 'Canopy LED Panel 40W', imageUrl: PLACEHOLDER_IMG, variants: [{ id: 'v11', name: 'Unit', price: 3200, coopPrice: 2720, stock: 50 }] }],
};

// Category header images
const categoryImages: Record<string, string> = {
  'fuel-dispensers': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=400&fit=crop',
  'petrol-pump-spare-parts': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
  'petrol-pump-accessories': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop',
  'fuel-system-spare-parts': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=400&fit=crop',
  'nozzles-hoses': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop',
  'mpd-fuel-metering-accessories': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
  'fire-safety-equipment': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
  'uniforms': 'https://images.unsplash.com/photo-1558769132-cb1aeaede002?w=400&h=400&fit=crop',
  'testing-measurement-equipment': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
  'queue-management-systems': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
  'led-canopy-lighting': 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop',
};

export default function CategoryPage({ params }: PageProps) {
  const [category, setCategory] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [categoryImage, setCategoryImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        const { category: cat } = await params;
        setCategory(cat);
        
        // Get category name from mapping or format from slug
        const mappedName = categorySlugToName[cat];
        const formattedName = mappedName || cat
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setCategoryName(formattedName);
        
        // Get category image
        const img = categoryImages[cat] || "";
        setCategoryImage(img);

        // Fetch products from API filtered by category
        try {
          // Try both slug and name to ensure we find the category
          const categoryQuery = cat; // Use the slug from URL
          const response = await publicApi.products.getAll({ 
            category: categoryQuery, // API will match by slug or name
            limit: 100 
          });

          if (response.success && response.data && typeof response.data === 'object' && 'products' in response.data) {
            const productsData = (response.data as any).products;
            
            // Backend already filters by category ID, so all products should be from this category
            // But we add a safety check to ensure category matches
            const expectedCategoryName = mappedName || formattedName;
            const expectedCategorySlug = cat.toLowerCase();
            
            // Transform API products to component format
            // Backend already filtered, but we verify category matches as safety check
            const transformedProducts = productsData
              .filter((p: any) => {
                // Safety check: ensure product has category and it matches
                if (!p.category) return false;
                
                const productCategory = p.category;
                const productCategoryName = productCategory.name || '';
                const productCategorySlug = (productCategory.slug || '').toLowerCase();
                
                // Match by name or slug (case-insensitive)
                const nameMatch = productCategoryName.toLowerCase() === expectedCategoryName.toLowerCase();
                const slugMatch = productCategorySlug === expectedCategorySlug;
                
                return nameMatch || slugMatch;
              })
              .map((p: any, index: number) => ({
                id: p._id || `prod-${index}`,
                title: p.name,
                imageUrl: p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
                variants: [
                  {
                    id: `var-${p._id || index}-default`,
                    name: '500g', // Default variant, can be enhanced later
                    price: p.price,
                    coopPrice: p.price * 0.85, // Calculate 15% discount for co-op members
                    stock: p.stock || 0,
                  }
                ],
              }));
            
            setProducts(transformedProducts);
          } else {
            // No products found or API error
            setProducts([]);
          }
        } catch (apiError) {
          console.error('API error fetching category products:', apiError);
          // On error, show empty state (don't use fallback mock data)
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [params]);

  const handleAddToCart = async (variantId: string, quantity: number) => {
    // Find the product that contains this variant
    const product = products.find(p => 
      p.variants.some((v: any) => v.id === variantId)
    );
    
    if (product) {
      const result = await addToCart(product.id, variantId, quantity);
      if (result.success) {
        // Show success notification
        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: { message: 'Item(s) successfully added to the cart', type: 'success' },
          })
        );
      } else {
        // Show error notification
        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: { message: result.message, type: 'error' },
          })
        );
      }
    }
  };

  return (
    <div className="bg-white font-body" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center text-primary-green font-semibold mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Back to Home
            </Link>

            <div className="text-center mb-8 sm:mb-12">
              {categoryImage ? (
                <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-light-green mb-4 sm:mb-6 overflow-hidden">
                  <Image
                    src={categoryImage}
                    alt={categoryName}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-light-green mb-4 sm:mb-6">
                  <Package className="w-10 h-10 sm:w-12 sm:h-12 text-primary-green" />
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-2 sm:mb-4">
                {categoryName}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-medium-gray px-4">
                Explore our organic {categoryName.toLowerCase()} collection
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-200 rounded-lg aspect-square" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 bg-light-gray rounded-lg text-center">
                <p className="text-medium-gray mb-6">
                  Products in this category are being updated. Please check back soon or browse our other collections.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-8 py-3 rounded-md transition-colors"
                  >
                    Browse All Products
                  </Link>
                  <a
                    href="tel:+919590922000"
                    className="inline-block bg-white text-primary-green border-2 border-primary-green hover:bg-light-green text-sm font-semibold px-8 py-3 rounded-md transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
