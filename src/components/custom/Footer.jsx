import React from 'react';
import { Facebook, Compass } from 'lucide-react';
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

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
              <a href="#" className="transition-colors hover:text-accent">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors hover:text-accent">
                <TwitterLogoIcon className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors hover:text-accent">
                <InstagramLogoIcon className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors hover:text-accent">
                <LinkedInLogoIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Discover</h3>
            <ul className="space-y-3">
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Destinations</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Experiences</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Travel Guides</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Featured Trips</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Seasonal Offers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">About Us</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Our Team</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Careers</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Press</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Help Center</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Terms of Service</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Trust & Safety</a></li>
              <li><a href="#" className="transition-colors text-primary-foreground/80 hover:text-accent-foreground">Accessibility</a></li>
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