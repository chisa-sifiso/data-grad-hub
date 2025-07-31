export type ApplicationStatus = "Pending" | "Approved" | "Rejected";

export interface PersonalDetails {
  fullName: string;
  idNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface FinalYearModule {
  moduleCode: string;
  moduleName: string;
  mark: number;
}

export interface Application {
  id: string;
  personalDetails: PersonalDetails;
  courseCode: string;
  finalYearModules: FinalYearModule[];
  cvFile: string; // Base64 encoded
  cvFileName: string;
  applicationStatus: ApplicationStatus;
  submissionDate: string;
  averageMark: number;
}