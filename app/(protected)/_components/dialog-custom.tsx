import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export const CustomDialog = ({ buttonLabel, children }: { buttonLabel: string, children: React.ReactNode }) => {
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="p-0 md:p-12">
        {children}
      </DialogContent>
    </Dialog>
  )
}
