import Modal from "@/components/Modal/Modal";
import { getSingleNote } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: { id: string };
};

const NotePreview = ({ params }: Props) => {
  const { id } = params;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Note not found</div>;

  return (
    <HydrationBoundary>
      <Modal onClose={() => {}}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </Modal>
    </HydrationBoundary>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  return { props: { params } };
}

export default NotePreview;
