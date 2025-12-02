import { Ship, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partners", href: "#" },
    ],
    cruises: [
      { label: "Caribbean", href: "#" },
      { label: "Mediterranean", href: "#" },
      { label: "Alaska", href: "#" },
      { label: "Nordic", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Cancellation Policy", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer id="about" className="bg-ocean-deep text-foam">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Ship className="w-8 h-8 text-gold" />
              <span className="font-display text-2xl font-semibold">OceanVoyage</span>
            </a>
            <p className="font-body text-foam/80 mb-6 max-w-sm">
              Creating unforgettable ocean experiences since 1995. Join us on a journey
              of luxury, adventure, and discovery.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+1-800-123-4567"
                className="flex items-center gap-2 text-foam/80 hover:text-gold transition-colors font-body"
              >
                <Phone className="w-4 h-4" />
                +1-800-123-4567
              </a>
              <a
                href="mailto:info@oceanvoyage.com"
                className="flex items-center gap-2 text-foam/80 hover:text-gold transition-colors font-body"
              >
                <Mail className="w-4 h-4" />
                info@oceanvoyage.com
              </a>
              <div className="flex items-start gap-2 text-foam/80 font-body">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Harbor Boulevard, Miami, FL 33101</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-foam/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cruises Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2">
              {footerLinks.cruises.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-foam/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-foam/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foam/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-foam/60 text-sm">
              © {currentYear} OceanVoyage. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-foam/10 hover:bg-gold/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
