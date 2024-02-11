import {AuthUser} from "./src/types/auth-user.type";

declare  global  {
    interface Request {
        user?: AuthUser;
    }
}

declare  module 'express'{
    interface Request {
        user?: AuthUser;
    }
}