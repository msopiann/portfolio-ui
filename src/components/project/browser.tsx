"use client";

import React, { useState } from "react";
import { Tab } from "@/types/project";
import TabBar from "./tab-bar";
import AddressBar from "./address-bar";
import FakeGoogleHome from "./fake-google-home";
import FakeGoogleResults from "./fake-google-results";

export default function Browser() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "1",
      title: "Google",
      url: "https://www.google.com",
      favicon: "/icons/browser.webp",
      content: <FakeGoogleHome addTab={addTab} />,
    },
  ]);
  const [activeTab, setActiveTab] = useState("1");
  const [address, setAddress] = useState("https://www.google.com");

  function addTab(targetUrl: string, title?: string) {
    const id = Date.now().toString();
    const isSearch = /\/search\?q=/.test(targetUrl);
    const qMatch = targetUrl.match(/[?&]q=([^&]+)/);
    const query = qMatch ? decodeURIComponent(qMatch[1]) : "";

    const newTab: Tab = {
      id,
      title: title || (isSearch ? `Search: ${query}` : "Google"),
      url: targetUrl,
      favicon: "/icons/browser.webp",
      content: isSearch ? (
        <FakeGoogleResults query={query} />
      ) : (
        <FakeGoogleHome addTab={addTab} />
      ),
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTab(id);
    setAddress(targetUrl);
  }

  function closeTab(id: string) {
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (activeTab === id) {
      const remaining = tabs.filter((t) => t.id !== id);
      if (remaining.length > 0) {
        setActiveTab(remaining[0].id);
        setAddress(remaining[0].url);
      } else {
        const main = {
          id: "1",
          title: "Google",
          url: "https://www.google.com",
          favicon: "/icons/browser.webp",
          content: <FakeGoogleHome addTab={addTab} />,
        };
        setTabs([main]);
        setActiveTab("1");
        setAddress(main.url);
      }
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0]">
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setAddress={setAddress}
        addTab={addTab}
        closeTab={closeTab}
      />

      <AddressBar
        address={address}
        setAddress={setAddress}
        onEnter={(addr) => addTab(addr)}
      />

      <div className="flex-1 overflow-auto bg-white p-4 px-4 pt-20 pb-4 sm:p-4 sm:pt-4 sm:pb-4">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
