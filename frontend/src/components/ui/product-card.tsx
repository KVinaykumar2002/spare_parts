'use client';

import * as React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import ProductDetailsModal from '@/components/ui/product-details-modal';
import {
  isInWishlist,
  toggleWishlist,
  getWishlistUpdateEventName,
  type WishlistItem,
} from '@/lib/wishlist-functionality';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  coopPrice: number;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  variants: ProductVariant[];
  isNew?: boolean;
}

export interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
  className?: string;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
  isWishlisted?: boolean;
  onAddToCart?: (variantId: string, quantity: number) => void;
}

const ProductCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex flex-col bg-white border border-border-gray-alt rounded-lg overflow-hidden', className)}>
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-4">
        <Skeleton className="h-5 w-4/5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-10 flex-grow" />
          <Skeleton className="h-10 w-[78px]" />
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLoading,
  className,
  isWishlisted: initialIsWishlisted = false,
  onWishlistToggle,
  onAddToCart,
}) => {
  const [selectedVariantId, setSelectedVariantId] = React.useState(product?.variants[0]?.id || '');
  const [isWishlisted, setIsWishlisted] = React.useState(initialIsWishlisted);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (product?.variants?.length && !selectedVariantId) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);

  React.useEffect(() => {
    if (product?.id && typeof window !== 'undefined') {
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product?.id]);

  React.useEffect(() => {
    if (!product?.id || typeof window === 'undefined') return;

    const eventName = getWishlistUpdateEventName();
    const handleWishlistUpdate = () => {
      setIsWishlisted(isInWishlist(product.id));
    };

    window.addEventListener(eventName, handleWishlistUpdate);
    window.addEventListener('storage', handleWishlistUpdate);

    return () => {
      window.removeEventListener(eventName, handleWishlistUpdate);
      window.removeEventListener('storage', handleWishlistUpdate);
    };
  }, [product?.id]);

  if (isLoading || !product) {
    return <ProductCardSkeleton className={className} />;
  }

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const isSoldOut = !selectedVariant || selectedVariant.stock <= 0;
  const onSale = selectedVariant && typeof selectedVariant.salePrice === 'number' && selectedVariant.salePrice < selectedVariant.price;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product) return;

    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    const wishlistPayload: WishlistItem = {
      id: product.id,
      productId: product.id,
      title: product.title,
      imageUrl: product.imageUrl,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      price: selectedVariant?.price,
      coopPrice: selectedVariant?.coopPrice,
    };
    toggleWishlist(wishlistPayload);

    if (onWishlistToggle) {
      onWishlistToggle(product.id, newWishlistState);
    }
  };

  const handleAddToCartClick = () => {
    if (product) {
      setIsModalOpen(true);
    }
  };

  const handleModalAddToCart = async (variantId: string, quantity: number) => {
    // Auth check is handled in the modal, but we can also check here
    if (onAddToCart) {
      onAddToCart(variantId, quantity);
    } else if (product) {
      // If no callback provided, use direct cart function
      const { addToCartDirect } = await import('@/lib/cart-functionality');
      const { checkAuth } = await import('@/lib/auth-utils');
      
      const user = await checkAuth();
      if (!user || user.role !== 'user') {
        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: { message: 'Please login to add items to cart', type: 'error' },
          })
        );
        if (typeof window !== 'undefined') {
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        }
        return;
      }
      
      const productData = {
        id: product.id,
        name: product.title,
        imageUrl: product.imageUrl,
        variants: product.variants.map(v => ({
          id: v.id,
          name: v.name,
          price: v.price,
          coopPrice: v.coopPrice,
          stock: v.stock,
        })),
      };
      
      const result = await addToCartDirect(productData, variantId, quantity);
      if (result.success) {
        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: { message: 'Item added to cart', type: 'success' },
          })
        );
      }
    }
  };

  return (
    <div
      className={cn(
        'relative group flex flex-col bg-card border border-border-gray-alt rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300',
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col items-start gap-1 z-10">
          {onSale && (
            <span className="bg-red-alert-alt text-white text-[9px] sm:text-[10px] font-semibold tracking-wide px-1.5 sm:px-2 py-0.5 rounded-sm">
              SALE
            </span>
          )}
          {product.isNew && (
            <span className="bg-primary text-white text-[9px] sm:text-[10px] font-semibold tracking-wide px-1.5 sm:px-2 py-0.5 rounded-sm">
              NEW
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 h-8 w-8 sm:h-9 sm:w-9 bg-white/90 rounded-full hover:bg-white text-medium-gray touch-manipulation"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('h-4 w-4 sm:h-5 sm:w-5 transition-all', isWishlisted ? 'text-destructive fill-current' : 'text-inherit')} />
        </Button>

        {isSoldOut && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-sm">
            <span className="font-semibold text-dark-gray text-base uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-3 sm:p-4 space-y-2 sm:space-y-3">
        <h3 className="font-body text-dark-gray-alt text-xs sm:text-sm font-normal line-clamp-2 min-h-[36px] sm:min-h-[45px] leading-tight">
          {product.title}
        </h3>

        <div className="flex-grow"></div>

        <div className="space-y-0.5 sm:space-y-1">
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-dark-gray font-semibold text-sm sm:text-base">
              ₹{onSale ? selectedVariant.salePrice?.toFixed(2) : selectedVariant.price.toFixed(2)}
            </span>
            {onSale && (
              <span className="text-medium-gray text-[10px] sm:text-xs line-through">
                ₹{selectedVariant.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-primary text-[10px] sm:text-xs font-normal leading-tight">
            ₹{selectedVariant.coopPrice.toFixed(2)} for Co-Op Members*
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 pt-1">
          {product.variants.length > 1 ? (
            <Select
              defaultValue={selectedVariantId}
              onValueChange={setSelectedVariantId}
              disabled={isSoldOut}
            >
              <SelectTrigger className="h-9 sm:h-10 flex-1 text-[10px] sm:text-xs focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-[4px] px-2 sm:px-3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id} className="text-xs sm:text-sm">
                    {variant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="h-9 sm:h-10 flex-1 border border-input rounded-[4px] flex items-center justify-center text-[10px] sm:text-xs text-muted-foreground bg-secondary/50 px-2 sm:px-3 truncate">
                {product.variants[0]?.name}
            </div>
          )}
          <Button
            className="h-9 sm:h-10 min-w-[60px] sm:min-w-[78px] bg-primary hover:bg-[#0A3D31] text-primary-foreground font-semibold text-xs sm:text-sm leading-none rounded-[4px] transition-colors px-2 sm:px-3"
            disabled={isSoldOut}
            onClick={handleAddToCartClick}
          >
            Add
          </Button>
        </div>
      </div>

      {product && (
        <ProductDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          product={product}
          onAddToCart={handleModalAddToCart}
        />
      )}
    </div>
  );
};

export default ProductCard;