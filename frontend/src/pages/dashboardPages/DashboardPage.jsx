import React, { useState } from 'react'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import DashboardWelcome from '../../components/dashboard/DashboardWelcome'
import TransForm from '../../components/transection/TransForm'
import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { Loader } from 'lucide-react'
import TransactionList from '../../components/transection/TransactionList'

function DashboardPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTrans, setEditingTrans] = useState(null)

  const handleCreateTaskClick = () => {
        setShowCreateForm(true)
    }

     const handleFormClose = () => {
        setShowCreateForm(false)
        setEditingTrans(null)
    }

    const transactionQuery = useQuery({
        queryKey: ['trans'],
        queryFn: async () => {
            const response = await api.get('/transaction');
            return response.data;
        },
        retry: 1,
    })

     
    if (transactionQuery.isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }

    const handleEditTrans = (trans) => {
        setEditingTrans(trans)
        setShowCreateForm(true)
    }

    const handleDeleteTrans = async (transId) => {
      //TODO: Mutation delete transaction
    }
    
    const handleStatusChange = async (transId, newStatus) => {
       // TODO : MUTATION TO UPDATE Transaction STATUS
        // This function will be called when the status of a transaction is changed
    }

     if (transactionQuery.isError) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <p className='text-red-500'>Error loading transaction: {transactionQuery.error.message}</p>
            </div>
        )
    }


  return (
    <div className='min-h-screen bg-background'>

      {/* Header */}

        <DashboardHeader />

      {/* Main content*/}

       <main className='max-w-7xl mx-auto  px-4 py-8 space-y-6'>
          {/* Welcome Section */}
           <DashboardWelcome 
            showCreateForm={showCreateForm}
            onCreateTask={handleCreateTaskClick}
          />


          <TransactionList 
            trans={transactionQuery.data || []}
            isLoading={transactionQuery.isLoading}
            onEdit={handleEditTrans}
            onDelete={handleDeleteTrans}
            onStatusChange={handleStatusChange}
          
          />
       </main>

        {/* Task section */}

      <TransForm
        trans={editingTrans}
        open={showCreateForm || !!editingTrans}
        onOpenChange={handleFormClose}
      />
    </div>
  )
}

export default DashboardPage