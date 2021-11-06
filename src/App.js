import "./App.css"
import { BookCard } from "./components/Bookcard";
import {
   InputGroup, 
   Input, 
   Button, 
   FormGroup, 
   Label, 
   Spinner,
} from "reactstrap";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const App = () => {
  //state
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  //Handle Search
  const handleSubmit = () => {
    setLoading(true)
    if(maxResults > 40 || maxResults < 1){
      toast.error('max results must be between 1 and 40')
    }else {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`)
      .then(res => {
        if(startIndex >= res.data.totalItems || startIndex < 1){
          toast.error(`max result must be between 1 and ${res.data.totalItems}` );
        }else{
          if(res.data.items.length > 0){
            console.log(res.data.items);
            setCards(res.data.items);
            setLoading(false);
          }
        }
      })
      .catch(err => {
        setLoading(true);
        toast.error(`${err.response.data.error.message}`);
      })

    }
  }

  const handleCards = () => {
    console.log(cards)
    const items = cards.map((item, i) => {
      let thumbnail = '';
      if(item.volumeInfo.imageLinks.thumbnail){
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }
      return (
        <div className="col-lg-4 mb-3" key={item.id}>
          <BookCard 
          thumbnail={thumbnail} 
          title={ item.volumeInfo.title }
          pageCount={ item.volumeInfo.pageCount}
          language={ item.volumeInfo.language }
          author={ item.volumeInfo.authors }
          publisher={ item.volumeInfo.publisher }
          description={ item.volumeInfo.description }
          previewLink={ item.volumeInfo.previewLink }
          infoLink={ item.volumeInfo.infoLink }
          />
        </div>
      )
    })
    if(loading){
      return(
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{ width: '5rem', height: '3rem' }}/>
        </div>
      )
  }else{
    return(
      <div className="container my-5">
        <div className="row">
          {items}
        </div>
      </div>
    )
  }
  }
    //main show case
  const mainHeader = () => {
    
    return (
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter"></div>
        <h1 className="display-2 text-center text-white mb-3" style={{zindex: 2}}>
          Google books
        </h1>
        <div style={{ width:"60%", zIndex:2 }}>
          <InputGroup size="lg" className="mb-3">
            <Input placeholder="Book search" 
            value={ query } 
            onChange={ e=> setQuery(e.target.value)} 
            />
            <Button color="secondary" onClick={handleSubmit}>
              <i className="fa fa-search"></i>
            </Button>
          </InputGroup>
          <FormGroup className="ml-s">
            <Label for="maxResults">Max results</Label>
            <Input 
            type="number" 
            id="maxResults" 
            placeholder="Max Results"
            value={ maxResults } 
            onChange={ e=> setMaxResults(e.target.value)}>
            </Input>
          </FormGroup>
          <FormGroup className="ml-s">
            <Label for="startIndex">Start Index</Label>
            <Input 
            type="number" 
            id="startIndex" 
            placeholder="Start Index"
            value={ startIndex } 
            onChange={ e => setStartIndex(e.target.value)}>
            </Input>
          </FormGroup>
          <div className="d-flex text-white justify-content-center"></div>
        </div>
      </div>
    );
  }
  return(
    <div className="w-100 h-100">
      {mainHeader()}
      {handleCards()}
      <ToastContainer/>
    </div>
  )
}


export default App;
