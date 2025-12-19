import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  Ship,
  Bed,
  ChevronRight,
  Home,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBookings } from "@/context/BookingsContext";
import { toast } from "sonner";

interface PaymentData {
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

const banks = [
  { id: "sbi", name: "State Bank of India" },
  { id: "hdfc", name: "HDFC Bank" },
  { id: "icici", name: "ICICI Bank" },
  { id: "axis", name: "Axis Bank" },
  { id: "kotak", name: "Kotak Mahindra Bank" },
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const paymentData = location.state as PaymentData | null;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // UPI
  const [upiId, setUpiId] = useState("");

  // Net Banking
  const [selectedBank, setSelectedBank] = useState("");

  if (!paymentData) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            No Payment Data Found
          </h1>
          <p className="text-muted-foreground mb-8">
            Please select a cruise package and cabin first.
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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const booking = {
      ...paymentData,
      status: "confirmed" as const,
      paymentMethod:
        paymentMethod === "card"
          ? "Credit/Debit Card"
          : paymentMethod === "upi"
          ? "UPI"
          : `Net Banking - ${banks.find((b) => b.id === selectedBank)?.name}`,
    };

    addBooking(booking);
    toast.success("Payment successful!");
    navigate("/reservation", { state: paymentData });
  };

  const isFormValid = () => {
    if (paymentMethod === "card") {
      return cardNumber.length >= 19 && cardExpiry.length >= 5 && cardCvv.length >= 3 && cardName;
    }
    if (paymentMethod === "upi") {
      return upiId.includes("@");
    }
    if (paymentMethod === "netbanking") {
      return selectedBank !== "";
    }
    return false;
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
            Complete Your Payment
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Choose your preferred payment method to confirm your booking
          </p>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl shadow-elegant p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Payment Method
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {/* Card Option */}
                  <div
                    className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <RadioGroupItem value="card" id="card" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="card" className="font-display text-lg cursor-pointer flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Credit / Debit Card
                      </Label>
                      {paymentMethod === "card" && (
                        <div className="mt-4 space-y-4 animate-fade-in-up">
                          <div>
                            <Label className="text-sm text-muted-foreground">Card Number</Label>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Name on Card</Label>
                            <Input
                              placeholder="John Doe"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm text-muted-foreground">Expiry Date</Label>
                              <Input
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                maxLength={5}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-muted-foreground">CVV</Label>
                              <Input
                                placeholder="123"
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                                maxLength={4}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* UPI Option */}
                  <div
                    className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <RadioGroupItem value="upi" id="upi" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="upi" className="font-display text-lg cursor-pointer flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-primary" />
                        UPI
                      </Label>
                      {paymentMethod === "upi" && (
                        <div className="mt-4 animate-fade-in-up">
                          <Label className="text-sm text-muted-foreground">UPI ID</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              placeholder="yourname@upi"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2 mt-3">
                            {["@ybl", "@paytm", "@okicici", "@oksbi"].map((suffix) => (
                              <Button
                                key={suffix}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const base = upiId.split("@")[0] || "yourname";
                                  setUpiId(base + suffix);
                                }}
                              >
                                {suffix}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Net Banking Option */}
                  <div
                    className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "netbanking"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="netbanking" className="font-display text-lg cursor-pointer flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        Net Banking
                      </Label>
                      {paymentMethod === "netbanking" && (
                        <div className="mt-4 animate-fade-in-up">
                          <Label className="text-sm text-muted-foreground">Select Bank</Label>
                          <RadioGroup
                            value={selectedBank}
                            onValueChange={setSelectedBank}
                            className="grid grid-cols-1 gap-2 mt-2"
                          >
                            {banks.map((bank) => (
                              <div
                                key={bank.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                  selectedBank === bank.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBank(bank.id);
                                }}
                              >
                                <RadioGroupItem value={bank.id} id={bank.id} />
                                <Label htmlFor={bank.id} className="cursor-pointer flex-1">
                                  {bank.name}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-elegant p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Ship className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{paymentData.cruiseName}</p>
                      <p className="text-sm text-muted-foreground">
                        {paymentData.destination} • {paymentData.duration} Days
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">${paymentData.cruisePrice}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bed className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{paymentData.cabinType}</p>
                      <p className="text-sm text-muted-foreground">Cabin upgrade</p>
                    </div>
                    <p className="font-semibold text-foreground">${paymentData.cabinPrice}</p>
                  </div>
                </div>

                <div className="border-t border-border mt-6 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-display text-lg font-bold text-foreground">Total</span>
                    <span className="font-display text-2xl font-bold text-primary">
                      ${paymentData.totalPrice}
                    </span>
                  </div>

                  <Button
                    className="w-full gradient-ocean text-primary-foreground"
                    size="lg"
                    disabled={!isFormValid() || isProcessing}
                    onClick={handlePayment}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay ${paymentData.totalPrice}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Payment;
