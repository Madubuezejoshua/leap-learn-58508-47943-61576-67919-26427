import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold font-heading">SkillSpark</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#courses" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth"
            >
              Courses
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth"
            >
              About
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth"
            >
              Pricing
            </a>
            <a 
              href="/login" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth"
            >
              Login
            </a>
          </div>

          {/* CTA Button */}
          <Button variant="hero" size="default" className="hidden md:inline-flex" onClick={() => window.location.href = '/signup'}>
            Get Started
          </Button>

          {/* Mobile CTA */}
          <Button variant="hero" size="sm" className="md:hidden" onClick={() => window.location.href = '/signup'}>
            Start
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
