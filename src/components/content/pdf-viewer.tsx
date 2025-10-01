"use client";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { DOCUMENTS } from "@/lib/data";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);

  const resumeDoc = DOCUMENTS.find((doc) => doc.label === "Resume");

  if (!resumeDoc) {
    return (
      <div className="p-4 text-red-600">⚠ Resume document not found.</div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeDoc.file;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-full w-full flex-col bg-white font-sans text-sm">
      <div className="flex items-center gap-2 border-b border-gray-400 bg-[#ece9d8] px-2 py-1 text-xs">
        <button onClick={() => setScale(scale + 0.2)}>🔍 +</button>
        <button onClick={() => setScale(scale > 0.4 ? scale - 0.2 : scale)}>
          🔍 -
        </button>

        {numPages && numPages > 1 && (
          <>
            {pageNumber > 1 && (
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                className="border border-gray-400 bg-[#f0f0f0] px-2 py-0.5 hover:bg-[#dcdcdc]"
              >
                ◀ Prev
              </button>
            )}
            {pageNumber < numPages && (
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                className="border border-gray-400 bg-[#f0f0f0] px-2 py-0.5 hover:bg-[#dcdcdc]"
              >
                Next ▶
              </button>
            )}
          </>
        )}

        <span className="ml-2">
          Page {pageNumber} of {numPages || "--"}
        </span>

        <button
          onClick={handleDownload}
          className="ml-auto border border-gray-400 bg-[#f0f0f0] px-2 py-0.5 hover:bg-[#dcdcdc]"
        >
          📥 Download PDF
        </button>
      </div>

      <div className="flex flex-1 items-start justify-center overflow-auto bg-gray-100">
        <Document
          file={resumeDoc.file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className="p-4">Loading PDF...</p>}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
}
