import { useEffect, useState } from 'react'
import './Episodes.css'
import { PageableEpisodeType } from './types/episode.type'
import { axiosClient } from './api/axios'
import { Link } from 'react-router-dom';

function Episode() {
  const [isLoading, setIsLoading] = useState(false);
  const [actPage, setActPage] = useState("1");
  const [episodes, setEpisodes] = useState<PageableEpisodeType>();
  const [epName, setEpName] = useState("");
  var [epCode, setEpCode] = useState("");

  async function getAllEpisodes() {
    setIsLoading(true);
    setEpName("")
    setEpCode("")
    await axiosClient
      .get<PageableEpisodeType>(`/episode`)
      .then((request) => {
        setEpisodes(request.data);
      })
      .finally(() => {
        setActPage("1");
        setIsLoading(false);
      });  
    }    

    async function handlePage(url: string) {
      setIsLoading(true);
      await axiosClient
        .get<PageableEpisodeType>(url)
        .then((request) => {
          setEpisodes(request.data);
        })
        .finally(() => {
          setActPage(url.substring(url.indexOf("page=")+5));
          setIsLoading(false);
        });
    }

    function handleEpisode(episodeCode:string) {
      epCode = episodeCode
      setEpCode(episodeCode)
      handleFilters()
    }


    async function handleFilters() {
      setIsLoading(true);
      var filtroNome = (epCode=='' ? '' : 'episode=' + epCode + '&') + (epName=='' ? '' : 'name=' + epName)


      await axiosClient  
        .get<PageableEpisodeType>(`/episode/?${filtroNome}`)  
        .then((request) => {
          setEpisodes(request.data);
        })
        .catch(()=>{
          setEpisodes(null)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  useEffect(() => {
    getAllEpisodes();
  }, []);

  return (
    <>
    <img className="leftImg" src='./images/rick.png'></img>
    <img className="rightImg" src='./images/morty.png'></img>
     
    
    <div className="container">
      {isLoading ? (
        <>
          <img className="loadImg" src='https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif'></img>
        </>
        
      ) : !episodes ? (
        <>
          <Link to={"/characters"}>
            <button className='btnNav'>
              Characters
            </button>
          </Link>
          <img className='logo' src="./images/logo.png" alt="logo" />
          { <form className="filters" onSubmit={handleFilters}>
              <div className='filtersLine'>
                <input id="filterName" type="text" placeholder="Busque um episódio" value={epName} onChange={(event) => setEpName(event.target.value)} />
                <button className='btnSearch' type="submit" disabled={!epName}><img src='./images/search.png' alt='Buscar'/></button>
                <button className='btnClearFilter' type="button" onClick={() => getAllEpisodes()}><img src='./images/clear-filter.png' alt='Buscar'/></button>
                
                
              </div>
              
              <div className='filtersLine'>
                
              </div>
            </form> }
          <span className="message">No episode to show...</span>
        </>
        
      ) : !epCode? (
        <>
            <Link to={"/characters"}>
              <button className='btnNav'>
                Characters
              </button>
            </Link>
            <img className='logo' src="./images/logo.png" alt="logo" />
          { <form className="filters" onSubmit={handleFilters}>
              <div className='filtersLine'>
                <input id="filterName" type="text" placeholder="Search for an episode" value={epName} onChange={(event) => setEpName(event.target.value)} />
                <button className='btnSearch' type="submit" disabled={!epName}><img src='./images/search.png' alt='Buscar'/></button>
                <button className='btnClearFilter' type="button" onClick={() => getAllEpisodes()}><img src='./images/clear-filter.png' alt='Buscar'/></button>
              </div>
              
              <div className='filtersLine'>                
              </div>
            </form> }
          <div className="episodes">
            <table className='resultTable'>
              <thead>
                <th width="350px">Name</th>
                <th width="100px">Episode</th>
                <th width="150px">Air date</th>
                <th width="100px">Characters</th>
              </thead>
              {episodes.results.map((episode) => (
                <tr key={episode.id}>
                    <td>
                      <a className='selectEp' onClick={() => handleEpisode(episode.episode)}>{episode.name}</a> 
                    </td>
                    <td>
                      {episode.episode}
                    </td>
                    <td>
                      {episode.air_date}
                    </td>
                    <td className='textCenter'>
                      {episode.characters.length}
                    </td>
                  
                </tr>
              ))}
            </table>
          </div>
          <div className="pagination">
            <button onClick={() => handlePage(episodes.info.prev)} disabled={!episodes.info.prev}>
              Previous
            </button>  
            <span className='pageInfo'>{episodes.info.count} characters | {episodes.info.pages} pages | Actual page: {actPage} </span>
            <button onClick={() => handlePage(episodes.info.next)} disabled={!episodes.info.next}>
              Next
            </button>
          </div> 
        </>
      ) : (
        <>
          <div className="modal">
            <div className="modalContent">
              <button className='btnCloseEpisode' type="button" onClick={() => getAllEpisodes()}><img src='./images/close.png' alt='Buscar'/></button>
              {episodes.results.map((episode) => (
                <div className='epData' key={episode.id}>
                    <div className='modalItem'>
                      <strong>ID: </strong><span className='epData'>{episode.id}</span>
                    </div>
                    <div className='modalItem'>
                      <strong>Name: </strong><span className='epData'>{episode.name}</span>
                    </div>
                    <div className='modalItem'>
                      <strong>Episode: </strong><span className='epData'>{episode.episode}</span>
                    </div>
                    <div className='modalItem'>
                      <strong>Episode Air date: </strong><span className='epData'>{episode.air_date}</span>
                    </div>
                    

                    <div className='modalItem'>
                    <strong>Characters:</strong>
                    </div>
                    <div className="characters">
                      {episode.characters.map((caracs) => (
                        <>
                          <span className='epData'>{caracs}</span>
                          <br/>
                        </>
                      ))}
                    </div>
                </div>
                  

              ))}
            </div>
          </div>
        </>
      )
      }
      
    </div>
    

  </>
  )
}

export default Episode
