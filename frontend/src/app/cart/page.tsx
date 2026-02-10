"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  getCartState, 
  updateQuantity, 
  removeFromCart,
  getCartUpdateEventName,
  type Cart,
  type CartItem
} from "@/lib/cart-functionality";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    itemId: string;
    message: string;
  } | null>(null);

  const loadCart = () => {
    if (typeof window !== 'undefined') {
      const cartState = getCartState();
      setCart(cartState);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsCheckingAuth(false);
    loadCart();

    // Listen for cart updates
    const eventName = getCartUpdateEventName();
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener(eventName, handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate); // Listen for updates from other tabs

    return () => {
      window.removeEventListener(eventName, handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [router]);

  const openConfirmDialog = (itemId: string, message: string) => {
    setConfirmDialog({ itemId, message });
  };

  const closeConfirmDialog = () => setConfirmDialog(null);

  const confirmRemoval = () => {
    if (!confirmDialog) return;
    removeFromCart(confirmDialog.itemId);
    setConfirmDialog(null);
    loadCart();
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      openConfirmDialog(itemId, 'Remove this item from your cart?');
      return;
    }
    
    const result = await updateQuantity(itemId, newQuantity);
    if (result.success) {
      loadCart();
    } else {
      // Show error toast if needed
      window.dispatchEvent(
        new CustomEvent('show-toast', {
          detail: { message: result.message || 'Failed to update quantity', type: 'error' },
        })
      );
    }
  };

  const handleRemoveItem = (itemId: string) => {
    openConfirmDialog(itemId, 'Remove this item from your cart?');
  };

  if (isCheckingAuth || isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-4 sm:mb-6 md:mb-8">Your Cart</h1>
            <div className="text-center py-12">
              <p className="text-medium-gray">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-light-gray mb-4 sm:mb-6">
                <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-medium-gray" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-3 sm:mb-4">Your Cart</h1>
              <p className="text-base sm:text-lg text-medium-gray px-4">
                Your shopping cart is currently empty.
              </p>
            </div>

            <div className="space-y-4 px-4">
              <Link href="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto touch-manipulation">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-light-gray rounded-lg mx-4 sm:mx-0">
              <h2 className="text-lg sm:text-xl font-semibold text-dark-gray mb-3 sm:mb-4">
                Need Help?
              </h2>
              <p className="text-sm sm:text-base text-medium-gray mb-3 sm:mb-4">
                If you have any questions, feel free to contact us.
              </p>
              <a
                href="tel:+919590922000"
                className="inline-flex items-center text-primary-green font-semibold text-sm sm:text-base touch-manipulation"
              >
                Call Us: +91 9590922000
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-4 sm:mb-6 md:mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item: CartItem) => {
                const effectivePrice = cart.isCoOpMember ? item.coopPrice : item.price;
                const lineTotal = item.quantity * effectivePrice;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-border-gray-alt rounded-lg p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 shadow-sm"
                  >
                    {/* Product Image */}
                    <div className="relative w-full sm:w-28 md:w-32 h-28 sm:h-28 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-light-gray">
                      <Image
                        src={item.productImage || '/placeholder-product.jpg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-dark-gray mb-1 line-clamp-2">
                          {item.productName}
                        </h3>
                        <p className="text-xs sm:text-sm text-medium-gray mb-2">
                          Variant: {item.variantName}
                        </p>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-lg sm:text-xl font-bold text-dark-gray">
                            ₹{effectivePrice.toFixed(2)}
                          </span>
                          {cart.isCoOpMember && item.coopPrice < item.price && (
                            <span className="text-sm text-medium-gray line-through">
                              ₹{item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        {cart.isCoOpMember && (
                          <p className="text-xs text-primary-green mb-2">
                            Co-Op Member Price
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
                        <div className="flex items-center gap-2 border border-border-gray-alt rounded-md w-fit">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 sm:h-8 sm:w-8 rounded-none touch-manipulation"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 sm:px-4 py-1 text-sm font-medium min-w-[2.5rem] sm:min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 sm:h-8 sm:w-8 rounded-none touch-manipulation"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                          <span className="text-base sm:text-lg font-semibold text-dark-gray">
                            ₹{lineTotal.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 sm:h-8 sm:w-8 text-destructive hover:text-destructive hover:bg-destructive/10 touch-manipulation"
                            onClick={() => handleRemoveItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border-gray-alt rounded-lg p-4 sm:p-6 sticky top-4">
                <h2 className="text-lg sm:text-xl font-semibold text-dark-gray mb-4 sm:mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-medium-gray">
                    <span>Items ({cart.itemCount})</span>
                    <span>₹{cart.subtotal.toFixed(2)}</span>
                  </div>

                  {cart.discount.amount > 0 && (
                    <div className="flex justify-between text-primary-green">
                      <span>Discount ({cart.discount.code})</span>
                      <span>-₹{cart.discount.amount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-medium-gray">
                    <span>Tax</span>
                    <span>₹{cart.tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-border-gray-alt pt-4">
                    <div className="flex justify-between text-lg font-bold text-dark-gray">
                      <span>Total</span>
                      <span>₹{cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold py-4 sm:py-6 touch-manipulation">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/" className="block mt-3 sm:mt-4">
                  <Button
                    variant="outline"
                    className="w-full text-sm font-semibold py-4 sm:py-6 touch-manipulation"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-border-gray-alt">
                  <h3 className="text-sm font-semibold text-dark-gray mb-2">
                    Need Help?
                  </h3>
                  <p className="text-xs text-medium-gray mb-2">
                    If you have any questions, feel free to contact us.
                  </p>
                  <a
                    href="tel:+919590922000"
                    className="text-sm text-primary-green font-semibold hover:underline"
                  >
                    Call Us: +91 9590922000
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-5 sm:p-6 w-full max-w-sm space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-dark-gray">Confirm Removal</h3>
            <p className="text-sm text-medium-gray">{confirmDialog.message}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-destructive text-white hover:bg-destructive/90 py-3 sm:py-2 touch-manipulation"
                onClick={confirmRemoval}
              >
                Remove
              </Button>
              <Button
                variant="outline"
                className="flex-1 py-3 sm:py-2 touch-manipulation"
                onClick={closeConfirmDialog}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
