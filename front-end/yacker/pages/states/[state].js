import Nav from "../../components/Nav"
import schools from "../../../data/schools.json"
import states from "../../../data/stateabbr.json"
import Link from "next/link"
import {useRouter} from 'next/router'

export default function State(props){
    
    const stateSchools = schools.filter((school)=> {
        return (school.state === props.state) ? 1 : 0;
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
    <Nav states={true}></Nav>
    <h1 className="list-header">Select your school:</h1>
    <ul>
        {schoolList}
    </ul>
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
        names.push('/states/' + state.abbr);
    })
    
    return {
        paths: names,
        fallback: false
    }
}