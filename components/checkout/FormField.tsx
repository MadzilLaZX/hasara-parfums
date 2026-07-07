"use client";

import { TextareaHTMLAttributes, InputHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
  optional?: boolean;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export default function FormField(props: InputProps | TextareaProps) {
  const { label, error, optional, as, className, ...rest } = props;

  const fieldClass = `w-full px-4 py-3.5 bg-white/5 border rounded-xl text-champagne-white text-sm font-sans placeholder:text-champagne-white/25 focus:outline-none transition-colors ${
    error
      ? "border-red-400/50 focus:border-red-400"
      : "border-champagne-gold/20 focus:border-champagne-gold/50"
  } ${className ?? ""}`;

  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-2">
        <span className="font-sans text-champagne-white/50 text-xs tracking-[0.15em] uppercase">
          {label}
          {!optional && <span className="text-champagne-gold ml-1">*</span>}
        </span>
        {optional && (
          <span className="font-sans text-champagne-white/25 text-[10px] tracking-wider uppercase">
            Optional
          </span>
        )}
      </span>
      {as === "textarea" ? (
        <textarea className={`${fieldClass} min-h-[88px] resize-none`} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input className={fieldClass} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <span className="block mt-1.5 text-red-400 text-xs font-sans">{error}</span>}
    </label>
  );
}
