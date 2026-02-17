/**
 * Store location config used in footer and store locator.
 * Single source of truth for address, map link, and QR code.
 */

/** Full address for display and map embed query */
export const STORE_ADDRESS = "#45-22-25, Beside Jupudy Tyres, Bypass Road, Thadithota Rajahmundry - 533103";

/** Short address string for Google Maps embed query (no punctuation) */
export const STORE_ADDRESS_QUERY = "45-22-25 Beside Jupudy Tyres Bypass Road Thadithota Rajahmundry 533103";

/** Google Maps short link – used for "Open in Google Maps" and QR code */
export const STORE_MAP_LINK = "https://maps.app.goo.gl/EQ2ry2rnmz5kW8iX7?g_st=iw";

/** QR code image URL encoding the store map link */
export const STORE_QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(STORE_MAP_LINK)}`;

/** Google Maps embed URL for iframe (uses address query) */
export const STORE_MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS_QUERY)}&output=embed`;
