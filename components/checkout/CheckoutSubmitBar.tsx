"use client";

import { CircleNotch, WarningCircle, CheckCircle } from "@phosphor-icons/react";

export type SubmitStatus = "idle" | "submitting" | "error";

interface Props {
  status: SubmitStatus;
  errorMessage?: string;
  disabled: boolean;
  onSubmit: () => void;
  onRetry: () => void;
}

export default function CheckoutSubmitBar({ status, errorMessage, disabled, onSubmit, onRetry }: Props) {
  if (status === "error") {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2.5 border border-red-400/30 bg-red-400/5 rounded-xl px-4 py-3">
          <WarningCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="font-sans text-red-300 text-sm leading-relaxed">
            {errorMessage ?? "Something went wrong while submitting your order."}
          </p>
        </div>
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2.5 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
        >
          Retry Order
        </button>
        <p className="font-sans text-champagne-white/30 text-xs text-center">
          Your bag has been kept safe — nothing was lost.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={onSubmit}
      disabled={disabled || status === "submitting"}
      className="w-full flex items-center justify-center gap-2.5 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 disabled:opacity-40 disabled:cursor-not-allowed text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
    >
      {status === "submitting" ? (
        <>
          <CircleNotch size={16} className="animate-spin" />
          Confirming Order...
        </>
      ) : (
        <>
          <CheckCircle size={16} weight="fill" />
          Confirm Order
        </>
      )}
    </button>
  );
}
