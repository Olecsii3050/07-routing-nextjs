"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => {
      if (!id) throw new Error("Note id is undefined");
      return fetchNoteById(id);
    },
    enabled: !!id,
    refetchOnMount: true,
  });

  const handleClose = () => {
    router.back();
  };

  if (!id) return <div>Invalid Note ID</div>;
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
      <button onClick={handleClose}>Closed</button>
    </Modal>
  );
}
