import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { loadPyodide } from "pyodide";
import { Maximize2, X, RefreshCw, Volume2, VolumeX } from "lucide-react";

interface GameModalProps {
  game: {
    id: string;
    title: string;
    difficulty: string;
    pythonCode?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const defaultPythonCode = `
print("Hello from Python!")
# Your game code will be here
`;

const GameModal = ({ game, isOpen, onClose }: GameModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadPyodideInstance = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      try {
        const pyodideInstance = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        });
        if (mounted) {
          setPyodide(pyodideInstance);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        if (mounted) {
          setOutput("Failed to initialize Python environment");
          setIsLoading(false);
        }
      }
    };

    loadPyodideInstance();

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  const runGame = async () => {
    if (!pyodide || !game) return;

    try {
      setOutput("");
      const result = await pyodide.runPythonAsync(
        game.pythonCode || defaultPythonCode,
      );
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-circus-purple/5 border-2 border-circus-purple">
        <div className="flex items-center justify-between p-4 border-b border-circus-purple/20">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-circus-purple">
              {game.title}
            </h2>
            <Badge className="bg-circus-yellow text-black">
              {game.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-circus-purple hover:text-circus-purple/80"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-circus-purple hover:text-circus-purple/80"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-circus-red hover:text-circus-red/80"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <Card className="h-[400px] flex items-center justify-center bg-circus-purple/10">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-circus-purple mx-auto mb-4" />
                <p className="text-circus-purple">
                  Loading Python Environment...
                </p>
              </div>
            </Card>
          ) : (
            <Card className="h-[400px] relative bg-black/90 text-green-400 font-mono p-4 overflow-auto">
              <pre>{output || "Game output will appear here..."}</pre>
              <div className="absolute bottom-4 right-4">
                <Button
                  onClick={runGame}
                  className="bg-circus-green hover:bg-circus-green/90 text-white"
                >
                  Run Game
                </Button>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
