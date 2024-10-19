import { Button } from '../ui/button'
function Header() {
  return (
    <div className='bg-transparent flex items-center justify-between px-16 py-4'>
        {/* logo */}
        <div>
            <img
                src='/logo.webp'
                alt='logo'
                className='h-10 w-60'
            />
        </div>

        {/* buttons */}
        <div className='flex gap-12'>
        <Button>Signup</Button>
        </div>

    </div>
  )
}

export default Header