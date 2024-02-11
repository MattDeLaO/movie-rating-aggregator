import { useState } from "react";
import RottenTomatoes from "../images/RottenTomatoes.png";
import IMDb from "../images/IMDb.png";
import Metacritic from "../images/Metacritic.png";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { StyledPercentage } from "./StyledPercentage";
import { IoClose, IoTrophySharp } from "react-icons/io5";

const determineSourcePicture = (source) => {
  switch (source) {
    case "Internet Movie Database":
      return IMDb;
    case "Rotten Tomatoes":
      return RottenTomatoes;
    case "Metacritic":
      return Metacritic;
    default:
      return;
  }
};

const Row = styled(Container)({
  maxWidth: 475,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 8,
});

const GradientBackground = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 8,
  padding: "8px 2px 6px 2px",
  minHeight: 600,
  width: 355,
  flexDirection: "column",
  border: "2px solid rgba(188, 237, 246, 0.3)",
  borderRadius: 2,
  backgroundImage: "linear-gradient(#0b010e, rgba(14, 0, 94, 1))",
});

export const MovieCard = ({ currentMovie, isDesktopDevice, isSearchError }) => {
  const shouldRenderMovieCard =
    !currentMovie.Error && Object.keys(currentMovie).length !== 0;
  const [openDialogue, setOpenDialogue] = useState(false);
  if (isSearchError) {
    return (
      <GradientBackground>
        <div>No results found</div>
      </GradientBackground>
    );
  } else if (shouldRenderMovieCard) {
    return (
      <>
        <GradientBackground>
          <Card sx={{ backgroundColor: "transparent" }}>
            <CardActionArea onClick={() => setOpenDialogue(true)}>
              <CardMedia
                component="img"
                height="auto"
                image={currentMovie.Poster}
                alt="Movie Poster"
                sx={{
                  borderRadius: 1,
                  width: 352,
                }}
              />
              <CardContent>
                <Typography variant="h4" color={"#FFFF"}>
                  Average Rating:
                </Typography>
                <StyledPercentage overallRating={currentMovie.averageRating} />
              </CardContent>
            </CardActionArea>
          </Card>
        </GradientBackground>
        <Dialog open={openDialogue} onClose={() => setOpenDialogue(false)}>
          <DialogTitle bgcolor={"#0b010e"} color={"#FFFF"} fontWeight="bold">
            {`${currentMovie.Title} (${currentMovie.Year})`}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialogue(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey",
            }}
          >
            <IoClose />
          </IconButton>
          <DialogContent
            style={{
              backgroundImage: "linear-gradient(#0b010e, rgba(14, 0, 94, 1))",
              color: "white",
            }}
          >
            <Typography variant="h6" mb={2}>
              {currentMovie.Genre}
            </Typography>
            <Typography mb={4}>{currentMovie.Plot}</Typography>
            {currentMovie.Ratings?.map((rating) => (
              <Row>
                <div style={{ width: 50, height: 50 }}>
                  <img
                    src={determineSourcePicture(rating.Source)}
                    alt="Movie Thumbnail"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
                <Typography fontWeight="bold">
                  {rating.Source === "Internet Movie Database"
                    ? "IMDb"
                    : rating.Source}
                </Typography>
                <Typography fontWeight="bold">{rating.Value}</Typography>
              </Row>
            ))}
            {currentMovie.Awards !== "N/A" && (
              <Row sx={{ justifyContent: "flex-start" }}>
                <IoTrophySharp
                  style={{
                    height: 52,
                    width: 52,
                    color: "gold",
                    paddingRight: 12,
                    margin: "5%",
                  }}
                />
                <Typography fontWeight="bold">{currentMovie.Awards}</Typography>
              </Row>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }
};
