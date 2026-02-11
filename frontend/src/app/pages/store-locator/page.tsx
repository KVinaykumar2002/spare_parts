import Link from "next/link";
import { MapPin, ArrowLeft, Phone, Clock } from "lucide-react";

export default function StoreLocatorPage() {
  const stores = [
    {
      name: "ANANDH BunkStores",
      address: "#45-22-25, Beside Jupudy Tyres, Bypass Road, Thadithota Rajahmundry - 533103",
      phone: "9866309037",
      hours: "9:00 AM - 9:00 PM (All Days)",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-5 py-16 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center text-primary-green font-semibold mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-light-green mb-6">
              <MapPin className="w-12 h-12 text-primary-green" />
            </div>
            <h1 className="text-4xl font-bold text-dark-gray mb-4">
              Store Locations
            </h1>
            <p className="text-lg text-medium-gray">
              Visit us for all petrol pump material and spare parts
            </p>
          </div>

          <div className="space-y-6">
            {stores.map((store) => (
              <div
                key={store.name}
                className="bg-white p-6 rounded-lg border border-border-gray hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-dark-gray mb-4">
                  {store.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-green mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-medium-gray">{store.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary-green mr-3" />
                    <a
                      href={`tel:${store.phone}`}
                      className="text-primary-green font-semibold"
                    >
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-primary-green mr-3" />
                    <p className="text-medium-gray">{store.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-light-green rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-dark-gray mb-4">
              Can't Find a Store Near You?
            </h2>
            <p className="text-medium-gray mb-6">
              Order online and get petrol pump parts delivered to your doorstep
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Shop Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
