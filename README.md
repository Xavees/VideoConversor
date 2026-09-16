# 🎬 Video Converter

Conversor de vídeos desenvolvido com **TypeScript**, com o objetivo de permitir a conversão de arquivos de vídeo entre diferentes formatos através de uma aplicação Web.

O projeto surgiu inicialmente da necessidade de converter arquivos **MPG para MP4**, mas a proposta é evoluir para uma aplicação capaz de trabalhar com diferentes formatos de vídeo de maneira simples e acessível.

## 💡 Sobre o projeto

O **Video Converter** permitirá que o usuário envie um arquivo de vídeo, escolha o formato desejado e realize a conversão diretamente pela aplicação.

A conversão será processada no servidor utilizando **FFmpeg**, enquanto uma API será responsável por gerenciar o envio dos arquivos, processamento e entrega do resultado ao usuário.

Inicialmente, o projeto terá suporte para conversões como:

* MPG → MP4
* AVI → MP4
* MOV → MP4
* MKV → MP4
* WEBM → MP4

Novos formatos poderão ser adicionados durante o desenvolvimento.

## ⚙️ Como funcionará

O fluxo principal da aplicação será:

```text
Usuário seleciona um vídeo
        ↓
Upload do arquivo
        ↓
API recebe o vídeo
        ↓
Servidor valida o arquivo
        ↓
FFmpeg realiza a conversão
        ↓
Arquivo convertido é gerado
        ↓
Usuário recebe o vídeo convertido
```

## 🧰 Tecnologias

### Back-end

* TypeScript
* Node.js
* Express
* FFmpeg
* Multer

### Front-end

* React
* TypeScript

## 🎯 Objetivos

Além de criar uma ferramenta funcional, o projeto também tem como objetivo aplicar conceitos relacionados a:

* Desenvolvimento de APIs REST
* Upload e manipulação de arquivos
* Processamento de arquivos no servidor
* Integração entre Front-end e Back-end
* Processos assíncronos
* Tratamento de erros
* Validação de arquivos
* Organização e arquitetura de aplicações Node.js

## 🚧 Status

> 🟡 Em desenvolvimento

Atualmente o projeto está em fase de planejamento e definição da arquitetura.

## 🔮 Possíveis evoluções

Durante o desenvolvimento poderão ser adicionadas funcionalidades como:

* Conversão para diferentes formatos
* Escolha de qualidade e resolução
* Barra de progresso da conversão
* Informações sobre o vídeo enviado
* Conversão de áudio
* Extração de áudio de vídeos
* Histórico de conversões
* Conversão de múltiplos arquivos
* Limites de tamanho para uploads
* Exclusão automática de arquivos temporários

## 📚 Motivação

O projeto também será utilizado como forma de aprofundar conhecimentos em **TypeScript e desenvolvimento Back-end**, principalmente trabalhando com APIs, processamento de arquivos e integração com ferramentas externas.

---

Desenvolvido por **Luis Fernando Almeida de Oliveira**.
