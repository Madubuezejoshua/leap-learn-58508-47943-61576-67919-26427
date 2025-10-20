import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CourseCard from "./CourseCard";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import courseCard1 from "@/assets/course-card-1.png";
import courseCard2 from "@/assets/course-card-2.png";
import courseCard3 from "@/assets/course-card-3.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-mesh"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <Badge 
              variant="outline" 
              className="border-primary/30 text-primary bg-primary/5 uppercase tracking-wider text-xs font-semibold px-4 py-1.5"
            >
              Learn Real Digital Skills
            </Badge>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Turn Your Curiosity Into{" "}
                <span className="gradient-accent bg-clip-text text-transparent inline-block animate-glow">
                  Digital Mastery
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Join thousands of learners building careers in tech, design, and marketing — all from one platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 w-5 h-5" />
                Explore Courses
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="border-2 border-background w-10 h-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold">4,000+ students</p>
                <p className="text-muted-foreground">already enrolled</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative lg:pl-12">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-8">
                <CourseCard 
                  image={courseCard1}
                  title="UI Design Fundamentals"
                  delay={0.4}
                />
              </div>
              <div className="space-y-6">
                <CourseCard 
                  image={courseCard2}
                  title="JavaScript Mastery"
                  delay={0.6}
                />
                <CourseCard 
                  image={courseCard3}
                  title="Marketing Strategy"
                  delay={0.8}
                />
              </div>
            </div>

            {/* Floating accent elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
