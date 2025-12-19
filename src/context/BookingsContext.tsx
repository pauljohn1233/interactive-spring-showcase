import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Booking {
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
  status: "confirmed" | "cancelled";
  paymentMethod: string;
}

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (reservationId: string) => void;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("cruise-bookings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cruise-bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (reservationId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.reservationId === reservationId ? { ...b, status: "cancelled" as const } : b
      )
    );
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return context;
};
