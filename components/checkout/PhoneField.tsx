"use client";

interface Props {
  /** Full phone value in the form "+88" + up to 11 local digits (e.g. "+8801715160317"). */
  value: string;
  error?: string;
  onChange: (next: string) => void;
}

const PREFIX = "+88";
const LOCAL_DIGITS = 11;

/** Strips the +88 prefix (and a stray leading +880/880 from older data) down to just the local digits. */
function toLocalDigits(value: string): string {
  const stripped = value.startsWith(PREFIX) ? value.slice(PREFIX.length) : value.replace(/^\+?880/, "");
  return stripped.replace(/\D/g, "").slice(0, LOCAL_DIGITS);
}

export default function PhoneField({ value, error, onChange }: Props) {
  const localDigits = toLocalDigits(value);

  function handleChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, LOCAL_DIGITS);
    onChange(PREFIX + digits);
  }

  const fieldClass = `flex-1 min-w-0 px-4 py-3.5 bg-white/5 border rounded-r-xl text-champagne-white text-sm font-sans placeholder:text-champagne-white/25 focus:outline-none transition-colors ${
    error ? "border-red-400/50 focus:border-red-400" : "border-champagne-gold/20 focus:border-champagne-gold/50"
  }`;

  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-2">
        <span className="font-sans text-champagne-white/50 text-xs tracking-[0.15em] uppercase">
          Phone Number
          <span className="text-champagne-gold ml-1">*</span>
        </span>
      </span>
      <div className="flex">
        <span
          className={`flex items-center px-3.5 py-3.5 bg-white/5 border border-r-0 rounded-l-xl text-champagne-white/60 text-sm font-sans select-none ${
            error ? "border-red-400/50" : "border-champagne-gold/20"
          }`}
        >
          {PREFIX}
        </span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className={fieldClass}
          placeholder="01XXXXXXXXX"
          value={localDigits}
          maxLength={LOCAL_DIGITS}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {error && <span className="block mt-1.5 text-red-400 text-xs font-sans">{error}</span>}
    </label>
  );
}
