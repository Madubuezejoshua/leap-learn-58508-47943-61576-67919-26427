import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-heading">SkillSpark</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Empowering learners worldwide with quality education and expert guidance.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">About Us</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Careers</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Press</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Blog</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Help Center</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Community</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Guides</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Terms of Service</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-smooth">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/80">
          <p>&copy; {new Date().getFullYear()} SkillSpark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
