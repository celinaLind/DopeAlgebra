import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Play, Share2 } from "lucide-react";

interface PublishBarProps {
  title?: string;
  difficulty?: "easy" | "medium" | "hard";
  category?: string;
  onPublish?: () => void;
  onPreview?: () => void;
  onSaveDraft?: () => void;
}

const PublishBar = ({
  title = "Untitled Cat Meme Game",
  difficulty = "medium",
  category = "Memes",
  onPublish = () => {},
  onPreview = () => {},
  onSaveDraft = () => {},
}: PublishBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-circus-purple/10 border-t-2 border-circus-purple shadow-lg px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Game Title"
          value={title}
          className="w-64 border-circus-purple/30 focus:border-circus-purple"
          onChange={() => {}}
        />
        <Badge className="capitalize bg-circus-yellow text-black font-medium">
          {difficulty}
        </Badge>
        <Badge
          variant="outline"
          className="capitalize border-circus-pink text-circus-pink"
        >
          {category}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onSaveDraft}
          className="border-circus-blue text-circus-blue hover:bg-circus-blue/10"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          className="border-circus-green text-circus-green hover:bg-circus-green/10"
        >
          <Play className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button
          size="sm"
          onClick={onPublish}
          className="bg-circus-red hover:bg-circus-red/90 text-white"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
};

export default PublishBar;
