import "@/styles/globals.css";
import "@/styles/toastify.css";
// include styles from the ui package
import "@cargoship/ui/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="bg-white">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
