import { useEffect, useState } from 'react'
import './Characs.css'
import { axiosClient } from './api/axios'
import { PageableCharacterType } from './types/character.type';
import { Link } from 'react-router-dom';


function CharacsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [actPage, setActPage] = useState("1");
  const [characters, setCharacters] = useState<PageableCharacterType>();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  async function getAllCharacters() {
    setIsLoading(true);
    setName("")
    setStatus("")
    await axiosClient
      .get<PageableCharacterType>(`/character`)
      .then((request) => {
        setCharacters(request.data);
      })
      .finally(() => {
        setActPage("1");
        setIsLoading(false);
      });  
    }    

    async function handlePage(url: string) {
      setIsLoading(true);
      await axiosClient
        .get<PageableCharacterType>(url)
        .then((request) => {
          setCharacters(request.data);
        })
        .finally(() => {
          setActPage(url.substring(url.indexOf("page=")+5));
          setIsLoading(false);
        });
    }  

    async function handleFilters() {
      setIsLoading(true);
      var filtroNome = (name=='' ? '' : 'name=' + name + "&")  + (status=='' ? '' : 'status=' + status)
      await axiosClient  
        .get<PageableCharacterType>(`/character/?${filtroNome}`)  
        .then((request) => {
          setCharacters(request.data);
        })
        .catch(()=>{
          setCharacters(null)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <>
    <img className="leftImg" src='./images/morty.png'></img>
    <img className="rightImg" src='./images/rick.png'></img>
     
    
    <div className="container">
      {isLoading ? (
        <>
          <img className="loadImg" src='https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif'></img>
        </>
        
      ) : !characters ? (
        <>
          <Link to={"/episodes"}>
            <button className='btnNav'>
              Episodes
            </button>
          </Link>
          <img className='logo' src="./images/logo.png" alt="logo" />
          { <form className="filters" onSubmit={handleFilters}>
              <div className='filtersLine'>
                <select id="filterStatus" onChange={(event) => setStatus(event.target.value)}>
                  <option value="" selected={status==""? "selected" : ""}></option>
                  <option value="Alive" selected={status=="Alive"? "selected" : ""}>Alive</option>
                  <option value="Dead" selected={status=="Dead"? "selected" : ""}>Dead</option>
                  <option value="unknown" selected={status=="unknown"? "selected" : ""}>Unknown</option>
                </select>
                <input id="filterName" type="text" placeholder="Search for an character" value={name} onChange={(event) => setName(event.target.value)} />
                
                <button className='btnSearch' type="submit" disabled={!name && !status}><img src='./images/search.png' alt='Buscar'/></button>
                <button className='btnClearFilter' type="button" onClick={() => getAllCharacters()}><img src='./images/clear-filter.png' alt='Buscar'/></button>
              </div>
            
            </form> }
          <span className="message">No character to show...</span>
        </>
        
      ) : (
        <>
            <Link to={"/episodes"}>
              <button className='btnNav'>
                Episodes
              </button>
            </Link>
            <img className='logo' src="./images/logo.png" alt="logo" />
          { <form className="filters" onSubmit={handleFilters}>
              <div className='filtersLine'>
                <select id="filterStatus" onChange={(event) => setStatus(event.target.value)}>
                  <option value="" selected={status==""? "selected" : ""}></option>
                  <option value="Alive" selected={status=="Alive"? "selected" : ""}>Alive</option>
                  <option value="Dead" selected={status=="Dead"? "selected" : ""}>Dead</option>
                  <option value="unknown" selected={status=="unknown"? "selected" : ""}>Unknown</option>
                </select>
                <input id="filterName" type="text" placeholder="Search for an character" value={name} onChange={(event) => setName(event.target.value)} />
                
                <button className='btnSearch' type="submit" disabled={!name && !status}><img src='./images/search.png' alt='Buscar'/></button>
                <button className='btnClearFilter' type="button" onClick={() => getAllCharacters()}><img src='./images/clear-filter.png' alt='Buscar'/></button>
              </div>
            
            </form> }
          <div className="charactersContent">
            <div className="characters">
              {characters.results.map((character) => (
                <div className="character" key={character.id}>
                  <div className="characterImage">
                    <img src={character.image} alt={character.name}/>
                  </div>

                  <div className="characterData">
                
                    <span className="characterName">
                      <strong>{character.name}</strong>
                    </span>
                    <div>
                      <span className="characterName">{character.gender}</span>
                      <img className='genderImg' src={"./images/" + character.gender + ".png"} alt="" />
                      
                    </div>                  
                    <span className="characterName">{character.species}</span>
                    <div className='flex'>
                      <span className="characterName">{character.status}</span>
                      <div className={character.status + " status"}></div>
                    </div>

                  </div>
                  
                </div>
              ))}
            </div>
          </div>
          <div className="pagination">
            <button onClick={() => handlePage(characters.info.prev)} disabled={!characters.info.prev}>
              Previous
            </button>  
            <span className='pageInfo'>{characters.info.count} characters | {characters.info.pages} pages | Actual page: {actPage} </span>
            <button onClick={() => handlePage(characters.info.next)} disabled={!characters.info.next}>
              Next
            </button>
          </div> 
        </>
      ) 
      }
      
    </div>
    

  </>
  )
}

export default CharacsPage
