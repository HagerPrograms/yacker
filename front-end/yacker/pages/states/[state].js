import Nav         from "../../components/Nav"
import schools     from "../../../data/schools.json"
import states      from "../../../data/stateabbr.json"
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
        <title>Select your school.</title>
    </Head>
    <Nav states={true} loggedIn={false}></Nav>
    <div className="class-wrapper">
        <h1 className="list-header">Select your school:</h1>
        <ul>
            {schoolList}
        </ul>
    </div>
    <div className="bottom-ad">
            <Placeholder width="400" height="266">
                <Outstream zoneId="4499630" maxWidth={400}/>
            </Placeholder>
    </div>
    </>
    
    )
}

export async function getStaticProps(context){
    
    const {state} = context.params;
    
    return {props: {
        state: state
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