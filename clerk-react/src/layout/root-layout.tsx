import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import '../global.css'

export const metadata = {
    title: 'Health and Fitness Website',
    description: 'Beefit provides the minimalists dream for fitness solutions, featuring an analytics dashboard, a weekly reminder of their upcoming workouts, and a writing tool for personal evaluations, shower-thoughts, many more.',
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function RootLayout() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
        <html lang='en'>
            <body>
                <main className="container mx-auto">
                    <div className="flex items-start justify-center min-h-screen">
                        <div className='mt-20'>
                            <Outlet/>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    </ClerkProvider>
  );
}