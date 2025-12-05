export type ExamRequest = {
  id: number;
  userId: number;
  coachName: string;
  coachPhoneNumber: string;
  residenceLocation: string;
  requestedGrade: string;
  lastCertificateImagePath: string | null;
  status: string;
  coachApprovedDate?: string | null;
  coachRejectedDate?: string | null;
  committeeApprovedDate?: string | null;
  committeeRejectedDate?: string | null;
  paymentTransactionId?: number | null;
  certificateIssued: boolean;
  creationDate: string;
  lastModifiedDate: string;
};
