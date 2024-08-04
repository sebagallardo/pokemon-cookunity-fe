import { useUser } from '@/services/auth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: ReactNode;
}
export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return props.children;
};
