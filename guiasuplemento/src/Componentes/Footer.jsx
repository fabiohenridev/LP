import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onDisconnect, onValue } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import './Footer.css';
import axios from 'axios';

const handleDownload = () => {
  // Realizando a requisição para o backend que fornecerá o arquivo para download
  axios({
    url: 'https://backend-psi-eight-64.vercel.app/', // URL do seu backend
    method: 'GET',
    responseType: 'blob',  // Necessário para o download de arquivos binários
  })
    .then((response) => {
      // Criando um link para fazer o download do arquivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ganharOnline.pdf'; // Nome do arquivo a ser salvo
      document.body.appendChild(a);
      a.click();
    })
    .catch((error) => {
      console.error("Erro ao baixar o arquivo", error);
    });
};

// Função para registrar um usuário online
const registerUser = (userId, database) => {
  const userRef = ref(database, 'onlineUsers/' + userId);

  // Registrar o usuário como online com o timestamp (para poder determinar a última vez que ele foi ativo)
  set(userRef, {
    isOnline: true,
    lastSeen: Date.now()  // Marca o horário da última interação
  });

  // Garantir que o status "offline" seja atribuído quando a conexão for perdida
  onDisconnect(userRef).set({
    isOnline: false,
    lastSeen: Date.now(),  // Atualiza a hora do último visto ao desconectar
  });
};

// Função para remover um usuário online
const removeUser = (userId, database) => {
  const userRef = ref(database, 'onlineUsers/' + userId);
  set(userRef, {
    isOnline: false,
    lastSeen: Date.now()  // Garante que o usuário seja marcado como offline ao ser removido
  });
};

// Função para verificar e contar o número de usuários online (baseado no timestamp)
const getOnlineUsers = (setOnlineUsers, database) => {
  const usersRef = ref(database, 'onlineUsers');
  onValue(usersRef, (snapshot) => {
    const users = snapshot.val();
    if (users) {
      // Filtra e conta apenas os usuários online que têm `lastSeen` recente (menos de 5 minutos atrás)
      const onlineUsers = Object.keys(users).filter(userId => {
        const user = users[userId];
        // Considera apenas usuários com status online e com o `lastSeen` atualizado nos últimos 5 minutos
        return user.isOnline && (Date.now() - user.lastSeen < 5 * 60 * 1000);  // Considera online se a última atividade foi nos últimos 5 minutos
      }).length;

      setOnlineUsers(onlineUsers);  // Atualiza o estado com a quantidade de online
    } else {
      setOnlineUsers(0);  // Caso não haja nenhum usuário online
    }
  });
};

export default function Footer() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [privacidade, setPrivacidade] = useState(false);
  const [largura, setLargura] = useState(0);
  const [adm, setAdm] = useState(false);
  const [senha, setSenha] = useState('');
  const [divSenha, setDivSenha] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [corOlho, setCorOlho] = useState('rgb(0, 255, 60)');

  useEffect(() => {
    // Configuração do Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCIRvIecgxWjdpQ-So34HMQd43p9hodLzQ",
      authDomain: "henriquelima-e3e88.firebaseapp.com",
      projectId: "henriquelima-e3e88",
      storageBucket: "henriquelima-e3e88.firebasestorage.app",
      messagingSenderId: "473781875946",
      appId: "1:473781875946:web:1dea7875cf570f13761393",
      measurementId: "G-F02G7EDC98",
      databaseURL: "https://henriquelima-e3e88-default-rtdb.firebaseio.com/"
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const analytics = getAnalytics(app);

    // Gerar um ID único para cada usuário (usando o timestamp)
    const userId = Date.now(); // Gerando um ID único com o timestamp

    // Registrar o usuário no Firebase
    registerUser(userId, database);

    // Obter o número de usuários online
    getOnlineUsers(setOnlineUsers, database);

    // Limpar ao sair (quando o usuário fecha a aba ou sai da página)
    return () => {
      removeUser(userId, database);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCorOlho((prevCor) => (prevCor === 'rgb(0, 255, 60)' ? 'white' : 'rgb(0, 255, 60)'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const OpenDivSenha = () => {
    setDivSenha(true);
  };

  const OpenAdm = () => {
    setAdm(true);
  };

  const CloseAdm = () => {
    setAdm(false);
    setDivSenha(false);
  };

  const SenhaMen = () => {
    if (senha === 'dhs6hsj') {
      alert('ok');
      OpenDivSenha();
    } else {
      alert('somente pessoas cadastradas');
    }
  };

  const AbrirMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const Whatsapp = () => {
    window.location.href = 'https://wa.me/5584991562754?text=Ol%C3%A1,%20Gostaria%20de%20saber%20mais%20sobre%20o%20e-book...';
  };

  const AbrirPrivacidade = () => {
    setPrivacidade(!privacidade);
    setLargura(500);
    if (privacidade) {
      setLargura(0);
    }
  };

  return (
    <div className="BoxF1">
      <div style={{ marginTop: largura }} className="BoxF2">
        <h4>TODOS OS DIREITOS RESERVADOS</h4>
        <h4 className="Sobre" onClick={AbrirMenu}>SOBRE NÓS</h4>
        {menuAberto && (
          <div className="TextSobre">
            <p>Bem-vindo à nossa loja de eBooks! Há três anos, estamos no mercado oferecendo uma experiência de leitura digital de alta qualidade para nossos clientes. Com um compromisso constante com a excelência, nossa missão é fornecer eBooks diversificados e enriquecedores que atendam aos mais variados interesses e necessidades.</p>
          </div>
        )}
        <h4 onClick={AbrirPrivacidade} className="Sobre">POLÍTICAS DE PRIVACIDADE</h4>
        {privacidade && (
          <div className="TextSobre">
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
        <h4 className="Sobre" onClick={Whatsapp}>WHATSAPP</h4>
        <h4 onClick={OpenAdm} className="Sobre">ADM</h4>
        {adm && (
          <div>
            <div className="password">
              <button onClick={CloseAdm} className="ClosePass">x</button>
              <h2>Login</h2>
              <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
              />
              <button onClick={SenhaMen}>Entrar</button>
              {divSenha && (
                <div>
               
                  <div className='baixar'>
                  <h3 style={{ color: 'white', fontFamily: 'monospace', fontSize: '12px' }}>
                    <i style={{ fontSize: '10px', color: corOlho }} className="bi bi-eye-fill"></i> Pessoas online: {onlineUsers}
                  </h3>
                  <button className='e-book' onClick={handleDownload}>Baixar e-book</button>
                  </div>
                </div>
              )}
            </div>
           
          </div>
        )}
        <img src="/pagamentos-2.png" alt="Pagamentos" />
      </div>
   
    </div>
  );
}
