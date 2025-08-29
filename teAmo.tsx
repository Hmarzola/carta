"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Lock, ArrowLeft, Sparkles, Music, X, Star } from "lucide-react";

export default function RomanticLovePage() {
  const [currentScreen, setCurrentScreen] = useState<"password" | "letter">(
    "password"
  );
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const correctPassword = "15020110";

  const handleDigit = (digit: string) => {
    if (password.length < 8) {
      setPassword((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const checkPassword = () => {
    if (password.length === 8) {
      if (password === correctPassword) {
        setShowSuccess(true);
        setTimeout(() => {
          setCurrentScreen("letter");
          setShowSuccess(false);
        }, 2500);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPassword("");
        }, 500);
      }
    }
  };

  const goBack = () => {
    setCurrentScreen("password");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-pink-500 relative overflow-hidden">
      {/* Efecto mágico de fondo mejorado */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/30 to-rose-500/20 " />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/25 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-400/15 rounded-full blur-3xl animate-float" />
      </div>
      <FloatingHearts />
      <FloatingSparkles />
      <FloatingStars />
      <AnimatedBackground />

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white/30  rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-700 border border-white/40 ">
            <div className="relative">
              <Music className="w-16 h-16 text-rose-300 mx-auto mb-6 " />
              <div className="absolute -top-2 -right-2">
                <Heart className="w-8 h-8 text-pink-400 fill-current " />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 font-serif">
              ¡Correcto mi amor! 🎵
            </h3>
            <p className="text-rose-200 text-lg">
              💕 Esta canción es para ti 💕
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-4 h-4 text-pink-300 fill-current mx-1 "
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {currentScreen === "password" ? (
        <PasswordScreen
          password={password}
          shake={shake}
          onDigit={handleDigit}
          onDelete={handleDelete}
          onCheck={checkPassword}
        />
      ) : (
        <LoveLetterScreen onBack={goBack} />
      )}
    </div>
  );
}

function PasswordScreen({
  password,
  shake,
  onDigit,
  onDelete,
  onCheck,
}: {
  password: string;
  shake: boolean;
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onCheck: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div
        className={`bg-white/90 rounded-3xl p-4 sm:p-8 md:p-10 max-w-md w-full border border-white mx-2 ${
          shake ? "" : ""
        }`}
      >
        <div className="absolute inset-0 pointer-events-none" />

        {/* Romantic Image */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-full max-w-xs sm:max-w-sm h-40 sm:h-48 mx-auto mb-4 sm:mb-6 rounded-3xl overflow-hidden  border-4 border-white/50 relative">
            <img
              src="./IMG_20250816_143902792_HDR_PORTRAIT.jpg"
              alt="Te quiero - Mensaje romántico"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="relative inline-block">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-rose-300 mx-auto mb-3 sm:mb-4" />
            <div className="absolute -top-1 -right-1">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 fill-current " />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 font-serif text-balance">
            Adivina la contraseña
          </h2>
          <p className="text-rose-200 text-lg sm:text-xl font-medium">
            mi niña 💕
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-pink-300 rounded-full " />
            ))}
          </div>
        </div>

        <div className="bg-white/30  rounded-2xl p-6 mb-10 text-center border border-white/40 ">
          <div className="text-4xl font-mono text-white tracking-widest font-bold">
            {password.padEnd(8, "•")}
          </div>
          <div className="mt-2 h-1 bg-purple-100 rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => onDigit(num.toString())}
              className="bg-white/95  text-gray-800 font-bold py-3 sm:py-4 md:py-5 px-3 sm:px-4 rounded-2xl  border border-white/50 "
            >
              <span className="text-xl sm:text-2xl">{num}</span>
            </button>
          ))}
          <button
            onClick={onCheck}
            className="bg-purple-100   text-white font-bold py-3 sm:py-4 md:py-5 px-3 sm:px-4 rounded-2xl  border border-white/30"
          >
            <span className="text-xl sm:text-2xl">✓</span>
          </button>
          <button
            onClick={() => onDigit("0")}
            className="bg-white/95  text-gray-800 font-bold py-3 sm:py-4 md:py-5 px-3 sm:px-4 rounded-2xl  border border-white/50 "
          >
            <span className="text-xl sm:text-2xl">0</span>
          </button>
          <button
            onClick={onDelete}
            className="bg-purple-100   text-white font-bold py-3 sm:py-4 md:py-5 px-3 sm:px-4 rounded-2xl  border border-white/30"
          >
            <span className="text-xl sm:text-2xl">⌫</span>
          </button>
        </div>

        <div className="text-center bg-white/20  rounded-2xl p-3 sm:p-4 border border-white/30">
          <p className="text-rose-200 text-sm font-medium">
            💡 Pista: Nuestros cumpleaños (DDMMDDMM)
          </p>
        </div>
      </div>
    </div>
  );
}

