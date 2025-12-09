"use client";

import { SERVICES, CHURCH_LOCATION } from "@/lib/constants";
import { formatServiceSchedule } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { MapPinIcon, NavigationArrowIcon } from "@phosphor-icons/react";

export default function ChurchLocationInfo() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-start gap-4">
          <MapPinIcon weight="duotone" className="size-8 text-primary" />
          <div className="flex-1 space-y-3">
            <h3 className="font-semibold text-lg">Church Address</h3>
            <p className="text-muted-foreground">{CHURCH_LOCATION.address}</p>
            <AnimatedButton
              text="Get Directions"
              href="/location"
              className="w-full"
              icon={
                <NavigationArrowIcon
                  weight="bold"
                  size={16}
                  className="rotate-90 ml-2"
                />
              }
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
          <div className="flex items-center gap-3">
            <MapPinIcon weight="duotone" className="size-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {CHURCH_LOCATION.city}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <NavigationArrowIcon
              weight="duotone"
              className="text-primary size-5 rotate-90"
            />
            <span className="text-sm text-muted-foreground">
              {CHURCH_LOCATION.accessibility}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
