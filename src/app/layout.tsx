import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./layout.module.scss";
import BackgroundComponent from "./components/Three/BackgroundComponent";
import NavBar from "./components/navbar/NavBar";
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio of a software developer",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        color: "#ffffff",
        url: "/icon.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        color: "#ffffff",
        url: "/icon.svg",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundComponent className={styles.background} />
        <div className={styles.card}>
          <NavBar />
          <div className={styles.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
