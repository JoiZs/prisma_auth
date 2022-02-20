import { PrismaClient, Prisma } from "@prisma/client";

export const checkUser = async (
  client: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  email: string
) => {
  let checkuser = await client.users.findUnique({
    where: { email: email },
  });

  if (checkuser) {
    return checkuser;
  } else {
    return false;
  }
};
