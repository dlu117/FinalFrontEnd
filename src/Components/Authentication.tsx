// Social (FaceBook) Authentication

import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
import {withRouter} from 'react-router-dom'
import logo from "src/book.jpg"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';


interface IState{
  email:string,       // didn't end up using useremail in App.tsx   
  name:string,
  picture:string
}

interface IProps{
    history:any,
    name: any,
    email:any,
    picture:any
  }
  
class Login extends React.Component<IProps,IState>{
    public constructor(props:any){
        super(props);
        this.state = {   // object takes empty array 
            email: "",
            name: "",
            picture: ""
        }
    } 

    public componentClicked =()=>{console.log("clicked")
       // won't be doing anything when component is clicked
     }

    public responseFacebook =(response:any)=>{
      this.setState({
           email:response.email,   
           name: response.name,
           picture:response.picture.data.url }) // successful login 
      
         if(this.state.name === undefined && this.state.email === undefined){
          this.props.history.push("/Login")  
         }
         else{
          this.passName(this.state.name),
          this.passEmail(this.state.email),
          this.passPic(this.state.picture),
          this.props.history.push("/")   
        } 
     }

    public passName=(person:string)=>{
        this.props.name(person);
     }
    
    public passEmail=(address:string)=>{
      this.props.email(address);
    }

    public passPic=(picurl:string)=>{
      this.props.picture(picurl);
    }

    public render() {
       
        return (
            <div>
             
                <div className= "login-container">
                  <div className = "login-header"><h3 className = "login-header-title">BookWorm</h3> </div>
                    
                    <div className = "login-grid">
                      <Grid container={true} alignItems="center" justify="center">
                        <Grid item={true} xs = {6} sm ={4} md = {4} >  
                            <Card className = "login-card" >
                             <CardContent>
                              <div className = "log-in-logo">
                               <img className = "loginlogo" src = {logo} />
                              </div>
                               <div className = "fb-login-container">
                                <FacebookLogin
                                 appId="445916619335314"
                                 autoLoad={false}   // if true then button will open without click
                                 fields="name,email,picture"
                                 onClick={this.componentClicked}
                                 redirectUri = "https://bookwormapp.azurewebsites.net"
                                 callback={this.responseFacebook}/>
                               </div>
                            </CardContent>
                           </Card>
                        </Grid>
                      </Grid>
                   </div>

                </div> 
             </div>  
        )
    }
}

export default withRouter(Login); // allows use of props.history