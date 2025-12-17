import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | SHI Raffle",
  description: "Manage the SHI Christmas Countdown Raffle",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



