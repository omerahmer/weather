import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import WeatherDisplay from "@/components/WeatherDisplay";
import { Protect } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}>
      <Navbar />
      <Protect>
        <WeatherDisplay />
      </Protect>
    </div>
  );
}
