# Disbursements Calculation

Let's code!


## Taken steps

* I think about this as an independent Service.
* This service has two main responsabilities: Calculate Disbrusements and expose them via API.
* So, I focus on the first one, and I create the class structure for making a mental map.
    * I create the application layer as an agnostic entry point to the logic
    * I create the domain entities and service
* Now I start coding!
* The main logic in the `DisburmentsCalculationService` so I create a test for it.
* For creating the test I first think about the input. It will require a list of orders. I assume they are already filtered with status completed
* I create the first without implementation, just for following TDD approach