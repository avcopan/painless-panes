import logoSvg from "/painless-panes-logo.svg";

function Header() {
  return (
    <nav className="navbar bg-base-100 mb-4 gap-4 items-center">
      <img src={logoSvg} alt="Logo" className="h-20" />
      <h1>Painless Panes</h1>
    </nav>
  );
}
export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen max-w-screen-sm">
      <header>
        <Header />
      </header>
      <main className="flex flex-grow flex-col justify-center items-center gap-6">
        {children}
      </main>
    </div>
  );
}
