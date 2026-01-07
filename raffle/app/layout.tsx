import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHI Christmas Countdown Raffle | Win Prizes & Build Connection",
  description: "Win prizes while supporting Social Health education. Every ticket funds real-world connection skills training for students and teachers.",
  keywords: "raffle, Social Health Initiative, schools, connection, education, nonprofit",
  openGraph: {
    title: "SHI Christmas Countdown Raffle",
    description: "Win Prizes. Build Connection. Strengthen Schools.",
    type: "website",
    url: "https://raffle.socialhealthinitiative.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHI Christmas Countdown Raffle",
    description: "Win Prizes. Build Connection. Strengthen Schools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
