import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Media, Button} from 'reactstrap'

const mapStateToProps = (state, props) => {
    return {
        users: state.users
    }
}

function Question (props) {
        return (
            <Media tag='li' height='100' style={{
                margin: 10,
                maxWidth: 500
            }}>
                <Media left middle>
                    <Media object src={props.users[props.ques.author].avatarURL} alt={props.ques.author}
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
                    <Button>View Poll</Button>
                </Media>
            </Media>



    //         <div>
    //             <Card className={classes.root}>
    //             <CardActionArea>
    //                 <CardMedia
    //                 className={classes.media}
    //                 image={props.users[props.ques.author].avatarURL}
    //                 title={props.ques.author}
    //                 />
    //                 <CardContent>
    //                 <Typography gutterBottom variant="h5" component="h2">
    //                     {props.ques.author} asks would you rather
    //                 </Typography>
    //                 <Typography variant="body2" color="textSecondary" component="p">
    //                     {props.ques.optionOne.text}
    //                 </Typography>
    //                 <p>or</p>
                    
    //                 <Typography variant="body2" color="textSecondary" component="p">
    //                     {props.ques.optionTwo.text}
    //                 </Typography>
    //                 </CardContent>
    //             </CardActionArea>
    //             <CardActions>
    //                 <Button size="small" color="primary">
    //                 View Poll
    //                 </Button>
    //             </CardActions>
    // </Card>
    //         </div>
            

    );
}

export default connect(mapStateToProps)(Question)