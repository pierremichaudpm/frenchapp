import { Outlet, Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import ModeToggle from "./ModeToggle";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-light flex flex-col">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>

      {/* Header */}
      <header className="bg-dark text-white px-4 py-4 flex items-center justify-between sticky top-0 z-50" role="banner">
        <Link to="/" className="flex items-center" aria-label="Accueil CARI Francisation">
          <img
            src="/logos/cari-logo-white.png"
            alt="CARI St-Laurent"
            className="h-[4.25rem]"
          />
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link
            to="/parametres"
            className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-lg hover:bg-white/25 transition-colors"
            aria-label="Paramètres"
          >
            ⚙
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1 pb-20 overflow-y-auto" role="main">
        <div className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
