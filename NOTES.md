> > Notes

Docker ke liye 2 concept pehle jaanlo - Images and Container

## Docker

- Image kaise create hongi uske steps - wo batati hai hum humari => `Docker File` mein.

## Container

- Ab unhi images ko banane ke liye docker build . -t cohort_2
- Container is a running instance of image.
- images execute hoke container mein jaati hain.

## Some Terminal Commands to use docker instead of Docker GUI:

- Build a docker Image (& DON'T FORGET THE DOT IN ⇣ LAST (.))

   > > docker build -f dockerfile -t [image_name] .

- Run Docker image and create a container

   > > docker run [image_name]

- Run Docker image with Port Mapping

   > > docker run -p 8080:3000 [image_name]

- See active Containers

   > > docker ps

- Stop a container from running

   > > docker stop [container_ID]

- Remove/Delete a container

   > > docker rm [container_ID]

---

- Docker compose command (should be excuted where yaml file is)

But before make sure you delete node_modules (as node_modules kabhi bhi image ke ander nahi jaate) and build/re-build the container.

'And also one small thing, add docker images into /app directory (Check in Container files) just for better organization'

**dockerfile**:

```
FROM node:20-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

CMD ["node", "server.js"]

```

---

**yml file**:

```
services:
   backend:
      build: ./Backend [ => path rahega uss folder tak ka jis folder mein dockerfile rahegi]
      ports: [ => Port mapping]
         - "8080:3000"
      volumes:
         - ./Backend:/app
      command: npx nodemon -L server.js

command: → kya run karna hai, wo decide karta hai
volumes: → filesystem kaisa dikhega container ke andar, wo decide karta hai, to yahan pe jaisa humne kara uper dekho host ke /Backend folder ke ander jo bhi hai usko sync kar rahe, container ke /app folder mein

```

> > docker compose up

- Add this -v it is important so old anonymous volume (agar koi stale volume bana ho) clear ho jaye
- And then cmd run it (if) node_modules mein hue changes reflect karne ke liye
   > > docker compose down -v
   > > docker compose up --build

---

## How to check your docker running container's node version

> > docker exec -it [containerID] node --version

> [!NOTE]
> You can do auto scaling by Port mapping. Same image can be on multiple containers, speciality of Docker. But two containers cannot use same port of the Host.

---

## How would frontend and backend will communicate between their respective seperate containers?
- `In Development`, By tweaking vite proxy from:
target: "http://localhost:3000" ⇌ target: "http://backend:3000",
- As backend is the service name of backend container

---
