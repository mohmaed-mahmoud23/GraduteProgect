"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Package, 
  DollarSign, 
  Users, 
  Activity,   
  FolderTree,
  Tag
} from "lucide-react";
import { useGetProductsQuery, useGetCategoriesQuery, useGetBrandsQuery, useGetorderQuery } from "@/app/redux/slices/ApiSlice";

const chartData = [
  { name: "Jan", revenue: 4000, orders: 240 },
  { name: "Feb", revenue: 3000, orders: 139 },
  { name: "Mar", revenue: 2000, orders: 980 },
  { name: "Apr", revenue: 2780, orders: 390 },
  { name: "May", revenue: 1890, orders: 480 },
  { name: "Jun", revenue: 2390, orders: 380 },
  { name: "Jul", revenue: 3490, orders: 430 },
];

export function DashboardSmartStats() {
  const { data: productsData, isLoading: pLoad } = useGetProductsQuery();
  const { data: categoriesData, isLoading: cLoad } = useGetCategoriesQuery();
  const { data: brandsData, isLoading: bLoad } = useGetBrandsQuery();
  const { data: ordersData, isLoading: oLoad } = useGetorderQuery();

  const products = productsData?.data?.result?.result || [];
  const categories = (categoriesData?.data as any)?.result?.result || [];
  const brands = brandsData?.data?.result?.result || [];
  const orders = ordersData?.data?.result?.result || [];

  const loading = pLoad || cLoad || bLoad || oLoad;

  const stats = [
    { title: "Total Products", value: products.length, change: "+New", isUp: true, icon: Package },
    { title: "Total Categories", value: categories.length, change: "Active", isUp: true, icon: FolderTree },
    { title: "Total Brands", value: brands.length, change: "Verified", isUp: true, icon: Tag },
    { title: "Active Orders", value: orders.length, change: "Processing", isUp: true, icon: Activity },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-8 w-full">
        {/* Skeleton Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-muted/20 animate-pulse border border-border/50"></div>
          ))}
        </div>
        {/* Skeleton Chart */}
        <div className="h-[400px] rounded-xl bg-muted/20 animate-pulse border border-border/50"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="p-2 bg-secondary rounded-lg">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold font-mono">{stat.value}</h3>
                <span className={`flex items-center text-sm font-semibold ${stat.isUp ? "text-emerald-500" : "text-rose-500"}`}>
                  {stat.isUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {stat.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-6">Revenue & Engagement Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)", borderRadius: "8px" }}
                  itemStyle={{ color: "var(--color-foreground)" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col"
        >
          <h3 className="text-lg font-semibold mb-6">System Orders</h3>
          <div className="flex-1 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)", borderRadius: "8px" }}
                />
                <Bar dataKey="orders" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
