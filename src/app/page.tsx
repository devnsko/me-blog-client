'use client'
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Hello, my name is <span className="text-blue-500">Denys</span>
          <br />
          <span className="text-gray-500">and this is my tech blog</span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto">
          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-2 mx-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
            Last Posts
          </button>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-2 mx-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
            Get Started
          </button>
          </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
