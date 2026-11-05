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
  Radio,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { getLoggedInMentor } from "@/lib/appStore";

interface InCallMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isSelf: boolean;
}

export default function VideoCallRoom() {
  const [, params] = useRoute("/call/:roomId");
  const rawRoomId = params?.roomId || "main-room";
  // Clean room id for WebRTC signaling (letters and numbers only)
  const cleanRoom = rawRoomId.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "consultationroom";
  const [, setLocation] = useLocation();

  const urlParams = new URLSearchParams(window.location.search);
  const roomTopic = urlParams.get("topic") || "1-on-1 Consultation Session";
  const currentMentor = getLoggedInMentor();
  const isHost = Boolean(currentMentor);
  const partnerName = urlParams.get("with") || (isHost ? "Client" : "Consultant Specialist");

  // Streams & Video Elements
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // Connection states
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isPeerConnected, setIsPeerConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Waiting for other device to join...");
  const [callDuration, setCallDuration] = useState(0);

  // Chat
  const [inCallChat, setInCallChat] = useState<InCallMessage[]>([
    {
      id: "call-msg-1",
      sender: "System",
      text: "Connected to encrypted WebRTC room. When the other device joins with this link, video & audio connect directly peer-to-peer.",
      time: "Just now",
      isSelf: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  // WebRTC Peer reference
  const peerRef = useRef<any>(null);
  const activeCallRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let peer: any = null;

    async function initCall() {
      // 1. Get Camera/Mic
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          currentStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true,
          });
          localStreamRef.current = currentStream;
          setLocalStream(currentStream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = currentStream;
          }
        }
      } catch (err: any) {
        console.warn("Camera access denied or unavailable:", err);
        setCameraError("Camera unavailable. You can still join and listen/speak.");
      }

      // 2. Initialize PeerJS WebRTC Connection
      const PeerClass = (window as any).Peer;
      if (!PeerClass) {
        setConnectionStatus("WebRTC engine initializing...");
        return;
      }

      // Host peer ID is derived from room ID
      const hostPeerId = `crest-${cleanRoom}-host`;
      const clientPeerId = `crest-${cleanRoom}-client-${Math.random().toString(36).substring(2, 6)}`;

      // Attempt to become host or client
      try {
        peer = new PeerClass(hostPeerId, { debug: 1 });
        peerRef.current = peer;

        peer.on("open", () => {
          setConnectionStatus("Room hosted. Share link for other device to join.");
        });

        // When someone calls this host
        peer.on("call", (incomingCall: any) => {
          setConnectionStatus("Connected with other device!");
          setIsPeerConnected(true);
          activeCallRef.current = incomingCall;

          incomingCall.answer(localStreamRef.current || undefined);
          incomingCall.on("stream", (incomingRemoteStream: MediaStream) => {
            setRemoteStream(incomingRemoteStream);
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = incomingRemoteStream;
            }
          });
          incomingCall.on("close", () => {
            setIsPeerConnected(false);
            setRemoteStream(null);
            setConnectionStatus("Other device disconnected.");
          });
        });

        // If hostPeerId already exists, we are the client calling the host!
        peer.on("error", (err: any) => {
          if (err.type === "unavailable-id") {
            // Room host is already online, join as client!
            peer.destroy();
            const clientPeer = new PeerClass(clientPeerId, { debug: 1 });
            peerRef.current = clientPeer;

            clientPeer.on("open", () => {
              setConnectionStatus("Connecting to host device...");
              const call = clientPeer.call(hostPeerId, localStreamRef.current || undefined);
              activeCallRef.current = call;

              if (call) {
                call.on("stream", (hostRemoteStream: MediaStream) => {
                  setConnectionStatus("Connected with other device!");
                  setIsPeerConnected(true);
                  setRemoteStream(hostRemoteStream);
                  if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = hostRemoteStream;
                  }
                });
                call.on("close", () => {
                  setIsPeerConnected(false);
                  setRemoteStream(null);
                  setConnectionStatus("Session closed.");
                });
              }
            });
          }
        });
      } catch (err) {
        console.error("WebRTC initialization error:", err);
      }
    }

    initCall();

    const timer = setInterval(() => {
      setCallDuration((p) => p + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (currentStream) {
        currentStream.getTracks().forEach((t) => t.stop());
      }
      if (activeCallRef.current) {
        activeCallRef.current.close();
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [cleanRoom]);

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((t) => {
        t.enabled = isMicMuted;
      });
    }
    setIsMicMuted(!isMicMuted);
    toast(isMicMuted ? "Microphone unmuted" : "Microphone muted");
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((t) => {
        t.enabled = isVideoOff;
      });
    }
    setIsVideoOff(!isVideoOff);
    toast(isVideoOff ? "Camera turned on" : "Camera turned off");
  };

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
    }
    if (activeCallRef.current) activeCallRef.current.close();
    if (peerRef.current) peerRef.current.destroy();
    toast.info("Session ended");
    setLocation("/mentors");
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Room link copied! Open this on your other device/phone.");
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: InCallMessage = {
      id: `call-msg-${Date.now()}`,
      sender: "You",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true,
    };

    setInCallChat((prev) => [...prev, msg]);
    setNewMessage("");

    // Simulated response if other peer has not chatted yet
    if (!isPeerConnected) {
      setTimeout(() => {
        setInCallChat((prev) => [
          ...prev,
          {
            id: `call-msg-${Date.now()}`,
            sender: partnerName,
            text: "Share the room link above to have your second device join this video arena directly!",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isSelf: false,
          },
        ]);
      }, 1500);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0b0c0c] text-[#f9f6ef] overflow-hidden">
      {/* Top Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#262a28] bg-[#151717] px-4 sm:px-6 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/mentors"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0b0c0c] text-[#a6aba6] hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                {roomTopic}
              </span>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                isPeerConnected ? "bg-[#74aa77]/15 text-[#74aa77]" : "bg-[#ef765e]/15 text-[#ef765e]"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${isPeerConnected ? "bg-[#74aa77]" : "bg-[#ef765e] animate-pulse"}`} />
                {isPeerConnected ? "Live Connected" : "Awaiting Partner"}
              </span>
            </div>
            <p className="text-[11px] text-[#8d9690]">
              {connectionStatus} · Duration: <span className="font-mono text-[#74aa77]">{formatTime(callDuration)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyRoomLink}
            className="flex items-center gap-1.5 rounded-full border border-[#ef765e]/40 bg-[#ef765e]/15 px-3.5 py-1.5 text-xs font-bold text-[#ef765e] hover:bg-[#ef765e]/25 transition"
          >
            <Share2 className="h-3.5 w-3.5" /> Copy Room Link
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
        <div className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-6 bg-[#0e1010]">
          <div className="grid h-full w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-2">
            
            {/* Participant 1: Remote Partner (The Other Device) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#262a28] bg-[#161a18] shadow-2xl">
              <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-[#1b221e] to-[#121614] overflow-hidden">
                {/* Live Real Video Stream from the Other Device */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className={`h-full w-full object-cover object-center ${
                    isPeerConnected && remoteStream ? "block" : "hidden"
                  }`}
                />

                {/* Waiting State if other device hasn't joined yet */}
                {(!isPeerConnected || !remoteStream) && (
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full border-2 border-dashed border-[#ef765e] animate-spin" />
                      <div className="absolute inset-0 grid place-items-center">
                        <Users className="h-8 w-8 text-[#ef765e]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">Waiting for other device...</h4>
                      <p className="mt-1 text-xs text-[#8d9690] max-w-xs">
                        Open this link on your second device or phone to connect instantly:
                      </p>
                      <button
                        onClick={copyRoomLink}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#ef765e] px-4 py-2 text-xs font-bold text-white hover:bg-[#e9654c] shadow"
                      >
                        <Copy className="h-3.5 w-3.5" /> Click to Copy Room Link
                      </button>
                    </div>
                  </div>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                  <span className={`h-2 w-2 rounded-full ${isPeerConnected ? "bg-[#74aa77]" : "bg-[#ef765e]"}`} />
                  <span>{partnerName} {isPeerConnected ? "(Live)" : "(Awaiting)"}</span>
                </div>
              </div>
            </div>

            {/* Participant 2: Local User (This Device) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#262a28] bg-[#181d1a] shadow-2xl">
              <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-[#202722] to-[#141815] overflow-hidden">
                {/* Local Webcam Video */}
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover object-center transform -scale-x-100 ${
                    isVideoOff || cameraError ? "hidden" : "block"
                  }`}
                />

                {(isVideoOff || cameraError) && (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-[#ef765e]/20 text-2xl font-bold font-display text-[#ef765e] border border-[#ef765e]/40 shadow-xl">
                      YOU
                    </div>
                    <p className="mt-3 font-display text-base font-bold text-white">Your Camera</p>
                    <p className="text-xs text-[#8d9690]">
                      {isVideoOff ? "Camera is turned off" : "Camera access simulated or denied"}
                    </p>
                  </div>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#ef765e]" />
                  <span>This Device</span>
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

          {/* Call Controls Dock */}
          <div className="absolute bottom-8 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-[#151717]/90 px-6 py-3.5 shadow-2xl backdrop-blur-xl">
            <button
              onClick={toggleMic}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                isMicMuted ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
              }`}
              title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                isVideoOff ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
              }`}
              title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
            >
              {isVideoOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
            </button>

            <button
              onClick={copyRoomLink}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              title="Copy Room Link for other device"
            >
              <Copy className="h-5 w-5" />
            </button>

            <button
              onClick={handleEndCall}
              className="flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-red-600 font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
            >
              <PhoneOff className="h-5 w-5" /> Leave Room
            </button>
          </div>
        </div>

        {/* Sidebar Chat */}
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
