"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart/store";
import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { getItemsCount } = useCartStore();
  const itemsCount = getItemsCount();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/sobre-nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden p-2"
          aria-label="Abrir menú de navegación"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg--(----brand-500)" />
              <span className="text-xl font-bold text--(----fg)">
                Zapatillas
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ✕
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text--(----fg) hover:text--(----brand-500) transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <div className="border-t pt-4">
            <Link
              href="/carrito"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-4 rounded-lg border border--(----brand-200) hover:bg--(----brand-50) transition-colors"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="h-6 w-6 text--(----fg)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18m0 0l2.5-5M17 18l-2.5-5"
                  />
                </svg>
                <span className="font-medium text--(----fg)">Carrito</span>
              </div>
              {itemsCount > 0 && (
                <div className="bg--(----brand-500) text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {itemsCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}




