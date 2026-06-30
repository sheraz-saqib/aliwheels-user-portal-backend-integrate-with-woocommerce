export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface SendVerificationEmailPayload {
  to: string;
  token: string;
}

export interface SendNotificationEmailPayload {
  to: string;
  subject: string;
  message: string;
  senderName: string;
}
