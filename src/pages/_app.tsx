import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark, neobrutalism } from '@clerk/themes'
import type { AppProps } from 'next/app'
import { ProtectedRoute } from './protectedRoute'


function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        signIn: { baseTheme: neobrutalism },
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default App;