/**
 * Generates WhatsApp link for product inquiry with product details and delivery address.
 * User must save address before sending; their saved address is included in the message.
 */

import { STORE_ADDRESS } from "./store-location";

const WHATSAPP_NUMBER = "919866309037";

export interface DeliveryAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export function getWhatsAppProductUrl(params: {
  productName: string;
  variantName?: string;
  price: number;
  coopPrice?: number;
  quantity?: number;
  imageUrl?: string;
  productPageUrl?: string; // Optional link to product page (relative or absolute)
  baseUrl?: string; // e.g. window.location.origin - needed to resolve relative image paths
  deliveryAddress?: DeliveryAddress | null; // User's saved delivery address – included when provided
}): string {
  const { productName, variantName, price, coopPrice, quantity = 1, imageUrl, productPageUrl, baseUrl, deliveryAddress } = params;

  const imageUrlFull =
    imageUrl?.startsWith("http")
      ? imageUrl
      : imageUrl && baseUrl
        ? `${baseUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
        : undefined; // Omit image for relative URLs when baseUrl not available (e.g. SSR)

  const productPageUrlFull =
    productPageUrl?.startsWith("http")
      ? productPageUrl
      : productPageUrl && baseUrl
        ? `${baseUrl}${productPageUrl.startsWith("/") ? "" : "/"}${productPageUrl}`
        : undefined;

  // Encode URLs so spaces (e.g. in "17.IOCL COT.jpg") become %20 and the link opens correctly in WhatsApp
  const imageUrlEncoded = imageUrlFull ? encodeURI(imageUrlFull) : undefined;
  const productPageUrlEncoded = productPageUrlFull ? encodeURI(productPageUrlFull) : undefined;

  // Use share preview page URL first so WhatsApp fetches it and shows og:image as the link preview
  const sharePreviewUrl =
    baseUrl && imageUrlFull
      ? `${baseUrl}/share/product-preview?image=${encodeURIComponent(imageUrlFull)}&name=${encodeURIComponent(productName)}&price=${encodeURIComponent(price.toFixed(2))}`
      : imageUrlEncoded;

  // Put share preview URL (or direct image URL) first so WhatsApp shows the image preview in the chat
  const productLines = [
    sharePreviewUrl ?? null,
    "",
    "Hi, I'm interested in this product:",
    "",
    `*${productName}*`,
    variantName ? `Variant: ${variantName}` : null,
    `Price: ₹${price.toFixed(2)}`,
    coopPrice ? `Co-Op Price: ₹${coopPrice.toFixed(2)}` : null,
    quantity > 1 ? `Quantity: ${quantity}` : null,
    productPageUrlEncoded ? `View product: ${productPageUrlEncoded}` : null,
  ].filter(Boolean);

  const addressLines = deliveryAddress
    ? [
        "",
        "My Delivery Address:",
        deliveryAddress.name,
        deliveryAddress.phone,
        deliveryAddress.addressLine1,
        deliveryAddress.addressLine2 || null,
        `${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}`,
      ].filter(Boolean)
    : ["", "Store Address:", STORE_ADDRESS];

  const lines = [...productLines, ...addressLines];
  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
