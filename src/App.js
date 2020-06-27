import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';



function App() {

  //state para guardar la busqueda
  const [busqueda, guardarbusqueda] = useState('');

  //state para guardar las imagenes de la busqueda
  const [imagenes, guardarImagenes] = useState([]);


  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return;

      const paginacontenido = 30 //#numero de fotos por página
      const keyApi = '17230901-d74704592695261d2c1c8d54e';
      const url = `https://pixabay.com/api/?key=${keyApi}&q=${busqueda}&per_page=${paginacontenido}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

    }
    consultarApi();

  }, [busqueda]);

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
      </div>

      
    </div>
  );
}

export default App;
