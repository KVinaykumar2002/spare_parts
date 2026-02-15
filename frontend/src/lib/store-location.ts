/**
 * Store location config used in footer and store locator.
 * QR code encodes the Google Maps link so users can scan for directions.
 */

const MAP_ADDRESS = "45-22-25 Beside Jupudy Tyres Bypass Road Thadithota Rajahmundry 533103";

export const STORE_MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_ADDRESS)}`;

export const STORE_QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(STORE_MAP_LINK)}`;
