import type { IconConfig } from "@/types/window";
import { ProjectType } from "@/types/project";
import { ContactItemType } from "@/types/contact";
import { GalleryItem } from "@/types/gallery";
import { TrackItem } from "@/types/track";
import { AboutMeData } from "@/types/about";
import { DocumentItem } from "@/types/resume";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const cloudinaryImageUrl =
  process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL || "http://localhost:3000";
const cloudinaryVideoUrl =
  process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_URL || "http://localhost:3000";

//  Desktop Icons
export const DESKTOP_ICONS: IconConfig[] = [
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    appType: "recycle-bin",
    icon: "/icons/trash.webp",
    x: 10,
    y: 10,
  },
  {
    id: "pdf-viewer",
    label: "Resume.pdf",
    appType: "pdf-viewer",
    icon: "/icons/document.webp",
    x: 10,
    y: 110,
  },
  {
    id: "gallery-viewer",
    label: "Gallery",
    appType: "gallery-viewer",
    icon: "/icons/pictures.webp",
    x: 10,
    y: 210,
  },
  {
    id: "about",
    label: "About Me",
    appType: "about",
    icon: "/icons/profile.gif",
    x: 10,
    y: 310,
  },
  {
    id: "projects",
    label: "Projects",
    appType: "projects",
    icon: "/icons/explorer.svg",
    x: 10,
    y: 410,
  },
  {
    id: "contact",
    label: "Contact",
    appType: "contact",
    icon: "/icons/contact.webp",
    x: 10,
    y: 510,
  },
  {
    id: "music",
    label: "Winamp",
    appType: "music",
    icon: "/icons/winamp.webp",
    x: 110,
    y: 10,
  },
];

// Resume Documents
export const DOCUMENTS: DocumentItem[] = [
  {
    label: "Resume",
    file: `${cloudinaryImageUrl}/resume_dk18s4.pdf`,
  },
];

// About Me
export const ABOUT_ME: AboutMeData = {
  name: "Muhammad Sopian",
  greeting: "Hi, I’m Muhammad Sopian 👋",
  title: "UI-focused Frontend Developer",
  description:
    "I enjoy turning ideas into responsive web experiences and leveraging cloud tech to scale products.",
  avatar: "/me.webp",
  quickFacts: [
    "🎓 Fresh Graduate from Universitas Pendidikan Indonesia",
    "💻 Tech enthusiast",
    "🛠 Skilled in JavaScript, TypeScript, React, Next.js, Vue, Nuxt, and Tailwind",
    "🌐 Passionate about building scalable web apps",
  ],
};

// Projects
export const PROJECTS: ProjectType[] = [
  {
    title: "EduVision (Student Behavior Detection)",
    url: "http://github.com/msopiann/EduVision-YOLO",
    snippet:
      "Real-time classroom monitoring app using YOLOv11 + Streamlit. Achieved mAP@0.5:0.71 and mAP@0.5:0.95:0.55 on 11.7k instances. Real-time inference at 3.6 FPS with DeepSORT tracking and interactive analytics dashboard.",
  },
  {
    title: "Kukuliner (AI-Powered Food Recommendation)",
    url: "https://kukuliner-landingpage.vercel.app/",
    snippet:
      "Responsive landing page built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Achieved near-perfect Lighthouse scores across desktop and mobile with SEO best practices and scalable modular codebase.",
  },
  {
    title: "Mindcare (AI Mental Health Companion)",
    url: "https://www.mindcare.cyou/",
    snippet:
      "Full-stack mental health platform with AI chatbot, secure auth, and optimized PostgreSQL queries. Built 68 reusable UI components. Achieved 94 desktop performance, 96 accessibility, and 100 SEO on Lighthouse.",
  },
  {
    title: "Linkify (URL Shortener)",
    url: "https://linkify-blue-theta.vercel.app/",
    snippet:
      "URL shortener with real-time analytics dashboard. Optimized CSS/JS for performance and SEO. Achieved Lighthouse desktop scores: Performance 89, Accessibility 88, Best Practices 96, SEO 92.",
  },
  {
    title: "Cinemora (Netflix Clone)",
    url: "https://github.com/msopiann/next-netflix-clone",
    snippet:
      "Streaming web app integrating TMDB API with 974 LOC and 5 reusable components. Optimized bundle size (640 KB → 180 KB gzipped) and improved mobile load by 30%. Lighthouse desktop 88, mobile 75, SEO 100.",
  },
  {
    title: "TuneStream (Spotify Clone)",
    url: "https://github.com/msopiann/spotify-clone-react",
    snippet:
      "Spotify-like music streaming app with playback, visualization, and responsive UI. Achieved 99 Performance and 100 Accessibility (desktop). Mobile performance improved from 75 → 90+ with code-splitting and lazy loading.",
  },
];

