import Nav         from "../../components/Nav"
import schools     from "../../../data/schools.json"
import states      from "../../../data/stateabbr.json"
import stateData   from "../../../data/states-data.json"
import BottomAd    from "../../components/bottomAd"
import Link        from "next/link"
import Head        from 'next/head'
import {useRouter} from 'next/router'
import { StickyBanner, Banner, Outstream, Placeholder } from "exoclick-react";


export default function State(props){
    
    const stateSchools = schools.filter((school)=> {
        return (school.state.toLowerCase() === props.state.toLowerCase()) ? 1 : 0;
    })
    
    const schoolList = stateSchools.map((school) => {
        return <li key={school.abrv} className="school-list">
            <Link href={"/" + school.abrv}>
            {school.school}
            </Link>
            </li>
    })

    return(
    <>
    <Head>
    	<meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
        <meta name="description" content="Select your university, so you can begin to post to your university's Yacker page.
        "/>
        <title>{"Colleges in " + props.fullState + ":"}</title>
    </Head>
    <Nav states={true} loggedIn={false}/>
    <div className="content-container">
        <h1 className="list-header">{"Colleges in " + props.fullState + ":"}</h1>
        <ul>
            {schoolList}
        </ul>
    </div>
    {
    //<BottomAd/>
    }
    </>
    )
}

export async function getStaticProps(context){
    
    const {state} = context.params;
    
    const fullState = stateData.find((element) => element.abbr === state.toUpperCase())

    console.log(fullState)
    
    return {props: {
        state: state,
        fullState: fullState.name
    }}
}

export async function getStaticPaths(context){
    let names = [];
    
    states.map((state)=> {
        names.push('/states/' + state.abbr.toLowerCase());
    })
    
    return {
        paths: names,
        fallback: false
    }
}