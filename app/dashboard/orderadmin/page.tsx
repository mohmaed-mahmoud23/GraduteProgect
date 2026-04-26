"use client";

import Image from "next/image";
import { useGetorderQuery } from "@/app/redux/slices/ApiSlice";
import { 
  Package, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle, 
  CreditCard,
  TrendingUp,
  ShoppingBag,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function ADMINSuer() {
  const { data, isLoading, isError } = useGetorderQuery();

  if (isLoading) return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Package className="w-12 h-12 text-primary animate-bounce shadow-xl rounded-full" />
        <p className="text-muted-foreground font-medium text-lg tracking-wide">Loading Orders...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="bg-destructive/10 text-destructive p-8 rounded-2xl border border-destructive/20 flex flex-col items-center gap-4 max-w-sm text-center">
        <div className="p-3 bg-destructive/20 rounded-full">
          <Package className="w-8 h-8" />
        </div>
        <div>
          <p className="font-semibold text-xl">Failed to load orders</p>
          <p className="text-sm opacity-80 mt-1">Please try refreshing the page or check your connection.</p>
        </div>
      </div>
    </div>
  );

  const orders = data?.data?.orders || [];
  
  // Calculate stats
  const totalRevenue = orders.reduce((acc: number, order: any) => acc + (order.total || 0), 0);
  const pendingOrders = orders.filter((o: any) => o.status === 0).length;
  const completedOrders = orders.filter((o: any) => o.status !== 0).length;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  };

  return (
    <div className="p-6 md:p-8 min-h-screen bg-background/50 text-foreground overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1 relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Orders Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base font-medium max-w-xl">
              Monitor customer orders, track statuses, and manage fulfillment all in one elegant interface.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card/40 backdrop-blur-md border-border/40 hover:bg-card/60 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{totalRevenue.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">EGP</span></div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/40 backdrop-blur-md border-border/40 hover:bg-card/60 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <ShoppingBag className="w-4 h-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{orders.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/40 backdrop-blur-md border-border/40 hover:bg-card/60 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <Clock className="w-4 h-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{pendingOrders}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/40 backdrop-blur-md border-border/40 hover:bg-card/60 transition-colors shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{completedOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 z-10 relative"
        >
          {orders?.map((order: any) => (
            <motion.div key={order._id} variants={itemAnim} className="h-full">
              <Card className="flex flex-col h-full bg-card/40 backdrop-blur-lg hover:bg-card/80 transition-all duration-300 border-border/40 shadow-sm hover:shadow-md hover:-translate-y-1">
                <CardHeader className="pb-4 border-b border-border/20">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-background/60 shadow-sm">
                          #{order.orderId?.slice(-6) || "ID"}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium bg-background/40 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                        </span>
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2 mt-3 font-semibold tracking-tight">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <span className="truncate">{order.createdBy?.firstName} {order.createdBy?.lastName}</span>
                      </CardTitle>
                    </div>
                    {order.status === 0 ? (
                      <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20 capitalize font-semibold shadow-sm shrink-0">
                        Pending
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 capitalize font-semibold shadow-sm shrink-0">
                        Done
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-6 pt-6">
                  {/* Contact & Address */}
                  <div className="grid gap-3 text-sm bg-background/40 p-4 rounded-xl border border-border/30">
                    <div className="flex items-start gap-3 text-muted-foreground group">
                      <div className="p-1.5 rounded-md bg-background/60 border border-border/40 group-hover:bg-primary/5 transition-colors">
                        <MapPin className="w-4 h-4 text-primary/70" />
                      </div>
                      <span className="line-clamp-2 leading-relaxed mt-1 font-medium text-foreground/80">{order.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground group">
                      <div className="p-1.5 rounded-md bg-background/60 border border-border/40 group-hover:bg-primary/5 transition-colors">
                        <Phone className="w-4 h-4 text-primary/70" />
                      </div>
                      <span className="font-medium text-foreground/80 tracking-wide">{order.phone}</span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold flex items-center gap-2 text-foreground/90">
                        <Package className="w-4 h-4 text-primary/70" />
                        Products ({order.products?.length || 0})
                      </p>
                    </div>
                    
                    <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/60 hover:[&::-webkit-scrollbar-thumb]:bg-border">
                      {order.products?.map((item: any) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-background/40 hover:bg-background/80 transition-colors border border-border/30 shadow-sm"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/50 shadow-inner">
                            {item.productId?.images?.[0]?.secure_url ? (
                              <Image
                                src={item.productId.images[0].secure_url}
                                alt={item.productId.name || "Product"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted">
                                <Package className="w-5 h-5 text-muted-foreground/40" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate text-foreground/90" title={item.productId?.name}>
                              {item.productId?.name || "Unknown Product"}
                            </h4>
                            <p className="text-xs text-muted-foreground font-medium mt-1 inline-flex items-center gap-1 bg-background/50 px-1.5 py-0.5 rounded-md border border-border/30">
                              {item.quantity} <span className="opacity-50">×</span> {item.unitPrice} EGP
                            </p>
                          </div>

                          <div className="text-right font-bold text-sm whitespace-nowrap pl-2">
                            {(item.quantity * item.unitPrice).toLocaleString()} EGP
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-5 pb-5 bg-background/20 border-t border-border/20 mt-auto rounded-b-xl">
                  <div className="flex w-full justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary/60" />
                      Total Amount
                    </span>
                    <span className="text-2xl font-black tracking-tight text-primary">
                      {order.total?.toLocaleString() || 0} <span className="text-base font-bold opacity-80">EGP</span>
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {(!orders || orders.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-border/50 rounded-3xl bg-card/20 backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-2 shadow-inner border border-border/50">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">No orders yet</h3>
              <p className="text-muted-foreground max-w-sm mt-2 text-sm">When customers place orders on your store, they will appear right here.</p>
            </div>
          </div>
        )}

      </div>
      
      {/* Decorative background element */}
      <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}