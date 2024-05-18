import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export const CustomDialog = ({ buttonLabel, children, variant }: 
  { 
    buttonLabel: string, 
    children: React.ReactNode, 
    variant: "default" | "ghost" | "outline" | "link" | "nav_link" | "dropdown" | "secondary" | "destructive",
  }) => {
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="p-0 md:p-20">
        {children}
      </DialogContent>
    </Dialog>
  )
}
