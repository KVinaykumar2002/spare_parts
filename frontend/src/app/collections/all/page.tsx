import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";

const categories = [
  { name: "Fuel Dispensers / Petrol Pump Equipment", href: "/collections/fuel-dispensers", count: "12 items" },
  { name: "Petrol Pump Spare Parts", href: "/collections/petrol-pump-spare-parts", count: "15 items" },
  { name: "Petrol Pump Accessories", href: "/collections/petrol-pump-accessories", count: "10 items" },
  { name: "Fuel System Spare Parts", href: "/collections/fuel-system-spare-parts", count: "14 items" },
  { name: "Nozzles & Hoses", href: "/collections/nozzles-hoses", count: "18 items" },
  { name: "MPD / Fuel Metering Accessories", href: "/collections/mpd-fuel-metering-accessories", count: "8 items" },
  { name: "Fire & Safety Equipment", href: "/collections/fire-safety-equipment", count: "12 items" },
  { name: "Uniforms", href: "/collections/uniforms", count: "6 items" },
  { name: "Testing & Measurement Equipment", href: "/collections/testing-measurement-equipment", count: "9 items" },
  { name: "Queue Management Systems", href: "/collections/queue-management-systems", count: "5 items" },
  { name: "LED / Canopy Lighting", href: "/collections/led-canopy-lighting", count: "11 items" },
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
              href="tel:+919590922000"
              className="inline-flex items-center text-primary-green font-semibold text-lg"
            >
              Call Us: +91 9590922000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
