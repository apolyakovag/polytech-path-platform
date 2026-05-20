import { PlatformNavBar } from "@/components/home/PlatformNavBar";
import type { NavItemId } from "@/data/homeContent";
import { NAV_ITEMS } from "@/data/homeContent";
import { PageContainer } from "@/layouts/PageContainer";

interface StubPageProps {
  activeId: NavItemId;
}

export function StubPage({ activeId }: StubPageProps) {
  const label = NAV_ITEMS.find((item) => item.id === activeId)?.label ?? "";

  return (
    <div className="min-h-screen bg-page text-primary">
      <PlatformNavBar activeId={activeId} />
      <PageContainer className="py-20">
        <h1 className="font-roboto-flex text-heading-h2 text-primary">{label}</h1>
        <p className="mt-4 text-secondary">Раздел в разработке.</p>
      </PageContainer>
    </div>
  );
}



