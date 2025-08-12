import Modal from "@/components/Modal/Modal";
import { getSingleNote } from "@/lib/api";

type Props = {
  params: { id: string };
};

const NotePreview = async ({ params }: Props) => {
  const note = await getSingleNote(params.id);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <Modal onClose={() => {}}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
};

export default NotePreview;
