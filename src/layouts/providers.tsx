//"use client";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { RouterProvider } from "react-router-dom";
import router from "../routes/router";

export interface ProvidersProps {
  themeProps?: ThemeProviderProps;
}

export function Providers({ themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        {...themeProps}>
        <RouterProvider router={router}/>
      </NextThemesProvider>
    </NextUIProvider>
    
  );
}