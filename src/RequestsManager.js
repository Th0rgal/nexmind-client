class RequestsManager {

    constructor(url) {
        this.url = url;
    }

    sendLogin(username, password) {
        return this.sendRequest("login", {
            'username': username,
            'password': password
        });
    }

    sendRequest(route, parameters) {
        var formBody = [];
        for (var property in parameters) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(parameters[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(this.url + route,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: formBody
            })
    };

}

export { RequestsManager };