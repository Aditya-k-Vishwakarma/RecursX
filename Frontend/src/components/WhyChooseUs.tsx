import { Shield, Cpu, Layers, Users } from "lucide-react";
import { VideoSection } from "./VideoSection";

const advantages = [
  {
    icon: Cpu,
    title: "Deep AI & LLM Expertise",
    description: "Mastery of GenAI, machine learning, and intelligent automation systems"
  },
  {
    icon: Layers,
    title: "Scalable Cloud Architecture",
    description: "Built for growth—from prototype to millions of users"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Industry-leading security standards and compliance protocols"
  },
  {
    icon: Users,
    title: "Client-First Collaboration",
    description: "Your long-term innovation partner, not just a vendor"
  }
];

export const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-12 sm:py-16 pb-6 sm:pb-8 px-3 sm:px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Why Choose <span className="text-gradient">RecursX</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Not just a development agency—your partner in intelligent transformation
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="flex gap-4 sm:gap-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 md:p-8 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                <advantage.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{advantage.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>

        <VideoSection className="mt-8 sm:mt-12" />
      </div>
    </section>
  );
};
