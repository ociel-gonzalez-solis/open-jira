import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useState, ChangeEvent, useContext } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [isTouch, setIsTouch]       = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onTextChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue((preValue) => target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    console.log(
      "🚀 ~ file: nEWeNTRY.TSX:17 ~ onSave ~ inputValue:",
      inputValue
    );
    addNewEntry(inputValue);

    setIsAddingEntry(false);
    setIsTouch((prevState) => false);
    setInputValue((prevState) => "");
  };

  return (
    <Box sx={{ marginBottom: 3, paddingX: 2 }}>
      {!isAddingEntry ? (
        <>
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant="outlined"
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar tarea
          </Button>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && isTouch && "Ingrese un valor"}
            error={inputValue.length <= 0 && isTouch}
            value={inputValue}
            onChange={onTextChanged}
            onBlur={() => setIsTouch((prevState) => !prevState)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
