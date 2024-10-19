import React, { useState } from 'react';

const ModificarContacto = () => {
    const [contactoId, setContactoId] = useState('');
    const [contacto, setContacto] = useState(null);
    const [error, setError] = useState(null);

    const buscarContacto = async () => {
        try {
            const response = await fetch(`http://localhost:8000/contactos/${contactoId}`);

            if (!response.ok) {
                throw new Error('Contacto no encontrado');
            }

            const data = await response.json();
            setContacto(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const modificarContacto = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/contactos/${contactoId}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contacto),
            });

            if (!response.ok) {
                throw new Error('Error al modificar el contacto');
            }

            alert('Contacto modificado exitosamente');
            setContacto(null); 
            setContactoId('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Modificar Contacto</h2>
            <input
                type="text"
                placeholder="ID del Contacto"
                value={contactoId}
                onChange={(e) => setContactoId(e.target.value)}
            />
            <button onClick={buscarContacto}>Buscar</button>

            {error && <p>Error: {error}</p>}

            {contacto && (
                <form onSubmit={modificarContacto}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={contacto.nombre}
                        onChange={(e) => setContacto({ ...contacto, nombre: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Teléfonos"
                        value={contacto.telefonos}
                        onChange={(e) => setContacto({ ...contacto, telefonos: e.target.value })}
                    />
                    <input
                        type="date"
                        value={contacto.fecha_nac}
                        onChange={(e) => setContacto({ ...contacto, fecha_nac: e.target.value })}
                    />

                    <h3>Dirección</h3>
                    <input
                        type="text"
                        placeholder="Calle"
                        value={contacto.direccion.calle}
                        onChange={(e) => setContacto({ 
                            ...contacto, 
                            direccion: { ...contacto.direccion, calle: e.target.value }
                        })}
                    />
                    <input
                        type="number"
                        placeholder="Número"
                        value={contacto.direccion.numero}
                        onChange={(e) => setContacto({ 
                            ...contacto, 
                            direccion: { ...contacto.direccion, numero: e.target.value }
                        })}
                    />
                    <input
                        type="number"
                        placeholder="Piso"
                        value={contacto.direccion.piso}
                        onChange={(e) => setContacto({ 
                            ...contacto, 
                            direccion: { ...contacto.direccion, piso: e.target.value }
                        })}
                    />
                    <input
                        type="text"
                        placeholder="Departamento"
                        value={contacto.direccion.depto}
                        onChange={(e) => setContacto({ 
                            ...contacto, 
                            direccion: { ...contacto.direccion, depto: e.target.value }
                        })}
                    />
                    <input
                        type="number"
                        placeholder="ID de Localidad"
                        value={contacto.direccion.localidad_id}
                        onChange={(e) => setContacto({ 
                            ...contacto, 
                            direccion: { ...contacto.direccion, localidad_id: e.target.value }
                        })}
                    />
                    
                    <button type="submit">Modificar Contacto</button>
                </form>
            )}
        </div>
    );
};

export default ModificarContacto;
