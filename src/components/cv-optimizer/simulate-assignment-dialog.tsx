
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface SimulateAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  assignmentTitle: string;
}

export function SimulateAssignmentDialog({ isOpen, onOpenChange, assignmentTitle }: SimulateAssignmentDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl font-headline">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            Assignment Submitted!
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2 text-base">
            <strong className="block text-foreground">Assignment:</strong> {assignmentTitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">Grade:</span> <Badge variant="secondary" className="text-lg">95/100</Badge>
          </div>
          <div>
            <p className="font-medium text-foreground">Feedback:</p>
            <p className="text-muted-foreground">Great work! You've clearly understood the core concepts and applied them effectively. Consider exploring advanced applications next.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">AI Coach Tip:</p>
            <p className="text-muted-foreground">Keep practicing this skill by applying it to different scenarios or a personal project. Repetition builds mastery!</p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
