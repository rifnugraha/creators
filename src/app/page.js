"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RaeCreatorProfile() {
  const [active, setActive] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const members = [
    {
      name: "FARAH",
      motto: "Bawa santai aja lah.",
      instagram: "@hi.parqueen",
      link: "https://instagram.com/hi.parqueen",
      image: "/farah1.jpg",
    },
    {
      name: "BAYU",
      motto: "Kiw",
      instagram: "@qbayyy",
      link: "https://instagram.com/qbayyy",
      image: "/bayuu.png",
    },
    {
      name: "RAE",
      motto: "Football or F1? Yes.",
      instagram: "@rifnugraha_",
      link: "https://instagram.com/rifnugraha_",
      image: "/itsrae1.jpg",
    },
    {
      name: "LEVY",
      motto: "Tidak mengejar validasi, Tapi mengejar kualitas.",
      instagram: "@levyfajri",
      link: "https://instagram.com/levyfajri",
      image: "/lepi.jpeg",
    },
  ];

  const prevSlide = () => {
    setActive((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setActive((prev) => Math.min(prev + 1, members.length - 1));
  };

  return (
    <main
      className="w-full min-h-screen overflow-hidden bg-cover bg-center text-white relative"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
        {/* TITLE */}
        <div className="absolute top-[8vh] md:top-6 text-center z-[5]">
          <h1
            className="text-4xl md:text-7xl font-black tracking-tight text-white"
            style={{
              fontFamily: "Impact, sans-serif",
            }}
          >
            PRESENTED BY
          </h1>

          <p className="text-[10px] md:text-sm mt-2 text-white/80 tracking-wide font-light">
            Social Media Marketing Optimization
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative w-full max-w-6xl h-[500px] mt-10 md:mt-28 flex items-center justify-center overflow-visible">
          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-[28%] top-[54%] -translate-y-1/2 z-[80] w-14 h-14 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl items-center justify-center hover:scale-110 transition"
          >
            ←
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-[28%] top-[54%] -translate-y-1/2 z-[80] w-14 h-14 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl items-center justify-center hover:scale-110 transition"
          >
            →
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0].screenX;
            }}
            onTouchMove={(e) => {
              touchEndX.current = e.changedTouches[0].screenX;
            }}
            onTouchEnd={() => {
              const distance = touchStartX.current - touchEndX.current;

              if (distance > 50) {
                nextSlide();
              }

              if (distance < -50) {
                prevSlide();
              }
            }}
          >
            {members.map((member, index) => {
              let position = index - active;

              const configs = {
                0: {
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  zIndex: 50,
                  rotateY: 0,
                },

                1: {
                  x: isMobile ? 95 : 220,
                  scale: isMobile ? 0.76 : 0.6,
                  opacity: 0.7,
                  zIndex: 30,
                  rotateY: -18,
                },

                "-1": {
                  x: isMobile ? -95 : -220,
                  scale: isMobile ? 0.76 : 0.6,
                  opacity: 0.7,
                  zIndex: 30,
                  rotateY: 18,
                },

                2: {
                  x: isMobile ? 150 : 360,
                  scale: isMobile ? 0.55 : 0.4,
                  opacity: 0.35,
                  zIndex: 10,
                  rotateY: -25,
                },

                "-2": {
                  x: isMobile ? -150 : -360,
                  scale: isMobile ? 0.55 : 0.4,
                  opacity: 0.35,
                  zIndex: 10,
                  rotateY: 25,
                },
              };

              const current = configs[position] || {
                x: 0,
                scale: 0,
                opacity: 0,
                zIndex: 0,
                rotateY: 0,
              };

              return (
                <motion.div
                  key={member.name}
                  animate={{
                    x: current.x,
                    scale: current.scale,
                    opacity: current.opacity,
                    rotateY: current.rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                  }}
                  className="absolute"
                  style={{
                    zIndex: current.zIndex,
                  }}
                >
                  <div className="relative">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black/40 blur-2xl rounded-full" />

                    {/* DESKTOP */}
                    {!isMobile ? (
                      <a
                        href={position === 0 ? member.link : undefined}
                        target={position === 0 ? "_blank" : undefined}
                        rel={position === 0 ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (position !== 0) {
                            e.preventDefault();
                            setActive(index);
                          }
                        }}
                        className="block"
                      >
                        <CardContent member={member} position={position} />
                      </a>
                    ) : (
                      /* MOBILE */
                      <div
                        onClick={() => {
                          if (position === 0) {
                            window.open(member.link, "_blank");
                          }
                        }}
                      >
                        <CardContent member={member} position={position} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function CardContent({ member, position }) {
  return (
    <div className="relative w-[190px] md:w-[260px] h-[300px] md:h-[390px] rounded-[38px] p-[6px] bg-white/15 backdrop-blur-3xl border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)] overflow-hidden">
      <div className="absolute inset-0 rounded-[38px] bg-gradient-to-b from-white/30 to-white/5 opacity-70" />

      <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black/10">
        <img
          src={member.image}
          alt={member.name}
          className={`w-full h-full object-cover transition duration-700 ${
            position === 0
              ? "blur-0 scale-100"
              : "blur-[2px] scale-110 brightness-[0.7]"
          }`}
        />

        <AnimatePresence>
          {position === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6"
            >
              <h2
                className="text-4xl md:text-6xl font-black leading-none text-white"
                style={{
                  fontFamily: "Impact, sans-serif",
                }}
              >
                {member.name}
              </h2>

              <p className="mt-3 text-xs md:text-sm font-light leading-snug max-w-[220px] text-white">
                {member.motto}
              </p>

              <div className="mt-5 flex items-center gap-2 text-white/80 text-sm font-light">
                <span>◎</span>
                <span>{member.instagram}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
