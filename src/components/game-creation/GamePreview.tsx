import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RefreshCw, Code } from "lucide-react";

interface GamePreviewProps {
  gameCode?: string;
  previewUrl?: string;
  isLoading?: boolean;
}

const GamePreview = ({
  gameCode = '// Sample game code\nconst game = {\n  title: "Cat Meme Master",\n  difficulty: "Paw-some"\n};',
  previewUrl = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000",
  isLoading = false,
}: GamePreviewProps) => {
  return (
    <div className="h-full w-full bg-circus-blue/5 p-4">
      <Card className="h-full w-full overflow-hidden border-2 border-circus-blue shadow-lg">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-circus-blue/20 p-4">
            <h2 className="text-xl font-semibold text-circus-blue">
              Meow Preview
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-circus-blue/30 hover:border-circus-blue/60"
                onClick={() => console.log("Refresh preview")}
              >
                <RefreshCw className="h-4 w-4 text-circus-blue" />
              </Button>
              <Button
                size="sm"
                className="bg-circus-green hover:bg-circus-green/90 text-white"
                onClick={() => console.log("Play preview")}
              >
                <Play className="mr-2 h-4 w-4" />
                Test Meow
              </Button>
            </div>
          </div>

          <Tabs defaultValue="preview" className="flex-1">
            <TabsList className="border-b border-circus-blue/20 px-4">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:text-circus-blue data-[state=active]:border-circus-blue"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="data-[state=active]:text-circus-blue data-[state=active]:border-circus-blue"
              >
                <Code className="mr-2 h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="flex-1 p-4">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="animate-spin">
                    <RefreshCw className="h-8 w-8 text-circus-blue" />
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full rounded-lg border-2 border-circus-blue/30 bg-white">
                  <img
                    src={previewUrl}
                    alt="Cat meme preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4">
                    <Button
                      className="bg-circus-pink hover:bg-circus-pink/90 text-white"
                      size="sm"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Play Meow
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="code" className="flex-1 p-4">
              <pre className="h-full w-full overflow-auto rounded-lg bg-circus-purple/5 p-4 border-2 border-circus-purple/20">
                <code className="text-sm text-circus-purple">{gameCode}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default GamePreview;
