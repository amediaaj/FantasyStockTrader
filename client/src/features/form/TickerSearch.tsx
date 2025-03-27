import { Box, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { BestMatch, TickerBestMatches } from "../../lib/types";
import axios from "axios";
import TickerSearchResults from "./TickerSearchResults";
import { useStore } from "../../lib/hooks/useStore";
import { useNavigate } from "react-router";

export default function TickerSearch() {
  const { uiStore } = useStore();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [matches, setMatches] = useState<BestMatch[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInputValue(newInput);
    if(newInput !== '') {
      search(newInput);
    }
  };

  const handleSelectTicker = (tickeSymbol: string) => {
    uiStore.setTicker(tickeSymbol);
    navigate(`/trade/${tickeSymbol}`);
  }

  const search = async (keywords: string) => {
    const url = 'https://www.alphavantage.co/query?' + 
      `function=SYMBOL_SEARCH` +
      `&keywords=${keywords}`+
      `&apikey=${process.env.API_KEY || import.meta.env.VITE_API_KEY}`

    try {
      const tickerSearchResponse = 
      await axios.get<TickerBestMatches>(url);
      setMatches(tickerSearchResponse.data.bestMatches)
    } catch(error) {
      console.error('Promise rejected with error: ' + error);
    }  

  }

  return (
    <Box component={'form'} onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} gap={3}>
        <TextField id="filled-basic" label="Search" variant="filled" value={inputValue} onChange={handleChange} />
        <Box display='flex' justifyContent='left' gap={3}>
          <TickerSearchResults matches={matches.slice(0,5)} selectTicker={handleSelectTicker}/>
        </Box>
    </Box>
  )
}