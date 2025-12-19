import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CruisePackages from "@/components/CruisePackages";
import Itinerary from "@/components/Itinerary";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CruisePackages />
      <Itinerary />
      <BookingForm />
      <Footer />
    </main>
  );
};

export default Index;
