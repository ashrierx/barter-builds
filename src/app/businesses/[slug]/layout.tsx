// src/app/businesses/[id]/layout.tsx

import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '../../globals.css'; // Assuming your globals.css is here

// You can use a different font if you prefer
const inter = Inter({ subsets: ['latin'] });

// Define metadata for the page, which is good for SEO
export const metadata: Metadata = {
  title: 'Business Details',
  description: 'Learn more about the businesses on our platform.',
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*
          This layout will contain any components that should be present on every
          individual business page, such as a consistent header or footer.
          For this example, we'll keep it simple and just render the children.
        */}
        {children}
      </body>
    </html>
  );
}

