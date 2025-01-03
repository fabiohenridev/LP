import { useState, useEffect } from 'react';
import './Head.css';

export default function Head() {
    const [corOlho, setCorOlho] = useState('Red'); // Estado para controlar a cor
    const [view, setView] = useState(5);


   setTimeout(()=>{

     setView(3);
    
   },4000)


  
   


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

            <div className='DivEye'>

                <i
                    id='Eye'
                    className='bi bi-eye-fill Eye'
                    style={{ color: corOlho }}
                ></i>
                <p>{view} pessoas finalizando compra...</p>

            </div>
            <div className='Head'>





                <h1>
                    AS TRÊS MELHORES FORMAS DE{' '}
                    <span className='Internet'>GANHAR DINHEIRO NA INTERNET</span>
                </h1>
                <p>GARANTA JÁ O SEU !</p>
                <div className='img'>
                    <img src='/PhotoAtt.jpg' alt='' />
                </div>
                <div className='texto'>
                    <p>
                        Quer saber como gerar uma renda extra ou até mesmo transformar sua vida
                        financeira trabalhando online? Este eBook é a chave para começar a ganhar
                        dinheiro pela internet de maneira prática, sem precisar sair de casa!
                    </p>
                </div>
                <h2>Por que este eBook é perfeito para você?</h2>
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
