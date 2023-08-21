import React, { useState, useEffect } from 'react'; 
 

 

interface Props {
    connect: boolean,
    result: () => void
    errorMsg: (msg: string) => void
}

 

export const ConnectBtn: React.FC<Props> = ({ connect, result, errorMsg }) => {
    const [state, setState] = useState();

    useEffect(() => {
        if (connect) {
            handleConnect();
        }
    }, [connect])

    const handleConnect = () => {
         
    };

    
    return <></>

};

