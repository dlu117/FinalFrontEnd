// Adding a book to bookshelf
// Taking  in a google book URL
import logo from "src/book.jpg"
import IconButton  from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import AddCircle from '@material-ui/icons/AddCircle'
import AddVoice from '@material-ui/icons/KeyboardVoice'
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
            <div className="add-book">
                <div className = "biglogo">
                <img className = "logo" src = {logo}  width="300px" height="300px" />
                </div>
                <h1 className = "add"> Add Book</h1>
                <div className="search">
                        <div className="add-bar">
                            <TextField
                            placeholder="Add Google Book"
                            margin="normal"
                            variant="filled"
                            style = {{width: 800}} 
                            onChange = { (event: any ) => this.setState({input:event.target.value})}  // documentation
                            value = {this.state.input}  // ???
                            InputProps={{
                                endAdornment: 
                                <InputAdornment position="end">
                                    <IconButton onClick={this.addBook}><AddCircle/></IconButton>
                                    <IconButton onClick={this.addBook}><AddVoice/></IconButton>  
                                </InputAdornment> 
                            }}
                            />
                        </div>
                </div>
            </div>
        )
    }
}
