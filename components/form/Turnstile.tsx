"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Cloudflare Turnstile bot check, loaded straight from Cloudflare without an
 * npm wrapper. Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset,
 * so local development works without keys (the API only demands a token when
 * TURNSTILE_SECRET_KEY is set).
 *
 * Tokens are single-use and expire after five minutes: call `reset()` after
 * every submission attempt so the next one gets a fresh token.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      theme?: "auto" | "light" | "dark";
      size?: "normal" | "flexible" | "compact";
    }
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () =>
      window.turnstile
        ? resolve(window.turnstile)
        : reject(new Error("Turnstile failed to initialise"));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export const isTurnstileEnabled = Boolean(SITE_KEY);

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileProps {
  /** Receives a fresh token, or null when it expires or the check fails. */
  onToken: (token: string | null) => void;
  className?: string;
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  function Turnstile({ onToken, className }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onTokenRef = useRef(onToken);

    useEffect(() => {
      onTokenRef.current = onToken;
    }, [onToken]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        onTokenRef.current(null);
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (!SITE_KEY || !containerRef.current) return;
      let cancelled = false;
      const container = containerRef.current;

      loadTurnstile()
        .then((turnstile) => {
          if (cancelled) return;
          widgetIdRef.current = turnstile.render(container, {
            sitekey: SITE_KEY,
            theme: "auto",
            size: "flexible",
            callback: (token) => onTokenRef.current(token),
            "expired-callback": () => onTokenRef.current(null),
            "error-callback": () => onTokenRef.current(null),
          });
        })
        .catch(() => onTokenRef.current(null));

      return () => {
        cancelled = true;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
        }
        widgetIdRef.current = null;
      };
    }, []);

    if (!SITE_KEY) return null;
    return <div ref={containerRef} className={cn("min-h-[65px]", className)} />;
  }
);

export default Turnstile;
