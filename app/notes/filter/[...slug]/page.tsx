import { fetchNotes, getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const initialNotes = await fetchNotes({ page: 1, perPage: 12 });
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const response = await getNotes(category);

  return (
    <div>
      <NotesClient initialNotes={initialNotes} />
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
}
