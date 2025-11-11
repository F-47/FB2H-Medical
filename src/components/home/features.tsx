import { Clock, Users, Shield, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

type Props = {};

function Features({}: Props) {
  return (
    <section id="features" className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          Why Choose MediConnect?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Verified Doctors",
              description:
                "All doctors are verified and qualified professionals",
            },
            {
              icon: Clock,
              title: "Easy Scheduling",
              description: "Book appointments at your convenience",
            },
            {
              icon: Users,
              title: "Expert Network",
              description: "Access to specialists across multiple fields",
            },
            {
              icon: CheckCircle,
              title: "24/7 Support",
              description: "Round-the-clock customer support",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="p-6 border border-border hover:border-primary/30 transition gap-4"
            >
              <feature.icon className="w-10 h-10 text-primary" />
              <h3 className="font-bold text-lg text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
