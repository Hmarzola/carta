"use client";

import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 relative overflow-hidden">
      <FloatingHearts />
      <FloatingSparkles />
      <FloatingStars />
      <AnimatedBackground />

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-700 border border-white/40 shadow-2xl">
            <div className="relative">
              <Music className="w-16 h-16 text-rose-300 mx-auto mb-6 animate-bounce" />
              <div className="absolute -top-2 -right-2">
                <Heart className="w-8 h-8 text-pink-400 fill-current animate-pulse" />
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
                  className="w-4 h-4 text-pink-300 fill-current mx-1 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`bg-white/20 backdrop-blur-2xl rounded-3xl p-10 max-w-md w-full border border-white/30 shadow-2xl relative overflow-hidden ${
          shake ? "animate-pulse" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" />

        {/* Romantic Image */}
        <div className="text-center mb-8">
          <div className="w-80 h-48 mx-auto mb-6 rounded-3xl overflow-hidden shadow-xl border-4 border-white/50 relative">
            <img
              src="/IMG_20250816_143902792_HDR_PORTRAIT.jpg"
              alt="Te quiero - Mensaje romántico"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        <div className="text-center mb-10">
          <div className="relative inline-block">
            <Lock className="w-10 h-10 text-rose-300 mx-auto mb-4 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Heart className="w-4 h-4 text-pink-400 fill-current animate-bounce" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 font-serif text-balance">
            Adivina la contraseña
          </h2>
          <p className="text-rose-200 text-xl font-medium">mi niña 💕</p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 mb-10 text-center border border-white/40 shadow-inner">
          <div className="text-4xl font-mono text-white tracking-widest font-bold">
            {password.padEnd(8, "•")}
          </div>
          <div className="mt-2 h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => onDigit(num.toString())}
              className="bg-white/95 hover:bg-white text-gray-800 font-bold py-5 px-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 border border-white/50 backdrop-blur-sm"
            >
              <span className="text-2xl">{num}</span>
            </button>
          ))}
          <button
            onClick={onCheck}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-5 px-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 border border-white/30"
          >
            <span className="text-2xl">✓</span>
          </button>
          <button
            onClick={() => onDigit("0")}
            className="bg-white/95 hover:bg-white text-gray-800 font-bold py-5 px-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 border border-white/50 backdrop-blur-sm"
          >
            <span className="text-2xl">0</span>
          </button>
          <button
            onClick={onDelete}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-5 px-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 border border-white/30"
          >
            <span className="text-2xl">⌫</span>
          </button>
        </div>

        <div className="text-center bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
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

  const photos = [
    { src: "/IMG_20250518_201136.jpg", alt: "Momento especial juntos" },
    { src: "/IMG_20250816_143902792_HDR_PORTRAIT.jpg", alt: "Retrato hermoso" },
    { src: "/PXL_20250823_151835362.jpg", alt: "Recuerdo inolvidable" },
  ];

  return (
    <>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-16 right-0 text-white hover:text-rose-300 transition-colors z-10 bg-white/20 backdrop-blur-lg rounded-full p-3 border border-white/30"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Imagen ampliada"
              className="max-w-full max-h-[90vh] object-contain rounded-3xl shadow-2xl border-4 border-white/30"
            />
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/98 backdrop-blur-sm rounded-3xl p-12 max-w-4xl w-full shadow-2xl border border-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-200/30 to-transparent animate-pulse pointer-events-none" />

          <div className="text-left mb-10">
            <p className="text-gray-600 text-xl mb-3 font-medium">
              📅 29 Agosto 2025
            </p>
            <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 font-serif mb-6 text-balance">
              💌 Para Mi Querida Nikol
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full" />
          </div>

          <div className="text-center mb-10 p-8 bg-gradient-to-r from-rose-100 to-purple-100 rounded-3xl border border-rose-200/50 shadow-inner">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 text-rose-400 fill-current mx-1 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
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
          </div>

          <div className="text-center my-10 p-8 bg-gradient-to-r from-purple-100 to-rose-100 rounded-3xl border border-purple-200/50 shadow-inner">
            <div className="flex justify-center mb-4">
              {[...Array(7)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current mx-1 animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-3xl font-serif italic text-purple-700 font-bold text-balance">
              "Eres mi hogar, mi refugio, mi todo" 🏠💖
            </p>
          </div>

          <div className="mb-10">
            <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 text-center mb-8 font-serif">
              📸 Nuestros Momentos Especiales
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 cursor-pointer border-4 border-white/50 relative group"
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
                    onLoad={() => console.log(`Successfully loaded image: ${photo.src}`)}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-10 p-6 bg-gradient-to-r from-rose-50 to-purple-50 rounded-3xl border border-rose-200/50">
            <div className="flex justify-center mb-4">
              {[...Array(9)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-5 h-5 text-rose-400 fill-current mx-1 animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 font-serif text-balance">
              Te amo con todo mi ser, profundamente y para siempre. ♡
            </p>
          </div>

          {/* YouTube Song Section */}
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-purple-600 text-center mb-4">
              🎵 Una Canción Especial Para Ti
            </h4>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/MldGX_mbS-o?autoplay=0&rel=0"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Canción especial"
              />
            </div>
            <p className="text-center text-purple-600 mt-3 font-medium">
              💕 Esta canción me recuerda a ti 💕
            </p>
          </div>

          {/* Personal Video Container */}
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-purple-600 text-center mb-4">
              🎬 Un Video Especial Para Ti
            </h4>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              <video
                controls
                className="w-full h-full object-cover"
                poster="/IMG_20250816_143902792_HDR_PORTRAIT.jpg"
                onError={(e) => {
                  console.error("Error loading main video");
                  console.log("Available videos:", [
                    "/VID-20250528-WA0043.mp4",
                    "/Snapchat-1780592114.mp4",
                  ]);
                  // Mostrar mensaje de error más amigable
                  const videoElement = e.target as HTMLVideoElement;
                  videoElement.style.display = 'none';
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'flex items-center justify-center h-full bg-gray-200 text-gray-600';
                  errorDiv.innerHTML = '🎬 Video no disponible<br>Intenta recargar la página';
                  videoElement.parentElement?.appendChild(errorDiv);
                }}
                onLoadStart={() => console.log("Starting to load main video")}
                onCanPlay={() => console.log("Main video can play")}
                preload="metadata"
              >
                <source src="/VID-20250528-WA0043.mp4" type="video/mp4" />
                <source src="/Snapchat-1780592114.mp4" type="video/mp4" />
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
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full h-48 object-cover"
                  poster="/IMG_20250518_201136.jpg"
                  onError={(e) => {
                    console.error("Error loading video 1: /Snapchat-1780592114.mp4");
                    // Ocultar el video si no se puede cargar
                    (e.target as HTMLVideoElement).style.display = 'none';
                  }}
                  onLoadStart={() => console.log("Loading video 1")}
                  preload="metadata"
                >
                  <source src="/Snapchat-1780592114.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full h-48 object-cover"
                  poster="/PXL_20250823_151835362.jpg"
                  onError={(e) => {
                    console.error("Error loading video 2: /VID-20250804-WA0000.mp4");
                    // Ocultar el video si no se puede cargar
                    (e.target as HTMLVideoElement).style.display = 'none';
                  }}
                  onLoadStart={() => console.log("Loading video 2")}
                  preload="metadata"
                >
                  <source src="/VID-20250804-WA0000.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento video.
                </video>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 flex items-center gap-3 mx-auto border border-white/30 backdrop-blur-sm"
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
          className="absolute animate-pulse"
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
          className="absolute animate-bounce"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: "8s",
            animationDelay: `${heart.delay}s`,
            top: "-50px",
          }}
        >
          <Heart className="text-pink-300/80 fill-current animate-pulse" />
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
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-400/15 rounded-full blur-3xl animate-bounce" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/15 rounded-full blur-3xl animate-ping" />
      <div
        className="absolute top-1/3 right-1/3 w-64 h-64 bg-rose-300/10 rounded-full blur-2xl animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-purple-300/10 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}
