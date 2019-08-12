import * as React from 'react';
import {BrowserRouter, Route,Redirect} from 'react-router-dom';
import AddBook from 'src/Components/Add';
import BookList from 'src/Components/Display';
import Login from 'src/Components/Authentication'  // returns custom facebook login button
import SearchArea from 'src/Components/Search';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook}  from "@fortawesome/free-brands-svg-icons";
import {faTwitter}  from "@fortawesome/free-brands-svg-icons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';


interface IState {
  bookList: object,
  displayURL: string,
  updateBookList: any,
  useremail:any,
  username: string;
  userpic: string;
  webdisplayURL: string,
}

class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      bookList: [],
      displayURL: "http://books.google.com/books/content?id=wHlDzHnt6x0C&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE718wKanhUTdKoWOqfWaNugeH4NG0jq1lYmuOY8t6QbtuMXLCMIzWs-5xgKZ1JPWjoHfXkCKfL159PNA3WBYFZYh-bX9jAw-qRjN2SMdzfrSh38qqCkBZUMmqgbLZ3-5FtMcDu9e&source=gbs_api",
      updateBookList: null,
      useremail: "",
      username: "",
      userpic: "",
      webdisplayURL: "https://books.google.co.nz/books?id=wHlDzHnt6x0C&printsec=frontcover&dq=harry+potter+and+the+prisoner+of+azkaban&hl=en&sa=X&ved=0ahUKEwid9_eN0PDjAhVKSX0KHRVlDdMQ6AEIKjAA#v=onepage&q=harry%20potter%20and%20the%20prisoner%20of%20azkaban&f=false" ,     // need display weburl to share link to social media
    }
  }

  public addBook = (url: string) => {
    const body = {"url": url}
    fetch("https://bookapidevops.azurewebsites.net/api/Books", {
      body: JSON.stringify(body),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => {
     if(response.ok){    // returns boolean stating whether response was successful/ not 200
       return response.json();
     }else{
       throw new Error(); 
     }
  })
    .then((result) => {this.state.updateBookList(result)
                 alert("Book has been added")})
    .catch(() => {
      alert("Invalid Google Book URL. Please try again")})
}


  public listMounted = (updates: any) => {
    this.setState({ updateBookList: updates})
  }


  public updateURL = (url: string) => {   // to change book we are displaying
    if(this.state.displayURL === url){    // check if its already displayed
      this.setState({displayURL : ""},() => this.setState({displayURL: url}))
    }else{
      this.setState({displayURL:url})
    }
  }

  public updatewebURL = (url: string) => {   // grab the display url
    if(this.state.webdisplayURL === url){    
      this.setState({webdisplayURL : ""},() => this.setState({displayURL: url}))
    }else{
      this.setState({webdisplayURL:url})
    }
  } 

 
  public getname = (name: string) => {
     this.setState({username:name});
     console.log(this.state.username)
  } 

  public getemail = (emailaddress: string) => {
    this.setState({useremail:emailaddress}); 
    console.log(this.state.useremail)
 } 

   public getProfile = (url: string) => {
    this.setState({userpic:url}); 
    console.log(this.state.userpic)
 } 

 public render() { 
    return (
    <BrowserRouter> 
        <div>
          <Redirect to = "/Login"/>  
          <Route path = "/Login" exact = {true} render={() => <Login name = {this.getname} email = {this.getemail} picture = {this.getProfile}/>}/>
          
          <Route path = "/" exact = {true} render={()=>{return(
     
                 <div className="container">

                     <div className = "header"><h4 className = "login-greeting">Welcome {this.state.username}</h4><img className = "fb-user-pic" src={this.state.userpic}/></div>
                      
                         <div className = "mainsection">
                             <AddBook newBook={this.addBook} />
                         </div>

                      <Grid container={true} alignItems="center" justify="center">
                          <Grid item={true} xs = {8} sm ={9} md = {9}>  
                              <Card className = "list-card">
                                  <CardContent>
                                      <div className="section1">
                                          <BookList display={this.updateURL} mount={this.listMounted} displayurl={this.updatewebURL}/>
                                      </div>
                                  </CardContent>
                              </Card>
                          </Grid>
                   
                     <div className = "section2">
                          <div className= "book-container">
                              <img className="book" src={this.state.displayURL}/>
                          </div>
                          <table className = 'social-table'>
                              <h1 className = "share-heading"> Share Book </h1>
                                  <td className = "fbShare" onClick={() => window.open("http://www.facebook.com/sharer/sharer.php?u="+ this.state.webdisplayURL,"width = 100", "height = 100") } > 
                                      <FontAwesomeIcon className = "facebook" icon = {faFacebook} size="2x" color="#4968ad"/>
                                  </td>
                                  <td className = "twitterShare" onClick={() => window.open("https://twitter.com/intent/tweet?url="+ this.state.webdisplayURL, "width = 100", "height = 100") } > 
                                      <FontAwesomeIcon className = "twitter" icon = {faTwitter} size="2x" color="#49a1eb" />
                                  </td>
                          </table> 
                    </div>
                   
                   <Grid item={true} xs = {8} sm ={9} md = {9}> 
                       <Card className = "search-card">
                           <CardContent>
                               <td className="section3" >
                                   <SearchArea  display={this.updateURL}  />
                              </td>
                          </CardContent>
                       </Card>
                   </Grid>
               </Grid> 
                  <div className = "filler"/>
        </div>
      )}} />
    </div> </BrowserRouter>)
  }
}
export default App;