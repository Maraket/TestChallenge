<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

For Test Challenge provided by SwipeJobs

## Usage

After running app (you can see how to do this below)

Doing a get request on localhost:3000 follower by the userId will pull up the 3 most recommended job:

e.g localhost:3000/0

should return something like below:

```
[{"driverLicenseRequired":false,"requiredCertificates":["The Asker of Good Questions"],"location":{"longitude":"14.013835","latitude":"49.994037"},"billRate":"$19.79","workersRequired":2,"startDate":"2015-11-10T04:11:26.675Z","about":"Eiusmod velit ad et aliquip sint incididunt non excepteur ut consequat ullamco occaecat. Excepteur ullamco tempor ut est. Labore do voluptate dolore elit. Ea dolor voluptate cupidatat cupidatat non ad cillum pariatur in. Id aliqua laborum ut voluptate laboris elit. Commodo mollit proident proident voluptate. Tempor consectetur minim reprehenderit aute ea quis tempor minim adipisicing proident exercitation magna tempor.","jobTitle":"Ambassador of buzz","company":"Zytrac","guid":"562f66aad42092ef776f7ccb","jobId":26},{"driverLicenseRequired":false,"requiredCertificates":["Outstanding Innovator"],"location":{"longitude":"13.716166","latitude":"49.93936"},"billRate":"$10.24","workersRequired":2,"startDate":"2015-11-12T21:46:01.562Z","about":"Sit consectetur sunt labore exercitation minim aliqua tempor fugiat tempor sint eu non consequat in. Aliquip dolore id exercitation nostrud aliquip magna eu amet ea esse fugiat. Tempor anim aute est nulla ea laboris ut cupidatat. Excepteur in commodo minim esse reprehenderit elit dolor elit cillum labore adipisicing Lorem. Aliquip commodo labore dolore ullamco cupidatat id excepteur aliquip.","jobTitle":"Sous chef","company":"Multron","guid":"562f66aaa33cc26cdf48198f","jobId":35}]
```

Now note, if you DONT meet any job requirements, so for instance the id you selected is not set to active, or you just don't meet ANY jobs, it'll returned a simple empty array like below:

```
[]
```

In the event we can't find the user, or you enter a bad user id (the code is built to assume the user id is only numbers) then
it'll return a 404 error.

In most other cases if an error occurs a 500 error is thrown, passing the original message through to the response in the message.

Now it should be noted this may need to change to address security and user experience

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ yarn start
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

