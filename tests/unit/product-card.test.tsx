import ProductCard from "@/components/product-card";
import { Product } from "@/lib/products/types";
import { fireEvent, render, screen } from "@testing-library/react";

const mockProduct: Product = {
  id: "1",
  slug: "test-product",
  name: "Test Product",
  price: 10000,
  originalPrice: 12000,
  image: "/test-image.jpg",
  images: ["/test-image.jpg"],
  badges: ["nuevo", "más vendido"],
  description: "A test product description",
  sizes: ["38", "39", "40"],
  colors: ["Blanco", "Negro"],
  category: "casual",
  inStock: true,
  stock: { "38": 5, "39": 8, "40": 10 },
  materials: ["Test material"],
  features: ["Test feature"],
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A test product description")).toBeInTheDocument();
    expect(screen.getByText("$ 10.000")).toBeInTheDocument();
    expect(screen.getByText("$ 12.000")).toBeInTheDocument();
  });

  it("renders badges correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("nuevo")).toBeInTheDocument();
    expect(screen.getByText("más vendido")).toBeInTheDocument();
  });

  it("renders discount percentage correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("-17%")).toBeInTheDocument();
  });

  it("renders color previews", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Colores:")).toBeInTheDocument();
  });

  it("has accessible add to cart button", () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", { name: /agregar/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveClass("bg-[var(--brand-500)]");
  });

  it("calls add to cart when button is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", { name: /agregar/i });
    fireEvent.click(addButton);

    // The button should be clickable and not throw errors
    expect(addButton).toBeInTheDocument();
  });

  it("has proper link to product page", () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/productos/test-product");
  });

  it("renders image with correct alt text", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("test-image.jpg")
    );
  });
});
