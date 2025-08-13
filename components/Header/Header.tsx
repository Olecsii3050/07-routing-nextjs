import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

const fetchTags = async (): Promise<Tag[]> => {
  return [
    { id: "1", name: "Work", slug: "work" },
    { id: "2", name: "Personal", slug: "personal" },
    { id: "3", name: "Important", slug: "important" },
  ];
};

const Header = async () => {
  const tags: Tag[] = await fetchTags();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <TagsMenu tags={tags} /> {}
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
