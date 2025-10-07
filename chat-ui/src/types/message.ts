export interface Message {
  id: number;
  sender: "user" | "system";
  text: string;
}
