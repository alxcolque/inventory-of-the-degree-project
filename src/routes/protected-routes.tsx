import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores';

interface ProtectedRouteProps {
  roles?: string[];
  permissions?: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, permissions, children }) => {
  const { user, hasPermission, hasRole } = useAuthStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.some((role) => hasRole(role))) {
    return <Navigate to="/" />; // /home
  }

  if (permissions && !permissions.some((permission) => hasPermission(permission))) {
    return <Navigate to="/" />; // /home
  }

  return <>{children}</>;
};

export default ProtectedRoute;
