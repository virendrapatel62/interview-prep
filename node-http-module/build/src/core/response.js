import { OutgoingMessage } from "http";
OutgoingMessage.prototype.json = function (data) {
    const _this = this;
    _this.write(JSON.stringify(data));
    _this.end();
};
//# sourceMappingURL=response.js.map