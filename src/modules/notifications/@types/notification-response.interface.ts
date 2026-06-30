export interface ThreadResponse {
  id: string;
  subject: string;
  participantId: string;
  createdBy: string;
  createdAt: Date;
}

export interface MessageResponse {
  id: string;
  threadId: string;
  senderId: string;
  message: string;
  readAt: Date | null;
  createdAt: Date;
}
