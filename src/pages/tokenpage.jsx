import { useEffect } from 'react';

function TokenPage() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.YaSendSuggestToken('https://legprom-rf.vercel.app/');
        };
    }, []);

    return (
        <></>
    );
}

export default TokenPage;