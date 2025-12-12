<?php
namespace Jankx\Dashboard;

if (!defined('ABSPATH')) {
    exit('Cheating huh?');
}

class Jankx_Security_Helper
{
    public static function verify_nonce($field, $action)
    {
        $nonce = isset($_REQUEST[$field]) ? sanitize_text_field(wp_unslash($_REQUEST[$field])) : '';
        if (empty($nonce)) {
            return false;
        }
        return (bool) wp_verify_nonce($nonce, $action);
    }
}
