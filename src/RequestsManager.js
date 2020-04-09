class RequestsManager {

    constructor(url) {
        this.url = url;
    }

    setToken(token) {
        this.token = token
    }

    sendSearch(search) {
        return this.sendRequest("search", {
            'spaces': search
        });
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
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': this.token
                },
                body: formBody
            })
    };

}

export default RequestsManager;