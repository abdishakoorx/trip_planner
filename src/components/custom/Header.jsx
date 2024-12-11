import { Button } from '../ui/button'
import { History, Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from 'react-router-dom'


function Header() {

  return (
    <div className='flex items-center justify-between px-4 py-4 bg-transparent md:px-12 lg:px-16'>
      {/* logo */}
      <div>
        <a href='/'>
          <img
            src='/logo.webp'
            alt='logo'
            className='h-8 md:h-10 w-30 md:w-45 lg:w-60 '
          />
        </a>
      </div>
      <div className='flex items-center gap-12'>
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
                    <Button variant='ghost' className='text-white bg-orange-500/90 hover:bg-orange-500 rounded-2xl'>
                      <History />  <p className='hidden md:block'>History</p>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Trips</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
      </div>
    </div>
  )
}

export default Header