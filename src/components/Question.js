import React from "react";
import { useSelector }  from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Media, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

function Question (props) {
    const users = useSelector(state => state.users)
    
    const orderedQues = props.allQues.sort((a, b) => b.timestamp - a.timestamp)

    return (
        <div>    
        {orderedQues.map((ques) =>
            <Media tag='li' key={ques.id} height='100' className='badge-light' style={{
                margin: 10,
                maxWidth: 500,
                borderRadius: '20px'
            }}>
               <Media left middle>
                <Media  object src={users[ques.author].avatarURL} alt={ques.author}
                style={{maxHeight: 130,
                        maxWidth: 130,
                        borderRadius: '70px',
                        margin: '10px'
                }} />
            </Media>
            <Media body className='ml-2'>
                <Media heading>
                {users[ques.author].name} asks would you rather
                </Media>

                {ques.optionOne.text}
                <br/>
                {ques.optionTwo.text}
                <br />
                
                <Link to={`/questions/${ques.id}`} >
                    <Button>View Poll</Button>
                </Link>
            </Media>
        </Media>
        )}
        </div>

    );
}

export default Question