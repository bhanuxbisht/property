"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  LogOut,
  Building2,
  ArrowLeft,
  Search,
  RefreshCw,
  Upload,
  ShieldCheck,
  Compass,
  AlertCircle,
  Mail,
  KeyRound,
} from "lucide-react";
import { PropertyListing } from "@/lib/listings";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { isAllowedAdminEmail } from "@/lib/auth-config";
import { SearchableLocalitySelect } from "@/components/common/SearchableLocalitySelect";

export default function AdminPage() {
  // Auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [activeAdminEmail, setActiveAdminEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const supabaseReady = isSupabaseConfigured();

  // Listings state
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocality, setFilterLocality] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    locality: string;
    price: string;
    priceValue: string;
    type: "flat" | "plot" | "villa" | "commercial";
    bhk: string;
    area: string;
    facing: string;
    image: string;
    panoramaUrl: string;
    description: string;
    jdaApproved: boolean;
    readyToMove: boolean;
    has360: boolean;
    featured: boolean;
  }>({
    title: "",
    locality: "Murlipura",
    price: "",
    priceValue: "",
    type: "flat",
    bhk: "3 BHK",
    area: "1,200 sq.ft",
    facing: "East Facing",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
    panoramaUrl: "",
    description: "",
    jdaApproved: true,
    readyToMove: true,
    has360: false,
    featured: false,
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPano, setUploadingPano] = useState(false);

  // Fetch listings helper
  const fetchListings = useCallback(async (tokenToUse?: string) => {
    const token = tokenToUse || authToken;
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
      } else {
        const err = await res.json().catch(() => ({}));
        if (res.status === 401 || res.status === 403) {
          setIsAuthenticated(false);
          setAuthError(err.error || "Authentication failed. Please sign in again.");
        }
      }
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  // Check Supabase session on mount
  useEffect(() => {
    let isMounted = true;

    if (supabaseReady) {
      const supabase = getSupabaseClient();
      if (supabase) {
        // 1. Check existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (!isMounted) return;
          if (session?.user && session.access_token) {
            const userEmail = session.user.email;
            if (isAllowedAdminEmail(userEmail)) {
              setAuthToken(session.access_token);
              setActiveAdminEmail(userEmail || "Authorized Admin");
              setIsAuthenticated(true);
            } else {
              supabase.auth.signOut();
              setAuthError(`Access Denied: ${userEmail} is not on the authorized admin whitelist.`);
            }
          }
        });

        // 2. Subscribe to auth state changes (e.g. Google OAuth redirect callback)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!isMounted) return;
            if (session?.user && session.access_token) {
              const userEmail = session.user.email;
              if (isAllowedAdminEmail(userEmail)) {
                setAuthToken(session.access_token);
                setActiveAdminEmail(userEmail || "Authorized Admin");
                setIsAuthenticated(true);
              } else {
                supabase.auth.signOut();
                setAuthError(`Access Denied: ${userEmail} is not on the authorized admin whitelist.`);
              }
            } else if (event === "SIGNED_OUT") {
              setIsAuthenticated(false);
              setAuthToken("");
              setActiveAdminEmail("");
            }
          }
        );

        return () => {
          isMounted = false;
          subscription.unsubscribe();
        };
      }
    }

    return () => {
      isMounted = false;
    };
  }, [supabaseReady]);

  // Load listings once authenticated
  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated && authToken) {
      Promise.resolve().then(() => {
        if (isMounted) fetchListings(authToken);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, authToken, fetchListings]);

  // 1. Email + Password Login Handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseReady) {
      setAuthError("Supabase is not connected. Add credentials to .env.local to log in.");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);

    try {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error("Supabase client unavailable");

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error || !data.user || !data.session) {
        setAuthError(error?.message || "Invalid email or password.");
        return;
      }

      const userEmail = data.user.email;
      // Enforce strict whitelist
      if (!isAllowedAdminEmail(userEmail)) {
        await supabase.auth.signOut();
        setAuthError(
          `Access Denied: Account (${userEmail}) is not an authorized RajHomes administrator.`
        );
        return;
      }

      const token = data.session.access_token;
      setAuthToken(token);
      setActiveAdminEmail(userEmail || "Admin");
      setIsAuthenticated(true);
      fetchListings(token);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };


  const handleLogout = async () => {
    if (supabaseReady) {
      const supabase = getSupabaseClient();
      if (supabase) await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setAuthToken("");
    setActiveAdminEmail("");
    setPassword("");
  };

  // Upload Cover Image to Supabase Storage
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("isPanorama", "false");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: data,
      });

      const result = await res.json();
      if (res.ok && result.url) {
        setFormData((prev) => ({ ...prev, image: result.url }));
      } else {
        alert(result.error || "Failed to upload photo to Supabase Storage.");
      }
    } catch {
      alert("Network error during photo upload. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload 360 Panorama to Supabase Storage
  const handlePanoramaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPano(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("isPanorama", "true");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: data,
      });

      const result = await res.json();
      if (res.ok && result.url) {
        setFormData((prev) => ({
          ...prev,
          panoramaUrl: result.url,
          has360: true,
        }));
      } else {
        alert(result.error || "Failed to upload 360 panorama photo to Supabase Storage.");
      }
    } catch {
      alert("Network error during 360 panorama upload.");
    } finally {
      setUploadingPano(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      locality: "Murlipura",
      price: "",
      priceValue: "",
      type: "flat",
      bhk: "3 BHK",
      area: "1,200 sq.ft",
      facing: "East Facing",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
      panoramaUrl: "",
      description: "",
      jdaApproved: true,
      readyToMove: true,
      has360: false,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prop: PropertyListing) => {
    setEditingId(prop.id);
    setFormData({
      title: prop.title,
      locality: prop.locality,
      price: prop.price,
      priceValue: String(prop.priceValue || ""),
      type: prop.type,
      bhk: prop.bhk,
      area: prop.area,
      facing: prop.facing || "East Facing",
      image: prop.image,
      panoramaUrl: prop.panoramaUrl || "",
      description: prop.description,
      jdaApproved: prop.jdaApproved,
      readyToMove: prop.readyToMove,
      has360: prop.has360,
      featured: prop.featured,
    });
    setIsModalOpen(true);
  };

  // Add / Edit Property Submit Handler
  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      if (editingId) {
        const res = await fetch("/api/admin/listings", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id: editingId, ...formData }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/admin/listings", {
          method: "POST",
          headers,
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Add failed");
        }
      }
      setIsModalOpen(false);
      fetchListings();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving property";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Available / Sold Status
  const handleToggleStatus = async (prop: PropertyListing) => {
    const newStatus = prop.status === "available" ? "sold" : "available";
    const confirmMsg =
      newStatus === "sold"
        ? `Mark "${prop.title}" as SOLD?`
        : `Mark "${prop.title}" as AVAILABLE for sale?`;

    if (!window.confirm(confirmMsg)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/listings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ id: prop.id, status: newStatus }),
      });
      if (res.ok) {
        fetchListings();
      }
    } finally {
      setLoading(false);
    }
  };

  // Permanent Delete Property from Database
  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}" from the website and database?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/listings?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.ok) {
        fetchListings();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete listing.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Filtered listings
  const filteredListings = listings.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.price.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocality =
      filterLocality === "all" || l.locality.toLowerCase() === filterLocality.toLowerCase();
    return matchesSearch && matchesLocality;
  });

  const availableCount = listings.filter((l) => l.status === "available").length;
  const soldCount = listings.filter((l) => l.status === "sold").length;

  // ── 1. SECURE SUPABASE AUTH LOGIN SCREEN (Zero password backdoor) ──
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0B0A] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#161412] p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/20 text-terracotta">
              <Building2 size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white">RajHomes Portal</h1>
            <p className="mt-1 text-xs text-white/60">
              Strict Admin Access • Powered by Supabase Auth
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-white/5 bg-white/5 p-3.5 text-xs text-white/70">
            <ShieldCheck size={18} className="text-terracotta shrink-0 mt-0.5" />
            <span>
              Restricted exclusively to authorized property administrators. Public registrations are permanently disabled.
            </span>
          </div>

          {!supabaseReady && (
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-200/90 flex items-start gap-2">
              <AlertCircle size={17} className="shrink-0 mt-0.5 text-amber-400" />
              <div>
                <strong>Database Not Connected:</strong>
                <p className="mt-1 text-amber-200/80">
                  Please add your Supabase credentials to <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">.env.local</code> to activate the real-time admin portal.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 flex items-center gap-1.5">
                <Mail size={13} /> Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full rounded-xl border border-white/10 bg-[#221F1C] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-terracotta focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 flex items-center gap-1.5">
                <KeyRound size={13} /> Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#221F1C] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-terracotta focus:outline-none"
              />
            </div>

            {authError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading || !supabaseReady}
              className="btn-search w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg disabled:opacity-40 transition-all cursor-pointer"
            >
              {authLoading ? "Verifying..." : "Sign In to Admin Portal"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── 2. AUTHENTICATED ADMIN DASHBOARD ──
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#1E2320]/10 bg-[#FDFBF7]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta text-white font-bold">
              R
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1E2320]">RajHomes Property Manager</h1>
              <div className="flex items-center gap-1.5 text-[11px] text-[#1E2320]/60">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>{activeAdminEmail}</span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                  PostgreSQL Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleOpenAdd}
              className="btn-search flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow sm:px-4 sm:text-sm cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Property</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-[#1E2320]/15 px-3 py-2 text-xs font-medium hover:bg-[#1E2320]/5 sm:text-sm cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
            <span className="text-xs font-medium text-[#1E2320]/60">Total Properties</span>
            <p className="mt-1 text-2xl font-bold text-[#1E2320]">{listings.length}</p>
          </div>
          <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
            <span className="text-xs font-medium text-emerald-600">Active for Sale</span>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{availableCount}</p>
          </div>
          <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
            <span className="text-xs font-medium text-[#1E2320]/60">Sold Out</span>
            <p className="mt-1 text-2xl font-bold text-[#1E2320]/80">{soldCount}</p>
          </div>
          <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
            <span className="text-xs font-medium text-purple-600">360° Virtual Tours</span>
            <p className="mt-1 text-2xl font-bold text-purple-700">
              {listings.filter((l) => l.has360).length}
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E2320]/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, price, or locality..."
              className="w-full rounded-xl border border-[#1E2320]/15 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["all", "Murlipura", "Sikar Road", "Vidhyadhar Nagar", "Jhotwara"].map((loc) => (
              <button
                key={loc}
                onClick={() => setFilterLocality(loc)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterLocality === loc
                    ? "bg-[#1E2320] text-white"
                    : "bg-white border border-[#1E2320]/10 text-[#1E2320]/70 hover:bg-[#1E2320]/5"
                }`}
              >
                {loc === "all" ? "All Localities" : loc}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Table / Cards */}
        <div className="mt-6">
          {loading && listings.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-[#1E2320]/10 bg-white">
              <RefreshCw className="h-6 w-6 animate-spin text-terracotta" />
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-12 text-center">
              <Building2 className="mx-auto h-12 w-12 text-[#1E2320]/30" />
              <h3 className="mt-3 text-base font-semibold text-[#1E2320]">No properties found</h3>
              <p className="mt-1 text-xs text-[#1E2320]/60">
                Click &quot;Add Property&quot; above to publish your first live listing to the database.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((prop) => (
                <div
                  key={prop.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1E2320]/10 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-[16/10] w-full bg-black/5 overflow-hidden">
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                            prop.status === "available"
                              ? "bg-emerald-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {prop.status === "available" ? "Active" : "Sold"}
                        </span>
                        {prop.has360 && (
                          <span className="rounded-md bg-purple-600 px-2 py-0.5 text-[11px] font-bold text-white flex items-center gap-1 shadow">
                            <Compass size={12} /> 360° Tour
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 right-2 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        {prop.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="text-[11px] font-semibold text-terracotta uppercase tracking-wider">
                        {prop.locality} • {prop.type}
                      </div>
                      <h3 className="mt-1 text-sm font-bold text-[#1E2320] line-clamp-1">
                        {prop.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#1E2320]/70">
                        <span>{prop.bhk}</span>
                        <span>•</span>
                        <span>{prop.area}</span>
                        {prop.jdaApproved && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">JDA</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-[#1E2320]/10 bg-[#FDFBF7] p-3 text-xs">
                    <button
                      onClick={() => handleToggleStatus(prop)}
                      className={`font-semibold flex items-center gap-1 cursor-pointer ${
                        prop.status === "available"
                          ? "text-[#1E2320]/70 hover:text-red-600"
                          : "text-emerald-600 hover:text-emerald-700"
                      }`}
                    >
                      {prop.status === "available" ? (
                        <>
                          <XCircle size={14} /> Mark as Sold
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={14} /> Mark Available
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/property/${prop.id}`}
                        target="_blank"
                        className="p-1.5 text-[#1E2320]/60 hover:text-[#1E2320]"
                        title="View Public Page"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(prop)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prop.id, prop.title)}
                        className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer font-medium"
                        title="Delete Listing Permanently"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── 3. ADD / EDIT PROPERTY MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E2320]/10 pb-4">
              <h2 className="text-lg font-bold text-[#1E2320]">
                {editingId ? "Edit Property" : "Add New Property"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-[#1E2320]/50 hover:bg-[#1E2320]/5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury 3 BHK JDA Flat with Modular Kitchen"
                  className="w-full rounded-xl border border-[#1E2320]/15 p-3 text-sm focus:border-terracotta focus:outline-none"
                />
              </div>

              {/* Locality & Type */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <SearchableLocalitySelect
                    value={formData.locality}
                    onChange={(val) => setFormData({ ...formData, locality: val })}
                    label="Locality *"
                    placeholder="Search or select from 40+ Jaipur localities..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as "flat" | "plot" | "villa" | "commercial" })
                    }
                    className="w-full rounded-xl border border-[#1E2320]/15 p-3 text-sm focus:border-terracotta focus:outline-none bg-white"
                  >
                    <option value="flat">Flat / Apartment</option>
                    <option value="villa">Independent Villa / House</option>
                    <option value="plot">Residential Plot</option>
                    <option value="commercial">Commercial Space</option>
                  </select>
                </div>
              </div>

              {/* Price & BHK */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1">
                    Display Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹48 Lakh or ₹1.15 Cr"
                    className="w-full rounded-xl border border-[#1E2320]/15 p-3 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1">
                    BHK / Config
                  </label>
                  <input
                    type="text"
                    value={formData.bhk}
                    onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                    placeholder="e.g. 3 BHK, 4 BHK, Plot"
                    className="w-full rounded-xl border border-[#1E2320]/15 p-3 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1">
                    Built-up Area
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. 1,350 sq.ft"
                    className="w-full rounded-xl border border-[#1E2320]/15 p-3 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>
              </div>

              {/* 1. COVER PHOTO UPLOAD (Supabase Storage) */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1 flex items-center justify-between">
                  <span>Cover Photo</span>
                  {uploadingImage && <span className="text-terracotta font-normal">Uploading to Supabase...</span>}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Cloud storage URL will appear here"
                    className="flex-1 rounded-xl border border-[#1E2320]/15 p-2.5 text-xs focus:outline-none"
                  />
                  <label className="flex items-center gap-1.5 rounded-xl border border-[#1E2320]/20 bg-white px-3 py-2.5 text-xs font-semibold hover:bg-[#1E2320]/5 cursor-pointer shrink-0">
                    <Upload size={14} />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* 2. DEDICATED 360° PANORAMA UPLOAD (Supabase Storage) */}
              <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-bold text-purple-950 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.has360}
                      onChange={(e) => setFormData({ ...formData, has360: e.target.checked })}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-600"
                    />
                    <span className="flex items-center gap-1">
                      <Compass size={14} className="text-purple-600" /> Enable 360° Virtual Tour
                    </span>
                  </label>
                  {uploadingPano && <span className="text-xs text-purple-700 font-semibold">Uploading 360° Tour to Supabase...</span>}
                </div>

                {formData.has360 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-[11px] text-purple-800/80">
                      Upload an equirectangular 360 photo taken with any 360 phone app or 360 camera.
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formData.panoramaUrl}
                        onChange={(e) => setFormData({ ...formData, panoramaUrl: e.target.value })}
                        placeholder="Panorama URL in Supabase Storage"
                        className="flex-1 rounded-xl border border-purple-200 bg-white p-2.5 text-xs focus:outline-none"
                      />
                      <label className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-2.5 text-xs font-bold text-white shadow hover:bg-purple-700 cursor-pointer shrink-0">
                        <Upload size={14} />
                        <span>Upload 360° Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePanoramaUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Flags */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.jdaApproved}
                    onChange={(e) => setFormData({ ...formData, jdaApproved: e.target.checked })}
                    className="rounded border-[#1E2320]/20 text-terracotta focus:ring-terracotta"
                  />
                  <span>JDA Approved</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.readyToMove}
                    onChange={(e) => setFormData({ ...formData, readyToMove: e.target.checked })}
                    className="rounded border-[#1E2320]/20 text-terracotta focus:ring-terracotta"
                  />
                  <span>Ready to Move</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-[#1E2320]/20 text-terracotta focus:ring-terracotta"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details regarding road width, loan sanction, modular fittings, landmarks, etc."
                  className="w-full rounded-xl border border-[#1E2320]/15 p-3 text-sm focus:border-terracotta focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#1E2320]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl border border-[#1E2320]/15 py-3 text-sm font-medium hover:bg-[#1E2320]/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-search flex-1 rounded-xl py-3 text-sm font-semibold text-white shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Saving to Database..." : editingId ? "Update Property" : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
