import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Form(props: { children: ReactNode }) {
  return (
    <Box
      bg="tomato"
      w={{ sm: "100%", md: "90%", lg: "70%", xl: "50%" }}
      p={10}
      color="white"
      style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.2)" }}
    >
      {props.children}
    </Box>
  );
}
