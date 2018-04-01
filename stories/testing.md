# Testing 

Since the time is usually rare in student projects it makes sense to work without tests. On the other hand, tests increase the quality and the setup is designed to run especially unit tests.

This leads to the following guideline for testing:

## Spec Tests
Be encouraged to write spec tests. While it is not required to test all functions you are responsible for all your tests to pass. This means that usually there should be a test file that creates the component/service/controller without actually testing its functionality (expect the creation). This means you are responsible for creating the required mocks and providing dependencies. Then, when bugs occur - write a test for it and fix the bug based on the test. This prevents regression. While this may slow you down at the beginning, once you get used to it, it greatly increases productivity.


## End-to-End-Tests
- End-to-End-tests are not required. 
