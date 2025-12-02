import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Users, Ship, CreditCard } from "lucide-react";
import { toast } from "sonner";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    cruise: "",
    cabin: "",
    guests: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request submitted! We'll contact you shortly.");
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-secondary-foreground font-body text-sm mb-4">
              Start Your Journey
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Book Your Dream Cruise
            </h2>
            <p className="font-body text-muted-foreground">
              Fill in the details below and our team will help you plan the perfect voyage.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-elegant p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Cruise Selection */}
                <div className="space-y-2">
                  <Label className="font-body flex items-center gap-2">
                    <Ship className="w-4 h-4 text-primary" />
                    Select Cruise
                  </Label>
                  <Select
                    value={formData.cruise}
                    onValueChange={(value) =>
                      setFormData({ ...formData, cruise: value })
                    }
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Choose a cruise package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caribbean">Caribbean Paradise (7 Days)</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean Dream (10 Days)</SelectItem>
                      <SelectItem value="alaska">Alaskan Explorer (12 Days)</SelectItem>
                      <SelectItem value="nordic">Nordic Lights (14 Days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cabin Type */}
                <div className="space-y-2">
                  <Label className="font-body flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Cabin Type
                  </Label>
                  <Select
                    value={formData.cabin}
                    onValueChange={(value) =>
                      setFormData({ ...formData, cabin: value })
                    }
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Choose cabin type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard - $199/night</SelectItem>
                      <SelectItem value="deluxe">Deluxe - $349/night</SelectItem>
                      <SelectItem value="suite">Suite - $599/night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of Guests */}
                <div className="space-y-2">
                  <Label className="font-body flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Number of Guests
                  </Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(value) =>
                      setFormData({ ...formData, guests: value })
                    }
                  >
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <Label className="font-body flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Departure Date
                  </Label>
                  <Input
                    type="date"
                    className="font-body"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full gradient-ocean text-primary-foreground font-body text-lg py-6"
              >
                Request Booking
              </Button>

              <p className="text-center text-muted-foreground font-body text-sm">
                No payment required now. Our team will contact you to finalize your booking.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
