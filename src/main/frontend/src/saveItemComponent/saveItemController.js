import React, {Component} from "react";
import './saveItem.css';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {Alert, Snackbar} from "@material-ui/core";

const URL = "http://localhost:9090/api/item"

export default class SaveItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            myAlert: "info",
            message: "",
            itemName: "",
            itemStatus: "Disponivel",
            updateLabelButton: 'Salvar'
        }
        this.save = this.save.bind(this);
    }

    save = async () => {
        let dataItem = {
            itemName: this.state.itemName,
            itemStatus: this.state.itemStatus
        }

        await axios.post(URL + '/save', dataItem)
            .then(res => {
               this.setupDataSuccess();
            })
            .catch(res => {
                this.setupDataError();
            });
    }


    setupDataSuccess = () => {
        let msg = "";

        if (this.state.updateLabelButton === 'Salvar') {
            msg = "O chamado foi cadastro com sucesso!";
        } else {
            msg = "O chamado foi atualizado com sucesso!";
        }

        this.setState({open: true, myAlert: 'success', message: msg});
        this.setState({itemName: ""});
    }

    setupDataError = () => {
        let msg = "Ops! houve um erro durante o cadastro deste chamado, tente novamente!";
        this.setState({open: true, myAlert: 'error', message: msg});
        this.setState({itemName: ""});
    }

    checkItemExists = (itemId) => {
        if (itemId) {
            axios.get(URL + '/' + itemId)
                .then(res => {
                    if (res.data) {
                        this.setState({updateLabelButton: 'Atualizar'});
                    }
                })
                .catch(res => {
                    this.setState({updateLabelButton: 'Salvar'});
                })
        } else {
            this.setState({updateLabelButton: 'Salvar'});
        }

        this.setState({itemName: itemId});
    }

    render() {
        return (
            <Form className="saveItem">
                <Form.Group className="groupTextItem">
                    <Form.Label className="title">Item: </Form.Label>
                    <Form.Control type="text" className="textItem" required name="item" value={this.state.itemName}
                                  onChange={(e) => this.checkItemExists(e.target.value)}/>
                </Form.Group>

                <Form.Group className="groupSelectItem">
                    <Form.Label className="title">Status: </Form.Label>
                    <Form.Control as="select" className="selectItem" name="option"
                                  onChange={(e) => this.setState({itemStatus: e.target.value})}>
                        <option>Disponivel</option>
                        <option>Aguardando Feedback</option>
                        <option>Qualidade</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" className="buttonSubmit" onClick={this.save}>
                    {this.state.updateLabelButton}
                </Button>
                <Snackbar open={this.state.open} autoHideDuration={4500} onClose={() => this.setState({open: false})}>
                    <Alert severity={this.state.myAlert}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </Form>
        )
    }
}