class TypeCompleter {

    constructor(filename) {
        this.filename = filename;
    }

    getExtension = () => {
        // generated using https://regexr.com/
        return /(?:\.([^.]+))?$/.exec(this.filename)
    }

    getFileType = () => {
        const extension = this.getExtension()[1].toLowerCase();
        if (["txt", "md", "tex", "yaml", "toml", "json"].includes(extension))
            return "note";
        else if (["docx", "doc", "odt", "ott", "odm", "pdf"].includes(extension))
            return "document";
        else if (["pptx", "ppt", "odp", "otp"].includes(extension))
            return "presentation"
        else if (["png", "jpg", "jpeg", "gif", "svg", "ai", "psd", "tif", "raw", "bmp"].includes(extension))
            return "image";
        else if (["zip"].includes(extension))
            return "archive";
        else if (["exe", "app"].includes(extension))
            return "binary";
        else
            return "unknown";
    }

}

export default TypeCompleter;