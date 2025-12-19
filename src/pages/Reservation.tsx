import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Home, Ship, Bed, Calendar, User, Hash } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ReservationData {
  reservationId: string;
  customerId: string;
  cruiseId: number;
  cruiseName: string;
  destination: string;
  cabinType: string;
  cabinPrice: number;
  cruisePrice: number;
  totalPrice: number;
  bookingDate: string;
  duration: number;
}

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state as ReservationData | null;

  if (!reservation) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            No Reservation Found
          </h1>
          <p className="text-muted-foreground mb-8">
            Please select a cruise package and cabin to make a reservation.
          </p>
          <Button onClick={() => navigate("/")} className="gradient-ocean text-primary-foreground">
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Reservation Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your cruise booking has been successfully processed.
            </p>
          </div>

          {/* Reservation Card */}
          <div className="bg-card rounded-2xl shadow-elegant overflow-hidden">
            {/* Header */}
            <div className="gradient-ocean p-6 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Reservation ID</p>
                  <p className="font-display text-2xl font-bold">{reservation.reservationId}</p>
                </div>
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                  Confirmed
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              {/* Cruise Info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Ship className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cruise Package</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {reservation.cruiseName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reservation.destination} • {reservation.duration} Days
                  </p>
                </div>
              </div>

              {/* Cabin Info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cabin Type</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {reservation.cabinType}
                  </p>
                </div>
              </div>

              {/* Booking Date */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booking Date</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {reservation.bookingDate}
                  </p>
                </div>
              </div>

              {/* Customer ID */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {reservation.customerId}
                  </p>
                </div>
              </div>

              {/* Cruise ID */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Hash className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cruise ID</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    CR-{reservation.cruiseId.toString().padStart(4, "0")}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Cruise Package</span>
                  <span className="text-foreground">${reservation.cruisePrice}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Cabin ({reservation.cabinType})</span>
                  <span className="text-foreground">${reservation.cabinPrice}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="font-display text-lg font-bold text-foreground">Total Paid</span>
                  <span className="font-display text-2xl font-bold text-primary">
                    ${reservation.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button variant="outline" size="lg" className="font-body">
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
            <Button 
              size="lg" 
              className="gradient-ocean text-primary-foreground"
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Reservation;
