import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { BestMatch, TickerBestMatches, UserTimeSeries } from "../../lib/types";
import axios from "axios";
import KeyChain from "../../lib/keys/keychain";
import TickerSearchResults from "./TickerSearchResults";
import { useTimeSeries } from "../../lib/hooks/useTimeSeries";
import { Link, useNavigate, useParams } from "react-router";

export default function TickerSearch() {
  const {id} = useParams();
  const {updateUserTimeSeries, createUserTimeSeries, timeSeries, isLoadingTimeSeries} = useTimeSeries(id);
  const navigate = useNavigate();
  const [selectedTicker, setSelectedTicker] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [matches, setMatches] = useState<BestMatch[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO: Future functionality
    // const formData = new FormData(event.currentTarget);
    const data : {[key: string]: FormDataEntryValue} = {};
    // formData.forEach((value, key) => {
    //   data[key] = value
    // })

    //TODO: Placeholder
    //TODO: Stock purchasing fuctionality will resolve this naturally

    if(timeSeries && timeSeries.id) {
      //TODO: Currently updates with same data
      data.id = timeSeries.id;
      data.userId = timeSeries.userId
      data.tickerSymbol = timeSeries.tickerSymbol
      data.function = timeSeries.function
      await updateUserTimeSeries.mutateAsync(data as unknown as UserTimeSeries);
      navigate(`/timeseries/${timeSeries.id}`)
    } else {
      if(selectedTicker !== '') {
        const data: UserTimeSeries = {
          userId: "95be607b-e488-4642-9093-f5c44064416a",
          tickerSymbol: selectedTicker,
          function: "TIME_SERIES_DAILY"
        }
        createUserTimeSeries.mutate(data as unknown as UserTimeSeries, {
          onSuccess: (id) => {
            navigate(`/timeseries/${id}`);
          }
        })
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInputValue(newInput);
    if(newInput !== '') {
      search(newInput);
    }
  };

  const handleSelectTicker = (tickeSymbol: string) => {
    console.log(tickeSymbol);
    setSelectedTicker(tickeSymbol);
  }

  const search = async (keywords: string) => {
    const url = 'https://www.alphavantage.co/query?' + 
      `function=SYMBOL_SEARCH` +
      `&keywords=${keywords}`+
      `&apikey=${new KeyChain().primary}`

    try {
      const tickerSearchResponse = 
      await axios.get<TickerBestMatches>(url);
      setMatches(tickerSearchResponse.data.bestMatches)
    } catch(error) {
      console.error('Promise rejected with error: ' + error);
    }  

  }

  if(isLoadingTimeSeries) return <Typography>Loading activity...</Typography>

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>
            {timeSeries ? 'Adjust Position' : 'New Position'}
        </Typography>
        <Box component={'form'} onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} gap={3}>
          {!timeSeries && <TextField id="filled-basic" label="Search" variant="filled" value={inputValue} onChange={handleChange}/>}
          <Box display='flex' justifyContent='left' gap={3}>
            <TickerSearchResults matches={matches} selectTicker={handleSelectTicker}/>
          </Box>
          <Box display='flex' justifyContent='end' gap={3}>
            <Button component={Link} to={id ? `/timeseries/${id}` : '/timeseries'} color='inherit'>Cancel</Button>
            <Button type='submit' color='success' disabled={updateUserTimeSeries.isPending}>Purchase</Button>
          </Box>
        </Box>
    </Paper>
  )
}