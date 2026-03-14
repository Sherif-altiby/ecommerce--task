// src/pages/Checkout/components/ShippingForm.tsx
import { useForm }        from "react-hook-form";
import { zodResolver }    from "@hookform/resolvers/zod";
import { z }              from "zod";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import type { ShippingAddress } from "../../types";
import { useLang } from "../../store/hooks";

// ── Validation schema ─────────────────────────────────────
const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone:    z.string().min(8, "Enter a valid phone number"),
  street:   z.string().min(5, "Enter a valid street address"),
  city:     z.string().min(2, "Enter a valid city"),
  country:  z.string().min(2, "Enter a valid country"),
  zip:      z.string().min(4, "Enter a valid ZIP code"),
});

interface ShippingFormProps {
  defaultValues: ShippingAddress;
  onSubmit:      (data: ShippingAddress) => void;
  onBack:        () => void;
}

// ── Reusable field ────────────────────────────────────────
const Field = ({
  label, labelAr, error, isAr, children,
}: { label: string; labelAr: string; error?: string; isAr: boolean; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
      {isAr ? labelAr : label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none font-medium
   ${hasError
     ? "border-red-300 bg-red-50 focus:border-red-400"
     : "border-blue-100 bg-blue-50 focus:border-blue-400 focus:bg-white"
   }`;

const ShippingForm = ({ defaultValues, onSubmit, onBack }: ShippingFormProps) => {
  const { t, isAr } = useLang();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingAddress>({
    resolver:      zodResolver(schema),
    defaultValues,
    mode:          "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

      {/* ── Name + Phone ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" labelAr="الاسم الكامل" error={errors.fullName?.message} isAr={isAr}>
          <input
            {...register("fullName")}
            placeholder={t("shipping.namePlaceholder")}
            className={inputClass(!!errors.fullName)}
            style={{ fontFamily: "inherit" }}
          />
        </Field>
        <Field label="Phone" labelAr="رقم الهاتف" error={errors.phone?.message} isAr={isAr}>
          <input
            {...register("phone")}
            placeholder="+20 100 000 0000"
            className={inputClass(!!errors.phone)}
            style={{ fontFamily: "inherit" }}
          />
        </Field>
      </div>

      {/* ── Street ── */}
      <Field label="Street Address" labelAr="عنوان الشارع" error={errors.street?.message} isAr={isAr}>
        <input
          {...register("street")}
          placeholder={t("shipping.streetPlaceholder")}
          className={inputClass(!!errors.street)}
          style={{ fontFamily: "inherit" }}
        />
      </Field>

      {/* ── City + ZIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="City" labelAr="المدينة" error={errors.city?.message} isAr={isAr}>
          <input
            {...register("city")}
            placeholder={t("shipping.cityPlaceholder")}
            className={inputClass(!!errors.city)}
            style={{ fontFamily: "inherit" }}
          />
        </Field>
        <Field label="ZIP Code" labelAr="الرمز البريدي" error={errors.zip?.message} isAr={isAr}>
          <input
            {...register("zip")}
            placeholder="11511"
            className={inputClass(!!errors.zip)}
            style={{ fontFamily: "inherit" }}
          />
        </Field>
      </div>

      {/* ── Country ── */}
      <Field label="Country" labelAr="الدولة" error={errors.country?.message} isAr={isAr}>
        <select
          {...register("country")}
          className={inputClass(!!errors.country)}
          style={{ fontFamily: "inherit" }}
        >
          <option value="Egypt">Egypt — مصر</option>
          <option value="Saudi Arabia">Saudi Arabia — السعودية</option>
          <option value="UAE">UAE — الإمارات</option>
          <option value="Kuwait">Kuwait — الكويت</option>
          <option value="Jordan">Jordan — الأردن</option>
        </select>
      </Field>

      {/* ── Buttons ── */}
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-blue-100 text-slate-600 font-bold text-sm hover:border-blue-300 hover:text-blue-600 transition-all"
          style={{ fontFamily: "inherit" }}
        >
          <ArrowLeft size={15} className={isAr ? "rotate-180" : ""} />
          {t("shipping.back")}
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontFamily: "inherit" }}
        >
          <CheckCircle size={15} />
          {t("shipping.confirmAddress")}
          <ArrowRight size={15} className={isAr ? "rotate-180" : ""} />
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;