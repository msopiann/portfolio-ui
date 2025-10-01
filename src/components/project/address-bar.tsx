import React from "react";

type Props = {
  address: string;
  setAddress: (addr: string) => void;
  onEnter: (addr: string) => void;
};

export default function AddressBar({ address, setAddress, onEnter }: Props) {
  return (
    <div className="flex items-center border-b border-gray-500 bg-[#ece9d8] px-2 py-1">
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter(address);
        }}
        className="w-full border border-gray-500 px-2 py-1 text-sm"
        style={{
          boxShadow: "inset 1px 1px #fff, inset -1px -1px #808080",
        }}
      />
    </div>
  );
}
