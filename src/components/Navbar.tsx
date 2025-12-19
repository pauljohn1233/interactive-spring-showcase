import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ship, Menu, X, User } from "lucide-react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

  const navLinks = [
    { label: "Cruises", href: "#cruises" },
    { label: "Itineraries", href: "#itineraries" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <Ship className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <span className="font-display text-xl md:text-2xl font-semibold text-foreground">
                OceanVoyage
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setAuthModal("login")}
                className="font-body"
              >
                Sign In
              </Button>
              <Button
                onClick={() => setAuthModal("register")}
                className="font-body gradient-ocean text-primary-foreground hover:opacity-90"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-foreground md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border animate-fade-in-up">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-body text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setAuthModal("login");
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    setAuthModal("register");
                    setIsMenuOpen(false);
                  }}
                  className="gradient-ocean text-primary-foreground"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        mode={authModal || "login"}
        onModeChange={setAuthModal}
      />
    </>
  );
};

export default Navbar;
