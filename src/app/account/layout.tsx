
import MainLayout from "@/components/layout/main-layout";
import { AccountSidebarNav } from "@/components/layout/account-sidebar-nav";
import { Separator } from "@/components/ui/separator";
import type { NavItem } from "@/types";
// Lucide icons are now handled in AccountSidebarNav (Client Component)

const sidebarNavItems: NavItem[] = [
  {
    label: "Profile",
    href: "/account/profile",
    iconName: "User",
  },
  {
    label: "Orders",
    href: "/account/orders",
    iconName: "ShoppingBag",
  },
  {
    label: "Returns",
    href: "/account/returns",
    iconName: "RotateCcw",
  },
  {
    label: "Settings",
    href: "/account/settings",
    iconName: "Settings",
  },
   {
    label: "Logout",
    href: "/", // Placeholder for logout functionality
    iconName: "LogOut",
  },
];

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <MainLayout>
      <div className="space-y-6 block">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight text-primary">My Account</h1>
          <p className="text-muted-foreground">
            Manage your account settings, orders, and returns.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <AccountSidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
