import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, CheckCircle, XCircle, Clock, GraduationCap, TrendingUp } from "lucide-react";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApplicationsSummary } from "./ApplicationsSummary";
import { CVModal } from "./CVModal";
import { Application, ApplicationStatus } from "../types/application";
import { mockApplications } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

export function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState<ApplicationStatus>("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [selectedCV, setSelectedCV] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load applications (mock data for now)
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplications(mockApplications);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load applications",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [toast]);

  // Filter applications
  useEffect(() => {
    let filtered = applications.filter(app => app.applicationStatus === activeTab);

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.personalDetails.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.personalDetails.idNumber.includes(searchTerm)
      );
    }

    if (courseFilter !== "all") {
      filtered = filtered.filter(app => app.courseCode === courseFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, activeTab, searchTerm, courseFilter]);

  const updateApplicationStatus = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, applicationStatus: newStatus }
            : app
        )
      );

      toast({
        title: "Success",
        description: `Application ${newStatus.toLowerCase()} successfully`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const getStatusCounts = () => {
    return {
      pending: applications.filter(app => app.applicationStatus === "Pending").length,
      approved: applications.filter(app => app.applicationStatus === "Approved").length,
      rejected: applications.filter(app => app.applicationStatus === "Rejected").length,
      total: applications.length
    };
  };

  const uniqueCourses = [...new Set(applications.map(app => app.courseCode))];
  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-dashboard-header shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Data Science Academy</h1>
                <p className="text-primary-glow">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="text-right">
                <p className="text-sm opacity-90">Total Applications</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <ApplicationsSummary applications={applications} />

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Application Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or ID number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {uniqueCourses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ApplicationStatus)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="Pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending
              <Badge variant="secondary" className="bg-status-pending text-white">
                {statusCounts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="Approved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved
              <Badge variant="secondary" className="bg-success text-white">
                {statusCounts.approved}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="Rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected
              <Badge variant="secondary" className="bg-destructive text-white">
                {statusCounts.rejected}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Pending">
            <ApplicationsTable
              applications={filteredApplications}
              onUpdateStatus={updateApplicationStatus}
              onViewCV={setSelectedCV}
              showActions={true}
            />
          </TabsContent>

          <TabsContent value="Approved">
            <ApplicationsTable
              applications={filteredApplications}
              onUpdateStatus={updateApplicationStatus}
              onViewCV={setSelectedCV}
              showActions={false}
            />
          </TabsContent>

          <TabsContent value="Rejected">
            <ApplicationsTable
              applications={filteredApplications}
              onUpdateStatus={updateApplicationStatus}
              onViewCV={setSelectedCV}
              showActions={false}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* CV Modal */}
      <CVModal
        application={selectedCV}
        isOpen={!!selectedCV}
        onClose={() => setSelectedCV(null)}
      />
    </div>
  );
}