import { Box, Typography } from "@mui/material";
import { BestMatch } from "../../lib/types";

type Props = {
    matches: BestMatch[]
    selectTicker: (tickerySymbol: string) => void
}

export default function TickerSearchResults({matches, selectTicker}: Props) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
       {matches.map(match => (<Typography onClick={() => selectTicker(match["1. symbol"])} key={match["1. symbol"]}>{match["1. symbol"]}</Typography>))}
    </Box>
  )
}