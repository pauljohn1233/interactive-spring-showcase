import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Headphones,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Send,
  XCircle,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

const supportTopics = [
  { value: "cancellation", label: "Cancel My Booking", icon: XCircle },
  { value: "refund", label: "Refund Query", icon: CreditCard },
  { value: "modification", label: "Modify Booking", icon: MessageSquare },
  { value: "general", label: "General Inquiry", icon: HelpCircle },
];

const Support = () => {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Your query has been submitted! Our team will contact you within 24 hours.");
    setTopic("");
    setName("");
    setEmail("");
    setReservationId("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <section id="support" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-body text-sm mb-4">
            24/7 Support
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            How Can We Help?
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Have questions about your booking? Need to cancel or modify? Our support team is here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-muted rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-ocean flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Customer Support
                  </h3>
                  <p className="text-sm text-muted-foreground">We're here to help</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold text-foreground">1-800-CRUISE</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">support@oceanvoyage.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="font-semibold text-foreground">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <h4 className="font-display font-semibold text-foreground mb-3">
                Quick Actions
              </h4>
              <div className="space-y-2">
                {supportTopics.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setTopic(item.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                      topic === item.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-body text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-muted rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Submit a Request
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Your Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Topic</Label>
                  <Select value={topic} onValueChange={setTopic} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportTopics.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Reservation ID (Optional)
                  </Label>
                  <Input
                    placeholder="RES-XXXXXX"
                    value={reservationId}
                    onChange={(e) => setReservationId(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-sm text-muted-foreground">Your Message</Label>
                <Textarea
                  placeholder="Please describe your query in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full gradient-ocean text-primary-foreground"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
