import React from 'react'
import { useParams, Route, Link } from 'react-router-dom';
import { Fragment } from 'react';
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import useHttp from '../hooks/hooks/use-http';
import { getSingleQuote } from '../lib/lib/api';
import { useEffect } from 'react/cjs/react.production.min';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function QuoteDetail() {
    const params = useParams();
    const match =   useRouteMatch()
    const { sendRequest, status, data: loadedQuote, error} =  useHttp(getSingleQuote, true)

    const { quoteId} = params
    useEffect(() => {
        sendRequest(quoteId)
    }, [quoteId, sendRequest])

    if(status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner/>
        </div>
    }
    if(error) {
        return <p className='centered'>{error}</p>
    }
    if(!loadedQuote.text) {
        <p>Quote not fount!</p>
    }
    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
                <Route path={`/quotes/${params.quoteId}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
                </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    )
}
export default QuoteDetail;