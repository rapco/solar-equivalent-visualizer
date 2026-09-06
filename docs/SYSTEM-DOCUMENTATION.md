# Solar Equivalent Visualizer — Documentación del Sistema

**Proyecto:** Solar Equivalent Visualizer  
**Repositorio:** `rapco/solar-equivalent-visualizer`  
**Dominio:** `webapp20.chevezonline.com`  
**IP pública OCI:** `150.136.111.113`  
**Última actualización:** 2026-09-06

> Documento técnico vivo. Actualizarlo después de cada cambio importante.

---

# 1. Sistema Operativo y Servidor

## 1.1 Sistema

| Parámetro | Valor |
|---|---|
| Sistema operativo | Ubuntu Minimal |
| Hostname | `instance-20260905-2054` |
| Usuario | `ubuntu` |
| Arquitectura | Pendiente |
| Versión exacta de Ubuntu | Pendiente |

Comandos para documentar versiones:

```bash
hostnamectl
cat /etc/os-release
uname -a
```

## 1.2 Firewall

**UFW:** no está instalado.

```bash
sudo ufw status
```

Resultado:
```text
sudo: ufw: command not found
```

El servidor utiliza `iptables`/`nftables`.

La cadena `INPUT` inicialmente permitía explícitamente SSH (TCP/22) y rechazaba las conexiones nuevas restantes. Se agregó acceso a TCP/80 y TCP/443.

Comprobación:

```bash
sudo iptables -L INPUT -n -v --line-numbers
sudo nft list ruleset
```

> Pendiente: hacer persistentes las reglas después de terminar la configuración.

---

# 2. Oracle Cloud Infrastructure (OCI)

## 2.1 Instancia

| Parámetro | Valor |
|---|---|
| Hostname | `instance-20260905-2054` |
| Usuario | `ubuntu` |
| IP pública | `150.136.111.113` |
| Región | Pendiente |
| Availability Domain | Pendiente |
| Shape | Pendiente |
| OCPU | Pendiente |
| RAM | Pendiente |
| VCN | Pendiente |
| Subnet | Pendiente |

## 2.2 Ingress

| Puerto | Protocolo | Uso | Estado |
|---:|---|---|---|
| 22 | TCP | SSH | ✅ |
| 80 | TCP | HTTP | ✅ |
| 443 | TCP | HTTPS | ⏳ |
| 8080 | TCP | Docker / pruebas | ⚠️ Temporal |

TCP/80 fue habilitado y probado desde Windows:

```powershell
Test-NetConnection webapp20.chevezonline.com -Port 80
```

Resultado confirmado:

```text
TcpTestSucceeded : True
```

> Pendiente: confirmar TCP/443 y posteriormente retirar la exposición pública de TCP/8080.

---

# 3. DNS

Dominio:

```text
webapp20.chevezonline.com
```

Registro:

```text
webapp20 → 150.136.111.113
```

La resolución DNS fue comprobada desde Windows y apunta correctamente a la IP pública.

---

# 4. Software de servidor

## 4.1 Docker

Proyecto en Oracle:

```text
/home/ubuntu/apps/solar-equivalent-visualizer
```

Contenedor:

```text
solar-visualizer
```

Publicación actual:

```text
8080:80
```

Es decir:

```text
Ubuntu :8080 → Docker :80
```

Comandos:

```bash
docker ps
docker compose ps
docker compose logs
```

## 4.2 Nginx

Nginx está instalado en Ubuntu y funciona como reverse proxy.

Configuración:

```text
/etc/nginx/sites-available/webapp20
```

Configuración actual:

