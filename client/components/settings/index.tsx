"use client";
import React, {useRef, useState} from 'react';
import styles from "@/app/page.module.css";
import {useRouter} from "next/navigation";
import peerjs from "@/hooks/useWebRTC";
import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import Container from "@mui/material/Container";

const Index = () => {
    const router = useRouter()
    const [rooms, setRooms] = useState([])
    const rootNode = useRef(null)
    const {start} = peerjs

    const onNext = () => {
        start();
    }
    return (
                <Grid container justifyContent="center">
                    <Grid>
                        <FormLabel id="demo-radio-buttons-group-label">Ваш пол:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </Grid>
                    <Grid>
                        <FormLabel id="demo-radio-buttons-group-label">Ваш возраст:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </Grid>
                    <Grid>
                        <FormLabel id="demo-radio-buttons-group-label">Ваш пол:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </Grid>
                    <Grid>
                        <FormLabel id="demo-radio-buttons-group-label">Ваш возраст:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </Grid>
                </Grid>
    );
};

export default Index;