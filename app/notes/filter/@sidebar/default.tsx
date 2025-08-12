import Link from "next/link";

const tags = [
  { id: "All", name: "All" },
  { id: "Todo", name: "Todo" },
  { id: "Work", name: "Work" },
  { id: "Personal", name: "Personal" },
  { id: "Meeting", name: "Meeting" },
  { id: "Shopping", name: "Shopping" },
];

const NotesSidebar = () => {
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag.id}>
          <Link href={`/notes/filter/${tag.id}`}>{tag.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
