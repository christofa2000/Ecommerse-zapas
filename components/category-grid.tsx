"use client";

import { motion } from "framer-motion";
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
    image: "/images/4/mujer.webp",
    href: "/productos?categoria=mujer",
  },
  {
    title: "Hombres",
    image: "/images/4/hombre.jpg",
    href: "/productos?categoria=hombre",
  },
  {
    title: "Niños",
    image: "/images/4/niño2.jpg",
    href: "/productos?categoria=ninos",
  },
  {
    title: "Publicidad",
    image: "/images/4/publicidad.png",
    href: "/publicidad",
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full bg-(--brand-50) py-16">
      <div className="container-soft">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="focus-ring"
            >
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative overflow-hidden rounded-3xl shadow-(--shadow-card) group cursor-pointer"
              >
                <motion.div
                  variants={{
                    rest: {
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      y: 0,
                      scale: 1,
                    },
                    hover: {
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                      y: -8,
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative h-full"
                >
                  {/* Image with zoom effect */}
                  <div className="relative h-[420px] overflow-hidden">
                    <motion.div
                      variants={{
                        rest: { scale: 1, rotateY: 0 },
                        hover: {
                          scale: 1.1,
                          rotateY: 2,
                          transition: {
                            duration: 0.5,
                            ease: "easeOut",
                          },
                        },
                      }}
                      className="h-full w-full"
                    >
                      <Image
                        src={category.image}
                        alt={category.title}
                        width={600}
                        height={420}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <motion.div
                      variants={{
                        rest: { opacity: 0 },
                        hover: {
                          opacity: 1,
                          transition: { duration: 0.3 },
                        },
                      }}
                      className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
                    />

                    {/* Shine effect */}
                    <motion.div
                      variants={{
                        rest: { x: "-100%" },
                        hover: {
                          x: "200%",
                          transition: {
                            duration: 0.6,
                            ease: "easeInOut",
                          },
                        },
                      }}
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                  </div>

                  {/* Title with slide up effect */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <motion.span
                      variants={{
                        rest: { y: 20, opacity: 0.7 },
                        hover: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.3,
                            delay: 0.1,
                          },
                        },
                      }}
                      className="block text-white text-lg font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    >
                      {category.title.toUpperCase()}
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
