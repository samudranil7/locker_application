import React, { Component } from 'react'
import UserService from '../services/UserService'
import AuthService from "../services/auth.service";
export default class ShowBankStarter extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            ccode:"",
            ocode:"",
            id:"",
            emails:[],
            emailobj:{},
            passkey: false,
            auth:false,     
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.codeHandler = this.codeHandler.bind(this);
    }
    codeHandler()
    {
        if(this.state.ccode===this.state.ocode)
        {
            this.setState({
                passkey:false,
                auth:true    
            })
        }
        else
        {
            alert("Passkey is incorrect")
        }
        
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
            UserService.getEmail(currentUser.id).then((res)=> {
                this.setState({emails:res.data});
            });
        }
    }
    changeHandler(event)
    {
        this.setState({
            ccode:event.target.value
        })
    }
    clickHandler(data)
    {
        this.setState({
            auth:false,
            passkey:true,
            ccode:"",
            ocode:data.passcode,
            emailobj:data,
            id:data.id
        })
    }
    
    render() {
        const {passkey,auth,emailobj} = this.state 
        return (
            <div>
                <h2 className="text-center"> Email Account Details </h2>
                {this.state.emails.length==0 && (
                        <h2 className="text-center"> No Account to Show </h2>
                )}
                <div className="row">
                {this.state.emails.length>0 && (
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Name of Vendor</th>
                                <th> Action </th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.emails.map(
                                    email=>
                                    <tr key={email.id}>
                                        <td> {email.id}</td>
                                        <td> {email.vendor}</td>
                                        <td> <button className="btn btn-primary" onClick={ () => this.clickHandler(email) }> Enter Code </button></td>   
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    )}
                    {passkey &&(
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.id}</td>
                                <td> Enter Passcode <input type="password" value={this.state.ccode} onChange={this.changeHandler}/>
                                &nbsp; <button className="btn btn-primary" onClick={()=> this.codeHandler()}> Show Account Details </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    )}
                    {auth &&(
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <td> Holder Name </td>
                                <td> Account Number </td>
                                <td> Bank Name </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{emailobj.vendor}</td>
                                <td>{emailobj.email}</td>
                                <td>{emailobj.password}</td>
                            </tr>
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
        )
    }
}
