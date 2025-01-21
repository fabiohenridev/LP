import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {

  const [menuAberto, setMenuAberto] = useState(false);
  const [privacidade, setPrivacidade] = useState(false);
  const [largura, setLargura] = useState(0);
  const [adm, setAdm] = useState(false);
  const [senha, setSenha] = useState('');
  const [divSenha, setDivSenha] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [corOlho, setCorOlho] = useState(' rgb(0, 255, 60)');

  useEffect(()=>{

     const interval = setInterval(()=>{

       setCorOlho((prevCor)=>prevCor ===' rgb(0, 255, 60)'? 'white': ' rgb(0, 255, 60)');

     }, 500)

     return () => clearInterval(interval);


  }, [])
  
  useEffect(() => {
    // Função que simula a contagem de usuários online
    const updateOnlineStatus = () => {
      const currentUsers = parseInt(localStorage.getItem('onlineUsers') || '0');
      setOnlineUsers(currentUsers);
    };

    // Aumenta a quantidade de usuários online ao acessar a página
    const addUser = () => {
      let currentUsers = parseInt(localStorage.getItem('onlineUsers') || '0');
      localStorage.setItem('onlineUsers', currentUsers + 1);
      updateOnlineStatus();
    };

    // Remove o usuário da contagem quando a aba é fechada ou o usuário sai
    const removeUser = () => {
      let currentUsers = parseInt(localStorage.getItem('onlineUsers') || '0');
      localStorage.setItem('onlineUsers', currentUsers - 1);
      updateOnlineStatus();
    };

    window.addEventListener('beforeunload', removeUser);  // Quando o usuário fecha a aba ou navega
    addUser();  // Quando o usuário entra na página

    updateOnlineStatus();  // Atualiza o contador

    return () => {
      removeUser();  // Remove o usuário ao sair
      window.removeEventListener('beforeunload', removeUser); // Limpa o event listener
    };
  }, []);

  const OpenDivSenha = () =>{
    setDivSenha(true);
  }

  const OpenAdm = () => {
    setAdm(true);
  }

  
  const CloseAdm = () => {
    setAdm(false);
    setDivSenha(false);
  }

  

const SenhaMen = () =>{
  if(senha=='5tlmjt0f2c'){
    alert('ok');
    OpenDivSenha();
  }else{
    alert('somente pessoas cadastradas')
  }
}


  const AbrirMenu = () => {

    setMenuAberto(!menuAberto);

  }

  const Whatsapp = () => {
    window.location.href = "https://wa.me/5584991562754?text=Ol%C3%A1,%20Gostaria%20de%20saber%20mais%20sobre%20o%20e-book...";
  }

  const AbrirPrivacidade = () => {

    setPrivacidade(!privacidade);
    setLargura(500);
    if (privacidade) {
      setLargura(0)
    }

  }

  return (
    <div className="BoxF1">
      <div style={{ marginTop: largura }} className="BoxF2">
        <h4>TODOS OS DIREITOS RESERVADOS</h4>
        <h4 className='Sobre' onClick={AbrirMenu}>SOBRE NÓS</h4>
        {menuAberto && (

          <div className='TextSobre'>
            <p>Bem-vindo à nossa loja de eBooks! Há três anos, estamos no mercado oferecendo uma experiência de leitura digital de alta qualidade para nossos clientes. Com um compromisso constante com a excelência, nossa missão é fornecer eBooks diversificados e enriquecedores que atendam aos mais variados interesses e necessidades.

              Trabalhamos com dedicação para garantir que nossos produtos sejam cuidadosamente selecionados e apresentados, oferecendo materiais educativos, de entretenimento e desenvolvimento pessoal, sempre com um atendimento que prioriza a satisfação do cliente.

              Nosso objetivo é facilitar o acesso ao conhecimento e à diversão de forma prática, rápida e segura, permitindo que você aproveite ao máximo suas leituras. Agradecemos por nos escolher e esperamos que cada leitura seja uma jornada inesquecível!</p>
          </div>

        )}
        <h4 onClick={AbrirPrivacidade} className='Sobre'>POLÍTICAS DE PRIVACIDADE</h4>
        {privacidade && (

          <div className='TextSobre'>
            <p>Nós, da TecHouse, respeitamos sua privacidade e estamos comprometidos em proteger os dados pessoais que você nos confia. Esta política explica como coletamos, usamos e protegemos suas informações.

              1. Coleta de Dados
              Coletamos as informações necessárias para fornecer nossos serviços, como:

              Dados pessoais: Nome, e-mail, endereço de entrega, telefone.
              Dados de pagamento: Informações do cartão ou detalhes bancários para transações seguras.
              Informações de navegação: Cookies e dados de acesso para melhorar sua experiência no site.
              2. Uso das Informações
              Utilizamos os dados para:

              Processar compras e garantir entregas.
              Enviar atualizações sobre pedidos, promoções ou novidades, com seu consentimento.
              Melhorar nossos serviços e personalizar sua experiência.
              Cumprir obrigações legais e regulatórias.
              3. Compartilhamento de Dados
              Não vendemos nem compartilhamos suas informações pessoais com terceiros, exceto:

              Provedores de pagamento e entrega, para completar transações.
              Autoridades legais, em caso de cumprimento de ordens judiciais.
              4. Segurança dos Dados
              Adotamos medidas técnicas e organizacionais para proteger suas informações, incluindo:

              Criptografia de dados.
              Controle de acesso restrito.
              Monitoramento contínuo para evitar acessos não autorizados.
              5. Direitos do Usuário
              Você tem o direito de:

              Acessar, corrigir ou excluir seus dados pessoais.
              Retirar consentimento para comunicações de marketing a qualquer momento.
              Solicitar informações sobre como usamos seus dados.
              6. Cookies
              Utilizamos cookies para otimizar a navegação no site e oferecer experiências personalizadas. Você pode gerenciar as preferências de cookies no seu navegador.

              7. Alterações na Política de Privacidade
              Reservamo-nos o direito de atualizar esta política periodicamente. Notificaremos mudanças importantes por e-mail ou no site.</p>
          </div>

        )}

        <h4 className='Sobre' onClick={Whatsapp}>WHATSAPP</h4>
        <h4 onClick={OpenAdm} className='Sobre'>ADM</h4>
        {adm && (

          <div>
            <div className='password'>
            <button onClick={CloseAdm} className='ClosePass'>x</button>
              <h2>Login</h2>
              <input

                value={senha}
                onChange={(e) => setSenha(e.target.value)}

                type='password'></input>
              <button onClick={SenhaMen}>Entrar</button>
              {divSenha &&(
                <div>

                   <h3 style={{color: 'white', fontFamily: 'monospace'}}><i style={{fontSize: '15px', color: corOlho}} class="bi bi-eye-fill"></i> Pessoas online: {onlineUsers}</h3>

                </div>
              )}
            

            </div>
          
          </div>

        )}
        <img src='/pagamentos-2.png'></img>
      </div>
    </div>
  )
}