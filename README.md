1. Before test the code, modify your nginx.conf file as follows:

```
worker_processes  1;
events {
    worker_connections  1024;
}

http {
  upstream backend {
  server localhost:5001;
  server localhost:5002;
  }

  server {
  listen       5000;
      location / {
        proxy_pass http://backend;
       }
  }
}
```
2. Build local docker image by running 
```
sh build_docker_image.sh
```

3. If you are running server on Mac and use Homebrew to mange dependencies run
```
sudo sh on_Mac_With_HomeBrew_Start.sh
```
   If you are running server on Linux, run
   ```
   sudo sh on_Linux_start.sh
   ```
