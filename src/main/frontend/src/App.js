import React, { Component } from 'react';
import 'primereact/resources/themes/nova-alt/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { Menubar } from 'primereact/menubar';
import {withRouter} from 'react-router-dom';

class App extends Component {
    render() {
        const menuitems = [
            {
                label:'Buscar',
                icon:'pi pi-fw pi-search',
                command:() => this.props.history.push('/')
            },
            {
                label:'Adicionar/Atualizar',
                icon:'pi pi-fw pi-save',
                command:() => this.props.history.push('/save')
            }
        ];
        return (
            <div className="App">
                <Menubar model={menuitems}/>
                <div id="main">
                    <main>
                        <div className="content" id="content">
                            {this.props.children}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default withRouter(App);