require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/Usuarios");

const users = [
  {
    nombre: "Usuario de prueba 1",
    email: process.env.TEST_USER_1_EMAIL,
    password: process.env.TEST_USER_1_PASSWORD
  },
  {
    nombre: "Usuario de prueba 2",
    email: process.env.TEST_USER_2_EMAIL,
    password: process.env.TEST_USER_2_PASSWORD
  },
  {
    nombre: "Usuario de prueba 3",
    email: process.env.TEST_USER_3_EMAIL,
    password: process.env.TEST_USER_3_PASSWORD
  }
];

async function createTestUsers() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Falta MONGODB_URI en el archivo .env");
  }

  const missingData = users.some((user) => !user.email || !user.password);

  if (missingData) {
    throw new Error("Completa los seis datos TEST_USER en el archivo .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  try {
    for (const userData of users) {
      const email = userData.email.trim().toLowerCase();
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        console.log(`Ya existe, se omite: ${email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      await User.create({
        nombre: userData.nombre,
        email,
        password: hashedPassword,
        rol: "admin",
        activo: true
      });

      console.log(`Usuario de prueba creado: ${email}`);
    }
  } finally {
    await mongoose.disconnect();
  }
}

createTestUsers().catch((error) => {
  console.error("No se pudieron crear los usuarios:", error.message);
  process.exitCode = 1;
});