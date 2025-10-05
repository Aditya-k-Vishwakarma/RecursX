import { Linkedin, Github, Mail, Twitter, Instagram, Youtube, MapPin, Phone, Calendar } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container max-w-6xl mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 overflow-hidden rounded-lg">
                <img 
                  src="/LOGO.png" 
                  alt="RecursX Innovations" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%', transform: 'scale(1.2)' }}
                />
              </div>
              <h3 className="text-xl font-bold">RecursX Innovations</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building the next generation of intelligent software. We specialize in SaaS development, 
              AI automation, and Generative AI applications that transform businesses.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>India • Global Reach</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm">Services</a></li>
              <li><a href="#founders" className="text-gray-300 hover:text-white transition-colors text-sm">Our Team</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="#process" className="text-gray-300 hover:text-white transition-colors text-sm">Our Process</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm">Custom SaaS Development</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm">AI & Automation</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm">Generative AI Apps</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm">API Integrations</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm">AI Strategy</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>hello@recursx.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>Founded 2024</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-400">Follow Us</h5>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-pink-600/20 text-pink-400 rounded-lg hover:bg-pink-600/30 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex justify-center">
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
