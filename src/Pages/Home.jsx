// src/Pages/Home.jsx

import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Main from "../Components/Main";
import NowPlaying from "../Components/NowPlaying";
import Player from "../Components/Player";
import CategoryCard from "../Components/CategoryCard";
import { Outlet } from "react-router-dom";

export default function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [categorias, setCategorias] = useState({ artistas: [], musicas: [], playlists: [] });

  useEffect(() => {
    ["artistas", "musicas", "playlists"].forEach(async (tipo) => {
      const response = await fetch(`http://localhost:3000/categorias/${tipo}`);
      const data = await response.json();
      setCategorias((prev) => ({ ...prev, [tipo]: data }));
    });

    fetch("http://localhost:3000/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/musicas")
      .then((res) => res.json())
      .then((data) => setMusicas(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/artistas")
      .then((res) => res.json())
      .then((data) => setArtistas(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main className="flex flex-col min-h-screen max-h-screen p-2">
        <Header />
        <div className="flex justify-between overflow-auto">
          <Sidebar>
            {playlists.map((playlist) => (
              <li key={playlist._id}>
                <img src={playlist.capa} className="h-14 p-1 rounded-lg" />
              </li>
            ))}
            {musicas.map((musica) => (
              <li key={musica._id}>
                <img src={musica.capa} className="h-14 p-1 rounded-lg" />
              </li>
            ))}
            {artistas.map((artista) => (
              <li key={artista._id}>
                <img src={artista.profile} className="h-14 w-14 p-1 rounded-full object-cover" />
              </li>
            ))}
          </Sidebar>
          <Main />
          <NowPlaying />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Categorias</h1>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(categorias).map((tipo) =>
              categorias[tipo].map((category) => (
                <CategoryCard key={category._id} category={category} tipo={tipo} />
              ))
            )}
          </div>
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
        <Player />
      </main>
    </>
  );
}
