import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';



function App() {

  //state para guardar la busqueda
  const [busqueda, guardarbusqueda] = useState('');

  //state para guardar las imagenes de la busqueda
  const [imagenes, guardarImagenes] = useState([]);

  //state para saber en qué página estoy
  const [paginaactual, guardarPaginaActual] = useState(1);

  // state para saber el total de páginas
  const [ paginastotales, guardarPaginasTotales] = useState(1);


  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return;

      const paginacontenido = 30 //#numero de fotos por página
      const keyApi = '17230901-d74704592695261d2c1c8d54e';
      const url = `https://pixabay.com/api/?key=${keyApi}&q=${busqueda}&per_page=${paginacontenido}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      

      //guardamos el listado de resultados
      guardarImagenes(resultado.hits);

      //guardamos el número de paginas totales 
      const totalpaginas = Math.ceil(resultado.totalHits / paginacontenido);
      guardarPaginasTotales(totalpaginas);

      //volver al inicio en cada cambio de página
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior : 'smooth'});
    

    }
    consultarApi();

  }, [busqueda, paginaactual]);

  const paginaAnterior = () => {
    const nuevapagina = paginaactual - 1;

    if(nuevapagina===0) return;
    guardarPaginaActual(nuevapagina);
  }

  const paginaSiguiente = () => {
    const nuevapagina = paginaactual + 1;

    if(nuevapagina > paginastotales ) return;
    guardarPaginaActual(nuevapagina);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarbusqueda = {guardarbusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {(paginaactual === 1) ? null : 
          <button 
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
          >&laquo; Anterior</button>
        }

        {(paginaactual === paginastotales) ? null : 
          <button 
              type="button"
              className="bbtn btn-info"
              onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        }

      
      </div>


      

      
    </div>
  );
}

export default App;
