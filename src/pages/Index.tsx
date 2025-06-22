
"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, Star, X } from "lucide-react"

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

// Mock data for movies and series with real movie poster style images
const mockMovies = [
  {
    id: 1,
    title: "La Casa de Papel",
    description: "Uma série sobre um assalto épico ao Banco da Espanha liderado pelo enigmático Professor.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    year: 2020,
    rating: "97% relevante",
    duration: "4 temporadas",
    genre: "Drama Criminal",
    featured: true,
  },
  {
    id: 2,
    title: "Stranger Things",
    description: "Crianças de uma pequena cidade enfrentam criaturas sobrenaturais dos anos 80.",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    year: 2022,
    rating: "95% relevante",
    duration: "4 temporadas",
    genre: "Ficção Científica",
  },
  {
    id: 3,
    title: "The Witcher",
    description: "Geralt de Rivia, um caçador de monstros, busca seu destino em um mundo turbulento.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    year: 2023,
    rating: "92% relevante",
    duration: "3 temporadas",
    genre: "Fantasia",
  },
  {
    id: 4,
    title: "Ozark",
    description: "Uma família se muda para os Ozarks para lavar dinheiro para um cartel mexicano.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    year: 2021,
    rating: "94% relevante",
    duration: "4 temporadas",
    genre: "Drama Criminal",
  },
  {
    id: 5,
    title: "The Crown",
    description: "A história íntima da Rainha Elizabeth II e os eventos políticos que moldaram o século XX.",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    year: 2023,
    rating: "96% relevante",
    duration: "6 temporadas",
    genre: "Drama Histórico",
  },
  {
    id: 6,
    title: "Bridgerton",
    description: "Romance e escândalo na alta sociedade londrina da era Regência.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    year: 2022,
    rating: "89% relevante",
    duration: "2 temporadas",
    genre: "Romance Histórico",
  },
  {
    id: 7,
    title: "Dark",
    description: "Quatro famílias em uma pequena cidade alemã descobrem segredos que transcendem o tempo.",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    year: 2020,
    rating: "98% relevante",
    duration: "3 temporadas",
    genre: "Thriller Sci-Fi",
  },
  {
    id: 8,
    title: "The Queen's Gambit",
    description: "Uma jovem prodígio do xadrez luta contra dependências enquanto domina o jogo.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    year: 2020,
    rating: "97% relevante",
    duration: "Minissérie",
    genre: "Drama",
  },
  {
    id: 9,
    title: "Wednesday",
    description:
      "Wednesday Addams navega pelos anos de estudante na Academia Nevermore enquanto domina sua habilidade psíquica.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    year: 2022,
    rating: "93% relevante",
    duration: "1 temporada",
    genre: "Comédia Sobrenatural",
  },
  {
    id: 10,
    title: "Squid Game",
    description:
      "Centenas de jogadores endividados aceitam um convite para competir em jogos infantis por um prêmio tentador.",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    year: 2021,
    rating: "95% relevante",
    duration: "1 temporada",
    genre: "Thriller",
  },
]

// Video Modal Component
interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  movie: (typeof mockMovies)[0] | null
}

function VideoModal({ isOpen, onClose, movie }: VideoModalProps) {
  if (!isOpen || !movie) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="aspect-video">
          <video src={movie.videoUrl} controls autoPlay className="w-full h-full" poster={movie.image}>
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>

        <div className="p-6">
          <h2 className="text-white text-2xl font-bold mb-2">{movie.title}</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-400 font-medium">{movie.rating}</span>
            <span className="text-gray-400">{movie.year}</span>
            <span className="text-gray-400">{movie.duration}</span>
            <span className="text-gray-400">{movie.genre}</span>
          </div>
          <p className="text-gray-300 leading-relaxed">{movie.description}</p>
        </div>
      </div>
    </div>
  )
}

// Carousel Component
interface CarouselProps {
  title: string
  items: typeof mockMovies
  onMovieClick: (movie: (typeof mockMovies)[0]) => void
}

