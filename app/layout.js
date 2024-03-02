import { Inter, Prompt } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });


export const metadata = {
  title: "Abdellah Edaoudi",
  description: "Portfolio Abdellah Edaoudi",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={prompt.className}>
        {children}
      </body>
    </html>
  );
}
