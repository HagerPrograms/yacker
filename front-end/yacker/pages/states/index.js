import Link from 'next/link'
import Banner from '../../components/banner'
import Nav from '../../components/Nav'
import StateData from '../../../data/states-data.json';
import StateSelector from '../../components/state-selector';

export default function StateList() {
    
    const stateList = StateData.map((state) =>{
        return (
            <>
            <Link href={`/states/`+state.abbr}>
                <a className="state-list">{state.name}</a>
            </Link>
            </>
        )
    })
    
    
    return (
        <>
        <Nav/>
        <h1 className="state-header">Choose your state:</h1>
        <StateSelector/>
        </>
    )
}
