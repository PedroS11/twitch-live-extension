import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import darkTheme from "./theme/darkTheme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

const routing =
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div>ola</div>
    </ThemeProvider>

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(routing, root)