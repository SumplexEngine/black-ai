"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  showText?: boolean;
  animate?: boolean;
}

const sizes = {
  sm: { svg: 32, text: "text-lg" },
  md: { svg: 40, text: "text-xl" },
  lg: { svg: 48, text: "text-2xl" },
  xl: { svg: 56, text: "text-3xl" },
  "2xl": { svg: 72, text: "text-4xl" },
};

export function Logo({
  className,
  size = "md",
  showText = true,
  animate = true,
}: LogoProps) {
  const { svg, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo SVG - Cerebro con Neuronas */}
      <div className="relative">
        <svg
          width={svg}
          height={svg}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Definiciones de gradientes y filtros */}
          <defs>
            {/* Glow filter para las neuronas */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradiente para el pulso */}
            <linearGradient
              id="pulseGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#e0e0e0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Cerebro principal */}
          <g className="brain-main">
            {/* Lado izquierdo del cerebro */}
            <path
              d="M30 50 C30 35, 35 25, 45 25 C50 25, 52 28, 50 32 C48 28, 44 30, 44 35 C44 40, 48 42, 50 40 C52 44, 48 48, 45 48 C42 48, 40 45, 42 42 C38 44, 35 50, 38 55 C35 58, 32 62, 35 68 C30 65, 28 58, 30 50"
              fill="currentColor"
              className={cn(animate && "animate-pulse-slow")}
            />

            {/* Lado derecho del cerebro */}
            <path
              d="M70 50 C70 35, 65 25, 55 25 C50 25, 48 28, 50 32 C52 28, 56 30, 56 35 C56 40, 52 42, 50 40 C48 44, 52 48, 55 48 C58 48, 60 45, 58 42 C62 44, 65 50, 62 55 C65 58, 68 62, 65 68 C70 65, 72 58, 70 50"
              fill="currentColor"
              className={cn(animate && "animate-pulse-slow")}
              style={{ animationDelay: "0.5s" }}
            />

            {/* Centro del cerebro */}
            <ellipse
              cx="50"
              cy="45"
              rx="8"
              ry="12"
              fill="currentColor"
              className={cn(animate && "animate-pulse-slow")}
              style={{ animationDelay: "0.25s" }}
            />

            {/* Base del cerebro */}
            <path
              d="M38 65 Q50 75, 62 65"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Neuronas externas con animación de corriente */}
          <g filter="url(#glow)">
            {/* Neurona superior izquierda */}
            <g className={cn(animate && "neuron-pulse-1")}>
              <circle cx="25" cy="20" r="3" fill="currentColor" />
              <line
                x1="25"
                y1="20"
                x2="38"
                y2="30"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="25"
                y1="20"
                x2="20"
                y2="12"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="15" cy="22" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="25"
                y1="20"
                x2="15"
                y2="22"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>

            {/* Neurona superior derecha */}
            <g className={cn(animate && "neuron-pulse-2")}>
              <circle cx="75" cy="20" r="3" fill="currentColor" />
              <line
                x1="75"
                y1="20"
                x2="62"
                y2="30"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="80" cy="12" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="75"
                y1="20"
                x2="80"
                y2="12"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="85" cy="22" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="75"
                y1="20"
                x2="85"
                y2="22"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>

            {/* Neurona izquierda */}
            <g className={cn(animate && "neuron-pulse-3")}>
              <circle cx="12" cy="50" r="3" fill="currentColor" />
              <line
                x1="12"
                y1="50"
                x2="28"
                y2="50"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="5" cy="42" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="12"
                y1="50"
                x2="5"
                y2="42"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="5" cy="58" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="12"
                y1="50"
                x2="5"
                y2="58"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>

            {/* Neurona derecha */}
            <g className={cn(animate && "neuron-pulse-4")}>
              <circle cx="88" cy="50" r="3" fill="currentColor" />
              <line
                x1="88"
                y1="50"
                x2="72"
                y2="50"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="95" cy="42" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="88"
                y1="50"
                x2="95"
                y2="42"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="95" cy="58" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="88"
                y1="50"
                x2="95"
                y2="58"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>

            {/* Neurona inferior izquierda */}
            <g className={cn(animate && "neuron-pulse-5")}>
              <circle cx="25" cy="80" r="3" fill="currentColor" />
              <line
                x1="25"
                y1="80"
                x2="38"
                y2="68"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="15" cy="85" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="25"
                y1="80"
                x2="15"
                y2="85"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="20" cy="92" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="25"
                y1="80"
                x2="20"
                y2="92"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>

            {/* Neurona inferior derecha */}
            <g className={cn(animate && "neuron-pulse-6")}>
              <circle cx="75" cy="80" r="3" fill="currentColor" />
              <line
                x1="75"
                y1="80"
                x2="62"
                y2="68"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="85" cy="85" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="75"
                y1="80"
                x2="85"
                y2="85"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="80" cy="92" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="75"
                y1="80"
                x2="80"
                y2="92"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>

            {/* Neurona superior centro */}
            <g className={cn(animate && "neuron-pulse-7")}>
              <circle cx="50" cy="8" r="3" fill="currentColor" />
              <line
                x1="50"
                y1="8"
                x2="50"
                y2="24"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="42" cy="3" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="50"
                y1="8"
                x2="42"
                y2="3"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="58" cy="3" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="50"
                y1="8"
                x2="58"
                y2="3"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>

            {/* Neurona inferior centro */}
            <g className={cn(animate && "neuron-pulse-8")}>
              <circle cx="50" cy="92" r="3" fill="currentColor" />
              <line
                x1="50"
                y1="92"
                x2="50"
                y2="76"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="42" cy="98" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="50"
                y1="92"
                x2="42"
                y2="98"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
              <circle cx="58" cy="98" r="2" fill="currentColor" opacity="0.7" />
              <line
                x1="50"
                y1="92"
                x2="58"
                y2="98"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>
          </g>
        </svg>

        {/* Estilos de animación inline */}
        <style jsx>{`
          @keyframes neuronPulse {
            0%,
            100% {
              opacity: 0.5;
              filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
            }
            50% {
              opacity: 1;
              filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
            }
          }

          .neuron-pulse-1 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 0s;
          }
          .neuron-pulse-2 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 0.25s;
          }
          .neuron-pulse-3 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 0.5s;
          }
          .neuron-pulse-4 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 0.75s;
          }
          .neuron-pulse-5 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 1s;
          }
          .neuron-pulse-6 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 1.25s;
          }
          .neuron-pulse-7 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 1.5s;
          }
          .neuron-pulse-8 {
            animation: neuronPulse 2s ease-in-out infinite;
            animation-delay: 1.75s;
          }

          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.85;
            }
          }
        `}</style>
      </div>

      {showText && (
        <span className={cn("font-bold text-white", text)}>Black AI</span>
      )}
    </div>
  );
}
