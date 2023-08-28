import { Box } from "@mui/material";
import Head from "next/head";
import { FC } from "react";
import { NavBar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export const Layout: FC<Props> = ({ title = "OpenJira", children }) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>

      <NavBar />
      <Sidebar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
