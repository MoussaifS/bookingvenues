import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SelectExperience() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black p-4 sm:p-8 md:p-12">
      <div className="max-w-[980px] mx-auto">
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold mb-1 text-[#1d1d1f]">
          The latest.
          <span className="text-[#6e6e73] block sm:inline text-[24px] sm:text-[40px] md:text-[48px] mt-2 sm:mt-0"> 
            Take a look at what's available, right now.
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <Link href="/venue" className="block">
            <Card className="rounded-[20px] sm:rounded-[27px] overflow-hidden bg-black text-white p-4 sm:p-8 hover:scale-[1.02] transition-transform duration-300">
              <CardHeader className="space-y-2 p-0">
                <CardTitle className="text-[32px] sm:text-[40px] font-semibold leading-tight">
                  Conference Room
                </CardTitle>
                <CardDescription className="text-lg sm:text-xl text-white/90">
                  For big events
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-3 sm:mt-4">
                <p className="text-xl sm:text-2xl font-medium">
                  From $999
                  <span className="text-base sm:text-lg text-white/60 block sm:inline"> 
                    or $41.62/mo. for 24 mo.*
                  </span>
                </p>
              </CardContent>
              <div className="mt-6 sm:mt-8 h-[300px] sm:h-[400px] relative">
                <div className="w-full h-full bg-[#ff3b30] rounded-xl sm:rounded-2xl" />
              </div>
            </Card>
          </Link>

          <Link href="/venue" className="block">
            <Card className="rounded-[20px] sm:rounded-[27px] overflow-hidden bg-white p-4 sm:p-8 hover:scale-[1.02] transition-transform duration-300">
              <CardHeader className="space-y-2 p-0">
                <CardTitle className="text-[32px] sm:text-[40px] font-semibold leading-tight text-black">
                  Meeting Room
                </CardTitle>
                <CardDescription className="text-lg sm:text-xl text-black/60">
                  For private events
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-3 sm:mt-4">
                <p className="text-xl sm:text-2xl font-medium text-black">
                  From $399
                  <span className="text-base sm:text-lg text-black/60 block sm:inline"> 
                    or $33.25/mo. for 12 mo.†
                  </span>
                </p>
              </CardContent>
              <div className="mt-6 sm:mt-8 h-[300px] sm:h-[400px] relative">
                <div className="w-full h-full bg-[#ff3b30] rounded-xl sm:rounded-2xl" />
              </div>
            </Card>
          </Link>
        </div>

        <footer className="mt-8 sm:mt-12 text-xs sm:text-sm text-[#6e6e73] px-4 sm:px-0">
          * Financing terms apply. Monthly pricing requires approved credit.
        </footer>
      </div>
    </div>
  );
}