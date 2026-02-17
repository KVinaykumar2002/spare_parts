/**
 * Store location config used in footer and store locator.
 * QR code encodes the Google Maps link so users can scan for directions.
 */

/** Google Maps short link – used for "Open in Google Maps" and QR code */
export const STORE_MAP_LINK = "https://maps.app.goo.gl/EQ2ry2rnmz5kW8iX7?g_st=iw";

/** QR code image URL encoding the store map link */
export const STORE_QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(STORE_MAP_LINK)}`;
