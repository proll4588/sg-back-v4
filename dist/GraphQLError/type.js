export var ServerExceptions;
(function (ServerExceptions) {
    ServerExceptions[ServerExceptions["RESULTS_IS_ALREADY_EXIST"] = 0] = "RESULTS_IS_ALREADY_EXIST";
    ServerExceptions[ServerExceptions["WRONG_PDF_FILE"] = 1] = "WRONG_PDF_FILE";
    ServerExceptions[ServerExceptions["USER_IS_NOT_AUTHENTICATED"] = 2] = "USER_IS_NOT_AUTHENTICATED";
    ServerExceptions[ServerExceptions["USER_NOT_FOUND"] = 3] = "USER_NOT_FOUND";
    ServerExceptions[ServerExceptions["PASSWORD_IS_NOT_CORRECT"] = 4] = "PASSWORD_IS_NOT_CORRECT";
    ServerExceptions[ServerExceptions["USER_IS_ALREADY_EXIST"] = 5] = "USER_IS_ALREADY_EXIST";
    ServerExceptions[ServerExceptions["NO_PERMISSION"] = 6] = "NO_PERMISSION";
})(ServerExceptions || (ServerExceptions = {}));
