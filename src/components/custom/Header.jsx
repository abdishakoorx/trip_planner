import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { History, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { toast } from 'sonner'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      GetUserProfile(codeResponse)
        .catch(error => {
          toast.error('Login failed. Please try again.', error);
        });
    },
    onError: () => {
      toast.error('Google login failed. Please try again.');
    }
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json'
          }
        }
      );

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);

      // Close the dialog after successful login
      setOpenDialog(false);

      // Show success message
      toast.success('Successfully logged in!');

      return response.data;
    } catch (error) {
      toast.error('Failed to login. Please try again.');
      throw error;
    }
  };


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
      {/* buttons */}
      <div className='flex items-center gap-12'>
        {user ? (
          <div className='flex items-center gap-6'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href='/create-trip'>
                    <Button variant='ghost' className='text-white bg-secondary/90 hover:bg-secondary rounded-2xl'>
                      <Plus /> <p className='hidden md:block'>Create Trip</p>
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Trip</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href='/history'>
                    <Button variant='ghost' className='text-white bg-orange-500/90 hover:bg-orange-500 rounded-2xl'>
                      <History />  <p className='hidden md:block'>History</p>
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Trips</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="object-cover w-10 h-10 border-2 border-gray-200 rounded-full"
                  referrerPolicy="no-referrer"  // Important for Google profile images
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Signup</Button>
        )}
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img
                src="/logo1.png"
                alt="logo"
                className="h-10 w-60"
              />
            </DialogTitle>
            <DialogDescription>
              <Button className="w-full mt-8" onClick={() => login()}>
                <img
                  src="/google.svg"
                  alt="google"
                  className="w-6 h-6 mr-2"
                />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header