import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];

  const response = await fetchNotes({
    page: 1,
    perPage: 12,
    categoryId: category,
  });

  return (
    <div>
      <NotesClient
        initialNotes={{
          data: response?.data || [],
          total_pages: response?.total_pages || 1,
        }}
        tag={category}
      />
      <h1>Notes List</h1>
      {response?.data?.length > 0 && <NoteList notes={response.data} />}
    </div>
  );
}
