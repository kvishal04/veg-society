import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import ReduxProvider from "@/redux/provider";
import ToastProvider from "@/components/Toast/Toaster";
import Footer from "@/Module/Footer";
import NextTopLoader from 'nextjs-toploader';
import Loader from "@/components/Loader/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Vegetarian Society",
  description: "The Vegetarian Society is a community-driven organization that champions a lifestyle rooted in compassion, sustainability, and well-being. It serves as a hub for those looking to embrace vegetarianism, offering guidance, support, and practical resources to make the journey easier. With a focus on ethical eating, environmental responsibility, and personal health, the society encourages individuals to explore the benefits of a plant-based diet. Through education, certification programs, and advocacy, it strives to create a world where vegetarian choices are accessible, understood, and celebrated.",
  icons: {
    icon: [
      { url: '/assets/images/favicon.ico' },
      { url: '/assets/images/favicon-32x32.png', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/images/apple-touch-icon.png' },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ReduxProvider>
        <NextTopLoader  showSpinner={false}/>
          <ToastProvider />
          <div className="">{children}</div> {/* Content */}
          <Loader />
        </ReduxProvider>
        {/* Footer */}
          <Footer />
      </body>
    </html>
  );
}
