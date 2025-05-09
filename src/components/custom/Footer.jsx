import { Facebook, Compass } from 'lucide-react';
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div>
            <div className="flex items-center mb-5">
              <div className="flex items-center justify-center mr-2 rounded-full h-9 w-9 bg-accent">
                <Compass className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">
                Greatertrips
              </span>
            </div>
            <p className="mb-6 text-primary-foreground/80">
              AI-powered travel planning for unforgettable adventures. Discover new destinations and create perfect itineraries.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="transition-colors hover:text-accent">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="#" className="transition-colors hover:text-accent">
                <TwitterLogoIcon className="w-5 h-5" />
              </Link>
              <Link to="#" className="transition-colors hover:text-accent">
                <InstagramLogoIcon className="w-5 h-5" />
              </Link>
              <Link to="#" className="transition-colors hover:text-accent">
                <LinkedInLogoIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Discover</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Experiences</Link></li>
              <li><Link to="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Featured Trips</Link></li>
              <li><Link to="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Seasonal Offers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about-us" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">About Us</Link></li>
              <li><Link to="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Press</Link></li>
              <li><Link to="/contact-us" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Help Center</Link></li>
              <li><Link to="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Terms of Service</Link></li>
              <li><Link to="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Trust & Safety</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-white/10">
        <div className="container flex items-center justify-center px-4 py-6 mx-auto">
          <div className="mb-4 text-sm text-primary-foreground/70 md:mb-0">
            &copy; {year} Greatertrips. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;