import apiConnector from "./apiConnector";
import { IMAGE_BASE_URL, endPoints, externalPoints } from "./apis";

export const fetchMovieDetails = async (id) => {
    try {
        const response = await apiConnector(`${endPoints.movieUrl}/${id}`); 
        const data = response.data;

        const castDetails = await fetchCastDetails("movie", id);

        const updatedData = {
            id: data.id,
            title: data.title || data.name || data.original_title,
            poster_path: data.poster_path ? IMAGE_BASE_URL + data.poster_path : "",
            backdrop_path: data.backdrop_path ? IMAGE_BASE_URL + data.backdrop_path : "",
            overview: data.overview,
            tagline: data.tagline,
            genres: data.genres,
            release_date: data.release_date,
            runtime: data.runtime ? `${(data.runtime / 60).toFixed(0)}h  ${data.runtime % 60}min` : "",
            vote_average: Math.trunc(data.vote_average * 10) || "",
            cast: castDetails,
        }
        return updatedData;
    } catch (error) {
        console.log("Fetch Movie details :: Error", error);
        return {};
    }
}

export const fetchShowDetails = async (id) => {
    try {
        const response = await apiConnector(`${endPoints.tvUrl}/${id}`);
        const data = response.data;

        const castDetails = await fetchCastDetails("tv", id);

        const updatedData = {
            id: data.id,
            title: data.title || data.name || data.original_name,
            poster_path: data.poster_path ? IMAGE_BASE_URL + data.poster_path : "",
            backdrop_path: data.backdrop_path ? IMAGE_BASE_URL + data.backdrop_path : "",
            overview: data.overview,
            tagline: data.tagline,
            genres: data.genres,
            vote_average: Math.trunc(data.vote_average * 10) || "",
            cast: castDetails,
        }
        return updatedData;
    } catch (error) {
        console.log("Fetch Movie details :: Error", error);
        return {};
    }
}

export const fetchTrailer = async (type, id) => {
    try {
        const response = await apiConnector(`${endPoints.baseUrl}/${type}/${id}/videos`);
        const videos = response.data.results;
        var updatedData = videos.find((video) => video.type == "Trailer");
        if(!updatedData) {
            updatedData = videos.find((video) => video.type == "Teaser");
        }
        if(!updatedData) {
            updatedData = videos[0];
        }
        const trailerPath = updatedData ? `${externalPoints.youtubeUrl}/embed/${updatedData.key}` : "";
        return trailerPath; 
    } catch (error) {
        console.log("Fetch Trailer :: Error", error);
        return [];
    }
}

const fetchCastDetails = async (type, id) => {
    try {
        const response = await apiConnector(`${endPoints.baseUrl}/${type}/${id}/credits`);
        const cast = response.data.cast;
        const updatedData = cast.map((data) => ({
            id: data.id,
            title: data.name || data.original_name,
            image_path: data.profile_path ? IMAGE_BASE_URL + data.profile_path : "",
            media_type: "person",
            character: data.character,
        }))
        return updatedData; 
    } catch (error) {
        console.log("Fetch Cast details :: Error", error);
        return [];
    }
}
export const fetchSimilars = async (type, id) => {
    try {
        const response = await apiConnector(`${endPoints.baseUrl}/${type}/${id}/similar`);
        const similars = response.data.results;
        const updatedData = similars.map((data) => ({
            id: data.id,
            title: data.title || data.name || data.original_name,
            image_path: data.poster_path ? IMAGE_BASE_URL + data.poster_path : "",
            vote_average: Math.trunc(data.vote_average * 10) || "",
            media_type: data.media_type || type,
        }))
        return updatedData; 
    } catch (error) {
        console.log("Fetch Similars :: Error", error);
        return [];
    }
}
export const fetchRecommendations = async (type, id) => {
    try {
        const response = await apiConnector(`${endPoints.baseUrl}/${type}/${id}/recommendations`);
        const recommendations = response.data.results;
        const updatedData = recommendations.map((data) => ({
            id: data.id,
            title: data.title || data.name || data.original_name,
            image_path: data.poster_path ? IMAGE_BASE_URL + data.poster_path : "",
            vote_average: Math.trunc(data.vote_average * 10) || "",
            media_type: data.media_type,
        }))
        return updatedData; 
    } catch (error) {
        console.log("Fetch Recommendations :: Error", error);
        return [];
    }
}

const fetchDetails = async ({type, id}) => {
    try {
        var response = {};
        if(type == "movie") {
            response = await fetchMovieDetails(id);
        } else if(type == "tv") {
            response = await fetchShowDetails(id);
        }
        return response;
    } catch (error) {
        console.log("Fetch details :: Error", error);
        return {};
    }
}
export default fetchDetails;