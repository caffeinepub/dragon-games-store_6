import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSaveCallerUserProfile } from "../hooks/useQueries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";

interface UserProfileSetupProps {
  open: boolean;
}

export function UserProfileSetup({ open }: UserProfileSetupProps) {
  const [name, setName] = useState("");
  const saveProfile = useSaveCallerUserProfile();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <Dialog open={open} modal>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Welcome to Dragon Games Store!</DialogTitle>
          <DialogDescription>
            Please enter your name to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={saveProfile.isPending}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={saveProfile.isPending || !name.trim()}
          >
            {saveProfile.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
