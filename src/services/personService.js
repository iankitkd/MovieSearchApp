import apiConnector from "./apiConnector";
import { IMAGE_BASE_URL, endPoints } from "./apis";

const genders = ["Not Specified", "Female", "Male", "Non-binary"];

export const fetchPersonDetails = async (personId) => {
    try {
        const response = await apiConnector("GET", `${endPoints.personUrl}/${personId}`);
        const data = response.data;

        const updatedData = {
            id: data.id,
            name: data.name,
            profile_path: data.profile_path ? IMAGE_BASE_URL + data.profile_path : "",
            known_for_department: data.known_for_department,
            biography: data.biography,
            gender: genders[data.gender],
            birthday: data.birthday,
            deathday: data.deathday,
            place_of_birth: data.place_of_birth
        }
        return updatedData;
    } catch (error) {
        console.log("Fetch Person details :: Error", error);
        return {};
    }
}