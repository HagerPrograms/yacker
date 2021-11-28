import {useRef} from 'react';
import { StickyBanner, Banner, Outstream, Placeholder } from "exoclick-react";

export default function BottomAd(){
    const divRef = useRef();

    function clickHandle(){
        divRef.current.style.display = 'none'
    }

    return (
    <>
        <div ref={divRef} onClick={clickHandle} className="bottom-ad">
            <Placeholder width="400" height="225">
                <Outstream zoneId="4499630" maxWidth={400} branding={false}/>
            </Placeholder>
        </div>
    </>)

}