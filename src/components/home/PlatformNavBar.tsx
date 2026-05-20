import { Bell } from "lucide-react";
import { Avatar, IconButton } from "borrom-ds-test";
import { NAV_ITEMS, type NavItemId } from "@/data/homeContent";
import { PageContainer } from "@/layouts/PageContainer";
import { CareerPolytechLogo } from "@/components/home/CareerPolytechLogo";
import { navHref } from "@/routing/useAppRoute";

interface PlatformNavBarProps {
  activeId?: NavItemId;
}

export function PlatformNavBar({ activeId = "about" }: PlatformNavBarProps) {
  return (
    <header className="border-b border-generic bg-page">
      <PageContainer className="py-3">
        <div className="flex items-center gap-4 lg:gap-6">
          <a
            href={navHref("about")}
            className="flex shrink-0 items-center gap-2.5 rounded-xl bg-generic-heavy px-3 py-2 sm:px-4 sm:py-2.5"
          >
            <CareerPolytechLogo className="shrink-0" />
            <span className="whitespace-nowrap font-roboto-flex text-sm text-primary">
              <span className="font-normal">Карьера </span>
              <span className="font-semibold">Политех</span>
            </span>
          </a>

          <nav
            className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto sm:gap-6 lg:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Основная навигация"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={navHref(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`shrink-0 whitespace-nowrap font-roboto-flex text-sm transition-colors ${
                    isActive
                      ? "font-medium text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <IconButton
              type="ghost"
              color="inverse"
              size="sm"
              icon={Bell}
              aria-label="Уведомления"
            />
            <Avatar size={36} src="" initials="АП" alt="Профиль" />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}



