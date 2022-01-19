import { useState } from 'react'
import Link from 'next/link'

export default function Ticker(){

    const [loading, setLoading] = useState(true);
    const [feed, setFeed] = useState(
        () => 
        <>
        <div className="ticker-content loading">
            <h3 className="ticker-item">Retrieving top posts...</h3>   
        </div>
        </>
    );

    function loadingHandler(){
        setLoading(() => false)
    }

    function feedHandler(data){
        setFeed(() => {
            let feed = data.map((e, position) => {
                return (<>
                    <h3 className="ticker-item">{`#${position + 1} Hottest post: `}</h3>
                    <h3 className="ticker-item">{" " + e.content}</h3>
                    <Link href={"/" + e.school}>
                        <a className="ticker-item link">{"/" + e.school}</a>
                    </Link>
                    <Link href={"/" + e.school + "/" + e.id}>
                        <a className="ticker-item link">{"Click here to go to post."}</a>
                    </Link>
                </>)
            })
            
            return (<>
                <div className="ticker-content">
                    {feed}
                </div>
            </>)
        })
    }
    
    if(loading){
        getTop().then(data => {
            loadingHandler()
            feedHandler(data);
        })
    }


    return <>
        <div className="ticker-container">
            <div className="ticker-background">    
                {feed}
            </div>
        </div>
    </>
}

async function getTop(){

    const graphqlQuery = {
        query: `
        {
            getTop{
              id
              school
              content
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

    const { data } = await payload.json();

    return data.getTop;
}