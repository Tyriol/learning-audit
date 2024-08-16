import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learning Audit App",
  description: "Created by me, for anyone!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
