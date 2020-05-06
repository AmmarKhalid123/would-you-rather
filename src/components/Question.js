import React, {useState} from "react";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Media, Button} from 'reactstrap';
import { Link} from 'react-router-dom';

function Question (props) {
    const users = useSelector(state => state.users)

    return (
        <Media tag='li' height='100' style={{
            margin: 10,
            maxWidth: 500
        }}>
            <Media left middle>
                <Media object src={users[props.ques.author].avatarURL} alt={props.ques.author}
                style={{maxHeight: 150,
                        maxWidth: 150
                }} />
            </Media>
            <Media body className='ml-2'>
                <Media heading>
                {props.ques.author} asks would you rather
                </Media>

                {props.ques.optionOne.text}
                <br/>
                {props.ques.optionTwo.text}
                <br />
                <Link to={`/home/${props.ques.id}`} onClick={props.change(props.status, props.ques)}>
                    <Button>View Poll</Button>
                </Link>
            </Media>
        </Media>
    );
}

export default Question