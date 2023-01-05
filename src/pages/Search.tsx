import * as React from "react";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
// @ts-ignore
import ResultList from "../components/ResultList.tsx";

export default function Search(props) {
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState([]);
  const [searchBtn, setSearchBtn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [filterSport, setFilterSport] = useState<number>(0);
  const [filterTypes, setFilterTypes] = useState<number>(0);

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

  const handleChangeSport = (e) => {
    setFilterSport(e.target.value);
  };

  const handleChangeTypes = (e) => {
    setFilterTypes(e.target.value);
  };

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
        <Box component="form" noValidate sx={{ mt: 3, textAlign: "center" }}>
          <Grid container spacing={1}>
            <Grid item xs={16} sm={12}>
              <Typography variant="h3" gutterBottom>Vyhledejte svůj oblíbený</Typography>
              <Typography  variant="h3" gutterBottom>tým, soutěž nebo hráče</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={10} sm={8}>
              <TextField
                sx={{
                  marginRight: 5,
                  width: 300,
                  "& fieldset": {
                    borderRadius: "30px",
                  },
                }}
                id="outlined-basic"
                //label="Vyhledávání"
                placeholder={"Vyhledávání"}
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: search ? (
                    <IconButton>
                      <ClearIcon onClick={() => setSearch("")} />
                    </IconButton>
                  ) : null,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Button
                sx={{
                  height: 54,
                  borderRadius: 30,
                }}
                variant="contained"
                size="large"
                onClick={() => setSearchBtn(!searchBtn)}
              >
                Hledat
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={16} sm={6}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sports-label">Sporty</InputLabel>
                <Select
                  labelId="filter-sport"
                  id="filter-type"
                  label="Sporty"
                  value={Number(filterSport)}
                  onChange={handleChangeSport}
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
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={16} sm={6}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="types-label">Typy</InputLabel>
                <Select
                  labelId="types-label"
                  id="types"
                  label="Typy"
                  value={Number(filterTypes)}
                  onChange={handleChangeTypes}
                >
                  <MenuItem value={0}>Vše</MenuItem>
                  <MenuItem value={1}>Soutěže</MenuItem>
                  <MenuItem value={2}>Týmy</MenuItem>
                  <MenuItem value={3}>Hráči jednotlivci</MenuItem>
                  <MenuItem value={4}>Hráci v týmech</MenuItem>
                </Select>
              </FormControl>
            </Grid>{" "}
          </Grid>
        </Box>

        {error ? (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={16} sm={12}>
                <Alert severity="error">
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
              </Grid>
            </Grid>
          </Box>
        ) : loading ? (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={16} sm={12}>
                <Alert severity="info">Načítání</Alert>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={16} sm={12}>
                <ResultList data={result} setDetail={props.setDetail} />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
