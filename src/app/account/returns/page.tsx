
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, History, HelpCircle } from "lucide-react";
import Link from "next/link";

// Mock return request type
interface ReturnRequest {
  orderId: string;
  itemSku: string;
  reason: string;
  details?: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  date: string;
}

export default function ReturnsPage() {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [itemSku, setItemSku] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder for past return requests
  const [pastReturns, setPastReturns] = useState<ReturnRequest[]>([
    { orderId: "VV-1001", itemSku: "VV-HD-NG-001", reason: "Wrong Size", status: "Completed", date: "2024-07-20"},
    { orderId: "VV-0985", itemSku: "VV-TS-GL-002", reason: "Not as expected", status: "Approved", date: "2024-07-10"},
  ]);

  const handleSubmitReturn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newReturn: ReturnRequest = { orderId, itemSku, reason, details, status: "Pending", date: new Date().toISOString().split('T')[0]};
    setPastReturns(prev => [newReturn, ...prev]);

    toast({
      title: "Return Request Submitted",
      description: "We'll review your request and get back to you soon. Keep an eye on your email!",
    });
    setOrderId("");
    setItemSku("");
    setReason("");
    setDetails("");
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center"><RotateCcw className="mr-3 h-7 w-7"/>Request a Return</CardTitle>
          <CardDescription>
            Not vibing with your order? Let's sort it out. Please fill out the form below.
            Check our <Link href="/return-policy" className="text-secondary underline hover:text-secondary/80">Return Policy</Link> for more details.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitReturn}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g., VV-1001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemSku">Item SKU / Product Name</Label>
                <Input id="itemSku" value={itemSku} onChange={(e) => setItemSku(e.target.value)} placeholder="e.g., VV-HD-NG-001 or Neon Drip Hoodie" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Return</Label>
              <Select value={reason} onValueChange={setReason} required>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wrong-size">Wrong Size/Fit</SelectItem>
                  <SelectItem value="defective">Damaged or Defective</SelectItem>
                  <SelectItem value="not-as-described">Not as Described</SelectItem>
                  <SelectItem value="changed-mind">Changed My Mind</SelectItem>
                  <SelectItem value="other">Other (Please specify below)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Any extra info that might help us process your return faster." />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? "Submitting..." : "Submit Return Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><History className="mr-2 h-5 w-5"/>Return History</CardTitle>
          <CardDescription>Check the status of your past return requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {pastReturns.length > 0 ? (
            <ul className="space-y-4">
              {pastReturns.map((ret, index) => (
                <li key={index} className="p-3 border rounded-md bg-background/50 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">Order: {ret.orderId} - Item: {ret.itemSku}</p>
                    <p className="text-xs text-muted-foreground">Reason: {ret.reason} | Submitted: {ret.date}</p>
                  </div>
                  <Badge variant={ret.status === 'Completed' || ret.status === 'Approved' ? 'default' : ret.status === 'Rejected' ? 'destructive' : 'outline'}>
                    {ret.status}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No return requests found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
