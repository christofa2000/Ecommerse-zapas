import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-(--brand-50)">
      <div className="container-soft">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-(--brand-500)" />
                <span className="text-xl font-bold text-(--fg)">
                  Zapatillas
                </span>
              </div>
              <p className="text-sm text-(--muted)">
                Zapatillas sostenibles y cómodas para el día a día. Inspiradas
                en la naturaleza, diseñadas para el futuro.
              </p>
            </div>

            {/* Productos */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-(--fg)">Productos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/productos"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Todas las Zapatillas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productos?category=running"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Running
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productos?category=casual"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Casual
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productos?badge=sostenible"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Sostenibles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-(--fg)">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sostenibilidad"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Sostenibilidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trabajos"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Trabajos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/prensa"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Prensa
                  </Link>
                </li>
              </ul>
            </div>

            {/* Soporte */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-(--fg)">Soporte</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/ayuda"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tallas"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Guía de Tallas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/devoluciones"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-(--muted) hover:text-(--brand-600) transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-(--muted)">
                © 2024 Zapatillas. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacidad"
                  className="text-(--muted) hover:text-(--brand-600) transition-colors"
                >
                  Privacidad
                </Link>
                <Link
                  href="/terminos"
                  className="text-(--muted) hover:text-(--brand-600) transition-colors"
                >
                  Términos
                </Link>
                <Link
                  href="/cookies"
                  className="text-(--muted) hover:text-(--brand-600) transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}












