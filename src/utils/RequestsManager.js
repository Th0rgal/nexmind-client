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

    sendDownloadRequest(hash) {
        return this.sendRequest("download", {
            'hash': hash
        });
    }

    sendUploadForm(name, type, description, hash, chunk, spaces, file) {
        var data = new FormData();
        data.append("name", name);
        data.append("type", type);
        data.append("desc", description);
        data.append("hash", hash);
        data.append("chunk", chunk);
        data.append("spaces", spaces);
        data.append("file", file);
        return this.sendMultipartRequest("upload", data)
    }

    sendMultipartRequest(route, data) {
        return fetch(this.url + route, {
            method: "POST",
            headers: {
                'Authorization': this.token
            },
            body: data
        })
    }

    sendRequest(route, parameters) {
        let formBody = [];
        for (const property in parameters) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(parameters[property]);
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