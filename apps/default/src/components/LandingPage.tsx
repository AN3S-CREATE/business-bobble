import React from 'react';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const capabilities = useDeviceCapabilities();

  // Determine effect levels based on device capabilities
  const effectLevel = capabilities.isLowPowerMode ? 'minimal' : 
                     !capabilities.supportsAdvancedEffects ? 'basic' :
                     capabilities.isHighPerformance ? 'full' : 'medium';

  const particleCount = capabilities.isLowPowerMode ? 0 :
                       capabilities.isMobile ? 3 :
                       capabilities.isHighPerformance ? 15 : 8;

  const glitchIntensity = capabilities.isLowPowerMode ? 'none' :
                         capabilities.supportsAdvancedEffects ? 'full' : 'basic';

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background - adaptive complexity */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/3 via-emerald-500/3 to-teal-500/3" />
        {effectLevel !== 'minimal' && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.05),transparent_50%)]" />
          </>
        )}
        {effectLevel === 'full' && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(34,197,94,0.03),transparent_50%)]" />
        )}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Neon window - adaptive effects */}
          <div className="relative mb-8 md:mb-12">
            {/* Outer glow layers - based on performance */}
            {effectLevel === 'full' && (
              <>
                <div className="absolute inset-0 rounded-3xl bg-green-500/5 blur-3xl animate-neon-glow transform scale-110 animate-flicker animate-digital-distort"></div>
                <div className="absolute inset-0 rounded-3xl bg-green-500/8 blur-2xl animate-neon-glow transform scale-105 animate-random-fade"></div>
              </>
            )}
            {effectLevel === 'medium' && (
              <div className="absolute inset-0 rounded-3xl bg-green-500/6 blur-2xl animate-neon-glow"></div>
            )}
            {effectLevel === 'basic' && (
              <div className="absolute inset-0 rounded-3xl bg-green-500/4 blur-xl"></div>
            )}
            
            {/* Main neon window - adaptive animations */}
            <div className={`relative bg-black/90 backdrop-blur-sm rounded-2xl md:rounded-3xl border-2 border-green-500/60 p-6 md:p-8 lg:p-12 ${
              effectLevel === 'full' ? 'animate-neon-border animate-blackout' :
              effectLevel === 'medium' ? 'animate-neon-border' :
              effectLevel === 'basic' ? 'animate-border-glow' : ''
            }`}>
              {/* Inner glow - adaptive */}
              {effectLevel === 'full' && (
                <div className="absolute inset-2 rounded-2xl border border-green-500/20 animate-neon-glow animate-flicker animate-digital-distort"></div>
              )}
              {(effectLevel === 'medium' || effectLevel === 'basic') && (
                <div className="absolute inset-2 rounded-2xl border border-green-500/20 animate-neon-glow"></div>
              )}
              
              {/* Content */}
              <div className="relative z-10 space-y-6 md:space-y-8">
                {/* Main text - adaptive glitch effects */}
                <div className="space-y-3 md:space-y-4">
                  <p className={`text-base md:text-xl lg:text-2xl font-light leading-relaxed text-green-400/80 ${
                    effectLevel !== 'minimal' ? 'animate-neon-text' : ''
                  }`}>
                    {/* Adaptive text effects based on glitch intensity */}
                    {glitchIntensity === 'none' && (
                      <span>
                        Try our new real-time, cross-modal AI fusion on diverse data streams, 
                        turning random operational entropy into predictable, high-yield results.
                      </span>
                    )}
                    
                    {glitchIntensity === 'basic' && (
                      <span className="animate-flicker">
                        Try our new real-time, cross-modal AI fusion on diverse data streams, 
                        turning random operational entropy into predictable, high-yield results.
                      </span>
                    )}
                    
                    {glitchIntensity === 'full' && (
                      <span>
                        <span className="animate-random-fade">Try our new real-time, cross-modal AI fusion</span>{' '}
                        <span className="animate-digital-distort">on diverse data streams,</span>{' '}
                        <span className="animate-text-glitch">turning random operational entropy</span>{' '}
                        <span className="animate-blackout">into predictable, high-yield results.</span>
                      </span>
                    )}
                  </p>
                </div>

                {/* Button - adaptive effects */}
                <div className="pt-4 md:pt-6">
                  <button
                    onClick={onEnter}
                    className={`group relative px-6 py-3 md:px-8 md:py-4 lg:px-12 lg:py-6 text-lg md:text-xl lg:text-2xl font-bold text-green-400/90 bg-black/80 border-2 border-green-500/60 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105 hover:text-green-300 ${
                      effectLevel === 'full' ? 'animate-flicker animate-digital-distort' :
                      effectLevel === 'medium' ? 'animate-flicker' : ''
                    }`}
                    style={{
                      boxShadow: `
                        0 0 5px rgba(34, 197, 94, 0.3),
                        0 0 10px rgba(34, 197, 94, 0.2),
                        0 0 15px rgba(34, 197, 94, 0.1),
                        inset 0 0 5px rgba(34, 197, 94, 0.05)
                      `
                    }}
                    onMouseEnter={(e) => {
                      if (effectLevel !== 'minimal') {
                        e.currentTarget.style.boxShadow = `
                          0 0 10px rgba(34, 197, 94, 0.4),
                          0 0 20px rgba(34, 197, 94, 0.3),
                          0 0 30px rgba(34, 197, 94, 0.2),
                          0 0 40px rgba(34, 197, 94, 0.1),
                          inset 0 0 10px rgba(34, 197, 94, 0.1)
                        `;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `
                        0 0 5px rgba(34, 197, 94, 0.3),
                        0 0 10px rgba(34, 197, 94, 0.2),
                        0 0 15px rgba(34, 197, 94, 0.1),
                        inset 0 0 5px rgba(34, 197, 94, 0.05)
                      `;
                    }}
                  >
                    {/* Button glow - adaptive */}
                    <div className={`absolute inset-0 rounded-lg md:rounded-xl bg-green-500/3 group-hover:bg-green-500/5 transition-all duration-300 ${
                      effectLevel === 'full' ? 'animate-flicker animate-random-fade' :
                      effectLevel === 'medium' ? 'animate-flicker' : ''
                    }`}></div>
                    
                    {/* Button text - adaptive glitch */}
                    <span className={`relative z-10 ${
                      effectLevel === 'full' ? 'animate-neon-text animate-text-glitch animate-letter-spacing-glitch' :
                      effectLevel !== 'minimal' ? 'animate-neon-text' : ''
                    }`}>
                      Dare to Enter
                    </span>
                    
                    {/* Hover effect - adaptive */}
                    {effectLevel !== 'minimal' && (
                      <div className={`absolute inset-0 rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        effectLevel === 'full' ? 'animate-digital-distort' : ''
                      }`}>
                        <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-shimmer-green"></div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer text - adaptive glitch effects */}
          <div className={`text-green-500/30 text-xs md:text-sm ${
            effectLevel !== 'minimal' ? 'animate-pulse' : ''
          }`}>
            {glitchIntensity === 'none' && (
              <span>Enter the uncertain future of AI-powered business intelligence</span>
            )}
            
            {glitchIntensity === 'basic' && (
              <span className="animate-flicker">
                Enter the uncertain future of AI-powered business intelligence
              </span>
            )}
            
            {glitchIntensity === 'full' && (
              <span className="animate-flicker animate-random-fade animate-color-shift">
                <span className="animate-text-glitch">Enter the uncertain future</span>{' '}
                <span className="animate-digital-distort">of AI-powered</span>{' '}
                <span className="animate-blackout">business intelligence</span>
              </span>
            )}
          </div>

          {/* Performance indicator - development only */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-4 left-4 text-xs text-green-400/50 bg-black/50 p-2 rounded">
              <div>Effect Level: {effectLevel}</div>
              <div>Particles: {particleCount}</div>
              <div>Battery: {capabilities.batteryLevel ? `${Math.round(capabilities.batteryLevel)}%` : 'Unknown'}</div>
              <div>Memory: {capabilities.deviceMemory ? `${capabilities.deviceMemory}GB` : 'Unknown'}</div>
              <div>CPU Cores: {capabilities.hardwareConcurrency}</div>
              <div>Connection: {capabilities.connectionSpeed}</div>
            </div>
          )}
        </div>
      </div>

      {/* Adaptive floating particles */}
      {particleCount > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-0.5 h-0.5 bg-green-500/20 rounded-full animate-float ${
                effectLevel === 'full' && i % 3 === 0 ? 'animate-flicker' : 
                effectLevel === 'full' && i % 3 === 1 ? 'animate-random-fade' : 
                effectLevel === 'full' ? 'animate-digital-distort' : ''
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Adaptive corner lights */}
      {effectLevel !== 'minimal' && (
        <>
          <div className={`absolute top-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-green-500/5 rounded-full blur-2xl md:blur-3xl animate-pulse ${
            effectLevel === 'full' ? 'animate-flicker animate-digital-distort' : ''
          }`}></div>
          <div className={`absolute bottom-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-green-500/5 rounded-full blur-2xl md:blur-3xl animate-pulse ${
            effectLevel === 'full' ? 'animate-flicker animate-random-fade' : ''
          }`} style={{ animationDelay: '2s' }}></div>
        </>
      )}
      
      {/* High-performance only corner lights */}
      {effectLevel === 'full' && (
        <>
          <div className="absolute top-1/2 right-0 w-16 h-16 bg-green-500/3 rounded-full blur-2xl animate-pulse animate-flicker animate-blackout" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-1/2 left-0 w-16 h-16 bg-green-500/3 rounded-full blur-2xl animate-pulse animate-flicker animate-digital-distort" style={{ animationDelay: '1s' }}></div>
        </>
      )}

      {/* High-performance only scanning lines */}
      {effectLevel === 'full' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-float opacity-30 animate-random-fade"
            style={{
              top: '20%',
              animationDuration: '8s',
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500/8 to-transparent animate-float opacity-20 animate-digital-distort"
            style={{
              top: '60%',
              animationDuration: '12s',
              animationDelay: '3s'
            }}
          />
          <div 
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500/6 to-transparent animate-float opacity-15 animate-blackout"
            style={{
              top: '80%',
              animationDuration: '15s',
              animationDelay: '6s'
            }}
          />
        </div>
      )}

      {/* High-performance only digital noise */}
      {effectLevel === 'full' && (
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/10 animate-shimmer-green animate-digital-distort"></div>
        </div>
      )}

      {/* High-performance only glitch overlays */}
      {effectLevel === 'full' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-green-500/10 animate-random-fade animate-text-glitch"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};