import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, X, User, Mail, Phone, MapPin, BookOpen, TrendingUp } from "lucide-react";
import { Application } from "../types/application";
import { format } from "date-fns";

interface CVModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CVModal({ application, isOpen, onClose }: CVModalProps) {
  if (!application) return null;

  const handleDownloadCV = () => {
    // Convert base64 to blob and download
    try {
      const byteCharacters = atob(application.cvFile);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = application.cvFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-status-pending";
      case "Approved": return "bg-success";
      case "Rejected": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getMarkColor = (mark: number) => {
    if (mark >= 80) return "text-success";
    if (mark >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <span>Application Details</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(application.applicationStatus)} text-white`}>
                {application.applicationStatus}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="font-medium">{application.personalDetails.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID Number</label>
                  <p className="font-mono">{application.personalDetails.idNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </label>
                  <p>{application.personalDetails.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Phone
                  </label>
                  <p>{application.personalDetails.phoneNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Address
                  </label>
                  <p className="text-sm">{application.personalDetails.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Application Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Course Applied</label>
                  <Badge variant="outline" className="block w-fit mt-1">{application.courseCode}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submission Date</label>
                  <p>{format(new Date(application.submissionDate), "EEEE, MMMM dd, yyyy 'at' h:mm a")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Average Mark
                  </label>
                  <p className={`text-2xl font-bold ${getMarkColor(application.averageMark)}`}>
                    {application.averageMark.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Academic Record */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Final Year Academic Record</h3>
            <div className="grid gap-3">
              {application.finalYearModules.map((module, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{module.moduleName}</p>
                    <p className="text-sm text-muted-foreground font-mono">{module.moduleCode}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getMarkColor(module.mark)}`}>
                      {module.mark}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* CV Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Curriculum Vitae
              </h3>
              <Button onClick={handleDownloadCV} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </div>
            
            {/* CV Preview */}
            <div className="border rounded-lg p-6 bg-muted/30 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="font-medium mb-2">{application.cvFileName}</p>
              <p className="text-sm text-muted-foreground mb-4">
                PDF document ready for preview
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={handleDownloadCV}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Open CV in new tab for preview
                    const blob = new Blob([atob(application.cvFile)], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);
                    window.open(url, '_blank');
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}