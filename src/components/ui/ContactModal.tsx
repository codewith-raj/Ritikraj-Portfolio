"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useRef, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpData, setOtpData] = useState<{ hash: string; expiry: number } | null>(null);
  const [error, setError] = useState("");
  
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("form");
        setFormData({ name: "", email: "", message: "" });
        setOtp(["", "", "", ""]);
        setOtpData(null);
        setError("");
        setIsSubmitting(false);
      }, 300);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setOtpData({ hash: data.hash, expiry: data.expiry });
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError("Please enter a complete 4-digit code");
      setIsSubmitting(false);
      return;
    }

    if (!otpData) {
      setError("Session expired. Please try again.");
      setStep("form");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          message: formData.message,
          otp: otpString,
          hash: otpData.hash,
          expiry: otpData.expiry,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Verification failed");

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-[70] w-full max-w-lg h-fit bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {step === "form" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-heading font-bold uppercase mb-2">Let's Connect</h2>
                    <p className="text-white/60 text-sm">Tell me about your project or just say hello.</p>
                  </div>

                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Name</label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Email</label>
                      <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Message</label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Tell me a bit about your project..."
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-base"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
                    </Button>
                  </form>
                </div>
              )}

              {step === "otp" && (
                <div className="space-y-6">
                  <div>
                    <button 
                      onClick={() => setStep("form")}
                      className="flex items-center text-xs text-white/40 hover:text-white mb-4 transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3 mr-1" /> Back
                    </button>
                    <h2 className="text-2xl font-heading font-bold uppercase mb-2">Verify Email</h2>
                    <p className="text-white/60 text-sm">
                      We've sent a 4-digit code to <span className="text-accent">{formData.email}</span>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOTP} className="space-y-8">
                    <div className="flex justify-center gap-4">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => { otpInputRefs.current[index] = el }}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-14 h-16 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-mono text-white focus:outline-none focus:border-accent transition-colors"
                        />
                      ))}
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-base"
                    >
                      {isSubmitting ? "Verifying..." : "Verify & Send"}
                      {!isSubmitting && <Lock className="ml-2 w-4 h-4" />}
                    </Button>
                    
                    <p className="text-center text-xs text-white/40">
                       Code expires in 10 minutes.
                     </p>
                     
                     <div className="text-center">
                        <button 
                          type="button"
                          onClick={handleSendOTP}
                          className="text-xs text-accent hover:underline"
                        >
                          Resend Code
                        </button>
                     </div>
                   </form>
                 </div>
               )}

              {step === "success" && (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/60 max-w-xs mx-auto">
                      Thanks for reaching out, {formData.name}. I'll get back to you shortly.
                    </p>
                  </div>
                  <Button onClick={onClose} variant="outline">
                    Close
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
