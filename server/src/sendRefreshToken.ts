import { Response } from "express";
export const sendRequestToken = (res: Response, token: string) => {
  res.cookie("jid", token, { httpOnly: true });
};
