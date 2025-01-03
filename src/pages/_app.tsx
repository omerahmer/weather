import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import type { AppProps } from 'next/app'


function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default App;