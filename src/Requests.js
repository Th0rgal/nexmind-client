function sendRequest (url, parameters) {
    var formBody = [];
    for (var property in parameters) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(parameters[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: formBody
        })
};

export { sendRequest };