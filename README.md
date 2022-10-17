# Disbursements Calculation

Let's code!

## How to read this?

I've tried to follow an step by step coding. You'll find my code in the `src` folder and the tests in the `tests` folder.

I've been writing down some explanations about what I thought and the decisions I was making, for facilitating the revision. You can find that at [#Taken steps](#taken-steps). You'll see the commit hash during this coding history.

However, you'll also find some `TODO`s and comments in some files, about things missing.

## What can I run

The only executable thing I could achieve are tests. For run them:

```shell script
npm test 
```

## Taken steps

* I think about this as an independent Service.
* This service has two main responsibilities: Calculate Disbursements and expose them via API.
* So, I focus on the first one, and I create the class structure for making a mental map.
    * I create the application layer as an agnostic entry point to the logic
    * I create the domain entities and service
* _commit_ `287892b71f9d95d6feac40b7735894b722a5879c`


* Now I start coding!
* The main logic in the `DisburmentsCalculationService` so I create a test for it.
* For creating the test I first think about the input. It will require a list of orders. I assume they are already filtered with status completed
* I create the first without implementation, just for following TDD approach. Test is red.
* _commit_ `6de866106816d069eb46ec1af287413456cfe732`


* Now I'm going to implement the `DisbursementsCalculator` service and make the test pass.
    * I'm thinking in how to loop the orders array. I'll try in a more functional way, because I like it :)
* Meanwhile doing the fee calculation, I see I will need to extract logic here (which fee amount to apply). Following TDD I would first hardcode the fee I need for the test, but for time reasons I'm going to create the whole logic in a function directly.
* Now I bit doubt came out: I was starting applying fees per order's amount, but I understand the fee should be applied for the total amount of the disbursement. So I start changing the logic
* **_THINKING_**: I'm wondering if I should assume that the BD already returns the disburses amount already grouped by merchant. The good part is that the DB is faster in these operations, but testing that query is a bit more complicated since it requires an integration test, and we avoid using the domain entities. Due to interview test reasons, I choose doing it programmatically. 
* I created the logic that should calculate the disbursements. The test is green now.
* _commit_ `f4b1dbe4e47da9e5ce9bbff3f18c5ce1f238e78f`


* Following TDD approach, after green, I refactor a bit for improving readibility.
* _commit_ `1821b43f30ddb9ed2c5291b7eff76b5144d6d096`


* Now, I want to add more test for being sure that I'm covering more scenarios. The next I'm going to add is for calculating with more than one merchant and, despite of it could ne also another test, I'll check that is aggregating well amounts of the same merchant.
* Running this test, I noticed that I was calculating wrongly the fee 🤦‍♂️ I fix it ✌️‍
* In the new test I also found a bug in the amount aggregation. New both tests are green.
* _commit_ `ba647f3329d84d543174886b5d9920d578ae6777`


* Since the domain logic works quite well, I feel confortable to move to another layer, the Application.
* Now, I prefer start coding directly in the class, since the `CalculateDisbursementsUseCase` has responsibility more about orchestration. This give the opportunity to reorder ideas and global design.
* I've declared my intentions about the responsibilities of the application layer. And now I have a more clear idea about what is missing, which is mainly the persisting part, and the week input.
* _commit_ `cdd774d4eb6650edf3640e011060664c0d524809`


* Now, since I only have around 30min left, I want to face the API part. I'll use some scaffolding from a previous project
* I start creating the test and the main classes for running an HTTP server with Koa.js framework. However, the 3 hours have passed, so I'm going to commit the current state of the repo.
* _commit_


## Thoughts

* I'm applying a DDD structure, but with Javascript wihtout classes some parts, as the use of Repositories, may look a bit weird
* For the same reason, I started creating Entities, but still not needed in the exercise.
