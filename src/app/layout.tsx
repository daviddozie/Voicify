import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Voicify",
  description: "Voicify is a text-to-speech web app that converts text into natural-sounding speech with customizable voices and languages.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
