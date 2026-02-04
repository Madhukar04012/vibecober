import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppLayout } from "./components/layout/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { GeneratorPage } from "./pages/GeneratorPage";
import { PreviewPage } from "./pages/PreviewPage";
import { BuildPage } from "./pages/BuildPage";

function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AppLayoutRoute() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition className="min-h-screen">
              <LandingPage />
            </PageTransition>
          }
        />

        <Route element={<AppLayoutRoute />}>
          <Route
            path="/generate"
            element={
              <PageTransition>
                <GeneratorPage />
              </PageTransition>
            }
          />
          <Route
            path="/preview"
            element={
              <PageTransition>
                <PreviewPage />
              </PageTransition>
            }
          />
          <Route
            path="/build"
            element={
              <PageTransition>
                <BuildPage />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
