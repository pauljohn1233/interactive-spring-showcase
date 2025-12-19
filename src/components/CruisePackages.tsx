import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Clock, Star, ChevronRight, Check, Bed, Users, Maximize } from "lucide-react";
import { toast } from "sonner";

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

interface CabinType {
  type: string;
  price: number;
  size: string;
  capacity: string;
  features: string[];
  image: string;
  popular?: boolean;
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
    status: "AVAILABLE",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80",
  },
];

const cabins: CabinType[] = [
  {
    type: "Interior Cabin",
    price: 299,
    size: "160 sq ft",
    capacity: "2 guests",
    features: ["Twin beds", "Private bathroom", "TV", "Climate control"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80",
  },
  {
    type: "Ocean View Cabin",
    price: 499,
    size: "185 sq ft",
    capacity: "2-3 guests",
    features: ["Ocean view window", "Queen bed", "Private bathroom", "Mini fridge"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=80",
    popular: true,
  },
  {
    type: "Balcony Suite",
    price: 799,
    size: "250 sq ft",
    capacity: "2-4 guests",
    features: ["Private balcony", "King bed", "Living area", "Premium amenities"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
  },
  {
    type: "Royal Suite",
    price: 1299,
    size: "400 sq ft",
    capacity: "4-6 guests",
    features: ["Panoramic views", "Master bedroom", "Butler service", "Jacuzzi"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
  },
];

const CruisePackages = () => {
  const navigate = useNavigate();
  const [selectedCruise, setSelectedCruise] = useState<CruisePackage | null>(null);
  const [isCabinModalOpen, setIsCabinModalOpen] = useState(false);

  const handleSelectCruise = (cruise: CruisePackage) => {
    if (cruise.status === "UNAVAILABLE") return;
    setSelectedCruise(cruise);
    setIsCabinModalOpen(true);
  };

  const handleSelectCabin = (cabin: CabinType) => {
    if (!selectedCruise) return;

    const reservationId = `RES-${Date.now().toString(36).toUpperCase()}`;
    const customerId = `CUS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const bookingDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const reservationData = {
      reservationId,
      customerId,
      cruiseId: selectedCruise.id,
      cruiseName: selectedCruise.cruiseName,
      destination: selectedCruise.destination,
      cabinType: cabin.type,
      cabinPrice: cabin.price,
      cruisePrice: selectedCruise.price,
      totalPrice: selectedCruise.price + cabin.price,
      bookingDate,
      duration: selectedCruise.duration,
    };

    setIsCabinModalOpen(false);
    toast.success("Reservation confirmed!");
    navigate("/reservation", { state: reservationData });
  };

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
                    onClick={() => handleSelectCruise(cruise)}
                    className="gradient-ocean text-primary-foreground"
                  >
                    Select
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

      {/* Cabin Selection Modal */}
      <Dialog open={isCabinModalOpen} onOpenChange={setIsCabinModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Select Cabin for {selectedCruise?.cruiseName}
            </DialogTitle>
            <p className="text-muted-foreground">
              Choose your preferred cabin type to complete the reservation
            </p>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {cabins.map((cabin) => (
              <div
                key={cabin.type}
                className="relative bg-muted rounded-xl overflow-hidden hover:shadow-elegant transition-all cursor-pointer group"
                onClick={() => handleSelectCabin(cabin)}
              >
                {cabin.popular && (
                  <Badge className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}

                <div className="relative h-32 overflow-hidden">
                  <img
                    src={cabin.image}
                    alt={cabin.type}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-display text-lg font-semibold text-foreground">
                      {cabin.type}
                    </h4>
                    <p className="font-display text-xl font-bold text-primary">
                      +${cabin.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3 h-3" />
                      {cabin.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {cabin.capacity}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {cabin.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button
                    className="w-full mt-4 gradient-ocean text-primary-foreground"
                    size="sm"
                  >
                    <Bed className="w-4 h-4 mr-2" />
                    Select & Book
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {selectedCruise && (
            <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Selected Package</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {selectedCruise.cruiseName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCruise.destination} • {selectedCruise.duration} Days
                  </p>
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  ${selectedCruise.price}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CruisePackages;
