# Disbursements Calculation

Let's code!


## Taken steps

* I think about this as an independent Service.
* This service has two main responsibilities: Calculate Disbursements and expose them via API.
* So, I focus on the first one, and I create the class structure for making a mental map.
    * I create the application layer as an agnostic entry point to the logic
    * I create the domain entities and service
* _commit_
* Now I start coding!
* The main logic in the `DisburmentsCalculationService` so I create a test for it.
* For creating the test I first think about the input. It will require a list of orders. I assume they are already filtered with status completed
* I create the first without implementation, just for following TDD approach. Test is red.
* _commit_
* Now I'm going to implement the `DisbursementsCalculator` service and make the test pass.
    * I'm thinking in how to loop the orders array. I'll try in a more functional way, because I like it :)
* Meanwhile doing the fee calculation, I see I will need to extract logic here (which fee amount to apply). Following TDD I would first hardcode the fee I need for the test, but for time reasons I'm going to create the whole logic in a function directly.
* Now I bit doubt came out: I was starting applying fees per order's amount, but I understand the fee should be applied for the total amount of the disbursement. So I start changing the logic
* **_THINKING_**: I'm wondering if I should assume that the BD already returns the disburses amount already grouped by merchant. The good part is that the DB is faster in these operations, but testing that query is a bit more complicated since it requires an integration test, and we avoid using the domain entities. Due to interview test reasons, I choose doing it programmatically. 
* I created the logic that should calculate the disbursements. The test is green now
