import React, { Component } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import MarcaDia from '../../assets/imagens/logodia.svg';
import MarcaWalmart from '../../assets/imagens/walmart.png';
import MarcaCalvin from '../../assets/imagens/prada.png';
import MarcaPrada from '../../assets/imagens/CalvinKleinlogo.svg';
import banner from '../../assets/imagens/bannerAlimento.png';
import banner2 from '../../assets/imagens/BannerFrutas.jpg';
import banner3 from '../../assets/imagens/bannerA.png';
import api from '../../services/api';

import CardOferta from '../../components/Card/CardOferta.js';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from "mdbreact";

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listaOferta: [],

            getOferta: {
                idOferta: "",
                nomeOferta: "",
                marca: "",
                validade: "",
                quantVenda: "",
                preco: "",
                imagem: React.createRef(),
                descricao: "",
                idUsuario: "",
                idProduto: ""
            },

            modal: false

        }
    }

    //#region GET
    getOferta = () => {
        api.get('/oferta')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ listaOferta: response.data });
                }
            })
    }
    //#endregion

    

    render() {
        return (
            <div>
                <Header></Header>
                <main>
                    <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} className="z-depth-1">
                        <MDBCarouselInner>
                            <MDBCarouselItem itemId="1">
                                <MDBView>
                                    <a href="/mostruario"><img className="d-block w-100" src={banner} alt="First slide" /></a>
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="2">
                                <MDBView>
                                    <a href="/mostruario"><img className="d-block w-100" src={banner2} alt="Second slide" /></a>
                                </MDBView>
                            </MDBCarouselItem>
                            <MDBCarouselItem itemId="3">
                                <MDBView>
                                    <a href="/mostruario"><img className="d-block w-100" src={banner3} alt="Third slide" /></a>
                                </MDBView>
                            </MDBCarouselItem>
                        </MDBCarouselInner>
                    </MDBCarousel>
                    <section>
                        <div className="container">
                            <h2>OFERTAS DATEMPO</h2>
                            <hr />
                            <div className="container_card">
                                {

                                    this.state.listaOferta.map(function (o) {
                                        return (
                                            <div key={o.idOferta}>
                                                <CardOferta
                                                    idOferta={o.idOferta}
                                                    nomeOferta={o.nomeOferta}
                                                    validade={o.validade}
                                                    preco={o.preco.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 3 })}
                                                    imagem={o.imagem}
                                                    descricao={o.descricao}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                    <section className="sobre">
                        <div className="banner_sobre">
                            <h2>SOBRE NÓS</h2>
                            <hr />
                            <p><br /> Você encontrará em nossa plataforma ofertas de produtos como: alimentos que estão perto do
                                vencimento e vestimentas que possuem pouca circulação no estoque. Saiba mais sobre nosso
                        propósito!<br />
                                Nunca é tarde, sempre DATEMPO! </p>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <h2>EMPRESAS PARCEIRAS</h2>
                            <hr />
                            <div className="container_marcas">
                                <img src={MarcaDia} alt="Logo Dia" />
                                <img src={MarcaWalmart} alt="Logo Walmart" />
                                <img src={MarcaPrada} alt="Logo Prada" />
                                <img src={MarcaCalvin} alt="Logo Calvin Klein" />
                            </div>
                        </div>
                    </section>
                </main>
                <Footer></Footer>
            </div >
        );
    }
}

export default Home;
