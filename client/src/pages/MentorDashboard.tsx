import { ArrowLeft, ArrowUpRight, Bell, CalendarDays, Camera, Check, Clock3, Copy, Edit3, Flame, Globe, Lock, LogOut, MessageCircle, MessageSquare, Phone, Plus, RefreshCw, Save, Settings, Shield, Sparkles, Star, Trash2, User, Users, Video, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  Booking,
  Mentor,
  deleteMentorAccount,
  getLoggedInMentor,
  getStoredBookings,
  getStoredMentors,
  saveMentors,
  setLoggedInMentor,
} from "@/lib/appStore";
import { toast } from "sonner";

export default function MentorDashboard() {
  const [, setLocation] = useLocation();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "settings">("overview");

  // Edit settings form
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editAffiliation, setEditAffiliation] = useState("");
  const [editDomain, setEditDomain] = useState<Mentor["domain"]>("Healthcare & Wellness");
  const [editLocation, setEditLocation] = useState("");
  const [editHelp, setEditHelp] = useState("");
  const [editExpertise, setEditExpertise] = useState("");
  const [editImage, setEditImage] = useState("");

  // Password change form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteConfirmationPassword, setDeleteConfirmationPassword] = useState("");

  useEffect(() => {
    let current = getLoggedInMentor();
    if (!current) {
      // Default to Samira Chen for quick inspection if no custom mentor logged in
      const all = getStoredMentors();
      current = all[0] || null;
      if (current) setLoggedInMentor(current);
    }
    if (current) {
      setMentor(current);
      setEditName(current.name);
      setEditRole(current.role);
      setEditAffiliation(current.affiliation);
      setEditDomain(current.domain);
      setEditLocation(current.location);
      setEditHelp(current.stageHelp);
      setEditExpertise(current.expertise?.join(", ") || "");
      setEditImage(current.image);
    }

    const allBookings = getStoredBookings();
    if (current) {
      const myBookings = allBookings.filter(
        (b) => b.mentorName.toLowerCase().includes(current?.name.toLowerCase() || "")
      );
      setBookings(myBookings.length > 0 ? myBookings : allBookings.slice(0, 3));
    } else {
      setBookings(allBookings);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentor) return;

    const updated: Mentor = {
      ...mentor,
      name: editName.trim(),
      role: editRole.trim(),
      affiliation: editAffiliation.trim(),
      domain: editDomain,
      location: editLocation.trim(),
      stageHelp: editHelp.trim(),
      expertise: editExpertise.split(",").map((s) => s.trim()).filter(Boolean),
      image: editImage.trim() || mentor.image,
    };

    const allMentors = getStoredMentors();
    const nextList = allMentors.map((m) => (m.id === mentor.id ? updated : m));
    saveMentors(nextList);
    setLoggedInMentor(updated);
    setMentor(updated);
    toast.success("Profile details updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentor) return;
    if (mentor.password && mentor.password !== currentPassword) {
      toast.error("Current password incorrect.");
      return;
    }
    if (newPassword.length < 4) {
      toast.error("New password must be at least 4 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const updated: Mentor = {
      ...mentor,
      password: newPassword,
    };
    const allMentors = getStoredMentors();
    const nextList = allMentors.map((m) => (m.id === mentor.id ? updated : m));
    saveMentors(nextList);
    setLoggedInMentor(updated);
    setMentor(updated);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password changed successfully!");
  };

  const handleLogout = () => {
    setLoggedInMentor(null);
    toast.info("Logged out of mentor account.");
    setLocation("/mentor/join");
  };

  const handleDeleteAccount = () => {
    if (!mentor) return;
    if (mentor.password && mentor.password !== deleteConfirmationPassword) {
      toast.error("Password confirmation incorrect. Cannot delete account.");
      return;
    }

    deleteMentorAccount(mentor.id);
    toast.success("Your mentor account and directory listing have been deleted.");
    setLocation("/mentors");
  };

  if (!mentor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0c0c] text-white">
        <div className="text-center">
          <p className="text-sm text-[#8d9690]">Loading your mentor dashboard...</p>
          <Link href="/mentor/join" className="mt-4 inline-block text-xs text-[#ef765e] hover:underline">
            Go to Mentor Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b0c0c] text-[#f9f6ef]">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-[#262a28] bg-[#151717] px-5 py-6 lg:block">
        <Link href="/" className="flex items-center gap-2.5 px-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white shadow-md">
            c
          </span>
          <span className="text-lg font-semibold tracking-[-.04em] text-white">
            CrestConnect<span className="text-[#ef765e]">.</span>
          </span>
        </Link>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b0c0c] p-3 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="h-10 w-10 rounded-full object-cover border border-[#ef765e]/40"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-white">{mentor.name}</p>
              <p className="truncate text-[11px] text-[#74aa77] font-mono">{mentor.domain}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              activeTab === "overview"
                ? "bg-[#1c211f] text-white border-l-2 border-[#ef765e]"
                : "text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
            }`}
          >
            <CalendarDays className="h-4 w-4" /> Consultation Queue
          </button>

          <Link
            href="/mentors"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
          >
            <Globe className="h-4 w-4" /> View Public Directory
          </Link>

          <Link
            href="/messages"
            className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
          >
            <span className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4" /> Client Messages
            </span>
            <span className="rounded-full bg-[#ef765e] px-2 py-0.5 text-[10px] text-white">
              Live
            </span>
          </Link>

          <Link
            href="/call/room-eir-office-hours"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
          >
            <Video className="h-4 w-4" /> Video Call Room
          </Link>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              activeTab === "settings"
                ? "bg-[#1c211f] text-white border-l-2 border-[#ef765e]"
                : "text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" /> Settings & Account
          </button>
        </div>

        <div className="mt-12 border-t border-[#262a28] pt-6 space-y-1">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#a6aba6] hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-[#262a28] bg-[#0b0c0c]/90 px-6 py-4 backdrop-blur lg:px-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#ef765e]/15 px-3 py-1 font-mono text-[10px] uppercase font-bold text-[#ef765e]">
              Mentor Portal
            </span>
            <span className="hidden text-xs text-[#8d9690] sm:inline">
              Welcome back, <b>{mentor.name}</b> · {mentor.role}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/mentors"
              className="text-xs font-semibold text-[#ef765e] hover:underline"
            >
              Public Profile Preview ↗
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-[#303333] px-3.5 py-1.5 text-xs font-semibold text-[#a6aba6] hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" /> Log Out
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-10">
          {activeTab === "overview" && (
            <div>
              {/* Header Title */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h1 className="font-display text-3xl font-bold text-white">
                    Consultant Workspace
                  </h1>
                  <p className="mt-1 text-xs text-[#8d9690]">
                    Manage upcoming consultations, review booked slots, and host sessions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex items-center gap-2 rounded-full border border-[#303333] bg-[#151717] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#20272b]"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Edit Profile Details
                  </button>
                  <Link
                    href="/messages"
                    className="flex items-center gap-2 rounded-full bg-[#ef765e] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#e9654c]"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Open Messages
                  </Link>
                </div>
              </div>

              {/* Metric stats */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-white">{mentor.sessions || 14}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b0c0c] border border-white/5 text-[#74aa77]">
                      <Users className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-[#a6aba6] font-medium">People Guided & Consulted</p>
                </div>

                <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-white">{mentor.rating || "5.0"}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b0c0c] border border-white/5 text-[#eab308]">
                      <Star className="h-5 w-5 fill-[#eab308]" />
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-[#a6aba6] font-medium">Average Client Rating</p>
                </div>

                <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-white">{bookings.length}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b0c0c] border border-white/5 text-[#ef765e]">
                      <CalendarDays className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-[#a6aba6] font-medium">Scheduled Consultations</p>
                </div>
              </div>

              {/* Consultation List */}
              <section className="mt-10 rounded-3xl border border-[#262a28] bg-[#151717] p-6">
                <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">Upcoming Consultations</h2>
                    <p className="text-xs text-[#8d9690] mt-0.5">
                      Sessions booked by clients across healthcare, fitness, career, and finance.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#74aa77]/15 px-3 py-1 font-mono text-[11px] font-semibold text-[#74aa77]">
                    Live Roster
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {bookings.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#303333] p-8 text-center text-xs text-[#8d9690]">
                      No consultations scheduled yet. Your profile is live on the directory for new bookings!
                    </div>
                  ) : (
                    bookings.map((b) => (
                      <div key={b.id} className="rounded-2xl border border-[#262a28] bg-[#1c211f] p-5">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                          <div className="flex items-center gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#151717] text-center border border-white/10">
                              <span className="font-mono text-[10px] uppercase font-bold text-[#ef765e]">
                                {b.mode === "chat" ? "CHAT" : "CALL"}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-[#74aa77]">
                                {b.slot}
                              </p>
                              <h3 className="mt-1 text-base font-bold text-white">
                                Client: {b.founderName} ({b.startupName || "Personal Consultation"})
                              </h3>
                              <p className="text-xs text-[#a6aba6]">
                                Topic: {b.topic}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Link
                              href={b.meetingLink}
                              className="flex items-center justify-center gap-2 rounded-full bg-[#ef765e] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#e9654c]"
                            >
                              {b.mode === "chat" ? <MessageSquare className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                              {b.mode === "chat" ? "Open Chat" : "Enter Call Room"}
                            </Link>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-[#0b0c0c] p-3 text-xs text-[#8d9690] flex items-center justify-between">
                          <span>Client Inquiries / Notes: <b>{b.notes || "Ready for session"}</b></span>
                          <span className="text-[#74aa77] font-semibold uppercase font-mono text-[10px]">{b.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-white">Mentor Account Settings</h1>
                <p className="mt-1 text-xs text-[#8d9690]">
                  Edit how you appear on the public directory, change your password, or delete your mentor listing.
                </p>
              </div>

              {/* Profile Details Form */}
              <section className="rounded-3xl border border-[#262a28] bg-[#151717] p-6">
                <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-[#ef765e]" /> Profile & Directory Information
                </h2>

                <form onSubmit={handleSaveProfile} className="mt-5 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#a6aba6]">Full Name</label>
                      <input
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#a6aba6]">Primary Domain</label>
                      <select
                        value={editDomain}
                        onChange={(e) => setEditDomain(e.target.value as any)}
                        className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      >
                        <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                        <option value="Sports & Fitness">Sports & Fitness</option>
                        <option value="Career & Tech">Career & Tech</option>
                        <option value="Finance & Legal">Finance & Legal</option>
                        <option value="Life & Mindset">Life & Mindset</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#a6aba6]">Role / Title</label>
                      <input
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#a6aba6]">Affiliation / Organization</label>
                      <input
                        value={editAffiliation}
                        onChange={(e) => setEditAffiliation(e.target.value)}
                        className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#a6aba6]">Location / Timezone</label>
                    <input
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#a6aba6]">What can you help with most?</label>
                    <input
                      value={editHelp}
                      onChange={(e) => setEditHelp(e.target.value)}
                      className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#a6aba6]">Key Skills / Expertise Tags (comma separated)</label>
                    <input
                      value={editExpertise}
                      onChange={(e) => setEditExpertise(e.target.value)}
                      className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                    />
                  </div>

                  {/* Device Photo Upload */}
                  <div>
                    <label className="block font-semibold text-[#a6aba6] mb-1">
                      Profile Photo (Upload from this device)
                    </label>
                    <div className="flex items-center gap-4 rounded-2xl border border-[#303333] bg-[#0b0c0c] p-3">
                      <img
                        src={editImage || mentor.image}
                        alt="Preview"
                        className="h-14 w-14 rounded-full object-cover border-2 border-[#ef765e]"
                      />
                      <div className="flex-1 space-y-2">
                        <label className="inline-flex items-center gap-2 rounded-xl bg-[#ef765e] px-4 py-2 text-xs font-bold text-white cursor-pointer hover:bg-[#e9654c] transition shadow-md">
                          <Camera className="h-3.5 w-3.5" />
                          Choose New Photo from Device
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (!file.type.startsWith("image/")) {
                                toast.error("Please choose an image file.");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = () => {
                                setEditImage(reader.result as string);
                                toast.success("New photo loaded from this device! Click 'Save Profile Changes' below.");
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-[#8d9690]">
                          Upload any JPG, PNG, or WEBP saved on your phone or computer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#a6aba6]">Or paste Photo Web URL</label>
                    <input
                      value={editImage?.startsWith("data:") ? "[Local Device Image Attached]" : editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-[#ef765e] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#e9654c]"
                  >
                    <Save className="h-4 w-4" /> Save Profile Changes
                  </button>
                </form>
              </section>

              {/* Password Change Form */}
              <section className="rounded-3xl border border-[#262a28] bg-[#151717] p-6">
                <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#ef765e]" /> Security & Password
                </h2>

                <form onSubmit={handleUpdatePassword} className="mt-5 space-y-4 text-xs">
                  {mentor.password && (
                    <div>
                      <label className="block font-semibold text-[#a6aba6]">Current Password</label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#a6aba6]">New Password</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#a6aba6]">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10"
                  >
                    <Lock className="h-3.5 w-3.5" /> Update Password
                  </button>
                </form>
              </section>

              {/* Danger Zone: Log Out & Delete Account */}
              <section className="rounded-3xl border border-red-500/20 bg-red-950/10 p-6">
                <h2 className="font-display text-lg font-bold text-red-400 flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Account Session & Deletion
                </h2>
                <p className="mt-1 text-xs text-[#8d9690]">
                  Log out of your current session, or permanently delete your mentor listing from the platform.
                </p>

                <div className="mt-5 flex flex-wrap gap-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Log Out
                  </button>

                  <button
                    onClick={() => setIsDeleteOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-500 shadow-md shadow-red-600/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete Mentor Account
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-red-500/30 bg-[#151717] p-6 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-red-400">Delete Mentor Account?</h3>
            <p className="mt-2 text-xs text-[#a6aba6] leading-relaxed">
              This action cannot be undone. Your profile will be permanently removed from the public directory and people will no longer be able to book sessions with you.
            </p>

            {mentor.password && (
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#a6aba6]">
                  Enter your password to confirm:
                </label>
                <input
                  type="password"
                  value={deleteConfirmationPassword}
                  onChange={(e) => setDeleteConfirmationPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1.5 h-10 w-full rounded-xl border border-red-500/30 bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-red-400"
                />
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-full border border-[#303333] px-4 py-2 text-xs text-[#a6aba6] hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="rounded-full bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-500"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
