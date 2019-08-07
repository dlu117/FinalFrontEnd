import logo from "src/worm.jpeg"
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
      displayURL: "http://books.google.com/books/content?id=2sSMCwAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE72DcK8Ea7ZKW5PAi0e4Chti8RIAJyhv-N33iuPp60Us9WPC08x81PCQ3tCJ4Djg2AiqBEnH6Isy8vF948vqAen-fLfN-2S8fbuRyc_0Lgemt9HMtLoJQRb9bPhOned1wBnpZ9KK&source=gbs_api",
      displayer: null,
      updateBookList: null,
      webdisplayURL: "https://books.google.co.nz/books?id=2sSMCwAAQBAJ&printsec=frontcover&dq=harry+potter&hl=en&sa=X&ved=0ahUKEwjD9L72jPDjAhVEWX0KHcDMBqc4ChDoAQg0MAI#v=onepage&q=harry%20potter&f=false"      // need display weburl to share link to social media
     
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

        <div className = "header"> <img className = "logo" src = {logo}  width="40" height="40px"/></div>

        <AddBook addBook={this.addBook} />



        <div className="book"> 
              <img src={this.state.displayURL}
               width="200"
               height="300px" 
            />
        </div>

        <div className = 'social'>
          
            <td className = "fbShare" onClick={() => window.open("http://www.facebook.com/sharer/sharer.php?u="+ this.state.webdisplayURL,"width = 100", "height = 100") } > 
            <FontAwesomeIcon icon = {faFacebook} size="2x" color="#4968ad"/>
            </td>
           
            <td className = "twitterShare" onClick={() => window.open("https://twitter.com/intent/tweet?url="+ this.state.webdisplayURL, "width = 100", "height = 100") } > 
            <FontAwesomeIcon icon = {faTwitter} size="2x" color="#49a1eb" />
            </td>
           
        </div>
        
        
        <div className="col-2">
          <BookList display={this.updateURL} mount={this.listMounted} displayurl={this.updatewebURL}/>
        </div>
        
          <SearchArea currentbook={this.state.displayURL} display={this.updateURL}  />
      </div>
      
           
    </div>)
  }
 
}
export default App;
