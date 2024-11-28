import { useState, useEffect } from "react";
import axiosInstance from "../config";

const usePlaylists = () => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch playlists
    const fetchPlaylists = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("lists");
            setPlaylists(response.data.object);
        } catch (err: any) {
            setError(err.message || "Error fetching playlists");
        } finally {
            setLoading(false);
        }
    };

    // Create a new playlist
    const createPlaylist = async (newPlaylist: any) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("lists", newPlaylist);
            if (response.status === 201) {
                await fetchPlaylists();
            }
        } catch (err: any) {
          throw  setError(err.message || "Error creating playlist");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return { playlists, fetchPlaylists, createPlaylist, loading, error };
};

export default usePlaylists;
