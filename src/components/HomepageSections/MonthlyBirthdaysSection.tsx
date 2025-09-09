"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/magicui/highlighter";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Form, FormMessage } from "@/components/ui/form";
import AvatarCropUploader from "@/components/AvatarCropUploader";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthlyBirthdaysSection() {
  const now = useMemo(() => new Date(), []);
  const currentMonth = MONTHS[now.getMonth()];
  const currentMonthIndex = now.getMonth() + 1;
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [uploaderResetToken, setUploaderResetToken] = useState(0);

  type BirthdayFormValues = {
    name: string;
    day: number | null;
  };

  const schema: yup.ObjectSchema<{ name: string; day: number | null }> =
    yup.object({
      name: yup
        .string()
        .required("Name is required")
        .min(4, "At least 4 characters")
        .max(50, "Max 50 characters"),
      day: yup
        .number()
        .nullable()
        .typeError("Enter a valid day")
        .required("Day is required")
        .min(1)
        .max(31),
    });

  const form = useForm<BirthdayFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      day: null,
    },
  });

  const selectedMonth = currentMonthIndex;
  const maxDays = useMemo(() => {
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

  const pastCelebrations = [
    {
      src: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&h=800&fit=crop",
      alt: "Joyful birthday celebration",
      name: "Mary Johnson",
      date: "2024-08-12",
    },
    {
      src: "https://images.unsplash.com/photo-1603575449299-b5d26f4ec5f1?w=800&h=800&fit=crop",
      alt: "Birthday cake and candles",
      name: "Samuel Ade",
      date: "2024-07-03",
    },
    {
      src: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&h=800&fit=crop",
      alt: "Church thanksgiving celebration",
      name: "Grace K.",
      date: "2024-06-25",
    },
    {
      src: "https://images.unsplash.com/photo-1546484959-f9a53db89c39?w=800&h=800&fit=crop",
      alt: "Group birthday thanksgiving",
      name: "Daniel Mensah",
      date: "2024-05-18",
    },
    {
      src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=800&fit=crop",
      alt: "Smiling celebrants",
      name: "Esther B.",
      date: "2024-04-09",
    },
    {
      src: "https://images.unsplash.com/photo-1520975922284-7b1a7a4f42e2?w=800&h=800&fit=crop",
      alt: "Community celebration",
      name: "Michael T.",
      date: "2024-03-30",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center text-sm text-muted-foreground uppercase tracking-[0.4em] mb-3 font-light gap-4">
            <Separator className="sm:w-40!" />
            <p>Birthdays</p>
            <Separator className="sm:w-40!" />
          </div>

          <h1 className="mb-8">
            Celebrating Our{"  "}
            <Highlighter action="highlight" iterations={4} isView>
              <span className="text-[#1e293b]">{currentMonth}</span>
            </Highlighter>{" "}
            Birthdays
          </h1>

          <p className="text-muted-foreground">
            We celebrate all members born in {currentMonth}. God bless and keep
            you in this new year!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pastCelebrations.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-xl overflow-hidden shadow-sm"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
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
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto rounded-2xl p-6 md:p-8 text-primary-foreground bg-gradient-to-br from-accent via-[#f97316] to-[#f59e0b]">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              Are you a {currentMonth} celebrant?
            </h3>
            <p className="mb-6 opacity-90">
              Please send your full name, exact day of birth, and a clear photo.
              We will celebrate you during our end-of-month thanksgiving.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="hover:border-accent"
                asChild
              >
                <Link href="/contact">Contact Church Admin</Link>
              </Button>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-background!"
                  >
                    Share your details
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-82">
                  <h2 className="mb-3 text-sm font-lora font-semibold">
                    Details for{" "}
                    <Highlighter action="underline" iterations={3} isView>
                      {currentMonth}
                    </Highlighter>{" "}
                    celebrants only!
                  </h2>

                  <Form {...form}>
                    <form
                      className="space-y-3"
                      onSubmit={form.handleSubmit((values) => {
                        if (!imageBlob) {
                          setImageError("Please upload a clear photo.");
                          return;
                        }
                        setImageError(null);
                        const payload = {
                          name: values.name,
                          month: currentMonthIndex,
                          day: values.day,
                          image: imageBlob,
                        };
                        // Replace with API call or email integration as needed
                        console.log("Birthday submission", payload);
                        // Reset all fields and uploader
                        form.reset({ name: "", day: null });
                        setImageBlob(null);
                        setUploaderResetToken((t) => t + 1);
                        setOpen(false);
                      })}
                    >
                      <div className="flex gap-4 justify-between">
                        <div className="grow">
                          <Label htmlFor="name">Full name</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            aria-invalid={!!form.formState.errors.name}
                            {...form.register("name")}
                          />
                          {form.formState.errors.name && (
                            <FormMessage>
                              {String(form.formState.errors.name.message)}
                            </FormMessage>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="day">Select day</Label>
                          <Controller
                            control={form.control}
                            name="day"
                            render={({ field }) => (
                              <Select
                                value={field.value ? String(field.value) : ""}
                                onValueChange={(val) =>
                                  field.onChange(val ? Number(val) : null)
                                }
                              >
                                <SelectTrigger
                                  id="day"
                                  className="h-10 bg-background"
                                >
                                  <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from(
                                    { length: maxDays },
                                    (_, i) => i + 1
                                  ).map((d) => (
                                    <SelectItem
                                      key={d}
                                      value={String(d)}
                                      className="w-30"
                                    >
                                      {formatOrdinal(d)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {form.formState.errors.day && (
                            <FormMessage>
                              {String(form.formState.errors.day.message)}
                            </FormMessage>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 justify-center">
                        <div className="pt-2">
                          <AvatarCropUploader
                            onImageChange={setImageBlob}
                            resetToken={uploaderResetToken}
                          />
                          {imageError && (
                            <FormMessage>{imageError}</FormMessage>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <Button size="sm" type="submit">
                          Submit Details
                        </Button>
                      </div>
                    </form>
                  </Form>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
