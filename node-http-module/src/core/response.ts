import { OutgoingMessage } from "http";

(OutgoingMessage.prototype as any).json = function (data) {
  const _this = this as OutgoingMessage;
  _this.write(JSON.stringify(data));
  _this.end();
};
