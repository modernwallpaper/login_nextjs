//Just a simple header component

export const PageHeader = ({ label }: { label: string }) => {
  return(
    <p className="text-2xl font-semibold">
      {label}
    </p>
  )
}
