import PropTypes from 'prop-types';
import SignInPlaceholder from "../ui/sign-in-placeholder";
import { useProtectedRoute } from "./useProtectedRoute";

// Component to handle protected routes with modal
export const ProtectedRouteWithModal = ({ children }) => {
  const { isSignedIn, isLoaded } = useProtectedRoute();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // If signed in, show the protected content
  if (isSignedIn) {
    return children;
  }

  // If not signed in, show a placeholder while the modal is opening
  return (
    <SignInPlaceholder />
  );
};

ProtectedRouteWithModal.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRouteWithModal;