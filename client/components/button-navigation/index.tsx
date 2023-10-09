"use client";
import IconButton from "@mui/material/IconButton";
import {MicNone, SkipNext, Stop, Videocam, VolumeUp, PlayArrow} from "@mui/icons-material";
import {Stack} from "@mui/material";
import peerjs from "@/hooks/useWebRTC";
import {useState} from "react";

const Index = () => {
    const [isStart, setStart] =useState(false)

    const onStart = () => {
        peerjs.start();
        setStart(!isStart)
    }

    return (
        <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton color="primary">
                <MicNone />
            </IconButton>
            <IconButton color="primary">
                <VolumeUp />
            </IconButton>
            <IconButton color="error" onClick={onStart}>
                {isStart ? <Stop /> : <PlayArrow />}
            </IconButton>
            <IconButton color="primary">
                <SkipNext />
            </IconButton>
            <IconButton color="primary">
                <Videocam />
            </IconButton>
        </Stack>
    );
};

export default Index;