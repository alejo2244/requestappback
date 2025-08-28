# Usa una imagen oficial de Node
FROM node:18

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto que usa tu API (ajústalo si usas otro)
EXPOSE 3002

# Comando para iniciar la app
CMD ["node", "index.js"]