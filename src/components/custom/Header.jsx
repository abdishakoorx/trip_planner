import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { History, Plus, Menu, X, Compass, User } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container px-4 mx-auto md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center mr-2 rounded-full h-9 w-9 bg-primary">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className={`font-serif text-xl md:text-2xl font-semibold text-primary ${isScrolled ? '' : ''}`}>
                Greatertrips
              </span>
            </Link>
          </div>

          {/* Desktop Navigation (hidden on mobile) */}
          <div className="items-center hidden gap-12 md:flex">
            <SignedIn>
              <div className='flex items-center gap-6'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to='/create-trip'>
                        <Button variant='ghost' className='text-white bg-secondary/90 hover:bg-secondary rounded-2xl'>
                          <Plus /> <p className='hidden md:block'>Create Trip</p>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create Trip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to='/history'>
                        <Button variant='ghost' className='text-black hover:text-black bg-orange-500/90 hover:bg-orange-500 rounded-2xl'>
                          <History /> <p className='hidden md:block'>History</p>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Trips</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex gap-4">
                <SignInButton mode="modal">
                  <Button variant={"outline"} className={`hidden md:flex items-center space-x-1 mr-6 bg-transparent ${isScrolled ? 'text-gray-700 hover:text-accent' : 'text-primary-foreground'} hover:bg-transparent transition-colors`}>
                    <User />
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="hidden md:block btn-primary">Start Planning</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ?
                <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} /> :
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="container px-4 py-6 mx-auto space-y-4">
            <SignedIn>
              <Link to='/create-trip' className="flex items-center py-2 space-x-2 text-gray-700 hover:text-secondary">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Create Trip</span>
              </Link>
              <Link to='/history' className="flex items-center py-2 space-x-2 text-gray-700 hover:text-orange-500">
                <History className="w-5 h-5" />
                <span className="font-medium">Trip History</span>
              </Link>
              <div className="py-2">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col gap-2">
                <SignInButton mode="modal">
                  <Button variant={"outline"} className={`items-center space-x-1 bg-transparent ${isScrolled ? 'text-gray-700 hover:text-accent' : 'text-primary-foreground'} hover:bg-transparent transition-colors`}>
                    <User />
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="btn-primary">Start Planning</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;