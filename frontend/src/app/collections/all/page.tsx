import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";

const categories = [
  { name: "Indian Oil Petrol Bunk Products", href: "/collections/indian-oil-petrol-bunk-products", count: "28 items" },
  { name: "Hindustan Oil Products", href: "/collections/hindustan-oil-products", count: "25 items" },
  { name: "Bharat Petrol Products", href: "/collections/bharat-petrol-products", count: "23 items" },
];

export default function AllProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-5 py-16 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center text-primary-green font-semibold mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-light-green mb-6">
              <Package className="w-12 h-12 text-primary-green" />
            </div>
            <h1 className="text-4xl font-bold text-dark-gray mb-4">
              All Products
            </h1>
            <p className="text-lg text-medium-gray">
              Browse our complete collection of petrol pump equipment and spare parts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-left">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="p-6 bg-white border border-border-gray rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-dark-gray mb-2">
                  {category.name}
                </h3>
                <p className="text-medium-gray">{category.count}</p>
              </Link>
            ))}
          </div>

          <div className="p-8 bg-light-green rounded-lg">
            <h2 className="text-2xl font-semibold text-dark-gray mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-medium-gray mb-6">
              Contact us and we&apos;ll help you find the right equipment and spare parts
            </p>
            <a
              href="tel:+919866309037"
              className="inline-flex items-center text-primary-green font-semibold text-lg"
            >
              Call Us: 9866309037
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
