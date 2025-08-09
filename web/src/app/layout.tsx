import Variables from "../components/custom/Variables";
import { Background } from "./Background";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Signika } from "next/font/google";

const inter = Signika({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#202c39]`}>
        <main className="flex flex-col items-center">
          <div className="relative z-0 flex h-screen w-full items-center justify-center">
            <Background />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Providers>
                <Variables>{children}</Variables>
              </Providers>
            </div>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
