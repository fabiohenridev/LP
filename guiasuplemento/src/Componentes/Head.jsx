import { useState, useEffect } from 'react';
import './Head.css';

export default function Head() {
    const [corOlho, setCorOlho] = useState('Red');
    const [view, setView] = useState(5);
    const [corTop, setCorTop] = useState(' rgba(62, 62, 62, 0.355)');
    const [menuAberto, setMenuAberto] = useState(false);
    const [backgroundX, setBackgroundX] = useState('rgba(0, 0, 0, 0.2)');
    const [pessoasOnline, setPessoasOnline] = useState(0);

    useEffect(() => {
      const atualizarPessoasOnline = () => {
        const numeroAleatorio = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        setPessoasOnline(numeroAleatorio);
      };
      atualizarPessoasOnline();
      const intervalo = setInterval(atualizarPessoasOnline, 5000);
      return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setBackgroundX((prevBack) => prevBack === 'rgba(0, 0, 0, 0.2)' ? 'rgba(255, 255, 255, 0.34)' : 'rgba(0, 0, 0, 0.2)');
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const Whatsapp = () => {
      window.location.href = "https://wa.me/5584991562754?text=Ol%C3%A1,%20Gostaria%20de%20saber%20mais%20sobre%20o%20e-book...";
    };

    const AbrirMenu = () => {
      setMenuAberto(!menuAberto);
    };

    useEffect(() => {
      const Timer = setTimeout(() => {
        AbrirMenu();
      }, 8000);
      return () => clearTimeout(Timer);
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setCorTop((prevTop) => (prevTop === 'rgba(62, 62, 62, 0.355)' ? 'rgba(84, 84, 84, 0.35)' : 'rgba(62, 62, 62, 0.355)'));
      }, 500);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const interval = setTimeout(() => {
        setView(3);
      }, 7000);
      return () => clearTimeout(interval);
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setCorOlho((prevCor) => (prevCor === 'Red' ? 'white' : 'Red'));
      }, 500);
      return () => clearInterval(interval);
    }, []);

    // Add Meta Pixel Code
    useEffect(() => {
      // Create script element for Meta Pixel
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '3039782552846318');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Create noscript element for Meta Pixel
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=3039782552846318&ev=PageView&noscript=1"
        />
      `;
      document.body.appendChild(noscript);

      // Cleanup on component unmount
      return () => {
        document.head.removeChild(script);
        document.body.removeChild(noscript);
      };
    }, []);

    return (
      <div>
        <div className='DivEyeEye'>
          <div className='DivEye'>
            <div className='Pessoas'>
              <p style={{ backgroundColor: corTop, transition: 'background 0.5s ease-in-out' }}>
                <i id='Eye' className='bi bi-eye-fill Eye' style={{ color: corOlho }}></i>
                {pessoasOnline} Pessoas online no momento...
              </p>
            </div>
          </div>

          {menuAberto && (
            <div className='Menu'>
              <div className='MenuDuvida'>
                <h5 className='Duvida'>FALA, EMPREENDEDOR !</h5>
                <div className='BotaoDuvida'>
                  <button style={{ background: backgroundX, transition: 'background 0.5s ease-in-out' }} onClick={AbrirMenu} className='Close'>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
              <div className='DescricaoDuvida'>
                <div className='ImgDuvida'>
                  <img className='Img' src='./man.png' alt='' />
                </div>
                <div className='ConteudoDuvida'>
                  <p>Olá, me chamo <span className='FabioL'>Fábio lima</span> ! Que bom tê-lo por aqui e ver que decidiu aprender mais sobre o marketing digital.</p>
                </div>
              </div>
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
              <source className='Videoo' src='/videoAnimated.mp4' />
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