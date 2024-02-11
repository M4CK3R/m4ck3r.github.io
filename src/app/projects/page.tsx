"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faGlobe,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const projects = [
  {
    name: "Discord music bot",
    description: `This Rust-based Discord bot is a robust audio management system, designed for efficient song caching and queue management. It features modules for processing audio files, caching songs for quick retrieval, and managing song queues. The bot also includes Docker support for easy deployment. This project demonstrates proficiency in Rust, audio processing, caching strategies, and Docker, making it a great example of a high-performance, modular Discord bot.`,
    icon: faDiscord,
    link: "https://github.com/M4CK3R/discord-music-player",
  },
  {
    name: "File downloader",
    description: `"Downloader" is a robust file download manager built with .NET and Angular, designed to run in a Docker environment. It features a C# service for processing download requests, an API layer for handling HTTP requests, a data layer for database interactions, and an Angular-based front-end. The project is organized as a Visual Studio solution, making it easy to manage and build.`,
    icon: faDownload,
    link: "https://github.com/M4CK3R/file-downloader",
  },
  {
    name: "Personal website",
    description:
      "This project is a captivating, static web application built with React and TypeScript, compiled using Next.js for optimal performance. It features an interactive navigation bar and a Projects page showcasing a collection of projects. A standout feature is the custom 2D night sky background, generated with a shader, that enhances the user experience with a starry visual effect. Styles are managed using SCSS, with both global and component-specific styles.",
    icon: faGlobe,
    link: "https://github.com/M4CK3R/M4CK3R.github.io",
  },
  // {
  //   name: "Coming soon",
  //   description: "This project is currently under development.",
  //   icon: faQuestion,
  //   link: null,
  // },
];

const ProjectName = (props: { name: string; link: string | null }) => {
  return !props.link ? (
    <span>{props.name}</span>
  ) : (
    <Link target="_blank" href={props.link!}>
      <span>{props.name}</span>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </Link>
  );
};

export default function Projects() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(-1);
  const setActive = (index: number) => {
    setCurrentProjectIndex(index == currentProjectIndex ? -1 : index);
  };
  return (
    <div
      className={`${styles.projectsContainer} ${
        currentProjectIndex != -1 ? styles.active : ""
      }`}
    >
      {projects.map((project, index) => (
        <div
          className={`${styles.project} ${
            currentProjectIndex == index ? styles.active : ""
          }`}
          key={index}
          onClick={(e) => {
            const t = e.target as HTMLElement;
            if (t.getAttribute("stop-propagation")) return;
            setActive(index);
          }}
        >
          <FontAwesomeIcon className={styles.projectIcon} icon={project.icon} />
          <div className={styles.projectName}>
            <ProjectName name={project.name} link={project.link} />
          </div>
          <div className={styles.projectDescription}>{project.description}</div>
        </div>
      ))}
    </div>
  );
}
