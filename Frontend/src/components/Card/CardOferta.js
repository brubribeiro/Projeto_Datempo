import React, { Component } from 'react';
import Relogio from '../../assets/imagens/alarm-clock.png';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBAlert } from 'mdbreact';
import api from './../../services/api';
import { parseJwt } from '../../services/auth';

class cardOferta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOferta: [],
            listaReservas: [],
            idOferta: this.props.idOferta,

            postReserva: {
                quantCompra: "",
                dataReserva: this.DataHoje(),
                idOferta: this.props.idOferta,
                idUsuario: parseJwt().id,
            },


            modal: false,

            dataAtual: ""
        }
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.setState({ idOferta: this.props.idOferta })
        }, 100);
    }

    //#region Toggle
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }
    openModal = (o) => {
        this.toggle();

        this.setState({ getOferta: o }, () => {
            console.log("get", this.state.getOferta);
        });
    }
    //#endregion

    //#region GET
    getReservas = () => {
        api.get('/reserva')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaReservas: response.data })
                }
            })
    }

    //#endregion

    //#region POST
    postSetState = (input) => {
        this.setState({
            postReserva: {
                ...this.state.postReserva, [input.target.name]: input.target.value
            }
        })
    }

    postReserva = (r) => {

        r.preventDefault();
        console.log("Cadastrando");

        console.log(parseJwt().id)

        this.setState({
            postSetState: {
                ...this.state.postSetState,
                idUsuario: parseJwt().id,
            }
        })

        api.post('/reserva', this.state.postReserva)
            .then(response => {
                console.log(response);
                this.setState({ sucessMsg: "Reserva realizada com sucesso!" });
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível reservar este produto!" });
            })

        setTimeout(() => {
            this.getReservas();
        }, 1500);
    }

    //#endregion

    DataHoje = (dataReserva) => {
        var dataReserva = new Date();
        return dataReserva;
    }

    ContagemDias = (validade) => {
        var dataAtual = new Date();
        var dataValidade = new Date(validade);
        var localdatevalidade = dataValidade.getDate() + '/' + (dataValidade.getMonth() + 1) + '/' + dataValidade.getFullYear() + ' ' + dataValidade.getHours() + ':' + dataValidade.getMinutes();
        var dataDif = ((dataValidade - dataAtual) / (1000 * 60 * 60 * 24)).toFixed(0);
        return dataDif + " dias!";
    }

    render() {
        return (
            <div key={this.props.idOferta} className="card_oferta">
                <div className="caixa_imagem">
                    <img className="imgproduto" src={"http://localhost:5000/imgOferta/" + this.props.imagem}
                        alt={this.props.descricao} />
                </div>
                <div className="descricao_oferta">
                    <div className="titulo_produto">
                        <p className="titulo descricao">{this.props.nomeOferta}</p>
                    </div>
                    <div className="descricao_produto">
                        <div className="descricao_pequena">
                            <p className="titulo_descricao">de R$ 8,00</p>
                            <p className="titulo_preco">Por</p>
                            <p className="preco_descricao">R$ {this.props.preco} </p>
                        </div>

                        <div className="descricao_pequena_logo">
                            <p className="titulo_descricao_logo">DATEMPO</p>
                            <div className="validade_mostruario">
                                <img src={Relogio} alt="Alarme" />
                                <p className="descricao"> Faltam: {this.ContagemDias(this.props.validade)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="botao_reservar">
                    <button className="btn_reservar" onClick={() => this.openModal()}>RESERVAR</button>
                </div>
                <MDBContainer >
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <form onSubmit={this.postReserva} key={this.props.idOferta}>
                            <MDBModalBody>
                                <div className="div_conteudo_modal">
                                    <div className="imagem_modal">
                                        <img className="imgproduto" src={"https://localhost:5001/imgOferta/" + this.props.imagem}
                                            alt={this.props.descricao} />
                                    </div>

                                    <div className="div_modal_oferta">

                                        <label className="modal_info_oferta">
                                            {this.props.nomeOferta}
                                        </label>

                                        <label className="modal_info_oferta">
                                            Preco : R$ {this.props.preco}
                                        </label>

                                        <label className="modal_info_oferta">
                                            Validade: {this.props.validade}
                                        </label>

                                        <label className="modal_info_oferta">Faltam : {this.ContagemDias(this.props.validade)}
                                        </label>
                                    </div>
                                </div>
                                <br />
                                <textarea
                                    type="text"
                                    id="defaultFormContactMessageEx"
                                    className="modal_descricao_oferta"
                                    name="descricao"
                                    placeholder="Descrição do produto"
                                    disabled
                                    value={this.props.descricao}
                                />
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Quantidade de Compra</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        name="quantCompra"
                                        value = { this.state.listaReservas.quantCompra }
                                        onChange = { this.postSetState }
                                    />
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        name="dataReserva"
                                        value = { this.state.listaReservas.dataReserva}
                                        onChange = { this.postSetState }
                                    />
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        name="idUsuario"
                                        value = { this.state.listaReservas.idUsuario}
                                        onChange = { this.postSetState }
                                    />
                                     <input
                                        type="hidden"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        name="idOferta"
                                        value = { this.state.listaReservas.idOferta}
                                        onChange = { this.postSetState }
                                    />
                                </div>
                            </MDBModalBody>
                            <div className="modal_botoes">
                                <button className="modal_botao_confirmar_reserva" onClick={this.toggle}>FECHAR</button>
                                <button  onClick={() => (console.log("idOferta do card: ", this.props.idOferta))} to={{
                                    pathname : "/reserva",
                                    idOferta : this.state.idOferta
                                }} className="modal_botao_adicionar_carrinho" type="submit">ADICIONAR RESERVA</button>
                            </div>
                        </form>
                    </MDBModal>
                </MDBContainer>
            </div>

        )
    }
}

export default cardOferta;