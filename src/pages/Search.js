import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField, Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ResultList from "../components/ResultList";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [searchBtn, setSearchBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterSport, setFilterSport] = useState(0);
  const [filterTypes, setFilterTypes] = useState(0);

  function getSportIds() {
    if (filterSport === 0) {
      return "1,2,3,4,5,6,7,8,9";
    }
    return filterSport;
  }

  function getTypesIds() {
    if (filterTypes === 0) {
      return "1,2,3,4";
    }
    return filterTypes;
  }

  useEffect(() => {
    if (search && search.length > 1) {
      setLoading(true);
      fetch(
        `https://s.livesport.services/api/v2/search?type-ids=${getTypesIds()}&project-type-id=1&project-id=602&lang-id=1&q=${search}&sport-ids=${getSportIds()}`
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
  }, [filterTypes, filterSport, searchBtn]);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="left"
        //minHeight="100vh"
        sx={
          {
            //flexGrow: 1,
            //marginLeft: -20,
            // alignItems: "flex-start",
            //flexDirection: "column",
          }
        }
      >
        <Grid container spacing={2} columns={16} alignContent={"center"}>
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
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        //minHeight="100vh"
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        {/*<Typography>Filtry:</Typography>*/}
        <Grid container spacing={0} columns={16} alignContent={"center"}>
          {/*<Grid xs={2} style={{ textAlign: "right" }}>*/}
          {/*  <Typography>Filtry:</Typography>*/}
          {/*</Grid>*/}
          <Grid xs={4} alignContent={"right"} style={{ textAlign: "center", marginLeft: 180 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sports-label">Sporty</InputLabel>
              <Select
                labelId="filter-sport"
                id="filter-type"
                label="Sporty"
                value={Number(filterSport)}
                onChange={(e) => setFilterSport(e.target.value)}
              >
                <MenuItem value={0}>Vše</MenuItem>
                <MenuItem value={1}>Fotbal</MenuItem>
                <MenuItem value={2}>Tenis</MenuItem>
                <MenuItem value={3}>Basketbal</MenuItem>
                <MenuItem value={4}>Hokej</MenuItem>
                <MenuItem value={5}>Americký fotbal</MenuItem>
                <MenuItem value={6}>Baseball</MenuItem>
                <MenuItem value={7}>Házená</MenuItem>
                <MenuItem value={8}>Rugby</MenuItem>
                <MenuItem value={9}>Florbal</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={4} style={{ textAlign: "center" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="types-label">Typy</InputLabel>
              <Select
                labelId="types-label"
                id="types"
                label="Typy"
                value={Number(filterTypes)}
                onChange={(e) => setFilterTypes(e.target.value)}
              >
                <MenuItem value={0}>Vše</MenuItem>
                <MenuItem value={1}>Soutěže</MenuItem>
                <MenuItem value={2}>Týmy</MenuItem>
                <MenuItem value={3}>Hráči jednotlivci</MenuItem>
                <MenuItem value={4}>Hráci v týmech</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>{" "}
        </Grid>
      </Box>

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
    </Container>
  );
}
