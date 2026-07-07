"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, PencilSimple } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomerForm from "@/components/checkout/CustomerForm";
import AddressForm from "@/components/checkout/AddressForm";
import OrderSummary, { type OrderTotals } from "@/components/checkout/OrderSummary";
import ReviewSummary from "@/components/checkout/ReviewSummary";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import CheckoutSubmitBar, { type SubmitStatus } from "@/components/checkout/CheckoutSubmitBar";
import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";
import { useCart } from "@/context/CartContext";
import { buildOrder, type Order, type OrderAddress, type OrderCustomer } from "@/lib/order";
import { submitOrder } from "@/lib/webhook";
import { isNonEmpty, isValidBdPhone, isValidEmail } from "@/lib/validation";

const EMPTY_CUSTOMER: OrderCustomer = { name: "", phone: "", email: "" };
const EMPTY_ADDRESS: OrderAddress = {
  country: "Bangladesh",
  city: "Dhaka",
  house: "",
  road: "",
  street: "",
  block: "",
  area: "",
  notes: "",
};

type CustomerErrors = Partial<Record<keyof OrderCustomer, string>>;
type AddressErrors = Partial<Record<keyof OrderAddress, string>>;
type Step = "details" | "review";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();

  const [step, setStep] = useState<Step>("details");
  const [customer, setCustomer] = useState<OrderCustomer>(EMPTY_CUSTOMER);
  const [address, setAddress] = useState<OrderAddress>(EMPTY_ADDRESS);
  const [customerErrors, setCustomerErrors] = useState<CustomerErrors>({});
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [totals, setTotals] = useState<OrderTotals>({ subtotal: 0, discount: 0, coupon: null, total: 0 });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  function validate(): boolean {
    const nextCustomerErrors: CustomerErrors = {};
    if (!isNonEmpty(customer.name)) nextCustomerErrors.name = "Full name is required.";
    if (!isNonEmpty(customer.phone)) nextCustomerErrors.phone = "Phone number is required.";
    else if (!isValidBdPhone(customer.phone)) nextCustomerErrors.phone = "Enter a valid Bangladesh phone number.";
    if (!isNonEmpty(customer.email)) nextCustomerErrors.email = "Email address is required.";
    else if (!isValidEmail(customer.email)) nextCustomerErrors.email = "Enter a valid email address.";

    const nextAddressErrors: AddressErrors = {};
    if (!isNonEmpty(address.house)) nextAddressErrors.house = "House number is required.";
    if (!isNonEmpty(address.road)) nextAddressErrors.road = "Road number is required.";
    if (!isNonEmpty(address.street)) nextAddressErrors.street = "Street name is required.";
    if (!isNonEmpty(address.area)) nextAddressErrors.area = "Area / Thana is required.";

    setCustomerErrors(nextCustomerErrors);
    setAddressErrors(nextAddressErrors);

    return Object.keys(nextCustomerErrors).length === 0 && Object.keys(nextAddressErrors).length === 0;
  }

  function goToReview() {
    if (items.length === 0) return;
    if (!validate()) return;
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToDetails() {
    setStatus("idle");
    setErrorMessage("");
    setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleConfirm() {
    if (items.length === 0 || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    const order = buildOrder({
      customer,
      address,
      items,
      subtotal: totals.subtotal,
      discount: totals.discount,
      coupon: totals.coupon,
      total: totals.total,
      now: new Date(),
    });

    const result = await submitOrder(order);

    if (result.ok) {
      setCompletedOrder(order);
      clearCart();
      setStatus("idle");
    } else {
      setErrorMessage(result.message);
      setStatus("error");
    }
  }

  if (completedOrder) {
    return (
      <main className="overflow-x-hidden w-full max-w-full bg-matte-black min-h-screen">
        <Navbar />
        <CheckoutSuccess order={completedOrder} />
        <Footer />
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden w-full max-w-full bg-matte-black">
      <Navbar />

      <section className="bg-matte-black pt-44 pb-12 px-6 lg:px-12 border-b border-champagne-gold/10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/fragrances"
            className="inline-flex items-center gap-2 text-champagne-white/40 hover:text-champagne-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Continue Shopping
          </Link>
          <p className="font-sans text-champagne-gold text-xs tracking-[0.4em] uppercase mb-4">Hasara Parfums</p>
          <h1 className="font-serif text-champagne-white text-6xl lg:text-7xl font-light tracking-wide leading-none">
            Checkout
          </h1>
          <div className="w-16 h-px bg-champagne-gold mt-8" />

          {/* Step indicator */}
          <div className="flex items-center gap-3 mt-10 font-sans text-xs tracking-[0.2em] uppercase">
            <span className={step === "details" ? "text-champagne-gold" : "text-champagne-white/40"}>1. Your Details</span>
            <span className="w-8 h-px bg-champagne-gold/20" />
            <span className={step === "review" ? "text-champagne-gold" : "text-champagne-white/40"}>2. Review &amp; Confirm</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-champagne-white/40 text-2xl font-light mb-4">Your bag is empty</p>
              <Link
                href="/fragrances"
                className="inline-flex items-center gap-2 px-8 py-4 bg-champagne-gold text-matte-black text-xs tracking-[0.25em] uppercase font-sans font-medium hover:bg-champagne-gold/90 transition-colors rounded-full"
              >
                Browse Parfums
              </Link>
            </div>
          ) : step === "details" ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
              <div className="space-y-12">
                <CustomerForm value={customer} errors={customerErrors} onChange={setCustomer} />
                <AddressForm value={address} errors={addressErrors} onChange={setAddress} />
              </div>

              <div className="space-y-6 lg:sticky lg:top-32 self-start">
                <OrderSummary onTotalsChange={setTotals} />
                <button
                  onClick={goToReview}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-champagne-gold text-matte-black hover:bg-champagne-gold/90 text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer rounded-full"
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
              <div className="space-y-8">
                <div className="border border-champagne-gold/15 rounded-2xl px-6 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-champagne-white text-xl font-light tracking-wide">Your Details</h2>
                    <button
                      onClick={backToDetails}
                      className="flex items-center gap-1.5 text-champagne-gold/70 hover:text-champagne-gold text-xs tracking-wider uppercase font-sans transition-colors cursor-pointer"
                    >
                      <PencilSimple size={12} /> Edit
                    </button>
                  </div>
                  <dl className="space-y-2 font-sans text-sm">
                    <div className="flex justify-between text-champagne-white/70">
                      <dt className="text-champagne-white/40">Name</dt>
                      <dd>{customer.name}</dd>
                    </div>
                    <div className="flex justify-between text-champagne-white/70">
                      <dt className="text-champagne-white/40">Phone</dt>
                      <dd>{customer.phone}</dd>
                    </div>
                    <div className="flex justify-between text-champagne-white/70">
                      <dt className="text-champagne-white/40">Email</dt>
                      <dd>{customer.email}</dd>
                    </div>
                  </dl>
                </div>

                <div className="border border-champagne-gold/15 rounded-2xl px-6 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-champagne-white text-xl font-light tracking-wide">Delivery Address</h2>
                    <button
                      onClick={backToDetails}
                      className="flex items-center gap-1.5 text-champagne-gold/70 hover:text-champagne-gold text-xs tracking-wider uppercase font-sans transition-colors cursor-pointer"
                    >
                      <PencilSimple size={12} /> Edit
                    </button>
                  </div>
                  <p className="font-sans text-champagne-white/70 text-sm leading-relaxed">
                    {address.house}, {address.road}, {address.street}
                    {address.block && `, ${address.block}`}
                    <br />
                    {address.area}, {address.city}, {address.country}
                    {address.notes && (
                      <>
                        <br />
                        <span className="text-champagne-white/40">Note: {address.notes}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="border border-champagne-gold/15 rounded-2xl px-6 py-5">
                  <h2 className="font-serif text-champagne-white text-xl font-light tracking-wide mb-4">Payment Method</h2>
                  <PaymentMethodSelector value="cod" />
                </div>
              </div>

              <div className="space-y-6 lg:sticky lg:top-32 self-start">
                <ReviewSummary totals={totals} />
                <CheckoutSubmitBar
                  status={status}
                  errorMessage={errorMessage}
                  disabled={items.length === 0}
                  onSubmit={handleConfirm}
                  onRetry={handleConfirm}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
