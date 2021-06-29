import React, { Component } from 'react'
import UserService from '../services/UserService';
import AuthService from "../services/auth.service";

export default class AddBankDetails extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            currentUser:undefined,
            name:'',
            accname:'',
            accnum:'',
            ifsc:'',
            ccode:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAccnameHandler = this.changeAccnameHandler.bind(this);
        this.changeAccnumHandler = this.changeAccnumHandler.bind(this);
        this.changeIfscHandler = this.changeIfscHandler.bind(this);
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
        let bank = {uid:this.state.currentUser.id,bank_name:this.state.name, accName:this.state.accname, accNum:this.state.accnum,ifsc:this.state.ifsc,passcode:this.state.ccode};
        UserService.addBank(bank).then(res=>{
            this.props.history.push("/show_bank_sub")
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
    changeAccnumHandler=(event)=>
    {
        this.setState({
            accnum:event.target.value
        })
    }
    changeIfscHandler=(event)=>
    {
        this.setState({
            ifsc:event.target.value
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
                        <h3 className='text-center'> Add Bank </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> Name of Bank </label>
                                    <input placeholder='Enter the Name of the Bank Here' className='form-control'
                                        value={this.state.name} onChange={this.changeNameHandler}/>
                                    <label> Account Holder Name </label>
                                    <input placeholder='Enter Holder Name' className='form-control'
                                        value={this.state.accname} onChange={this.changeAccnameHandler}/>
                                    <label> Account Number </label>
                                    <input placeholder='Enter Account Number Here' className='form-control'
                                        value={this.state.accnum} onChange={this.changeAccnumHandler}/>
                                    <label> IFSC Code </label>
                                    <input placeholder='Enter IFSC Collected' className='form-control'
                                        value={this.state.ifsc} onChange={this.changeIfscHandler}/>
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
