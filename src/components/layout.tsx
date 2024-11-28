import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import usePlaylists from "@/hooks/fetch/playlist";

const Layout = () => {
    const { playlists, fetchPlaylists, createPlaylist, loading, error } = usePlaylists();

    return (
        <div className="flex overflow-y-hidden">
            <Sidebar className="w-64" playlists={playlists} />
            <main className="flex-1 overflow-hidden">
                <Outlet context={{ createPlaylist, fetchPlaylists, playlists, loading, error }} />
            </main>
        </div>
    );
};

export default Layout;
