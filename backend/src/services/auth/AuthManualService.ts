import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";

interface RegisterDriverDTO {
  email: string;
  name?: string;
  password: string;

  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleEngine: string;
  vehiclePlate: string;
  vehicleChassis?: string;
}

interface RegisterWorkshopDTO {
  email: string;
  name: string;
  password: string;

  cnpj: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
}

export class AuthManualService {
  static async registerDriver(data: RegisterDriverDTO) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new Error("Já existe um usuário com esse e-mail.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? "",
        role: "MOTORISTA",
        passwordHash,
        driver: {
          create: {
            vehicleBrand: data.vehicleBrand,
            vehicleModel: data.vehicleModel,
            vehicleYear: data.vehicleYear,
            vehicleColor: data.vehicleColor,
            vehicleEngine: data.vehicleEngine,
            vehiclePlate: data.vehiclePlate,
            vehicleChassis: data.vehicleChassis ?? null,
          },
        },
      },
      include: {
        driver: true,
      },
    });

    return user;
  }

  static async registerWorkshop(data: RegisterWorkshopDTO) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new Error("Já existe um usuário com esse e-mail.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: "OFICINA",
        passwordHash,
        workshop: {
          create: {
            cnpj: data.cnpj,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement ?? null,
            city: data.city,
            state: data.state,
          },
        },
      },
      include: {
        workshop: true,
      },
    });

    return user;
  }
}
