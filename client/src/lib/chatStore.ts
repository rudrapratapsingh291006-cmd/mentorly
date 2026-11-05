export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "mentor" | "founder" | "admin";
  recipientId: string;
  recipientName: string;
  text: string;
  timestamp: string;
  meetingInvite?: {
    roomId: string;
    topic: string;
    scheduledTime?: string;
  };
}

const STORAGE_KEY_MESSAGES = "crestconnect_chat_messages";

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    senderId: "mentor-samira",
    senderName: "Samira Chen",
    senderRole: "mentor",
    recipientId: "founder-rohan",
    recipientName: "Rohan Varma",
    text: "Hey Rohan! Reviewed your DormPay traction deck. The 45 pilot cafeterias look great. Let's do a live video call to polish your pitch unit economics.",
    timestamp: "10:30 AM",
    meetingInvite: {
      roomId: "room-dormpay-pitch",
      topic: "DormPay Pitch Deck & Seed Strategy",
      scheduledTime: "Today · Live Now",
    },
  },
  {
    id: "msg-2",
    senderId: "founder-rohan",
    senderName: "Rohan Varma",
    senderRole: "founder",
    recipientId: "mentor-samira",
    recipientName: "Samira Chen",
    text: "Thanks Samira! Joining the room right now. Looking forward to your feedback on customer acquisition costs.",
    timestamp: "10:32 AM",
  },
  {
    id: "msg-3",
    senderId: "mentor-marcus",
    senderName: "Marcus Vance",
    senderRole: "mentor",
    recipientId: "founder-rohan",
    recipientName: "Rohan Varma",
    text: "Hey Rohan, send over your cap table model whenever you're ready, or hop on a call here.",
    timestamp: "Yesterday",
    meetingInvite: {
      roomId: "room-marcus-captable",
      topic: "Cap Table & Term Sheet Review",
    },
  },
];

export function getStoredMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
      return DEFAULT_MESSAGES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_MESSAGES;
  }
}

export function saveMessages(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.error(e);
  }
}

export function sendChatMessage(msg: Omit<ChatMessage, "id" | "timestamp">): ChatMessage {
  const all = getStoredMessages();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const newMsg: ChatMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    timestamp: timeStr,
  };
  const updated = [...all, newMsg];
  saveMessages(updated);
  return newMsg;
}
