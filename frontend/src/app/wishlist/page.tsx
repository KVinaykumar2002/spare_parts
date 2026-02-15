"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getWishlistItems,
  getWishlistUpdateEventName,
  removeFromWishlist,
  type WishlistItem,
} from "@/lib/wishlist-functionality";
import {
  addToCartDirect,
  type Product as CartProduct,
} from "@/lib/cart-functionality";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    productId: string;
    title: string;
  } | null>(null);

  const loadWishlist = () => {
    if (typeof window === "undefined") return;
    const wishlistItems = getWishlistItems();
    setItems(wishlistItems);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWishlist();

    const eventName = getWishlistUpdateEventName();
    window.addEventListener(eventName, loadWishlist);
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener(eventName, loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  const openConfirmDialog = (productId: string, title: string) => {
    setConfirmDialog({ productId, title });
  };

  const closeConfirmDialog = () => setConfirmDialog(null);

  const handleRemoveConfirmed = () => {
    if (!confirmDialog) return;
    const productId = confirmDialog.productId;
    setConfirmDialog(null);
    removeFromWishlist(productId);
    loadWishlist();
  };

  const handleRemove = (productId: string, title: string) => {
    openConfirmDialog(productId, title);
  };

  const handleMoveToCart = (item: WishlistItem) => {
    if (!item) return;

    const variantId = item.variantId || `${item.productId}-default`;
    const productData: CartProduct = {
      id: item.productId,
      name: item.title,
      imageUrl: item.imageUrl || "/placeholder-product.jpg",
      variants: [
        {
          id: variantId,
          name: item.variantName || "Standard",
          price: item.price ?? item.coopPrice ?? 0,
          coopPrice: item.coopPrice ?? item.price ?? 0,
          stock: 100,
        },
      ],
    };

    const result = addToCartDirect(productData, variantId, 1);

    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: {
          message: result.success
            ? result.message || "Item moved to cart."
            : result.message || "Failed to add item to cart.",
          type: result.success ? "success" : "error",
        },
      })
    );

    if (result.success) {
      removeFromWishlist(item.productId);
      loadWishlist();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base text-medium-gray">Loading wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-light-gray mb-4 sm:mb-6">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-medium-gray" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-3 sm:mb-4">Your Wishlist</h1>
            <p className="text-base sm:text-lg text-medium-gray mb-6 sm:mb-8 px-4">
              Your wishlist is currently empty. Save your favorite items to view them here.
            </p>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto touch-manipulation">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div>
              <p className="text-xs sm:text-sm text-medium-gray uppercase tracking-wide">
                Wishlist
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray">
                Saved Items ({items.length})
              </h1>
            </div>
            <Link href="/cart">
              <Button variant="outline" className="gap-2 w-full sm:w-auto touch-manipulation">
                <ShoppingCart className="h-4 w-4" />
                Go to Cart
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white border border-border-gray-alt rounded-lg p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 shadow-sm"
              >
                <div className="relative w-full sm:w-28 md:w-32 h-28 sm:h-28 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-light-gray">
                  <Image
                    src={item.imageUrl || "/placeholder-product.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-dark-gray mb-1 line-clamp-2">
                      {item.title}
                    </h2>
                    {item.variantName && (
                      <p className="text-xs sm:text-sm text-medium-gray mb-1">
                        Variant: {item.variantName}
                      </p>
                    )}
                    {item.price !== undefined && (
                      <p className="text-sm sm:text-base text-dark-gray font-medium">
                        ₹{item.price.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                    <Button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90 py-3 sm:py-2 touch-manipulation"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Move to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 py-3 sm:py-2 touch-manipulation"
                      onClick={() => handleRemove(item.productId, item.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-5 sm:p-6 w-full max-w-sm space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-dark-gray">Remove from Wishlist?</h3>
            <p className="text-sm text-medium-gray">
              Are you sure you want to remove <span className="font-semibold text-dark-gray">{confirmDialog.title}</span> from your wishlist?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-destructive text-white hover:bg-destructive/90 py-3 sm:py-2 touch-manipulation"
                onClick={handleRemoveConfirmed}
              >
                Remove
              </Button>
              <Button variant="outline" className="flex-1 py-3 sm:py-2 touch-manipulation" onClick={closeConfirmDialog}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

