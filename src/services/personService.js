import apiConnector from "./apiConnector";
import { IMAGE_BASE_URL, endPoints, externalPoints } from "./apis";

const genders = ["Not Specified", "Female", "Male", "Non-binary"];

export const fetchPersonDetails = async (personId) => {
    try {
        const response = await apiConnector(`${endPoints.personUrl}/${personId}`);
        const data = response.data;

        const external_ids = await fetchPersonExternalId(personId);

        const updatedData = {
            id: data.id,
            name: data.name,
            profile_path: data.profile_path ? IMAGE_BASE_URL + data.profile_path : "",
            known_for_department: data.known_for_department,
            biography: data.biography,
            gender: genders[data.gender],
            birthday: data.birthday,
            deathday: data.deathday,
            place_of_birth: data.place_of_birth,
            external_ids: external_ids
        }
        return updatedData;
    } catch (error) {
        console.log("Fetch Person details :: Error", error);
        return {};
    }
}

export const fetchPersonExternalId = async (personId) => {
    try {
        const response = await apiConnector(`${endPoints.personUrl}/${personId}/external_ids`);
        const data = response.data;
        const updatedData = {         
            imdb_id: data.imdb_id ? `${externalPoints.imdbUrl}/${data.imdb_id}` : "",
            facebook_id: data.facebook_id ? `${externalPoints.facebookUrl}/${data.facebook_id}` : "",
            instagram_id: data.instagram_id ?`${externalPoints.instagramUrl}/${data.instagram_id}` : "",
            twitter_id: data.twitter_id ? `${externalPoints.twitterUrl}/${data.twitter_id}` : "",
            youtube_id: data.youtube_id ? `${externalPoints.youtubeUrl}/${data.youtube_id}` : "",
        }
        return updatedData;
    } catch (error) {
        console.log("Fetch Person details :: Error", error);
        return {};
    }
}

export const fetchPersonCreditedFor = async (personId) => {
    try {
        const response = await apiConnector(`${endPoints.personUrl}/${personId}/combined_credits`);
        const cast = response.data.cast;
        const crew = response.data.crew;

        const updatedData = (data) => {
            return data.map((ele) => {
                const releaseYear = ele.release_date
                    ? ele.release_date.split("-")[0]
                    : ele.first_air_date
                    ? ele.first_air_date.split("-")[0]
                    : "0000"; // Default year if not available or invalid
                
                return {
                    id: ele.id,
                    title: ele.title || ele.original_title || ele.name,
                    image_path: ele.poster_path ? IMAGE_BASE_URL + ele.poster_path : "",
                    media_type: ele.media_type,
                    character: ele.character || ele.job,
                    release_year: releaseYear,
                };
            });
        }
        var updatedCastData = updatedData(cast);
        var updatedCrewData = updatedData(crew);
        updatedCastData.sort((a, b) => parseInt(b.release_year) - parseInt(a.release_year));
        updatedCrewData.sort((a, b) => parseInt(b.release_year) - parseInt(a.release_year));
        return {updatedCastData, updatedCrewData};
    } catch (error) {
        console.log("Fetch Person credited for :: Error", error);
        return {};
    }
}

export const fetchPersonPopular = async () => {
    try {
        const response = await apiConnector(`${endPoints.personUrl}/popular`);
        const datas = response.data.results;

        const updatedData = datas.map(data => ({
            id: data.id,
            title: data.name || data.original_name,
            image_path: data.profile_path ? IMAGE_BASE_URL + data.profile_path : "",
            known_for_department: data.known_for_department,
            media_type: data.media_type || "person",
            gender: genders[data.gender],
        }))
        return updatedData;
    } catch (error) {
        console.log("Fetch Person Popular :: Error", error);
        return {};
    }
}