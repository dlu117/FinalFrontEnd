import * as React from 'react';
// import ScrollAnimation from 'react-animate-on-scroll';
import AddBook from 'src/Components/AddBook';
import BookList from 'src/Components/BookList';
import SearchArea from 'src/Components/SearchDescription';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook}  from "@fortawesome/free-brands-svg-icons";
import {faTwitter}  from "@fortawesome/free-brands-svg-icons";

interface IState {
  bookList: object,
  displayer: any,
  displayURL: string,
  updateBookList: any,
  webdisplayURL: string,
}

class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      bookList: [],
      displayURL: "",
      displayer: null,
      updateBookList: null,
      webdisplayURL: ""      // need display weburl to share link to social media
     
    }
  }

  public setRef = (playerRef: any) => {
    this.setState({
      displayer: playerRef
    })
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
    }).then(() => {
       this.state.updateBookList();   // will call function within BookList
    })
  }

  public listMounted = (callbacks: any) => {
    this.setState({ updateBookList: callbacks })
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

 public render() {
    return (<div>
     
    <div className="container">
        

        <AddBook addBook={this.addBook} />

        <div className="book"> 
              <img src={this.state.displayURL}
               width="200"
               height="300px" 
            />
        </div> 
          
        <div className = "social">
            <td className = "fbShare" onClick={() => window.open("http://www.facebook.com/sharer/sharer.php?u="+ this.state.webdisplayURL,"width = 100", "height = 100") } > 
            <FontAwesomeIcon icon = {faFacebook} size="2x" color="#4968ad"/>
            </td>
           
            <td className = "twitterShare" onClick={() => window.open("https://twitter.com/intent/tweet?url="+ this.state.webdisplayURL, "width = 100", "height = 100") } > 
            <FontAwesomeIcon icon = {faTwitter} size="2x" color="#49a1eb"/>
            </td>
        </div>
            
           
      
          <div className="col-4">
          <BookList display={this.updateURL} mount={this.listMounted} displayurl={this.updatewebURL}/>
          </div>
        
          <SearchArea currentbook={this.state.displayURL} display={this.updateURL}  />
      </div>
      
           
    </div>)
  }
 
}
export default App;
