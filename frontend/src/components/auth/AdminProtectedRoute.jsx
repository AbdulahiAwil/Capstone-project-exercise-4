
import { useQuery } from '@tanstack/react-query';
import { AlignJustify, Loader, Parentheses } from 'lucide-react';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router'; // Saxan halkan
import api from '../../lib/api/apiClient';
import useAuthStore from '../../lib/store/authStore';
function AdminProtectedRoute({ children }) {
    const location = useLocation(); // Waxaan helay location object-ka
  const { user, setAuth, clearAuth, token } = useAuthStore();

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get('/auth/me',{
        headers: {
        Authorization: `Bearer ${token}`
    }
      });
      return response.data;
    },
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, error, clearAuth]);

  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data, token);
      
    }
  }, [isSuccess, data, setAuth, token]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin text-destructive text-3xl" />
      </div>
    );
  }

  if (isError) {
    console.log('error here', error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    console.log('user not found', user);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if(user.role !== 'admin'){
    return(
        <div className="min-h-screen flex flex-col p-4 bg-gray-100">
      <div className="bg-red-400 text-white mr- w-full py-4 px-6 text-lg font-semibold flex items-center">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <AlignJustify strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 8v4m0 4h.01" />
        </svg>
        Unauthorized
      </div>
      

      <div className="bg-white border-t border-gray-200 p-6 w-full text-gray-700">
        You are not authorized to view this page
      </div>
    </div>
    )
  }


  return children;


  
}

export default AdminProtectedRoute