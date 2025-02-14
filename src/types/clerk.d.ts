/// <reference types="@clerk/nextjs" />

declare module "@clerk/nextjs" {
  interface User {
    role?: string;
  }
}
