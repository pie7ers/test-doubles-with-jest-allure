# TEST-DOUBLES

This project is a practice of test doubles and integration testing uisng Jest and Allure.

| Name                                           | What is?                                                                                 | When to use it                                                                                      | Adventage                                                    | Disadventage                                                          | Example                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------             | ------------------------------------------------------------ | --------------------------------------------------------------        | --------------------------------------------------------------------------- |
| **Stub**                                       | Fake class/method that returns a **fixed response**                                      | When your code depends on something external but you only care about result                         | Easy to create, highly controlled                            | Has no logic, only harcoded responses                                 | A `AuthServiceStub` that always retunrs   `{ id:99, username:"stub-user" }` |
| **Fake**                                       | Fake implementation but **functional** (eg. in memory)                                   | When you want to test the logic without depend on a real DB/API, but you need simulate the behavior | Allows to simulate dynamic data (adds, deletes)              | it's no similar to the real implementation (there may be differences) | `InMemoryUserRepository` that store users in an array                       |
| **Spy**                                        | Object that **records calls** to real or fake methods.                                   | When you want to check if something was called, how mane and which parrams                          | Useful for validating interaction                            | It does not validate logic only what was called                       | Spy that `emailService.send()` was called once with a certain `email`       |
| **Mock**                                       | Object prepaired that **checks call expectations**.                                      | When validating iterations matters more than the final result                                       | Automatiza verificación de interacciones                     | More rigid, can break easily                                          | A mock repo that expects `findByUser("alice")`                              |
| **Mock Server**                                | A server that mimics a real backend may be built with Express or others                  | When you run integration tests or E2E and you do not control the service/backends.                  | Gives you full control over responses (2XX, 4XX, 5XX...)     | It's an additional server to mantain                                  | Raising `mockBackendY.com` to replace `backendY.com` in dev/test            |

- For unit testing use: stub, fake, spy, mock
- For integration testing use: mock server

## Prerequisites  

Having installed:  

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
       alt="Node.js" width="25" height="25"/> [Node.js](https://nodejs.org/)  

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
       alt="Docker" width="25" height="25"/> [Docker](https://www.docker.com/get-started/) *(optional, only if you want to validate the [test pipeline locally](#test-pipeline-locally))*  

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
       alt="Java" width="25" height="25"/> [Java](https://www.java.com/es/download/manual.jsp) *(required for Allure reports)*  

## Local Setup

Run:
- npm ci
- npm run make
- check package.json for more commands
    - for the following commands, validate the port is the same in .env:
        - ci:test
        - ci:test:allure

## Test Pipeline Locally

- brew install act #install for testing pipeline locally
- act -j test -s ACT=true
