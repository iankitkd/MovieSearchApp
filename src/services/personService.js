import apiConnector from "./apiConnector";
import { IMAGE_BASE_URL, endPoints, externalPoints } from "./apis";

const genders = ["Not Specified", "Female", "Male", "Non-binary"];

export const fetchPersonDetails = async (personId) => {
    try {
        const response = await apiConnector("GET", `${endPoints.personUrl}/${personId}`);
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
        const response = await apiConnector("GET", `${endPoints.personUrl}/${personId}/external_ids`);
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