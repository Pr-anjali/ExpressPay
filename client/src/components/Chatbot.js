import React, {useEffect} from 'react'

function Chatbot() {

  useEffect(()=>{
    (function(d, m){
        var kommunicateSettings = {
            "appId":"4af2b9b5f2bea11d5d96bea8e18cc861",
            "popupWidget":true,
            "automaticChatOpenOnNavigation":true
        };
        var s = document.createElement("script"); 
        s.type = "text/javascript"; 
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; 
        h.appendChild(s);
        window.kommunicate = m; 
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
  },[])
    
  return (
    <div>Chatbot</div>
  )
}

export default Chatbot