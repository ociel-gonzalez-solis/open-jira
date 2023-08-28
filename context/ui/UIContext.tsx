import { createContext } from "react";

interface ContextProps {
  sidemenuOpen    : boolean;
  isAddingEntry   : boolean;
  openSideMenu    : () => void;
  closeSideMenu   : () => void;
  isDragging      : boolean;
  setIsAddingEntry: (isAddingEntry: boolean) => void;
  startDragging   : () => void;
  endDragging     : () => void;
}

export const UIContext = createContext({} as ContextProps);
