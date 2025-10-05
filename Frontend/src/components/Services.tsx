import { Cloud, Zap, Brain, Link } from "lucide-react";

const services = [
  {
    icon: Cloud,
    title: "Custom SaaS Development",
    description: "End-to-end product design, scalable architecture, and secure systems for startups and enterprises. Transform your business model into reliable, performance-optimized solutions.",
    image: "/1.png"
  },
  {
    icon: Zap,
    title: "AI & Automation Solutions",
    description: "Integrate AI into workflows to eliminate repetitive tasks, reduce errors, and increase productivity. From intelligent CRMs to document OCR automation and RPA.",
    image: "/2.png"
  },
  {
    icon: Brain,
    title: "Generative AI Applications",
    description: "Develop custom GenAI systems that reason, assist, and create. AI copilots, LLM integrations, multimodal systems, and fine-tuned agents that understand your data contextually."
  },
  {
    icon: Link,
    title: "Intelligent API Integrations",
    description: "Connect your products to global ecosystems through secure APIs. Payment systems, data pipelines, third-party integrations, and AI model wrappers."
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-12 sm:py-16 px-3 sm:px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            What We Do <span className="text-gradient">Best</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Core expertise that drives intelligent business transformation
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 hover:bg-card/80 transition-all duration-300 ${
                service.image ? 'relative' : ''
              }`}
            >
              {/* Image effects only for services with images */}
              {service.image && (
                <>
                  {/* Full image normally visible covering entire card */}
                  <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-all duration-500 ease-out z-10">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-contain bg-black/20 backdrop-blur-sm"
                    />
                  </div>
                  
                  {/* Card content visible only on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out relative z-20">
                    <div className="h-64 sm:h-80 overflow-hidden relative">
                      {/* Small cropped image */}
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover object-top scale-90"
                      />
                      
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 sm:mb-6">
                        <service.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{service.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </>
              )}
              
              {/* Simple layout for services without images */}
              {!service.image && (
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
