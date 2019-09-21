const path = require("path");
module.exports = {
    outputDir: path.resolve(__dirname, "../server/public/dist"),
    devServer: {
        proxy: "http://localhost:4444"
    }
};
