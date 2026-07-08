"use client";

import FormField from "@/components/checkout/FormField";
import type { OrderAddress } from "@/lib/order";

interface Props {
  value: OrderAddress;
  errors: Partial<Record<keyof OrderAddress, string>>;
  onChange: (next: OrderAddress) => void;
}

export default function AddressForm({ value, errors, onChange }: Props) {
  function set<K extends keyof OrderAddress>(key: K, val: OrderAddress[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-5">
      <h2 className="font-serif text-champagne-white text-2xl font-light tracking-wide">Shipment Address</h2>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Country" value={value.country} disabled className="opacity-50 cursor-not-allowed" />
        <FormField label="City" value={value.city} disabled className="opacity-50 cursor-not-allowed" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField
          label="House Number"
          value={value.house}
          error={errors.house}
          onChange={(e) => set("house", e.target.value)}
          placeholder="e.g. House 12"
        />
        <FormField
          label="Road Number"
          value={value.road}
          error={errors.road}
          onChange={(e) => set("road", e.target.value)}
          placeholder="e.g. Road 7"
        />
      </div>

      <FormField
        label="Address"
        value={value.street}
        error={errors.street}
        onChange={(e) => set("street", e.target.value)}
        placeholder="e.g. Gulshan Avenue"
      />

      <div className="grid grid-cols-2 gap-5">
        <FormField
          label="Area / Thana"
          value={value.area}
          error={errors.area}
          optional
          onChange={(e) => set("area", e.target.value)}
          placeholder="e.g. Gulshan"
        />
        <FormField
          label="Block / Sector"
          value={value.block}
          optional
          onChange={(e) => set("block", e.target.value)}
          placeholder="e.g. Block C"
        />
      </div>

      <FormField
        as="textarea"
        label="Additional Delivery Notes"
        optional
        value={value.notes}
        onChange={(e) => set("notes", e.target.value)}
        placeholder="Landmark, delivery preference, etc."
      />
    </div>
  );
}
