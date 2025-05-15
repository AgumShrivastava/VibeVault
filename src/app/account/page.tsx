
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, ShoppingBag, RotateCcw, Settings } from 'lucide-react';

export default function AccountPage() {
  // Placeholder user data
  const user = {
    name: "VibinUser123",
    email: "user@vibevault.com",
    joinDate: "2023-10-26",
  };

  const quickLinks = [
    { label: "Your Profile", href: "/account/profile", icon: User, description: "Update your personal info & preferences." },
    { label: "View Orders", href: "/account/orders", icon: ShoppingBag, description: "Track current and past orders." },
    { label: "Manage Returns", href: "/account/returns", icon: RotateCcw, description: "Start a return or check status." },
    { label: "Account Settings", href: "/account/settings", icon: Settings, description: "Manage login, security & notifications." },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Welcome back, {user.name}!</CardTitle>
          <CardDescription>Here's a quick overview of your Vibe Vault account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p><strong className="text-foreground">Email:</strong> <span className="text-muted-foreground">{user.email}</span></p>
          <p><strong className="text-foreground">Vibin' Since:</strong> <span className="text-muted-foreground">{new Date(user.joinDate).toLocaleDateString()}</span></p>
          {/* Placeholder for recent activity or stats */}
          <p className="text-sm text-secondary pt-2">You've got the best vibes on the block!</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        {quickLinks.map(link => (
          <Card key={link.href} className="hover:shadow-primary/20 transition-shadow duration-200 bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-primary">{link.label}</CardTitle>
              <link.icon className="h-6 w-6 text-secondary" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">{link.description}</p>
              <Button asChild variant="outline" className="w-full hover:border-primary hover:text-primary">
                <Link href={link.href}>Go to {link.label.replace("Your ", "").replace("View ", "").replace("Manage ", "")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
