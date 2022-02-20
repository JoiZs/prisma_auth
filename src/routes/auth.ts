import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import argon2 from "argon2";
import { checkUser } from "../utils/verifyUser";
import { createToken } from "../utils/resolveToken";
import { isUser } from "../middleware/isUser";
import { sendMail } from "../utils/sendmail";
import { validRtPW } from "../middleware/isValidPw";

const authRoute = Router();
const client = new PrismaClient();
const regexpemail = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const regexppassword = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
);

interface registerInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!regexpemail.test(email)) {
    return res.json({
      error: {
        type: "email",
        message: "Invalid Email",
      },
    });
  }

  const userExist = await checkUser(client, email);
  if (!userExist) {
    return res.json({
      error: {
        type: "email",
        message: "Email requires to register",
      },
    });
  }

  const verifyPw = await argon2.verify(userExist.password, password, {
    hashLength: 33,
  });

  if (!verifyPw) {
    return res.json({
      error: {
        type: "password",
        message: "Incorrect Password",
      },
    });
  }

  const accToken = createToken(
    { id: userExist.id },
    String(process.env.ACC_SECT),
    "3m"
  );

  const refToken = createToken(
    { id: userExist.id },
    String(process.env.REF_SECT),
    "1y"
  );

  res.cookie("actk_id", accToken, {
    maxAge: 1000 * 60 * 3,
    sameSite: "none",
    secure: true,
  });
  res.cookie("rftk_id", refToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.json({
    data: { message: "Logined" },
  });
});

authRoute.post("/register", async (req, res) => {
  const clientreg: registerInput = req.body;

  if (!regexpemail.test(clientreg.email)) {
    return res.json({
      error: {
        type: "email",
        message: "Invalid Email",
      },
    });
  }

  const alreadyExist = await checkUser(client, clientreg.email);

  if (!!alreadyExist) {
    return res.json({
      error: {
        type: "email",
        message: "Email already exists",
      },
    });
  }

  if (!clientreg.firstname) {
    return res.json({
      error: {
        type: "firstname",
        message: "Missing",
      },
    });
  }

  if (!clientreg.lastname) {
    return res.json({
      error: {
        type: "lastname",
        message: "Missing",
      },
    });
  }

  if (!regexppassword.test(clientreg.password)) {
    return res.json({
      error: {
        type: "password",
        message:
          "Min. 8 characters, 1 letter, 1 number and 1 special character",
      },
    });
  }

  const hash_password = await argon2.hash(clientreg.password, {
    hashLength: 33,
  });
  const createUser = await client.users.create({
    data: {
      id: v4(),
      first_name: clientreg.firstname,
      last_name: clientreg.lastname,
      email: clientreg.email,
      password: hash_password,
    },
  });

  return res.json({
    data: {
      message: "Successfully Register",
    },
  });
});

authRoute.post("/forgetpassword", async (req, res) => {
  const { email } = req.body;

  if (!regexpemail.test(email)) {
    return res.json({
      error: {
        type: "email",
        message: "Invalid Email",
      },
    });
  }

  const userExist = await checkUser(client, email);
  if (!userExist) {
    return res.json({
      error: {
        type: "email",
        message: "Account with that email doesn't exist",
      },
    });
  }

  const token = createToken({ id: v4() }, process.env.ML_SECT!, "1h");

  res.cookie("rpm_id", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: "none",
    secure: true,
  });

  const sendRestPwMail = await sendMail(
    email,
    `<a href="${process.env.CLIENT_URL}/restpw/${userExist.id}">Reset Password</a>`
  );

  return res.json({
    data: {
      message: `Password reset verification link has been sent to ${email} `,
      extra: sendRestPwMail,
    },
  });
});

authRoute.post("/resetpassword", validRtPW, async (req, res) => {
  const { new_password, token_Id } = req.body;

  if (!regexppassword.test(new_password)) {
    return res.json({
      error: {
        type: "password",
        message:
          "Min. 8 characters, 1 letter, 1 number and 1 special character",
      },
    });
  }

  const newPassword = await argon2.hash(new_password, {
    hashLength: 33,
  });
  const updatePassword = await client.users.update({
    where: {
      id: token_Id,
    },
    data: {
      password: newPassword,
    },
  });
  res.cookie("rpm_id", "", { httpOnly: true, maxAge: 0, sameSite: "none" });

  return res.json({
    data: {
      message: "Succefully changed the password.",
    },
  });
});

authRoute.post("/logout", isUser, (req, res) => {
  res.cookie("actk_id", "", { maxAge: 0, httpOnly: true, sameSite: "none" });
  res.cookie("rftk_id", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.json({
    data: {
      message: "Successfully Logout",
    },
  });
});

authRoute.get("/whoami", isUser, async (req, res) => {
  const user = await client.users.findUnique({
    where: {
      //@ts-ignore
      id: req.userId.id,
    },
  });

  if (!user) return res.sendStatus(404);

  return res.json({
    data: {
      message: user?.first_name + " " + user?.last_name,
    },
  });
});

export default authRoute;
