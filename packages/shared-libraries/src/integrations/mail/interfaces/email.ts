export interface IEmail {
  to: string;
  fromEmail?: string;
  fromName?: string;
  subject: string;
  text?: string;
  html?: string;
  data: object;
}
