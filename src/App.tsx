import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";

// File: frontend/src/App.tsx
function App() {
  const navigation = useNavigation();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (navigation.state === "loading" || navigation.state === "submitting") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLoader(true);
    }
  }, [navigation.state]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowLoader(true);
    const timer = setTimeout(() => setShowLoader(false), 600);
    return () => clearTimeout(timer);
  }, [location.key]);

  return (
    <>
      {/* Header Component */}
      <Header />
      {showLoader && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-[#0b1a24] via-[#0f2533] to-[#0b1a24] text-white">
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-18 w-40 overflow-hidden">
              <div className="absolute left-0 top-[48%] h-0.5 w-full bg-gradient-to-r from-cyan-200/30 via-cyan-300/50 to-cyan-200/30" />
              <div className="absolute left-0 top-[58%] h-0.5 w-full bg-gradient-to-r from-cyan-200/20 via-cyan-300/40 to-cyan-200/20" />

              <div className="absolute inset-0 flex items-center">
                <div className="relative flex items-center gap-2 animate-[minecart_1.4s_ease-in-out_infinite]">
                  <div className="h-9 w-12 rounded-sm border border-cyan-100/70 bg-gradient-to-br from-cyan-50 via-sky-200 to-cyan-100 shadow-[0_10px_30px_-14px_rgba(94,234,212,0.7)]" />
                  <div className="flex items-end gap-2">
                    <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)] animate-[wheelspin_0.9s_linear_infinite]" />
                    <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)] animate-[wheelspin_0.9s_linear_infinite]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Loading your minecart</p>
              <p className="text-xs text-cyan-200/80">Please wait while we ready the next page…</p>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="">
        <Outlet />
      </main>
      {/* Footer Component */}
      <Footer />
    </>
  );
}

export default App;
