import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PruebaApp',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración en milisegundos
      launchAutoHide: true, // Ocultar automáticamente
      backgroundColor: "#ffffffff", // Color de fondo del splash screen
      androidScaleType: "CENTER_CROP",
      showSpinner: true, // Mostrar un spinner de carga
      androidSpinnerStyle: "large", // Estilo del spinner en Android
      iosSpinnerStyle: "small", // Estilo del spinner en iOS
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};


export default config;
