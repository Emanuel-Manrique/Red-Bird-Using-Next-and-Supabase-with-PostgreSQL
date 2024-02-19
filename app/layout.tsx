import "./globals.css";

export const metadata = {
  title: "Red Bird",
  description: "Red Bird is a social media platform for birds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-900 min-h-screen flex">{children}</div>
      </body>
    </html>
  );
}
