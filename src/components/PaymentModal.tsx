import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  Smartphone,
  Building2,
  Check,
  Loader2,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";

const PaymentModal = () => {
  const { items, total, clearCart, isPaymentOpen, setIsPaymentOpen } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const banks = [
    { id: "sbi", name: "State Bank of India" },
    { id: "hdfc", name: "HDFC Bank" },
    { id: "icici", name: "ICICI Bank" },
    { id: "axis", name: "Axis Bank" },
    { id: "kotak", name: "Kotak Mahindra Bank" },
    { id: "pnb", name: "Punjab National Bank" },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
      setIsSuccess(false);
      setIsPaymentOpen(false);
      toast.success("Booking confirmed! Check your email for tickets.");
    }, 2500);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setIsPaymentOpen(false);
      setIsSuccess(false);
    }
  };

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

  if (isSuccess) {
    return (
      <Dialog open={isPaymentOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-card">
          <div className="flex flex-col items-center justify-center py-10 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </h2>
            <p className="text-muted-foreground font-body text-center mb-4">
              Your cruise booking has been confirmed
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Ticket className="w-5 h-5" />
              <span className="font-body font-medium">Tickets sent to your email</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isPaymentOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        {/* Order Summary */}
        <div className="bg-muted rounded-xl p-4 mb-4">
          <h4 className="font-body font-semibold text-foreground mb-2">Order Summary</h4>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium text-foreground">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 flex justify-between">
              <span className="font-body font-semibold">Total</span>
              <span className="font-display text-xl font-bold text-primary">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <Label className="font-body font-semibold">Select Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="grid gap-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <span className="font-body font-medium">Credit/Debit Card</span>
                  <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "upi"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="upi" id="upi" />
                <Smartphone className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <span className="font-body font-medium">UPI</span>
                  <p className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "netbanking"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Building2 className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <span className="font-body font-medium">Net Banking</span>
                  <p className="text-xs text-muted-foreground">All major banks supported</p>
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>

        {/* Payment Details */}
        <div className="space-y-4 mt-4">
          {paymentMethod === "card" && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="font-body">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="font-body"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      number: formatCardNumber(e.target.value),
                    })
                  }
                  maxLength={19}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName" className="font-body">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  className="font-body"
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="font-body">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="font-body"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiry: formatExpiry(e.target.value),
                      })
                    }
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="font-body">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    className="font-body"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="space-y-2">
                <Label htmlFor="upiId" className="font-body">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@upi"
                  className="font-body"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["@ybl", "@paytm", "@okicici", "@okhdfcbank"].map((suffix) => (
                  <button
                    key={suffix}
                    type="button"
                    onClick={() => setUpiId((prev) => prev.split("@")[0] + suffix)}
                    className="px-3 py-1 text-xs bg-muted rounded-full hover:bg-primary/10 transition-colors font-body"
                  >
                    {suffix}
                  </button>
                ))}
              </div>
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="space-y-4 animate-fade-in-up">
              <Label className="font-body">Select Your Bank</Label>
              <div className="grid grid-cols-2 gap-2">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all font-body text-sm ${
                      selectedBank === bank.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {bank.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mt-4">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-xs font-body">Secured by 256-bit SSL encryption</span>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing || items.length === 0}
          className="w-full gradient-ocean text-primary-foreground font-body py-6 mt-4"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              Pay ${total.toLocaleString()}
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
