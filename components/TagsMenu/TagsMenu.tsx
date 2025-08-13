"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface TagsMenuProps {
  tags: Tag[];
  onTagSelect?: (tagSlug: string | null) => void;
}

export default function TagsMenu({ tags, onTagSelect }: TagsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSelect = (slug: string | null) => {
    if (onTagSelect) onTagSelect(slug);
    setIsOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              className={css.menuLink}
              onClick={() => handleSelect(null)}
            >
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag.id} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag.name}`}
                className={css.menuLink}
                onClick={() => handleSelect(tag.slug)}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
