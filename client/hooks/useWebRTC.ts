"use client";
import freeice from "freeice"
import socket from "@/app/socket";

const iceServers = freeice()

class PeerJS{
    localIcecandidate
    localDescription

    remoteIcecandidate
    remoteDescription

    localStream
    remoteStream

    localPeerConnection = new RTCPeerConnection({
        iceServers
    })
    remotePeerConnection = new RTCPeerConnection({
        iceServers
    })

    onLocalStream: () => void
    cbRemoteStream: () => void

    constructor(){
        this.localPeerConnection.onicecandidate = (event) => {
            if(event.candidate)
                this.setLocalIcecandidate(event.candidate)
        }


        this.remotePeerConnection.onicecandidate = (event) => {
            if(event.candidate)
                this.setRemoteIcecandidate(event.candidate)
        }

        this.remotePeerConnection.ontrack = (event) => {

            const [remoteStream] = event.streams;


            this.setRemoteStream(remoteStream)
            this.cbRemoteStream(remoteStream)
        }

        this.localPeerConnection.ontrack = (event) => {

            const [remoteStream] = event.streams;

            this.cbRemoteStream(remoteStream)
        }

        socket.on("REMOTE", ({icecandidate, description}) => {

            console.log('REMOTE')
            this.remotePeerConnection.setRemoteDescription(description)

            this.remotePeerConnection.createAnswer().then((description) => {

                this.remotePeerConnection.setLocalDescription(description)

                this.setRemoteDescription(description)

                this.remotePeerConnection.addIceCandidate(
                    new RTCIceCandidate(icecandidate)
                )
            })
        })


        socket.on("LOCALE", ({icecandidate, description}) => {
            console.log('LOCALE')
            this.localPeerConnection.setRemoteDescription(description)

            this.localPeerConnection.addIceCandidate(
                new RTCIceCandidate(icecandidate)
            )
        })

        socket.on('LEAVE', () => {
            this.remotePeerConnection.close()
        })
        this.getMediaStream()
    }
    start(){
        socket.emit("NEXT")
    }

    setLocalDescription(description){
        this.localDescription = description
        this.emitLocal()
    }

    setRemoteDescription(description){
        this.remoteDescription = description
        this.emitRemote()
    }

    setLocalIcecandidate(icecandidate){
        if(this.localIcecandidate)
            return;
        this.localIcecandidate = icecandidate
        this.emitLocal()
    }

    setRemoteIcecandidate(icecandidate){
        if(this.remoteIcecandidate)
            return;
        this.remoteIcecandidate = icecandidate
        this.emitRemote()
    }

    setLocalStream(stream){
        this.localStream = stream
    }

    setRemoteStream(stream){
        this.remoteStream = stream
    }
    emitLocal(){
        if(this.localIcecandidate && this.localDescription){
            socket.emit("REMOTE", {
                icecandidate: this.localIcecandidate,
                description: this.localDescription
            })
        }
    }

    emitRemote(){
        if(this.remoteIcecandidate && this.remoteDescription){
            console.log("emitRemote")
            socket.emit("LOCALE", {
                icecandidate: this.remoteIcecandidate,
                description: this.remoteDescription
            })
        }
    }

    getMediaStream(){
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                this.setLocalStream(stream)

                stream.getTracks().forEach((track) => {
                    this.localPeerConnection.addTrack(track, stream)
                    this.remotePeerConnection.addTrack(track, stream)
                })

                this.localPeerConnection.createOffer().then((description) => {
                    this.localPeerConnection.setLocalDescription(description)
                    this.setLocalDescription(description)

                })
                this.cbLocalStream(stream)
            })
            .catch((err) => {
                console.log("Access to camera was denied: ", err);
            });
    }

    onLocalStream(cb){
        this.cbLocalStream = cb
    }

    onRemoteStream(cb){
        this.cbRemoteStream = cb
    }
}

const peerjs = new PeerJS()

export default peerjs;