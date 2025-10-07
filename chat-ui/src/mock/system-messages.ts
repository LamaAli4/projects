import type { Message } from "../types/message";

export const systemMessages: Message[] = [
  {
    id: 1,
    sender: "system",
    text: "I'm glad you reached out! What can I do for you?",
  },
  {
    id: 2,
    sender: "system",
    text: "Can you please tell me more about your request?",
  },
  {
    id: 3,
    sender: "system",
    text: "I'm here to assist you anytime!",
  },
];
