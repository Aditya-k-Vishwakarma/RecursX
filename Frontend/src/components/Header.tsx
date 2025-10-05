import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
              RecursX Innovations
            </h1>
          </div>

          {/* CTA Button */}
          <div>
            <Button size="sm" className="glow-primary text-xs sm:text-sm px-3 sm:px-4 py-2">
              Connect Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};