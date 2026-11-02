"use client";
import { useEffect, useMemo, useState } from "react";
import { allLanguages, nameOf } from "@/lib/districts";
import { dialects } from "@/lib/dialects";

export default function LanguagePicker({ value, onChange, exclude }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return allLanguages.filter(
      (l) =>
        l.key !== exclude &&
        (!s || l.name.includes(s) || l.en.toLowerCase().includes(s))
    );
  }, [q, exclude]);

  const pick = (key) => {
    onChange(key);
    setOpen(false);
    setQ("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex-1 min-w-0 border rounded-lg px-3 py-2 bg-white font-medium flex justify-between items-center gap-2 hover:bg-gray-50"
      >
        <span className="truncate">{nameOf(value)}</span>
        <span aria-hidden>▾</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full md:max-w-lg rounded-t-2xl md:rounded-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b flex gap-2">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="জেলা খুঁজুন... (Noakhali / নোয়াখালী)"
                className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
              <button onClick={() => setOpen(false)} className="px-3 text-lg" aria-label="close">
                ✕
              </button>
            </div>

            <ul className="overflow-y-auto">
              {list.map((l) => {
                const beta = l.key !== "standard" && !dialects[l.key];
                return (
                  <li key={l.key}>
                    <button
                      onClick={() => pick(l.key)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 flex justify-between items-center ${
                        l.key === value ? "bg-green-50 font-semibold" : ""
                      }`}
                    >
                      <span>
                        {l.name}
                        <span className="text-sm text-gray-400 ml-2">{l.en.split(" ")[0]}</span>
                      </span>
                      <span className="text-xs">
                        {l.key === value && <span className="text-green-600">✓ </span>}
                        {beta && <span className="text-orange-500">বেটা</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
              {list.length === 0 && <li className="p-4 text-gray-500">কিছু পাওয়া যায়নি</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
