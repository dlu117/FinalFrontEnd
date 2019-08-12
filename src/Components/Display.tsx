import Tick from '@material-ui/icons/CheckCircle'
import TickBorder from '@material-ui/icons/CheckCircleOutlineOutlined'
import Close from '@material-ui/icons/Close'
import * as React from 'react'

interface IState{
    bookList:any
}

interface IProps{
    display:any,
    displayurl:any;
    mount:any,
}

export default class BookList extends React.Component<IProps,IState>{
    public constructor(props:any){
        super(props);
        this.state = {   // object takes empty array 
            bookList: [],
        }
        this.updateDisplay();
    } 


    public updateDisplay = () => {
        fetch('https://bookapidevops.azurewebsites.net/api/Books',{
            method:'GET' 
        }).then((response:any) => {
            return response.json();  
        }).then((response:any)=>{
            const output:any[] = []
            response.forEach((book:any) => {  
                const bookitem = (<td className= "perbook"> 
                    <td className="book-icon" onClick={() => this.isRead(book)}>{book.isRead === true?< Tick />:<TickBorder/>}</td>  
                    <td className="align-middle" onClick={() => this.ondisplay(book.thumbnailUrl,book.webUrl)}><img src={book.thumbnailUrl} width="80px"/></td>
                    <td className="book-icon" onClick={() => this.deleteBook(book.bookId)}><Close/></td>                    
                    </td>)
                if(book.isRead){
                    output.push(bookitem);    // read books are at the bottom of the list 
                }else{               
                    output.unshift(bookitem)  // adds item to start of list
                }
            })
            this.setState({bookList:output})
            });
    }

    public isRead = (book:any) =>{
        const path = [{
            "from":"",
            "op":"replace",
            "path":"/isRead",
            "value":!book.isRead, // ! will flip value
        }]
        fetch("https://bookapidevops.azurewebsites.net/api/Books/update/"+book.bookId,{
            body:JSON.stringify(path),
            headers: {
                Accept: "text/plain",
                "Content-Type":"application/json-patch+json"
            },
            method:"PATCH" 
        }).then(()=>{this.updateDisplay()})    // once isRead list will update again
    }

    public deleteBook = (id:any) => {
        fetch("https://bookapidevops.azurewebsites.net/api/Books/"+id,{
            method:"DELETE"
        }).then(()=>{
            this.updateDisplay()              // once delete list will update again
        })
    }
     
    // need to know the web url of the displayed image 
    public ondisplay = (bookUrl:string, linkUrl:string) => {
        this.props.display(bookUrl)
        this.props.displayurl(linkUrl)
    }

    // App component will have access to the function so we can call it within app.tsx
      public componentDidMount = () =>{
        this.props.mount(this.updateDisplay)
    }

 
    public render() {  
        return (
            <div className="booklist">  
                <h1 className="books-heading">Book Shelf</h1>  
                    <table className="table" >
                        {this.state.bookList} 
                    </table> 
            </div>
        )
    }
}
