import MobileSidebar from "./mobile-sidebar";

export default function MobileHeader() {
  return (
    <div className=" fixed top-0 flex items-center px-6 py-6 lg:hidden">
      <MobileSidebar />
    </div>
  );
}
