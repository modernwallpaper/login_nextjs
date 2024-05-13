export default function Layout({ children }: { children: React.ReactNode }) {
  return(
    <main className="h-full flex items-center justify-center">
      {children}
    </main>
  )
}
