import * as React from 'react';
import BookList from 'src/Components/BookList';
import ReactPlayer from 'react-player';


interface IState {
 // displayer: any,
  updateBookList: any,
  displayURL: string
  // videoList: object
}


class App extends React.Component<{}, IState>{
  public constructor(props: any) {
    super(props);
    this.state = {
      // displayer: null,
      displayURL: "",   // Initial no book displayed
      updateBookList: null
     // videoList: []
    }
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
          <div className="col-7">
            <ReactPlayer
              className="player"
              controls={true}
              url={this.state.displayURL}
              width="100%"
              height="400px"
              playing={true}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                  preload: true
                }
              }
              }
            />
          </div>
          <div className="col-5">
          <BookList display={this.updateURL} mount={this.listMounted} />
          </div>
        </div>
        
      </div>
    </div>)
  }
 
}
export default App;
