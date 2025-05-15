
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Bell, Shield, Palette } from "lucide-react";

export default function AccountSettingsPage() {
  const { toast } = useToast();

  // Mock settings state
  const [notifications, setNotifications] = useState({
    newDrops: true,
    promotions: true,
    orderUpdates: true,
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [theme, setTheme] = useState("dark"); // 'dark', 'light', 'system'

  const handleSaveChanges = () => {
    // Simulate API call to save settings
    toast({
      title: "Settings Saved!",
      description: "Your account settings have been updated.",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center"><Bell className="mr-3 h-7 w-7"/>Notification Settings</CardTitle>
          <CardDescription>Choose what you want to be notified about. Stay in the loop!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingItem
            id="newDrops"
            label="New Product Drops"
            description="Get notified when fresh items hit the Vault."
            checked={notifications.newDrops}
            onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newDrops: checked }))}
          />
          <SettingItem
            id="promotions"
            label="Promotions & Special Offers"
            description="Receive updates on sales and exclusive deals."
            checked={notifications.promotions}
            onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, promotions: checked }))}
          />
          <SettingItem
            id="orderUpdates"
            label="Order & Shipping Updates"
            description="Stay informed about your order status."
            checked={notifications.orderUpdates}
            onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, orderUpdates: checked }))}
          />
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center"><Shield className="mr-3 h-7 w-7"/>Security Settings</CardTitle>
          <CardDescription>Manage your account security preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingItem
            id="twoFactorAuth"
            label="Two-Factor Authentication (2FA)"
            description="Add an extra layer of security to your account."
            checked={twoFactorAuth}
            onCheckedChange={setTwoFactorAuth}
          />
          {twoFactorAuth && (
            <Button variant="outline" className="hover:border-secondary hover:text-secondary">Configure 2FA</Button>
          )}
          <div>
             <Label className="text-base font-medium">Connected Devices</Label>
             <p className="text-xs text-muted-foreground mb-2">Manage devices logged into your account.</p>
             <Button variant="outline" className="hover:border-secondary hover:text-secondary">Manage Devices</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Theme setting is more of an app-wide setting, but could be here as a user preference */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center"><Palette className="mr-3 h-7 w-7"/>Appearance</CardTitle>
          <CardDescription>Customize how Vibe Vault looks for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
            <p className="text-xs text-muted-foreground mb-2">Choose your preferred Vibe Vault theme.</p>
             <select 
              id="theme" 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="dark">Dark Vibe (Default)</option>
              <option value="light" disabled>Light Vibe (Coming Soon!)</option>
              <option value="system" disabled>System Default (Coming Soon!)</option>
            </select>
          </div>
        </CardContent>
      </Card>


      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 text-primary-foreground">Save All Settings</Button>
      </div>
    </div>
  );
}

interface SettingItemProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ id, label, description, checked, onCheckedChange }) => (
  <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
    <div className="space-y-0.5">
      <Label htmlFor={id} className="text-base">{label}</Label>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={label}
    />
  </div>
);
