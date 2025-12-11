"use client";

import { SERVICES, CHURCH_INFO } from "@/lib/constants";
import { formatServiceSchedule } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  MapPinIcon,
  NavigationArrowIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChurchIcon,
} from "@phosphor-icons/react";

export default function ChurchLocationInfo() {
  const { CHURCH_LOCATION, CONTACT } = CHURCH_INFO;
  const { street, city, province } = CHURCH_LOCATION.address;
  const { phone, email, officeHours } = CONTACT;

  return (
    <Card className="shadow-lg lg:rounded-l-none">
      <CardHeader>
        <div className="flex items-start gap-3">
          <MapPinIcon weight="duotone" className="size-8 text-primary" />
          <div className="flex-1 space-y-3">
            <h3 className="font-semibold text-lg">Church Address</h3>
            <p className="text-muted-foreground">
              {`${street}, ${city}, ${province}, SL`}
            </p>
            <AnimatedButton
              text="Get Directions"
              href="/location"
              className="w-full"
              size="lg"
              icon={<NavigationArrowIcon weight="bold" className="rotate-90" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg mb-3">Services</h3>
        <div className="space-y-3">
          {SERVICES.filter(
            (service) => service.title !== "Spiritual Week of Emphasis"
          ).map((service) => {
            return (
              <div key={service.id} className="flex justify-between">
                <span className="text-muted-foreground">{service.title}</span>
                <span className="font-medium capitalize text-right">
                  {formatServiceSchedule(service)}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
        <div className="space-y-3">
          <div className="flex justify-between gap-1">
            <div className="flex-center gap-2">
              <PhoneIcon weight="duotone" className="size-5 text-primary" />
              <span className="text-sm text-muted-foreground">{phone}</span>
            </div>
            <div className="flex-center gap-2">
              <EnvelopeIcon weight="duotone" className="text-primary size-5" />
              <span className="text-sm text-muted-foreground">{email}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <ChurchIcon weight="duotone" className="text-primary size-5" />
            <span className="text-sm text-muted-foreground">
              Office Hours: {officeHours}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
