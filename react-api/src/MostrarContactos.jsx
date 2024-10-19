import React, { useEffect, useState } from 'react';

const MostrarContactos = () => {
    const [contactos, setContactos] = useState([]);
    const [error, setError] = useState(null);
    const [expandido, setExpandido] = useState(null); 

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await fetch('http://localhost:8000/contactos/');
                if (!response.ok) {
                    throw new Error('Error al cargar los contactos');
                }
                const data = await response.json();
                setContactos(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchContactos();
    }, []);

    const toggleExpandido = (id) => {
        setExpandido(expandido === id ? null : id); 
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lista de Contactos</h2>
            <ul>
                {contactos.sort((a, b) => a.id - b.id).map((contacto) => (
                    <li key={contacto.id}>
                        <span onClick={() => toggleExpandido(contacto.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            {contacto.id} - {contacto.nombre}
                        </span>
                        {expandido === contacto.id && (
                            <div style={{ marginLeft: '10px', marginTop: '5px', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '5px' }}>
                                <p><strong>Teléfonos:</strong> {contacto.telefonos}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {contacto.fecha_nac}</p>
                                <h4>Dirección</h4>
                                <p><strong>Calle:</strong> {contacto.direccion.calle}</p>
                                <p><strong>Número:</strong> {contacto.direccion.numero}</p>
                                <p><strong>Piso:</strong> {contacto.direccion.piso}</p>
                                <p><strong>Departamento:</strong> {contacto.direccion.depto}</p>
                                <p><strong>ID de Localidad:</strong> {contacto.direccion.localidad_id}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostrarContactos;
