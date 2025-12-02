"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import { addToCart } from "@/lib/cart-functionality";

type PageProps = {
  params: Promise<{ category: string }>;
};

// Mock products data - in a real app, this would come from an API
const mockProductsByCategory: Record<string, any[]> = {
  // Top Categories mappings
  staples: [
    {
      id: "staples-1",
      title: "Organic Brown Rice",
      imageUrl:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "staples-1-1",
          name: "250g",
          price: 45.0,
          coopPrice: 38.25,
          stock: 25,
        },
        {
          id: "staples-1-2",
          name: "500g",
          price: 85.0,
          coopPrice: 72.25,
          stock: 30,
        },
        {
          id: "staples-1-3",
          name: "1kg",
          price: 160.0,
          coopPrice: 136.0,
          stock: 20,
        },
      ],
    },
    {
      id: "staples-2",
      title: "Organic Whole Wheat Flour",
      imageUrl:
        "https://images.unsplash.com/photo-1584270354949-c26d0c844b95?w=500&h=500&fit=crop",
      variants: [
        {
          id: "staples-2-1",
          name: "250g",
          price: 22.0,
          coopPrice: 18.7,
          stock: 35,
        },
        {
          id: "staples-2-2",
          name: "500g",
          price: 42.0,
          coopPrice: 35.7,
          stock: 40,
        },
        {
          id: "staples-2-3",
          name: "1kg",
          price: 80.0,
          coopPrice: 68.0,
          stock: 30,
        },
      ],
    },
    {
      id: "staples-3",
      title: "Organic Basmati Rice",
      imageUrl:
        "https://images.unsplash.com/photo-1603899122634-f86a96e84af2?w=500&h=500&fit=crop",
      variants: [
        {
          id: "staples-3-1",
          name: "250g",
          price: 50.0,
          coopPrice: 42.5,
          stock: 28,
        },
        {
          id: "staples-3-2",
          name: "500g",
          price: 95.0,
          coopPrice: 80.75,
          stock: 30,
        },
        {
          id: "staples-3-3",
          name: "1kg",
          price: 180.0,
          coopPrice: 153.0,
          stock: 25,
        },
      ],
    },
    {
      id: "staples-4",
      title: "Organic Toor Dal",
      imageUrl:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop",
      variants: [
        {
          id: "staples-4-1",
          name: "250g",
          price: 55.0,
          coopPrice: 46.75,
          stock: 22,
        },
        {
          id: "staples-4-2",
          name: "500g",
          price: 105.0,
          coopPrice: 89.25,
          stock: 20,
        },
        {
          id: "staples-4-3",
          name: "1kg",
          price: 200.0,
          coopPrice: 170.0,
          stock: 18,
        },
      ],
    },
  ],
  oils: [
    {
      id: "oils-1",
      title: "Cold Pressed Groundnut Oil",
      imageUrl:
        "https://images.unsplash.com/photo-1615367423057-2fa3e65e5a0e?w=500&h=500&fit=crop",
      variants: [
        {
          id: "oils-1-1",
          name: "250ml",
          price: 85.0,
          coopPrice: 72.25,
          stock: 30,
        },
        {
          id: "oils-1-2",
          name: "500ml",
          price: 165.0,
          coopPrice: 140.25,
          stock: 28,
        },
        {
          id: "oils-1-3",
          name: "1L",
          price: 320.0,
          coopPrice: 272.0,
          stock: 25,
        },
      ],
    },
    {
      id: "oils-2",
      title: "Cold Pressed Sesame Oil",
      imageUrl:
        "https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "oils-2-1",
          name: "250ml",
          price: 90.0,
          coopPrice: 76.5,
          stock: 22,
        },
        {
          id: "oils-2-2",
          name: "500ml",
          price: 175.0,
          coopPrice: 148.75,
          stock: 20,
        },
        {
          id: "oils-2-3",
          name: "1L",
          price: 340.0,
          coopPrice: 289.0,
          stock: 18,
        },
      ],
    },
    {
      id: "oils-3",
      title: "Cold Pressed Coconut Oil",
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?w=500&h=500&fit=crop",
      variants: [
        {
          id: "oils-3-1",
          name: "250ml",
          price: 100.0,
          coopPrice: 85.0,
          stock: 25,
        },
        {
          id: "oils-3-2",
          name: "500ml",
          price: 195.0,
          coopPrice: 165.75,
          stock: 22,
        },
        {
          id: "oils-3-3",
          name: "1L",
          price: 380.0,
          coopPrice: 323.0,
          stock: 20,
        },
      ],
    },
    {
      id: "oils-4",
      title: "Cold Pressed Sunflower Oil",
      imageUrl:
        "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=500&h=500&fit=crop",
      variants: [
        {
          id: "oils-4-1",
          name: "250ml",
          price: 80.0,
          coopPrice: 68.0,
          stock: 28,
        },
        {
          id: "oils-4-2",
          name: "500ml",
          price: 155.0,
          coopPrice: 131.75,
          stock: 25,
        },
        {
          id: "oils-4-3",
          name: "1L",
          price: 300.0,
          coopPrice: 255.0,
          stock: 22,
        },
      ],
    },
  ],
  seeds: [
    {
      id: "seeds-1",
      title: "Organic Flax Seeds",
      imageUrl:
        "https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "seeds-1-1",
          name: "250g",
          price: 140.0,
          coopPrice: 119.0,
          stock: 40,
        },
        {
          id: "seeds-1-2",
          name: "500g",
          price: 270.0,
          coopPrice: 229.5,
          stock: 35,
        },
        {
          id: "seeds-1-3",
          name: "1kg",
          price: 530.0,
          coopPrice: 450.5,
          stock: 30,
        },
      ],
    },
    {
      id: "seeds-2",
      title: "Organic Sunflower Seeds",
      imageUrl:
        "https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "seeds-2-1",
          name: "250g",
          price: 150.0,
          coopPrice: 127.5,
          stock: 35,
        },
        {
          id: "seeds-2-2",
          name: "500g",
          price: 290.0,
          coopPrice: 246.5,
          stock: 32,
        },
        {
          id: "seeds-2-3",
          name: "1kg",
          price: 570.0,
          coopPrice: 484.5,
          stock: 28,
        },
      ],
    },
    {
      id: "seeds-3",
      title: "Organic Chia Seeds",
      imageUrl:
        "https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "seeds-3-1",
          name: "250g",
          price: 180.0,
          coopPrice: 153.0,
          stock: 30,
        },
        {
          id: "seeds-3-2",
          name: "500g",
          price: 350.0,
          coopPrice: 297.5,
          stock: 28,
        },
        {
          id: "seeds-3-3",
          name: "1kg",
          price: 690.0,
          coopPrice: 586.5,
          stock: 25,
        },
      ],
    },
    {
      id: "seeds-4",
      title: "Organic Pumpkin Seeds",
      imageUrl:
        "https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "seeds-4-1",
          name: "250g",
          price: 200.0,
          coopPrice: 170.0,
          stock: 28,
        },
        {
          id: "seeds-4-2",
          name: "500g",
          price: 390.0,
          coopPrice: 331.5,
          stock: 25,
        },
        {
          id: "seeds-4-3",
          name: "1kg",
          price: 770.0,
          coopPrice: 654.5,
          stock: 22,
        },
      ],
    },
  ],
  "home-essential": [
    {
      id: "home-essential-1",
      title: "Organic Jaggery Powder",
      imageUrl:
        "https://images.unsplash.com/photo-1603899122634-2f24c0b15c20?w=500&h=500&fit=crop",
      variants: [
        {
          id: "home-essential-1-1",
          name: "250g",
          price: 50.0,
          coopPrice: 42.5,
          stock: 28,
        },
        {
          id: "home-essential-1-2",
          name: "500g",
          price: 95.0,
          coopPrice: 80.75,
          stock: 25,
        },
        {
          id: "home-essential-1-3",
          name: "1kg",
          price: 190.0,
          coopPrice: 161.5,
          stock: 22,
        },
      ],
    },
    {
      id: "home-essential-2",
      title: "Organic Rock Salt",
      imageUrl:
        "https://images.unsplash.com/photo-1584270354949-1f71a9a4aa13?w=500&h=500&fit=crop",
      variants: [
        {
          id: "home-essential-2-1",
          name: "250g",
          price: 32.0,
          coopPrice: 27.2,
          stock: 35,
        },
        {
          id: "home-essential-2-2",
          name: "500g",
          price: 62.0,
          coopPrice: 52.7,
          stock: 32,
        },
        {
          id: "home-essential-2-3",
          name: "1kg",
          price: 120.0,
          coopPrice: 102.0,
          stock: 28,
        },
      ],
    },
    {
      id: "home-essential-3",
      title: "Organic Turmeric Powder",
      imageUrl:
        "https://images.unsplash.com/photo-1603899122634-2f24c0b15c20?w=500&h=500&fit=crop",
      variants: [
        {
          id: "home-essential-3-1",
          name: "250g",
          price: 150.0,
          coopPrice: 127.5,
          stock: 35,
        },
        {
          id: "home-essential-3-2",
          name: "500g",
          price: 290.0,
          coopPrice: 246.5,
          stock: 30,
        },
        {
          id: "home-essential-3-3",
          name: "1kg",
          price: 570.0,
          coopPrice: 484.5,
          stock: 25,
        },
      ],
    },
    {
      id: "home-essential-4",
      title: "Organic Red Chilli Powder",
      imageUrl:
        "https://images.unsplash.com/photo-1584270354949-1f71a9a4aa13?w=500&h=500&fit=crop",
      variants: [
        {
          id: "home-essential-4-1",
          name: "250g",
          price: 140.0,
          coopPrice: 119.0,
          stock: 32,
        },
        {
          id: "home-essential-4-2",
          name: "500g",
          price: 270.0,
          coopPrice: 229.5,
          stock: 28,
        },
        {
          id: "home-essential-4-3",
          name: "1kg",
          price: 530.0,
          coopPrice: 450.5,
          stock: 24,
        },
      ],
    },
  ],
  "ready-to-cook": [
    {
      id: "ready-to-cook-1",
      title: "Multi Millet Dosa Mix",
      imageUrl:
        "https://images.unsplash.com/photo-1630383249896-56c33cdab5c9?w=500&h=500&fit=crop",
      variants: [
        {
          id: "ready-to-cook-1-1",
          name: "250g",
          price: 68.0,
          coopPrice: 57.8,
          stock: 30,
        },
        {
          id: "ready-to-cook-1-2",
          name: "500g",
          price: 130.0,
          coopPrice: 110.5,
          stock: 26,
        },
        {
          id: "ready-to-cook-1-3",
          name: "1kg",
          price: 250.0,
          coopPrice: 212.5,
          stock: 20,
        },
      ],
    },
    {
      id: "ready-to-cook-2",
      title: "Ragi Idli Mix",
      imageUrl:
        "https://images.unsplash.com/photo-1576406662615-2f2b8f4d6a5c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "ready-to-cook-2-1",
          name: "250g",
          price: 65.0,
          coopPrice: 55.25,
          stock: 28,
        },
        {
          id: "ready-to-cook-2-2",
          name: "500g",
          price: 125.0,
          coopPrice: 106.25,
          stock: 24,
        },
        {
          id: "ready-to-cook-2-3",
          name: "1kg",
          price: 240.0,
          coopPrice: 204.0,
          stock: 18,
        },
      ],
    },
    {
      id: "ready-to-cook-3",
      title: "Organic Upma Mix",
      imageUrl:
        "https://images.unsplash.com/photo-1630383249896-56c33cdab5c9?w=500&h=500&fit=crop",
      variants: [
        {
          id: "ready-to-cook-3-1",
          name: "250g",
          price: 70.0,
          coopPrice: 59.5,
          stock: 25,
        },
        {
          id: "ready-to-cook-3-2",
          name: "500g",
          price: 135.0,
          coopPrice: 114.75,
          stock: 20,
        },
        {
          id: "ready-to-cook-3-3",
          name: "1kg",
          price: 260.0,
          coopPrice: 221.0,
          stock: 16,
        },
      ],
    },
    {
      id: "ready-to-cook-4",
      title: "Organic Poha Mix",
      imageUrl:
        "https://images.unsplash.com/photo-1576406662615-2f2b8f4d6a5c?w=500&h=500&fit=crop",
      variants: [
        {
          id: "ready-to-cook-4-1",
          name: "250g",
          price: 63.0,
          coopPrice: 53.55,
          stock: 28,
        },
        {
          id: "ready-to-cook-4-2",
          name: "500g",
          price: 120.0,
          coopPrice: 102.0,
          stock: 22,
        },
        {
          id: "ready-to-cook-4-3",
          name: "1kg",
          price: 230.0,
          coopPrice: 195.5,
          stock: 18,
        },
      ],
    },
  ],
  "dals-pulses": [
    {
      id: "prod-3",
      title: "Organic Tur/Toor Dal",
      imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop",
      variants: [
        { id: "var-3-2", name: "1kg", price: 350.00, coopPrice: 297.50, stock: 15 },
      ],
    },
    {
      id: "prod-6",
      title: "Organic Moong Dal",
      imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop",
      variants: [
        { id: "var-6-1", name: "500g", price: 162.00, coopPrice: 137.70, stock: 20 },
      ],
    },
  ],
  "dry-fruits": [
    {
      id: "prod-5",
      title: "Organic Groundnuts",
      imageUrl: "https://images.unsplash.com/photo-1606914501446-0c2c0c0a0c0c?w=500&h=500&fit=crop",
      variants: [
        { id: "var-5-1", name: "500g", price: 185.00, coopPrice: 157.25, stock: 15 },
      ],
    },
  ],
  // Add more categories as needed
};

