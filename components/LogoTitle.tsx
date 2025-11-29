import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoProps = {
  size?: number;
  className?: string;
  linkToHome?: boolean;
  alt?: string;
};

export function Logo({
  size = 40,
  className,
  linkToHome = false,
  alt = "Living Faith Church Logo",
}: LogoProps) {
  const logoImage = (
    <div
      className={cn("relative", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src="/lfc_logo.png"
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" aria-label="go home" className="size-fit">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}

export type LogoTitleProps = {
  logoSize?: number;
  className?: string;
  logoClassName?: string;
  textClassName?: string;
  linkToHome?: boolean;
  alt?: string;
  title?: string;
  subtitle?: string;
};

export function LogoTitle({
  logoSize = 40,
  className,
  logoClassName,
  textClassName,
  linkToHome = false,
  title = "WCI Goderich",
  subtitle = "Living Faith Church",
  alt = "Living Faith Church Logo",
}: LogoTitleProps) {
  const content = (
    <div
      className={cn("size-fit flex items-center gap-2", className)}
      aria-label={linkToHome ? "go home" : undefined}
    >
      <Logo size={logoSize} className={logoClassName} alt={alt} />
      <div className={textClassName}>
        <h6 className="font-bold text-sm font-lora leading-none">{title}</h6>
        <p className="text-xs font-open-sans text-muted-foreground font-normal">
          {subtitle}
        </p>
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" aria-label="go home">
        {content}
      </Link>
    );
  }

  return content;
}

// Default export for backwards compatibility
export default LogoTitle;
