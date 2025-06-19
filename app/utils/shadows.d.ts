export declare const createShadow: (elevation: number, shadowColor?: string, shadowOpacity?: number, shadowRadius?: number) => {
    boxShadow: string;
    shadowColor?: undefined;
    shadowOffset?: undefined;
    shadowOpacity?: undefined;
    shadowRadius?: undefined;
    elevation?: undefined;
} | {
    shadowColor: string;
    shadowOffset: {
        width: number;
        height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
    boxShadow?: undefined;
};
export declare const createTextShadow: (offsetX?: number, offsetY?: number, blurRadius?: number, color?: string) => {
    textShadow: string;
    textShadowColor?: undefined;
    textShadowOffset?: undefined;
    textShadowRadius?: undefined;
} | {
    textShadowColor: string;
    textShadowOffset: {
        width: number;
        height: number;
    };
    textShadowRadius: number;
    textShadow?: undefined;
};
//# sourceMappingURL=shadows.d.ts.map