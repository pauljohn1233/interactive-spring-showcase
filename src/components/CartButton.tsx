import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

const CartButton = () => {
  const { itemCount, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5 text-foreground" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;
