"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Category {
  title: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    title: "Mujeres",
    image: "/images/4/mujer.png",
    href: "/productos?categoria=mujer",
  },
  {
    title: "Hombres",
    image: "/images/4/hombre.png",
    href: "/productos?categoria=hombre",
  },
  {
    title: "Niños",
    image: "/images/4/niño.png",
    href: "/productos?categoria=ninos",
  },
  {
    title: "Publicidad",
    image: "/images/4/publicidad.png",
    href: "/publicidad",
  },
];

export default function CategoryGrid() {
  const reduce = useReducedMotion();

  // Duraciones (más lentas). Si el usuario prefiere menos animación, casi instantáneo.
  const D = reduce ? 0.01 : 1.2; // card + zoom
  const D_FAST = reduce ? 0.01 : 0.9; // overlay + título
  const D_SHINE = reduce ? 0.01 : 1.8; // brillo

  const cardVariants: Variants = {
    rest: {
      borderRadius: "2.5rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.10)",
    },
    hover: {
      // Más pronunciado (pero sin llegar a píldora)
      borderRadius: "3.5rem",
      boxShadow: "0 28px 56px rgba(0,0,0,0.22)",
      transition: {
        type: "spring",
        stiffness: 60, // menor stiffness => movimiento más suave
        damping: 20,
        duration: D,
      },
    },
  };

  const imageVariants: Variants = {
    rest: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.04,
      rotateY: 1.5,
      transition: { duration: D, ease: "easeInOut" },
    },
  };

  const overlayVariants: Variants = {
    rest: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: D_FAST, ease: "easeInOut", delay: 0.05 },
    },
  };

  const shineVariants: Variants = {
    rest: { x: "-120%" },
    hover: {
      x: "220%",
      transition: { duration: D_SHINE, ease: "easeInOut" },
    },
  };

  const titleVariants: Variants = {
    rest: { scale: 0.9, opacity: 0.75 },
    hover: {
      scale: 1,
      opacity: 1,
      transition: { duration: D_FAST, ease: "easeOut", delay: 0.12 },
    },
  };

  return (
    <section className="w-full bg-(--brand-50) py-16">
      <div className="container-soft">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="block outline-none"
            >
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative h-[420px] overflow-hidden shadow-(--shadow-card) group cursor-pointer"
                variants={cardVariants}
              >
                {/* Image with smooth zoom */}
                <motion.div
                  variants={imageVariants}
                  className="absolute inset-0"
                  style={{ willChange: "transform" }}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={600}
                    height={420}
                    className="h-full w-full object-cover"
                    priority={false}
                  />
                </motion.div>

                {/* Gradient overlay */}
                <motion.div
                  variants={overlayVariants}
                  className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
                />

                {/* Shine effect */}
                <motion.div
                  variants={shineVariants}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />

                {/* Title centered */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <motion.span
                    variants={titleVariants}
                    className="text-white text-xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  >
                    {category.title.toUpperCase()}
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
