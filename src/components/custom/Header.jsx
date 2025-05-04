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
                        <Button
                          variant={'outline'}
                          className="flex items-center px-4 py-2 space-x-2 text-white transition-colors border-accent bg-accent"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="hidden md:inline">Create Trip</span>
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
                        <Button
                          variant={'outline'}
                          className={`flex items-center space-x-2 transition-colors
                          ${isScrolled
                              ? 'bg-transparent text-primary hover:text-primary'
                              : 'bg-transparent text-white'} 
                          px-4 py-2 hover:bg-transparent font-mono border-primary`}
                        >
                          <History className="w-4 h-4" />
                          <span className="hidden md:inline">History</span>
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
                  <Button
                    variant={"outline"}
                    className={`hidden md:flex items-center space-x-1 mr-6 bg-transparent 
                    ${isScrolled
                        ? 'text-gray-700 hover:text-accent'
                        : 'text-primary-foreground'}
                      hover:bg-transparent transition-colors`}
                  >
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
        <div className="md:hidden fixed inset-x-0 top-[72px] backdrop-blur-sm border-b z-30">
          <div className="container px-4 py-6 mx-auto space-y-4">
            <SignedIn>
              <div className="flex flex-col gap-3">
                <Link to='/create-trip' className="w-full">
                  <Button
                    variant={'outline'}
                    className="flex items-center justify-center w-full gap-2 text-white transition-colors border-accent bg-accent hover:bg-accent/90"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Trip</span>
                  </Button>
                </Link>

                <Link to='/history' className="w-full">
                  <Button
                    variant={'outline'}
                    className={`w-full flex items-center justify-center gap-2 transition-colors
                ${isScrolled
                        ? 'bg-transparent text-primary hover:text-primary hover:bg-primary/10'
                        : 'bg-transparent text-white hover:bg-white/10'} 
                border-primary`}
                  >
                    <History className="w-5 h-5" />
                    <span>History</span>
                  </Button>
                </Link>

                <div className="flex items-center justify-center pt-2 pb-1">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                        userButtonTrigger: "border border-primary/20 p-1 rounded-full hover:bg-primary/10"
                      }
                    }}
                  />
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex flex-col gap-3">
                <SignInButton mode="modal">
                  <Button
                    variant={"outline"}
                    className={`w-full flex items-center justify-center gap-2 bg-transparent 
                ${isScrolled ? 'text-gray-700 hover:text-accent' : 'text-primary-foreground'} 
                hover:bg-transparent/10 transition-colors`}
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button className="flex items-center justify-center w-full btn-primary">
                    Start Planning
                  </Button>
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