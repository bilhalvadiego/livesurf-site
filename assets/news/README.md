# Identidade do news.livesurf.app

`identidade-livesurf.css` **não é servido daqui**. Ele é colado em
**WordPress → Aparência → Personalizar → CSS adicional** do `news.livesurf.app`.

Este diretório existe para o arquivo ter histórico e rollback — antes ele vivia só
num scratchpad temporário, e a única cópia da identidade do portal podia sumir.

Ao alterar: editar aqui, commitar, e **depois** colar no Customizer. O que está no
ar é sempre o conteúdo deste arquivo.

## Os três arquivos e onde cada um vai

⚠️ **Destinos diferentes.** Copiar um para o lugar do outro não dá erro — só
não funciona.

| arquivo | destino |
|---|---|
| `identidade-livesurf.css` | Customizer → **CSS adicional** (colar o conteúdo) |
| `livesurf-geek-mode.php` | `wp-content/**mu-plugins**/` (upload) |
| `livesurf-geek.js` | `wp-content/**mu-plugins**/` (mesma pasta do .php) |

`mu-plugins` (must-use) e não `plugins`: ativa sozinho, não aparece na lista
para alguém desativar sem querer, e um erro nele derruba só a própria função.

## Geek Mode

O CSS traz **as duas peles num arquivo só**: a identidade padrão, e o tema de
terminal escopado em `html[data-geek="1"]`. O leitor escolhe pelo botão
"> GEEK"; sem o atributo, nenhuma regra geek casa.

- O atributo é escrito por um **script inline no `<head>`**, pelo mu-plugin.
  ⚠️ Se fosse no rodapé, o site apareceria claro e viraria verde a cada
  carregamento.
- A escolha vive num cookie `ls_geek` em **`.livesurf.app`** (domínio-pai), o
  que faz ela valer também no `observatorio.livesurf.app` — subdomínios não
  compartilham `localStorage`, mas compartilham cookie do pai.
- **Nenhum asset novo:** o lockup e a capa padrão vão ao verde por
  `filter: hue-rotate(118deg) saturate(2.2) brightness(1.5)` — o laranja
  `#e8462c` vira `#00ff00` e o wordmark claro fica claro (branco não tem
  saturação para girar).
- A datilografia da matéria mexe **só em nós de texto**, para não apagar links,
  negrito e o rodapé "Fonte:".

⚠️ Os `@import` de fonte têm que ficar **nas primeiras linhas**. `@import`
depois de qualquer regra é ignorado pelo navegador e as fontes somem sem erro.

## Assets referenciados

Ficam em `/wp-content/uploads/` do WordPress, subidos por FTP/gerenciador de
arquivos — **não** pela biblioteca de mídia, que bloqueia SVG:

- `livesurf-horizontal-dark.svg` — lockup do cabeçalho
- `livesurf-thumb-default.svg` — capa padrão dos posts sem imagem

Origem dos dois: `/mnt/c/Users/bilha/Downloads/livesurf-brand/logo/`.
