import React, {useState} from "react";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Media, Button} from 'reactstrap';
import { Link, Route, Switch } from 'react-router-dom';
import ViewPoll from './ViewPoll';

function Question (props) {
    const users = useSelector(state => state.users)

    const [quesId, changeQid] = useState('')

    const handleChange = (a) => {
        changeQid(a)
    }
    
    
    return (
        <div>    
        {props.allQues.map((ques) =>
            <Media tag='li' height='100' style={{
                margin: 10,
                maxWidth: 500
            }}>
               <Media left middle>
                <Media object src={users[ques.author].avatarURL} alt={ques.author}
                style={{maxHeight: 150,
                        maxWidth: 150
                }} />
            </Media>
            <Media body className='ml-2'>
                <Media heading>
                {ques.author} asks would you rather
                </Media>

                {ques.optionOne.text}
                <br/>
                {ques.optionTwo.text}
                <br />
                
                <Link to={`/questions/${ques.id}`} onClick={() => changeQid(ques.id)} >
                    <Button>View Poll</Button>
                </Link>
            </Media>
        </Media>
        )}
        </div>

    );
}

export default Question