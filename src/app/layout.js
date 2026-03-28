// fonts
import localFont from 'next/font/local';

export const metadata = {
  title: 'phiew',
  description: '...',
};

const manrope = localFont({
  src: [
    { path: '../../public/fonts/manrope/Manrope-Variable.woff2',   weight: '100 900', style: 'normal' }
  ],
  variable: '--font-manrope',
})

// navibar
import NaviBar from '@/components/NaviBar';

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={manrope.variable}>
      <body>
        <NaviBar />
        {children}
      </body>
    </html>
  );
}
