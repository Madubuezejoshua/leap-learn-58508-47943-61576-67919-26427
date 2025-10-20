import { Card } from "@/components/ui/card";
import { BookOpen, Users, Award, TrendingUp, Clock, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join thousands of learners and get help when you need it",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn recognized certificates upon course completion",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace, anytime and anywhere",
    },
    {
      icon: Shield,
      title: "Lifetime Access",
      description: "Get unlimited access to course materials forever",
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose SkillSpark?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to accelerate your learning journey and achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={idx} 
                className="p-8 shadow-soft hover:shadow-medium transition-smooth hover:scale-[1.02] bg-card"
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
