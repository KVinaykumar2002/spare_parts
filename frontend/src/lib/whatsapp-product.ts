/**
 * Generates WhatsApp link for product inquiry with product details and store address.
 */

const WHATSAPP_NUMBER = "919866309037";
const STORE_ADDRESS = "#45-22-25, Beside Jupudy Tyres, Bypass Road, Thadithota Rajahmundry - 533103";

export function getWhatsAppProductUrl(params: {
  productName: string;
  variantName?: string;
  price: number;
  coopPrice?: number;
  quantity?: number;
}): string {
  const { productName, variantName, price, coopPrice, quantity = 1 } = params;

  const lines = [
    "Hi, I'm interested in this product:",
    "",
    `*${productName}*`,
    variantName ? `Variant: ${variantName}` : null,
    `Price: ₹${price.toFixed(2)}`,
    coopPrice ? `Co-Op Price: ₹${coopPrice.toFixed(2)}` : null,
    quantity > 1 ? `Quantity: ${quantity}` : null,
    "",
    "Store Address:",
    STORE_ADDRESS,
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
