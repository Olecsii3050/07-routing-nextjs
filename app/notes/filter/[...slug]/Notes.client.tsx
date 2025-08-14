"use client";

import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./Notes.module.css";
import { Note, NoteTag } from "@/types/note";
import { FetchNotesResponse } from "@/lib/api";

interface AppProps {
  initialNotes: FetchNotesResponse;
  tag?: NoteTag;
}

export default function App({ initialNotes, tag }: AppProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = useDebouncedCallback((search: string) => {
    setDebouncedSearch(search);
  }, 300);

  const handleSearchChange = (search: string) => {
    setSearch(search);
    setPage(1);
    handleSearch(search);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: tag as NoteTag | undefined,
      }),
    initialData: initialNotes,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setPage(1);
  }, [tag]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          type="button"
          onClick={() => setModalIsOpen(true)}
        >
          Create +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data?.data?.length > 0 ? (
        <NoteList notes={data.data} />
      ) : (
        <p>No notes found</p>
      )}
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)}>
          <NoteForm onClose={() => setModalIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
