import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavBar from "./navbar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <NavBar />
      </SheetContent>
    </Sheet>
  );
}
