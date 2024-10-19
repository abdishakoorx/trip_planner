import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";

const data = [
  {
    name: "John Doe",
    position: "Teacher",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jane Smith",
    position: "Product Manager",
    image: "https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "David Johnson",
    position: "Designer",
    image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Emily Davis",
    position: "Economist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Michael Wilson",
    position: "Police Officer",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sarah Thompson",
    position: "Doctor",
    image: "https://images.unsplash.com/photo-1573496799515-eebbb63814f2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const AvatarList = ({ 
  size = "md", 
  className 
}) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      {data.map((item) => (
        <div
          key={item.name}
          className="group relative -ml-4 first:ml-0 hover:z-10"
        >
          <div className="relative overflow-hidden rounded-full transition-transform duration-200 ease-in-out group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 transition-opacity duration-200 group-hover:opacity-20" />
            <img
              src={item.image}
              alt={item.name}
              className={cn(
                "rounded-full border-2 border-white object-cover shadow-sm",
                sizes[size]
              )}
            />
          </div>
          
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform">
            <div className="invisible rounded-lg bg-white px-3 py-2 shadow-lg ring-1 ring-black/5 group-hover:visible">
              <div className="whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-500">{item.position}</div>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

AvatarList.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

AvatarList.defaultProps = {
  size: 'md',
  className: ''
};

export default AvatarList;