import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const benefits = [
    "Learn from industry experts",
    "Hands-on projects and assignments",
    "Personalized learning path",
    "24/7 access to course materials",
    "Community of learners",
    "Career support and guidance",
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Learners Worldwide
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              SkillSpark is more than just an online learning platform. We're a community 
              dedicated to helping you unlock your potential and achieve your dreams through 
              quality education and expert guidance.
            </p>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <Button size="lg" variant="hero">
              Start Learning Today
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-border/50 shadow-strong p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">10K+</div>
                <p className="text-xl font-semibold mb-2">Active Students</p>
                <p className="text-muted-foreground">Learning and growing every day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
