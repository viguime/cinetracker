import MovieList from './components/MovieList'
import { Film } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8">
        <header className="mb-6 md:mb-8 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
            <Film className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              cinetracker
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-lg">
            Discover and track your favorite movies
          </p>
        </header>
        
        <main>
          <MovieList />
        </main>
      </div>
    </div>
  )
}

export default App
