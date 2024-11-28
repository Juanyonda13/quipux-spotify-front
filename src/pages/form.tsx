"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOutletContext } from "react-router-dom";

export default function PlaylistForm() {
    const { createPlaylist, error } = useOutletContext<{
        createPlaylist: (playlist: any) => Promise<void>;
        error: string | null;
    }>();

    const [playlist, setPlaylist] = useState({
        name: "",
        description: "",
        songs: [{ title: "", artist: "", album: "", year: "", genre: "" }],
    });

    const [message, setMessage] = useState("");

    const handlePlaylistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPlaylist((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSongChange = (index: number, field: string, value: string) => {
        const updatedSongs = playlist.songs.map((song, i) =>
            i === index ? { ...song, [field]: value } : song
        );
        setPlaylist((prev) => ({ ...prev, songs: updatedSongs }));
    };

    const addSong = () => {
        setPlaylist((prev) => ({
            ...prev,
            songs: [...prev.songs, { title: "", artist: "", album: "", year: "", genre: "" }],
        }));
    };

    const removeSong = (index: number) => {
        setPlaylist((prev) => ({
            ...prev,
            songs: prev.songs.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPlaylist(playlist).then(
                () => {
                    console.log(222)
                    setMessage("Playlist created successfully!");
                }
            ).catch(() => {
                setMessage(error || "Error creating playlist");      
            });
            setPlaylist({
                name: "",
                description: "",
                songs: [{ title: "", artist: "", album: "", year: "", genre: "" }],
            });
        } catch (error:any) {
            setMessage(error.message);
        }
    };

    return (
        <div className="flex  justify-center items-center min-h-screen p-8 gap-8">
            <Card className="w-1/3">
                <CardHeader>
                    <CardTitle>Create Playlist</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name" className="text-sm">
                                Playlist Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter playlist name"
                                value={playlist.name}
                                onChange={handlePlaylistChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="description" className="text-sm">
                                Playlist Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter playlist description"
                                value={playlist.description}
                                onChange={handlePlaylistChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Submit Playlist
                        </Button>
                        {message && <p className="mt-2 text-center">{message}</p>}
                    </form>
                </CardContent>
            </Card>

            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Songs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <ScrollArea className="h-[400px] border rounded-lg p-4">
                            {playlist.songs.map((song, index) => (
                                <div key={index} className="border p-4 rounded-lg space-y-2 relative mb-4">
                                    <Button
                                        variant="ghost"
                                        className="absolute top-2 right-2"
                                        onClick={() => removeSong(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                    <Input
                                        placeholder="Title"
                                        value={song.title}
                                        onChange={(e) => handleSongChange(index, "title", e.target.value)}
                                        required
                                    />
                                    <Input
                                        placeholder="Artist"
                                        value={song.artist}
                                        onChange={(e) => handleSongChange(index, "artist", e.target.value)}
                                        required
                                    />
                                    <Input
                                        placeholder="Album"
                                        value={song.album}
                                        onChange={(e) => handleSongChange(index, "album", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Year"
                                        type="number"
                                        value={song.year}
                                        onChange={(e) => handleSongChange(index, "year", e.target.value)}
                                        required
                                    />
                                    <Input
                                        placeholder="Genre"
                                        value={song.genre}
                                        onChange={(e) => handleSongChange(index, "genre", e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                        </ScrollArea>
                        <Button type="button" onClick={addSong} className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Song
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
