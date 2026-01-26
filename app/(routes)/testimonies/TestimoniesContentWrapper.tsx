import TestimoniesContent from "./TestimoniesContent";

interface TestimoniesContentWrapperProps {
  initialType?: string;
  initialPage?: number;
}

// Server component wrapper that passes initial props
export default function TestimoniesContentWrapper({
  initialType,
  initialPage = 1,
}: TestimoniesContentWrapperProps) {
  return (
    <TestimoniesContent initialType={initialType} initialPage={initialPage} />
  );
}
