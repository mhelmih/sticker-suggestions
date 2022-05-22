import "./index.css";
import React, { useState } from "react";
import stickersGallery from "./data";
import findStickers from "./stickerSuggestions";

function App() {
  const [stickers, setStickers] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setStickers(findStickers(e.target.value.toLowerCase(), stickersGallery));
  };

  return (
    <div className="p-[5rem]">

      {/* KOTAK OBROLAN SEDERHANA */}
      <p>Masukkan pesan:</p>
      <input
        type="text"
        name="chat-box"
        placeholder="Ketikkan pesan disini"
        className="mr-4 outline outline-1"
        value={search}
        onChange={handleSearch}
      />
      <button className="outline outline-1">Kirim</button>
      
      {/* DAFTAR REKOMENDASI STIKER */}
      <p className="pt-[3rem]">Rekomendasi stiker ({stickers.length}): </p>
      <div>
        {stickers.map((sticker) => (
          <div key={sticker.id}>
            <img src={sticker.path} alt="" className="inline" />
            <p className="inline">tags: {sticker.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
