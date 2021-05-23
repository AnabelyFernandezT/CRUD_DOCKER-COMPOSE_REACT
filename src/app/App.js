import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            nombre_usuario: '',
            cedula_usuario: '',
            telefono_usuario: '',
            mail_usuario: '',
            usuarios: [],
            _id: ''
        };
        this.handleChage = this.handleChage.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    addUser(e) {
        if (this.state._id) {
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => console.log(data));
            M.toast({ html: 'Usuario Editado' });
            this.setState({
                nombre_usuario: '',
                cedula_usuario: '',
                telefono_usuario: '',
                mail_usuario: '',
                _id: ''
            })
            this.fetchUser();
        } else {
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: "Usuario Guardado" });
                    this.setState({
                        nombre_usuario: '',
                        cedula_usuario: '',
                        telefono_usuario: '',
                        mail_usuario: ''
                    })
                    this.fetchUser();
                })
                .catch(er => console.error(err));
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        fetch('api/task')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ usuarios: data });
            });
    }

    handleChage(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    deleteUser(id) {
        if (confirm('Está seguro de eliminarlo')) {
            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Usuario Eliminado' });
                    this.fetchUser();
                })
        }

    }

    editUser(id) {
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    nombre_usuario: data.nombre_usuario,
                    cedula_usuario: data.cedula_usuario,
                    telefono_usuario: data.telefono_usuario,
                    mail_usuario: data.mail_usuario,
                    _id: data._id
                })
            });
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="blue-grey darken-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo"><i className="material-icons">people</i>Lista de Usuarios</a>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Nuevo usuario</span>
                                    <form onSubmit={this.addUser}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i className="material-icons prefix">account_circle</i>
                                                <input name="nombre_usuario" onChange={this.handleChage} type="text" placeholder="Nombre de usuario" value={this.state.nombre_usuario} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i class="material-icons prefix">create</i>
                                                <input name="cedula_usuario" onChange={this.handleChage} type="text" placeholder="Cédula" value={this.state.cedula_usuario} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i class="material-icons prefix">phone</i>
                                                <input name="telefono_usuario" onChange={this.handleChage} type="text" placeholder="Teléfono" value={this.state.telefono_usuario} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i class="material-icons prefix">mail</i>
                                                <input name="mail_usuario" onChange={this.handleChage} type="text" placeholder="Email" value={this.state.mail_usuario} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-light darken-4">Guardar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Cédula</th>
                                        <th>Teléfono</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.usuarios.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.nombre_usuario}</td>
                                                    <td>{task.cedula_usuario}</td>
                                                    <td>{task.telefono_usuario}</td>
                                                    <td>{task.mail_usuario}</td>
                                                    <td>
                                                        <button className="btn green darken-1" onClick={() => this.editUser(task._id)} >
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn red darken-3" style={{ margin: '4px' }} onClick={() => this.deleteUser(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;