"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/hooks/fetch/config";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Playlist = () => {
    const { name } = useParams<{ name: string }>();
    const [playlist, setPlaylist] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
        try {
            const response = await axiosInstance.get(`/lists/${name}`);
            setPlaylist(response.data.object);
        } catch (err: any) {
            setError(err.message || "Failed to fetch playlist");
        } finally {
            setLoading(false);
        }
        };

        fetchPlaylist();
    }, [name]);

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Loading...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg text-red-500">Error: {error}</p>
        </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-8">
        <Card className="w-full max-w-lg shadow-lg border">
            <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">{playlist.name}</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-center mb-4 text-muted-foreground">{playlist.description}</p>
            <h2 className="text-lg font-semibold mb-2">Songs</h2>
            <ScrollArea className="h-[300px]">
                <ul className="space-y-2">
                {playlist.songs.map((song: any, index: number) => (
                    <li key={index} className="p-3 border rounded-lg shadow-sm">
                    <p className="font-semibold">🎵 Title: {song.title}</p>
                    <p>🎤 Artist: {song.artist}</p>
                    <p>💿 Album: {song.album || "N/A"}</p>
                    <p>📅 Year: {song.year}</p>
                    <p>🎼 Genre: {song.genre}</p>
                    </li>
                ))}
                </ul>
            </ScrollArea>
            </CardContent>
        </Card>
        </div>
    );
};

export default Playlist;
