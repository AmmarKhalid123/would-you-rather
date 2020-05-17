import React from 'react';
import { Card, CardTitle, CardText, Progress, Badge } from 'reactstrap'

//rendering the result of answered questions
export default function ResultCard ({opt, votes, outOf, urAns}) {
    const percent = (votes/outOf).toFixed(2);
    return(
            <Card body>
                <CardTitle>Would You Rather {urAns ? <Badge>Your Answer</Badge> : ''}</CardTitle>
                <CardText>{opt}</CardText>
                <div className='text-center'>{votes} out of {outOf}</div>
                <Progress value={percent*100} > {`${percent*100}%`}</Progress>
            </Card>
        );
}