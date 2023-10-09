"use client"
import {useEffect, useRef} from "react";
import css from "./style.module.css"
import peerjs from "@/hooks/useWebRTC";


const LocalVideo = () => {
    const ref= useRef<HTMLVideoElement>()

    peerjs.onLocalStream((remoteStream) => {
        if(ref.current && remoteStream && !ref.current.srcObject){
            ref.current.srcObject = remoteStream;
        }
    })

    return (<video ref={ref} className={css.wrapper} autoPlay muted={false} />)
}
export default LocalVideo