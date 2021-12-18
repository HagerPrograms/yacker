import { useState } from 'react'

export default function Ticker(props){

    const [loading, setLoading] = useState(true);

    function loadingHandler(){
        setLoading(() => false)
    }

    getTop().then((data) => {
        console.log(data);
    })

    return <>
    <div className="ticker-container">
        <div className="ticker-background">
            <div className="ticker-content">   
                <div>
                    <span className="top-school-text">{"Top"}</span>
                    {` schools: #1 ${'New Mexico State University'} /nmsu, #2 ${`University of New Mexico`} /unm, #3 ${'Western New Mexico University'} /wnmu`}
                </div>
                <div>
                    <span className="hottest-post-text">{"Hottest "}</span>
                    {` posts: #1 ${'FIRST PLACE POST TITLE'} @ ${'POST SCHOOL'} ${'NUMBER OF REPLIES'} ${'POST LINK'} #2 ${'SECOND PLACE POST TITLE'} @ ${'POST SCHOOL'} ${'NUMBER OF REPLIES'} ${'POST LINK'} #3 ${'THIRD PLACE POST TITLE'} @ ${'POST SCHOOL'} ${'NUMBER OF REPLIES'} ${'POST LINK'}
                    `} 
                </div>
            </div>
        </div>
    </div>
    </>
}

async function getTop(){

    const graphqlQuery = {
        query: `
        {
            getTop{
                posts{
                    title
                    school
                    number of replies
                }
            }
        }
          
        `
    }

    const payload = await fetch('http://yacker.co:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })

    const data = await payload.json();
    console.log("DATA: ", data);

    return data;
}