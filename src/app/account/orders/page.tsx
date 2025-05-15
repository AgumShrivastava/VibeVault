
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package, ShoppingCart, Info } from "lucide-react";
import { mockProducts } from "@/lib/mock-data"; // For sample product images/names

// Mock order type
interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}
interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "VV-1001",
    date: "2024-07-15",
    status: "Delivered",
    total: 99.98,
    items: [
      { productId: mockProducts[0].id, productName: mockProducts[0].name, productImage: mockProducts[0].images[0], quantity: 1, price: 69.99 },
      { productId: mockProducts[1].id, productName: mockProducts[1].name, productImage: mockProducts[1].images[0], quantity: 1, price: 29.99 },
    ],
  },
  {
    id: "VV-1002",
    date: "2024-07-20",
    status: "Shipped",
    total: 15.99,
    items: [
      { productId: mockProducts[3].id, productName: mockProducts[3].name, productImage: mockProducts[3].images[0], quantity: 1, price: 15.99 },
    ],
  },
  {
    id: "VV-1003",
    date: "2024-07-22",
    status: "Processing",
    total: 12.99,
    items: [
      { productId: mockProducts[4].id, productName: mockProducts[4].name, productImage: mockProducts[4].images[0], quantity: 1, price: 12.99 },
    ],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In a real app, fetch orders from an API
    setOrders(mockOrders);
  }, []);

  const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
      case "Delivered": return "default"; // Default is primary, fits neon green
      case "Shipped": return "secondary"; // Secondary is purple
      case "Processing": return "outline"; // Outline will use foreground
      case "Cancelled": return "destructive";
      default: return "outline";
    }
  };

  if (orders.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Your Orders</CardTitle>
          <CardDescription>Track your past and current Vibe Vault orders.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No orders yet!</h3>
          <p className="text-muted-foreground mb-6">Looks like your Vibe Vault is empty. Time to snag some fresh gear!</p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Your Orders</CardTitle>
        <CardDescription>Track your past and current Vibe Vault orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="hidden sm:table-cell font-medium">{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild className="hover:text-primary">
                    {/* This would link to a specific order detail page */}
                    <Link href={`/account/orders/${order.id}`}>
                      <Info className="mr-1 h-4 w-4"/> Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">Showing {orders.length} most recent orders.</p>
        </CardFooter>
    </Card>
  );
}
