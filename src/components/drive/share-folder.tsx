import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShareIcon } from "@/components/icons";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Folder } from "@/store/folders";
import { shareFolder } from "@/app/actions";
export function ShareFolder({ folder }: { folder: Folder | undefined }) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleShare(folderId: string) {
    const { folder: sharedFolder, error } = await shareFolder(folderId, email);

    if (sharedFolder) {
      toast({
        title: "Folder shared",
        description: `The folder ${folder?.name} has been shared with ${email}!`,
      });
    }

    if (error) {
      toast({
        title: "Something went wrong sharing the folder",
        description: JSON.stringify(error),
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Share <strong>{folder?.name}</strong>
          </DialogTitle>
          <DialogDescription>
            Share {folder?.name} with other people in your network.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => handleShare(folder?.id as string)}
            >
              Share
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
