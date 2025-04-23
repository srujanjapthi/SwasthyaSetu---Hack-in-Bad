import AppLogo from "@/components/AppLogo";
import { cn } from "@/lib/utils";

export default function Redirect({ className = "" }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-screen animate-pulse bg-main",
        className
      )}
    >
      <AppLogo />
    </div>
  );
}
