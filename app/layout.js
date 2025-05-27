import "./globals.css";
import { AuthProvider } from "./context/authContext";
import { ContentProvider } from "./context/contentContext";

import Header from "./components/Header/Header.jsx";
import HowToGuide from "./components/HowToGuide/HowToGuide";

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
            <ContentProvider>
              <Header />
              {children}
            </ContentProvider>
          </AuthProvider>
        </div>
        <HowToGuide />
      </body>
    </html>
  );
}
