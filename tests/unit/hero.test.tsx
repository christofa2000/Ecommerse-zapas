import Hero from "@/components/hero";
import { render, screen } from "@testing-library/react";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("Hero", () => {
  it("renders main heading", () => {
    render(<Hero />);

    expect(screen.getByText(/Zapatillas que respetan el/)).toBeInTheDocument();
    expect(screen.getByText(/planeta/)).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<Hero />);

    expect(
      screen.getByText(/Descubre nuestra colección de zapatillas sostenibles/)
    ).toBeInTheDocument();
  });

  it("renders call to action buttons", () => {
    render(<Hero />);

    expect(
      screen.getByRole("link", { name: /Ver Colección/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Nuestra Historia/i })
    ).toBeInTheDocument();
  });

  it("has correct links", () => {
    render(<Hero />);

    const verColeccionLink = screen.getByRole("link", {
      name: /Ver Colección/i,
    });
    const nuestraHistoriaLink = screen.getByRole("link", {
      name: /Nuestra Historia/i,
    });

    expect(verColeccionLink).toHaveAttribute("href", "/productos");
    expect(nuestraHistoriaLink).toHaveAttribute("href", "/sobre-nosotros");
  });

  it("renders feature list", () => {
    render(<Hero />);

    expect(screen.getByText("100% Sostenible")).toBeInTheDocument();
    expect(screen.getByText("Materiales Naturales")).toBeInTheDocument();
    expect(screen.getByText("Cómodas y Duraderas")).toBeInTheDocument();
  });

  it("has proper button styling", () => {
    render(<Hero />);

    const primaryButton = screen.getByRole("link", { name: /Ver Colección/i });
    expect(primaryButton.className).toEqual(
      expect.stringContaining("bg-(--brand-500)")
    );
  });
});
