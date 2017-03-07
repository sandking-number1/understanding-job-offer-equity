1 page app to help people understand their job offer equity. Built with JS and React, and a Node/Express server, and MongoDB.

Understanding Job Offer Equity
reference: https://docs.google.com/presentation/d/10err0pmkK5aVieEuilzQh5ez0e1RIJxk7VKkY5MopZA/edit?usp=sharing

idea: build a simple, non-authenticated, 1-page app (could be all JS or some MVC framework)
1.  takes into the account the most simple inputs (# of shares in a grant, grant vesting schedule, strike price, and total number of outstanding shares in the company, valuation of the company)
2. allows the user to input 0 to n fundraising milestones by saying "raising $x on $pre-money valuation (which means that post money valuation is $x+$pre-money and dilution is x/(x+pre-money)
3. allows the user to enter an exit date and exit valuation and then calculates the user take-home based on % ownership at exit and accounting for how much would have vested of their initial grant
- please take a look at slides 14 and 15 as a reference

keeping the UI super simple, I believe the core coding could be done in 4-5 hours as an exercise.

Additionally, if you are familiar with a JS graphing library (or service) you could graph the vesting and these events over time against the personal fully diluted % of ownership



Usage
---

Start the development server with this command:

```
npm start
```



Setup
---

```
npm install
```



Compile
---

```
npm run compile
```