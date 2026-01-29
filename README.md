# GHOST Ecosystem 👻

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-MVP%20Active-success)
![Version](https://img.shields.io/badge/version-1.0.0-cyan)
![Stack](https://img.shields.io/badge/tech-React%20%7C%20Electron%20%7C%20Spring%20Boot%20%7C%20AI-purple)

> **"A tecnologia não deve ser apenas inteligente, deve estar viva."**

<div align="center">
  <img src="/ghost-interface-main/public/GHOST.png" alt="GHOST Logo" width="200" />
  <br>
  <i>Inclusão Digital através da Hiper-Automação.</i>
</div>

---

## 💡 O Problema & A Inovação

Enquanto o mercado e as Big Techs (Apple, Amazon, Google) focam massivamente em **Assistentes de Voz** (Alexa, Siri), a **Comunidade Surda** é frequentemente ignorada. Como é que uma pessoa surda interage com uma IA que apenas fala? Como chama o SAMU ou a Polícia numa emergência se não consegue falar ao telefone?

**O GHOST preenche essa lacuna.**
Diferente dos assistentes convencionais, o GHOST é uma **Assistente Visual e Física**. Utilizamos a capacidade de raciocínio da IA Generativa e conectamo-la fisicamente ao computador e à casa do utilizador. O software não apenas "responde a perguntas", ele **age no mundo real** e comunica-se na língua nativa da comunidade (LIBRAS), transformando respostas de áudio em sinais visuais.

O GHOST democratiza o acesso à Inteligência Artificial Generativa e Automação Residencial para quem sempre foi deixado de fora.

---

## 🚀 Funcionalidades Principais

### 🛡️ Módulo S.O.S Acessível (Botão de Pânico)
Pessoas surdas estão vulneráveis em situações de perigo (invasão, saúde súbita).
* **A Solução:** Um Botão de Pânico Silencioso (Desktop/Mobile).
* **O Protocolo de Segurança:**
    1.  Captura a **Geolocalização Exata** via GPS.
    2.  Envia disparos automáticos (WhatsApp via API ou SMS) para os Contatos de Emergência (Pais, Vizinhos, etc.) com a mensagem:
    > *"S.O.S! Sou surdo e estou em perigo. Minha localização: [Link Google Maps]. Por favor, envie ajuda."*
    3.  Imediatamente começa a **gravar o áudio do ambiente** secretamente e salva-o na nuvem como prova/registo.

### 🧠 Tutor Educacional Perpétuo
* **Ensino Poliglota:** Tutor nativo de **LIBRAS**, Inglês, Espanhol e Português.
* **Checkpoint Infinito:** O sistema respeita o ritmo do utilizador. Nunca recomeça do zero; o GHOST lembra-se exatamente de onde parou (lição, XP, nível).

### 🤖 Hiper-Automação (IoT & Desktop)
O GHOST age como uma extensão física do utilizador ("The Hand"):
* **Controle de PC:** Desliga o computador, abre e fecha aplicações e jogos específicos (como Steam, Riot Client) via comando visual.
* **Casa Inteligente:** Liga/desliga lâmpadas inteligentes e Smart TVs.
* **Assistente de Rotina:** Informa visualmente a previsão do tempo e gere a agenda.

### 👁️ Avatar & Presença (Visual Feedback)
* **Rastreamento Híbrido:** Integração com *Ready Player Me*. O avatar segue os movimentos da cabeça do utilizador pela Webcam para manter contacto visual.
* **Fallback Inteligente:** Caso o utilizador não tenha câmara, o avatar passa a seguir o cursor do rato, mantendo a sensação de companhia ("Sempre ao seu lado").
* **Lip-Sync Real:** Sincronia labial baseada na amplitude da voz da IA.

### 📝 Modo Escriba (Segundo Cérebro)
* **Transcrição Inteligente:** O utilizador pode deixar o microfone ligado durante uma aula ou reunião.
* **Resumo Automático:** A IA escuta, transcreve e salva automaticamente as partes mais importantes e resumos diretamente nas anotações ou no **Notion**.

---

## 🛠️ Stack Tecnológica

O projeto segue uma arquitetura moderna de **Monorepo** com separação clara de responsabilidades.

### Frontend (Interface)
* **Framework:** React.js (Vite)
* **Desktop Engine:** Electron
* **Estilização:** TailwindCSS + Augmented-ui (Cyberpunk Aesthetics)
* **3D Engine:** React Three Fiber (Three.js)
* **State Management:** Zustand
* **Motion:** Framer Motion

### Backend (Microservices)
* **Linguagem:** Java 17 (Spring Boot 3)
* **Service Discovery:** Netflix Eureka
* **Gateway:** Spring Cloud Gateway
* **Database:** PostgreSQL (Dados) + Redis (Cache)
* **Mensageria:** RabbitMQ

### Mobile
* **Framework:** React Native (Expo)
* **Foco:** Geolocalização em Background e Biometria.

---

## 📂 Estrutura de Pastas

```bash
ghost-ecosystem/
├── clients/
│   ├── ghost-desktop/      # Interface React + Electron
│   ├── ghost-mobile/       # App Android/iOS
│   └── ghost-web/          # Landing Page Institucional
├── backend/
│   ├── ghost-core/         # Lógica de IA e Orquestração
│   ├── ghost-auth/         # Servidor de Identidade (Oauth2)
│   ├── ghost-integrations/ # Conectores (Notion, Stripe, Maps)
│   └── ghost-discovery/    # Eureka Server
└── infrastructure/
    ├── docker-compose.yml  # Ambientes (Banco, Redis, Broker)
    └── k8s/                # Configurações Kubernetes