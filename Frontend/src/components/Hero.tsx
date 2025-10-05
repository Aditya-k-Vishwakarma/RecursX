import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectForm } from "@/components/ProjectForm";
import { ConsultationForm } from "@/components/ConsultationForm";
import { SmoothVideo } from "@/components/SmoothImage";

export const Hero = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  
  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);
  return (
    <section className="relative min-h-screen flex items-start justify-center px-3 sm:px-4 py-6 sm:py-8 pt-16 sm:pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10 mt-4 sm:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight">
              AI-Powered
              <br />
              <span className="text-gradient">Innovation</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-in leading-relaxed">
              We build scalable SaaS platforms, automate workflows with AI, and design 
              GenAI-powered applications that help businesses grow smarter.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 glow-primary group" onClick={openForm}>
                Let's Build
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-primary/50 hover:bg-primary/10" onClick={openConsultation}>
                Schedule Consultation
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12 animate-fade-in">
              {[
                { value: "50+", label: "Automations Created" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "24/7", label: "Global Support" },
                { value: "10+", label: "Cloud Service Tools" }
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Video */}
          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <SmoothVideo 
              src="/recursX innovations.mp4" 
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Project Form Modal */}
      <ProjectForm isOpen={isFormOpen} onClose={closeForm} />
      
      {/* Consultation Form Modal */}
      <ConsultationForm isOpen={isConsultationOpen} onClose={closeConsultation} />
    </section>
  );
};
