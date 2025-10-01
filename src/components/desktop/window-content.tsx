import dynamic from "next/dynamic";

import MusicPlayer from "../content/music-player";
import AboutMe from "../content/about-me";
import Contact from "../content/contact";
import Project from "../content/project";
import RecycleBin from "../content/recycle-bin";
import GalleryViewer from "../content/gallery-viewer";

const PdfViewer = dynamic(() => import("../content/pdf-viewer"), {
  ssr: false,
});

export function WindowContent({
  appType,
}: {
  appType: string;
  payload?: Record<string, unknown>;
}) {
  switch (appType) {
    case "recycle-bin":
      return <RecycleBin />;
    case "pdf-viewer":
      return <PdfViewer />;
    case "gallery-viewer":
      return <GalleryViewer />;
    case "about":
      return <AboutMe />;
    case "projects":
      return <Project />;
    case "contact":
      return <Contact />;
    case "music":
      return <MusicPlayer />;

    default:
      return <div className="text-sm">Window content</div>;
  }
}
