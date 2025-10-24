"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import MiniCart from "./mini-cart";
import MobileNav from "./mobile-nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/60">
      <div className="container-soft">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <MobileNav />
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-[var(--brand-500)]" />
              <span className="text-xl font-bold text-[var(--fg)]">
                Zapatillas
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Inicio
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[var(--brand-100)] to-[var(--brand-200)] p-6 no-underline outline-none focus:shadow-md"
                            href="/productos"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-[var(--brand-900)]">
                              Todas las Zapatillas
                            </div>
                            <p className="text-sm leading-tight text-[var(--brand-700)]">
                              Descubre nuestra colección completa de zapatillas
                              sostenibles
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/productos?category=running"
                          >
                            <div className="text-sm font-medium leading-none">
                              Running
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Zapatillas para correr con máximo rendimiento
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/productos?category=casual"
                          >
                            <div className="text-sm font-medium leading-none">
                              Casual
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Zapatillas cómodas para el día a día
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <MiniCart />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Cart */}
          <div className="lg:hidden">
            <MiniCart />
          </div>
        </div>
      </div>
    </header>
  );
}