// Category header images matching the top categories component
const categoryImages: Record<string, string> = {
  staples: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/1-9.png",
  oils: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/2_29d5505b-daa9-4f09-aa36-35b30477a53d-10.png",
  seeds: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/3-11.png",
  "home-essential": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/1-17.png",
  "ready-to-cook": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/56749ad2-75ec-41c1-917d-cfc50301e8cc-organicmandya-com/assets/images/2_29d5505b-daa9-4f09-aa36-35b30477a53d-18.png",
};

export default function CategoryPage({ params }: PageProps) {
  const [category, setCategory] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [categoryImage, setCategoryImage] = useState<string>("");

  useEffect(() => {
    params.then(({ category: cat }) => {
      setCategory(cat);
      const formattedName = cat
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setCategoryName(formattedName);
      
      // Get products for this category
      const categoryProducts = mockProductsByCategory[cat] || [];
      setProducts(categoryProducts);
      
      // Get category image
      const img = categoryImages[cat] || "";
      setCategoryImage(img);
    });
  }, [params]);

  const handleAddToCart = async (variantId: string, quantity: number) => {
    // Find the product that contains this variant
    const product = products.find(p => 
      p.variants.some((v: any) => v.id === variantId)
    );
    
    if (product) {
      const result = await addToCart(product.id, variantId, quantity);
      if (result.success) {
        // Show success notification
        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: { message: 'Item(s) successfully added to the cart', type: 'success' },
          })
        );
      } else {
        // Show error notification
        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: { message: result.message, type: 'error' },
          })
        );
      }
    }
  };

  return (
    <div className="bg-background font-body">
      <div className="container mx-auto px-5 py-16 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center text-primary-green font-semibold mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="text-center mb-12">
              {categoryImage ? (
                <div className="inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-light-green mb-6 overflow-hidden">
                  <Image
                    src={categoryImage}
                    alt={categoryName}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-light-green mb-6">
                  <Package className="w-12 h-12 text-primary-green" />
                </div>
              )}
              <h1 className="text-4xl font-bold text-dark-gray mb-4">
                {categoryName}
              </h1>
              <p className="text-lg text-medium-gray">
                Explore our organic {categoryName.toLowerCase()} collection
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 bg-light-gray rounded-lg text-center">
                <p className="text-medium-gray mb-6">
                  Products in this category are being updated. Please check back soon or browse our other collections.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-8 py-3 rounded-md transition-colors"
                  >
                    Browse All Products
                  </Link>
                  <a
                    href="tel:+919590922000"
                    className="inline-block bg-white text-primary-green border-2 border-primary-green hover:bg-light-green text-sm font-semibold px-8 py-3 rounded-md transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
