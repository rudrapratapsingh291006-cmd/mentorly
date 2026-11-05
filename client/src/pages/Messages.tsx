import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Compass,
  MessageCircle,
  Paperclip,
  Plus,
  Rocket,
  Search,
  Send,
  Shield,
  Sparkles,
  User,
  Users,
  Video,
} from "lucide-react";
import { ChatMessage, getStoredMessages, sendChatMessage } from "@/lib/chatStore";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastActive: string;
}

const CONTACTS: Contact[] = [
  {
    id: "mentor-samira",
    name: "Samira Chen",
    role: "Founder & Former CEO @ CloudSync (Exit $18M)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    online: true,
    lastActive: "Active now",
  },
  {
    id: "mentor-marcus",
    name: "Marcus Vance",
    role: "Principal @ Horizon Ventures & Angel Syndicate",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    online: true,
    lastActive: "Active 5m ago",
  },
  {
    id: "mentor-elena",
    name: "Dr. Elena Rossi",
    role: "Head of Bio-Innovation @ MedScale Labs",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    online: false,
    lastActive: "Active yesterday",
  },
  {
    id: "mentor-jordan",
    name: "Jordan Alvarez",
    role: "Co-Founder @ EcoTrack (YC W22)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    online: false,
    lastActive: "Active 2h ago",
  },
];

