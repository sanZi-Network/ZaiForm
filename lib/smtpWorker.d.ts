// smtpWorker.js declaration file

// isSmtpUsable
export function isSmtpUsable(): boolean;

// sendMail
export function sendMail(sendTo: string, subject: string, content: string): Promise<object>;