import "./globals.css";
import { AuthProvider } from "./context/authContext";

import Header from "./components/Header/Header.jsx";

export const metadata = {
  title: "Learning Audit App",
  description: "Created by me, for anyone!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
