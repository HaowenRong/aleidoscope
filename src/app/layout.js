// app/layout.tsx
export const metadata = {
  title: 'phiew',
  description: '...',
};

import NaviBar from "@/components/NaviBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NaviBar />
        {children}
      </body>
    </html>
  );
}
