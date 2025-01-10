import { Button } from '../ui/button'
import { History, Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from 'react-router-dom'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

function Header() {
  return (
    <div className='flex items-center justify-between px-4 py-4 bg-transparent md:px-12 lg:px-16'>
      <div>
        <Link to='/'>
          <img
            src='/logo.webp'
            alt='logo'
            className='h-8 md:h-10 w-30 md:w-45 lg:w-60'
          />
        </Link>
      </div>
      <div className='flex items-center gap-12'>
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
                      <History />  <p className='hidden md:block'>History</p>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Trips</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-white bg-secondary/90 hover:bg-secondary rounded-2xl">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="ghost" className="text-black bg-orange-500/90 hover:bg-orange-500 rounded-2xl">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  )
}

export default Header