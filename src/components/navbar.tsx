"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { MoonStar, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b-2 border-border/80 backdrop-blur-md">
        {/* Logo */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-foreground">IEESEC</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium will-change backface-visibility text-muted-foreground"
              >
                <span className="transition-all duration-250 hover:text-shadow-xs hover:text-foreground">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="default"
              size="default"
              className="h-9 w-9 items-center justify-center rounded-lg border border-border bg-card drop-shadow-xs hover:bg-secondary transition-colors"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              <Sun className="hidden dark:block text-foreground" />
              <MoonStar className="block dark:hidden text-foreground" />
            </Button>
            <Button className="drop-shadow-xs">Join Us</Button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              variant="default"
              size="default"
              className="h-9 w-9 items-center justify-center rounded-lg border border-border bg-card drop-shadow-xs hover:bg-secondary transition-colors"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              <Sun className="hidden dark:block text-foreground" />
              <MoonStar className="block dark:hidden text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle menu">
              <Menu className="h-6 w-6 text-foreground" />
            </Button>
          </div>
        </div>
      </header>

      {/* KANEI BLUR TO BACKGROUND OTAN EXEIS ANOIXTO TO MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-60 w-64 transform border-l border-border bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end mb-8">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6 text-foreground" />
          </Button>
        </div>

        <nav className="flex flex-col items-center justify-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={toggleSidebar}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4">
            <Button className="w-full drop-shadow-xs">Join Us</Button>
          </div>
        </nav>
      </div>
    </>
  );
}
