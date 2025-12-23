"use client";

import { useEffect } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function TestimoniesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Testimonies page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md relative">
        <BorderBeam size={250} />
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl">Unable to Load Testimonies</CardTitle>
          <CardDescription className="mt-2">
            We couldn&apos;t load the testimonies. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-muted p-4 text-sm">
              <p className="font-semibold text-destructive mb-2">Error:</p>
              <p className="text-muted-foreground break-words">
                {error.message}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <AnimatedButton
            onClick={reset}
            text="Try Again"
            icon={<RefreshCw className="h-4 w-4" />}
            className="w-full sm:w-auto"
          />
          <AnimatedButton
            onClick={reset}
            variant="outline"
            href="/"
            text="Go Home"
            icon={<Home className="h-4 w-4" />}
            className="w-full sm:w-auto"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
