import AppLogo from "@/components/AppLogo";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full px-10 py-4 border-b sticky top-0 bg-white/40 backdrop-blur-lg z-50">
      <div>
        <AppLogo />
      </div>
    </nav>
  );
}
