import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// 1. Create a function that returns the extended client
const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

// 2. Infer the type of this extended client
type PrismaClientExtended = ReturnType<typeof prismaClientSingleton>;

// 3. Use this new extended type in your global declaration
declare global {
  var prisma: PrismaClientExtended | undefined;
}

// 4. Use the singleton function to create the client
const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;