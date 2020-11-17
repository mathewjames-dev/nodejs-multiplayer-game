import Axios from "axios";

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
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
});