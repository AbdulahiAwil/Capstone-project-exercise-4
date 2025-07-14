import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image1 from '../../assets/images/welcome.jpg'
import Image2 from '../../assets/images/authImage.jpg'

function DashboardWelcome({ onCreateTask, showCreateForm }) {
  const backgroundImage = `url(${Image2})`;

  return (
    <Card
      className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 relative overflow-hidden"
      style={{
        backgroundImage: backgroundImage,   // ✅ Sax ah
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <CardHeader className="pb-4 bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 flex flex-col items-start">
            <CardTitle className="text-2xl text-white">Welcome back!</CardTitle>
            <CardDescription className="text-base text-white/80">
              Here's manage your income today.
            </CardDescription>
          </div>
          <Button onClick={onCreateTask}>
            Create Transaction
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Card status */}
      </CardContent>
    </Card>
  );
}

export default DashboardWelcome;