```nginx
server {
    listen 80;
    server_name webapp20.chevezonline.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Sitio habilitado:

```text
/etc/nginx/sites-enabled/webapp20
```

El sitio por defecto fue eliminado.

Validación:

```bash
sudo nginx -t
```

Prueba local confirmada:

```bash
curl -I http://127.0.0.1
```

Resultado:

```text
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
```

---

# 5. Aplicación — Solar Equivalent Visualizer

## 5.1 Repositorio

GitHub:

```text
rapco/solar-equivalent-visualizer
```

Proyecto local Windows:

```text
C:\Users\parpe\OneDrive\Documents\Programming\solar-visualizer
```

Aplicación:

```text
C:\Users\parpe\OneDrive\Documents\Programming\solar-visualizer\app
```

## 5.2 Estructura

```text
solar-equivalent-visualizer/
├── app/
│   ├── .dockerignore
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── Dockerfile
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│
└── docker-compose.yml
```

## 5.3 Tecnologías

- React
- Vite
- Three.js / React Three Fiber, según implementación actual
- Node.js para build
- Nginx
- Docker
- GitHub
- Oxlint

### Desarrollo local

Docker **no se utiliza localmente**.

```bash
npm run dev
```

Ejecutado desde:

```text
C:\Users\parpe\OneDrive\Documents\Programming\solar-visualizer\app
```

---

# 6. Dockerfile

Archivo:

```text
app/Dockerfile
```

Contenido:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

# 7. Docker Compose

Archivo:

```text
docker-compose.yml
```

Contenido:

```yaml
services:
  solar:
    build:
      context: ./app
      dockerfile: Dockerfile
    container_name: solar-visualizer
    restart: unless-stopped
    ports:
      - "8080:80"
```

Despliegue:

```bash
cd /home/ubuntu/apps/solar-equivalent-visualizer
docker compose build
docker compose up -d
```

---

# 8. Arquitectura actual

```text
Internet
    │
    ▼
webapp20.chevezonline.com
    │
    ▼
150.136.111.113
    │
    ▼
Oracle Cloud
    │
    ▼
Ubuntu
    │
    ▼
Nginx :80
    │
    ▼
127.0.0.1:8080
    │
    ▼
Docker
    │
    ▼
Nginx dentro del contenedor :80
    │
    ▼
Solar Equivalent Visualizer
```

---

# 9. Estado actual

| Área | Estado |
|---|---|
| Ubuntu | ✅ |
| Docker | ✅ |
| Aplicación | ✅ |
| Nginx host | ✅ |
| DNS | ✅ |
| HTTP :80 | ✅ |
| HTTPS :443 | ⏳ |
| Let's Encrypt | ⏳ |
| HTTP → HTTPS | ⏳ |
| Cerrar :8080 público | ⏳ |
| Persistencia firewall | ⏳ |

---

# 10. Próximos pasos

## HTTPS

1. Confirmar ingress TCP/443 en OCI.
2. Instalar/configurar Certbot.
3. Obtener certificado Let's Encrypt.
4. Configurar HTTPS en Nginx.
5. Probar `https://webapp20.chevezonline.com`.
6. Redirigir HTTP → HTTPS.

## Seguridad

1. Retirar exposición pública de TCP/8080.
2. Mantener públicamente:
   - TCP/22 — SSH
   - TCP/80 — redirección HTTP
   - TCP/443 — HTTPS
3. Persistir reglas de firewall.

## Aplicación

Continuar el desarrollo del Solar Equivalent Visualizer.

---

# 11. Comandos de mantenimiento

### Docker

```bash
docker ps
docker compose ps
docker compose logs
docker compose logs -f
docker compose restart
docker compose build --no-cache
docker compose up -d
```

### Nginx

```bash
sudo systemctl status nginx
sudo systemctl restart nginx
sudo nginx -t
```

### Red

```bash
sudo ss -lntp
sudo iptables -L INPUT -n -v --line-numbers
```

---

# 12. Historial de cambios

| Fecha | Cambio |
|---|---|
| 2026-09-05 | Configuración inicial del proyecto en Oracle Cloud |
| 2026-09-05 | Configuración de Docker y Docker Compose |
| 2026-09-05 | Configuración de Nginx reverse proxy |
| 2026-09-06 | Diagnóstico de acceso HTTP |
| 2026-09-06 | Identificado bloqueo de TCP/80 en iptables |
| 2026-09-06 | Habilitado TCP/80 |
| 2026-09-06 | Confirmado acceso externo a HTTP |
| 2026-09-06 | HTTPS pendiente |

---

# 13. Registro de cambios futuros

Usar esta plantilla:

```text
Fecha:
Componente:
Cambio:
Motivo:
Comandos/configuración:
Resultado:
Rollback necesario:
Notas:
```

---

# 14. Información que NO debe almacenarse aquí

No guardar:

- Contraseñas
- Tokens
- Claves privadas
- Secretos de API
- Credenciales de Oracle Cloud
- Credenciales de GitHub
