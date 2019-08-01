import * as React from 'react';
import BookList from 'src/Components/BookList';



interface IState {
  bookList: object,
  displayer: any,
  displayURL: string,
  updateBookList: any
}

// hjh
class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      bookList: [],
      displayURL: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",   // Initial no book displayed
      displayer: null,
      updateBookList: null
     
    }
  }

  public setRef = (playerRef: any) => {
    this.setState({
      displayer: playerRef
    })
  }

  public addVideo = (url: string) => {
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
  public render() {
    return (<div>
    
      <div className="container">
        <div className="row"> 
        
          
              <img src={this.state.displayURL}
              width="150"
              height="200px"
              
            />
          <div className="col-4">
          <BookList display={this.updateURL} mount={this.listMounted} />
          </div>
        </div>
        
      </div>
    </div>)
  }
 
}
export default App;
