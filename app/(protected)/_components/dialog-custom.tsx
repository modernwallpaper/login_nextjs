import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export const CustomDialog = ({ buttonLabel, children }: { buttonLabel: string, children: React.ReactNode }) => {
  return(
    <Dialog>
      <DialogTrigger>
        <Button>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="p-12">
        {children}
      </DialogContent>
    </Dialog>
  )
}
