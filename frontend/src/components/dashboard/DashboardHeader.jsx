import React from 'react'
import { Banknote, BanknoteIcon, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button';
import useAuthStore from '../../lib/store/authStore';
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query';

function DashboardHeader() {

    const {user, clearAuth} = useAuthStore();
    const navigate = useNavigate()
    const queryClient = useQueryClient();

     const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            clearAuth();
            queryClient.clear();
            navigate("/login", { replace: true });
        }
    }

  return (
    <header className='bg-card border-b border-border shadow-sm'>
  <div className='w-full px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
    {/* Left side: Logo + Title */}
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <BanknoteIcon className="h-4 w-4 text-primary-foreground" />
      </div>
      <h1 className="text-lg sm:text-xl font-semibold text-foreground">Income Dashboard</h1>
    </div>

    {/* Right side: User Info + Logout Button */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <span className="text-sm text-muted-foreground">
        Welcome,
        <span className="font-medium text-foreground ml-1">
          {user?.name || "User"}
        </span>
      </span>

      <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
        Logout
      </Button>
    </div>
  </div>
</header>

  )
}

export default DashboardHeader