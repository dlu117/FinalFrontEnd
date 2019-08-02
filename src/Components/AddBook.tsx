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
    }

    public render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <TextField
                            id= "Search-Bar"
                            className = "SearchBar"
                            placeholder="Add Google Book"
                            margin="normal"
                            variant="outlined"
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
