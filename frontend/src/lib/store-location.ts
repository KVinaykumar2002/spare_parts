/**
 * Store location config used in footer and store locator.
 * Single source of truth for address, map link, and QR code.
 */

/** Full address for display and map embed query */
export const STORE_ADDRESS = "#45-22-25, Beside Jupudy Tyres, Bypass Road, Thadithota Rajahmundry - 533103";

/** Short address string for Google Maps embed query (no punctuation) */
export const STORE_ADDRESS_QUERY = "45-22-25 Beside Jupudy Tyres Bypass Road Thadithota Rajahmundry 533103";

/** Google Maps short link – used for "Open in Google Maps" and QR code */
export const STORE_MAP_LINK = "https://www.google.com/maps/place/Anandhbunkstores/@16.9991567,81.777137,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37a3747a2d3dd1:0x32c64fcc45eac535!8m2!3d16.9991567!4d81.7797119!16s%2Fg%2F11lzp2kbc2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D";

/** QR code image URL encoding the store map link */
export const STORE_QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(STORE_MAP_LINK)}`;

/** Google Maps embed URL for iframe (uses address query) */
export const STORE_MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS_QUERY)}&output=embed`;
