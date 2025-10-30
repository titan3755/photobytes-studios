'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function Providers({ children }: { children: React.ReactNode }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set');
  }
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <SessionProvider>
        <GoogleReCaptchaProvider
          reCaptchaKey={recaptchaKey}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
            nonce: undefined,
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
