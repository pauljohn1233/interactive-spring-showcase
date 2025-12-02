import { Button } from "@/components/ui/button";
import { Anchor, Calendar, MapPin } from "lucide-react";
import heroCruise from "@/assets/hero-cruise.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroCruise}
          alt="Luxury cruise ship sailing at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foam/10 backdrop-blur-sm border border-foam/20 text-foam font-body text-sm mb-6 animate-fade-in-up">
            <Anchor className="w-4 h-4" />
            Premium Cruise Experiences
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foam mb-6 animate-fade-in-up-delay-1">
            Discover Your Next
            <span className="block mt-2 text-gold">Ocean Adventure</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-foam/80 max-w-2xl mx-auto mb-8 animate-fade-in-up-delay-2">
            Embark on unforgettable voyages to exotic destinations. Experience luxury,
            adventure, and relaxation on the world's finest cruise ships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
            <Button
              size="lg"
              className="gradient-ocean text-primary-foreground font-body text-lg px-8 py-6 hover:opacity-90 transition-opacity"
            >
              <a href="#cruises">Explore Cruises</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-foam/10 backdrop-blur-sm border-foam/30 text-foam hover:bg-foam/20 font-body text-lg px-8 py-6"
            >
              <a href="#itineraries">View Itineraries</a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { icon: MapPin, value: "50+", label: "Destinations" },
            { icon: Anchor, value: "25", label: "Cruise Ships" },
            { icon: Calendar, value: "365", label: "Days a Year" },
            { icon: Anchor, value: "100K+", label: "Happy Guests" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-foam/10 backdrop-blur-sm border border-foam/20"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
              <div className="font-display text-2xl md:text-3xl font-bold text-foam">
                {stat.value}
              </div>
              <div className="font-body text-sm text-foam/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foam/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foam/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
