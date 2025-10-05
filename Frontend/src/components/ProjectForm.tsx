import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectForm = ({ isOpen, onClose }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", purpose: "" });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border border-border/50 mx-4">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
            Let's Build Something Amazing
          </DialogTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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

          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-sm font-medium">
              Project Purpose
            </Label>
            <Textarea
              id="purpose"
              name="purpose"
              placeholder="Describe your project goals and what you'd like to build..."
              value={formData.purpose}
              onChange={handleChange}
              required
              rows={4}
              className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-primary/50 hover:bg-primary/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 glow-primary"
            >
              Submit Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