function LoveLetterScreen({ onBack }: { onBack: () => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Reproducir audio automáticamente al cargar la pantalla
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("No se pudo reproducir el audio automáticamente:", error);
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const photos = [
    { src: "./IMG_20250518_201136.jpg", alt: "Momento especial juntos" },
    {
      src: "./IMG_20250816_143902792_HDR_PORTRAIT.jpg",
      alt: "Retrato hermoso",
    },
    { src: "./PXL_20250823_151835362.jpg", alt: "Recuerdo inolvidable" },
  ];

  return (
    <>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90  z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-16 right-0 text-white z-10 bg-white rounded-full p-3 border border-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Imagen ampliada"
              className="max-w-full max-h-[90vh] object-contain rounded-3xl border-4 border-white"
            />
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-4 sm:p-8 md:p-12 max-w-4xl w-full border border-gray-300 mx-2">
          <div className="pointer-events-none" />

          <div className="text-left mb-6 sm:mb-8 md:mb-10">
            <p className="text-gray-600 text-lg sm:text-xl mb-3 font-medium">
              📅 29 Agosto 2025
            </p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 font-serif mb-6">
              💌 Para Mi Querida Nikol
            </h3>
            <div className="w-24 h-1 bg-purple-500 rounded-full" />
          </div>

          <div className="text-center mb-10 p-8 bg-purple-100 rounded-3xl border border-rose-200/50 ">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <Heart className="w-6 h-6 text-rose-400 fill-current mx-1 " />
                </div>
              ))}
            </div>
            <p className="text-3xl font-serif italic text-purple-700 font-bold text-balance leading-relaxed">
              "En cada latido de mi corazón, hay una palabra que dice tu nombre"
              💕
            </p>
          </div>

          <div className="space-y-8 text-gray-700 text-xl leading-relaxed">
            <p className="text-balance font-medium">
              Quiero que sepas lo inmensamente feliz que soy por tenerte en mi
              vida. Desde que llegaste, todo cambió para mejor. Me haces sentir
              amado, cuidado y acompañado de una forma que nunca antes había
              experimentado.
            </p>

            <p className="text-balance font-medium">
              A tu lado aprendí lo que es el amor verdadero, ese que se
              demuestra con acciones, con palabras sinceras y con esos pequeños
              detalles que hacen la diferencia. Gracias por estar siempre
              conmigo, por darme tu tiempo, tu cariño infinito y tu comprensión.
            </p>

            <p className="text-balance font-medium">
              No sé cómo explicarlo con palabras, pero contigo mi corazón está
              en completa paz. Eres mi alegría diaria, la razón de tantas
              sonrisas y la luz que ilumina mis días más oscuros.
            </p>

            <p className="text-balance font-medium">
              Te amo mucho, gracias por estar a mi lado, aun cuando hay momentos
              que no son fáciles, en los cuales a veces siento que no puedo más,
              pero tu amor me da fuerzas para seguir adelante, siempre estaré
              contigo te amoooooo.
            </p>
          </div>

          <div className="text-center my-10 p-8 bg-purple-100 rounded-3xl border border-purple-200/50 ">
            <div className="flex justify-center mb-4">
              {[...Array(7)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current mx-1 "
                />
              ))}
            </div>
            <p className="text-3xl font-serif italic text-purple-700 font-bold text-balance">
              "Eres mi hogar, mi refugio, mi todo" 🏠💖
            </p>
          </div>

          <div className="mb-10">
            <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-purple-100 text-center mb-8 font-serif ">
              📸 Nuestros Momentos Especiales
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="rounded-3xl overflow-hidden  cursor-pointer border-4 border-white/50 relative group"
                  onClick={() => setSelectedImage(photo.src)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    onError={(e) => {
                      console.error(`Error loading image: ${photo.src}`);
                      (
                        e.target as HTMLImageElement
                      ).src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100%" height="100%" fill="#f3f4f6"/>
                          <text x="50%" y="45%" text-anchor="middle" font-family="Arial" font-size="16" fill="#6b7280">
                            Imagen no disponible
                          </text>
                          <text x="50%" y="65%" text-anchor="middle" font-family="Arial" font-size="12" fill="#9ca3af">
                            ${photo.alt}
                          </text>
                        </svg>
                      `)}`;
                    }}
                    onLoad={() =>
                      console.log(`Successfully loaded image: ${photo.src}`)
                    }
                    className="w-full h-64 object-cover group- "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-10 p-6 bg-purple-100 rounded-3xl border border-rose-200/50">
            <div className="flex justify-center mb-4">
              {[...Array(9)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-5 h-5 text-rose-400 fill-current mx-1 "
                />
              ))}
            </div>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-purple-100 font-serif text-balance">
              Te amo con todo mi ser, profundamente y para siempre. ♡
            </p>
          </div>

          {/* Audio Section with YouTube Link */}
          <div className="mb-8">
            <h4 className="text-xl sm:text-2xl font-bold text-purple-600 text-center mb-4">
              🎵 Una Canción Especial Para Ti
            </h4>

            {/* Audio Player */}
            <div className="bg-purple-100 rounded-2xl p-4 sm:p-6 border border-purple-200/50  mb-4">
              <div className="flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium">
                  🎶 MILO J - M.A.I
                </span>
              </div>
              <audio
                ref={audioRef}
                controls
                className="w-full rounded-lg"
                preload="metadata"
              >
                <source
                  src="./saim.co.za - MILO J - M.A.I (Video Oficial) (320 KBps).mp3"
                  type="audio/mpeg"
                />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>

            {/* YouTube Link */}
            <div className="text-center">
              <a
                href="https://www.youtube.com/watch?v=MldGX_mbS-o"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 sm:px-6 py-3 bg-red-500  text-white font-medium rounded-full    transform "
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Ver en YouTube
              </a>
              <p className="text-purple-600 mt-3 font-medium text-sm sm:text-base">
                💕 Esta canción me recuerda a ti 💕
              </p>
            </div>
          </div>

          {/* Personal Video Container */}
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-purple-600 text-center mb-4">
              🎬 Un Video Especial Para Ti
            </h4>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden ">
              <video
                controls
                className="w-full h-full object-cover"
                poster="./IMG_20250816_143902792_HDR_PORTRAIT.jpg"
                onError={(e) => {
                  console.error("Error loading main video");
                  console.log("Available videos:", [
                    "/VID-20250528-WA0043.mp4",
                    "/Snapchat-1780592114.mp4",
                  ]);
                  // Mostrar mensaje de error más amigable
                  const videoElement = e.target as HTMLVideoElement;
                  videoElement.style.display = "none";
                  const errorDiv = document.createElement("div");
                  errorDiv.className =
                    "flex items-center justify-center h-full bg-gray-200 text-gray-600";
                  errorDiv.innerHTML =
                    "🎬 Video no disponible<br>Intenta recargar la página";
                  videoElement.parentElement?.appendChild(errorDiv);
                }}
                onLoadStart={() => console.log("Starting to load main video")}
                onCanPlay={() => console.log("Main video can play")}
                preload="metadata"
              >
                <source src="./VID-20250528-WA0043.mp4" type="video/mp4" />
                <source src="./Snapchat-1780592114.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento video.
              </video>
            </div>
          </div>

          {/* Video Gallery */}
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-purple-600 text-center mb-4">
              🎥 Más Recuerdos En Video
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden ">
                <video
                  controls
                  className="w-full h-48 object-cover"
                  poster="./IMG_20250518_201136.jpg"
                  onError={(e) => {
                    console.error(
                      "Error loading video 1: /Snapchat-1780592114.mp4"
                    );
                    // Ocultar el video si no se puede cargar
                    (e.target as HTMLVideoElement).style.display = "none";
                  }}
                  onLoadStart={() => console.log("Loading video 1")}
                  preload="metadata"
                >
                  <source src="./Snapchat-1780592114.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
              <div className="rounded-2xl overflow-hidden ">
                <video
                  controls
                  className="w-full h-48 object-cover"
                  poster="./PXL_20250823_151835362.jpg"
                  onError={(e) => {
                    console.error(
                      "Error loading video 2: /VID-20250804-WA0000.mp4"
                    );
                    // Ocultar el video si no se puede cargar
                    (e.target as HTMLVideoElement).style.display = "none";
                  }}
                  onLoadStart={() => console.log("Loading video 2")}
                  preload="metadata"
                >
                  <source src="./VID-20250804-WA0000.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onBack}
              className="bg-purple-100   text-white font-bold py-5 px-10 rounded-full     flex items-center gap-3 mx-auto border border-white/30 "
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg">Volver al Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function FloatingStars() {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      size: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 2,
      };

      setStars((prev) => [...prev, newStar]);

      setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, 8000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute "
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            fontSize: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: "3s",
          }}
        >
          <Star className="text-yellow-300/70 fill-current" />
        </div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<
    Array<{ id: number; left: number; size: number; delay: number }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 20,
        delay: Math.random() * 2,
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, 8000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute "
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: "8s",
            animationDelay: `${heart.delay}s`,
            top: "-50px",
          }}
        >
          <Heart className="text-pink-300/80 fill-current " />
        </div>
      ))}
    </div>
  );
}

function FloatingSparkles() {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; left: number; top: number; delay: number }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) =>
          prev.filter((sparkle) => sparkle.id !== newSparkle.id)
        );
      }, 6000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <Sparkles className="text-yellow-300/60 w-4 h-4 animate-ping" />
        </div>
      ))}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 " />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-400/15 rounded-full blur-3xl " />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl " />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/15 rounded-full blur-3xl animate-ping" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-rose-300/10 rounded-full blur-2xl " />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-purple-300/10 rounded-full blur-2xl " />
    </div>
  );
}