function Carousel({ title, items, onMovieClick }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsPerView = 5
  const maxIndex = Math.max(0, items.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const translateX = -(currentIndex * (100 / itemsPerView))

  return (
    <div className="group relative mb-12">
      <h2 className="text-white text-2xl font-semibold mb-6 px-12">{title}</h2>

      <div className="relative px-12">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-32",
            "bg-black/50 hover:bg-black/70 text-white rounded-r-md",
            "flex items-center justify-center transition-all duration-300",
            "opacity-0 group-hover:opacity-100",
            currentIndex === 0 && "opacity-30 cursor-not-allowed",
          )}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-32",
            "bg-black/50 hover:bg-black/70 text-white rounded-l-md",
            "flex items-center justify-center transition-all duration-300",
            "opacity-0 group-hover:opacity-100",
            currentIndex === maxIndex && "opacity-30 cursor-not-allowed",
          )}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-1/5 px-2"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={cn(
                    "relative group cursor-pointer transition-all duration-300",
                    "hover:scale-110 hover:z-10 transform-gpu",
                    hoveredItem === item.id && "scale-110 z-10",
                  )}
                  onClick={() => onMovieClick(item)}
                >
                  {/* Movie Poster */}
                  <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </button>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                    </div>
                  </div>

                  {/* Hover Info Card */}
                  {hoveredItem === item.id && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-md shadow-2xl p-4 z-20 border border-gray-700 animate-in slide-in-from-top-2 duration-200">
                      <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-green-400 text-sm font-medium">{item.rating}</span>
                        <span className="text-gray-400 text-sm">{item.year}</span>
                        <span className="text-gray-400 text-sm">{item.duration}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                          </button>
                          <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                          <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                            <ThumbsUp className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                          <ChevronDown className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Featured Banner Component with movie poster background
function FeaturedBanner({
  movie,
  onMovieClick,
}: { movie: (typeof mockMovies)[0]; onMovieClick: (movie: (typeof mockMovies)[0]) => void }) {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Movie Poster */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&h=800&fit=crop"
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Netflix Logo - Top Left */}
      <div className="absolute top-8 left-12 z-20">
        <div className="text-red-600 text-4xl font-bold">NETFLIX</div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-red-600 text-3xl font-bold">N</div>
            <span className="text-gray-300 text-xl font-medium">SÉRIE ORIGINAL</span>
          </div>

          <h1 className="text-white text-6xl md:text-8xl font-bold mb-8 leading-tight">{movie.title}</h1>

          <div className="flex items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-green-400 fill-green-400" />
              <span className="text-green-400 font-semibold text-lg">{movie.rating}</span>
            </div>
            <span className="text-white text-lg">{movie.year}</span>
            <span className="text-white text-lg">{movie.duration}</span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded text-sm">{movie.genre}</span>
          </div>

          <p className="text-white text-2xl mb-10 leading-relaxed max-w-2xl">{movie.description}</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onMovieClick(movie)}
              className="bg-white hover:bg-gray-200 text-black px-12 py-4 rounded-md font-bold text-xl flex items-center gap-4 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="w-6 h-6 fill-black" />
              Assistir
            </button>
            <button className="bg-gray-600/70 hover:bg-gray-600 text-white px-12 py-4 rounded-md font-bold text-xl flex items-center gap-4 transition-all duration-300 backdrop-blur-sm hover:scale-105 shadow-lg">
              <Plus className="w-6 h-6" />
              Minha Lista
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

// Main Component
export default function NetflixCarousel() {
  const [selectedMovie, setSelectedMovie] = useState<(typeof mockMovies)[0] | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const featuredMovie = mockMovies[0]
  const popularMovies = mockMovies.slice(0, 5)
  const trendingMovies = mockMovies.slice(5, 10)

  const handleMovieClick = (movie: (typeof mockMovies)[0]) => {
    setSelectedMovie(movie)
    setIsVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setSelectedMovie(null)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Featured Banner with movie poster background */}
      <FeaturedBanner movie={featuredMovie} onMovieClick={handleMovieClick} />

      {/* Only 2 Carousels Section */}
      <div className="relative bg-black py-16">
        <Carousel title="Populares na Netflix" items={popularMovies} onMovieClick={handleMovieClick} />
        <Carousel title="Em Alta" items={trendingMovies} onMovieClick={handleMovieClick} />
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal} movie={selectedMovie} />
    </div>
  )
}
