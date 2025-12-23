import { Home, Search } from "lucide-react";
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

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
      <Card className="w-full max-w-md text-center relative">
        <BorderBeam size={250} />
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Page Not Found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Please check the URL or return to the home page.
          </p>
        </CardContent>
        <CardFooter className="max-sm:flex-col gap-3 justify-center">
          <AnimatedButton
            href="/"
            text="Go Home"
            icon={<Home className="h-4 w-4" />}
          />
          <AnimatedButton
            variant="outline"
            href="/contact-us"
            text="Contact Us"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
