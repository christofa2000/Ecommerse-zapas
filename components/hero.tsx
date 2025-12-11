"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: shouldReduceMotion ? 0 : 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const floatVariants = {
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        },
    transition: shouldReduceMotion
      ? {}
      : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-(--brand-50) to-(--brand-100) py-20">
      <div className="container-soft">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
        >
          {/* Content */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold tracking-tight text-(--fg) sm:text-5xl lg:text-6xl">
                Zapatillas que respetan el{" "}
                <span className="text-(--brand-600)">planeta</span>
              </h1>
              <p className="text-lg text-(--muted) sm:text-xl">
                Descubre nuestra colección de zapatillas sostenibles, cómodas y
                diseñadas para durar. Hechas con materiales naturales y pensadas
                para el futuro.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="bg-(--brand-500) hover:bg-(--brand-600) text-white focus-ring"
              >
                <Link href="/productos">Ver Colección</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-(--brand-300) text-(--brand-700) hover:bg-(--brand-100) focus-ring"
              >
                <Link href="/sobre-nosotros">Nuestra Historia</Link>
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-(--brand-500)" />
                <span className="text-sm text-(--muted)">100% Sostenible</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-(--brand-500)" />
                <span className="text-sm text-(--muted)">
                  Materiales Naturales
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-(--brand-500)" />
                <span className="text-sm text-(--muted)">
                  Cómodas y Duraderas
                </span>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            variants={imageVariants}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-(--radius) bg-(--brand-50)">
              <Image
                src="/images/zapas-blancas4.png"
                alt="Zapatillas sostenibles - Colección principal"
                width={600}
                height={600}
                className="h-full w-full object-cover object-bottom"
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
            </div>

            {/* Floating elements */}
            {!shouldReduceMotion && (
              <>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1] as const,
                  }}
                  className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-(--brand-500) opacity-60"
                  aria-hidden="true"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1] as const,
                    delay: 1,
                  }}
                  className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-(--brand-400) opacity-40"
                  aria-hidden="true"
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
