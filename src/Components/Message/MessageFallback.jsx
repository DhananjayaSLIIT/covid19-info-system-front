import React from 'react'
const MessageFallback = () =>{
    return(
        <div style={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>
            <img src="/images/loading.webp" style={{width:'150px',height:'auto'}}/>
        </div>
    );
}

export default MessageFallback