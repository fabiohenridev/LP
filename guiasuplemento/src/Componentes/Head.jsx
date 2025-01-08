import { useState, useEffect } from 'react';
import './Head.css';

export default function Head() {
    const [corOlho, setCorOlho] = useState('Red'); // Estado para controlar a cor
    const [view, setView] = useState(5);
    const [corTop, setCorTop] = useState(' rgba(62, 62, 62, 0.355)');
    const [menuAberto, setMenuAberto] = useState(false);

    // função para abrir menu


    const Whatsapp = () => {
        window.location.href = "https://wa.me/5584991562754?text=Ol%C3%A1,%20Gostaria%20de%20saber%20mais%20sobre%20o%20e-book...";
    }

    const AbrirMenu = () => {
        setMenuAberto(!menuAberto);
    }

    useEffect(() => {

        const interval = setInterval(() => {


            setCorTop((prevTop) => (prevTop == 'rgba(62, 62, 62, 0.355)') ? 'rgba(84, 84, 84, 0.35)' : 'rgba(62, 62, 62, 0.355)')

        }, 500);


        return () => clearInterval(interval);

    }, [])

    useState(() => {

        const interval = setTimeout(() => {

            setView(3)

            return () => clearInterval(interval);

        }, 7000)
    }, [])


    // Alterna a cor a cada 2 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCorOlho((prevCor) => (prevCor === 'Red' ? 'white' : 'Red'));
        }, 500);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <div className='DivEyeEye'>
                <div className='DivEye'>

                    <div className='Pessoas'>

                    <p style={{ backgroundColor: corTop, transition: 'background 0.5s ease-in-out' }} ><i
                        id='Eye'
                        className='bi bi-eye-fill Eye'
                        style={{ color: corOlho }}
                    ></i>{view} Pessoas finalizando compra...</p>

                    </div>
                    <div className='BotaoMenuu'><i onClick={AbrirMenu} class="bi bi-list whatsapp"></i></div>
                  
                </div>

                {menuAberto && (


                    <div className='Menu'>
                        <div className='MenuDuvida'>
                            <h5 className='Duvida'>DÚVIDAS?</h5>
                            <div className='BotaoDuvida'>
                                <button onClick={AbrirMenu} className='Close'><i class="bi bi-x-lg "></i></button>
                            </div>
                        </div>
                        <div className='DescricaoDuvida'>
                            <div className='ImgDuvida'>
                                <img className='Img' src='./man.png'></img>
                            </div>
                            <div className='ConteudoDuvida'>
                                <p>Olá, tudo bem!? Me chamo Fabio Lima. Se você tem dúvidas em relação ao E-book, pode entrar em contato com a gente pelo nosso whatsapp.</p>
                            </div>

                        </div>
                        <button onClick={Whatsapp} className='whatsappD'><i class="bi bi-whatsapp whats"><span className='FaleComAgente'>IR PARA WHATSAPP</span></i></button>
                    </div>


                )}

            </div>
          
            <div className='Head'>





                <h1>
                    AS TRÊS MELHORES FORMAS DE{' '}
                    <span className='Internet'>GANHAR DINHEIRO NA INTERNET</span>
                </h1>

                <div className='img'>
                    <img src='/MonneyOn.jpg' alt='' />
                </div>
                <div className='texto'>
                    <p>
                        Quer saber como gerar uma renda extra ou até mesmo transformar sua vida
                        financeira trabalhando online? Este eBook é a chave para começar a ganhar
                        dinheiro pela internet de maneira prática, sem precisar sair de casa!
                    </p>
                </div>
                <h2>Por que este eBook é perfeito para você?</h2>
                <div className='Video'>

                    <video width={300} loop autoPlay muted>

                        <source className='Videoo' src='/videoAnimated.mp4'></source>

                    </video>

                </div>
                <p>
                    Fácil de Seguir: Métodos claros, diretos e fáceis de aplicar.<br />
                    <br />
                    Sem Complicação: Não precisa de habilidades técnicas avançadas para começar.
                    <br />
                    <br />
                    Estratégias Comprovadas: As três formas mais rentáveis e eficazes para começar
                    a ganhar dinheiro agora.<br />
                    <br />
                    Liberdade de Trabalho: Aprenda como montar um fluxo de trabalho online e ganhar
                    no seu tempo.
                </p>
                <h2 className='tolearn'>O QUE VOCÊ VAI APRENDER?</h2>
                <p>
                    As três formas mais rentáveis de ganhar dinheiro online.<br />
                    <br />
                    Como começar em cada uma das formas com pouco ou nenhum investimento inicial.
                    <br />
                    <br />
                    Ferramentas essenciais para ter sucesso em cada método.<br />
                    <br />
                    Dicas práticas e truques para maximizar os seus ganhos rapidamente.<br />
                    <br />
                </p>
                <img className='Decolar' src='/Decolar.png' alt='' />
            </div>
        </div>
    );
}
