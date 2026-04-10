import './globals.css';

export const metadata = {
  // CUSTOMIZE: Change these to your course name and module code
  title: 'FD Assessment | Financial Derivatives',
  description: 'Financial Derivatives — Online Assessment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
