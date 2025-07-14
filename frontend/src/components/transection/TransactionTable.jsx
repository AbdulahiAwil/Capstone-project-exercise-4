import React, { useState } from 'react';
import { ClipboardCheck, Edit2, Trash, Loader } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api/apiClient';
import { toast } from "sonner"

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const TransactionTable = ({ transaction = [], emptyMessage, onEdit }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTran, setSelectedTran] = useState(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/transaction/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['trans']);
      toast.success('Transaction deleted successfully');
      setShowDeleteDialog(false);
    },
    onError: (error) => {
      toast.error(`Error deleting transaction: ${error.message}`);
      console.error("Error deleting transaction:", error);
    }
  });

  const handleDeleteConfirm = async () => {
    if (!selectedTran) return;
    await deleteMutation.mutateAsync(selectedTran._id);
  };

  if (transaction.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-sm font-medium text-foreground">No transactions found</h3>
        <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaction.map(tran => (
            <TableRow key={tran._id}>
              <TableCell>{tran.title}</TableCell>
              <TableCell>
                <Badge variant="outline" className={tran.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                  {tran.type}
                </Badge>
              </TableCell>
              <TableCell>{tran.category || '-'}</TableCell>
              <TableCell>${tran.amount}</TableCell>
              <TableCell>{tran.createdAt ? formatDate(tran.createdAt) : '-'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(tran)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedTran(tran);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction{" "}
              <strong>{selectedTran?.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin h-4 w-4" />
                  Deleting...
                </span>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TransactionTable;
