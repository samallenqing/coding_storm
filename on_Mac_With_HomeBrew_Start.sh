(cd oj-client && exec ng build --watch) &
(exec brew services start redis) &
(cd oj-server && exec npm install) &
(cd oj-server && exec npm start) &
(cd executor && exec python3 executor_server.py) &
(cd executor2 && exec python3 executor_server.py) &
(exec sudo nginx)
