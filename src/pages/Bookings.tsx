import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Ship,
  Bed,
  Calendar,
  CreditCard,
  XCircle,
  Download,
  Home,
  Ticket,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBookings, Booking } from "@/context/BookingsContext";
import { toast } from "sonner";

const Bookings = () => {
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useBookings();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedBooking) {
      cancelBooking(selectedBooking.reservationId);
      toast.success("Booking cancelled successfully. Refund will be processed within 5-7 business days.");
      setCancelDialogOpen(false);
      setSelectedBooking(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Ticket className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            No Bookings Yet
          </h1>
          <p className="text-muted-foreground mb-8">
            You haven't made any cruise bookings yet. Start exploring our packages!
          </p>
          <Button onClick={() => navigate("/")} className="gradient-ocean text-primary-foreground">
            <Home className="w-4 h-4 mr-2" />
            Explore Cruises
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
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
            My Bookings
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            View and manage your cruise reservations
          </p>

          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.reservationId}
                className={`bg-card rounded-2xl shadow-elegant overflow-hidden ${
                  booking.status === "cancelled" ? "opacity-75" : ""
                }`}
              >
                {/* Header */}
                <div
                  className={`p-4 ${
                    booking.status === "cancelled" ? "bg-destructive/10" : "gradient-ocean"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm ${
                          booking.status === "cancelled" ? "text-destructive" : "text-primary-foreground/80"
                        }`}
                      >
                        Reservation ID
                      </p>
                      <p
                        className={`font-display text-xl font-bold ${
                          booking.status === "cancelled" ? "text-destructive" : "text-primary-foreground"
                        }`}
                      >
                        {booking.reservationId}
                      </p>
                    </div>
                    <Badge
                      className={
                        booking.status === "cancelled"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-green-500 text-primary-foreground"
                      }
                    >
                      {booking.status === "cancelled" ? "Cancelled" : "Confirmed"}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Ship className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cruise Package</p>
                        <p className="font-semibold text-foreground">{booking.cruiseName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.destination} • {booking.duration} Days
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bed className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cabin Type</p>
                        <p className="font-semibold text-foreground">{booking.cabinType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Date</p>
                        <p className="font-semibold text-foreground">{booking.bookingDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <p className="font-semibold text-foreground">{booking.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-display text-2xl font-bold text-primary">
                        ${booking.totalPrice}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {booking.status !== "cancelled" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download Ticket
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelClick(booking)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/")}
              className="font-body"
            >
              <Home className="w-4 h-4 mr-2" />
              Book Another Cruise
            </Button>
          </div>
        </div>
      </div>
      <Footer />

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
              Your refund will be processed within 5-7 business days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Bookings;
