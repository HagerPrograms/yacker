import Link from 'next/link'
import TopBanner from '../../components/banner'
import Nav from '../../components/Nav'
import StateData from '../../../data/states-data.json';
import StateSelector from '../../components/state-selector';
import { StickyBanner, Banner, Outstream, Placeholder } from "exoclick-react";


export default function StateList() {
    
    const stateList = StateData.map((state) =>{

        return (
            <>
            <Link href={`/states/`+ state.abbr}>
                <a className="state-list">{state.name}</a>
            </Link>
            </>
        )
    })
    
    
    return (
        <>
        <Nav loggedIn={false}/>
        <div className="class-wrapper">
        <h1 className="state-header">Choose your state:</h1>
        <StateSelector/>
        </div>


        <div className="bottom-ad">
            <Placeholder width="435" height="266">
                <Outstream zoneId="4499630" maxWidth={400}/>
            </Placeholder>
        </div>
        </>
    )
}
