import MovieList from './components/MovieList'
import { Film } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Film className="w-10 h-10 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              cinetracker
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
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
