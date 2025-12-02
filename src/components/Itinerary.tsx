import { useState } from "react";
import { MapPin, Calendar, Sun, Utensils, Waves, Camera } from "lucide-react";

interface ItineraryDay {
  dayNumber: number;
  port: string;
  activities: string[];
  icon: typeof MapPin;
}

const itinerary: ItineraryDay[] = [
  {
    dayNumber: 1,
    port: "Miami, Florida",
    activities: ["Board the ship", "Welcome reception", "Sail away party"],
    icon: Waves,
  },
  {
    dayNumber: 2,
    port: "At Sea",
    activities: ["Spa treatments", "Pool activities", "Evening entertainment"],
    icon: Sun,
  },
  {
    dayNumber: 3,
    port: "Cozumel, Mexico",
    activities: ["Snorkeling excursion", "Mayan ruins tour", "Local cuisine experience"],
    icon: Camera,
  },
  {
    dayNumber: 4,
    port: "Grand Cayman",
    activities: ["Stingray City visit", "Beach relaxation", "Duty-free shopping"],
    icon: Waves,
  },
  {
    dayNumber: 5,
    port: "Jamaica",
    activities: ["Dunn's River Falls", "Reggae music tour", "Jerk chicken tasting"],
    icon: Utensils,
  },
  {
    dayNumber: 6,
    port: "At Sea",
    activities: ["Gala dinner", "Casino night", "Farewell show"],
    icon: Sun,
  },
  {
    dayNumber: 7,
    port: "Return to Miami",
    activities: ["Disembarkation", "Transfer services available"],
    icon: MapPin,
  },
];

const Itinerary = () => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <section id="itineraries" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent-foreground font-body text-sm mb-4">
            Sample Itinerary
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Caribbean Paradise Journey
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Experience the best of the Caribbean with our 7-day adventure, visiting
            pristine beaches and vibrant cultures.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Day Selector */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
            {itinerary.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDay(day.dayNumber)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm transition-all ${
                  activeDay === day.dayNumber
                    ? "gradient-ocean text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-card/80"
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {itinerary.map((day, index) => {
              const IconComponent = day.icon;
              const isActive = activeDay === day.dayNumber;
              
              return (
                <div
                  key={day.dayNumber}
                  className={`relative pl-8 pb-8 ${
                    index === itinerary.length - 1 ? "pb-0" : ""
                  } cursor-pointer transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-80"
                  }`}
                  onClick={() => setActiveDay(day.dayNumber)}
                >
                  {/* Timeline Line */}
                  {index !== itinerary.length - 1 && (
                    <div className="absolute left-[15px] top-8 w-0.5 h-full bg-border" />
                  )}

                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "gradient-ocean text-primary-foreground"
                        : "bg-card border-2 border-border text-muted-foreground"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-4 p-4 rounded-xl transition-all ${
                      isActive ? "bg-card shadow-card" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-body text-sm text-primary font-medium">
                        Day {day.dayNumber}
                      </span>
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {day.port}
                    </h3>

                    {isActive && (
                      <ul className="space-y-1 animate-fade-in-up">
                        {day.activities.map((activity) => (
                          <li
                            key={activity}
                            className="flex items-center gap-2 text-muted-foreground font-body text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Itinerary;
