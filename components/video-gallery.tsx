"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface VideoImagePair {
  video: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  href: string;
}

const videoImagePairs: VideoImagePair[] = [
  {
    video: "/video/video-niño.mp4",
    image: "/video/niño.png",
    alt: "Zapatillas para niños - Colección sostenible",
    title: "Zapatillas para Niños",
    description:
      "Diseñadas para los más pequeños, combinando comodidad, durabilidad y materiales sostenibles. Perfectas para el juego activo y el día a día.",
    href: "/productos?categoria=ninos",
  },
  {
    video: "/video/video-mujer.mp4",
    image: "/video/mujer.png",
    alt: "Zapatillas para mujer - Diseño elegante y sostenible",
    title: "Zapatillas para Mujer",
    description:
      "Elegancia y sostenibilidad en cada paso. Diseñadas pensando en el confort y el estilo, con materiales naturales que respetan el planeta.",
    href: "/productos?categoria=mujer",
  },
  {
    video: "/video/video-hombre.mp4",
    image: "/video/hombre.png",
    alt: "Zapatillas para hombre - Estilo y comodidad",
    title: "Zapatillas para Hombre",
    description:
      "Estilo y rendimiento en perfecto equilibrio. Zapatillas versátiles que combinan diseño moderno con materiales eco-friendly y máxima comodidad.",
    href: "/productos?categoria=hombre",
  },
];

const VIDEO_DURATION = 8000; // 8 segundos

export default function VideoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Callback ref para manejar el video cuando se monta
  const setVideoRef = (node: HTMLVideoElement | null) => {
    videoRef.current = node;
    // Reproducir cuando el video esté listo y en viewport
    if (node && isInView && !shouldReduceMotion) {
      const playPromise = node.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignorar errores de autoplay
        });
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reproducir video cuando cambie el índice o esté en viewport
  useEffect(() => {
    if (videoRef.current && isInView && !shouldReduceMotion) {
      // Pequeño delay para asegurar que el video esté montado después de AnimatePresence
      const timer = setTimeout(() => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Ignorar errores de autoplay
            });
          }
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isInView, shouldReduceMotion]);

  useEffect(() => {
    if (!isPlaying || !isInView || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoImagePairs.length);
    }, VIDEO_DURATION);

    return () => clearInterval(interval);
  }, [isPlaying, isInView, shouldReduceMotion]);

  const currentPair = videoImagePairs[currentIndex];

  return (
    <section ref={sectionRef} className="py-16 bg-(--bg)">
      <div className="container-soft">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Video Section - Left */}
          <div className="space-y-6">
            {/* Title above video */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-(--fg) tracking-tight sm:text-4xl">
                Modelos Ecológicos
              </h2>
            </div>

            {/* Video container with shadow */}
            <div className="relative aspect-video overflow-hidden rounded-(--radius) bg-(--brand-50) shadow-(--shadow-card)">
              <AnimatePresence mode="wait">
                <motion.video
                  key={currentPair.video}
                  ref={setVideoRef}
                  src={currentPair.video}
                  poster={currentPair.image}
                  muted
                  playsInline
                  preload="auto"
                  loop={false}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedData={() => {
                    // Reproducir cuando el video esté cargado y en viewport
                    if (isInView && !shouldReduceMotion && videoRef.current) {
                      const playPromise = videoRef.current.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(() => {
                          // Ignorar errores de autoplay
                        });
                      }
                    }
                  }}
                  onCanPlay={() => {
                    // Intentar reproducir cuando el video pueda reproducirse
                    if (isInView && !shouldReduceMotion && videoRef.current) {
                      const playPromise = videoRef.current.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(() => {
                          // Ignorar errores de autoplay
                        });
                      }
                    }
                  }}
                  onEnded={() => {
                    // El video terminó, pero el intervalo se encargará del cambio
                  }}
                  aria-label={currentPair.alt}
                >
                  <source
                    src={currentPair.video.replace(".mp4", ".webm")}
                    type="video/webm"
                  />
                  <source src={currentPair.video} type="video/mp4" />
                  Tu navegador no soporta videos.
                </motion.video>
              </AnimatePresence>

              {/* Progress indicator dots */}
              <div
                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
                role="tablist"
                aria-label="Indicadores de video"
              >
                {videoImagePairs.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsPlaying(true);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 focus-ring ${
                      index === currentIndex
                        ? "w-8 bg-(--brand-500)"
                        : "w-2 bg-(--brand-300)"
                    }`}
                    aria-label={`Ir al video ${index + 1}: ${
                      videoImagePairs[index].title
                    }`}
                    aria-selected={index === currentIndex}
                    role="tab"
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>

            {/* Description and Button - Centered */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPair.title}-content`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-center"
              >
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-(--fg) sm:text-3xl">
                    {currentPair.title}
                  </h3>
                  <p className="text-base text-(--muted) leading-relaxed max-w-2xl mx-auto sm:text-lg">
                    {currentPair.description}
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-(--brand-500) hover:bg-(--brand-600) text-white focus-ring shadow-(--shadow-card) hover:shadow-(--shadow-elevated) transition-all duration-200"
                >
                  <Link href={currentPair.href}>Ver Colección</Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Section - Right (smaller) */}
          <div className="relative aspect-4/5 overflow-hidden rounded-(--radius) bg-(--brand-50) shadow-(--shadow-card)">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPair.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full"
              >
                <Image
                  src={currentPair.image}
                  alt={currentPair.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
