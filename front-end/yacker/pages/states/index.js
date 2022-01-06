import Link from 'next/link'
import Head from 'next/head'
import TopBanner from '../../components/banner'
import Nav from '../../components/Nav'
import StateData from '../../../data/states-data.json';
import StateSelector from '../../components/state-selector';
import BottomAd    from "../../components/bottomAd"


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
        <Head>
    	    <meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
            <meta name="description" content="Select the state your University is in."/>
            <title>Yacker: Which state is your university in?</title>
        </Head>
        <Nav loggedIn={false}/>
        <div className="welcome-container">
            <h1 className="state-header">Which state is your university in?</h1>
            <StateSelector/>
        </div>


        {//<BottomAd/>
        }
        </>
    )
}
