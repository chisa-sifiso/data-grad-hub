import { Application } from "../types/application";

// Mock CV data (base64 encoded dummy PDF)
const mockCVBase64 = "JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUIAovRjEgMTIgVGYKNzIgNzIwIFRkCihTYW1wbGUgQ1YpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAMDI0NSAwMDAwMCBuIAowMDAwMDAwMzIzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDE1CiUlRU9G";

export const mockApplications: Application[] = [
  {
    id: "app-001",
    personalDetails: {
      fullName: "Sarah Johnson",
      idNumber: "9801125678901",
      email: "sarah.johnson@email.com",
      phoneNumber: "+27 11 234 5678",
      address: "123 Main Street, Johannesburg, 2001"
    },
    courseCode: "DS-ADVANCED",
    finalYearModules: [
      { moduleCode: "STAT301", moduleName: "Advanced Statistics", mark: 85 },
      { moduleCode: "CS302", moduleName: "Machine Learning", mark: 92 },
      { moduleCode: "MATH303", moduleName: "Linear Algebra", mark: 78 },
      { moduleCode: "DS304", moduleName: "Data Visualization", mark: 88 }
    ],
    cvFile: mockCVBase64,
    cvFileName: "sarah_johnson_cv.pdf",
    applicationStatus: "Pending",
    submissionDate: "2024-01-15T10:30:00Z",
    averageMark: 85.75
  },
  {
    id: "app-002",
    personalDetails: {
      fullName: "Michael Chen",
      idNumber: "9505148901234",
      email: "michael.chen@email.com",
      phoneNumber: "+27 21 345 6789",
      address: "456 Oak Avenue, Cape Town, 8001"
    },
    courseCode: "DS-FUNDAMENTALS",
    finalYearModules: [
      { moduleCode: "STAT201", moduleName: "Statistics Fundamentals", mark: 75 },
      { moduleCode: "CS201", moduleName: "Programming Basics", mark: 82 },
      { moduleCode: "MATH202", moduleName: "Calculus", mark: 70 },
      { moduleCode: "DS203", moduleName: "Data Analysis", mark: 79 }
    ],
    cvFile: mockCVBase64,
    cvFileName: "michael_chen_cv.pdf",
    applicationStatus: "Approved",
    submissionDate: "2024-01-12T14:20:00Z",
    averageMark: 76.5
  },
  {
    id: "app-003",
    personalDetails: {
      fullName: "Priya Patel",
      idNumber: "9701203456789",
      email: "priya.patel@email.com",
      phoneNumber: "+27 31 456 7890",
      address: "789 Sunset Boulevard, Durban, 4001"
    },
    courseCode: "DS-ADVANCED",
    finalYearModules: [
      { moduleCode: "STAT301", moduleName: "Advanced Statistics", mark: 95 },
      { moduleCode: "CS302", moduleName: "Machine Learning", mark: 89 },
      { moduleCode: "MATH303", moduleName: "Linear Algebra", mark: 91 },
      { moduleCode: "DS304", moduleName: "Data Visualization", mark: 87 }
    ],
    cvFile: mockCVBase64,
    cvFileName: "priya_patel_cv.pdf",
    applicationStatus: "Pending",
    submissionDate: "2024-01-18T09:45:00Z",
    averageMark: 90.5
  },
  {
    id: "app-004",
    personalDetails: {
      fullName: "James Robertson",
      idNumber: "9203157890123",
      email: "james.robertson@email.com",
      phoneNumber: "+27 12 567 8901",
      address: "321 Pine Street, Pretoria, 0001"
    },
    courseCode: "DS-FUNDAMENTALS",
    finalYearModules: [
      { moduleCode: "STAT201", moduleName: "Statistics Fundamentals", mark: 58 },
      { moduleCode: "CS201", moduleName: "Programming Basics", mark: 62 },
      { moduleCode: "MATH202", moduleName: "Calculus", mark: 45 },
      { moduleCode: "DS203", moduleName: "Data Analysis", mark: 55 }
    ],
    cvFile: mockCVBase64,
    cvFileName: "james_robertson_cv.pdf",
    applicationStatus: "Rejected",
    submissionDate: "2024-01-10T16:15:00Z",
    averageMark: 55
  },
  {
    id: "app-005",
    personalDetails: {
      fullName: "Nomsa Mthembu",
      idNumber: "9012258901234",
      email: "nomsa.mthembu@email.com",
      phoneNumber: "+27 33 678 9012",
      address: "654 Valley Road, Pietermaritzburg, 3201"
    },
    courseCode: "DS-SPECIALIST",
    finalYearModules: [
      { moduleCode: "STAT401", moduleName: "Advanced Statistical Modeling", mark: 93 },
      { moduleCode: "CS402", moduleName: "Deep Learning", mark: 88 },
      { moduleCode: "MATH403", moduleName: "Optimization Theory", mark: 85 },
      { moduleCode: "DS404", moduleName: "Big Data Analytics", mark: 90 }
    ],
    cvFile: mockCVBase64,
    cvFileName: "nomsa_mthembu_cv.pdf",
    applicationStatus: "Approved",
    submissionDate: "2024-01-20T11:30:00Z",
    averageMark: 89
  },
  {
    id: "app-006",
    personalDetails: {
      fullName: "David Kim",
      idNumber: "9406129876543",
      email: "david.kim@email.com",
      phoneNumber: "+27 11 789 0123",
      address: "987 Elm Street, Sandton, 2146"
    },
    courseCode: "DS-SPECIALIST",
    finalYearModules: [
      { moduleCode: "STAT401", moduleName: "Advanced Statistical Modeling", mark: 77 },
      { moduleCode: "CS402", moduleName: "Deep Learning", mark: 73 },
      { moduleCode: "MATH403", moduleName: "Optimization Theory", mark: 69 },
      { moduleCode: "DS404", moduleName: "Big Data Analytics", mark: 75 }
    ],
    cvFile: mockCVBase64,
    cvFileName: "david_kim_cv.pdf",
    applicationStatus: "Pending",
    submissionDate: "2024-01-22T15:45:00Z",
    averageMark: 73.5
  }
];