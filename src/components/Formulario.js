import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({guardarbusqueda}) => {

    const [termino, actualizarTermino]= useState('');
    const [error, actualizarError] = useState(false);

    const validarBusqueda = e => {
        e.preventDefault();

        if(termino.trim() === ""){
            actualizarError(true);
            return;
        }

        actualizarError(false);
        guardarbusqueda(termino);
    }

    
    return (
        <form
            onSubmit={validarBusqueda}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen. Ej: autos, futbol"
                        onChange={e => actualizarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Escriba una categoria" /> : null}
        </form>
      );
}
 
export default Formulario;