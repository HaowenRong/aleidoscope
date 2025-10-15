import localFont from "next/font/local";

// app/layout.tsx
export const metadata = {
  title: 'phiew',
  description: '...',
};

import NaviBar from "@/components/NaviBar";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi/Satoshi-Regular.woff2", weight: '400', style: 'normal',
      path: "../../public/fonts/Satoshi/Satoshi-Bold.woff2", weight: '700', style: 'normal'
    },
  ],
  variable: "--font-satoshi"
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <NaviBar />
        {children}
      </body>
    </html>
  );
}
