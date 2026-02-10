/**
 * Static API layer – no network calls. All data from static-data.
 */

import {
  getStaticProducts,
  getStaticCategories,
  getStaticBanners,
  type StaticProduct,
  type StaticCategory,
  type StaticBanner,
} from './static-data';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown[];
}

// Public API (static data only)
export const publicApi = {
  products: {
    getAll: (params?: { page?: number; limit?: number; category?: string; featured?: string; search?: string }): Promise<ApiResponse<{ products: StaticProduct[]; pagination: { page: number; limit: number; total: number; pages: number } }>> => {
      const page = params?.page ?? 1;
      const limit = Math.min(params?.limit ?? 50, 100);
      let list = getStaticProducts();

      if (params?.category) {
        const slug = params.category.toLowerCase();
        list = list.filter(
          (p) =>
            p.category.slug.toLowerCase() === slug ||
            p.category.name.toLowerCase() === params.category!.toLowerCase()
        );
      }
      if (params?.featured === 'true') {
        list = list.filter((p) => p.isFeatured);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q)
        );
      }

      const total = list.length;
      const start = (page - 1) * limit;
      const products = list.slice(start, start + limit);

      return Promise.resolve({
        success: true,
        data: {
          products,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit) || 1,
          },
        },
      });
    },

    getById: (id: string): Promise<ApiResponse<StaticProduct>> => {
      const product = getStaticProducts().find((p) => p._id === id);
      return Promise.resolve(
        product
          ? { success: true, data: product }
          : { success: false, message: 'Product not found' }
      );
    },
  },

  banners: {
    getAll: (params?: { position?: string }): Promise<ApiResponse<StaticBanner[]>> => {
      const data = getStaticBanners(params?.position);
      return Promise.resolve({ success: true, data });
    },
  },

  categories: {
    getAll: (): Promise<ApiResponse<StaticCategory[]>> => {
      const data = getStaticCategories();
      return Promise.resolve({ success: true, data });
    },
  },
};
