"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextShadow = exports.createShadow = void 0;
const react_native_1 = require("react-native");
const createShadow = (elevation, shadowColor = '#000', shadowOpacity = 0.25, shadowRadius) => {
    const radius = shadowRadius || elevation * 0.8;
    if (react_native_1.Platform.OS === 'web') {
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
exports.createShadow = createShadow;
const createTextShadow = (offsetX = 2, offsetY = 2, blurRadius = 4, color = 'rgba(0, 0, 0, 0.5)') => {
    if (react_native_1.Platform.OS === 'web') {
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
exports.createTextShadow = createTextShadow;
//# sourceMappingURL=shadows.js.map