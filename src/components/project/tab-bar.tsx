import React from "react";
import Image from "next/image";
import { Tab } from "@/types/project";

type Props = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  setAddress: (addr: string) => void;
  addTab: (url: string, title?: string) => void;
  closeTab: (id: string) => void;
};

export default function TabBar({
  tabs,
  activeTab,
  setActiveTab,
  setAddress,
  addTab,
  closeTab,
}: Props) {
  return (
    <div className="flex items-center border-b border-gray-500 bg-[#ece9d8]">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex cursor-pointer items-center border-r border-gray-400 px-3 py-1 text-sm ${
            activeTab === tab.id
              ? "bg-white font-bold"
              : "bg-[#dcdcdc] text-gray-700"
          }`}
          style={{
            boxShadow:
              activeTab === tab.id
                ? "inset 1px 1px #fff, inset -1px -1px #808080"
                : "1px 1px #fff inset, -1px -1px #ccc inset",
          }}
          onClick={() => {
            setActiveTab(tab.id);
            setAddress(tab.url);
          }}
        >
          {tab.favicon && (
            <Image
              src={tab.favicon}
              alt="favicon"
              width={16}
              height={16}
              className="mr-2 h-4 w-4"
            />
          )}
          <span className="max-w-[140px] truncate">{tab.title}</span>
          {tab.id !== "1" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="ml-2 border bg-[#f2f2f2] px-1 text-xs"
              style={{
                boxShadow: "inset 1px 1px #fff, inset -1px -1px #808080",
              }}
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addTab("https://www.google.com", "Google")}
        className="ml-1 border bg-[#f2f2f2] px-2 py-1 text-sm"
        style={{
          boxShadow: "inset 1px 1px #fff, inset -1px -1px #808080",
        }}
      >
        ＋
      </button>
    </div>
  );
}
