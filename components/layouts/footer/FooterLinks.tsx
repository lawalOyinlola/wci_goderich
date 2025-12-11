import { FOOTER_LINKS } from "./footerItems";
import CaretButton from "@/components/ui/caret-button";

export function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
      {FOOTER_LINKS.map((link, index) => (
        <div key={index} className="space-y-3 text-sm">
          <span className="block font-medium">{link.group}</span>
          {link.items.map((item, itemIndex) => (
            <CaretButton
              href={item.href}
              key={itemIndex}
              text={item.title}
              className="text-muted-foreground"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
