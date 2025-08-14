import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { QueryClient, useQuery } from "@tanstack/react-query";

interface Note {
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

type Props = {
  params: { id: string };
};

function NotePreviewClient({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  const handleClose = () => {
    window.history.back();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Error loading note</div>;

  return (
    <Modal onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        <strong>Tags:</strong> {note.tag}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
      <button onClick={handleClose}>Close</button>
    </Modal>
  );
}

export default async function NotePreview({ params }: Props) {
  const queryClient = new QueryClient();
  const id = params.id;

  if (!id) {
    return <div>Invalid Note ID</div>;
  }

  await queryClient.prefetchQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return <NotePreviewClient id={id} />;
}
