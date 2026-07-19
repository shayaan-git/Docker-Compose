# 🐳 Docker-Compose

A hands-on reference project for learning and practicing **Docker & Docker Compose** by containerizing a full-stack JavaScript app — a Node.js backend and a Vite-powered frontend — running as two separate, networked containers.

## 📦 What's Inside

| File / Folder | Description |
|---|---|
| `backend/` | Node.js API server, run in dev mode with `nodemon` |
| `frontend/` | Vite-based frontend app |
| `dockerfile` | Base Dockerfile used to containerize the Node services |
| `docker-compose.yml` | Orchestrates the backend and frontend containers together |
| `.dockerignore` | Excludes `node_modules` and other files from the build context |
| `NOTES.md` | Personal cheatsheet on Docker & Docker Compose concepts and commands |

## 🛠 Tech Stack

- **Node.js** (Alpine image) — backend
- **Vite** — frontend dev server
- **Docker** & **Docker Compose**

## 🚀 Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed

### Run the app
```bash
git clone https://github.com/shayaan-git/Docker-Compose.git
cd Docker-Compose
docker compose up --build
```

This spins up two containers:

| Service | Port | URL |
|---|---|---|
| `backend` | 3000 | http://localhost:3000 |
| `frontend` | 5173 | http://localhost:5173 |

Source code for both services is mounted as a volume, so changes on the host reflect live inside the containers — via `nodemon` on the backend and Vite's dev server on the frontend.

### Stop the app
```bash
docker compose down -v
```
The `-v` flag clears old anonymous volumes so stale `node_modules` don't linger between rebuilds. Follow up with `docker compose up --build` to pick up dependency changes.

## 🔗 Frontend ↔ Backend Communication

In development, the frontend's Vite proxy points at the backend container using its **service name** (`backend`) instead of `localhost`, since each service runs in its own container on the same Docker network:

```js
target: "http://backend:3000"
```

## 🐳 Useful Docker Commands

```bash
docker build -f dockerfile -t <image_name> .    # build an image
docker run -p 8080:3000 <image_name>            # run a container with port mapping
docker ps                                       # list running containers
docker stop <container_id>                      # stop a container
docker rm <container_id>                        # remove a container
docker exec -it <container_id> node --version   # check node version inside a container
```

## 📓 Notes

See [NOTES.md](./NOTES.md) for a personal cheatsheet covering Docker fundamentals (images vs. containers), Compose commands, and how the frontend/backend containers talk to each other.

## 📄 License

No license specified yet — add one if you plan to open-source this project.

---

<details>
<summary>
<b>Expand for more Docker related ↴</b>
</summary>
# Docker-Compose

This repo documents what I learned while getting hands-on with **Docker and Docker Compose** — using a simple full-stack app (Node.js backend + Vite frontend) as the practice ground for containerizing multiple services and getting them to talk to each other.

My detailed notes, in my own words, are in **[NOTES.md](./NOTES.md)**. This README is a summary of the key concepts and how they show up in this repo's setup.

## 🧠 Core Concepts I Learned

**Images vs. Containers**
- An **image** is the blueprint — built from a `Dockerfile`, it defines what goes into the environment (base OS, dependencies, code).
- A **container** is a running instance of an image. The same image can spin up multiple containers.

**Dockerfile**
- Defines how an image is built step by step: base image → working directory → copy dependency files → install → copy source → run command.
- Example from this repo:
  ```dockerfile
  FROM node:20-alpine
  WORKDIR /app
  COPY package.json /app
  COPY package-lock.json /app
  RUN npm install
  COPY . /app
  CMD ["node", "server.js"]
  ```

**Docker Compose**
- Instead of building/running each container manually, `docker-compose.yml` lets you define and run multiple services together with one command.
- In this repo, `backend` and `frontend` are defined as separate services, each with their own build context, ports, and volumes.

**Volumes**
- Used to sync code between the host machine and the container, so changes reflect live without rebuilding the image every time.
- `node_modules` is deliberately kept out of the synced volume (via a separate named volume) since it shouldn't be shared between host and container.

**Networking between containers**
- Compose puts services on the same network automatically, so containers can reach each other **by service name** instead of `localhost`.
- E.g., the frontend's dev proxy targets `http://backend:3000` rather than `http://localhost:3000`, since `backend` is the container's hostname on the Compose network.

**Port mapping**
- `"3000:3000"` and `"5173:5173"` in `docker-compose.yml` map container ports to host ports, so services stay reachable from the browser.
- Same image can run on multiple containers via different port mappings — but two containers can't bind to the same host port at once.

## 📁 What's in the Repo

| File / Folder | Purpose |
|---|---|
| `backend/` | Node.js API service used as one half of the practice app |
| `frontend/` | Vite frontend service used as the other half |
| `dockerfile` | Base image definition shared by the Node services |
| `docker-compose.yml` | Defines and networks the `backend` and `frontend` services together |
| `.dockerignore` | Keeps `node_modules` and other bulky/unneeded files out of the build context |
| `NOTES.md` | My raw notes — commands, explanations, and gotchas from working through this |

## 🐳 Commands I Practiced

```bash
docker build -f dockerfile -t <image_name> .    # build an image
docker run <image_name>                         # run a container
docker run -p 8080:3000 <image_name>            # run with port mapping
docker ps                                       # list running containers
docker stop <container_id>                      # stop a container
docker rm <container_id>                        # remove a container
docker exec -it <container_id> node --version   # check node version inside a running container

docker compose up --build                       # build and start all services
docker compose down -v                          # stop services and clear stale anonymous volumes
```

## 📓 Full Notes

For the complete breakdown — including a few gotchas I ran into (like why `node_modules` shouldn't go into the image, and how to fix stale volumes) — see **[NOTES.md](./NOTES.md)**.

</details>