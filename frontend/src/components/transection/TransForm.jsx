import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { extractErrorMessages } from '../../util/errorUtils'



const TRANS_STATUSES = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' }
    
];

function TaskForm({trans, open= true, onOpenChange}) {

    
    // State for form values
    const [formValues, setFormValues] = useState({
        title: '',
        amount: '',
        type: 'income',
        category: ''
    })

    const [validationError, setValidationError] = useState(null)

    useEffect(() => {

        if (trans) {
            setFormValues({
                title: trans.title || '',
                amount: trans.amount || '',
                type: trans.type || 'income',
                category:trans.category || ''
            });
        } else {
            setFormValues({
                title: '',
                amount: '',
                type: 'income',
                category: ''
            });
        }
        setValidationError(null);

    }, [trans, open])

     const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleStatusChange = (value) => {

        setFormValues({
            ...formValues,
            type: value
        })

    }

    


      const handleCancel = () => {
        onOpenChange?.(false)
    }

     const queryClient = useQueryClient()

    // Create Mutation
    const createTransMutation = useMutation({
        mutationFn: async (transData) => {
            const response = await api.post('/transaction', transData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Transaction created successfully:", data);
            toast.success('Transaction created successfully', { description: 'Your transaction has been created.' });
            queryClient.invalidateQueries(['trans']);
            onOpenChange?.(false);
            setFormValues({
                title: '',
                amount: '',
                type: 'income',
                category: ''
            });
        },
        onError: (error) => {
            console.error("Error creating task:", error);
            toast.error(`Error creating task: ${extractErrorMessages(error)}`, { description: 'Please try again.' });
            setValidationError(extractErrorMessages(error));
        }
    })


const updateTransMutation = useMutation({
        mutationFn: async (transData) => {
            const response = await api.put(`/transaction/${trans._id}`, transData);
            return response.data;
        },
        onSuccess: (data) => {

            toast.success('Transaction updated successfully', { description: 'Your transaction has been updated.' });
            queryClient.invalidateQueries(['trans']);
            onOpenChange?.(false);
            setFormValues({
                title: '',
                amount: '',
                type: 'income',
                category: ''
            });
            console.log("Task updated successfully:", data);
        }
        ,
        onError: (error) => {
            console.error("Error updating task:", error);
            toast.error(`Error updating task: ${extractErrorMessages(error)}`, { description: 'Please try again.' });
            setValidationError(extractErrorMessages(error));
        }
    })

     const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValues.title || !formValues.amount || !formValues.category) {
            setValidationError('Fields are required');
            return;
        }

         const transData = {
            title: formValues.title.trim(),
            amount: formValues.amount.trim(),
            type: formValues.type,
            category: formValues.category.trim()
        }

        
        

        if (trans) {
        
        updateTransMutation.mutate(transData);
        } else {
            createTransMutation.mutate(transData);
        }
     }

    //    Get display error from validation or mutation errors
    const displayError = validationError ||
        extractErrorMessages(createTransMutation.error);

    const isLoading = createTransMutation.isIncome || updateTransMutation.isIncome;


  return (
     <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
             <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                        Create New Transaction
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                        Fill in the details below to create a new transaction.
                </DialogDescription>
             </DialogHeader>
             <form onSubmit={handleSubmit} className="space-y-6">

                
                    {displayError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {displayError}
                        </div>
                    )}

                <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter transaction title"
                            required
                        />
                    </div>
                <div className="space-y-2">
                        <Label htmlFor="title">Amount</Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="text"
                            value={formValues.amount}
                            onChange={handleInputChange}
                            placeholder="Enter Amount"
                            required
                        />
                    </div>

                     

                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            value={formValues.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="income" />
                            </SelectTrigger>
                            <SelectContent>
                                {TRANS_STATUSES.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            name="category"
                            type="text"
                            value={formValues.category}
                            onChange={handleInputChange}
                            placeholder="Category"
                            required
                        />
                    </div>
                    
                     

                     <DialogFooter className="flex justify-end space-x-2">

                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>

        

                        <Button type="submit" 
                        disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    {trans ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                trans ? 'Update Transaction' : 'Create Transaction'
                            )}
                            
                        </Button>

                    </DialogFooter>

             </form>
        </DialogContent>
     </Dialog>
  )
}

export default TaskForm