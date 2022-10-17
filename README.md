# Disbursements Calculation

Let's code!

## How to read this?

I've tried to follow an step by step coding, following DDD guidance. You'll find my code in the `src` folder and the tests in the `tests` folder.

I've been writing down some explanations about what I thought and the decisions I was making, for facilitating the revision. You can find that at [#Taken steps](#taken-steps). You'll see the commit hash during this coding history, so you can checkout per commit to see the applied code.

However, you'll also find some `TODO`s and comments in some files, about things missing. I also include an explanation about how I would continue developing in [#Next steps](#next-steps)

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

# Next steps

Here I want to explain how I would continue the exercise if I had a few more hours

1. I'd make integration test with supertest work.
2. I'd add a `listDisbursementsUseCase` which would call a `DisbursementsRepository`. I'd code a test for checking this, asserting the collection
3. I'd implement a persistence service (such a DB) for being able to make that work.
4. I'd include some fixtures in the test, using the previous DB
5. Once I have the first test pass, I'd add the logic in the `listDisbrusementsUseCase` for adding the filter logic, for `merchant_id` and `week`. Each one with its own test.
6. I wouldn't do any security since it is not required

Once I've done this, I think the feature for the API would be ok, so I'd retake the disbursements calculation part:

1. In the `CalculateDisbursementsUseCase` are missing the repositories for getting orders and for persisting disbursements
2. By using the DB connection created previously, I'd developed both implementations.

While writing these, I still have no a clear idea about how to separate the domain from the implementation (in javascript), so I'd google a bit for getting ideas about how do it.

Later on, I would also make of use of the domain entities, `Order`, `Disbursement`, etc, instead of using plain objects.

And probably, once I have all this, I would recheck the whole code for see if there any part that doesn't fit in the whole design.


## Thoughts

* I'm applying a DDD structure, but with Javascript without classes some parts, as the use of Repositories, may look a bit weird
* For the same reason, I started creating Entities, but still not needed in the exercise.
* I don't have a clear idea about how code the repository implementations separately from the domain.
