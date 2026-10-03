import type { ReactNode } from "react";

type Props = {
  heading: string;
  subtext: string;
  children: ReactNode;
};

export function AuthLayout({ heading, subtext, children }: Props) {
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel — hidden on small screens */}
      <aside className="hidden w-130 flex-col justify-between bg-brand p-14 text-[#FFF8F1] lg:flex">
        <div className="flex items-center gap-2.5 text-lg font-semibold">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          Marketplace
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[44px] leading-tight font-medium">
            {heading}
          </h2>
          <p className="text-[#FFE9D9]">{subtext}</p>
        </div>
        <p className="text-sm text-[#FFE9D9]">© Marketplace</p>
      </aside>

      {/* Right side — the form goes here */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-100">{children}</div>
      </main>
    </div>
  );
}
