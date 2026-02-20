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

  // Put product image URL first on its own line so WhatsApp shows it as the link preview in the chat
  const productLines = [
    imageUrlFull ? imageUrlFull : null,
    "",
    "Hi, I'm interested in this product:",
    "",
    `*${productName}*`,
    variantName ? `Variant: ${variantName}` : null,
    `Price: ₹${price.toFixed(2)}`,
    coopPrice ? `Co-Op Price: ₹${coopPrice.toFixed(2)}` : null,
    quantity > 1 ? `Quantity: ${quantity}` : null,
    productPageUrlFull ? `View product: ${productPageUrlFull}` : null,
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
