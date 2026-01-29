# GHOST Ecosystem 👻

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-MVP%20Active-success)
![Version](https://img.shields.io/badge/version-1.0.0-cyan)
![Stack](https://img.shields.io/badge/tech-React%20%7C%20Electron%20%7C%20Spring%20Boot%20%7C%20AI-purple)

> **"A alma na máquina. Sua segurança, seu tutor, seu controle."**

<div align="center">
  <img src="public/GHOST.png" alt="GHOST Logo" width="200" />
  <br>
  <i>Uma Entidade Cibernética de Acessibilidade e Produtividade.</i>
</div>

---

## 📋 Sobre o Projeto

O **GHOST** não é apenas um assistente virtual; é um ecossistema **SaaS (Software as a Service)** projetado para atuar como uma extensão cognitiva e física do usuário.

Construído sob uma arquitetura de microsserviços e envolto em uma estética **Cyberpunk/Tactical**, o GHOST resolve três dores modernas:
1.  **Inclusão:** Ensino de idiomas e LIBRAS acessível.
2.  **Segurança:** Protocolos de emergência para PcD (Pessoas com Deficiência).
3.  **Hiper-Automação:** Controle total de Hardware (PC) e IoT.

---

## 🚀 Funcionalidades Principais

### 🧠 Core & Inteligência (The Brain)
* **Avatar 3D Vivo:** Integração com *Ready Player Me*. O avatar (ASPAS/CHRONO) segue o rosto do usuário via Webcam e possui sincronia labial (Lip-Sync) em tempo real baseada na amplitude da voz.
* **Processamento Natural:** Motorizado pela API **Google Gemini**, capaz de entender contexto, ironia e comandos complexos.
* **Modo Escriba:** Escuta aulas e reuniões, transcreve o áudio e gera resumos automáticos salvos diretamente no **Notion** do usuário.

### 🛡️ Módulo S.O.S (The Guardian)
* **Botão de Pânico Silencioso:** Acionamento rápido em situações de perigo.
* **Protocolo de Emergência:**
    1.  Captura silenciosa de **Geolocalização (GPS)**.
    2.  Gravação de áudio ambiente oculta (Upload para Nuvem).
    3.  Disparo automático de mensagem (WhatsApp/SMS) para Contatos de Confiança.

### 🎓 Módulo Tutor (The Mentor)
* **Ensino Poliglota:** Cursos de Inglês, Espanhol, Português e **LIBRAS**.
* **Infinite Checkpoint:** O sistema salva o progresso exato (XP, Nível, Lição). O usuário nunca recomeça do zero.
* **Gamification:** Sistema de ofensiva (Streak), níveis (A1-C1) e recompensas visuais.

### 🤖 Módulo IoT & Controle (The Hand)
* **Desktop Control (Electron):** Comandos para desligar PC, abrir jogos (Steam), e gerenciar janelas.
* **Automação Residencial:** Integração para controle de luzes e smart TVs.

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
