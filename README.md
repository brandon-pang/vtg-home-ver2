## Project build

  1. 최신 git repository를 ```git pull origin master```.
  2. 만약 ```yarn```이 인스톨 되어있지 않은경우, Package Manager [yarn](https://yarnpkg.com/getting-started/install) 을 인스톨.
    - yarn은 Package Manager로 프로젝트 실행/빌드를 위해 필수입니다.
    - 링크 클릭 후 가이드에 따라 설치하시길 바랍니다.
  3. 프로젝트 폴더(front-end)내에서 터미널 실행.
  4. ```yarn install``` 명령어를 실행하여 프로젝트에 필요한 모듈을 인스톨.
  5. ```yarn start``` 명령어를 실행하여 프로젝트가 시작되는지 확인.
  6. ```yarn build``` 명령어를 실행하면 프로젝트 빌드를 시작
  7. 빌드가 끝이 나면 프로젝트 폴더내에 Production build인 ```build``` 폴더가 생성이 된걸 확인.
  8. ```build```폴더내의 파일들을 서버내에 있는 폴더에 copy & paste.
  [스크린샷](https://ibb.co/hyCp2mQ)
  9. iis Manager에서 웹페이지 Restart.
  10. [웹페이지](vertigogames.com) 확인.