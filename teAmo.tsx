"use client";

import { useState, useEffect } from "react";
import { Heart, Lock, ArrowLeft, Sparkles, Music, X } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingHearts />
      <FloatingSparkles />
      <AnimatedBackground />

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-500">
            <Music className="w-12 h-12 text-pink-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-2">
              ¡Correcto mi amor! 🎵
            </h3>
            <p className="text-pink-200">💕 Esta canción es para ti 💕</p>
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
        className={`bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl ${
          shake ? "animate-pulse" : ""
        }`}
      >
        {/* Romantic Image */}
        <div className="text-center mb-6">
          <div className="w-80 h-48 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/IMG_20250816_143902792_HDR_PORTRAIT.jpg"
              alt="Te quiero - Mensaje romántico"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <Lock className="w-8 h-8 text-pink-300 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-white mb-2 font-serif">
            Adivina la contraseña
          </h2>
          <p className="text-pink-200 text-lg">mi niña 💕</p>
        </div>

        {/* Password Display */}
        <div className="bg-white/20 rounded-2xl p-4 mb-8 text-center">
          <div className="text-3xl font-mono text-white tracking-widest">
            {password.padEnd(8, "•")}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => onDigit(num.toString())}
              className="bg-white/90 hover:bg-white text-gray-800 font-bold py-4 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={onCheck}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            ✓
          </button>
          <button
            onClick={() => onDigit("0")}
            className="bg-white/90 hover:bg-white text-gray-800 font-bold py-4 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            0
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            ⌫
          </button>
        </div>

        <p className="text-center text-pink-200 text-sm">
          💡 Pista: Nuestros cumpleaños (DDMMDDMM)
        </p>
      </div>
    </div>
  );
}

function LoveLetterScreen({ onBack }: { onBack: () => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const photos = [
    { src: "/IMG_20250518_201136.jpg", alt: "Momento especial juntos" },
    { src: "/IMG_20250816_143902792_HDR_PORTRAIT.jpg", alt: "Retrato hermoso" },
    { src: "/PXL_20250823_151835362.jpg", alt: "Recuerdo inolvidable" }
  ];

  return (
    <>
      {/* Modal for Image Gallery */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-4xl w-full shadow-2xl border border-white/30 relative overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/20 to-transparent animate-pulse pointer-events-none" />

        {/* Header */}
        <div className="text-left mb-8">
          <p className="text-gray-600 text-lg mb-2">📅 29 Agosto 2025</p>
          <h3 className="text-4xl font-bold text-purple-600 font-serif mb-4">
            💌 Para Mi Querida Nikol
          </h3>
        </div>

        {/* Love Quote */}
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
          <p className="text-2xl font-serif italic text-purple-700 font-bold">
            "En cada latido de mi corazón, hay una palabra que dice tu nombre"
            💕
          </p>
        </div>

        {/* Love Letter Content */}
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p className="text-balance">
            Quiero que sepas lo inmensamente feliz que soy por tenerte en mi
            vida. Desde que llegaste, todo cambió para mejor. Me haces sentir
            amado, cuidado y acompañado de una forma que nunca antes había
            experimentado.
          </p>

          <p className="text-balance">
            A tu lado aprendí lo que es el amor verdadero, ese que se demuestra
            con acciones, con palabras sinceras y con esos pequeños detalles que
            hacen la diferencia. Gracias por estar siempre conmigo, por darme tu
            tiempo, tu cariño infinito y tu comprensión.
          </p>

          <p className="text-balance">
            No sé cómo explicarlo con palabras, pero contigo mi corazón está en
            completa paz. Eres mi alegría diaria, la razón de tantas sonrisas y
            la luz que ilumina mis días más oscuros.
          </p>
        </div>

        {/* Second Love Quote */}
        <div className="text-center my-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
          <p className="text-2xl font-serif italic text-purple-700 font-bold">
            "Eres mi hogar, mi refugio, mi todo" 🏠💖
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="mb-8">
          <h4 className="text-2xl font-bold text-purple-600 text-center mb-6">
            📸 Nuestros Momentos Especiales
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {photos.map((photo, index) => (
              <div 
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedImage(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-purple-600">
            Te amo con todo mi ser, profundamente y para siempre. ♡
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
              >
                <source src="/VID_20250823_152404726.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento video.
              </video>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <video
                controls
                className="w-full h-48 object-cover"
                poster="/PXL_20250823_151835362.jpg"
              >
                <source src="/VID-20250804-WA0000.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento video.
              </video>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
    </>
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
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-red-500/20 animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-bounce" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-400/10 rounded-full blur-3xl animate-ping" />
    </div>
  );
}
