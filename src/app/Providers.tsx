"use client";
import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from '@nextui-org/react'

interface ProvidersProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function ProvidersNextUI({children}: ProvidersProps) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}