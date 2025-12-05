export type CommitteeExamRequest = {
  id: number;
  userId: number;

  athleteName: string;
  athleteFamily: string;
  nationalCode: string;
  athletePhoneNumber: string;

  cityName: string | null;
  provinceName: string | null;

  coachName: string;
  coachPhoneNumber: string;
  residenceLocation: string;
  requestedGrade: string;
  lastCertificateImagePath?: string | null;

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

export type CommitteeDecisionDto = {
  isApproved: boolean;
};
