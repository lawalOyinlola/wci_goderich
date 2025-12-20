"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { FAQS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";

export default function Faqs() {
  const { title, subtitle, description, questions } = FAQS;

  return (
    <section>
      <div className="small-container max-w-5xl">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <SectionHeader
              title={title}
              description={description}
              className="text-left"
            />
          </div>
          <div className="md:col-span-3">
            <Accordion
              type="single"
              defaultValue={String(questions[0].id)}
              collapsible
              className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
            >
              {questions.map((question) => (
                <div className="group" key={question.id}>
                  <AccordionItem
                    value={String(question.id)}
                    className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                  >
                    <AccordionTrigger className="cursor-pointer text-lg font-semibold tracking-wide hover:no-underline">
                      {question.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-base">{question.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                </div>
              ))}
            </Accordion>

            <p className="text-muted-foreground mt-6 px-8">
              Can't find what you're looking for? Contact our{" "}
              <Link
                href="#"
                className="text-primary font-medium hover:underline"
              >
                support team
              </Link>{" "}
              below
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
