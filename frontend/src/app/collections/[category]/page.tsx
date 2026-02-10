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

const PETROL_BUNK_IMG = '/products/Indian_oil_petrol_bump_products/0.jpg';

// Category slug to category name mapping (Indian Oil petrol bunk only)
const categorySlugToName: Record<string, string> = {
  'indian-oil-petrol-bunk-products': 'Indian Oil Petrol Bunk Products',
  'all': 'All Products',
};

const PLACEHOLDER_IMG = PETROL_BUNK_IMG;

// Mock products data - fallback if API fails
const mockProductsByCategory: Record<string, any[]> = {
  'indian-oil-petrol-bunk-products': [
    {
      id: 'pb-1',
      title: 'Indian Oil Petrol Bunk Product 1',
      imageUrl: PETROL_BUNK_IMG,
      variants: [1, 2, 3, 4, 5, 6, 7].map((qty) => ({
        id: `v1-${qty}`,
        name: String(qty),
        price: 5500 * qty,
        coopPrice: Math.round(5500 * qty * 0.85),
        stock: 50,
      })),
    },
  ],
};

// Category header images (local petrol bunk images)
const categoryImages: Record<string, string> = {
  'indian-oil-petrol-bunk-products': '/products/Indian_oil_petrol_bump_products/7.png',
  'all': '/products/Indian_oil_petrol_bump_products/0.jpg',
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

        // Fetch products from API (no filter when slug is "all")
        try {
          const categoryQuery = cat === 'all' ? undefined : cat;
          const response = await publicApi.products.getAll({ 
            ...(categoryQuery ? { category: categoryQuery } : {}),
            limit: 100 
          });

          if (response.success && response.data && typeof response.data === 'object' && 'products' in response.data) {
            const productsData = (response.data as any).products;
            
            // Backend already filters by category ID, so all products should be from this category
            // But we add a safety check to ensure category matches
            const expectedCategoryName = mappedName || formattedName;
            const expectedCategorySlug = cat.toLowerCase();
            
            // Transform API products to component format
            // When slug is "all", show all products; otherwise filter by category
            const transformedProducts = productsData
              .filter((p: any) => {
                if (expectedCategorySlug === 'all') return true;
                if (!p.category) return false;
                const productCategory = p.category;
                const productCategoryName = productCategory.name || '';
                const productCategorySlug = (productCategory.slug || '').toLowerCase();
                const nameMatch = productCategoryName.toLowerCase() === expectedCategoryName.toLowerCase();
                const slugMatch = productCategorySlug === expectedCategorySlug;
                return nameMatch || slugMatch;
              })
              .map((p: any, index: number) => ({
                id: p._id || `prod-${index}`,
                title: p.name,
                imageUrl: p.images && p.images.length > 0 ? p.images[0] : PETROL_BUNK_IMG,
                variants: [1, 2, 3, 4, 5, 6, 7].map((qty) => ({
                  id: `var-${p._id || index}-${qty}`,
                  name: String(qty),
                  price: p.price * qty,
                  coopPrice: p.price * qty * 0.85,
                  stock: p.stock || 0,
                })),
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
