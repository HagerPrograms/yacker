export default function Ticker(props){
    return <>
    <div className="ticker-container">
        <div className="ticker-background">
            <div className="ticker-content">   
                <div>
                    <span className="top-school-text">{"Top"}</span>
                    {` posts: #1 ${'FIRST PLACE POST TITLE'} @ ${'POST SCHOOL'} ${'NUMBER OF REPLIES'} ${'POST LINK'} #2 ${'SECOND PLACE POST TITLE'} @ ${'POST SCHOOL'} ${'NUMBER OF REPLIES'} ${'POST LINK'} #3 ${'THIRD PLACE POST TITLE'} @ ${'POST SCHOOL'} ${'NUMBER OF REPLIES'} ${'POST LINK'}
                    `} 
                </div>
                <div>
                    <span className="hottest-post-text">{"Hottest "}</span>
                    {``}
                </div>
            </div>
        </div>
    </div>
    </>
}