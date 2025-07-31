import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Application, ApplicationStatus } from "../types/application";
import { format } from "date-fns";

interface ApplicationsTableProps {
  applications: Application[];
  onUpdateStatus: (applicationId: string, newStatus: ApplicationStatus) => void;
  onViewCV: (application: Application) => void;
  showActions: boolean;
}

type SortField = "fullName" | "averageMark" | "submissionDate" | "courseCode";
type SortDirection = "asc" | "desc";

export function ApplicationsTable({ applications, onUpdateStatus, onViewCV, showActions }: ApplicationsTableProps) {
  const [sortField, setSortField] = useState<SortField>("submissionDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedApplications = [...applications].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case "fullName":
        aValue = a.personalDetails.fullName;
        bValue = b.personalDetails.fullName;
        break;
      case "averageMark":
        aValue = a.averageMark;
        bValue = b.averageMark;
        break;
      case "submissionDate":
        aValue = new Date(a.submissionDate).getTime();
        bValue = new Date(b.submissionDate).getTime();
        break;
      case "courseCode":
        aValue = a.courseCode;
        bValue = b.courseCode;
        break;
      default:
        return 0;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = sortedApplications.slice(startIndex, startIndex + itemsPerPage);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-status-pending text-white">Pending</Badge>;
      case "Approved":
        return <Badge className="bg-success text-white">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-destructive text-white">Rejected</Badge>;
    }
  };

  const getMarkColor = (mark: number) => {
    if (mark >= 80) return "text-success";
    if (mark >= 70) return "text-warning";
    return "text-destructive";
  };

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No applications found matching your criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header hover:bg-table-header">
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("fullName")}
                >
                  <div className="flex items-center gap-2">
                    Applicant Name
                    <SortIcon field="fullName" />
                  </div>
                </TableHead>
                <TableHead>ID Number</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("courseCode")}
                >
                  <div className="flex items-center gap-2">
                    Course Code
                    <SortIcon field="courseCode" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("averageMark")}
                >
                  <div className="flex items-center gap-2">
                    Average Mark
                    <SortIcon field="averageMark" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("submissionDate")}
                >
                  <div className="flex items-center gap-2">
                    Submission Date
                    <SortIcon field="submissionDate" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedApplications.map((application) => (
                <TableRow key={application.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    {application.personalDetails.fullName}
                  </TableCell>
                  <TableCell className="font-mono">
                    {application.personalDetails.idNumber}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{application.courseCode}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getMarkColor(application.averageMark)}`}>
                      {application.averageMark.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(application.submissionDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(application.applicationStatus)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewCV(application)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {showActions && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateStatus(application.id, "Approved")}
                            className="h-8 w-8 p-0 text-success border-success hover:bg-success hover:text-white"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateStatus(application.id, "Rejected")}
                            className="h-8 w-8 p-0 text-destructive border-destructive hover:bg-destructive hover:text-white"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, applications.length)} of {applications.length} applications
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}