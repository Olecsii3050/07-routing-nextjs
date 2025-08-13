import axios, { AxiosInstance } from "axios";
import type { Note, NoteTag } from "../types/note";

const createApiClient = (): AxiosInstance => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error(
      "NEXT_PUBLIC_NOTEHUB_TOKEN is not defined. Please check your .env configuration."
    );
  }

  return axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSingleNote = async (id: string): Promise<Note> => {
  const api = createApiClient();
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  data: Note[];
  totalPages: number;
}

interface RawFetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const api = createApiClient();
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const response = await api.get<RawFetchNotesResponse>("/notes", { params });
  const raw = response.data;

  return {
    page,
    perPage,
    data: raw.notes,
    totalPages: raw.totalPages,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = createApiClient();
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const api = createApiClient();
  const response = await api.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const api = createApiClient();
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
