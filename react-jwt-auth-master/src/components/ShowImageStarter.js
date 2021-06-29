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
            images:[],
            imgobj:{},
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
            UserService.getImage(currentUser.id).then((res)=> {
                this.setState({images:res.data});
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
            imageobj:data,
            id:data.id
        })
    }
    
    render() {
        const {passkey,auth,imageobj} = this.state 
        return (
            <div>
                <h2 className="text-center"> Image Locker Details </h2>
                {this.state.images.length==0 && (
                        <h2 className="text-center"> No Account to Show </h2>
                )}
                <div className="row">
                {this.state.images.length>0 && (
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Image Header </th>
                                <th> Action </th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.images.map(
                                    image=>
                                    <tr key={image.id}>
                                        <td> {image.id}</td>
                                        <td> {image.header}</td>
                                        <td> <button className="btn btn-primary" onClick={ () => this.clickHandler(image) }> Enter Code </button></td>   
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
                                <td> Header </td>
                                <td> Image </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{imageobj.header}</td>
                                <td> <img src={imageobj.link} alt="BigCo Inc. logo"/> </td>
                            </tr>
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
        )
    }
}
