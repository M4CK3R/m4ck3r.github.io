"use client";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import { usePathname } from "next/navigation";

const isActive = (path: string, pathname: string) => {
  return path === pathname ? ` ${styles.active}` : "";
};

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.navBar}>
      {links.map(({ href, label }) => (
        <div className={styles.navItem + isActive(href, pathname)} key={href}>
          <Link href={href}>{label}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
