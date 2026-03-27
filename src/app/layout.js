// fonts
import localFont from 'next/font/local';

export const metadata = {
  title: 'phiew',
  description: '...',
};

const manrope = localFont({
  src: [
    { path: '../../public/fonts/manrope/Manrope-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: '../../public/fonts/manrope/Manrope-Light.woff2',      weight: '300', style: 'normal' },
    { path: '../../public/fonts/manrope/Manrope-Regular.woff2',    weight: '400', style: 'normal' },
    { path: '../../public/fonts/manrope/Manrope-Medium.woff2',     weight: '500', style: 'normal' },
    { path: '../../public/fonts/manrope/Manrope-SemiBold.woff2',   weight: '600', style: 'normal' },
    { path: '../../public/fonts/manrope/Manrope-Bold.woff2',       weight: '700', style: 'normal' },
    { path: '../../public/fonts/manrope/Manrope-ExtraBold.woff2',  weight: '800', style: 'normal' },
    { path: '../../public/fonts/manrope/Manrope-ExtraBold.woff2',  weight: '800', style: 'normal' },
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
