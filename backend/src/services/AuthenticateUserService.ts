/* 
    - RECEBER CÓDIGO(STRING)
    - RECUPERAR O ACESS_TOKEN NO GITHUB
    - RECUPARAR INFOS DO USUÁRIO NO GITHUB
    - VERIFICAR SE O USUÁRIO EXISTE NO DB
        - SIM -> GERA UM TOKEN
        - NÃO -> CRIA NO DB, GERA UM TOKEN
    - RETORNAR O TOKEN COM AS INFOS DO USUÁRIO
*/

import axios from "axios";
import { sign } from 'jsonwebtoken'

import prismaClient from "../prisma";

interface IAccessTokenResponse {
  access_token: string;
}

interface IUseresponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: { Accept: "application/json" },
      });

    const res = await axios.get<IUseresponse>("https://api.github.com/user", {
      headers: { authorization: `Bearer ${accessTokenResponse.access_token}` }
    });

    const { login, id, avatar_url, name } = res.data

    let user = await prismaClient.user.findFirst({
      where: { github_id: id }
    })

    if (!user) {
      await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      })
    }

    const token = sign({user: {
      name: user.name,
      avatar_url: user.avatar_url,
      id: user.id
    }}, process.env.JWT_SECRET,{
      subject: user.id,
      expiresIn: '1d'
    })

    return { token, user }
  }
}

export { AuthenticateUserService };
