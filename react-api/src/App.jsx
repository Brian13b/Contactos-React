import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MostrarContactos from './MostrarContactos';
import AgregarContacto from './AgregarContacto';
import ModificarContacto from './ModificarContacto';

function App() {
    return (
        <Router>
            <div>
                <h1>Gestión de Contactos</h1>
                <nav>
                    <Link to="/">Mostrar Contactos</Link>
                    <Link to="/agregar">Agregar Contacto</Link>
                    <Link to="/modificar">Modificar Contacto</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<MostrarContactos />} />
                    <Route path="/agregar" element={<AgregarContacto />} />
                    <Route path="/modificar" element={<ModificarContacto />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
