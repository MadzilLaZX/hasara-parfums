import type { CartItem } from "@/context/CartContext";

export interface OrderProduct {
  slug: string;
  name: string;
  ml: number;
  quantity: number;
  price: number;
  lineTotal: number;
  isTester: boolean;
  /** For tester bundles: the individual fragrance names the customer picked for each slot. */
  testerNames?: string[];
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
}

export interface OrderAddress {
  country: "Bangladesh";
  city: "Dhaka";
  house: string;
  road: string;
  street: string;
  block: string;
  area: string;
  notes: string;
}

export interface OrderCoupon {
  code: string;
  discountRate: number;
}

export type OrderPaymentMethod = "cod" | "stripe" | "sslcommerz";

export interface Order {
  orderId: string;
  createdAt: string;
  customer: OrderCustomer;
  address: OrderAddress;
  products: OrderProduct[];
  testerSelections: OrderProduct[];
  subtotal: number;
  discount: number;
  coupon: OrderCoupon | null;
  total: number;
  paymentMethod: OrderPaymentMethod;
  source: "Website";
}

function pad(n: number, width: number): string {
  return String(n).padStart(width, "0");
}

/** HSR-YYYYMMDD-XXXX — sequence is randomized per order since there is no server-side counter yet. */
export function generateOrderId(now: Date): string {
  const y = now.getFullYear();
  const m = pad(now.getMonth() + 1, 2);
  const d = pad(now.getDate(), 2);
  const seq = pad(Math.floor(Math.random() * 10000), 4);
  return `HSR-${y}${m}${d}-${seq}`;
}

export function cartItemsToOrderProducts(items: CartItem[]): OrderProduct[] {
  return items.map((item) => {
    const isTester = item.slug.startsWith("tester-bundle-");
    const [label, namesPart] = item.name.split("::");
    return {
      slug: item.slug,
      name: isTester ? label : item.name,
      ml: item.ml,
      quantity: item.quantity,
      price: item.price,
      lineTotal: item.price * item.quantity,
      isTester,
      testerNames: isTester && namesPart ? namesPart.split(", ").filter(Boolean) : undefined,
    };
  });
}

export function buildOrder(params: {
  customer: OrderCustomer;
  address: OrderAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  coupon: OrderCoupon | null;
  total: number;
  now: Date;
}): Order {
  const products = cartItemsToOrderProducts(params.items);
  return {
    orderId: generateOrderId(params.now),
    createdAt: params.now.toISOString(),
    customer: params.customer,
    address: params.address,
    products: products.filter((p) => !p.isTester),
    testerSelections: products.filter((p) => p.isTester),
    subtotal: params.subtotal,
    discount: params.discount,
    coupon: params.coupon,
    total: params.total,
    paymentMethod: "cod",
    source: "Website",
  };
}

export function buildWhatsAppMessage(order: Order): string {
  const productLines = [...order.products, ...order.testerSelections]
    .map((p) => `${p.quantity}× ${p.name} (${p.ml}ml) — ৳${p.lineTotal.toLocaleString()}`)
    .join("\n");

  return [
    "Hello HASARA Parfums,",
    "",
    "I have submitted my order through the website.",
    "",
    "Order ID:",
    order.orderId,
    "",
    "Name:",
    order.customer.name,
    "",
    "Phone:",
    order.customer.phone,
    "",
    "Products:",
    productLines,
    "",
    "Total:",
    `৳${order.total.toLocaleString()}`,
    "",
    "Delivery area:",
    order.address.area,
    "",
    "Please confirm my order.",
  ].join("\n");
}
