import { DashboardSmartStats } from "@/components/dashboard-smart-stats";

export default function adminpadge() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      </div>
      <DashboardSmartStats />
    </div>
  );
}