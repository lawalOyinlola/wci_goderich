import { IconComponent } from "@/components/IconComponent";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VideoDialog } from "@/components/ui/video-dialog";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Testimony } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TestimonyCardProps {
  testimony: Testimony;
  className?: string;
}

function getAvatarInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

// Text Testimony Content Component
function TextTestimonyContent({
  testimony,
}: {
  testimony: Extract<Testimony, { type: "written" }>;
}) {
  return (
    <blockquote className="text-sm leading-relaxed line-clamp-20">
      &quot;{testimony.testimony}&quot;
    </blockquote>
  );
}

// Video Testimony Content Component
function VideoTestimonyContent({
  testimony,
}: {
  testimony: Extract<Testimony, { type: "video" }>;
}) {
  // Convert YouTube URL to embed URL if needed
  const getEmbedUrl = (url: string): string => {
    // If it's already an embed URL, return as is
    if (url.includes("youtube.com/embed")) {
      return url;
    }
    // Extract video ID from YouTube URL (handles both youtube.com/watch?v= and youtu.be/ formats)
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(testimony.videoUrl);

  return (
    <>
      <blockquote className="text-sm leading-relaxed line-clamp-3">
        &quot;{testimony.testimony}&quot;
      </blockquote>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <VideoDialog
          videoSrc={embedUrl}
          thumbnailSrc={testimony.image}
          thumbnailAlt={`${testimony.name} - Video Testimony`}
          videoTitle={`${testimony.name} - Testimony`}
          className="h-full"
          imgClassName="object-cover h-full"
        />
      </div>
    </>
  );
}

// Audio Testimony Content Component
function AudioTestimonyContent({
  testimony,
}: {
  testimony: Extract<Testimony, { type: "audio" }>;
}) {
  return (
    <>
      <blockquote className="text-sm leading-relaxed line-clamp-3">
        &quot;{testimony.testimony}&quot;
      </blockquote>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Avatar className="size-24">
              <AvatarImage src={testimony.image} />
              <AvatarFallback>
                {getAvatarInitials(testimony.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <Button asChild size="lg" className="gap-2">
            <a
              href={testimony.audioUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconComponent
                iconName="PlayCircleIcon"
                size={20}
                className="text-current"
              />
              Listen to Audio
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}

export default function TestimonyCard({
  testimony,
  className,
}: TestimonyCardProps) {
  const renderContent = () => {
    switch (testimony.type) {
      case "written":
        return <TextTestimonyContent testimony={testimony} />;
      case "video":
        return <VideoTestimonyContent testimony={testimony} />;
      case "audio":
        return <AudioTestimonyContent testimony={testimony} />;
    }
  };

  return (
    <Card
      className={cn(
        "group relative flex flex-col h-full transition-all duration-300 hover:shadow-md overflow-hidden gap-4 *:px-4 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 shadow-sm hover:shadow-primary/20",
        className
      )}
    >
      <BorderBeam
        size={200}
        colorFrom="var(--accent)"
        className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
      />
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Avatar className="size-10">
              <AvatarImage src={testimony.image} />
              <AvatarFallback>
                {getAvatarInitials(testimony.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight">
              {testimony.name}
            </CardTitle>
            <CardDescription>{testimony.role}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={cn(
          "flex-1",
          testimony.type !== "written" && "flex flex-col gap-4"
        )}
      >
        {renderContent()}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t [.border-t]:pt-4">
        <div className="flex items-center gap-2">
          <IconComponent
            iconName={
              testimony.type === "written"
                ? "FileTextIcon"
                : testimony.type === "video"
                ? "VideoCameraIcon"
                : "MusicNotesIcon"
            }
            size={16}
            className="text-current"
          />
          <span className="capitalize">{testimony.type} Testimony</span>
        </div>
        <time dateTime={testimony.date}>
          {new Date(testimony.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </CardFooter>
    </Card>
  );
}
