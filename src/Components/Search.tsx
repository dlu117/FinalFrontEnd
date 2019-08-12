import MediaStreamRecorder from 'msr';
import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddVoice from '@material-ui/icons/KeyboardVoice';
import Search from '@material-ui/icons/Search'    ;


interface IState {
    result: any,
    resultlist:any,
    speechinput: string,
    wordinput: string,
}

interface IProps {
    display: any
}

let accessToken: any;

export default class SearchArea extends React.Component<IProps, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            result: [],
            resultlist: [],
            speechinput: "",
            wordinput: ""
        }
    }
    
    // using documentaion from msr package

    public speechsearch = () => {
        const mediaConstraints = {     // search by audio
            audio:true
          };
        const onMediaSuccess=(stream:any) =>{
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = "audio/wav"; 
            mediaRecorder.ondataavailable = (blob: any) => {  // audiofile
              
              // get access token 
              fetch("https://southcentralus.api.cognitive.microsoft.com/sts/v1.0/issueToken", {
                    headers: {
                    'Content-Length': '0',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Ocp-Apim-Subscription-Key': '3dec8c82f6ad4edb9706d601ee307cfd'
                    },
                    method: 'POST'
                }).then((response) => {
                   return response.text() 
                }).then((response) => {
                   accessToken = response   // will need a new access token each time you make a call to the API
                });

                // post to azure cognitive service API to get back response and convert to text
                fetch("https://southcentralus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US", {
                    body: blob, // this is a .wav audio file    
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer' + accessToken,
                        'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                        'Ocp-Apim-Subscription-Key': '3dec8c82f6ad4edb9706d601ee307cfd'
                    },    
                    method: 'POST'
                    
                }).then((response) => {return response.json()
                }).then((response) => {
                     // response.DisplayText returns word with dot, need to cut it out
                     this.setState({speechinput: response.DisplayText.slice(0,-1)});
                 
                    // then use search in our own database
                    if(this.state.speechinput.trim() === ""){
                        alert("Please Say Something")
                    }else{
                        fetch("https://bookapidevops.azurewebsites.net/api/Books/SearchByWords/"+this.state.speechinput, {
                            headers: {
                              Accept: "text/plain"
                            },
                            method:"GET"
                        }).then((r) => {
                            if(r.ok){
                                return r.json();
                            }
                            else{
                                throw new Error();
                            }
                        }).then(data => {
                            this.setState({result:data} ,()=>this.processresult()) // Go to Search description this.function, the function does not take any parameters
                        })
                        .catch(()=>{
                            alert("Error. Please try again")
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })
            , mediaRecorder.stop()
         }
            mediaRecorder.start(3000);
        }
        
        const onMediaError=(error:any) =>{alert("Sorry Didn't Catch that Please Try Again")}

        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
      }


    public typesearch = () => {
        if(this.state.wordinput.trim() === ""){
            alert("Please Enter a Word")
        }else{
            fetch("https://bookapidevops.azurewebsites.net/api/Books/SearchByWords/"+this.state.wordinput, {
                headers: {
                  Accept: "text/plain"
                },
                method:"GET"
            }).then((response) => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error();
                }
            }).then(data => {
                this.setState({result:data} ,()=>this.processresult()) // The function does not take any parameters
            })
            .catch(()=>{
                alert("Error. Please try again")
            })
        }
    }
    
    public searchClick = (bookUrl:any) => {        // thumbnail URL
        this.props.display(bookUrl)                // passes to app.tsx
    }
    
    public processresult = () => {
        const booklist: any[] = [];
        this.state.result.forEach((book:any) => {
            book.word.forEach((word:any) => {
                booklist.push(
                    <tr className = "result-table">
                        <td className = "searchword">{word.word1}</td>
                        <td className = "searchpic" onClick={() => this.searchClick(book.thumbnailUrl)}> <img src={book.thumbnailUrl} width="30px"/></td>
                        <td className = "searchtitle" onClick={() => this.searchClick(book.thumbnailUrl)}>{book.bookTitle}</td>
                        <td className = "searchauthor">{book.bookAuthor}</td> 
                        <td className = "searchpage">{book.bookPages}</td>   
                    </tr>)
            })
        });
        if (booklist.length === 0) {
            alert("No Match Found");
        }
        else{
            this.setState({resultlist:booklist})
        }
    }

    public render() {
        return (
            <div className="search-area">
                
                <div className="search-bar">
                    <div className="search-title">
                     <h1>Search Book Shelf</h1>
                    </div>
                   
                    <div className="search-area">
                     <TextField
                      className="search-field"
                      placeholder="Books by Description"
                      margin="normal"
                      variant="filled"
                      onChange={(e: any) => this.setState({ wordinput: e.target.value })}
                      value={this.state.wordinput} // for typesearch 
                      InputProps={{
                      endAdornment: 
                      <InputAdornment position="end">
                        <IconButton onClick={() => this.typesearch()}><Search /></IconButton>
                        <IconButton onClick={() => this.speechsearch()}><AddVoice /></IconButton>
                       </InputAdornment>
                            }}
                        />
                    </div>
                </div>
               <table className="search-table">
                <tr>
                 <th/>
                  <th className = "search-table-heading">Book</th>
                 <th/>
                  <th className = "search-table-heading">Author</th>
                  </tr>
                  <tbody className="search-body">
                   {this.state.resultlist}
                  </tbody>
               </table>

            </div>
        )
    }
}  