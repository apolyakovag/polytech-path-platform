import { HomePage } from "@/pages/HomePage";
import { PolytechPathPage } from "@/pages/PolytechPathPage";
import { StubPage } from "@/pages/StubPage";
import { useAppRoute } from "@/routing/useAppRoute";

export default function App() {
  const route = useAppRoute();

  if (route === "about") {
    return <HomePage />;
  }

  if (route === "path") {
    return <PolytechPathPage />;
  }

  return <StubPage activeId={route} />;
}



