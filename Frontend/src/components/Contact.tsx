import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceDomain: "",
    demoRequest: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Demo request submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", serviceDomain: "", demoRequest: "" });
    alert("Thank you! We'll reach out to you within the next 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      serviceDomain: value
    });
  };

  return (
    <footer className="py-12 sm:py-16 px-3 sm:px-4 relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-t border-border/50">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Request a <span className="text-gradient">Demo</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience our AI-powered solutions firsthand. Request a personalized demo for your business domain.
          </p>
        </div>

        <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Service Domain
              </Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50">
                  <SelectValue placeholder="Select your service domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas-development">Custom SaaS Development</SelectItem>
                  <SelectItem value="ai-automation">AI & Automation Solutions</SelectItem>
                  <SelectItem value="generative-ai">Generative AI Applications</SelectItem>
                  <SelectItem value="api-integrations">Intelligent API Integrations</SelectItem>
                  <SelectItem value="government-collaborations">Government Collaborations</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoRequest" className="text-sm font-medium">
                Demo Request Details
              </Label>
              <Textarea
                id="demoRequest"
                name="demoRequest"
                placeholder="Tell us about your project requirements and what you'd like to see in the demo..."
                value={formData.demoRequest}
                onChange={handleChange}
                required
                rows={4}
                className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
              />
            </div>

            <div className="flex items-center gap-3 p-3 sm:p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                <strong>Quick Response:</strong> We'll reach out to you within the next 24 hours to schedule your personalized demo.
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 glow-primary"
              >
                Request Demo
              </Button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};