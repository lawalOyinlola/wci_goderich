"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

export interface PlaylistItem {
  src: string;
  /** Progressive fallback used when the browser cannot play an HLS source. */
  fallbackSrc?: string;
  /** Poster frame shown before playback starts. */
  poster?: string;
  title?: string;
  /** Portrait clips get a 9:16 frame instead of the default 16:9. */
  orientation?: "landscape" | "portrait";
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  videoTitle?: string;
  animationStyle?: AnimationStyle;
  /** Progressive fallback used when the browser cannot play an HLS source. */
  fallbackSrc?: string;
  /** Poster frame shown before playback starts. */
  poster?: string;
  /**
   * Optional queue. When more than one item is present the modal shows next and
   * previous controls and advances on its own when a clip ends.
   */
  playlist?: PlaylistItem[];
  /** Index within `playlist` to open on. */
  startIndex?: number;
}

/** Embeds (YouTube, Vimeo) need an iframe; a media file needs a video element. */
const isMediaFile = (src: string) => /\.(m3u8|mp4|webm|mov)(\?|$)/i.test(src);

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

/**
 * Plays a media file, using adaptive bitrate streaming when the source is an
 * HLS manifest. Safari plays `.m3u8` natively; every other browser gets hls.js,
 * which is imported only once a stream is actually opened so the library stays
 * out of the initial bundle. If HLS cannot be used at all we fall back to the
 * progressive file.
 */
function VideoPlayer({
  src,
  fallbackSrc,
  poster,
  title,
  onEnded,
}: {
  src: string;
  fallbackSrc?: string;
  poster?: string;
  title: string;
  onEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!/\.m3u8(\?|$)/i.test(src)) {
      video.src = src;
      return;
    }

    let destroyed = false;
    let instance: { destroy: () => void } | null = null;

    import("hls.js").then(({ default: Hls }) => {
      if (destroyed) return;

      // hls.js is preferred wherever Media Source Extensions exist. Native
      // playback is only trusted as the fallback, because Chromium answers
      // "maybe" to canPlayType for HLS while being unable to play it.
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true });
        instance = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_event, data) => {
          // Only a fatal error is worth abandoning the stream for; hls.js
          // recovers from the rest on its own.
          if (data.fatal && fallbackSrc) {
            hls.destroy();
            instance = null;
            video.src = fallbackSrc;
          }
        });
        return;
      }

      // Safari and iOS play the manifest directly.
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else if (fallbackSrc) {
        video.src = fallbackSrc;
      }
    });

    return () => {
      destroyed = true;
      instance?.destroy();
    };
  }, [src, fallbackSrc]);

  return (
    <video
      ref={videoRef}
      title={title}
      poster={poster}
      onEnded={onEnded}
      controls
      autoPlay
      playsInline
      preload="metadata"
      className="size-full rounded-2xl bg-black object-contain"
    />
  );
}

export function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  videoTitle = "Video player",
  animationStyle = "from-center",
  fallbackSrc,
  poster,
  playlist,
  startIndex = 0,
}: VideoModalProps) {
  const selectedAnimation = animationVariants[animationStyle];

  // A single video is just a one-item queue, which keeps the render path below
  // identical whether or not a playlist was passed.
  const queue: PlaylistItem[] =
    playlist && playlist.length > 0
      ? playlist
      : [{ src: videoSrc, fallbackSrc, poster, title: videoTitle }];

  const [index, setIndex] = useState(startIndex);
  const hasQueue = queue.length > 1;
  const safeIndex = Math.min(Math.max(index, 0), queue.length - 1);
  const current = queue[safeIndex];

  // Reopening should start from whatever item the caller asked for, including
  // when it reopens on the same index after the viewer navigated elsewhere.
  // Adjusting state during render is React's documented way to derive state
  // from props, and avoids the extra paint an effect would cause.
  const session = `${isOpen}:${startIndex}`;
  const [lastSession, setLastSession] = useState(session);
  if (lastSession !== session) {
    setLastSession(session);
    if (isOpen) setIndex(startIndex);
  }

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + queue.length) % queue.length);
    },
    [queue.length]
  );

  // Escape closes; arrows move through the queue.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (!hasQueue) return;
      // A focused <video controls> seeks with the arrow keys. Skipping to
      // another clip when the viewer meant to scrub would be the wrong call,
      // so leave arrows to the player and only navigate from elsewhere.
      if (e.target instanceof HTMLMediaElement) return;
      if (e.key === "ArrowRight") goTo(safeIndex + 1);
      if (e.key === "ArrowLeft") goTo(safeIndex - 1);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, hasQueue, goTo, safeIndex]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // The backdrop is a click target, not a control: giving it a button
          // role made it absorb the accessible names of the close and
          // next/previous buttons nested inside it. Escape still closes, and
          // the close button remains the keyboard-reachable action.
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <motion.div
            {...selectedAnimation}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "relative mx-4 md:mx-0",
              current.orientation === "portrait"
                ? "aspect-9/16 h-[78vh] w-auto max-w-[92vw]"
                : "aspect-video w-full max-w-4xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black hover:bg-neutral-800/50 dark:hover:bg-neutral-200/50 transition-colors"
              aria-label="Close video"
            >
              <XIcon weight="bold" size={20} />
            </motion.button>

            {hasQueue && (
              <div className="absolute -top-16 left-0 right-14 flex items-center gap-3 text-white">
                <span className="font-mono text-xs tabular-nums text-white/60">
                  {safeIndex + 1} / {queue.length}
                </span>
                <p className="truncate text-sm font-medium">{current.title}</p>
              </div>
            )}

            <div className="relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white">
              {isMediaFile(current.src) ? (
                <VideoPlayer
                  // Remounting on source change resets the player cleanly
                  // instead of leaving the previous stream attached.
                  key={current.src}
                  src={current.src}
                  fallbackSrc={current.fallbackSrc}
                  poster={current.poster}
                  title={current.title ?? videoTitle}
                  onEnded={
                    hasQueue && safeIndex < queue.length - 1
                      ? () => goTo(safeIndex + 1)
                      : undefined
                  }
                />
              ) : (
                <iframe
                  src={current.src}
                  title={current.title ?? videoTitle}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              )}
            </div>

            {hasQueue && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(safeIndex - 1);
                  }}
                  aria-label="Previous video"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/60 p-2 text-white backdrop-blur-md transition-colors hover:bg-neutral-900/90 md:-left-14"
                >
                  <CaretLeftIcon weight="bold" size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(safeIndex + 1);
                  }}
                  aria-label="Next video"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/60 p-2 text-white backdrop-blur-md transition-colors hover:bg-neutral-900/90 md:-right-14"
                >
                  <CaretRightIcon weight="bold" size={22} />
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Component is "use client" so document is available in browser
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(modalContent, document.body);
}
