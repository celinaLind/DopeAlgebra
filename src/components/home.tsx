import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Cat, Star } from "lucide-react";
import GameModal from "./game-modal";

interface Game {
  id: string;
  title: string;
  thumbnail: string;
  difficulty: string;
  rating: number;
  author: string;
  pythonCode?: string;
}

const defaultGames: Game[] = [
  {
    id: "1",
    title: "MiniCat",
    thumbnail:
      "https://images.unsplash.com/photo-1661839808736-948aa33666ff?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    difficulty: "Beginner",
    rating: 4.5,
    author: "Cat-rina's Mom",
    pythonCode: 'print("Welcome to MiniCat!")',
  },
  {
    id: "2",
    title: "Trial and Error",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1671493286575-273500e65fa7?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    difficulty: "Intermediate",
    rating: 4.8,
    author: "Cat-rina's Dad",
    pythonCode: 'print("Welcome to Trial and Error!")',
  },
  {
    id: "3",
    title: "Dreaded Mystery",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1695137470319-1ca87cb0ea32?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    difficulty: "Advanced",
    rating: 4.2,
    author: "NumberNinja",
    pythonCode: 'print("Welcome to Dreaded Mystery!")',
  },
];

const Home = () => {
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-circus-purple/5 to-circus-blue/5">
      {/* Navbar */}
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-circus-purple to-circus-blue bg-clip-text text-transparent">
              DopeAlgebra
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-circus-purple">
              <UserCircle className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 text-circus-purple">
            Stay and play
          </h2>
          <p className="text-gray-600 mb-8">
            Create and play mini games that are fun and engaging for the
            community
          </p>
          <Button className="bg-circus-purple hover:bg-circus-purple/90 text-white">
            <Cat className="w-5 h-5 mr-2" />
            Chat with Cat-rina
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultGames.map((game) => (
            <Card
              key={game.id}
              className="overflow-hidden border-2 border-circus-blue/20 hover:border-circus-blue/40 transition-all cursor-pointer hover:shadow-lg"
              onClick={() => handlePlayGame(game)}
            >
              <div className="aspect-video relative">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-circus-yellow text-black">
                  {game.difficulty}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-circus-purple">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{game.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    by {game.author}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <GameModal
        game={selectedGame}
        isOpen={!!selectedGame}
        onClose={handleCloseGame}
      />
    </div>
  );
};

export default Home;
