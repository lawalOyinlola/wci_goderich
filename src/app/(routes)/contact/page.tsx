"use client";

import { useForm } from "react-hook-form";
// import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Schema removed - not used in this component

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const form = useForm<ContactForm>({});
  // const form = useForm<ContactForm>({ resolver: yupResolver(schema) });

  // const onSubmit = (data: ContactForm) => {
  //   console.log("Contact submit", data);
  // };

  return (
    <section className="py-16">
      <div className="container px-4 max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}

        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="John Doe"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="john@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={5}
              {...form.register("message")}
            />
          </div>
          <Button type="submit" variant="outline" size="lg">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