export default function Messages() {
  const [, params] = useRoute("/messages/:contactId");
  const defaultContactId = params?.contactId || "mentor-samira";

  const [activeContact, setActiveContact] = useState<Contact>(
    CONTACTS.find((c) => c.id === defaultContactId) || CONTACTS[0]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const reloadMessages = () => {
    setMessages(getStoredMessages());
  };

  useEffect(() => {
    reloadMessages();
    const interval = setInterval(reloadMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage({
      senderId: "founder-rohan",
      senderName: "Rohan Varma",
      senderRole: "founder",
      recipientId: activeContact.id,
      recipientName: activeContact.name,
      text: inputText.trim(),
    });

    setInputText("");
    reloadMessages();
    toast.success("Message sent!");

    // Contextual, intelligent reply from mentor based on what the user said
    setTimeout(() => {
      const lower = inputText.toLowerCase();
      let reply = "";

      if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        reply = `Hello! Glad to connect with you. What specific problem or field are you working on right now that you need guidance with?`;
      } else if (lower.includes("career") || lower.includes("job") || lower.includes("interview") || lower.includes("resume")) {
        reply = `Great question on career progression. In my experience, focusing on your tangible project impact and storytelling in interviews makes all the difference. I'd love to review your resume or do a mock interview over a quick video call.`;
      } else if (lower.includes("price") || lower.includes("pricing") || lower.includes("money") || lower.includes("finance") || lower.includes("cost")) {
        reply = `Financial modeling and pricing can be tricky when starting out. You want to anchor to the value you deliver rather than just cost-plus. Let's schedule a 20-minute video slot to walk through your numbers together.`;
      } else if (lower.includes("tech") || lower.includes("code") || lower.includes("bug") || lower.includes("architecture") || lower.includes("stack")) {
        reply = `Tech architecture decisions pay off long-term. Start with the simplest stack that allows you to iterate quickly before over-engineering. Feel free to send over your code repo or diagram so I can take a look!`;
      } else if (lower.includes("call") || lower.includes("meet") || lower.includes("video") || lower.includes("time")) {
        reply = `I'd be glad to hop on a video session with you! You can tap the camera button right below our chat or join my open room anytime.`;
      } else {
        reply = `Thanks for sharing: "${inputText.length > 50 ? inputText.substring(0, 48) + '...' : inputText}". That is a common hurdle people face at this stage. I've noted this down and we can tackle actionable steps together. Would you like to hop on a live video call?`;
      }

      sendChatMessage({
        senderId: activeContact.id,
        senderName: activeContact.name,
        senderRole: "mentor",
        recipientId: "founder-rohan",
        recipientName: "Rohan Varma",
        text: reply,
      });
      reloadMessages();
    }, 1200);
  };

  const handleCreateInstantCall = () => {
    const roomCode = Math.random().toString(36).substring(2, 7);
    const roomId = `room-${roomCode}`;
    sendChatMessage({
      senderId: "founder-rohan",
      senderName: "Rohan Varma",
      senderRole: "founder",
      recipientId: activeContact.id,
      recipientName: activeContact.name,
      text: `Hey ${activeContact.name}, I started an instant video review room for us:`,
      meetingInvite: {
        roomId,
        topic: `Instant Pitch Session with ${activeContact.name}`,
        scheduledTime: "Live Now",
      },
    });
    reloadMessages();
    toast.success("Live call invitation sent!");
  };

  const filteredContacts = CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-[#0b0c0c] text-[#f9f6ef] overflow-hidden">
      {/* Messages Sidebar Roster */}
      <aside className="flex w-80 md:w-96 flex-col border-r border-[#262a28] bg-[#151717]">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#262a28] px-5">
          <Link
            href="/dashboard/learner"
            className="flex items-center gap-2 text-xs font-semibold text-[#8d9690] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-1.5 rounded-full bg-[#ef765e]/15 px-2.5 py-0.5 font-mono text-[10px] text-[#ef765e]">
            <Sparkles className="h-3 w-3" /> Live Chat
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-xl border border-[#262a28] bg-[#0b0c0c] px-3 py-2 text-xs">
            <Search className="h-3.5 w-3.5 text-[#8d9690]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentors..."
              className="flex-1 bg-transparent text-xs text-white placeholder:text-[#6a726d] outline-none"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredContacts.map((contact) => {
            const isSelected = contact.id === activeContact.id;
            return (
              <button
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                  isSelected ? "bg-[#1f2622] text-white border border-[#2e3a32]" : "text-[#a6aba6] hover:bg-[#1a1e1b]"
                }`}
              >
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-11 w-11 rounded-full object-cover border border-[#262a28]"
                  />
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#151717] bg-[#74aa77]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-sm font-bold truncate text-white">{contact.name}</h4>
                    <span className="text-[10px] text-[#8d9690]">{contact.online ? "Online" : "Offline"}</span>
                  </div>
                  <p className="text-[11px] text-[#8d9690] truncate">{contact.role}</p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Chat Conversation Arena */}
      <main className="flex flex-1 flex-col bg-[#0b0c0c]">
        {/* Active Contact Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#262a28] bg-[#151717] px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="h-10 w-10 rounded-full object-cover border border-[#262a28]"
              />
              {activeContact.online && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#74aa77] ring-2 ring-[#151717]" />
              )}
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white">{activeContact.name}</h3>
              <p className="text-[11px] text-[#8d9690]">{activeContact.lastActive}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateInstantCall}
              className="flex items-center gap-1.5 rounded-full bg-[#ef765e] px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-[#e9654c]"
            >
              <Video className="h-3.5 w-3.5" /> Start Live Call
            </button>
            <Link
              href={`/call/room-${activeContact.id}?with=${encodeURIComponent(activeContact.name)}`}
              className="flex items-center gap-1.5 rounded-full border border-[#303333] bg-[#1c211f] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#262d29]"
            >
              Enter Room
            </Link>
          </div>
        </header>

        {/* Message Thread Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="mx-auto max-w-sm rounded-xl border border-[#262a28] bg-[#151717] p-3 text-center text-xs text-[#8d9690]">
            This is an encrypted live messaging and review channel between you and <b>{activeContact.name}</b>.
          </div>

          {messages.map((m) => {
            const isSelf = m.senderId === "founder-rohan";
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isSelf ? "items-end" : "items-start"} max-w-2xl ${
                  isSelf ? "ml-auto" : "mr-auto"
                }`}
              >
                <div className="flex items-center gap-2 text-[10px] text-[#6a726d] mb-1">
                  <span>{m.senderName}</span>
                  <span>·</span>
                  <span>{m.timestamp}</span>
                </div>

                <div
                  className={`rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                    isSelf
                      ? "bg-[#ef765e] text-white rounded-br-none"
                      : "bg-[#181d1a] text-[#f9f6ef] rounded-bl-none border border-[#262e29]"
                  }`}
                >
                  <p>{m.text}</p>

                  {/* If message includes meeting invite card */}
                  {m.meetingInvite && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-white/20 bg-black/40 p-3.5 text-white backdrop-blur">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#74aa77] animate-pulse" />
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#74aa77]">
                            Live Video Call Invite
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#a6aba6]">
                          {m.meetingInvite.scheduledTime || "Live Now"}
                        </span>
                      </div>
                      <h5 className="mt-1 font-display text-sm font-bold">{m.meetingInvite.topic}</h5>
                      <div className="mt-3">
                        <Link
                          href={`/call/${m.meetingInvite.roomId}?topic=${encodeURIComponent(
                            m.meetingInvite.topic
                          )}&with=${encodeURIComponent(activeContact.name)}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#ef765e] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#e9654c] transition"
                        >
                          <Video className="h-3.5 w-3.5" /> Join Live Video Room
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Bottom Box */}
        <form onSubmit={handleSendMessage} className="border-t border-[#262a28] bg-[#151717] p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[#303333] bg-[#0b0c0c] px-4 py-2.5 focus-within:border-[#ef765e]">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeContact.name}...`}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-[#6a726d] outline-none"
            />
            <button
              type="button"
              onClick={handleCreateInstantCall}
              className="flex items-center gap-1 rounded-xl bg-[#1c221e] px-3 py-1.5 text-xs text-[#cbd5c7] hover:bg-[#252c28] hover:text-white"
              title="Add live call invite"
            >
              <Video className="h-3.5 w-3.5 text-[#ef765e]" /> Call Invite
            </button>
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ef765e] text-white transition hover:bg-[#e9654c]"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
