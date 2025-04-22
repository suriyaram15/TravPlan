
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="travel-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-travel-orange" />
              <span className="font-bold text-xl">TravelZenith</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the best travel experiences across India with our AI-powered itinerary planner.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>contact@travelzenith.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/itineraries" className="text-gray-400 hover:text-white transition-colors">Itineraries</Link></li>
              <li><Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Travel Blogs</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Top destinations */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li><Link to="/destinations/kashmir" className="text-gray-400 hover:text-white transition-colors">Kashmir Valley</Link></li>
              <li><Link to="/destinations/ooty" className="text-gray-400 hover:text-white transition-colors">Ooty</Link></li>
              <li><Link to="/destinations/goa" className="text-gray-400 hover:text-white transition-colors">Goa</Link></li>
              <li><Link to="/destinations/munnar" className="text-gray-400 hover:text-white transition-colors">Munnar</Link></li>
              <li><Link to="/destinations/varanasi" className="text-gray-400 hover:text-white transition-colors">Varanasi</Link></li>
              <li><Link to="/destinations/jaipur" className="text-gray-400 hover:text-white transition-colors">Jaipur</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Travel Updates</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to get the latest travel deals and updates.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-travel-blue"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-travel-blue text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social media and copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TravelZenith. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
