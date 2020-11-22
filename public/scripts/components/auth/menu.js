import Axios from "axios";
import { gameInitialize } from "../../main"; 

/***
 *
 * Front-end Menu Component
 *
 ***/
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

    $('#register-form').on('submit', function (e) {
        e.preventDefault();

        Axios.post('/auth/register', $(this).serialize())
            .then(function (response) {
                alert(response.data.message);
            });
    });

    $('#login-form').on('submit', function (e) {
        e.preventDefault();

        let data = $(this).serialize() + '&socket=' + socket.id;
          Axios.post('/auth/login', data)
            .then(function (response) {
                alert(response.data.message);

                if (response.data.status === 200) {
                    gameInitialize(response.data.user);
                }
            });
    });
});