# Prints do site

Cada `<figure class="print" data-print="X">` em `index.html` espera uma imagem
com o nome correspondente. **Enquanto não há `<img>` dentro, a figura não
ocupa espaço nenhum** — o site fica correto antes e depois dos prints.

| data-print | Tela a capturar |
| --- | --- |
| `observador` | Observação de chat em tempo real, com mensagens chegando |
| `cortes` | Editor/antessala de corte, mostrando os momentos sugeridos |
| `roteiro` | Roteiro com as ondas de vídeos e notícias montadas |
| `radar` | Radar de trends com tópicos em alta |
| `programacao` | Grade de programação (semanal é a mais legível) |
| `tv` | Mosaico com várias lives ao mesmo tempo |
| `relatorios` | Dashboard ou relatório de canal consolidado |
| `catalogo` | Catálogo de vídeos publicados |

## Como capturar

- **Largura mínima 1280px** — abaixo disso fica borrado em tela retina.
- **PNG** para telas com texto (mantém a tipografia nítida); JPG só se o print
  for dominado por thumbnails de vídeo.
- **Sem dados sensíveis**: nomes reais de clientes, e-mails, valores de
  faturamento. O print vai para uma página pública e para a auditoria do Google.
- **Tema escuro**, para casar com o site.

## Como inserir

Coloque o arquivo aqui e adicione o `<img>` dentro da figura correspondente:

```html
<figure class="print" data-print="tv">
  <img src="./assets/prints/tv.png" alt="Mosaico com várias transmissões ao vivo simultâneas" loading="lazy">
  <figcaption>Mosaico ao vivo</figcaption>
</figure>
```

O `alt` não é decorativo: descreve o que a tela mostra, para quem usa leitor
de tela e para o buscador.
