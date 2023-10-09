import {useCallback, useEffect, useRef, useState} from "react";

const useStateWithCallback = (initianState) => {
    const [state, setState] = useState(initianState)
    const cbRef = useRef()

    const updateState = useCallback((newState, cb) => {
        cbRef.current = cb;

        setState((prev) => typeof newState === 'function' ? newState(prev) : newState)
    }, [])

    useEffect(() => {
        if(cbRef.current){
            cbRef.current(state)
            cbRef.current = null;
        }
    }, [state])

    return [state, updateState]
}
export default useStateWithCallback;