const appConfig = {
  // Vite подставляет значение из frontend .env при сборке приложения.
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3333/api/v1',
};

export default appConfig;
