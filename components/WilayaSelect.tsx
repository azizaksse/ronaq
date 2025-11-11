"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronsUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WILAYAS, type Wilaya } from "@/lib/wilayas";
import { cn } from "@/lib/utils";

type WilayaSelectProps = {
  value?: number | null;
  onChange: (wilaya: Wilaya) => void;
  placeholder?: string;
  error?: string | null;
};

export const WilayaSelect = ({
  value,
  onChange,
  placeholder = "اختر ولايتك",
  error,
}: WilayaSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Wilaya[]>(WILAYAS);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/shipping/locations")
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!payload?.data || !Array.isArray(payload.data) || !active) return;
        setOptions(
          payload.data.map((item: any) => ({
            code: Number(item.code),
            name: item.name,
          })),
        );
      })
      .catch(() => null);

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selected = options.find((option) => option.code === value);

  const filtered = useMemo(() => {
    if (!query) return options;
    return options.filter(
      (option) =>
        option.name.includes(query) ||
        String(option.code).includes(query.trim()),
    );
  }, [options, query]);

  return (
    <div className="relative space-y-2" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-mint/40 focus-ring",
          error && "border-red-400/70",
        )}
      >
        <span className={selected ? "text-white" : "text-white/50"}>
          {selected ? `${selected.code} — ${selected.name}` : placeholder}
        </span>
        <ChevronsUpDown className="h-4 w-4 text-white/60" />
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-white/15 bg-[#0f1d16] p-3 shadow-2xl">
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
            <Search className="h-4 w-4 text-white/50" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث باسم الولاية أو رقمها"
              className="h-9 border-none bg-transparent px-0 text-sm focus-visible:ring-0"
            />
          </div>
          <div className="max-h-64 space-y-1 overflow-y-auto">
            {filtered.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => {
                  onChange(option);
                  setQuery("");
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-white/80 transition",
                  option.code === value
                    ? "bg-mint/20 text-white"
                    : "hover:bg-white/5",
                )}
              >
                <span>{option.name}</span>
                <span className="text-xs text-white/50">{option.code}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="py-4 text-center text-xs text-white/50">
                لا توجد نتائج مطابقة
              </p>
            )}
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
};
