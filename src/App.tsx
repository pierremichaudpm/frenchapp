import { useState, useEffect } from "react";
import { trackEvent } from "./utils/analytics";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import Onboarding from "./components/layout/Onboarding";
import AppShell from "./components/layout/AppShell";
import PanierHome from "./components/panier/PanierHome";
import ThemeView from "./components/panier/ThemeView";
import ChansonsHome from "./components/chansons/ChansonsHome";
import SongPlayer from "./components/chansons/SongPlayer";
import JourneeHome from "./components/journee/JourneeHome";
import TrousseHome from "./components/trousse/TrousseHome";
import MonthKit from "./components/trousse/MonthKit";
import LivreForm from "./components/livre/LivreForm";
import SettingsPage from "./components/layout/SettingsPage";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem("cari-onboarded"),
  );

  useEffect(() => {
    trackEvent('app_open');
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider>
        {showOnboarding && (
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        )}
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<PanierHome />} />
              <Route path="/mots/:themeId" element={<ThemeView />} />
              <Route path="/chansons" element={<ChansonsHome />} />
              <Route path="/chansons/:songId" element={<SongPlayer />} />
              <Route path="/journee" element={<JourneeHome />} />
              <Route path="/trousse" element={<TrousseHome />} />
              <Route path="/trousse/:kitId" element={<MonthKit />} />
              <Route path="/livre" element={<LivreForm />} />
              <Route path="/parametres" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
