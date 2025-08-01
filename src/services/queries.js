import { useQuery } from "@tanstack/react-query";

import { fetchMovieAll, fetchSearchContent, fetchTrendingAll, fetchTvShowAll } from "./movieService";
import { fetchPersonCreditedFor, fetchPersonDetails, fetchPersonPopular } from "./personService";
import fetchDetails, { fetchRecommendations, fetchSimilars, fetchTrailer } from "./movieDetailsService";

export function useTrendingQuery(trendingWindow) {
    const timeWindow = (trendingWindow == "Today") ? "day" : "week";
    return useQuery({ 
        queryKey: ['trending', timeWindow], 
        queryFn: () => fetchTrendingAll(timeWindow),
        keepPreviousData: true
    });
}

export function useMoviesQuery(currentTab, region) {
    const category = currentTab.toLowerCase().replace(/\s+/g, '_');
    return useQuery({ 
        queryKey: ['movie', category], 
        queryFn: () => fetchMovieAll(category, region),
        keepPreviousData: true
    });
}

export function useTvShowsQuery(currentTab) {
    const category = currentTab.toLowerCase().replace(/\s+/g, '_');
    return useQuery({ 
        queryKey: ['tv', category], 
        queryFn: () => fetchTvShowAll(category),
        keepPreviousData: true
    });
}

// search query
export function useSearchQuery(query) {
    return useQuery({ 
        queryKey: ['search', query], 
        queryFn: () => fetchSearchContent(query),
        enabled: false,
        keepPreviousData: true
    });
}


// details queries
export function useDetailsQuery(media_type, content_id) {
    return useQuery({ 
        queryKey: ['details', media_type, content_id], 
        queryFn: () => fetchDetails({type: media_type, id: content_id}),
        keepPreviousData: true
    });
}

export function useTrailersQuery(media_type, content_id) {
    return useQuery({ 
        queryKey: ['trailer', media_type, content_id], 
        queryFn: () => fetchTrailer(media_type, content_id),
        keepPreviousData: true
    });
}

export function useSimilarsQuery(media_type, content_id) {
    return useQuery({ 
        queryKey: ['similars', media_type, content_id], 
        queryFn: () => fetchSimilars(media_type, content_id),
        enabled: false,
        keepPreviousData: true
    });
}

export function useRecommendationsQuery(media_type, content_id) {
    return useQuery({ 
        queryKey: ['recommendations', media_type, content_id], 
        queryFn: () => fetchRecommendations(media_type, content_id),
        enabled: false,
        keepPreviousData: true
    });
}


// person queries
export function usePersonsQuery() {
    return useQuery({ 
        queryKey: ['persons'], 
        queryFn: () => fetchPersonPopular(),
        keepPreviousData: true
    });
}

export function usePersonDetailsQuery(id) {
    return useQuery({ 
        queryKey: ['person_details', id], 
        queryFn: () => fetchPersonDetails(id),
        keepPreviousData: true
    });
}

export function usePersonCreditedForQuery(id) {
    return useQuery({ 
        queryKey: ['person_credits', id], 
        queryFn: () => fetchPersonCreditedFor(id),
        enabled: false,
        keepPreviousData: true
    });
}