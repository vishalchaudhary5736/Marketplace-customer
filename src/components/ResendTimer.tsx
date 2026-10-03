// components/ResendTimer.tsx
import { useEffect, useState } from "react";

type Props = {
  seconds: number;
  onResend: () => Promise<boolean>;
  isLoading?: boolean;
  pHeader: string;
  bHeader: string;
};

export function ResendTimer({
  pHeader,
  bHeader,
  seconds,
  onResend,
  isLoading,
}: Props) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);

  const handleClick = async () => {
    const ok = await onResend();
    if (ok) setLeft(seconds);
  };

  return (
    <p className="text-center text-muted text-[15px]">
      {pHeader}{" "}
      {left > 0 ? (
        `Resend in ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          className="text-[rgb(154,52,18)] font-semibold underline disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Sending..." : `${bHeader}`}
        </button>
      )}
    </p>
  );
}
