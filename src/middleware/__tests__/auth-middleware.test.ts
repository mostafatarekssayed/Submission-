import { Request, Response } from "express";
import authUserMock from "../../mock/auth-user.mock";
import onlineAuthMiddleware from "../online-auth-middleware";
import api from "../../api-client/api";
import { status_code } from "../../status-codes";

describe("middleware test", () => {
  it("test  auth middleware with valid token", async () => {
    const spy = jest.spyOn(api, "get");
    spy.mockResolvedValue({ data: authUserMock });
    const req = {
      get: (name: string): string | null => "",
    } as Request;
    const res = {} as Response;
    const next = jest.fn();
    await onlineAuthMiddleware(req, res, next);
    expect(req.user?.id).toBe(authUserMock.id);
    expect(next).toHaveBeenCalled();
  });
  it("test  auth middleware with invalid token", async () => {
    const spy = jest.spyOn(api, "get");
    const res = {
      status: (code: number) => res,
      send: (str) => {},
    } as Response;
    const statusSpy = jest.spyOn(res, "status");
    const next = jest.fn();
    spy.mockRejectedValue({ data: {} });
    const req = {
      get: (name: string): string | null => "",
    } as Request;
    await onlineAuthMiddleware(req, res, next);
    expect(statusSpy).toBeCalledWith(status_code.NOT_AUTHORIZED);
  });
});
