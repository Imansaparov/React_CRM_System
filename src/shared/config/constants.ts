export const API_CONFIG = {
  TMDB: {
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    KEY: '073298bb28441080cef1c2c0058c3148',
  },
};

export const STORAGE_KEYS = {
  THEME_MODE: 'themeMode',
  TABLE_SETTINGS_PREFIX: 'tableSettings_',
};

console.log(import.meta.env.VITE_TMDB_API_KEY);
