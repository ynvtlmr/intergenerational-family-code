import MobileSidebar from "./mobile-sidebar";

export default function MobileHeader() {
  return (
    <nav className=" top-0 flex h-[60px] items-center px-6 lg:hidden">
      <MobileSidebar />
    </nav>
  );
}
