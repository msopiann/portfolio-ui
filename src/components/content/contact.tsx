import React from "react";
import { CONTACTS } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="space-y-3 p-3">
      <h2 className="text-lg font-bold text-[#000080]">Get in Touch</h2>
      <div className="grid grid-cols-1 gap-4">
        {CONTACTS.map((contact) => {
          const IconComp = getIcon(contact.icon);
          return (
            <ContactItem
              key={contact.label}
              icon={<IconComp size={14} color="#000000" />}
              label={contact.label}
              value={contact.value}
              link={contact.link}
            />
          );
        })}
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer"
      className="win98-border-out hover:win98-border-in flex items-center gap-2 bg-[#c0c0c0] p-2"
    >
      <div className="win98-border-in flex h-5 w-5 items-center justify-center bg-white">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold">{label}</span>
        <span className="text-sm text-blue-800 underline">{value}</span>
      </div>
    </Link>
  );
}
