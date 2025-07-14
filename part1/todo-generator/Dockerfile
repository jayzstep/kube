FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY generate-todo.sh .

RUN chmod +x generate-todo.sh

CMD ["./generate-todo.sh"]
