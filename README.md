# livesurf.app — site institucional

Site público do **LiveSurf**, plataforma de monitoramento e análise de
transmissões ao vivo do YouTube.

Três páginas estáticas, sem build e sem dependências:

| Arquivo | Endereço | Para quê |
| --- | --- | --- |
| `index.html` | `https://livesurf.app` | Apresentação do produto e de como ele usa a YouTube Data API |
| `privacidade.html` | `https://livesurf.app/privacidade.html` | Política de Privacidade (pt-BR + inglês) |
| `termos.html` | `https://livesurf.app/termos.html` | Termos de Serviço (pt-BR + inglês) |

## ⚠️ Por que este repositório existe separado do código

Estas URLs ficam **registradas no Google** como os documentos oficiais do
produto, na auditoria de compliance da YouTube Data API. Se saírem do ar, não é
só um site fora: é desconformidade com uma auditoria aprovada.

Por isso o site **não** mora no repositório do produto (`LiveSurf-app`, privado):
lá ele dependeria da assinatura do GitHub Pro continuar ativa e de o
repositório nunca ser transferido ou arquivado. Aqui, num repositório público
sem nada sensível, ele fica no ar independente de plano, de organização e do
futuro do código.

## Publicação

GitHub Pages, direto da raiz da branch `main`. O arquivo `CNAME` fixa o domínio
`livesurf.app`.

⚠️ **`.app` exige HTTPS** — é um domínio da lista HSTS preload dos navegadores,
então sem certificado válido o site simplesmente não abre, nem com aviso.
Mantenha "Enforce HTTPS" ligado nas configurações do Pages.

## Ao alterar os documentos

Política de Privacidade e Termos de Serviço têm **data de atualização no topo**.
Ao mudar qualquer um dos dois, atualize a data — e, se a mudança for material,
comunique os clientes antes, como os próprios Termos preveem.
