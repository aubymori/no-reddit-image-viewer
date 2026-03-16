chrome.webRequest.onBeforeSendHeaders.addListener(
    function(event)
    {
        if (event.type == "main_frame")
        {
            let modifiedAccept = false;
            for (let i = 0; i < event.requestHeaders.length; i++)
            {
                if (event.requestHeaders[i].name.toLowerCase() == "accept")
                {
                    event.requestHeaders[i].value = "image/avif,*/*";
                    delete event.requestHeaders[i].binaryValue;
                    modifiedAccept = true;
                    break;
                }
            }

            if (!modifiedAccept)
            {
                event.requestHeaders.push({
                    name: "accept",
                    value: "image/avif,*/*"
                });
            }
        }

        return { requestHeaders: event.requestHeaders };
    },
    { urls: [ "*://i.redd.it/*", "*://preview.redd.it/*", "*://external-preview.redd.it/*" ] },
    [ "requestHeaders", "blocking" ]
);