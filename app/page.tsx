export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
      <div className="text-center">
        <p className="text-lg">Default Font (Open Sans)</p>
        <h1 className="text-4xl">The quick brown fox jumps over the lazy dog.</h1>
      </div>

      <div className="text-center">
        <p className="text-lg font-lora">Lora</p>
        <h1 className="text-4xl font-lora">The quick brown fox jumps over the lazy dog.</h1>
      </div>

      <div className="text-center">
        <p className="text-lg font-outfit">Outfit</p>
        <h1 className="text-4xl font-outfit">The quick brown fox jumps over the lazy dog.</h1>
      </div>

      <div className="text-center">
        <p className="text-lg font-great-vibes">Great Vibes</p>
        <h1 className="text-6xl font-great-vibes">The quick brown fox jumps over the lazy dog.</h1>
      </div>
    </main>
  );
}
