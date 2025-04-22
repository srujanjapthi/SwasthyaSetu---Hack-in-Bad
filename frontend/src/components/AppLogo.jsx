import { Shield } from "lucide-react";

export default function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex overflow-hidden rounded-full">
        <Shield size={35} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold leading-none dark:text-white">
          SwasthyaSetu
        </h1>
        <p className="text-md leading-none text-muted-foreground">healthcare</p>
      </div>
    </div>
  );
}
