import { OutgoingMessage } from "http";
import { Response } from "../types";

(OutgoingMessage.prototype as any).json = function (data) {
  const _this = this as Response;

  _this.write(JSON.stringify(data));
  _this.end();
};
