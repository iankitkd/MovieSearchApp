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
            })
        )
        return updatedData;
    } catch (error) {
        console.error("Fetch Trending All :: Error", error)
        return [];
    }
}