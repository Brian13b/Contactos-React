import React, { useState } from 'react';

const AgregarContacto = () => {
    const [nuevoContacto, setNuevoContacto] = useState({
        nombre: '',
        telefonos: '',
        fecha_nac: '',
        direccion: {
            calle: '',
            numero: '',
            piso: '',
            depto: '',
            localidad_id: '', 
        },
    });
    const [error, setError] = useState(null);

    const agregarContacto = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/contactos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoContacto),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el contacto');
            }

            setNuevoContacto({
                nombre: '',
                telefonos: '',
                fecha_nac: '',
                direccion: {
                    calle: '',
                    numero: '',
                    piso: '',
                    depto: '',
                    localidad_id: '',
                },
            });
            alert('Contacto agregado exitosamente');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Agregar Contacto</h2>
            <form onSubmit={agregarContacto}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nuevoContacto.nombre}
                    onChange={(e) => setNuevoContacto({ ...nuevoContacto, nombre: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Teléfonos"
                    value={nuevoContacto.telefonos}
                    onChange={(e) => setNuevoContacto({ ...nuevoContacto, telefonos: e.target.value })}
                />
                <input
                    type="date"
                    value={nuevoContacto.fecha_nac}
                    onChange={(e) => setNuevoContacto({ ...nuevoContacto, fecha_nac: e.target.value })}
                />

                <h3>Dirección</h3>
                <input
                    type="text"
                    placeholder="Calle"
                    value={nuevoContacto.direccion.calle}
                    onChange={(e) => setNuevoContacto({ 
                        ...nuevoContacto, 
                        direccion: { ...nuevoContacto.direccion, calle: e.target.value }
                    })}
                />
                <input
                    type="number"
                    placeholder="Número"
                    value={nuevoContacto.direccion.numero}
                    onChange={(e) => setNuevoContacto({ 
                        ...nuevoContacto, 
                        direccion: { ...nuevoContacto.direccion, numero: e.target.value }
                    })}
                />
                <input
                    type="number"
                    placeholder="Piso"
                    value={nuevoContacto.direccion.piso}
                    onChange={(e) => setNuevoContacto({ 
                        ...nuevoContacto, 
                        direccion: { ...nuevoContacto.direccion, piso: e.target.value }
                    })}
                />
                <input
                    type="text"
                    placeholder="Departamento"
                    value={nuevoContacto.direccion.depto}
                    onChange={(e) => setNuevoContacto({ 
                        ...nuevoContacto, 
                        direccion: { ...nuevoContacto.direccion, depto: e.target.value }
                    })}
                />
                <input
                    type="number"
                    placeholder="ID de Localidad"
                    value={nuevoContacto.direccion.localidad_id}
                    onChange={(e) => setNuevoContacto({ 
                        ...nuevoContacto, 
                        direccion: { ...nuevoContacto.direccion, localidad_id: e.target.value }
                    })}
                />
                
                <button type="submit">Agregar Contacto</button>
            </form>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default AgregarContacto;
