"use client";

import {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Group} from "@mui/icons-material";
import socket from "@/app/socket";
function ResponsiveAppBar() {
    const [live, setLive] = useState(0)

    useEffect(() => {
        socket.on("LIVE_COUNT", (live) => {
            console.log(live)
            setLive(live)
        })
    }, [])

    return (
        <>
            <Typography variant="h5" gutterBottom>
                CRUL.TV
            </Typography>
            <Button variant="contained" endIcon={
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12
                }}>
                    <Group />
                    {live}
                </div>
            } size="small" color="error">
                Live
            </Button>
        </>
    );
}
export default ResponsiveAppBar;