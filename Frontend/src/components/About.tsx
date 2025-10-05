import { Brain, Target, Eye } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-16 px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Intelligence at the <span className="text-gradient">Core</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine engineering precision, creative problem-solving, and artificial intelligence 
            expertise to create intelligent ecosystems that learn and evolve with your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Intelligence should be at the core of every digital product. We build systems that 
              don't just respond—they understand, learn, and adapt.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To redefine digital innovation by embedding AI in every layer of business software, 
              creating solutions that drive measurable growth.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Building a world where automation enhances human creativity and potential, 
              empowering businesses to focus on what truly matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
