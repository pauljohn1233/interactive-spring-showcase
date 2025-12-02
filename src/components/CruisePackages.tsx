import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, ChevronRight } from "lucide-react";

interface CruisePackage {
  id: number;
  cruiseName: string;
  destination: string;
  price: number;
  duration: number;
  status: "AVAILABLE" | "UNAVAILABLE";
  rating: number;
  image: string;
}

const cruises: CruisePackage[] = [
  {
    id: 1,
    cruiseName: "Caribbean Paradise",
    destination: "Caribbean Islands",
    price: 1299,
    duration: 7,
    status: "AVAILABLE",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    cruiseName: "Mediterranean Dream",
    destination: "Mediterranean Sea",
    price: 1899,
    duration: 10,
    status: "AVAILABLE",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    cruiseName: "Alaskan Explorer",
    destination: "Alaska, USA",
    price: 2199,
    duration: 12,
    status: "AVAILABLE",
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    cruiseName: "Nordic Lights",
    destination: "Scandinavia",
    price: 2499,
    duration: 14,
    status: "UNAVAILABLE",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80",
  },
];

const CruisePackages = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="cruises" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-body text-sm mb-4">
            Featured Packages
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Cruise Packages
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated selection of luxury cruise experiences,
            each designed to create unforgettable memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cruises.map((cruise) => (
            <div
              key={cruise.id}
              className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300"
              onMouseEnter={() => setHoveredId(cruise.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cruise.image}
                  alt={cruise.cruiseName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <Badge
                  className={`absolute top-3 right-3 ${
                    cruise.status === "AVAILABLE"
                      ? "bg-green-500/90 text-primary-foreground"
                      : "bg-destructive/90 text-destructive-foreground"
                  }`}
                >
                  {cruise.status === "AVAILABLE" ? "Available" : "Sold Out"}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="font-body text-sm text-muted-foreground">
                    {cruise.rating}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {cruise.cruiseName}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {cruise.destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {cruise.duration} Days
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body text-sm text-muted-foreground">From</span>
                    <p className="font-display text-2xl font-bold text-primary">
                      ${cruise.price}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={cruise.status === "UNAVAILABLE"}
                    className="gradient-ocean text-primary-foreground"
                  >
                    Book Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" className="font-body">
            View All Cruises
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CruisePackages;
