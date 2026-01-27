"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconComponent, ValidIconName } from "@/components/IconComponent";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { WordRotate } from "@/components/ui/word-rotate";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

export default function GivingDetails() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const GIVE_NOW = [
    "Tithe",
    "Offering",
    "Transportation",
    "Building Project",
    "Thanksgiving Offering",
    "Church Beautification",
    "Church Welfare",
    "Seed Offering",
    "Food Distribution",
    "Clothing Distribution",
    "Emergency Relief",
    "Special Donation",
  ];

  const accountDetails = {
    bankName: "GTB",
    accountName: "World Mission Agency Goderich",
    accountNumber: "2013108629110",
  };

  const copyToClipboard = async (text: string, field: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const copyAllDetails = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const allDetails = `Bank Name: ${accountDetails.bankName}\nAccount Name: ${accountDetails.accountName}\nAccount Number: ${accountDetails.accountNumber}`;
    await copyToClipboard(allDetails, "allDetails", "All Details");
    setCopiedField("allDetails");
  };

  const detailItems: Array<{
    icon: ValidIconName;
    label: string;
    value: string;
    field: string;
  }> = [
    {
      icon: "BuildingIcon",
      label: "Bank Name",
      value: accountDetails.bankName,
      field: "bank",
    },
    {
      icon: "UserIcon",
      label: "Account Name",
      value: accountDetails.accountName,
      field: "accountName",
    },
    {
      icon: "CreditCardIcon",
      label: "Account Number",
      value: accountDetails.accountNumber,
      field: "accountNumber",
    },
  ];

  return (
    <section id="account-details" className="bg-muted/30">
      <div className="small-container max-w-4xl">
        <SectionHeader
          title={<WordRotate
            words={GIVE_NOW}
            className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6 bg-linear-to-br from-[#f59e0b] via-primary to-accent bg-clip-text text-transparent"
            duration={2500}
            pauseDuration={500}
          />}
          subtitle="Give Now"
          description="Use the account details below to make your transfer. Click on any detail to copy it to your clipboard."
        />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Bank Account Details</CardTitle>
            <CardDescription>
              Transfer funds directly to our church account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {detailItems.map((item) => (
              <div
                key={item.field}
                className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => copyToClipboard(item.value, item.field, item.label)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <IconComponent
                      iconName={item.icon}
                      size={20}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                </div>
                <button
                  className={cn(
                    "p-1 rounded-lg transition-all",
                    copiedField === item.field
                      ? "bg-green-500/10 text-green-600"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(item.value, item.field, item.label);
                  }}
                >
                  {copiedField === item.field ? <CheckIcon weight="bold" /> : <CopyIcon weight="bold" />}
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center">
          <AnimatedButton
            text={`${copiedField === "allDetails" ? "Details Copied" : "Copy All Details"}`}
            size="lg"
            icon={
              copiedField === "allDetails" ? <CheckIcon weight="bold" /> : <CopyIcon weight="bold" />
            }
            onClick={copyAllDetails}
            className="mb-4"
          />
        </div>
      </div>
    </section>
  );
}
