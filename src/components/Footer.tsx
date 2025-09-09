"use client";

import {
  EnvelopeIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, FormMessage } from "./ui/form";

const footerLinks = [
  {
    group: "About Us",
    items: [
      { title: "Our Story", href: "/about" },
      { title: "Mission & Vision", href: "/about" },
      { title: "Leadership", href: "/about" },
      { title: "Core Values", href: "/about" },
      { title: "Services", href: "/services" },
    ],
  },
  {
    group: "Ministries",
    items: [
      { title: "WOFBI", href: "/wofbi" },
      { title: "Homecell", href: "/homecell" },
      { title: "Businessmen Fellowship", href: "/services" },
      { title: "Women's Fellowship", href: "/services" },
      { title: "Youth Alive", href: "/service-units" },
      { title: "Teens Church", href: "/service-units" },
      { title: "Children's Ministry", href: "/service-units" },
      { title: "Education", href: "/education" },
    ],
  },
  {
    group: "Resources",
    items: [
      { title: "Media Library", href: "/media" },
      { title: "Book Library", href: "/library" },
      { title: "Photo Gallery", href: "/gallery" },
      { title: "Testimonies", href: "/testimonies" },
      { title: "Prayer Requests", href: "/prayer" },
    ],
  },
  {
    group: "Get Involved",
    items: [
      { title: "Join a Service Unit", href: "/service-units" },
      { title: "Give Online", href: "/giving" },
      { title: "Prayer Team", href: "/prayer" },
      { title: "Volunteer", href: "/service-units" },
      { title: "Contact Us", href: "/contact" },
      { title: "Church Location", href: "/location" },
    ],
  },
];

export default function Footer() {
  const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const newsletterSchema: yup.ObjectSchema<{ email: string }> = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .matches(EMAIL_REGEX, "Please enter a valid email address")
      .required("Email is required"),
  });

  const form = useForm<{ email: string }>({
    resolver: yupResolver(newsletterSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="container px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" aria-label="go home" className="block size-fit">
                <Image
                  src="/lfc_logo.png"
                  alt="Living Faith Church Logo"
                  width={40}
                  height={40}
                />
              </Link>
              <div>
                <h6 className="font-bold text-md font-lora leading-none">
                  WCI Goderich
                </h6>
                <p className="text-sm text-muted-foreground">
                  Living Faith Church
                </p>
              </div>
            </div>
            <p className="px-2 text-sm leading-relaxed">
              Spreading the Gospel and transforming lives in Sierra Leone and
              beyond. Join us in our mission to share God&apos;s love with
              everyone.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPinIcon size={18} color="var(--primary)" weight="duotone" />
                <span>Main Street, Goderich, Western Area</span>
              </div>

              <div className="flex items-center gap-2">
                <PhoneIcon size={18} color="var(--primary)" weight="duotone" />
                <span>+232 88 123 456</span>
              </div>

              <div className="flex items-center gap-2">
                <EnvelopeIcon
                  size={18}
                  color="var(--primary)"
                  weight="duotone"
                />
                <span>info@wcigoderich.org</span>
              </div>
            </div>
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit((values) => {
                  // TODO: hook up to your newsletter API
                  console.log("newsletter", values);
                  form.reset();
                })}
                className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1 mt-8 p-4 rounded-md max-w-md w-full"
              >
                <div className="space-y-4">
                  <Label htmlFor="mail" className="block font-medium">
                    Stay Connected
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      id="mail"
                      type="email"
                      placeholder="Your email"
                      className="h-9 text-sm"
                      aria-invalid={!!form.formState.errors.email}
                      {...form.register("email")}
                    />
                    <Button type="submit">Submit</Button>
                  </div>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {String(form.formState.errors.email.message)}
                    </FormMessage>
                  )}
                  <span className="text-muted-foreground block text-sm">
                    Get updates about services, events, and ministry
                    opportunities
                  </span>
                </div>
              </form>
            </Form>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
            {footerLinks.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href as Route}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            &copy; {new Date().getFullYear()} WCI Goderich. All rights reserved.
          </span>
          <div className="order-first flex flex-wrap justify-center gap-4 text-sm md:order-last">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X/Twitter"
              className="text-muted-foreground hover:text-primary block"
            >
              <XLogoIcon size={24} weight="duotone" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block"
            >
              <LinkedinLogoIcon size={24} weight="duotone" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary block"
            >
              <FacebookLogoIcon size={24} weight="duotone" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="text-muted-foreground hover:text-primary block"
            >
              <TiktokLogoIcon size={24} weight="duotone" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block"
            >
              <YoutubeLogoIcon size={24} weight="duotone" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
