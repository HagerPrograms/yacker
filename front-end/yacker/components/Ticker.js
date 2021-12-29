import { useState } from 'react'
import Link from 'next/link'

export default function Ticker({topPosts}){

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
            return (<>
                <div className="ticker-content">
                    <h3 className="ticker-item">{"#1 Hottest post: "}</h3>
                    <h3 className="ticker-item">{" " + data[0].content}</h3>
                    <Link href={"/" + data[0].school}>
                        <a className="ticker-item link">{"/" + data[0].school}</a>
                    </Link>
                    <Link href={"/" + data[0].school + "/" + data[0].id}>
                        <a className="ticker-item link">{"Post Link"}</a>
                    </Link>

                    <h3 className="ticker-item">{"#2 Hottest post: "}</h3>
                    <h3 className="ticker-item">{" " + data[1].content}</h3>
                    <Link href={"/" + data[1].school}>
                        <a className="ticker-item link">{"/" + data[1].school}</a>
                    </Link>
                    <Link href={"/" + data[1].school + "/" + data[1].id}>
                        <a className="ticker-item link">{"Post Link"}</a>
                    </Link>

                    <h3 className="ticker-item">{"#3 Hottest post: "}</h3>
                    <h3 className="ticker-item">{" " + data[2].content}</h3>
                    <Link href={"/" + data[2].school}>
                        <a className="ticker-item link">{"/" + data[2].school}</a>
                    </Link>
                    <Link href={"/" + data[2].school + "/" + data[2].id}>
                        <a className="ticker-item link">{"Post Link"}</a>
                    </Link>

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