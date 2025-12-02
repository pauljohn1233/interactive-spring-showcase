import { Button } from "@/components/ui/button";
import { Check, Bed, Users, Maximize, Waves } from "lucide-react";

interface CabinType {
  type: "Standard" | "Deluxe" | "Suite";
  price: number;
  size: string;
  capacity: number;
  features: string[];
  image: string;
  popular?: boolean;
}

const cabins: CabinType[] = [
  {
    type: "Standard",
    price: 199,
    size: "180 sq ft",
    capacity: 2,
    features: [
      "Queen-size bed",
      "Private bathroom",
      "Ocean view window",
      "Mini refrigerator",
      "24/7 room service",
    ],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80",
  },
  {
    type: "Deluxe",
    price: 349,
    size: "250 sq ft",
    capacity: 3,
    features: [
      "King-size bed",
      "Spacious bathroom",
      "Private balcony",
      "Living area",
      "Premium amenities",
      "Priority dining",
    ],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
    popular: true,
  },
  {
    type: "Suite",
    price: 599,
    size: "400 sq ft",
    capacity: 4,
    features: [
      "Master bedroom",
      "Luxury bathroom with jacuzzi",
      "Large private balcony",
      "Separate living room",
      "Butler service",
      "Exclusive lounge access",
      "Spa credits included",
    ],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=80",
  },
];

const CabinTypes = () => {
  return (
    <section id="cabins" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary-foreground font-body text-sm mb-4">
            Accommodations
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Perfect Cabin
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            From comfortable standard rooms to luxurious suites, find the perfect
            accommodation for your voyage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cabins.map((cabin) => (
            <div
              key={cabin.type}
              className={`relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 ${
                cabin.popular ? "ring-2 ring-primary scale-105 md:scale-110 z-10" : ""
              }`}
            >
              {cabin.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 font-body text-sm font-medium">
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className={`relative h-48 overflow-hidden ${cabin.popular ? "mt-8" : ""}`}>
                <img
                  src={cabin.image}
                  alt={`${cabin.type} cabin`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {cabin.type}
                </h3>

                <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                  <span className="flex items-center gap-1 text-sm">
                    <Maximize className="w-4 h-4" />
                    {cabin.size}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Users className="w-4 h-4" />
                    Up to {cabin.capacity}
                  </span>
                </div>

                <div className="mb-6">
                  <span className="font-body text-sm text-muted-foreground">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold text-primary">
                      ${cabin.price}
                    </span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {cabin.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-body ${
                    cabin.popular
                      ? "gradient-ocean text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Select Cabin
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CabinTypes;
