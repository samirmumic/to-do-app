<?php

// namics terrific micro v0.9 - 5.8.2013
// fork of terrific micro - Version from 13.06.2013
// modified by ernscht@namics.com
// initially made for simple terrific integration in magnolia
// shares config.json with integration
//
// changes to original version:
// - assets.json in root, renamed to config.json
// - new feature for dependency & exclude patterns in config
// - caching improvements
// - mod markup is needed in .html template (module helper only chooses the right template-file)
// - removed sass support
//
// config:
// - pattern (=glob pattern for assets/{filetype}/)
// - exclude pattern => !x (may contain foldernames), affectts assets & modules
// - exclude but add to every compile call => +x (exact filename in root of assets/{filetype}/)
//




//error_reporting(-1);
//ini_set('display_errors', '1');


define('BASE', dirname(__FILE__) . '/');


function partial($file, $data = array()) {
	require BASE . '/views/partials/' . $file . '.phtml';
}

/**
 * Output module markup.
 */
function module($name, $template = null, $skin = null, $attr = array()) {
	$flat = strtolower($name);
	$dashed = strtolower(preg_replace(array('/([A-Z]+)([A-Z][a-z])/', '/([a-z\d])([A-Z])/'), array('\\1-\\2', '\\1-\\2'), $name));
	$template = $template == null ? '' : '-' . strtolower($template);
	$skin = $skin == null ? '' : ' skin-' . $dashed . '-' . $skin;
	$attributes = ' ';
	$additionalClasses = '';
	foreach ($attr as $key => $value) {
		if ($key === 'class' && $value !== '') {
			$additionalClasses .= ' ' . $value;
		}
		else {
			$attributes .= $key . '="' . $value . '" ';
		}
	}
	echo "<div class=\"mod mod-" . $dashed . $skin . $additionalClasses . "\"" . chop($attributes) . ">" . "\n";
	require dirname(__FILE__) . '/modules/' . $name . '/' . $flat . $template . '.html';
	echo "\n</div>";
}



// pages
$url = str_replace('?' . $_SERVER['QUERY_STRING'], '', $_SERVER['REQUEST_URI']);    // remove query string
$url = preg_replace('/\.[^.\s]{2,4}$/', '', $url);                                  // remove file extension
$route = explode('/', $url);
$action = end($route);
if ($action == "") { $action = 'index'; }
$view = dirname(__FILE__) . '/views/' . $action . '.phtml';

if (is_file($view)) {
	require $view;
}
else {
	header('HTTP/1.0 404 Not Found');
	exit();
}