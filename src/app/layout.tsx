import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'K-HELP | 한인 건강 교육 및 문해력 프로그램',
  description: 'Korean Health Education & Literacy Program — 캐나다 한인 커뮤니티를 위한 당뇨병 인식 및 건강 교육 프로그램',
  openGraph: {
    title: 'K-HELP | 한인 건강 교육 및 문해력 프로그램',
    description: 'Korean Health Education & Literacy Program',
    type: 'website',
    siteName: 'K-HELP',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
