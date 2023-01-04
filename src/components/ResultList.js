import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ImageListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ResultList(props) {
  const navigate = useNavigate();

  return (
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      {props.data.map((row) => (
        <ListItem divider>
          <ImageListItem key={row.id}>
              <img
                src={`https://www.livesport.cz/res/image/data/${row.images[0]?.path}`}
                alt={"no photo"}
              />
          </ImageListItem >
          <ListItemButton
            onClick={() => {
              props.setDetail(row);
              navigate("/detail");
            }}
          >
            <ListItemText
              primary={row.name}
              secondary={row.defaultCountry.name}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
