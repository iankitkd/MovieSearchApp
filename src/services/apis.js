export const API_BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const endPoints = {
    searchUrl: `${API_BASE_URL}/search/multi`,
    trendingUrl: (timeWindow) => `${API_BASE_URL}/trending/all/${timeWindow}`,

    movieUrl: `${API_BASE_URL}/movie`,
    tvUrl: `${API_BASE_URL}/tv`,
}