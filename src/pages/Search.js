import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ResultList from "../components/ResultList";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [searchBtn, setSearchBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (search && search.length > 1) {
      setLoading(true);
      fetch(
        `https://s.livesport.services/api/v2/search?type-ids=2,3&project-type-id=1&project-id=602&lang-id=1&q=${search}&sport-ids=1,2,3,4,5,6,7,8,9`
        // `https://s.livesport.services/api/v2/search?type-ids=2,3&project-type-id=1&project-id=602&lang-id=1&q={search}&sport-ids=1,2,3,4,5,6,7,8,9&q=lfjdsf`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // TODO pouze nekdy
          if (data.code === 101 || data.code === 100 || data.code === 110) {
            setError(true);
          }
          setResult(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setLoading(false);
        });
    }
  }, [searchBtn]);

  return (
    <Box sx={{ flexGrow: 1, marginLeft: -20 }}>
      <Grid container spacing={2} columns={16}>
        <Grid xs={10} style={{ textAlign: "right" }}>
          <TextField
            sx={{ marginTop: 5, marginRight: 5, width: 350 }}
            id="outlined-basic"
            label="Vyhledávání"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <ClearIcon onClick={() => setSearch("")} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid xs={6} style={{ textAlign: "left" }}>
          <Button
            sx={{ marginTop: 5, height: 54 }}
            variant="contained"
            size="large"
            onClick={() => setSearchBtn(!searchBtn)}
          >
            Hledat
          </Button>
        </Grid>
      </Grid>
      {error ? (
        // TODO upravit stylovani
        <Alert
          sx={{ width: 445, marginLeft: 50, marginTop: 1 }}
          severity="error"
        >
          Data se nepodařilo načíst!
          <Button
            onClick={() => {
              setResult([]);
              setError(false);
            }}
          >
            Obnovit
          </Button>
        </Alert>
      ) : loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Alert severity="info">Načítání</Alert>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
            <ResultList data={result} setDetail={props.setDetail} />
        </Box>
      )}
    </Box>
  );
}
