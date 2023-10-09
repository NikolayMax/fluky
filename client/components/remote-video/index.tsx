"use client"
import {useEffect, useRef, useState} from "react";
import css from "./style.module.css"
import peerjs from "@/hooks/useWebRTC";
const RemoteVideo = () => {
    const ref= useRef<HTMLVideoElement>()

    peerjs.onRemoteStream((remoteStream) => {
        if(ref.current && remoteStream && !ref.current.srcObject){
            ref.current.srcObject = remoteStream;
        }
    })

    return (<video ref={ref} className={css.wrapper} autoPlay></video>)
}
export default RemoteVideo;