import { Platform } from 'react-native';

export const createShadow = (
  elevation: number,
  shadowColor: string = '#000',
  shadowOpacity: number = 0.25,
  shadowRadius?: number
) => {
  const radius = shadowRadius || elevation * 0.8;
  
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0px ${elevation}px ${radius}px rgba(0, 0, 0, ${shadowOpacity})`,
    };
  }
  
  return {
    shadowColor,
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity,
    shadowRadius: radius,
    elevation,
  };
};

export const createTextShadow = (
  offsetX: number = 2,
  offsetY: number = 2,
  blurRadius: number = 4,
  color: string = 'rgba(0, 0, 0, 0.5)'
) => {
  if (Platform.OS === 'web') {
    return {
      textShadow: `${offsetX}px ${offsetY}px ${blurRadius}px ${color}`,
    };
  }
  
  return {
    textShadowColor: color,
    textShadowOffset: { width: offsetX, height: offsetY },
    textShadowRadius: blurRadius,
  };
};
