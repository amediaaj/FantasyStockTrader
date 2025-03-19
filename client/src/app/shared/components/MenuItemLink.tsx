import { MenuItem, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router";
import { tokens } from "../../../theme";

export default function MenuItemLink({children, to}: {children: ReactNode, to: string}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  

  return (
    <MenuItem
        component={NavLink} 
        to={to}
        sx={{
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: 'inherit',
            '&.active': {
                color: colors.blueAccent[200]
            }
        }}
    >
        {children}
    </MenuItem>
  )
}