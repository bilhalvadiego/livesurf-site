<?php
/**
 * Plugin Name: LiveSurf Geek Mode
 * Description: Toggle da skin de terminal do news.livesurf.app + datilografia da materia.
 * Version: 1.0.0
 *
 * ⚠️ DESTINO: wp-content/mu-plugins/livesurf-geek-mode.php
 * (NAO e a pasta plugins/. "mu" = must-use: ativa sozinho, nao aparece na
 * lista para alguem desativar sem querer, e um erro aqui derruba so a propria
 * funcao — nao o site.)
 *
 * Sobe pelo gerenciador de arquivos da Hostinger, junto com livesurf-geek.js
 * na MESMA pasta. Existe porque o Customizer do WordPress so aceita CSS, e o
 * toggle precisa de JavaScript.
 *
 * Fonte versionada: livesurf-site/assets/news/ — ver o README de la.
 */

if (!defined('ABSPATH')) {
    exit;
}

define('LIVESURF_GEEK_VERSAO', '1.0.0');

/**
 * O atributo `data-geek` PRECISA existir antes da primeira pintura.
 *
 * ⚠️ Se isto fosse para o rodape (ou para um script com `defer`), o leitor
 * veria o site claro e ele viraria verde a cada carregamento. Por isso e
 * inline, no <head>, com prioridade 1 — antes de qualquer outra coisa.
 *
 * O cookie e lido em JS, e nao em PHP, de proposito: paginas de portal costumam
 * ser servidas por cache (a Hostinger tem o seu), e o HTML cacheado carregaria
 * a escolha de OUTRO visitante. Decidir no navegador imuniza contra isso.
 */
add_action('wp_head', function () {
    ?>
<script>(function(){try{if(/(?:^|;\s*)ls_geek=1/.test(document.cookie)){document.documentElement.setAttribute('data-geek','1');}}catch(e){}})();</script>
    <?php
}, 1);

/**
 * O JS do toggle, da datilografia e do cursor. No rodape porque depende do DOM
 * montado — e nada dele afeta a primeira pintura.
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script(
        'livesurf-geek',
        plugins_url('livesurf-geek.js', __FILE__),
        [],
        LIVESURF_GEEK_VERSAO,
        true
    );
});
