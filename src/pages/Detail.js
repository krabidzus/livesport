import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Detail(props) {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ width: 400 }}>
        <CardMedia
          component="img"
          height="400"
          image={`https://www.livesport.cz/res/image/data/${props.detail.images[0]?.path}`}
          alt="team or player photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
      </Card>
    </Box>
  );
}
