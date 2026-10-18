import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isHighPerformance: boolean;
  isMobile: boolean;
  isLowPowerMode: boolean;
  supportsAdvancedEffects: boolean;
  batteryLevel: number | null;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  deviceMemory: number | null;
  hardwareConcurrency: number;
}

export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isHighPerformance: true,
    isMobile: false,
    isLowPowerMode: false,
    supportsAdvancedEffects: true,
    batteryLevel: null,
    connectionSpeed: 'unknown',
    deviceMemory: null,
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
  });

  useEffect(() => {
    const detectCapabilities = async () => {
      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

      // Detect device memory (Chrome only)
      const deviceMemory = (navigator as any).deviceMemory || null;

      // Detect connection speed
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
      }

      // Detect battery status
      let batteryLevel: number | null = null;
      let isLowPowerMode = false;
      
      try {
        if ('getBattery' in navigator) {
          const battery = await (navigator as any).getBattery();
          batteryLevel = battery.level * 100;
          isLowPowerMode = battery.level < 0.2; // Consider low power if battery < 20%
        }
      } catch (error) {
        // Battery API not supported or blocked
      }

      // Performance detection based on multiple factors
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      
      // Calculate performance score
      let performanceScore = 0;
      
      // CPU cores (0-3 points)
      if (hardwareConcurrency >= 8) performanceScore += 3;
      else if (hardwareConcurrency >= 4) performanceScore += 2;
      else if (hardwareConcurrency >= 2) performanceScore += 1;
      
      // Memory (0-3 points)
      if (deviceMemory) {
        if (deviceMemory >= 8) performanceScore += 3;
        else if (deviceMemory >= 4) performanceScore += 2;
        else if (deviceMemory >= 2) performanceScore += 1;
      } else {
        // Assume average if unknown
        performanceScore += 1;
      }
      
      // Connection speed (0-2 points)
      if (connectionSpeed === 'fast') performanceScore += 2;
      else if (connectionSpeed === 'unknown') performanceScore += 1;
      
      // Mobile penalty (-2 points)
      if (isMobile) performanceScore -= 2;
      
      // Low power mode penalty (-3 points)
      if (isLowPowerMode) performanceScore -= 3;
      
      // Screen size consideration
      const isLargeScreen = window.innerWidth >= 1920 && window.innerHeight >= 1080;
      if (isLargeScreen) performanceScore += 1;
      
      // Determine capabilities based on score
      const isHighPerformance = performanceScore >= 5;
      const supportsAdvancedEffects = performanceScore >= 3 && !isLowPowerMode;

      // Additional checks for specific features
      const supportsWebGL = (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
          return false;
        }
      })();

      const supportsIntersectionObserver = 'IntersectionObserver' in window;
      const supportsRequestIdleCallback = 'requestIdleCallback' in window;

      setCapabilities({
        isHighPerformance,
        isMobile,
        isLowPowerMode,
        supportsAdvancedEffects: supportsAdvancedEffects && supportsWebGL && supportsIntersectionObserver,
        batteryLevel,
        connectionSpeed,
        deviceMemory,
        hardwareConcurrency,
      });

      // Log capabilities for debugging (remove in production)
      console.log('Device Capabilities:', {
        performanceScore,
        isHighPerformance,
        isMobile,
        isLowPowerMode,
        supportsAdvancedEffects,
        deviceMemory,
        hardwareConcurrency,
        connectionSpeed,
        batteryLevel,
        supportsWebGL,
        supportsIntersectionObserver,
        supportsRequestIdleCallback,
      });
    };

    detectCapabilities();

    // Re-check capabilities when battery status changes
    const handleBatteryChange = () => {
      detectCapabilities();
    };

    // Listen for battery changes if supported
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
      }).catch(() => {
        // Battery API not supported
      });
    }

    // Re-check on window resize (orientation change, etc.)
    const handleResize = () => {
      detectCapabilities();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Note: Battery event cleanup would need to be handled differently
    };
  }, []);

  return capabilities;
};