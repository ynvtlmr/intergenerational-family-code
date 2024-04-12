import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { wealthItems } from "./data";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function WealthForestPage() {
  return (
    <AuthenticatedRoute>
      <main className="p-8">
        <h1 className="mb-8 text-4xl font-bold">Building Your Wealth Forest</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {wealthItems.map((item, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <div className="group relative cursor-pointer">
                  <div
                    className="relative h-auto w-full"
                    style={{ aspectRatio: "1 / 1" }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-xl group-hover:text-white">
                      {item.alt}
                    </span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{item.alt}</DialogTitle>
                </DialogHeader>
                <div>{item.description}</div>
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </AuthenticatedRoute>
  );
}
