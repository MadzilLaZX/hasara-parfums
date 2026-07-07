"use client";

import FormField from "@/components/checkout/FormField";
import type { OrderCustomer } from "@/lib/order";

interface Props {
  value: OrderCustomer;
  errors: Partial<Record<keyof OrderCustomer, string>>;
  onChange: (next: OrderCustomer) => void;
}

export default function CustomerForm({ value, errors, onChange }: Props) {
  function set<K extends keyof OrderCustomer>(key: K, val: OrderCustomer[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-champagne-white text-2xl font-light tracking-wide">Your Details</h2>
      <FormField
        label="Full Name"
        value={value.name}
        error={errors.name}
        onChange={(e) => set("name", e.target.value)}
        placeholder="e.g. Abidul Hasan"
        autoComplete="name"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Phone Number"
          value={value.phone}
          error={errors.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="01XXXXXXXXX"
          type="tel"
          autoComplete="tel"
        />
        <FormField
          label="Email Address"
          value={value.email}
          error={errors.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
        />
      </div>
    </div>
  );
}
