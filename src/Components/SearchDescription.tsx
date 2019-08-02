// Searching book by entering a word from description

import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'
import * as React from 'react'

interface IState {
    input: string,
    result: any,
    body:any,
}

interface IProps {
    currentbook:any,
    display: any
}

export default class SearchArea extends React.Component<IProps, IState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            body: [],
            input: "",
            result: [],
        }
    }
        

    public search = () => {
        if(this.state.input.trim() === ""){
            this.setState({result:[]},()=>this.makeTableBody())
        }else{
            fetch("https://bookapidevops.azurewebsites.net/api/Books/SearchByWords/"+this.state.input, {
                headers: {
                  Accept: "text/plain"
                },
                method:"GET"
            }).then(response => {
                return response.json()
            }).then(answer => {
                this.setState({result:answer},()=>this.makeTableBody())
            })
        }
    }

    public handleTableClick = (bookUrl:any) => {
        this.props.display(bookUrl)
    }

    // will need to change
    public makeTableBody = () => {
        const toRet: any[] = [];
        this.state.result.sort((a:any, b:any)=>{
            if(a.webUrl === b.webUrl){
                return 0;
            }else if(a.webUrl === this.props.currentbook){
                return -1;
            }else if(b.webUrl === this.props.currentbook){
                return 1;
            }
            else{
                return a.bookTitle.localeCompare(b.bookTitle);
            }
        })

        this.state.result.forEach((book: any) => {
            book.word.forEach((word: any) => {

                toRet.push(
                    <tr onClick={() => this.handleTableClick(book.thumbnailUrl)}>
                        <td>{word.word1}</td>
                        <td> <img src={book.thumbnailUrl} width="30px"/></td>
                        <td>{book.bookTitle}</td>
                    </tr>)


            })
        });
        if (toRet.length === 0) {
            if(this.state.input.trim() === ""){
                const errorCase = <div><p>Please enter word :)</p></div>
                this.setState({body:errorCase})
            }else{
                const errorCase = <div><p>No Book Found "{this.state.input}"</p></div>
                this.setState({body:errorCase})
            }
        }
        else{
            this.setState({body:toRet})
        }
    }

    public render() {
        return (
            <div className="caption-area">
                <div className="row">
                    <div className="col-2 justify-content-center align-self-center">
                        <h1><span className="red-heading">search</span>caption</h1>
                    </div>
                    <div className="col-10">
                        
                        <TextField
                            id="Search-Bar"
                            className="SearchBar"
                            placeholder="Search Captions"
                            margin="normal"
                            variant="outlined"
                            onChange={(event: any) => this.setState({ input: event.target.value })}
                            value={this.state.input}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => this.search()}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </div>
                </div>
                <br />
                <table className="table">
                    <tr>
                        <th>Book</th>
                    </tr>
                    <tbody className="captionTable">
                        {this.state.body}
                    </tbody>
                </table>
            </div>
        )
    }
}  