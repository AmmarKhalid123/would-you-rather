import React from 'react';
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Media, Button} from 'reactstrap';
import { Link} from 'react-router-dom';

export default function ViewPoll (props) {
    const {users} = useSelector((state) => ({
        users: state.users
    }))

    return(
        <Media height='100' style={{
            margin: 10,
            maxWidth: 500
        }}>
            <Media left middle>
                <Media object src={users[props.ques.author].avatarURL} alt={props.ques.author}
                style={{maxHeight: 150,
                        maxWidth: 150
                }} />
            </Media>
            {props.view === 'answered' ?
                <Media body className='ml-2'>
                <Media heading>
                {props.ques.author} asked would you rather
                </Media>

                {props.ques.optionOne.text}
                <br/>
                {props.ques.optionTwo.text}
                <br />
            </Media> :
    
            <Media body className='ml-2'>
                <Media heading>
                {props.ques.author} asks would you rather
                </Media>

                {props.ques.optionOne.text}
                <br/>
                {props.ques.optionTwo.text}
                <br />
            </Media>}
        </Media>
    
    
    );
}