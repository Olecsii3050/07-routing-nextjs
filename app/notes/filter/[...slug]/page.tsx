import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { getNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default async function NotesPage() {
  const initialNotes = await fetchNotes({ page: 1, perPage: 12 });

  return <NotesClient initialNotes={initialNotes} />;
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const response = await getNotes(category);

  return (
    <div>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
};
