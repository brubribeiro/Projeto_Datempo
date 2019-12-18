import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import { parseJwt } from '../../services/auth';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBAlert} from 'mdbreact';

class cadastroOferta extends Component {
    constructor(props) {
        super(props)
        this.state = {

            listaoferta: [],
            listaProdutos: [],

            postOferta: {
                nomeOferta: "",
                marca: "",
                preco: null,
                validade: "",
                quantVenda: "",
                imagem: React.createRef(),
                descricao: "",
                idUsuario: "",
                idProduto: "",
            },
        }
    }
    
    componentDidMount() {
        this.getOferta();
        this.getProdutos();
    }

    getOferta = () => {
        api.get('/oferta').then(response => {
            if (response.status === 200) {
                this.setState({ listaoferta: response.data })
            }
        })
    }

    getProdutos = () => {
        api.get('/produto')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaProdutos: response.data })
                }
            })
    }

    postSetState = (input) => {
        this.setState({
            postOferta: {
                ...this.state.postOferta,
                [input.target.name]: input.target.value
            }
        })
    }

    postOferta = (e) => {

        e.preventDefault();

        console.log(this.state.postOferta)

        let oferta = new FormData();

        
        oferta.set("nomeOferta", this.state.postOferta.nomeOferta);
        oferta.set("marca", this.state.postOferta.marca);
        oferta.set("preco", this.state.postOferta.preco);
        oferta.set("validade", this.state.postOferta.validade);
        oferta.set("quantVenda", this.state.postOferta.quantVenda);
        oferta.set("imagem", this.state.postOferta.imagem.current.files[0]);
        oferta.set("descricao", this.state.postOferta.descricao);
        oferta.set("idUsuario",parseJwt().id);
        oferta.set("idProduto", this.state.postOferta.idProduto);

        console.log(oferta);

        fetch('http://localhost:5000/api/oferta', {
            method: "POST",
            body: oferta,
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState({ sucessMsg: "Oferta cadastrada com sucesso!" });
            this.getOferta();
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg: "Não foi possível cadastrar oferta!" });
        })
}

    render() {

        return (
            <div>
                <Header/>
                <main>
                    <div className="cont_branco">
                        <h2>CADASTRO DE OFERTAS</h2>
                        <hr />
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="6">
                                    <form onSubmit={this.postOferta}>
                                        <label htmlFor="defaultFormContactNameEx" className="black-text">
                                            Título da Oferta</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Arroz"
                                            id="defaultFormContactNameEx"
                                            className="form-control"
                                            name="nomeOferta"
                                            value={this.state.postOferta.nomeOferta}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Tipo de Produto:</label>
                                        <select className="browser-default custom-select"
                                                name="idProduto"
                                                value={this.state.postOferta.idProduto}
                                                onChange={this.postSetState}
                                        >
                                        <option value="">Escolha uma categoria de Produto...</option>
                                                            {
                                                                this.state.listaProdutos.map(function (p) {
                                                                    return (
                                                                        <option
                                                                            key={p.idProduto}
                                                                            value={p.idProduto}> {p.nomeProduto}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                        </select><br/>
                                        <label htmlFor="defaultFormContactEmailEx" className="black-text">
                                            Marca do produto:</label>
                                        <input
                                            type="text"
                                            placeholder="marca"
                                            id="defaultFormContactEmailEx"
                                            className="form-control"
                                            name="marca"
                                            value={this.state.postOferta.marca}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Preço:</label>
                                        <input
                                            type="text"
                                            placeholder="10,00"
                                            id="defaultFormContactSubjectEx"
                                            className="form-control"
                                            name="preco"
                                            value={this.state.postOferta.preco}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Validade:</label>
                                        <input
                                            type="text"
                                            placeholder="05/09/2019"
                                            id="defaultFormContactSubjectEx"
                                            className="form-control"
                                            name="validade"
                                            value={this.state.postOferta.validade}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Quantidade para venda:</label>
                                        <input
                                            type="text"
                                            placeholder="2..."
                                            id="defaultFormContactSubjectEx"
                                            className="form-control"
                                            name="quantVenda"
                                            value={this.state.postOferta.quantVenda}
                                            onChange={this.postSetState}
                                        /><br />
                                        <label
                                            htmlFor="defaultFormContactMessageEx"
                                            className="black-text">
                                            Informações adicionais</label>
                                        <textarea
                                            type="text"
                                            id="defaultFormContactMessageEx"
                                            className="form-control"
                                            name="descricao"
                                            value={this.state.postOferta.descricao}
                                            onChange={this.postSetState}
                                        /><br/>
                                        <label
                                            htmlFor="defaultFormContactSubjectEx"
                                            className="black-text">
                                            Imagem do produto:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="imagem"
                                            //value={this.state.postOferta.imagem}
                                            ref={this.state.postOferta.imagem}
                                        /><br />
                                        <div className="text-center mt-4">
                                            <MDBBtn color="amber" outline type="submit">
                                                Cadastrar
                                            <MDBIcon far icon="paper-plane" className="ml-2" />
                                            </MDBBtn>
                                            {
                                                this.state.erroMsg &&
                                                <MDBAlert color="danger" >
                                                    {this.state.erroMsg}
                                                </MDBAlert>
                                            }
                                            {
                                                this.state.sucessMsg &&
                                                <MDBAlert color="sucess" >
                                                    {this.state.sucessMsg}
                                                </MDBAlert>
                                            }
                                        </div>
                                    </form>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default cadastroOferta;
