import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Clock } from "lucide-react";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
];

export const ConsultationForm = ({ isOpen, onClose }: ConsultationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: ""
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [currentPhase, setCurrentPhase] = useState(1); // 1 for contact details, 2 for scheduling

  const handleNextPhase = () => {
    if (formData.name && formData.contactNumber) {
      setCurrentPhase(2);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleBackPhase = () => {
    setCurrentPhase(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select both date and time slot");
      return;
    }
    // Handle form submission here
    console.log("Consultation scheduled:", {
      ...formData,
      date: selectedDate,
      timeSlot: selectedTimeSlot
    });
    // Reset form
    setFormData({ name: "", contactNumber: "" });
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setCurrentPhase(1);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[95vh] overflow-y-auto bg-background/95 backdrop-blur-md border border-border/50 mx-4 scrollbar-hide">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
            Schedule Consultation
          </DialogTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Book a free consultation to discuss your project requirements.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Phase 1: Contact Information */}
          {currentPhase === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consultation-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="consultation-name"
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
                  <Label htmlFor="contactNumber" className="text-sm font-medium">
                    Contact Number
                  </Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="Enter your contact number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>
              </div>

              {/* Phase 1 Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleNextPhase}
                  className="glow-primary"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {/* Phase 2: Date & Time Selection */}
          {currentPhase === 2 && (
            <>
              {/* Calendar Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="text-base sm:text-lg font-semibold">Select Date & Time</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {/* Calendar */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Choose Date</Label>
                    <div className="border border-border/50 rounded-lg p-2 sm:p-4 bg-background/30">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Available Time Slots</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 sm:max-h-64 overflow-y-auto">
                      {timeSlots.map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          type="button"
                          variant={selectedTimeSlot === timeSlot ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleTimeSlotSelect(timeSlot)}
                          className={`text-xs ${
                            selectedTimeSlot === timeSlot
                              ? "bg-primary text-primary-foreground"
                              : "border-border/50 hover:bg-primary/10"
                          }`}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Details */}
              {(selectedDate || selectedTimeSlot) && (
                <div className="p-3 sm:p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-sm mb-2">Selected Details:</h4>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    {selectedDate && (
                      <p>Date: {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    )}
                    {selectedTimeSlot && (
                      <p>Time: {selectedTimeSlot}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Phase 2 Actions */}
              <div className="flex justify-between gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackPhase}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="glow-primary"
                    disabled={!selectedDate || !selectedTimeSlot}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
