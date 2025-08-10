"use client";

import { useEffect, useState } from "react";
import { getSingleNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = ({ params }: Props) => {
  const [note, setNote] = useState<{ title: string; content: string } | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchNote = async () => {
      const { id } = await params;
      const fetchedNote = await getSingleNote(id);
      setNote(fetchedNote);
    };

    fetchNote();
  }, [params]);

  if (!note) {
    return <div>Завантаження...</div>;
  }

  return (
    <>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </Modal>
      )}
    </>
  );
};

export default NotePreview;
