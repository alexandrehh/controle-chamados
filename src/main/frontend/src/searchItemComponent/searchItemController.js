import React, {Component} from "react";
import './searchItem.css';
import axios from "axios";
import EnhancedTable from "../itemTableComponent/itemTableController";
import {Alert, Snackbar} from "@material-ui/core";

const URL = "http://localhost:9090/api/item"

export default class SearchItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            itemName: "",
            itemStatus: "",
            open: false,
            myAlert: "info",
            message: ""
        }

        this.search = this.search.bind(this);
    }

    search = async () => {
        let item = this.state.itemName;

        await axios.get(URL + '/' + item)
            .then(res => {
               this.setupDataSuccess(res.data);
            })
            .catch(res => {
                this.setupDataError();
            })
    }

    setupDataSuccess = (data) => {
        let msg = "";

        if (data) {
            msg = "Estes foram os chamados encontrados!";
            this.setState({open: true, myAlert: 'success', message: msg});
            this.setState({data: data});

        } else {
            msg = "Ops!, Não foi encontrado nenhum chamado, tente novamente!";
            this.setState({open: true, myAlert: 'error', message: msg});
        }

        this.setState({itemName: ""});
    }

    setupDataError = () => {
        let msg = "Ops! Ocorreu um erro durante a busca do chamado, tente novamente!";
        this.setState({open: true, myAlert: 'error', message: msg});
        this.setState({itemName: ""});
    }

    updateRows = () => {
        let rows = [];

        if (this.state.data) {
            if (Array.isArray(this.state.data)) {
                for(let i=0; i<this.state.data.length; i++) {
                    rows.push(
                        {itemName: this.state.data[i].itemName, itemStatus: this.state.data[i].itemStatus}
                    );
                }
            } else {
                rows.push(
                    {itemName: this.state.data.itemName, itemStatus: this.state.data.itemStatus}
                );
            }
        }

        return rows;
    }

    render() {
        return (
            <div className="searchItem">
                <div className="search">
                    <input className="searchBar" onChange={(e) => this.setState({itemName: e.target.value})}/>
                    <input className="searchButton" type="button" value="Buscar" onClick={this.search}/>
                </div>
                <div style={{ height: 400, width: '100%' }} >
                    <EnhancedTable rows={this.updateRows()}/>
                </div>
                <Snackbar open={this.state.open} autoHideDuration={4500} onClose={() => this.setState({open: false})}>
                    <Alert severity={this.state.myAlert}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}