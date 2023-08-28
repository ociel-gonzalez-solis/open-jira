import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces/Entry";
import { v4 as uuidv4 } from "uuid";
import { entriesApi } from "@/api";
import { useSnackbar } from "notistack";

export interface entriesState {
  entries: Entry[];
}

const UI_INITIAL_STATE: entriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Et commodo fugiat aliqua labore adipisicing consequat voluptate fugiat.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "En Progreso: Irure irure ea aute ex amet.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Terminado: Enim exercitation culpa laborum reprehenderit labore id labore ipsum tempor consectetur labore Lorem dolore.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, UI_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description:
    //     "Pendiente: Et commodo fugiat aliqua labore adipisicing consequat voluptate fugiat.",
    //   createdAt: Date.now(),
    //   status: "pending",
    // };
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const createdAt = new Date();
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
        createdAt,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });

      if (showSnackbar) {
        enqueueSnackbar("Entrada Actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    console.log(data);
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
