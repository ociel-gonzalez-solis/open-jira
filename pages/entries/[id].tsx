import { Layout } from "@/components/layouts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Entry, EntryStatus } from "@/interfaces";
import { ChangeEvent, useMemo, useState, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import { isValidObjectId } from "mongoose";
import { DBEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { dateFunctions } from "@/utils";

const validationStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touch, setTouch] = useState<boolean>(false);

  const entryDate = new Date(entry.createdAt).getMinutes();

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touch,
    [inputValue, touch]
  );

  const onInputValueChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue((preValue) => target.value);
  };

  const onStatusChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setStatus((preStatus) => target.value as EntryStatus);
    console.log(target.value);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
    // console.log({ inputValue, status });
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: `}
              subheader={`Creada hace unos ${dateFunctions.getformatDistanceToNow(
                entry.createdAt
              )} minutos`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label="Nueva Entrada"
                value={inputValue}
                onChange={onInputValueChanged}
                helperText={isNotValid && "Ingrese Valor"}
                onBlur={() => setTouch((prevState) => !prevState)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validationStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          button: 30,
          right: 30,
          backgroundColor: "red",
        }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await DBEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
