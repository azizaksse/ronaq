"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/products";

export const FAQ = () => (
  <section className="space-y-6">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-mint">الأسئلة</p>
      <h2 className="text-3xl font-bold text-white">أجوبة سريعة وواضحة</h2>
    </div>
    <Accordion
      type="single"
      collapsible
      className="space-y-4"
      defaultValue={faqs[0].question}
    >
      {faqs.map((faq) => (
        <AccordionItem value={faq.question} key={faq.question}>
          <AccordionTrigger className="group">
            <span className="text-right">{faq.question}</span>
          </AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);
