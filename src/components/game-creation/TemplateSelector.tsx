import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Gamepad2 } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface TemplateSelectorProps {
  onSelectTemplate?: (template: Template) => void;
  templates?: Template[];
  isOpen?: boolean;
}

const defaultTemplates: Template[] = [
  {
    id: "1",
    title: "Grumpy Cat Matcher",
    description:
      "Match the perfect grumpy cat reaction to different situations",
    thumbnail:
      "https://images.unsplash.com/photo-1517519014922-8fc06b814a0e?w=400&h=300&fit=crop",
    difficulty: "Beginner",
  },
  {
    id: "2",
    title: "Cat Meme Memory",
    description: "Match pairs of hilarious cat memes in this memory game",
    thumbnail:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    difficulty: "Intermediate",
  },
  {
    id: "3",
    title: "Meme Caption Master",
    description: "Create the funniest captions for cat meme templates",
    thumbnail:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop",
    difficulty: "Advanced",
  },
];

const TemplateSelector = ({
  onSelectTemplate = () => {},
  templates = defaultTemplates,
  isOpen = true,
}: TemplateSelectorProps) => {
  return (
    <div className="w-full bg-circus-green/10 border-t-2 border-circus-green shadow-lg">
      <Collapsible open={isOpen} className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-circus-green/20">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-circus-green" />
            <h2 className="text-lg font-semibold text-circus-green">
              Paw-some Templates
            </h2>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-circus-green" />
          ) : (
            <ChevronDown className="w-5 h-5 text-circus-green" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-circus-blue/30 hover:border-circus-blue"
              >
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-circus-blue">
                    {template.title}
                  </h3>
                  <p className="text-sm mb-4 text-circus-blue/70">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-circus-purple font-medium">
                      {template.difficulty}
                    </span>
                    <Button
                      onClick={() => onSelectTemplate(template)}
                      className="bg-circus-yellow hover:bg-circus-yellow/90 text-black"
                      size="sm"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TemplateSelector;
