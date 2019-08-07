// Adding a book to bookshelf
// Taking  in a google book URL

import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import AddCircle from '@material-ui/icons/AddCircle'
import * as React from 'react';


interface IProps{
    addBook:any,
}

interface IState{
    input:string
}

export default class AddBook extends React.Component<IProps,IState> {
    public constructor(props:any){
        super(props);
        this.state = {
            input:""
        }
    }

    public addBook = () =>{            
        this.props.addBook(this.state.input)
        alert("Book Added") // need to change 
        
        
    }

    public render() {
        return (
            <div className="add-book">
                <h1 className = "add"> Add Book</h1>
                <div className="search">
                    <div className="row">
                        <div className="">
                            <TextField
                            id= "Search-Bar"
                            className = "SearchBar"
                            placeholder="Add Google Book"
                            margin="normal"
                            variant="outlined"
                            style = {{width: 800}} 
                           
                            onChange = { (event: any ) => this.setState({input:event.target.value})}
                            value = {this.state.input}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={this.addBook}>
                                        <AddCircle/>
                                    </IconButton>
                                </InputAdornment>,
                            }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
