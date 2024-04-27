import { useEffect, useState } from 'react'
import './App.css'
import { PageableEpisodeType } from './types/episode.type'
import { axiosClient } from './api/axios'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState<PageableEpisodeType>();
  // const [nameFilter, setNameFilter] = useState("");

  async function getAllEpisodes() {
    setIsLoading(true);
    await axiosClient
      .get<PageableEpisodeType>(`/episode`)
      .then((request) => {
        setEpisodes(request.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllEpisodes();
  }, []);

  return (
    <div className="container">
    {isLoading ? (
      <span className="message">Carregando...</span>
    ) : !episodes ? (
      <>
        <span className="message">Não há itens a mostrar...</span>
        {/* <span className="message">0</span>
        <form className="filters" onSubmit={handleFilterCharacters}>
          <span>Nome:</span>
          <input type="text" value={nameFilter} onChange={(event) => setNameFilter(event.target.value)} />
          <button type="submit" disabled={!nameFilter}>Filtrar</button>
        </form> */}
      </>
      
    ) : (
      <>
        {/* <form className="filters" onSubmit={handleFilterCharacters}>
          <span>Nome:</span>
          <input type="text" value={nameFilter} onChange={(event) => setNameFilter(event.target.value)} />
          <button type="submit" disabled={!nameFilter}>Filtrar</button>
        </form> */}

        <div className="episodes">
          <table>
            <thead>
              <th>Nome</th>
              <th>Episódio</th>
              <th>Lançamento</th>
            </thead>
            {episodes.results.map((episode) => (
              <tr key={episode.id}>
                  <td>
                    {episode.name}
                  </td>
                  <td>
                    {episode.episode}
                  </td>
                  <td>
                    {episode.date}
                  </td>
                
              </tr>
            ))}
          </table>
        </div>
         
        {/* <div className="pagination">
          <button
            onClick={() => handlePaginateCharacters(characters.info.prev)}
            disabled={!characters.info.prev}
          >
            Anterior
          </button>
          <button
            onClick={() => handlePaginateCharacters(characters.info.next)}
            disabled={!characters.info.next}
          >
            Próximo
          </button>
        </div> */}
      </>
    )}
  </div>

  )
}

export default App
