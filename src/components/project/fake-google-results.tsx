import React from "react";
import { PROJECTS } from "@/lib/data";

export default function FakeGoogleResults({ query }: { query: string }) {
  const results = PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <p className="mb-4 text-sm text-gray-600">
        Showing results for <b>{query}</b>
      </p>
      {(results.length ? results : PROJECTS).map((r) => (
        <div key={r.url} className="mb-4">
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="text-lg text-blue-700 underline"
          >
            {r.title}
          </a>
          <div className="text-sm text-green-700">{r.url}</div>
          <p className="text-sm">{r.snippet}</p>
        </div>
      ))}
    </div>
  );
}
