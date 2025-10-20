import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "SkillSpark helped me transition into tech. The courses are comprehensive and the instructors are amazing!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "UX Designer",
      content: "The best investment I've made in my career. The quality of content and support is unmatched.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "I love the flexibility and the practical approach to learning. Highly recommended!",
      rating: 5,
      avatar: "ER",
    },
    {
      name: "David Kim",
      role: "Data Analyst",
      content: "The courses are well-structured and easy to follow. I've learned so much in just a few months.",
      rating: 5,
      avatar: "DK",
    },
    {
      name: "Lisa Anderson",
      role: "Product Manager",
      content: "SkillSpark has been a game-changer for my career. The certificates have real value in the job market.",
      rating: 5,
      avatar: "LA",
    },
    {
      name: "James Wilson",
      role: "Entrepreneur",
      content: "Perfect for busy professionals. I can learn at my own pace and apply what I learn immediately.",
      rating: 5,
      avatar: "JW",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="p-6 shadow-soft hover:shadow-medium transition-smooth">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-foreground mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">{testimonial.avatar}</span>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
