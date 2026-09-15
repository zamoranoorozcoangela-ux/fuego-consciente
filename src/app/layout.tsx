import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La raíz de lo que duele · Fuego Consciente",
  description:
    "Recorrido de siete pasos para encontrar la necesidad madre detrás de lo que duele.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
