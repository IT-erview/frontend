#!/usr/bin/env bash

CURRENT_PID=$(lsof -t -i:3000)

if [ -z $CURRENT_PID ]
then
  echo "> 종료할 프로세스가 없습니다."
else
  echo "> kill -9 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

serve -s /var/lib/jenkins/workspace/frontend/build -p 3000 &