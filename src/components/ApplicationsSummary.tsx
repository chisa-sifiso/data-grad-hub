import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle, XCircle, Clock, TrendingUp, BookOpen } from "lucide-react";
import { Application } from "../types/application";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ApplicationsSummaryProps {
  applications: Application[];
}

export function ApplicationsSummary({ applications }: ApplicationsSummaryProps) {
  const getStatusCounts = () => {
    return {
      pending: applications.filter(app => app.applicationStatus === "Pending").length,
      approved: applications.filter(app => app.applicationStatus === "Approved").length,
      rejected: applications.filter(app => app.applicationStatus === "Rejected").length,
      total: applications.length
    };
  };

  const getAverageMarkByCourse = () => {
    const courseGroups = applications.reduce((acc, app) => {
      if (!acc[app.courseCode]) {
        acc[app.courseCode] = { total: 0, count: 0 };
      }
      acc[app.courseCode].total += app.averageMark;
      acc[app.courseCode].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(courseGroups).map(([course, data]) => ({
      course,
      averageMark: Math.round(data.total / data.count * 10) / 10
    }));
  };

  const getOverallAverageMark = () => {
    if (applications.length === 0) return 0;
    const total = applications.reduce((sum, app) => sum + app.averageMark, 0);
    return Math.round(total / applications.length * 10) / 10;
  };

  const statusCounts = getStatusCounts();
  const courseAverages = getAverageMarkByCourse();
  const overallAverage = getOverallAverageMark();

  // Data for charts
  const pieData = [
    { name: "Pending", value: statusCounts.pending, color: "hsl(var(--status-pending))" },
    { name: "Approved", value: statusCounts.approved, color: "hsl(var(--success))" },
    { name: "Rejected", value: statusCounts.rejected, color: "hsl(var(--destructive))" }
  ].filter(item => item.value > 0);

  const barData = courseAverages.map(item => ({
    ...item,
    course: item.course.replace("DS-", "")
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Summary Cards */}
      <Card className="bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Total Applications</CardTitle>
          <Users className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusCounts.total}</div>
          <p className="text-xs opacity-75">All time submissions</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-status-pending to-warning text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Pending Review</CardTitle>
          <Clock className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusCounts.pending}</div>
          <Progress 
            value={statusCounts.total > 0 ? (statusCounts.pending / statusCounts.total) * 100 : 0} 
            className="mt-2 bg-white/20" 
          />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-success to-emerald-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Approved</CardTitle>
          <CheckCircle className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusCounts.approved}</div>
          <p className="text-xs opacity-75">
            {statusCounts.total > 0 ? Math.round((statusCounts.approved / statusCounts.total) * 100) : 0}% approval rate
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent to-cyan-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Average Mark</CardTitle>
          <TrendingUp className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallAverage}%</div>
          <p className="text-xs opacity-75">Across all applications</p>
        </CardContent>
      </Card>

      {/* Charts */}
      <Card className="md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Application Status Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Average Marks by Course
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, "Average Mark"]} />
              <Bar dataKey="averageMark" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}