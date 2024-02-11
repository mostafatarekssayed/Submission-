import api from "../../../api-client/api";
import authUserMock from "../../../mock/auth-user.mock";
import {logUser} from "../loginController";
import {AuthUser} from "../../../types/auth-user.type";
import {AxiosResponse} from "axios";
describe("middleware test", () => {
    it("test  auth middleware with valid token", async () => {
        const spy = jest.spyOn(api, "post");
        spy.mockResolvedValue({ data:  authUserMock  });
        const user: AxiosResponse<AuthUser> = await logUser('username','password');
        expect(user).toBeTruthy();
    });
});
