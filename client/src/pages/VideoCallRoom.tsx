import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Copy,
  LayoutGrid,
  Maximize2,
  Mic,
  MicOff,
  PhoneOff,
  Send,
  Share2,
  Smile,
  Sparkles,
  Users,
  Video,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";

interface InCallMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isSelf: boolean;
}

export default function VideoCallRoom() {
  const [, params] = useRoute("/call/:roomId");
  const roomId = params?.roomId || "main-room";
  const [, setLocation] = useLocation();

  // URL search params for topic
  const urlParams = new URLSearchParams(window.location.search);
  const roomTopic = urlParams.get("topic") || "Mentor & Founder Venture Review";
  const partnerName = urlParams.get("with") || "Samira Chen (Alumni EIR)";

  // Video and audio stream states
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // In-call Live Chat
  const [inCallChat, setInCallChat] = useState<InCallMessage[]>([
    {
      id: "call-msg-1",
      sender: partnerName,
      text: "Welcome to the pitch room! Can you hear and see me clearly?",
      time: "Just now",
      isSelf: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  // Mock secondary participant video track / avatar simulation
  const [isPartnerConnected, setIsPartnerConnected] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  // Initialize camera and microphone
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startMedia() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true,
          });
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          toast.success("Camera and audio connected!");
        } else {
          setCameraError("Media devices API not supported in this browser.");
        }
      } catch (err: any) {
        console.warn("getUserMedia failed or permission denied:", err);
        setCameraError("Camera permission declined or not available. Running in simulated video mode.");
        toast.info("Using simulated video stream (camera unavailable/denied).");
      }
    }

    startMedia();

    // Call duration timer
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Sync track mute/unmute
  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isMicMuted;
      });
    }
    setIsMicMuted(!isMicMuted);
    toast(isMicMuted ? "Microphone unmuted" : "Microphone muted");
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOff;
      });
    }
    setIsVideoOff(!isVideoOff);
    toast(isVideoOff ? "Camera turned on" : "Camera turned off");
  };

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    toast.info("Session ended");
    setLocation("/dashboard/learner");
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: InCallMessage = {
      id: `call-msg-${Date.now()}`,
      sender: "You (Rohan Varma)",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true,
    };

    setInCallChat((prev) => [...prev, msg]);
    setNewMessage("");

    // Auto partner response simulation after 2 seconds
    setTimeout(() => {
      const replies = [
        "That makes total sense, let's review your slide 4 next.",
        "Your financial unit economics look much cleaner here.",
        "Got it! Let me make a note of this LOI template for you.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setInCallChat((prev) => [
        ...prev,
        {
          id: `call-msg-resp-${Date.now()}`,
          sender: partnerName,
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSelf: false,
        },
      ]);
    }, 1800);
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Meeting link copied to clipboard!");
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0b0c0c] text-[#f9f6ef] overflow-hidden">
      {/* Top Call Navigation Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#262a28] bg-[#151717] px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/learner"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1f2421] text-[#cbd5c7] hover:bg-[#262d29] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#74aa77] animate-pulse" />
              <h1 className="font-display text-sm font-bold text-white sm:text-base">{roomTopic}</h1>
              <span className="rounded bg-[#ef765e]/20 px-2 py-0.5 font-mono text-[10px] text-[#ef765e]">
                LIVE ROOM
              </span>
            </div>
            <p className="text-[11px] text-[#8d9690]">
              Room ID: <span className="font-mono text-white">{roomId}</span> · Session Duration:{" "}
              <span className="font-mono text-[#74aa77]">{formatTime(callDuration)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyRoomLink}
            className="hidden items-center gap-1.5 rounded-full border border-[#303333] bg-[#1c211f] px-3.5 py-1.5 text-xs text-[#cbd5c7] hover:bg-[#262d29] hover:text-white sm:flex"
          >
            <Share2 className="h-3.5 w-3.5 text-[#ef765e]" /> Share Link
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-1.5 rounded-full border border-[#303333] bg-[#1c211f] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#262d29]"
          >
            <Users className="h-3.5 w-3.5 text-[#ef765e]" />
            <span>Chat ({inCallChat.length})</span>
          </button>
        </div>
      </header>

      {/* Main Video Arena */}
      <div className="flex flex-1 overflow-hidden">
        {/* Videos Container */}
        <div className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-6 bg-[#0e1010]">
          <div className="grid h-full w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Participant 1: Remote Partner (Mentor) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#262a28] bg-[#161a18] shadow-2xl">
              <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-[#1b221e] to-[#121614] overflow-hidden">
                {/* Simulated high quality remote video stream with real avatar */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt={partnerName}
                  className="h-full w-full object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#74aa77]" />
                  <span>{partnerName}</span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs text-[#a6aba6] backdrop-blur">
                  <Volume2 className="h-3.5 w-3.5 text-[#74aa77]" />
                  <span>Audio Active</span>
                </div>
              </div>
            </div>

            {/* Participant 2: Local User (Founder) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#262a28] bg-[#181d1a] shadow-2xl">
              <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-[#202722] to-[#141815] overflow-hidden">
                {/* Live Webcam Stream */}
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover object-center transform -scale-x-100 ${
                    isVideoOff || cameraError ? "hidden" : "block"
                  }`}
                />

                {/* Fallback avatar if camera is off or permission was not granted */}
                {(isVideoOff || cameraError) && (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <div className="grid h-24 w-24 place-items-center rounded-full bg-[#ef765e]/20 text-3xl font-bold font-display text-[#ef765e] border border-[#ef765e]/40 shadow-xl">
                      RV
                    </div>
                    <p className="mt-4 font-display text-lg font-bold text-white">Rohan Varma (You)</p>
                    <p className="text-xs text-[#8d9690]">
                      {isVideoOff ? "Your camera is muted" : "Camera access simulated"}
                    </p>
                  </div>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#ef765e]" />
                  <span>You (Founder)</span>
                </div>

                {isMicMuted && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-red-500/80 px-2.5 py-1 text-xs text-white backdrop-blur">
                    <MicOff className="h-3.5 w-3.5" />
                    <span>Muted</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating Call Control Dock */}
          <div className="absolute bottom-8 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-[#151717]/90 px-6 py-3.5 shadow-2xl backdrop-blur-xl">
            <button
              onClick={toggleMic}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                isMicMuted
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                isVideoOff
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
            >
              {isVideoOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
            </button>

            <button
              onClick={copyRoomLink}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              title="Copy Room Link"
            >
              <Copy className="h-5 w-5" />
            </button>

            <button
              onClick={handleEndCall}
              className="flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-red-600 font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
            >
              <PhoneOff className="h-5 w-5" /> End Call
            </button>
          </div>
        </div>

        {/* In-Call Live Chat Sidebar */}
        {isSidebarOpen && (
          <aside className="flex w-80 sm:w-96 flex-col border-l border-[#262a28] bg-[#151717]">
            <div className="flex h-14 items-center justify-between border-b border-[#262a28] px-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#ef765e]" />
                <h3 className="font-display text-sm font-bold text-white">Live In-Call Notes & Chat</h3>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-xs text-[#8d9690] hover:text-white"
              >
                Hide
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={chatScrollRef}>
              <div className="rounded-xl border border-[#262a28] bg-[#0b0c0c] p-3 text-xs text-[#8d9690]">
                Messages and links shared during this live session are visible to both participants.
              </div>

              {inCallChat.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isSelf ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-[#6a726d] mb-1">
                    {m.sender} · {m.time}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      m.isSelf
                        ? "bg-[#ef765e] text-white rounded-br-none"
                        : "bg-[#202723] text-[#e1e6e1] rounded-bl-none border border-[#2e3731]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-[#262a28] p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[#303333] bg-[#0b0c0c] p-1.5 focus-within:border-[#ef765e]">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type notes or questions..."
                  className="flex-1 bg-transparent px-3 text-xs text-white placeholder:text-[#6a726d] outline-none"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ef765e] text-white transition hover:bg-[#e9654c]"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </aside>
        )}
      </div>
    </div>
  );
}
