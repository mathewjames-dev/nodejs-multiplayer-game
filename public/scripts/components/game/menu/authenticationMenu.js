/***
 *
 * Authentication Menu Front-end File
 * This will be utilized to house the jQuery for the authentication menu
 * It will also login the user then initialize the game start for the user.
 *
 ***/

import * as Game from "../game";

$(function () {
    $('.login').on('click', function () {
        $('#login-register').hide();
        $('#login-form').show();
    });

    $('.login-form-register').on('click', function () {
        $('#login-form').hide();
        $('#register-form').show();
    });

    $('.register').on('click', function () {
        $('#login-register').hide();
        $('#register-form').show();
    });

    $('.register-form-login').on('click', function () {
        $('#register-form').hide();
        $('#login-form').show();
    });

    // When the register form has been submitted we can then submit this to the server.
    $('#register-form').on('submit', async function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        await routes.register(data, function (r) {
            console.log(r);
        });
    });

    // When the login form has been submitted, we can authenticate via the server and then initialize the game.
    $('#login-form').on('submit', async function (e) {
        e.preventDefault();
        let data = $(this).serialize() + '&socket=' + socket.id;
        await routes.login(data, async function (r) {
            if (r.status === 200) {
                global.game = new Game();
                await game.gameInit(r.data.initPackage);
            }
        })
    });
});