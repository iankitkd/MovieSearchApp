import apiConnector from './apiConnector'
import { IMAGE_BASE_URL ,endPoints } from './apis'

export const fetchTrendingAll = async (timeWindow) => {
    try {
        const response = await apiConnector("GET", endPoints.trendingUrl(timeWindow));
        const data = response.data.results;
        const updatedData = data.map(ele => ({
            id: ele.id,
            title: ele.title || ele.name || ele.original_title,
            image_path: IMAGE_BASE_URL + ele.poster_path,
            media_type: ele.media_type
        }))
        return updatedData;
    } catch (error) {
        console.error("Fetch Trending All :: Error", error)
        return [];
    }
}

export const fetchSearchContent = async (query) => {
    try {
        const queryParams = {query: query}
        const response = await apiConnector("GET", `${endPoints.searchUrl}?query=${query}}`);
        const data = response.data.results;
        const updatedData = data.map(ele => ({
            id: ele.id,
            title: ele.title || ele.name || ele.original_title,
            image_path: `${ (ele.poster_path || ele.profile_path) 
                ? IMAGE_BASE_URL + (ele.poster_path || ele.profile_path) 
                : ""}`,
            media_type: ele.media_type,
            known_for_department: ele.known_for_department
        }))
        return updatedData; 
    } catch (error) {
        console.error("Fetch Search content :: Error", error)
        return [];
    }
}

export const fetchMovieAll = async (category) => {
    try {
        if(! ["popular", "top_rated", "now_playing", "upcoming"].includes(category)) {
            throw new Error("Invalid category");
        }
        const response = await apiConnector("GET", `${endPoints.movieUrl}/${category}`);
        const data = response.data.results;
        const updatedData = data.map(ele => ({
            id: ele.id,
            title: ele.title || ele.name || ele.original_title,
            image_path: IMAGE_BASE_URL + ele.poster_path,
            media_type: ele.media_type
        }))
        return updatedData; 
    } catch (error) {
        console.error("Fetch Movie All :: Error", error)
        return [];
    }
}

export const fetchTvShowAll = async (category) => {
    try {
        if(! ["popular", "top_rated", "on_the_air", "airing_today"].includes(category)) {
            throw new Error("Invalid category");
        }
        const response = await apiConnector("GET", `${endPoints.tvUrl}/${category}`);
        const data = response.data.results;
        const updatedData = data.map(ele => ({
            id: ele.id,
            title: ele.title || ele.name || ele.original_title,
            image_path: IMAGE_BASE_URL + ele.poster_path,
            media_type: ele.media_type
        }))
        return updatedData; 
    } catch (error) {
        console.error("Fetch Movie All :: Error", error)
        return [];
    }
}