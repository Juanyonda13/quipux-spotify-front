import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Circle, Library } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ playlists, className }: { playlists: any[]; className?: string }) => {
    return (
        <div className={`pb-12 ${className}`}>
            <div className="py-4">
                  <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Discover
                  </h2>
                  <div className="space-y-1">
                    <Link to={'/dashboard'}>
                      <Button variant="secondary" className="w-full justify-start">
                        <Circle className="mr-2 h-4 w-4" />
                        Crear una playlist
                      </Button>
                    </Link>
                  </div>
            </div>
                <h2 className="relative px-7 text-lg font-semibold tracking-tight">Playlists</h2>
                <ScrollArea className="h-[400px] px-1">
                    <div className="space-y-1 p-2">
                        {playlists.map((playlist) => (
                              <Link key={playlist.id} to={`playlist/${playlist.name}`}>
                                    <Button variant="ghost" className="w-full justify-start font-normal">
                                        <Library className="mr-2 h-4 w-4" />
                                        {playlist.name}
                                    </Button>
                              </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default Sidebar;
