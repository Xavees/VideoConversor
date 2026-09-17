# 🎬 Conversor de Vídeo

Conversor de vídeos desenvolvido para facilitar a conversão de arquivos de vídeo para o formato **MP4**.

O projeto surgiu a partir de uma necessidade real: permitir que vídeos em formatos menos convenientes, como **MPG**, possam ser convertidos e baixados como MP4 de maneira simples.

Atualmente, o back-end realiza todo o processo de upload, conversão e disponibilização dos arquivos utilizando **TypeScript, Express e FFmpeg**.

---

## 🚀 Funcionalidades

- Upload de múltiplos vídeos
- Conversão de vídeos para MP4
- Conversão de até 10 arquivos por requisição
- Limite de 500 MB por arquivo
- Validação dos formatos enviados
- Processamento sequencial dos vídeos
- Download individual dos arquivos convertidos
- Remoção automática dos arquivos temporários
- Limpeza de arquivos antigos ao iniciar a aplicação

---

## 🛠️ Tecnologias

### Back-end

- TypeScript
- Node.js
- Express
- Multer
- FFmpeg
- CORS
- Helmet

### Front-end

O front-end será desenvolvido utilizando:

- React
- TypeScript
- Vite

---

## ⚙️ Como funciona

O usuário envia um ou mais vídeos através da API.

```text
Vídeos
   ↓
Multer
   ↓
Validação
   ↓
FFmpeg
   ↓
Conversão para MP4
   ↓
Links para download
```

Os vídeos são processados sequencialmente para evitar a execução simultânea de várias instâncias do FFmpeg.

Após a conversão, os arquivos originais são removidos e os MP4 ficam disponíveis temporariamente para download.

---

## 📡 API

### Converter vídeos

```http
POST /api/convert
```

Os arquivos devem ser enviados utilizando `multipart/form-data` com o campo:

```text
videos
```

É possível enviar até **10 vídeos** por requisição.

Exemplo de resposta:

```json
{
  "message": "Conversão concluída.",
  "files": [
    {
      "name": "video.mp4",
      "downloadUrl": "/api/download/arquivo-video.mp4"
    }
  ]
}
```

### Baixar vídeo

```http
GET /api/download/:fileName
```

Realiza o download individual de um vídeo convertido.

Caso o arquivo tenha expirado ou não exista:

```json
{
  "error": "Arquivo não encontrado ou expirado."
}
```

---

## 📁 Estrutura do projeto

```text
src/
├── controllers/
│   └── convertController.ts
│
├── routes/
│   └── convertRoutes.ts
│
├── services/
│   └── ffmpegService.ts
│
├── app.ts
└── server.ts

uploads/
converted/
```

### `uploads/`

Armazena temporariamente os vídeos enviados antes da conversão.

### `converted/`

Armazena temporariamente os arquivos MP4 gerados pelo FFmpeg.

Os arquivos dessas pastas não devem ser versionados pelo Git.

---

## 💻 Executando o projeto

Clone o repositório:

```bash
git clone <URL-DO-REPOSITORIO>
```

Entre na pasta:

```bash
cd ConversorMP4
```

Instale as dependências:

```bash
npm install
```

É necessário possuir o **FFmpeg instalado** e disponível no `PATH` do sistema.

Depois execute:

```bash
npm run dev
```

Por padrão, a API ficará disponível em:

```text
http://localhost:3000
```

---

## 🗺️ Próximos passos

- [x] Upload de vídeos
- [x] Integração com FFmpeg
- [x] Conversão para MP4
- [x] Validação dos arquivos
- [x] Conversão de múltiplos vídeos
- [x] Download individual
- [x] Exclusão automática dos arquivos temporários
- [ ] Interface com React + TypeScript
- [ ] Layout responsivo para desktop e dispositivos móveis
- [ ] Integração do front-end com a API
- [ ] Deploy da aplicação

---

## 🎯 Objetivo

O objetivo é manter a aplicação simples: **enviar vídeos, convertê-los para MP4 e baixá-los**.

O projeto não pretende implementar recursos como contas de usuário, histórico de conversões ou armazenamento permanente dos vídeos.

---

## 👨‍💻 Autor

**Luis Fernando Almeida de Oliveira**

GitHub: **Xavees**