import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class ajuda extends Component {
    render() {
        return (
            <div>
                <Header />
                <main>
                    <div className="cont_branco" id="accordionExample">
                                <div className="card_aj">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                                            <button className="btn_aj " type="button" data-toggle="collapse" data-target="#collapseOne"
                                                aria-expanded="true" aria-controls="collapseOne">
                                                Como funciona o Datempo<hr />
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                        data-parent="#accordionExample">
                                        <div className="card-body">
                                        O Datempo é um marketplace criado com o intuito de diminuir o desperdício de alimentos, reduzir gastos e ajudar pessoas. 
                                        Alimentos perto do vencimento são anunciados para venda com desconto na plataforma, respeitando o prazo mínimo de 10 dias para a logística de retirada.
                                        Quanto mais perto o produto está do vencimento, maior será o desconto. Aproveite que DATEMPO de comprar!

                                        </div>
                                    </div>
                                </div>
                                <div className="card_aj">
                                    <div className="card-header" id="headingTwo">
                                        <h2 className="mb-0">
                                            <button className="btn_aj" type="button" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Como anunciar os produtos<hr />
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                        Os fornecedores podem anunciar produtos que estão perto do vencimento ou que desejam aplicar algum desconto. É necessário informar a data de validade, especificar a descrição do alimento, localização do estabelecimento para retirada e incluir foto.
                                        O produto ficará disponível no mostruário do site até ser reservado e marcado pelo próprio fornecedor como retirado.

                                        </div>
                                    </div>
                                </div>
                                <div className="card_aj">
                                    <div className="card-header" id="headingThree">
                                        <h2 className="mb-0">
                                            <button className="btn_aj" type="button" data-toggle="collapse"
                                                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Opções de retirada<hr />
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                        A reserva do produto pode ser feita apenas por usuários cadastrados na plataforma. Caso o pedido seja realizado para outra pessoa, basta informar o PIN e dados do cadastro no momento da retirada do alimento
                                        biliza pela entrega dos produtos. Cada usuário é responsável pelo seu deslocamento até o fornecedor para retirar a mercadoria.
                                </div>
                                    </div>
                                </div>
                        <div className="card_aj">
                            <div className="card-header" id="headingfor">
                                <h2 className="mb-0">
                                    <button className="btn_aj" type="button" data-toggle="collapse"
                                        data-target="#collapsefor" aria-expanded="false" aria-controls="collapsefor">
                                        Como reservar no site<hr />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapsefor" className="collapse" aria-labelledby="headingfor" data-parent="#accordionExample">
                                <div className="card-body">
                                Assim que o usuário se interessar pela oferta, basta clicar no botão reservar e gerar o PIN do pedido de reserva. Com as informações de cadastro e número do PIN, basta entrar em contato com o fornecedor e retirar a mercadoria em cada loja responsável.
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
export default ajuda;