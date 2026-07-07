import type { Order } from "@/lib/order";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL;
const SUBMIT_TIMEOUT_MS = 15000;

export type SubmitOrderResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "timeout" | "network" | "server"; message: string };

export async function submitOrder(order: Order): Promise<SubmitOrderResult> {
  if (!WEBHOOK_URL) {
    return {
      ok: false,
      reason: "not-configured",
      message: "Order webhook is not configured. Please contact support.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      signal: controller.signal,
    });

    if (!res.ok) {
      return { ok: false, reason: "server", message: `Order could not be submitted (${res.status}).` };
    }

    return { ok: true };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, reason: "timeout", message: "The request took too long. Please try again." };
    }
    return { ok: false, reason: "network", message: "Could not reach our servers. Please check your connection." };
  } finally {
    clearTimeout(timeout);
  }
}
