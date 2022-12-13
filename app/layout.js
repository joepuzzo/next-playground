import Nav from "../components/Nav";
import '../styles/globals.css'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <Nav />
        <main className="main">
        {children}
        </main>
        <footer className="footer"></footer>
      </body>
    </html>)
}