import { Linkedin, Github, Mail } from "lucide-react";

const founders = [
  {
    name: "Aditya K Vishwakarma",
    designation: "CEO at RecursX",
    experience: "ASDE at Fealty Technologies • 1+ Year exp",
    image: "/img.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Rohit Choukiker",
    designation: "CTO at RecursX",
    experience: "SDE at Startsync • 1+ Years exp",
    image: "/img2.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "#"
    }
  }
];

export const Founders = () => {
  return (
    <section id="founders" className="py-12 sm:py-16 px-3 sm:px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Meet Our <span className="text-gradient">Founders</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            The visionary leaders driving innovation and excellence at RecursX
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full rounded-full object-cover border-3 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Name and Designation */}
                <h3 className="text-lg sm:text-xl font-bold text-center mb-1">
                  {founder.name}
                </h3>
                <p className="text-primary font-semibold text-center mb-1">
                  {founder.designation}
                </p>
                <p className="text-xs text-muted-foreground text-center mb-3">
                  {founder.experience}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3">
                <a
                  href={founder.social.linkedin}
                  className="p-2 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={founder.social.github}
                  className="p-2 rounded-full bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={founder.social.email}
                  className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
