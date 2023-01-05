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
            <CardContent sx={{ flex: "1 0 auto"}}>
              <Typography variant="h3" component="div">
                {props.detail.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Country: {props.detail.defaultCountry.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sport: {props.detail.sport.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {props.detail.gender.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate(-1)}>
                Zpět
              </Button>
            </CardActions>
          </Box>
          <CardMedia
            component="img"
            height="100"
            sx={{ width: 100 }}
            image={`https://www.livesport.cz/res/image/data/${props.detail.images[0]?.path}`}
            alt="team or player photo"
          />
        </Card>
      </Box>
    </Container>
  );
}
