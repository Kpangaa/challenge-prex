This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Primero agregue las variables de entorno, que estan en el pdf que pase.

Como segundo paso instale las dependencias.

Y como tercer paso, corra el proyecto, con el manejador de dependencias que haya escogido:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

El proyecto usa [`next/font`](https://nextjs.org/docs/basic-features/font-optimization).

## Learn More

El proyecto está hecho con mongodb Atlas, para almacenar los datos.
Escogi esta base de datos porque es fácil de desarrollar, por su funcionalidad y el rendimiento a escala. Las credenciales se las pasaré en un txt, para que puedan conectarse.

Para el almacenamiento de archivos usé Cloudinary, que en este caso solo almacena imágenes y videos, porque es facil de usar. Deje las credenciales en bruto para que puedan conectarse

Use Tailwind para los styles y ts como lenguaje.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
