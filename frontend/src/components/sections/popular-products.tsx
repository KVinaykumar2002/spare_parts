"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { addToCartDirect, Product, ProductVariant } from '@/lib/cart-functionality';
import ProductDetailsModal from '@/components/ui/product-details-modal';
import {
  isInWishlist,
  toggleWishlist,
  getWishlistUpdateEventName,
  type WishlistItem,
} from '@/lib/wishlist-functionality';
import { getWhatsAppProductUrl } from '@/lib/whatsapp-product';
import ImagePreviewModal from '@/components/ui/image-preview-modal';
import { publicApi } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  coOpPrice: number;
  category: string;
  variants: string[];
}

// Category mapping from API category name to display name
const categoryMapping: Record<string, string> = {
  'Indian Oil Petrol Bunk Products': 'Indian Oil',
  'Hindustan Oil Products': 'Hindustan Oil',
  'Bharat Petrol Products': 'Bharat Petrol',
};

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(`prod-${product.id}`));
  }, [product.id]);

  useEffect(() => {
    const eventName = getWishlistUpdateEventName();
    const handleUpdate = () => {
      setIsWishlisted(isInWishlist(`prod-${product.id}`));
    };
    window.addEventListener(eventName, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(eventName, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [product.id]);

  const handleWishlistToggle = () => {
    const wishlistItem: WishlistItem = {
      id: `prod-${product.id}`,
      productId: `prod-${product.id}`,
      title: product.name,
      imageUrl: product.image,
      variantId: `var-${product.id}-${selectedVariant}`,
      variantName: selectedVariant,
      price: product.price,
      coopPrice: product.coOpPrice,
    };
    toggleWishlist(wishlistItem);
  };

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  // Convert product to modal format
  const getModalProduct = () => {
    const productId = `prod-${product.id}`;
    
    // Extract coop price - handle both number and string formats
    const coopPrice = typeof product.coOpPrice === 'number' 
      ? product.coOpPrice 
      : parseFloat(product.coOpPrice.toString().match(/[\d.]+/)?.[0] || '0') || product.price * 0.85;

    return {
      id: productId,
      title: product.name,
      imageUrl: product.image,
      variants: product.variants.map((variant) => ({
        id: `var-${product.id}-${variant}`,
        name: variant,
        price: product.price,
        coopPrice: coopPrice,
        stock: 100,
      })),
    };
  };

  return (
    <Card className="relative group overflow-hidden rounded-lg border-border-gray-alt hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div
          className="relative aspect-square bg-white p-4 cursor-pointer"
          onClick={() => setIsImagePreviewOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsImagePreviewOpen(true)}
          aria-label={`View larger image of ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={220}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 text-gray-400 hover:text-red-alert hover:bg-white focus:ring-0"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? 'text-red-alert fill-red-alert' : ''
              }`}
            />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-sm font-medium text-dark-gray-alt h-10 line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-1">
            <h5 className="text-lg font-semibold text-dark-gray-alt">₹{product.price.toFixed(2)}</h5>
            {product.originalPrice && (
              <span className="text-sm text-medium-gray line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-green-700 mb-4 h-8">
            ₹{product.coOpPrice.toFixed(2)} for Co-Op Members*
          </p>
          <div className="flex items-center gap-2 mt-auto">
            <Select defaultValue={product.variants[0]} onValueChange={setSelectedVariant}>
              <SelectTrigger className="w-[100px] h-9 text-xs focus:ring-ring focus:ring-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant} value={variant} className="text-xs">
                    {variant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleAddToCart}
              className="flex-grow h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold"
            >
              Add
            </Button>
            <a
              href={getWhatsAppProductUrl({
                productName: product.name,
                variantName: selectedVariant,
                price: product.price,
                coopPrice: product.coOpPrice,
                imageUrl: product.image?.startsWith("http") ? product.image : undefined,
              })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                const url = getWhatsAppProductUrl({
                  productName: product.name,
                  variantName: selectedVariant,
                  price: product.price,
                  coopPrice: product.coOpPrice,
                  imageUrl: product.image,
                  baseUrl: window.location.origin,
                });
                window.open(url, "_blank", "noopener,noreferrer");
              }}
              className="h-9 w-9 flex items-center justify-center rounded-md bg-[#25D366] hover:bg-[#20BD5A] text-white transition-colors flex-shrink-0"
              aria-label="Inquire on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </CardContent>

      <ProductDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={getModalProduct()}
      />
      <ImagePreviewModal
        open={isImagePreviewOpen}
        onOpenChange={setIsImagePreviewOpen}
        src={product.image}
        alt={product.name}
      />
    </Card>
  );
};

const ProductSkeleton = () => (
  <div className="rounded-lg border border-border-gray-alt p-4 bg-white">
    <div className="animate-pulse">
      <div className="aspect-square bg-light-gray rounded-md"></div>
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-light-gray rounded w-3/4"></div>
        <div className="h-4 bg-light-gray rounded w-1/2"></div>
        <div className="h-5 bg-light-gray rounded w-1/3"></div>
        <div className="h-3 bg-light-gray rounded w-full"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-light-gray rounded w-[100px]"></div>
          <div className="h-9 bg-light-gray rounded flex-grow"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function PopularProducts() {
  const [activeTab, setActiveTab] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All']);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await publicApi.products.getAll({ limit: 100 });
        
        if (response.success && response.data && response.data.products) {
          // Transform API products to component format
          const transformedProducts: Product[] = response.data.products.map((p: any, index: number) => ({
            id: index + 1,
            name: p.name,
            image: p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
            price: p.price,
            originalPrice: p.compareAtPrice || undefined,
            coOpPrice: p.price * 0.85, // Calculate 15% discount for co-op members
            category: categoryMapping[p.category?.name] || p.category?.name || 'Staples',
            variants: ['1', '2', '3', '4', '5', '6', '7'],
          }));

          setAllProducts(transformedProducts);
          
          // Extract unique categories
          const uniqueCategories = ['All', ...Array.from(new Set(transformedProducts.map(p => p.category)))];
          setCategories(uniqueCategories);

          // Filter by active tab
          let productsToShow;
          if (activeTab === 'All') {
            productsToShow = transformedProducts;
          } else {
            productsToShow = transformedProducts.filter(p => p.category === activeTab);
          }
          setFilteredProducts(productsToShow);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when tab changes
  useEffect(() => {
    if (allProducts.length > 0) {
      let productsToShow;
      if (activeTab === 'All') {
        productsToShow = allProducts;
      } else {
        productsToShow = allProducts.filter(p => p.category === activeTab);
      }
      setFilteredProducts(productsToShow);
    }
  }, [activeTab, allProducts]);

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container">
        <div className="flex flex-col gap-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-dark-gray-alt" style={{ fontFamily: 'var(--font-display)' }}>
              Popular Products
            </h2>
            <a
              href="/collections/all"
              className="text-primary font-semibold text-sm whitespace-nowrap rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors"
            >
              View All
            </a>
          </div>
          <div className="rounded-xl bg-stone-50/80 border border-stone-200/80 p-2">
            <div className="overflow-x-auto -mx-1 px-1">
              <ul className="flex gap-2 min-w-0 pb-1" role="tablist" aria-label="Product category filters">
                {categories.map((category) => (
                  <li key={category} role="presentation">
                    <button
                      role="tab"
                      aria-selected={activeTab === category}
                      tabIndex={activeTab === category ? 0 : -1}
                      onClick={() => setActiveTab(category)}
                      className={`
                        shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap
                        transition-all duration-200 cursor-pointer
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                        ${activeTab === category
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-stone-600 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent hover:border-stone-200'
                        }
                      `}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)
            : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}