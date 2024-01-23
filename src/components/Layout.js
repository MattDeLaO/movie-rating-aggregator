import styled from "styled-components";
import Tickets from "../images/TicketsBackground.svg";
import { Box } from "@mui/material";

const MainWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
    #0b010e,
    rgba(11, 1, 14, 0.7),
    rgba(14, 0, 94, 0.05)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
`;

const BgImage = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #0b010e;
  background-image: url(${Tickets});
  background-repeat: repeat;
  background-position: fill;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Layout = ({ children }) => (
  <BgImage>
    <MainWrapper>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {children}
      </Box>
    </MainWrapper>
  </BgImage>
);
