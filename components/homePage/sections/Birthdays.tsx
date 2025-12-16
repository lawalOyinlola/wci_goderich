"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import AvatarCropUploader from "@/components/AvatarCropUploader";
import CtaContainer from "@/components/CtaContainer";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { AnimatedButton } from "@/components/ui/animated-button";
import { MONTHS, PAST_CELEBRATIONS } from "@/lib/constants";

export default function MonthlyBirthdaysSection() {
  const [dateState, setDateState] = useState<{
    now: Date | null;
    currentMonth: string;
    currentMonthIndex: number;
  }>({
    now: null,
    currentMonth: "",
    currentMonthIndex: 1,
  });
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [uploaderResetToken, setUploaderResetToken] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrantName, setCelebrantName] = useState("");

  useEffect(() => {
    // Set date on mount to prevent hydration mismatch between server and client
    // This is necessary as date values differ between server and client renders
    const currentDate = new Date();
    const updateDateState = () => {
      setDateState({
        now: currentDate,
        currentMonth: MONTHS[currentDate.getMonth()],
        currentMonthIndex: currentDate.getMonth() + 1,
      });
    };
    updateDateState();
  }, []);

  const { now, currentMonth, currentMonthIndex } = dateState;

  type BirthdayFormValues = {
    name: string;
    day: number | null;
  };

  const schema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),
    day: yup
      .number()
      .nullable()
      .typeError("Enter a valid day")
      .required("Day is required")
      .min(1)
      .max(31),
  });

  const form = useForm<BirthdayFormValues>({
    // @ts-expect-error - yup version conflict with parent directory causing type mismatch
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      day: null,
    },
  });

  const selectedMonth = currentMonthIndex;
  const maxDays = useMemo(() => {
    if (!now) return 31; // Default fallback
    // Use the current year to reflect leap years correctly
    const referenceYear = now.getFullYear();
    return new Date(referenceYear, selectedMonth, 0).getDate();
  }, [selectedMonth, now]);

  const formatOrdinal = (n: number): string => {
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  const dayOptions = useMemo(
    () =>
      Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => ({
        value: String(d),
        label: formatOrdinal(d),
      })),
    [maxDays]
  );

  const triggerConfetti = useCallback(async () => {
    // Dynamic import to code-split the confetti library
    // @ts-expect-error - canvas-confetti types
    const confetti = (await import("canvas-confetti")).default;

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Burst from two sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  const handleFormSubmit = useCallback(
    (values: BirthdayFormValues) => {
      // Validate image upload
      if (!imageBlob) {
        setImageError("Please upload a clear photo.");
        return;
      }

      setImageError(null);

      // Prepare payload
      const payload = {
        name: values.name,
        month: currentMonthIndex,
        day: values.day,
        image: imageBlob,
      };

      // TODO: Replace with API call or email integration
      console.log("Birthday submission", payload);

      // Show celebration message
      setCelebrantName(values.name);
      setShowCelebration(true);

      triggerConfetti();

      // Reset form and close popover
      form.reset({ name: "", day: null });
      setImageBlob(null);
      setUploaderResetToken((t) => t + 1);

      // Close popover and hide celebration message after delay
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setShowCelebration(false);
          setCelebrantName("");
        }, 2000);
      }, 500);
    },
    [imageBlob, currentMonthIndex, form, triggerConfetti]
  );

  // Don't render until we have the date to prevent hydration mismatch
  if (!now || !currentMonth) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center text-sm text-muted-foreground uppercase tracking-[0.4em] mb-3 font-light gap-4">
              <Separator className="sm:w-40!" />
              <p>Birthdays</p>
              <Separator className="sm:w-40!" />
            </div>
            <h1 className="mb-8">Loading...</h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative">
      {/* Celebration Message */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="flex-center flex-col gap-2 bg-gradient-to-r from-accent via-primary to-accent text-white px-10 py-4 rounded-2xl shadow-2xl transform -rotate-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                🎉 Happy Birthday!
              </h2>
              <p className="text-xl md:text-2xl opacity-90">{celebrantName}</p>
              <em className="self-end">Details received</em>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center text-sm text-muted-foreground uppercase tracking-[0.4em] mb-3 font-light gap-4">
            <Separator className="sm:w-40!" />
            <p>Birthdays</p>
            <Separator className="sm:w-40!" />
          </div>

          <h1 className="mb-8">
            Celebrating Our{"  "}
            <Highlighter
              action="highlight"
              iterations={4}
              color="var(--accent)"
              isView
            >
              <span className="text-primary-foreground">{currentMonth}</span>
            </Highlighter>{" "}
            Birthdays
          </h1>

          <p className="text-muted-foreground">
            We celebrate all members born in {currentMonth}. God bless and keep
            you in this new year!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PAST_CELEBRATIONS.map((item, idx) => (
            <div
              key={idx}
              // className="relative aspect-square rounded-xl overflow-hidden shadow-sm"
              className="relative aspect-square overflow-hidden shadow-sm"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 p-2 text-xs text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="font-semibold leading-tight">{item.name}</div>
                <div className="opacity-80">{item.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <CtaContainer
          className="mt-12"
          containerClassName="p-6 md:p-8 via-primary"
          title={`Are you a ${currentMonth} celebrant?`}
          description="Please send your full name, exact day of birth, and a clear photo. We will celebrate you during our end-of-month thanksgiving."
        >
          <AnimatedButton
            size="lg"
            variant="outline"
            href="/contact"
            text="Contact Church Admin"
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <AnimatedButton
                size="lg"
                variant="secondary"
                className="bg-background!"
                text="Share your details"
              />
            </PopoverTrigger>
            <PopoverContent className="w-82">
              <h2 className="mb-3 text-sm font-normal">
                Details for{" "}
                <span className="font-semibold px-1">
                  <Highlighter
                    action="circle"
                    iterations={3}
                    isView
                    padding={6}
                  >
                    {currentMonth}
                  </Highlighter>
                </span>{" "}
                celebrants only!
              </h2>

              <form
                id="birthday-form"
                className="space-y-3"
                onSubmit={
                  // @ts-expect-error - form type inference issue due to yup version conflict
                  form.handleSubmit(handleFormSubmit)
                }
              >
                <FieldGroup>
                  <div className="flex gap-4 justify-between">
                    <div className="grow">
                      <InputField
                        name="name"
                        // @ts-expect-error - form control type inference issue
                        control={form.control}
                        label="Full name"
                        placeholder="Your full name"
                        id="birthday-form-name"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <SelectField
                        name="day"
                        // @ts-expect-error - form control type inference issue
                        control={form.control}
                        label="Select day"
                        placeholder="Day"
                        id="birthday-form-day"
                        options={dayOptions}
                        transformValue={(val) => (val ? Number(val) : null)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <div className="pt-2">
                      <AvatarCropUploader
                        onImageChange={setImageBlob}
                        resetToken={uploaderResetToken}
                      />
                      {imageError && (
                        <FieldError>
                          <div
                            role="alert"
                            className="text-destructive text-sm font-normal"
                          >
                            {imageError}
                          </div>
                        </FieldError>
                      )}
                    </div>
                  </div>
                </FieldGroup>

                <div className="flex justify-end pt-1">
                  <Button size="sm" type="submit">
                    Submit Details
                  </Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </CtaContainer>
      </div>
    </section>
  );
}
