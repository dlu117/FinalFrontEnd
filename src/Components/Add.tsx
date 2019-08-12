// Takes in Google Book URL and adds it to Book List
// Alert if response is invalid in App.tsx addbook function

import logo from "src/book.jpg"
import IconButton  from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import AddCircle from '@material-ui/icons/AddCircle'
import * as React from 'react';

interface IProps{
    newBook:any,
}

interface IState{
    url:string
}

export default class AddBook extends React.Component<IProps,IState> {
    public constructor(props:any){
        super(props);
        this.state = {
            url:""
        }
    }

    public addBook = () =>{            
        this.props.newBook(this.state.url)
    }

    public render() {
        return (
            <div className="add-book">
                <div className = "biglogo">
                <img className = "add-logo" src = {logo}/>
                </div>
                <h1 className = "add"> Add Book</h1>
                <div className="search">
                        <div className="add-bar">

                            <TextField className = "add-field"
                            placeholder="Add Google Book URL"
                            margin="normal"
                            variant="filled"
                            onChange = { (e: any ) => this.setState({url:e.target.value})}  // documentation
                            value = {this.state.url} 
                            InputProps={{
                                endAdornment: 
                                <InputAdornment position="end">
                                    <IconButton onClick={this.addBook}><AddCircle/></IconButton> 
                                </InputAdornment> 
                            }}
                            />
                        </div>
                </div>
            </div>
        )
    }
}
