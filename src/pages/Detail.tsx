import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Detail(props) {
  const navigate = useNavigate();

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto", marginLeft: 5 }}>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(-1)}
                  sx={{ marginBottom: 1, paddingLeft: 0 }}
                  startIcon={<ArrowBackIosIcon />}
                >
                  Zpět
                </Button>
              </CardActions>
              <Typography variant="h4" component="div">
                {props.detail.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ marginTop: 15 }}
              >
                Země: {props.detail.defaultCountry.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sport: {props.detail.sport.name}
              </Typography>
              {props.detail.type.id === 1 ||
              props.detail.type.id === 2 ? null : (
                <Typography variant="body2" color="text.secondary">
                  Pohlaví: {props.detail.gender.name}
                </Typography>
              )}
              {props.detail.teams?.length > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Tým: {props.detail.teams[0]?.name}
                </Typography>
              ) : null}
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{
              width: 100,
              height: 100,
              margin: 7,
              marginTop: 9,
            }}
            image={`https://www.livesport.cz/res/image/data/${props.detail.images[0]?.path}`}
            alt="team or player photo"
          />
        </Card>
      </Box>
    </Container>
  );
}
