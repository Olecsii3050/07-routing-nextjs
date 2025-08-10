export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header>Layout</header>
      {children}
    </>
  )
}