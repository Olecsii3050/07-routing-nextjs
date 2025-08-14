import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import NoteList from "@/components/NoteList/NoteList";
import { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const validTags: NoteTag[] = [
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];
  const tag: NoteTag | undefined =
    slug[0] === "all"
      ? undefined
      : validTags.includes(slug[0] as NoteTag)
        ? (slug[0] as NoteTag)
        : undefined;

  const response = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: tag,
  });

  return (
    <div>
      <NotesClient
        initialNotes={{
          data: response?.data || [],
          totalPages: response?.totalPages || 1,
          page: response?.page || 1,
          perPage: response?.perPage || 12,
        }}
        tag={tag}
      />
      <h1>Notes List</h1>
      {response?.data?.length > 0 && <NoteList notes={response.data} />}
    </div>
  );
}