// Contact Info
export const CONTACTS: ContactItemType[] = [
  {
    label: "Email",
    value: "contact@msopiann.my.id",
    link: "mailto:contact@msopiann.my.id",
    icon: "SiMinutemailer",
  },
  {
    label: "GitHub",
    value: "github.com/msopiann",
    link: "https://github.com/msopiann",
    icon: "SiGithub",
  },
  {
    label: "GitLab",
    value: "gitlab.com/msopiann",
    link: "https://gitlab.com/msopiann",
    icon: "SiGitlab",
  },
  {
    label: "Instagram",
    value: "instagram.com/msopiann",
    link: "https://instagram.com/msopiann",
    icon: "SiInstagram",
  },
];

// Gallery
export const GALLERY: GalleryItem[] = [
  { src: `${cloudinaryImageUrl}/gallery-1_zi6p4i.jpg`, alt: "Photo 1" },
  { src: `${cloudinaryImageUrl}/gallery-2_hjnzbq.jpg`, alt: "Photo 2" },
  { src: `${cloudinaryImageUrl}/gallery-3_ju8vdd.jpg`, alt: "Photo 3" },
];

// Music Tracks
export const TRACKS: TrackItem[] = [
  {
    title: "Mazare, Drive!Drive! - Honest (NCS Release)",
    src: `${cloudinaryVideoUrl}/Mazare_Drive_Drive_-_Honest_NCS_Release_a55bqu.mp3`,
  },
  {
    title: "NIVIRO - Uncharted (NCS Release)",
    src: `${cloudinaryVideoUrl}/NIVIRO_-_Uncharted_NCS_Release_xytzof.mp3`,
  },
  {
    title: "439*hz - Re:バース (Re:Verse) (NCS Release)",
    src: `${cloudinaryVideoUrl}/439_hz_-_Re_%E3%83%90%E3%83%BC%E3%82%B9_Re_Verse_NCS_Release_hbrquo.mp3`,
  },
  {
    title: "Warriyo, LXNGVX - Mortals Funk Remix (NCS Release)",
    src: `${cloudinaryVideoUrl}/Warriyo_LXNGVX_-_Mortals_Funk_Remix_NCS_Release_bkcbuo.mp3`,
  },
  {
    title: "Maestro Chives, Egzod, Neoni - Royalty (NCS Release)",
    src: `${cloudinaryVideoUrl}/Maestro_Chives_Egzod_Neoni_-_Royalty_NCS_Release_fuzdhk.mp3`,
  },
  {
    title: "X972, sk3tch01, MXZI - Montagem Toma (NCS Release)",
    src: `${cloudinaryVideoUrl}/X972_sk3tch01_MXZI_-_Montagem_Toma_NCS_Release_fj0ipz.mp3`,
  },
  {
    title: "DR MØB, Chris Linton - Fearless Funk (NCS Release)",
    src: `${cloudinaryVideoUrl}/DR_M%C3%98B_Chris_Linton_-_Fearless_Funk_NCS_Release_bsnk3c.mp3`,
  },
  {
    title: "Karyuu, Jaylenn - Another Life (NCS Release)",
    src: `${cloudinaryVideoUrl}/Karyuu_Jaylenn_-_Another_Life_NCS_Release_a0ggdv.mp3`,
  },
  {
    title: "ALEXYS, Strn. - So Sweet (NCS Release)",
    src: `${cloudinaryVideoUrl}/ALEXYS_Strn._-_So_Sweet_NCS_Release_ksvrtn.mp3`,
  },
  {
    title: "youth® - ghost (NCS Release)",
    src: `${cloudinaryVideoUrl}/youth_-_ghost_NCS_Release_ytuzpl.mp3`,
  },
  {
    title: "Dyolow - ROCK PAPER SCISSORS! (NCS Release)",
    src: `${cloudinaryVideoUrl}/Dyolow_-_ROCK_PAPER_SCISSORS_NCS_Release_azo7uq.mp3`,
  },
];

// SEO
export const SEO = {
  title: "Muhammad Sopian | Junior Frontend Developer",
  description:
    "UI-focused Frontend Developer passionate about building responsive web experiences and scalable apps with modern technologies.",
  keywords: [
    "Muhammad Sopian",
    "Frontend Developer",
    "React",
    "Next.js",
    "Web Development",
    "Portfolio",
  ],
  author: "Muhammad Sopian",
  url: siteUrl,
  ogImage: "/opengraph-image.png",
};
