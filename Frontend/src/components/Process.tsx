import { Search, Pencil, Code, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "Understanding your business goals, challenges, and vision"
  },
  {
    icon: Pencil,
    title: "Design",
    description: "Architecting intelligent solutions tailored to your needs"
  },
  {
    icon: Code,
    title: "Development",
    description: "Building scalable, secure, and AI-powered systems"
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Launching with precision and ensuring seamless integration"
  },
  {
    icon: RefreshCw,
    title: "Evolution",
    description: "Continuous iteration and AI model improvement"
  }
];

export const Process = () => {
  return (
    <section id="process" className="py-16 px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From discovery to deployment—transparent, agile, and results-driven
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 hidden md:block" />

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 border-2 border-primary/30 relative z-10 backdrop-blur-sm">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
