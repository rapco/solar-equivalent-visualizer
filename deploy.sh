#!/bin/bash
echo "==> Actualizando repositorio desde GitHub..."
git pull origin main

echo "==> Reconstruyendo y reiniciando contenedores Docker..."
docker compose down
docker compose build --no-cache
docker compose up -d

echo "==> ¡Despliegue completado con éxito!"