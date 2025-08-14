import { AlertType } from "../../../utils/data-utils";
export default function Alert({
  type,
  message,
  children,
}: {
  type: AlertType;
  message?: string;
  children?: React.ReactNode;
}) {
  const baseStyle = "mb-4 rounded-md border p-3 text-sm";
  const variants: Record<"error" | "success", string> = {
    error: "border-red-300 bg-red-50 text-red-800",
    success: "border-green-300 bg-green-50 text-green-900",
  };

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className={`${baseStyle} ${variants[type]}`}
    >
      {message || children}
    </div>
  );
}
