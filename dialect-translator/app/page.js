"use client";
import { useEffect, useRef, useState } from "react";
import LanguagePicker from "@/components/LanguagePicker";
import { useVoice } from "@/hooks/useVoice";
import { dialects } from "@/lib/dialects";

export default function Home() {
  const [from, setFrom] = useState("standard");
  const [to, setTo] = useState("noakhali");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [copied, setCopied] = useState(false);

  const reqId = useRef(0);
  const skipKey = useRef(""); // voice theke already translate hole effect skip korbe

  const speak = (t) => {
    if (!t || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "bn-BD";
    const v = speechSynthesis.getVoices().find((x) => x.lang?.toLowerCase().startsWith("bn"));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  };

  const translate = async (input, f, t, autoSpeak = false) => {
    if (!input.trim()) {
      reqId.current++;
      setResult("");
      setIsError(false);
      setLoading(false);
      return;
    }
    if (f === t) {
      setResult(input);
      setIsError(false);
      return;
    }
    const id = ++reqId.current;
    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, from: f, to: t }),
      });
      const data = await res.json();
      if (id !== reqId.current) return; // purono request ignore
      if (data.result) {
        setResult(data.result);
        setIsError(false);
        if (autoSpeak) speak(data.result);
      } else {
        setResult(data.error || "কিছু একটা সমস্যা হয়েছে");
        setIsError(true);
      }
    } catch {
      if (id === reqId.current) {
        setResult("নেটওয়ার্কে সমস্যা, আবার চেষ্টা করো");
        setIsError(true);
      }
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  };

  // Likhte likhte auto-translate (800ms thamle)
  useEffect(() => {
    if (skipKey.current === `${text}|${from}|${to}`) return;
    const timer = setTimeout(() => translate(text, from, to), 800);
    return () => clearTimeout(timer);
  }, [text, from, to]);

  // Voice: bola shesh hole shathe shathe translate + shunano
  const { listening, start, supported } = useVoice((spoken) => {
    skipKey.current = `${spoken}|${from}|${to}`;
    setText(spoken);
    translate(spoken, from, to, true);
  });

  const swap = () => {
    if (from === to) return;
    skipKey.current = "";
    setFrom(to);
    setTo(from);
    setText(isError ? "" : result);
    setResult(text);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const share = async () => {
    const msg = `"${text}" → "${result}"`;
    if (navigator.share) navigator.share({ text: msg, url: location.href }).catch(() => {});
    else copy();
  };

  const iconBtn =
    "w-10 h-10 rounded-full border bg-white hover:bg-gray-100 flex items-center justify-center";

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <header className="pt-2">
        <h1 className="text-2xl font-bold">আঞ্চলিক ট্রান্সলেটর</h1>
        <p className="text-sm text-gray-500">
          মান বাংলা ও জেলার ভাষার মধ্যে অনুবাদ। বাংলা বা Banglish, লেখো কিংবা বলো।
        </p>
      </header>

      <div className="flex items-center gap-2">
        <LanguagePicker value={from} onChange={setFrom} exclude={to} />
        <button onClick={swap} className={iconBtn} aria-label="swap">⇄</button>
        <LanguagePicker value={to} onChange={setTo} exclude={from} />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <section className="border rounded-xl p-3 bg-white">
          <textarea
            className="w-full h-40 resize-none outline-none text-xl"
            value={text}
            maxLength={300}
            onChange={(e) => setText(e.target.value)}
            placeholder="লেখো বা মাইকে বলো..."
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {supported && (
                <button
                  onClick={start}
                  className={`${iconBtn} ${listening ? "!bg-red-100 animate-pulse" : ""}`}
                  aria-label="mic"
                >
                  🎤
                </button>
              )}
              <button onClick={() => speak(text)} className={iconBtn} aria-label="listen source">
                🔊
              </button>
            </div>
            <span className="text-sm text-gray-500">{text.length}/300</span>
          </div>
        </section>

        <section className="border rounded-xl p-3 bg-gray-50">
          <div className={`w-full h-40 overflow-auto text-xl ${isError ? "text-red-600" : ""}`}>
            {loading ? <span className="text-gray-400">অনুবাদ হচ্ছে...</span> : result}
          </div>
          <div className="flex gap-2">
            <button onClick={() => speak(result)} className={iconBtn} aria-label="listen result">
              🔊
            </button>
            <button onClick={copy} className="px-3 h-10 rounded-full border bg-white text-sm">
              {copied ? "কপি হয়েছে ✓" : "📋 কপি"}
            </button>
            <button onClick={share} className="px-3 h-10 rounded-full border bg-white text-sm">
              ↗ শেয়ার
            </button>
          </div>
        </section>
      </div>

      {to !== "standard" && !dialects[to] && (
        <p className="text-xs text-orange-600">
          এই জেলার ভাষার ডেটা এখনো কম (বেটা), তাই অনুবাদে ভুল থাকতে পারে।
        </p>
      )}
    </main>
  );
}
