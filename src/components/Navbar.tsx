import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Services", href: "/#services", type: "hash" },
  { label: "Work", href: "/work", type: "page" },
  { label: "Process", href: "/#process", type: "hash" },
  { label: "Pricing", href: "/#pricing", type: "hash" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href === "/contact") {
      navigate("/contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle home link
    if (href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Determine if it's a hash link or page link
    if (href.startsWith("/#")) {
      const hash = href.replace("/", ""); // extract #services

      if (location.pathname === "/") {
        // We are on home page, just scroll
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        // We are on another page, navigate to home and hash
        navigate(href);
        // Note: Automatic scrolling to hash after navigation might need a separate effect in App/Index
        // But for now, we rely on browser default or we can force it.
      }
    } else {
      // It's a page link like /work
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => handleNavigation(e, "/")}
          className="text-sm font-bold tracking-[0.1em] uppercase bg-transparent border-none cursor-pointer p-0"
        >
          Devansh<span className="text-gold">.</span>Studio
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleNavigation(e, l.href)}
              className={`text-sm transition-colors bg-transparent border-none cursor-pointer ${location.pathname === l.href
                ? "text-gold font-medium"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {l.label}
            </a>
          ))}
          <Button
            variant="hero"
            size="sm"
            onClick={(e) => handleNavigation(e, "/contact")}
          >
            Get in Touch
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border absolute top-16 left-0 right-0 z-[99]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavigation(e, l.href)}
                  className={`block text-sm transition-colors bg-transparent border-none cursor-pointer text-left w-full py-2 ${location.pathname === l.href
                    ? "text-gold font-medium"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {l.label}
                </a>
              ))}
              <Button
                variant="hero"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  handleNavigation(e, "/contact");
                }}
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
