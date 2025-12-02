import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CruisePackages from "@/components/CruisePackages";
import CabinTypes from "@/components/CabinTypes";
import Itinerary from "@/components/Itinerary";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import PaymentModal from "@/components/PaymentModal";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CruisePackages />
      <CabinTypes />
      <Itinerary />
      <BookingForm />
      <Footer />
      <Cart />
      <PaymentModal />
    </main>
  );
};

export default Index;
