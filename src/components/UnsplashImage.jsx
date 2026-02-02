import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchImages = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setImages([]);

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=12`,
      {
        headers: {
          Authorization:
            "Client-ID OZqGLwSThOIJJlZsWG2NPPekspoG_VLxXMBWeCDdxvM",
        },
      }
    );
    const data = await res.json();
    console.log("res.json():", data);
    setImages(data.results || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-linear-to-br from-violet-600/80 to-blue-600/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Image Search
          </h1>

          <div className="mt-4 flex gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search images..."
              className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm outline-none placeholder-white/50 focus:ring-2 focus:ring-white/30"
            />

            <button
              onClick={searchImages}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Loader */}
      {loading && (
        <div className="mt-20 flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        </div>
      )}

      {/* Images */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="
    group overflow-hidden rounded-2xl
    bg-white/5 backdrop-blur
    transform transition
    duration-500 ease-out
    hover:shadow-2xl
  "
            >
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="
      h-full w-full object-cover
      scale-95 opacity-0x
      transition-all duration-500 ease-out
      group-hover:scale-110
    "
                onLoad={(e) => {
                  e.currentTarget.classList.remove("opacity-0", "scale-95");
                  e.currentTarget.classList.add("opacity-100", "scale-100");
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
