import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  { to: "/", match: ["/", "/mots"], emoji: "🖼️", label: "Mots" },
  { to: "/chansons", match: ["/chansons"], emoji: "🎵", label: "Chansons" },
  { to: "/journee", match: ["/journee"], emoji: "🌅", label: "Journée" },
  { to: "/trousse", match: ["/trousse"], emoji: "📦", label: "Trousse" },
  { to: "/livre", match: ["/livre"], emoji: "📖", label: "Livre" },
];

export default function BottomNav() {
  const location = useLocation();

  const isTabActive = (match: string[]) => {
    return match.some((m) => {
      if (m === "/") return location.pathname === "/";
      return location.pathname.startsWith(m);
    });
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-brume z-50 safe-bottom"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isTabActive(tab.match);
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-col items-center py-2 px-1 min-w-[64px] transition-all ${
                active ? "text-primary" : "text-muted hover:text-dark"
              }`}
            >
              {active && (
                <span className="absolute -top-[1px] left-3 right-3 h-[3px] bg-primary rounded-b-full" aria-hidden="true" />
              )}
              <span
                className={`text-2xl transition-transform ${active ? "scale-110" : ""}`}
                aria-hidden="true"
              >
                {tab.emoji}
              </span>
              <span
                className={`text-xs mt-0.5 ${active ? "font-bold" : "font-medium"}`}
              >
                {tab.label}
              </span>
              {active && (
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-0.5" aria-hidden="true" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
