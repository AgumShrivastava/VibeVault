
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
  const { toast } = useToast();
  // Placeholder data, in a real app this would come from user state/API
  const [username, setUsername] = useState("VibinUser123");
  const [email, setEmail] = useState("user@vibevault.com");
  const [receiveNewsletter, setReceiveNewsletter] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("public"); // public, private, friends

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // API call to update profile
    toast({
      title: "Profile Updated!",
      description: "Your new vibe settings are saved.",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Your Profile</CardTitle>
        <CardDescription>
          Update your personal information and preferences. Keep your vibe fresh!
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your cool username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Password</h4>
            <Button type="button" variant="outline" className="w-full sm:w-auto hover:border-secondary hover:text-secondary">Change Password</Button>
            <p className="text-xs text-muted-foreground">
              For security, password changes are handled separately.
            </p>
          </div>
          
          <div className="space-y-2">
             <h4 className="font-medium text-foreground">Preferences</h4>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter" className="text-base">Receive Vibe Updates</Label>
                <p className="text-xs text-muted-foreground">
                  Get emails about new drops, exclusive deals, and events.
                </p>
              </div>
              <Switch
                id="newsletter"
                checked={receiveNewsletter}
                onCheckedChange={setReceiveNewsletter}
              />
            </div>
          </div>
          
           {/* Example additional preference */}
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <select 
              id="profileVisibility" 
              value={profileVisibility} 
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="public">Public (Everyone can see your cool reviews)</option>
              <option value="private">Private (Only you)</option>
            </select>
          </div>

        </CardContent>
        <CardFooter>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
