import React, { Component } from 'react'
import UserService from '../services/UserService';
import AuthService from "../services/auth.service";
export default class AddImageDetails extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            currentUser:undefined,
            name:'',
            accname:'',
            ccode:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAccnameHandler = this.changeAccnameHandler.bind(this);
        this.changeCcodeHandler = this.changeCcodeHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    componentDidMount()
    {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) 
        {
            this.props.history.push("/login")
        }
        else
        {
            this.setState({ currentUser: currentUser, userReady: true })
        }
    }
    saveHandler=(event)=>
    {
        event.preventDefault();
        let image = {uid:this.state.currentUser.id,header:this.state.name, link:this.state.accname, passcode:this.state.ccode};
        UserService.addImage(image).then(res=>{
            this.props.history.push("/show_image_sub")
        });
    }
    changeNameHandler=(event)=>
    {
        this.setState({
            name:event.target.value
        })
    }
    changeAccnameHandler=(event)=>
    {
        this.setState({
            accname:event.target.value
        })
    }
    changeCcodeHandler=(event)=>
    {
        this.setState({
            ccode:event.target.value
        })
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className="card col-md-6 offset md-3 offset md-3">
                        <h3 className='text-center'> Add Image </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> Header </label>
                                    <input placeholder='Enter Image Header Here' className='form-control'
                                        value={this.state.name} onChange={this.changeNameHandler}/>
                                    <label> Link </label>
                                    <input placeholder='Enter Image Link Here' className='form-control'
                                        value={this.state.accname} onChange={this.changeAccnameHandler}/>
                                    <label> Passcode </label>
                                    <input type='password' placeholder="Enter Passcode" className='form-control' 
                                        value={this.state.ccode} onChange={this.changeCcodeHandler}/>
                                </div>
                                <button className="btn btn-success" onClick={this.saveHandler}> Save </button>
                            </form>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}
