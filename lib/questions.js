// Financial Derivatives — Question Bank
// Total: 350 questions across 7 sessions
// Each question: { id, session, topic, question, options: [A,B,C,D], correct: 0-3, explanation }

const questions = [
  {
    id: 1,
    session: 1,
    topic: "Definition of Financial Derivatives",
    question: "A financial derivative derives its value from:",
    options: [
      "The brokerage commission structure",
      "The creditworthiness of the issuing exchange",
      "The margin deposited by the trader",
      "An underlying asset, index, rate, or event"
    ],
    correct: 3,
    explanation: "A derivative is a contract whose value is entirely dependent on the price of an underlying — which can be a stock (Reliance), an index (Nifty 50), a commodity (gold on MCX), a currency pair (USD/INR), an interest rate (MIBOR), or even a volatility index (India VIX). Derivatives do not have intrinsic value of their own."
  },
  {
    id: 2,
    session: 1,
    topic: "Four Primary Types of Derivatives",
    question: "Which of the following is NOT one of the four primary types of derivatives?",
    options: [
      "Warrants",
      "Forwards",
      "Futures",
      "Swaps"
    ],
    correct: 0,
    explanation: "The four primary types of derivatives are Forwards (private OTC contracts), Futures (standardized exchange-traded forwards with daily settlement), Options (right but not obligation to buy/sell), and Swaps (agreements to exchange cash flows). Warrants are equity-linked instruments but not classified among the four primary derivative types."
  },
  {
    id: 3,
    session: 1,
    topic: "OTC vs. Exchange-Traded Derivatives",
    question: "Which feature correctly distinguishes exchange-traded derivatives from OTC derivatives?",
    options: [
      "OTC derivatives are fully standardized while exchange-traded derivatives are customizable",
      "Exchange-traded derivatives carry direct bilateral counterparty risk",
      "OTC derivatives always have higher liquidity than exchange-traded derivatives",
      "Exchange-traded derivatives are cleared through a Central Counterparty (CCP), virtually eliminating counterparty risk"
    ],
    correct: 3,
    explanation: "Exchange-traded derivatives trade on organized exchanges (NSE, BSE, MCX) and are cleared through a CCP, which becomes the buyer to every seller and the seller to every buyer via novation — eliminating bilateral counterparty risk. OTC derivatives are customizable and carry direct counterparty risk unless separately cleared through a CCP like CCIL."
  },
  {
    id: 4,
    session: 1,
    topic: "CCP and Novation",
    question: "In the context of exchange-traded derivatives, 'novation' means:",
    options: [
      "The exchange sets a new price for the contract each day",
      "The original contract is cancelled and a new one issued at the settlement price",
      "The clearing member novates its membership to a new entity",
      "The CCP becomes the buyer to every seller and the seller to every buyer"
    ],
    correct: 3,
    explanation: "Novation is the process by which the CCP (e.g., NSE Clearing Limited) interposes itself between the buyer and seller after a trade is matched. This eliminates bilateral counterparty risk — each party now faces the CCP rather than the original counterparty. If a client defaults, the Clearing Member absorbs the loss; if the CM defaults, the Settlement Guarantee Fund covers it."
  },
  {
    id: 5,
    session: 1,
    topic: "Indian vs. Global Markets",
    question: "Which statement about Indian equity options is correct as of March 2026?",
    options: [
      "Both index and stock options on NSE are European-style",
      "Stock options on NSE are American-style, while index options are European-style",
      "All options on NSE are American-style like on CBOE",
      "Weekly options are available for Bank Nifty, FinNifty, and Midcap Select"
    ],
    correct: 0,
    explanation: "In India, both index options and stock options are European-style (exercisable only at expiry), unlike the US where stock options are American-style. After SEBI's November 2024 reforms, weekly expiries are limited to one benchmark index per exchange — NSE retained Nifty 50 weekly (Tuesday expiry), while Bank Nifty, FinNifty, and Midcap Select moved to monthly-only."
  },
  {
    id: 6,
    session: 1,
    topic: "NSE Contract Specifications",
    question: "The current lot size for Nifty 50 futures and options on NSE is:",
    options: [
      "50",
      "65",
      "75",
      "100"
    ],
    correct: 1,
    explanation: "The Nifty 50 futures and options lot size is 65 units. SEBI periodically revises lot sizes to keep the minimum contract value around Rs.15-20 lakh. Bank Nifty has a lot size of 30. These specifications are essential inputs for all margin, P&L, and hedging calculations in the course."
  },
  {
    id: 7,
    session: 1,
    topic: "SPAN Margining System",
    question: "The SPAN margining system calculates the worst-case portfolio loss across how many scenarios?",
    options: [
      "12 scenarios at 97.5% confidence",
      "16 scenarios at 99% confidence over one day",
      "8 scenarios at 95% confidence",
      "20 scenarios at 99.9% confidence over one week"
    ],
    correct: 1,
    explanation: "India uses the SPAN system which evaluates portfolios under 16 combinations of price and volatility movements at a 99% confidence level over one day. These include 14 scenarios from a 7x2 grid of price moves (0, ±1/3, ±2/3, ±full scan range) combined with volatility up/down, plus 2 extreme tail scenarios at 3x the scan range with 35% weight."
  },
  {
    id: 8,
    session: 1,
    topic: "Margin Components",
    question: "Total margin for a Nifty futures position consists of:",
    options: [
      "SPAN margin + Exposure margin + Additional margins",
      "Initial margin + Variation margin only",
      "SPAN margin only",
      "Premium margin + SPAN margin"
    ],
    correct: 0,
    explanation: "Total Margin = SPAN Margin (worst-case portfolio loss, ~9-12% for Nifty) + Exposure Margin (additional buffer: 3% for index derivatives) + Additional Margins (e.g., extra 2% ELM on short index options on expiry day per SEBI Nov 2024 rule). For option buyers, the margin is simply the full premium paid upfront."
  },
  {
    id: 9,
    session: 1,
    topic: "Mark-to-Market Calculation",
    question: "A trader buys 2 lots of Nifty futures at 23,200 (lot size = 65). Nifty closes at 23,350 on Day 1. What is the Day 1 MTM profit?",
    options: [
      "Rs.9,750",
      "Rs.19,500",
      "Rs.29,250",
      "Rs.39,000"
    ],
    correct: 1,
    explanation: "Daily P&L = (Today's Close - Entry Price) × Lot Size × Number of Lots = (23,350 - 23,200) × 65 × 2 = 150 × 130 = Rs.19,500. MTM settlement happens daily — the Rs.19,500 is credited to the trader's margin account the same evening. This daily cash settlement is what distinguishes futures from forwards."
  },
  {
    id: 10,
    session: 1,
    topic: "Margin Call Mechanics",
    question: "A trader has an initial margin of Rs.4,52,400 and maintenance margin of Rs.3,61,920. After cumulative losses, the margin balance falls to Rs.3,48,400. What must the trader do?",
    options: [
      "Deposit Rs.1,04,000 to restore to initial margin level",
      "Deposit Rs.13,520 to restore to maintenance margin level",
      "No action needed — the position is only squared off at zero balance",
      "Deposit Rs.52,000 to bring balance halfway between maintenance and initial margin"
    ],
    correct: 0,
    explanation: "When the margin balance falls below the maintenance margin (Rs.3,61,920), a margin call is triggered. The trader must deposit enough to restore the balance to the INITIAL margin level (Rs.4,52,400), not merely the maintenance margin. Top-up = Rs.4,52,400 - Rs.3,48,400 = Rs.1,04,000, and this must be deposited before trading begins the next day."
  },
  {
    id: 11,
    session: 1,
    topic: "Leverage in Futures",
    question: "With an initial margin of 15%, a Nifty futures position of Rs.30,16,000 contract value, what is the approximate leverage ratio?",
    options: [
      "5.0x",
      "6.7x",
      "3.3x",
      "10.0x"
    ],
    correct: 1,
    explanation: "Leverage Ratio = Contract Value / Initial Margin = Rs.30,16,000 / Rs.4,52,400 ≈ 6.67x. This means every 1% move in Nifty translates to approximately 6.7% gain or loss on margin capital. SEBI's 2024 study found that 93% of individual F&O traders lost money, partly because leverage amplifies losses just as much as gains."
  },
  {
    id: 12,
    session: 1,
    topic: "Physical Settlement of Stock Options",
    question: "Since October 2019, an ITM stock call option at expiry on NSE results in:",
    options: [
      "Cash settlement of the intrinsic value only",
      "Automatic rollover to the next month's expiry",
      "Actual physical delivery of shares, requiring full delivery-value funds",
      "Conversion into a futures position for the next month"
    ],
    correct: 2,
    explanation: "Since October 2019, all ITM stock options and open stock futures at expiry result in actual delivery of shares. A trader holding an ITM Reliance 1,400 Call with Reliance at 1,420 must take delivery of the full lot, requiring funds for the entire delivery value — not just the option premium. Physical delivery margins are 4-5x higher than normal options margins."
  },
  {
    id: 13,
    session: 2,
    topic: "Cost-of-Carry Model",
    question: "The cost-of-carry model for futures pricing with continuous compounding is expressed as:",
    options: [
      "F = S × e^((r - q) × T)",
      "F = S × (1 + r - q)",
      "F = S × e^(r × T) + q",
      "F = S / e^((r + q) × T)"
    ],
    correct: 0,
    explanation: "The exact cost-of-carry formula is F = S × e^((r - q) × T), where F = fair futures price, S = spot price, r = risk-free rate (annualized, continuously compounded), q = dividend yield, and T = time to expiry in years. The net carry cost (r - q) represents the interest earned minus dividends forgone by holding the synthetic position via futures instead of the underlying."
  },
  {
    id: 14,
    session: 2,
    topic: "Futures Fair Value Calculation",
    question: "Given: Nifty Spot = 23,151, risk-free rate = 6.68%, dividend yield = 1.20%, 18 days to expiry. Using continuous compounding, the net carry cost per annum is approximately:",
    options: [
      "7.88%",
      "5.48%",
      "6.68%",
      "1.20%"
    ],
    correct: 1,
    explanation: "Net carry cost = r - q = 6.68% - 1.20% = 5.48% p.a. This is the net cost of carrying the underlying — the interest cost of funding minus the dividend income received. A positive net carry cost means futures should trade above spot (contango). For 18 days, the time fraction is 18/365 = 0.04932, making the fair futures price approximately 23,214."
  },
  {
    id: 15,
    session: 2,
    topic: "Contango vs. Backwardation",
    question: "If Nifty futures are trading at 23,214 while Nifty spot is at 23,151, the market is said to be in:",
    options: [
      "Backwardation, because futures exceed spot",
      "Inverted contango, because carry cost is negative",
      "Contango, because futures exceed spot",
      "Normal backwardation, because the basis is positive"
    ],
    correct: 2,
    explanation: "When futures price exceeds spot price (positive basis of +63 points), the market is in contango. This is the normal condition when the cost-of-carry is positive (interest rate exceeds dividend yield). Backwardation occurs when futures trade below spot, typically during heavy FII selling, dividend season, or when convenience yield is high in commodity markets."
  },
  {
    id: 16,
    session: 2,
    topic: "Long Hedge vs. Short Hedge",
    question: "An FII holding Rs.50 crore of Indian equities fears a market downturn. The appropriate hedge is:",
    options: [
      "A long hedge — buying Nifty futures to lock in a purchase price",
      "A short hedge — selling Nifty futures to offset potential portfolio losses",
      "A cross-currency hedge using USD/INR futures",
      "Buying Nifty call options to participate in potential upside"
    ],
    correct: 1,
    explanation: "A short hedge (selling futures) is used when you HOLD the underlying or will SELL it in the future and want to protect against price decline. By selling Nifty futures, losses on the equity portfolio are offset by gains on the short futures position. A long hedge is the opposite — used when you need to BUY the underlying in the future and fear prices will rise."
  },
  {
    id: 17,
    session: 2,
    topic: "Minimum Variance Hedge Ratio",
    question: "The minimum variance hedge ratio (MVHR) formula is:",
    options: [
      "h* = sigma_S / sigma_F",
      "h* = rho × (sigma_S / sigma_F)",
      "h* = rho × (sigma_F / sigma_S)",
      "h* = rho × sigma_S × sigma_F"
    ],
    correct: 1,
    explanation: "The MVHR h* = ρ × (σ_S / σ_F), where ρ is the correlation between spot and futures price changes, σ_S is the standard deviation of spot price changes, and σ_F is the standard deviation of futures price changes. For an equity portfolio hedged with index futures, the hedge ratio equals the portfolio beta, since beta = ρ × (σ_portfolio / σ_index)."
  },
  {
    id: 18,
    session: 2,
    topic: "Number of Hedge Contracts Calculation",
    question: "A portfolio worth Rs.3,25,00,000 with beta = 1.15 is hedged using Nifty futures at 23,214 (lot size 65). How many contracts are needed?",
    options: [
      "28 contracts",
      "22 contracts",
      "20 contracts",
      "25 contracts"
    ],
    correct: 3,
    explanation: "Number of contracts = (beta × Portfolio Value) / (Futures Price × Lot Size) = (1.15 × 3,25,00,000) / (23,214 × 65) = 3,73,75,000 / 15,08,910 = 24.77, rounded to 25 contracts. The beta is used as the hedge ratio for equity portfolios hedged with index futures, reflecting the portfolio's sensitivity relative to the index."
  },
  {
    id: 19,
    session: 2,
    topic: "Basis Risk",
    question: "If Nifty falls 5% but a portfolio with beta 1.15 falls 5.75%, and the hedge covers only the Nifty fall of 5%, the residual 0.75% loss is called:",
    options: [
      "Tracking error",
      "Margin risk",
      "Basis risk",
      "Rollover risk"
    ],
    correct: 2,
    explanation: "Basis risk arises from imperfect correlation between the hedged portfolio's returns and the hedging instrument's returns. Even with 25 contracts covering the beta-adjusted exposure, the hedge covers 5% via futures but leaves 0.75% unhedged because the portfolio doesn't move exactly as predicted by beta. A perfect hedge (100% risk elimination) is rare in practice."
  },
  {
    id: 20,
    session: 2,
    topic: "Metallgesellschaft Case - Stack-and-Roll",
    question: "MGRM's stack-and-roll hedging strategy failed primarily because:",
    options: [
      "The oil market moved from backwardation into contango, causing roll losses, while margin calls consumed $900 million",
      "Crude oil prices rose sharply, making their short hedges unprofitable",
      "MGRM's position was too small relative to total NYMEX open interest",
      "German accounting rules allowed them to offset futures losses with unrealized forward profits"
    ],
    correct: 0,
    explanation: "MGRM held positions equivalent to 160 million barrels and used near-month futures rolled monthly to hedge 5-10 year forward commitments. When OPEC's inaction pushed markets from backwardation into contango, each monthly roll incurred losses. Margin calls consumed $900 million in 1993, and German accounting rules required immediate recognition of futures losses without booking offsetting unrealized forward profits."
  },
  {
    id: 21,
    session: 3,
    topic: "Definition of Swaps",
    question: "In a plain-vanilla interest rate swap (IRS), the notional principal is:",
    options: [
      "Never exchanged — only the net interest differential changes hands",
      "Exchanged semi-annually along with each coupon payment",
      "Exchanged only at maturity",
      "Exchanged at inception and returned at maturity"
    ],
    correct: 0,
    explanation: "In a plain-vanilla IRS, the notional principal is NOT exchanged — it is used only as the reference amount for calculating interest payments. Only the net interest differential (fixed minus floating, or vice versa) changes hands each period. This is a key distinction from currency swaps, where the notional principal IS exchanged at inception and maturity."
  },
  {
    id: 22,
    session: 3,
    topic: "Indian IRS Market",
    question: "The most common interest rate swap in India is the MIBOR-OIS, where the floating leg is linked to:",
    options: [
      "The overnight MIBOR rate",
      "The RBI repo rate",
      "The 91-day Treasury bill yield",
      "The 10-year G-Sec yield"
    ],
    correct: 0,
    explanation: "In India, the most common IRS is the MIBOR-OIS (Overnight Index Swap), where the floating leg references the overnight Mumbai Interbank Offered Rate (MIBOR). CCIL clears most INR OIS transactions. Banks use these swaps to manage asset-liability mismatches, convert fixed-rate borrowings to floating or vice versa, and speculate on interest rate movements."
  },
  {
    id: 23,
    session: 3,
    topic: "IRS Cash Flow Calculation",
    question: "In an IRS with notional Rs.10 crore, fixed rate 7.50%, semi-annual payments (180 days, Actual/365 day count), the fixed payment per period is approximately:",
    options: [
      "Rs.36,98,630",
      "Rs.37,50,000",
      "Rs.34,52,055",
      "Rs.41,91,781"
    ],
    correct: 0,
    explanation: "Fixed payment = Notional × Fixed Rate × (Days/365) = 10,00,00,000 × 7.50% × (180/365) = 10,00,00,000 × 0.075 × 0.4932 = Rs.36,98,630. The Actual/365 day count convention used in Indian markets means each period's exact number of days matters, unlike the 30/360 convention common in some US markets."
  },
  {
    id: 24,
    session: 3,
    topic: "IRS Net Payment Direction",
    question: "In an IRS where Company A pays fixed 7.50% and receives MIBOR, if MIBOR rises to 8.00% (floating = MIBOR + 0.50% = 8.50%), what happens?",
    options: [
      "The swap is automatically terminated and renegotiated",
      "Company A makes a net payment to Company B",
      "No net payment occurs since the rates are close",
      "Company B makes a net payment to Company A because the floating rate exceeds the fixed rate"
    ],
    correct: 3,
    explanation: "When MIBOR rises to 8.00% (floating = 8.50%), the floating payment exceeds the fixed payment (8.50% > 7.50%). Since Company A pays fixed and receives floating, the net flow favors Company A — so Company B pays the net difference to Company A. The fixed-rate payer benefits when rates rise above the fixed rate, which is why banks with floating-rate assets and fixed-rate liabilities enter IRS."
  },
  {
    id: 25,
    session: 3,
    topic: "Currency Swap vs. IRS",
    question: "A key difference between a currency swap and a plain-vanilla IRS is that in a currency swap:",
    options: [
      "No interest payments are exchanged, only notional at maturity",
      "Only one leg involves interest payments while the other is notional-only",
      "The notional principal is exchanged at inception and returned at maturity at the original exchange rate",
      "Settlement is always in a single currency using the prevailing exchange rate"
    ],
    correct: 2,
    explanation: "Unlike IRS where the notional is never exchanged, in a currency swap the notional principal IS exchanged at inception (e.g., $10M swapped for Rs.92.50 crore at spot rate) and returned at maturity at the original exchange rate, regardless of where the exchange rate trades at maturity. This eliminates FX risk on the principal for the party converting its foreign currency liability."
  },
  {
    id: 26,
    session: 3,
    topic: "Swap Valuation",
    question: "A swap can be valued as the difference between two bonds. For the fixed-rate payer in an IRS, the swap value equals:",
    options: [
      "Value of Fixed-Rate Bond minus Value of Floating-Rate Bond",
      "Value of Floating-Rate Bond minus Value of Fixed-Rate Bond",
      "The present value of all future fixed payments",
      "The par value of the notional minus the sum of net payments"
    ],
    correct: 1,
    explanation: "For the fixed-rate payer: Swap Value = Value of Floating-Rate Bond (asset, since they receive floating) minus Value of Fixed-Rate Bond (liability, since they pay fixed). If market rates rise above the swap's fixed rate, the fixed-rate bond falls below par, making the swap positive for the fixed-rate payer — they are locked in at a below-market rate."
  },
  {
    id: 27,
    session: 3,
    topic: "Floating-Rate Bond Valuation",
    question: "Just after a reset date, a floating-rate bond is worth:",
    options: [
      "Exactly par, because the coupon has just been reset to the current market rate",
      "Less than par because it has no fixed cash flows",
      "More than par because floating rates include a spread",
      "It depends on the creditworthiness of the issuer"
    ],
    correct: 0,
    explanation: "At a reset date, the floating-rate bond's coupon adjusts to the current market rate, so future cash flows are discounted at exactly the rate they pay — producing a present value equal to par. Between reset dates, however, the floating bond may deviate from par because the next coupon is already fixed while discount rates may have changed."
  },
  {
    id: 28,
    session: 3,
    topic: "Counterparty Risk and CSA",
    question: "The Credit Support Annex (CSA) under the ISDA Master Agreement primarily governs:",
    options: [
      "The process for novating swaps to a central counterparty",
      "The calculation methodology for swap fixed rates",
      "Collateral exchange between counterparties in OTC swaps",
      "Tax treatment of swap cash flows across jurisdictions"
    ],
    correct: 2,
    explanation: "Since swaps are OTC contracts, each party faces the risk that the other may default. The CSA under the ISDA Master Agreement governs collateral exchange — requiring periodic margin posting based on mark-to-market values. In India, CCIL clears most INR OIS transactions, virtually eliminating counterparty risk for standard products. Non-cleared swaps rely on bilateral CSAs."
  },
  {
    id: 29,
    session: 4,
    topic: "Options Definition",
    question: "An option buyer pays a premium to the seller (writer). The buyer has:",
    options: [
      "Both the right and the obligation to buy or sell",
      "The obligation to fulfil the contract, while the seller has the right",
      "The right, but not the obligation, to buy or sell",
      "The right to buy only; selling requires a separate futures contract"
    ],
    correct: 2,
    explanation: "An option gives the buyer the right, but NOT the obligation, to buy (call) or sell (put) at the strike price. The premium compensates the seller for taking on the obligation. This asymmetry is fundamental — the buyer's maximum loss is limited to the premium paid, while the seller's risk can be much larger (unlimited for a naked short call)."
  },
  {
    id: 30,
    session: 4,
    topic: "Intrinsic Value of a Call",
    question: "A Nifty call option has a strike of 23,200 and Nifty is currently at 23,500. The intrinsic value of the call is:",
    options: [
      "Rs.0",
      "Rs.300",
      "Rs.500",
      "Rs.200"
    ],
    correct: 1,
    explanation: "Intrinsic value of a call = max(S - K, 0) = max(23,500 - 23,200, 0) = Rs.300. The call is In-the-Money (ITM) by 300 points because the spot price exceeds the strike price. The remaining portion of the option's premium above Rs.300 represents time value, which reflects the probability that the option might gain more value before expiry."
  },
  {
    id: 31,
    session: 4,
    topic: "Moneyness of a Put Option",
    question: "A Nifty 23,200 put option when Nifty spot is at 23,500 is classified as:",
    options: [
      "In-the-Money (ITM) because the put gives the right to sell above market price",
      "Deep-in-the-Money because the premium exceeds the intrinsic value",
      "At-the-Money (ATM) because the difference is within one standard deviation",
      "Out-of-the-Money (OTM) because spot is above the strike price"
    ],
    correct: 3,
    explanation: "A put option is OTM when spot price (23,500) is above the strike price (23,200). The put gives the right to sell at 23,200, but you could sell in the market at 23,500 — so exercising the put would be disadvantageous. Its intrinsic value is max(K - S, 0) = max(23,200 - 23,500, 0) = 0. The entire premium of an OTM option consists of time value only."
  },
  {
    id: 32,
    session: 4,
    topic: "Long Call Payoff Calculation",
    question: "A trader buys a Nifty 23,200 Call at Rs.450 (lot size = 65). Nifty expires at 23,800. The per-lot profit is:",
    options: [
      "Rs.39,000",
      "Rs.19,500",
      "Rs.29,250",
      "Rs.9,750"
    ],
    correct: 3,
    explanation: "Long Call P&L = (max(S_T - K, 0) - Premium) × Lot Size = (max(23,800 - 23,200, 0) - 450) × 65 = (600 - 450) × 65 = 150 × 65 = Rs.9,750 per lot. The breakeven is at K + Premium = 23,200 + 450 = 23,650. Since Nifty at 23,800 is above breakeven, the position is profitable."
  },
  {
    id: 33,
    session: 4,
    topic: "Long Put Payoff Calculation",
    question: "A trader buys a Nifty 23,200 Put at Rs.380 (lot size = 65). Nifty expires at 22,500. The per-lot profit is:",
    options: [
      "Rs.24,700",
      "Rs.20,800",
      "Rs.45,500",
      "Rs.27,300"
    ],
    correct: 1,
    explanation: "Long Put P&L = (max(K - S_T, 0) - Premium) × Lot Size = (max(23,200 - 22,500, 0) - 380) × 65 = (700 - 380) × 65 = 320 × 65 = Rs.20,800 per lot. The breakeven is at K - Premium = 23,200 - 380 = 22,820. Since Nifty expired at 22,500, well below breakeven, the put generates a healthy profit."
  },
  {
    id: 34,
    session: 4,
    topic: "Short Call Risk Profile",
    question: "The maximum loss on a short (naked) call position is:",
    options: [
      "Limited to the premium received",
      "Theoretically unlimited",
      "Limited to the strike price minus the premium",
      "Limited to the initial margin deposited"
    ],
    correct: 1,
    explanation: "A short call writer receives the premium but faces theoretically unlimited loss because the underlying price can rise without limit. As the textbook notes, this is the most dangerous position in options. The Barings Bank case illustrates this — Nick Leeson's short straddles (including short calls) generated massive losses when the Nikkei moved violently after the Kobe earthquake."
  },
  {
    id: 35,
    session: 4,
    topic: "STT on Options Exercise",
    question: "STT on options exercise in India (from April 2026) is 0.125% of settlement value. For a Nifty call option 500 points ITM (lot size 65), the approximate STT is:",
    options: [
      "Rs.8.13",
      "Rs.40.63",
      "Rs.81.25",
      "Rs.406.25"
    ],
    correct: 1,
    explanation: "STT on exercise = Intrinsic Value × Lot Size × 0.00125 = 500 × 65 × 0.00125 = Rs.40.63 per lot. This 0.125% STT on exercise is 25x higher than the 0.05% STT on a regular sell transaction. For slightly ITM options, this hidden cost can consume most of the profit — which is why traders should square off slightly ITM options before 3:00 PM on expiry day rather than letting them exercise."
  },
  {
    id: 36,
    session: 5,
    topic: "Put-Call Parity",
    question: "The put-call parity formula for European options on a dividend-paying underlying (yield q) is:",
    options: [
      "C + K × e^(-rT) = P + S × e^(-qT)",
      "C + K × e^(-rT) = P + S",
      "C - P = S - K × e^(rT)",
      "C + K = P + S"
    ],
    correct: 0,
    explanation: "The dividend-adjusted put-call parity is C + K × e^(-rT) = P + S × e^(-qT). The simpler formula C + Ke^(-rT) = P + S applies ONLY when q = 0. Since Nifty has a dividend yield of approximately 1.2%, ignoring q introduces an error of Rs.20-25 per contract for 30-day options. Always use the dividend-adjusted formula for Indian index options."
  },
  {
    id: 37,
    session: 5,
    topic: "Put-Call Parity Arbitrage",
    question: "If the LHS (C + Ke^(-rT)) of put-call parity exceeds the RHS (P + Se^(-qT)) by more than transaction costs, the arbitrage involves:",
    options: [
      "Buy the call, buy the put, sell the underlying",
      "Buy the call, sell the put, sell the underlying",
      "Sell the call, buy the put, buy the underlying (or futures)",
      "Sell both the call and put, buy two units of the underlying"
    ],
    correct: 2,
    explanation: "When LHS > RHS, the call side is overpriced relative to the put side. The arbitrage is to sell the overpriced call, buy the underpriced put, and buy the underlying (or futures). This creates a risk-free profit equal to the difference minus transaction costs. In Indian markets, transaction costs of Rs.50-80 per unit (brokerage + STT + impact cost) set the minimum threshold for actionable arbitrage."
  },
  {
    id: 38,
    session: 5,
    topic: "Risk-Neutral Pricing Concept",
    question: "In the binomial model, the risk-neutral probability (p) represents:",
    options: [
      "The actual real-world probability that the stock will go up",
      "The ratio of up moves to total moves observed historically",
      "A mathematical construct that, when used to discount expected payoffs at the risk-free rate, gives the correct market price",
      "The probability derived from the stock's historical beta"
    ],
    correct: 2,
    explanation: "The risk-neutral probability p is NOT the actual probability of the stock going up. It is a mathematical construct used in a hypothetical world where all investors are indifferent to risk and all assets earn the risk-free rate. This works because option payoffs can be replicated using stocks and bonds, making actual probabilities irrelevant for pricing. In Excel: p = (EXP(r×dt) - d)/(u - d)."
  },
  {
    id: 39,
    session: 5,
    topic: "Binomial Tree Parameters",
    question: "In a binomial tree, if u = 1.03515 (up factor), the down factor d equals:",
    options: [
      "0.93396 (= u - 0.10)",
      "0.96485 (= 1 - u + 1)",
      "0.96604 (= 1/u)",
      "0.98257 (= √(1/u))"
    ],
    correct: 2,
    explanation: "In the CRR (Cox-Ross-Rubinstein) binomial model, d = 1/u. So d = 1/1.03515 = 0.96604. This ensures the tree is recombining — an up move followed by a down move returns to the same price as a down move followed by an up move (Su × d = Sd × u = S). The up factor itself is calculated as u = e^(σ × √dt)."
  },
  {
    id: 40,
    session: 5,
    topic: "Binomial Option Pricing Calculation",
    question: "In a 2-step binomial tree with S=23,151, K=23,200, u=1.03515, d=0.96604, at node Suu the stock price is 24,807.06. The call payoff at this node is:",
    options: [
      "Rs.0",
      "Rs.1,607.06",
      "Rs.1,956.06",
      "Rs.807.06"
    ],
    correct: 1,
    explanation: "The call payoff at expiry = max(S - K, 0) = max(24,807.06 - 23,200, 0) = Rs.1,607.06. This is the terminal payoff at the highest node of the 2-step tree. The other terminal nodes (Sud = 23,151 and Sdd = 21,605.03) both produce zero payoff since they are below the strike of 23,200. The option value is then found by working backward using risk-neutral probabilities."
  },
  {
    id: 41,
    session: 6,
    topic: "BSM Formula",
    question: "In the Black-Scholes-Merton formula, the European call price is given by C = S × N(d1) - K × e^(-rT) × N(d2). The term K × e^(-rT) represents:",
    options: [
      "The expected future spot price of the underlying",
      "The time value of the option premium",
      "The exercise cost adjusted for dividend yield",
      "The present value of the strike price discounted at the risk-free rate"
    ],
    correct: 3,
    explanation: "K × e^(-rT) is the present value of the strike price K, discounted continuously at the risk-free rate r over time T. N(d2) roughly represents the probability that the option finishes in-the-money under the risk-neutral measure. So K × e^(-rT) × N(d2) can be interpreted as the present value of the expected exercise cost, weighted by the probability of exercise."
  },
  {
    id: 42,
    session: 6,
    topic: "BSM Assumptions",
    question: "Which of the following is NOT an assumption of the Black-Scholes-Merton model?",
    options: [
      "Stochastic (randomly varying) interest rates",
      "Constant volatility over the option's life",
      "Log-normal price distribution (prices cannot go negative)",
      "No transaction costs or taxes"
    ],
    correct: 0,
    explanation: "BSM assumes a CONSTANT risk-free rate, not stochastic rates. The full set of assumptions includes: log-normal prices, constant volatility, constant risk-free rate, no dividends (or known continuous yield), European exercise only, no transaction costs, and continuous trading. In practice, several assumptions are violated — which is why implied volatility varies across strikes, creating the volatility smile/skew."
  },
  {
    id: 43,
    session: 6,
    topic: "Historical Volatility Calculation",
    question: "To annualize daily historical volatility from daily log returns, you multiply the daily standard deviation by:",
    options: [
      "252",
      "√252",
      "365",
      "√365"
    ],
    correct: 1,
    explanation: "Annualized HV = Daily Standard Deviation × √252, where 252 is the number of trading days in a year. This follows from the property that the variance of returns scales linearly with time (assuming independent returns), so the standard deviation scales with the square root of time. In Excel: =STDEV(ReturnRange)*SQRT(252)."
  },
  {
    id: 44,
    session: 6,
    topic: "Implied Volatility",
    question: "Implied volatility (IV) is best described as:",
    options: [
      "The historical standard deviation of past log returns annualized by √252",
      "India VIX divided by √12 to get monthly expected volatility",
      "The difference between call IV and put IV for the same strike",
      "The volatility that, when plugged into BSM, produces the observed market price of the option"
    ],
    correct: 3,
    explanation: "IV is the forward-looking volatility embedded in the market price of an option. Since BSM cannot be algebraically inverted for sigma, IV is extracted using numerical methods (Goal Seek or Newton-Raphson in Excel). If IV exceeds historical volatility, the market expects future volatility to be higher than the recent past — making options relatively 'expensive' by historical standards."
  },
  {
    id: 45,
    session: 6,
    topic: "India VIX Interpretation",
    question: "If India VIX is at 22, the market expects Nifty to move approximately how much per day?",
    options: [
      "22%",
      "1.39%",
      "0.22%",
      "6.35%"
    ],
    correct: 1,
    explanation: "India VIX of 22 means expected annualized volatility of 22%. To convert to daily: 22% / √252 ≈ 1.39% per day. To convert to monthly: 22% / √12 ≈ 6.35% per month. VIX peaked at 86.6 during the COVID crash (March 2020) and traded as low as 8.7 in late 2024. The current 22 level is elevated by historical standards, making option premiums relatively expensive."
  },
  {
    id: 46,
    session: 6,
    topic: "Volatility Skew",
    question: "In the Nifty options market, OTM puts typically have higher implied volatility than OTM calls. This is primarily because:",
    options: [
      "The BSM model overprices OTM calls, making their IV appear lower",
      "OTM puts have higher open interest, so exchanges charge more margin",
      "Institutional investors systematically buy puts for portfolio insurance and sell calls for income, creating demand imbalance",
      "SEBI regulations cap the premium on OTM call options"
    ],
    correct: 2,
    explanation: "The Nifty volatility skew exists for three reasons: (1) crash fear — market crashes are sudden, so investors pay disproportionately more for downside protection; (2) supply-demand imbalance — institutions systematically buy puts (portfolio insurance) and sell calls (covered call income), pushing put IVs up and call IVs down; (3) empirical reality — return distributions have fatter left tails than BSM predicts."
  },
  {
    id: 47,
    session: 7,
    topic: "Delta Interpretation",
    question: "A Nifty 23,200 Call has Delta = 0.537 and lot size = 65. For every Rs.1 increase in Nifty, the per-lot gain is approximately:",
    options: [
      "Rs.0.537",
      "Rs.34.9",
      "Rs.5.37",
      "Rs.53.70"
    ],
    correct: 1,
    explanation: "Delta = 0.537 means for every Rs.1 increase in Nifty, the call option gains Rs.0.537. Per lot (65 units): 0.537 × 65 = Rs.34.9 per Nifty point. Delta also roughly indicates the probability of the option expiring ITM — a delta of 0.537 suggests approximately 53.7% probability. Call delta ranges from 0 to +1; put delta from -1 to 0."
  },
  {
    id: 48,
    session: 7,
    topic: "Gamma and Near-Expiry Risk",
    question: "ATM Nifty gamma increases from approximately 0.000350 with 18 days to expiry to 0.002+ with 2 days to expiry. This phenomenon is called:",
    options: [
      "Gamma explosion near expiry",
      "Theta acceleration",
      "Vega crush",
      "Delta convergence"
    ],
    correct: 0,
    explanation: "As expiry approaches, ATM gamma surges dramatically (6x or more), meaning delta swings violently with small price changes. A 50-point Nifty move could shift delta from 0.50 to 0.60 almost instantly, requiring constant rebalancing. This is why the textbook warns: avoid holding large short ATM option positions in the last 3 trading days unless you have real-time hedging capability."
  },
  {
    id: 49,
    session: 7,
    topic: "N(d1) vs. N'(d1) Distinction",
    question: "When calculating Gamma and Vega in BSM, the correct Excel function to use for N'(d1) is:",
    options: [
      "NORM.S.DIST(d1, TRUE) — the CDF with explicit TRUE parameter",
      "NORM.S.DIST(d1, FALSE) — the probability density function (PDF)",
      "NORMSDIST(d1) — the cumulative distribution function (CDF)",
      "NORM.INV(d1, 0, 1) — the inverse normal function"
    ],
    correct: 1,
    explanation: "N'(d1) is the PDF (probability density function), computed in Excel as NORM.S.DIST(d1, FALSE). N(d1) is the CDF (cumulative distribution function), computed as NORM.S.DIST(d1, TRUE) or NORMSDIST(d1). Delta and BSM prices use the CDF; Gamma, Vega, and Theta use the PDF. Confusing these two is a common fatal error that produces completely wrong Greek values."
  },
  {
    id: 50,
    session: 7,
    topic: "Option Strategies - Iron Condor",
    question: "An iron condor is constructed by combining a short strangle with long wings. The maximum profit equals the net premium received, and the strategy is profitable when:",
    options: [
      "The market stays range-bound within the short strikes until expiry",
      "Implied volatility increases significantly before expiry",
      "The underlying price converges exactly to the ATM strike at expiry",
      "The market moves sharply in either direction beyond both breakevens"
    ],
    correct: 0,
    explanation: "An iron condor profits when the market stays within a range — specifically between the two short strikes. The maximum profit is the net premium received, earned if the underlying expires between the short call and short put strikes. The long wings (further OTM options) cap the maximum loss at the width of the spread minus the premium. It is a range-bound, low-volatility strategy."
  },
  {
    id: 51,
    session: 1,
    topic: "Continuous Compounding and Euler's Number",
    question: "Using continuous compounding, Rs.100 invested at 7% for 1 year grows to 100 × e^(0.07). In Excel, this is calculated as:",
    options: [
      "=100*POWER(1.07, 1)",
      "=100*EXP(0.07*1)",
      "=100*LN(0.07)",
      "=100*(1+0.07/365)^365"
    ],
    correct: 1,
    explanation: "The Excel function EXP(x) computes e^x, so =100*EXP(0.07*1) = Rs.107.25 for continuous compounding. This is slightly more than annual compounding (Rs.107.00) or semi-annual (Rs.107.12). Continuous compounding simplifies derivatives formulas because combining time periods requires only addition of exponents rather than multiplication of compounding factors."
  },
  {
    id: 52,
    session: 1,
    topic: "Recovering Continuously Compounded Rate",
    question: "If an investment grows from Rs.100 to Rs.107.25 in one year under continuous compounding, the continuously compounded rate is recovered using:",
    options: [
      "=EXP(107.25/100)",
      "=LN(107.25/100)",
      "=LOG10(107.25/100)",
      "=(107.25/100) - 1"
    ],
    correct: 1,
    explanation: "LN (natural logarithm) is the inverse of EXP. So =LN(107.25/100) = LN(1.0725) = 0.07, recovering the 7% continuously compounded rate. The last option gives the simple return (7.25%), not the continuously compounded rate. This LN function is also used to compute daily log returns for historical volatility: =LN(P_t/P_{t-1})."
  },
  {
    id: 53,
    session: 1,
    topic: "Trading Member vs. Clearing Member",
    question: "In the Indian derivatives market infrastructure, if a client defaults on a futures obligation, the loss is first absorbed by:",
    options: [
      "The Clearing Member (CM) who guaranteed the trade",
      "The exchange's investor protection fund",
      "The CCP's Settlement Guarantee Fund (SGF)",
      "SEBI's contingency reserve"
    ],
    correct: 0,
    explanation: "The default waterfall follows a layered structure: the client's margin is used first, then the Clearing Member absorbs remaining losses. Only if the CM itself defaults does the CCP's Settlement Guarantee Fund (SGF) step in. Professional CMs must maintain a minimum net worth of Rs.300 crore. This layered protection is what makes exchange-traded derivatives nearly free of counterparty risk."
  },
  {
    id: 54,
    session: 1,
    topic: "SPAN Price Scan Range",
    question: "The SPAN price scan range for Nifty is calibrated to the 99th percentile of one-day price moves, which corresponds to approximately:",
    options: [
      "1.5 standard deviations",
      "3.5 standard deviations",
      "2.0 standard deviations",
      "2.5 standard deviations"
    ],
    correct: 1,
    explanation: "The SPAN price scan range is calibrated to approximately 3.5 standard deviations, covering the 99th percentile of one-day price moves. The 14 core scenarios test combinations of price moves (0, ±1/3, ±2/3, ±full scan range) with volatility up or down by one standard deviation. Two additional extreme scenarios test 3x the scan range with reduced weight (35%)."
  },
  {
    id: 55,
    session: 1,
    topic: "Exposure Margin for Stocks vs. Index",
    question: "The exposure margin for index derivatives (Nifty futures) is 3%. For individual stock derivatives, the exposure margin is:",
    options: [
      "Also 3%, same as index derivatives",
      "Higher of 5% or 1.5 standard deviations of notional value",
      "A flat 10% of notional value",
      "Determined solely by the stock's market capitalization"
    ],
    correct: 1,
    explanation: "While index derivatives carry a fixed 3% exposure margin, stock derivatives require the higher of 5% or 1.5 standard deviations of notional value. This is because individual stocks are more volatile than diversified indices. For volatile stocks like Tata Steel, total initial margin (SPAN + Exposure) can be 22-28% of contract value, compared to 12-15% for Nifty futures."
  },
  {
    id: 56,
    session: 1,
    topic: "Option Buyer Margin (SEBI Nov 2024)",
    question: "Under SEBI's November 2024 rules, the margin required from an option buyer is:",
    options: [
      "50% of the option premium as initial margin",
      "The full option premium paid upfront, with no intraday leverage",
      "SPAN margin plus exposure margin, same as futures",
      "Zero margin, since the buyer's risk is limited to the premium"
    ],
    correct: 1,
    explanation: "SEBI's November 2024 rule mandates that option buyers pay the full premium upfront with no intraday leverage. Previously, brokers offered leverage allowing traders to buy options with a fraction of the premium, amplifying both gains and losses. This reform was aimed at protecting retail traders, given SEBI's finding that 93% of individual F&O traders lost money."
  },
  {
    id: 57,
    session: 1,
    topic: "Additional ELM on Expiry Day",
    question: "Under SEBI's November 2024 rules, short index option positions on expiry day incur an additional margin of:",
    options: [
      "1% of notional value",
      "Double the normal SPAN margin",
      "2% ELM (Extreme Loss Margin)",
      "5% of contract value"
    ],
    correct: 2,
    explanation: "SEBI's November 2024 reforms introduced an extra 2% ELM (Extreme Loss Margin) on short index options on expiry day. This addresses the heightened gamma risk near expiry, where ATM option deltas swing violently with small price changes. The additional margin discourages speculative short option positions on expiry day, which had become a source of significant retail losses."
  },
  {
    id: 58,
    session: 1,
    topic: "STT Rates (April 2026)",
    question: "From April 2026, STT (Securities Transaction Tax) rates on F&O transactions are:",
    options: [
      "0.05% on futures and 0.15% on options (sell side)",
      "0.01% on futures and 0.05% on options",
      "0.10% on both futures and options",
      "0.025% on futures and 0.10% on options"
    ],
    correct: 0,
    explanation: "From April 2026, STT is 0.05% on futures transactions and 0.15% on options (sell side). These are higher than US markets where there is no STT — only capital gains tax. This higher transaction cost structure in India means multi-leg strategies like iron condors incur significant costs per leg, which can consume 40-60% of expected profits."
  },
  {
    id: 59,
    session: 1,
    topic: "Contract Specifications - Bank Nifty",
    question: "The lot size and expiry cycle for Bank Nifty futures on NSE (as of March 2026) are:",
    options: [
      "Lot size 65, weekly expiry on Tuesdays",
      "Lot size 30, last Tuesday of the month",
      "Lot size 50, weekly expiry on Thursdays",
      "Lot size 30, weekly expiry on Wednesdays"
    ],
    correct: 1,
    explanation: "Bank Nifty futures have a lot size of 30 and expire on the last Tuesday of the month. After SEBI's November 2024 reforms, Bank Nifty options moved to monthly-only expiry (no more weekly options). Only Nifty 50 retains weekly options on NSE (Tuesday expiry), while BSE retained Sensex weekly options (Thursday expiry)."
  },
  {
    id: 60,
    session: 1,
    topic: "USD/INR Futures Specifications",
    question: "USD/INR currency futures on NSE have a lot size of $1,000 and a tick size of:",
    options: [
      "Rs.0.01",
      "Rs.0.0025",
      "Rs.0.05",
      "Rs.0.25"
    ],
    correct: 1,
    explanation: "USD/INR futures have a lot size of $1,000 and a tick size of Rs.0.0025, which is the minimum price movement. They are cash-settled using the RBI reference rate and expire 2 business days before the last business day of the month. Currency derivatives in India are regulated by RBI, unlike equity derivatives which fall under SEBI."
  },
  {
    id: 61,
    session: 1,
    topic: "MTM Calculation — Multiple Days",
    question: "A trader long 2 lots of Nifty futures (lot size 65) sees Nifty close at 23,350 on Day 1 and 23,100 on Day 2. The Day 2 MTM P&L is:",
    options: [
      "-Rs.19,500",
      "-Rs.13,000",
      "+Rs.19,500",
      "-Rs.32,500"
    ],
    correct: 3,
    explanation: "Day 2 P&L = (Today's Close - Previous Close) × Lot Size × Lots = (23,100 - 23,350) × 65 × 2 = (-250) × 130 = -Rs.32,500. Note that MTM is computed against the PREVIOUS day's closing price, not the original entry price. The cumulative P&L from entry (23,200) would be (23,100 - 23,200) × 130 = -Rs.13,000, but the Day 2 daily P&L alone is -Rs.32,500."
  },
  {
    id: 62,
    session: 1,
    topic: "Leverage — Percentage Return Amplification",
    question: "A trader enters Nifty futures at 23,200 with 15% initial margin. Nifty moves to 23,250 (a 0.22% change). The return on margin capital is approximately:",
    options: [
      "0.22%",
      "0.66%",
      "1.4%",
      "3.3%"
    ],
    correct: 2,
    explanation: "With 6.67x leverage (1/15%), the margin return is amplified: 0.22% × 6.67 ≈ 1.4%. On a margin of Rs.4,52,400, a profit of Rs.6,500 represents 1.4%. Leverage amplifies returns by the leverage ratio in both directions — on Day 5 of the textbook's example, a cumulative 3.4% Nifty decline translated to a 23% loss on margin capital."
  },
  {
    id: 63,
    session: 1,
    topic: "SEBI Retail Trader Study",
    question: "According to SEBI's 2024 study on individual F&O traders, the percentage of traders who lost money and the average loss per trader were approximately:",
    options: [
      "70% lost money, average loss Rs.50,000",
      "93% lost money, average loss Rs.2 lakh",
      "85% lost money, average loss Rs.1 lakh",
      "98% lost money, average loss Rs.5 lakh"
    ],
    correct: 1,
    explanation: "SEBI's 2024 study found that 93% of individual F&O traders lost money, with average losses of Rs.2 lakh per trader. This sobering statistic underscores the danger of leverage — retail traders often treat leverage as 'free money' without accounting for worst-case scenarios. This finding was a key driver behind SEBI's November 2024 reforms restricting weekly expiries and tightening margin rules."
  },
  {
    id: 64,
    session: 2,
    topic: "Simple Interest Approximation",
    question: "The simple interest approximation for futures pricing is F = S × [1 + (r - q) × T/365]. Compared to the exact continuous formula, this approximation gives nearly identical results when:",
    options: [
      "The contract is short-dated, under 90 days (error < 0.05%)",
      "The underlying is a commodity rather than an equity index",
      "The risk-free rate exceeds 10%",
      "The dividend yield is zero"
    ],
    correct: 0,
    explanation: "For short-dated contracts under 90 days, the simple interest approximation gives nearly identical results to the exact continuous compounding formula, with error less than 0.05%. For contracts beyond 90 days or in exam settings requiring precision, the continuous formula F = S × e^((r-q)×T) should be used. Both approaches are shown side-by-side in the textbook's Nifty fair value example."
  },
  {
    id: 65,
    session: 2,
    topic: "Theoretical Basis Calculation",
    question: "Given Nifty Spot = 23,151 and fair Nifty futures = 23,213.65, the theoretical basis is:",
    options: [
      "-62.65 points (backwardation)",
      "0 points (at fair value)",
      "+151 points (deep contango)",
      "+62.65 points (contango)"
    ],
    correct: 3,
    explanation: "Theoretical Basis = Futures - Spot = 23,213.65 - 23,151 = +62.65 points. A positive basis indicates contango, which is the normal condition when carry costs (r = 6.68%) exceed dividend yield (q = 1.20%). The basis converges to zero as expiry approaches, because at expiry the futures price must equal the spot price by the convergence principle."
  },
  {
    id: 66,
    session: 2,
    topic: "Backwardation Causes in Indian Markets",
    question: "In Indian equity markets, Nifty futures may trade in backwardation (below spot) when:",
    options: [
      "There is heavy FII selling pressure or during dividend season",
      "Interest rates are very low and approaching zero",
      "SEBI increases lot sizes, reducing market participation",
      "India VIX drops below 10, indicating extreme calm"
    ],
    correct: 0,
    explanation: "While Nifty futures typically trade in mild contango (15-80 points above spot for near-month), backwardation can occur during heavy FII selling or dividend season. FII selling pressure drives futures prices down below spot, while concentrated dividend payments temporarily increase the effective yield, potentially pushing the net carry cost negative."
  },
  {
    id: 67,
    session: 2,
    topic: "Long Hedge Application",
    question: "An Indian oil refiner (IOCL) needs to purchase 100,000 barrels of crude oil in 3 months. To lock in today's price, they should:",
    options: [
      "Buy crude oil futures today (long hedge)",
      "Enter into a plain-vanilla interest rate swap",
      "Buy crude oil put options for downside protection",
      "Sell crude oil futures today (short hedge)"
    ],
    correct: 0,
    explanation: "A long hedge (buying futures) is used when you need to BUY the underlying in the future and want to lock in today's price against the fear that prices will rise. By buying crude futures, IOCL fixes its purchase cost. If crude prices rise, the futures profit offsets the higher spot purchase price. A short hedge would be appropriate for a producer who fears price declines."
  },
  {
    id: 68,
    session: 2,
    topic: "Hedge Effectiveness",
    question: "Hedge effectiveness is calculated as:",
    options: [
      "Number of contracts × Lot Size / Portfolio Value",
      "Correlation between spot and futures returns",
      "(Futures P&L / Portfolio P&L) × 100%",
      "1 - (Variance of hedged portfolio / Variance of unhedged portfolio)"
    ],
    correct: 3,
    explanation: "Hedge Effectiveness = 1 - Var(Hedged Returns) / Var(Unhedged Returns). A hedge effectiveness of 0.95 means the hedge has eliminated 95% of the portfolio's return variance. In Excel: =1-VAR.S(HedgedReturns)/VAR.S(UnhedgedReturns). This measure captures how much risk reduction the hedge achieves, accounting for basis risk and imperfect correlation."
  },
  {
    id: 69,
    session: 2,
    topic: "Beta as Hedge Ratio",
    question: "When hedging an equity portfolio with index futures, the optimal hedge ratio equals the portfolio beta because:",
    options: [
      "Beta is always exactly 1.0 for diversified portfolios",
      "Beta captures the portfolio's sensitivity to index movements, equivalent to ρ × (σ_portfolio / σ_index)",
      "SEBI mandates using beta for all institutional hedges",
      "Beta is simpler to compute than the minimum variance hedge ratio"
    ],
    correct: 1,
    explanation: "For equity portfolios hedged with index futures, beta = ρ × (σ_S / σ_F), which is mathematically identical to the MVHR formula h* = ρ × (σ_S / σ_F). Beta measures how much the portfolio moves relative to the index. A beta of 1.15 means the portfolio moves 1.15% for every 1% index move, so you need 15% more futures contracts than a beta-1 portfolio."
  },
  {
    id: 70,
    session: 2,
    topic: "Futures Pricing — Excel Implementation",
    question: "To compute the fair Nifty futures price in Excel given Spot in B6, risk-free rate in B7, dividend yield in B8, and days to expiry in B9, the correct formula is:",
    options: [
      "=B6*(1+B7)^(B9/365) - B6*B8*(B9/365)",
      "=B6*(1+B7-B8)*B9/365",
      "=B6*EXP(B7*B9/365) - B8",
      "=B6*EXP((B7-B8)*B9/365)"
    ],
    correct: 3,
    explanation: "The exact formula =B6*EXP((B7-B8)*B9/365) implements F = S × e^((r-q)×T), where T = Days/365. The simple approximation would be =B6*(1+(B7-B8)*B9/365). Both are provided in the textbook's solved example. The basis can then be computed as =ActualFuturesPrice - B6 to check whether the market is in contango or backwardation."
  },
  {
    id: 71,
    session: 3,
    topic: "Swap Dealer Bid-Ask Spread",
    question: "A swap dealer quotes: 'Pay fixed 7.40%, Receive fixed 7.60%.' The dealer's bid-ask spread and profit mechanism is:",
    options: [
      "120 bps spread; the dealer charges 60 bps on each side",
      "20 bps spread; the dealer earns by paying a lower fixed rate to one party and receiving a higher fixed rate from the other",
      "20 bps spread; the dealer earns by manipulating the floating MIBOR rate",
      "0 bps spread; the dealer earns only from upfront fees"
    ],
    correct: 1,
    explanation: "The swap dealer intermediates between two counterparties with a 20 basis point bid-ask spread. The dealer pays 7.40% fixed to Company A (who wants to receive fixed) and receives 7.60% fixed from Company B (who wants to pay fixed). The 20 bps difference (7.60% - 7.40%) is the dealer's profit on the notional, earned on each payment period."
  },
  {
    id: 72,
    session: 3,
    topic: "IRS Floating Payment Calculation",
    question: "In an IRS with notional Rs.10 crore, floating leg = MIBOR + 0.50%, MIBOR = 6.50%, semi-annual (180 days, Actual/365), the floating payment is approximately:",
    options: [
      "Rs.32,05,479",
      "Rs.34,52,055",
      "Rs.36,98,630",
      "Rs.41,91,781"
    ],
    correct: 1,
    explanation: "Floating payment = Notional × (MIBOR + Spread) × (Days/365) = 10,00,00,000 × (6.50% + 0.50%) × (180/365) = 10,00,00,000 × 7.00% × 0.4932 = Rs.34,52,055. In Period 1, since the fixed payment is Rs.36,98,630 (at 7.50%), the net payment is A pays B = Rs.36,98,630 - Rs.34,52,055 = Rs.2,46,575."
  },
  {
    id: 73,
    session: 3,
    topic: "Currency Swap — ECB Conversion",
    question: "An Indian IT company has a $10 million ECB at 6.00% and enters a currency swap at USD/INR = 92.50 to pay fixed INR 8.50%. At maturity, if USD/INR has risen to 100, the company saves approximately how much on principal repayment alone?",
    options: [
      "Rs.7.50 crore",
      "Rs.92.50 crore",
      "Rs.10.00 crore",
      "Rs.3.25 crore"
    ],
    correct: 0,
    explanation: "Without the swap, repaying $10M at USD/INR = 100 would cost Rs.100 crore. With the swap, the company pays back Rs.92.50 crore (at the original swap rate of 92.50) and receives $10M to repay the ECB. Savings = Rs.100 crore - Rs.92.50 crore = Rs.7.50 crore on principal alone. This illustrates how currency swaps eliminate FX risk on the principal component entirely."
  },
  {
    id: 74,
    session: 3,
    topic: "Swap Valuation — Rate Rise Scenario",
    question: "In the textbook's swap valuation example, the fixed-rate payer has a positive MTM of Rs.10.3 lakh after market rates rise from 7.50% to 8.50%. This is because:",
    options: [
      "The floating-rate bond has fallen below par while the fixed-rate bond remains at par",
      "The fixed-rate payer is now paying a below-market fixed rate, making the fixed-rate bond worth less than par while the floating bond is near par",
      "Both bonds have risen in value, but the floating bond rose more",
      "The notional principal has appreciated due to the rate increase"
    ],
    correct: 1,
    explanation: "When market rates rise to 8.50%, the fixed-rate bond (paying old 7.50%) falls below par (PV = Rs.9,87,67,111 vs. Rs.10 crore par) because its coupon is now below market. The floating-rate bond, which resets to current rates, is valued near par (Rs.9,97,97,413). Swap Value = Floating - Fixed = positive Rs.10,30,302 for the fixed-rate payer who is locked into an advantageously low rate."
  },
  {
    id: 75,
    session: 3,
    topic: "Floating Bond Between Reset Dates",
    question: "Between reset dates, the value of a floating-rate bond is calculated by:",
    options: [
      "Discounting the next known floating payment plus par back to today at the current market rate",
      "Using the original fixed coupon rate to discount all remaining payments",
      "Assuming it equals par at all times, regardless of market rate changes",
      "Adding accrued interest to the par value without discounting"
    ],
    correct: 0,
    explanation: "The floating-rate bond equals par ONLY at reset dates. Between resets, the next coupon is already fixed (determined at the last reset), so you must calculate PV = (Next Known Payment + Par) / (1 + current market rate for the period). The textbook's practitioner alert explicitly warns that many textbooks oversimplify this, leading to incorrect mid-period valuations."
  },
  {
    id: 76,
    session: 3,
    topic: "Swap Valuation — Discount Rate",
    question: "In the textbook's swap valuation example, the 4 remaining semi-annual fixed payments of Rs.36,98,630 each are discounted at:",
    options: [
      "The current market swap rate of 8.50% per annum (4.25% per period)",
      "The RBI repo rate of 6.50%",
      "MIBOR + spread = 8.30% per annum",
      "The original fixed swap rate of 7.50% per annum (3.75% per period)"
    ],
    correct: 0,
    explanation: "For swap valuation, the remaining fixed cash flows are discounted at the CURRENT market swap rate (8.50%), not the original contractual rate (7.50%). This is because valuation answers the question: 'What is this swap worth today given current market conditions?' Using the current rate = 8.50%/2 = 4.25% per semi-annual period gives PV of Fixed Bond = Rs.9,87,67,111."
  },
  {
    id: 77,
    session: 3,
    topic: "Net Borrowing Cost After Swap",
    question: "Company A has a fixed-rate loan at 8.50% and enters a swap to pay MIBOR to a dealer and receive 7.40% fixed. Company A's net borrowing cost is:",
    options: [
      "7.40% fixed",
      "MIBOR + 0.50%",
      "8.50% - 7.40% = 1.10% flat",
      "MIBOR + 1.10%"
    ],
    correct: 3,
    explanation: "Company A's net cost = Original loan cost + Swap payments - Swap receipts = 8.50% + MIBOR - 7.40% = MIBOR + 1.10%. Through the swap, Company A has effectively converted its 8.50% fixed-rate loan into a floating-rate obligation of MIBOR + 1.10%. If A expects rates to fall, this conversion benefits them as MIBOR declines."
  },
  {
    id: 78,
    session: 4,
    topic: "Option Premium Decomposition",
    question: "A Nifty 23,200 Call is trading at Rs.450 when Nifty spot is at 23,151. The intrinsic value and time value of this call are:",
    options: [
      "Intrinsic = Rs.151, Time value = Rs.299",
      "Intrinsic = Rs.49, Time value = Rs.401",
      "Intrinsic = Rs.0, Time value = Rs.450",
      "Intrinsic = Rs.450, Time value = Rs.0"
    ],
    correct: 2,
    explanation: "Intrinsic value of a call = max(S - K, 0) = max(23,151 - 23,200, 0) = Rs.0. The call is slightly OTM (spot below strike), so the entire premium of Rs.450 is time value. Time value reflects the probability that Nifty could rise above 23,200 before expiry. Time value decays as expiry approaches (theta decay) and reaches zero at expiry for OTM options."
  },
  {
    id: 79,
    session: 4,
    topic: "Short Put Maximum Loss",
    question: "A trader writes (sells) a Nifty 23,200 Put at a premium of Rs.380. The maximum possible loss on this position is:",
    options: [
      "Rs.22,820 (strike minus premium, per unit)",
      "Rs.23,200 (the strike price)",
      "Rs.380 (the premium received)",
      "Unlimited"
    ],
    correct: 0,
    explanation: "Short Put max loss = K - Premium = 23,200 - 380 = Rs.22,820 per unit. This occurs if the underlying falls to zero, where the put writer must buy at 23,200 but the asset is worthless. The premium received (Rs.380) partially offsets the loss. Maximum profit is limited to the premium received (Rs.380) when the option expires OTM (Nifty stays above 23,200)."
  },
  {
    id: 80,
    session: 4,
    topic: "Long Call Breakeven",
    question: "A trader buys a Nifty 23,200 Call at Rs.450. The breakeven point at expiry is:",
    options: [
      "23,200 (the strike price)",
      "23,650 (strike + premium)",
      "22,750 (strike - premium)",
      "23,151 (the current spot price)"
    ],
    correct: 1,
    explanation: "Long Call Breakeven = Strike + Premium = 23,200 + 450 = 23,650. At this level, the intrinsic value (23,650 - 23,200 = 450) exactly equals the premium paid, producing zero P&L. Below 23,650, the trader incurs a loss (maximum = Rs.450 if Nifty expires at or below 23,200). Above 23,650, every additional point generates Rs.1 × lot size in profit."
  },
  {
    id: 81,
    session: 4,
    topic: "Short Call P&L Calculation",
    question: "A trader sells a Nifty 23,200 Call at Rs.450 (lot size 65). Nifty expires at 23,800. The per-lot P&L is:",
    options: [
      "+Rs.29,250",
      "-Rs.9,750",
      "+Rs.9,750",
      "-Rs.29,250"
    ],
    correct: 1,
    explanation: "Short Call P&L = (Premium - max(S_T - K, 0)) × Lot Size = (450 - max(23,800 - 23,200, 0)) × 65 = (450 - 600) × 65 = (-150) × 65 = -Rs.9,750 per lot. The call writer loses because Nifty expired above the strike. This is the mirror image of the long call buyer's profit of +Rs.9,750, illustrating that options are a zero-sum game between buyer and writer."
  },
  {
    id: 82,
    session: 4,
    topic: "Barings Bank Case — Short Straddle",
    question: "Nick Leeson's short straddle strategy on the Nikkei 225 at a strike of 19,000 was profitable only if:",
    options: [
      "The Nikkei stayed within a narrow range near 19,000 (between the two breakevens)",
      "The Nikkei fell sharply below 19,000",
      "The Nikkei rose strongly above 19,000",
      "The yen appreciated against the dollar"
    ],
    correct: 0,
    explanation: "A short straddle (simultaneously selling a call and put at the same strike) profits only when the market stays within a narrow range near the strike price, bounded by the breakevens (Strike ± total premiums). Leeson was betting the Nikkei would remain stable around 19,000. The Kobe earthquake sent the Nikkei into freefall, causing massive losses on his short puts."
  },
  {
    id: 83,
    session: 4,
    topic: "Barings Bank Collapse — Key Facts",
    question: "The collapse of Barings Bank in 1995 resulted in losses of approximately:",
    options: [
      "GBP 100 million, requiring a government bailout",
      "GBP 827 million, more than twice the bank's total equity of GBP 440 million",
      "GBP 440 million, exactly matching the bank's total equity",
      "GBP 2 billion, making it the largest trading loss in history"
    ],
    correct: 1,
    explanation: "Hidden losses grew from GBP 2 million in 1992 to GBP 827 million by February 1995, more than twice Barings' total equity of GBP 440 million. Barings, founded in 1762 (the oldest merchant bank in London), was sold to ING for GBP 1. The case illustrates the catastrophic risk of naked short options positions combined with operational control failures."
  },
  {
    id: 84,
    session: 4,
    topic: "Short Straddle Breakeven Calculation",
    question: "A short straddle on Nifty at strike 23,200 with call premium Rs.450 and put premium Rs.380 has a profit zone between:",
    options: [
      "22,370 and 23,650",
      "22,820 and 23,650",
      "22,750 and 23,650",
      "22,370 and 24,030"
    ],
    correct: 3,
    explanation: "Short straddle breakevens = Strike ± Total Premiums Received. Total premium = 450 + 380 = Rs.830. Lower breakeven = 23,200 - 830 = 22,370. Upper breakeven = 23,200 + 830 = 24,030. The straddle is profitable only if Nifty expires between 22,370 and 24,030. Maximum profit = Rs.830 per unit (earned if Nifty expires exactly at 23,200)."
  },
  {
    id: 85,
    session: 5,
    topic: "Put-Call Parity — Dividend Yield Error",
    question: "For 30-day Nifty options, ignoring the dividend yield (q ≈ 1.2%) in put-call parity introduces an error of approximately:",
    options: [
      "Rs.20-25 per contract",
      "Rs.5-10 per contract",
      "Rs.100+ per contract",
      "Rs.1-2 per contract"
    ],
    correct: 0,
    explanation: "Ignoring the dividend yield of approximately 1.2% introduces an error of Rs.20-25 per contract for 30-day options. The textbook's solved example shows the difference: without dividend adjustment, RHS = 23,565.00 vs. with adjustment RHS = 23,551.30, a difference of Rs.13.70. For precise arbitrage detection in Indian index options, always use the dividend-adjusted formula."
  },
  {
    id: 86,
    session: 5,
    topic: "Put-Call Parity Verification",
    question: "Given C=491, P=414, K=23,200, S=23,151, r=6.68%, q=1.20%, T=0.0493 years, the parity difference (LHS - RHS) is approximately Rs.63.38. This indicates:",
    options: [
      "A clear arbitrage opportunity that should be exploited immediately",
      "The call is underpriced and should be bought",
      "The put is overpriced and should be sold",
      "No actionable arbitrage because the difference is within transaction cost bounds (Rs.50-80)"
    ],
    correct: 3,
    explanation: "A parity difference of Rs.63.38 falls within the estimated transaction cost bounds of Rs.50-80 per unit (including brokerage, STT, and impact cost). No actionable arbitrage exists. Only if the difference exceeded approximately Rs.100 (well beyond transaction costs) would a risk-free arbitrage be feasible. Transaction costs in Indian markets are higher than in the US due to STT."
  },
  {
    id: 87,
    session: 5,
    topic: "Binomial Up Factor Calculation",
    question: "In a CRR binomial model with σ = 22% and dt = 0.02466 years, the up factor u = e^(σ × √dt) is approximately:",
    options: [
      "1.02200",
      "1.03455",
      "1.03515",
      "1.04932"
    ],
    correct: 2,
    explanation: "u = e^(σ × √dt) = e^(0.22 × √0.02466) = e^(0.22 × 0.15703) = e^(0.03455) = 1.03515. The up factor represents the multiplicative price increase in one time step. With u = 1.03515 and d = 1/u = 0.96604, the price range per step is approximately ±3.5%, calibrated to the volatility and time step length."
  },
  {
    id: 88,
    session: 5,
    topic: "Risk-Neutral Probability Calculation",
    question: "With r=6.68%, dt=0.02466, u=1.03515, d=0.96604, the risk-neutral probability p is approximately:",
    options: [
      "0.4849",
      "0.5000",
      "0.5151",
      "0.5548"
    ],
    correct: 2,
    explanation: "p = (e^(r×dt) - d) / (u - d) = (e^(0.0668×0.02466) - 0.96604) / (1.03515 - 0.96604) = (1.001647 - 0.96604) / 0.06911 = 0.03561 / 0.06911 = 0.5151. This is not the real-world probability of Nifty going up; it is the risk-neutral probability that, when used to discount expected payoffs at the risk-free rate, produces the correct market price."
  },
  {
    id: 89,
    session: 5,
    topic: "Binomial Backward Induction",
    question: "In a 2-step binomial tree, the option value at node (1,0) is computed using the backward induction formula: V(1,0) = e^(-r×dt) × [p×V(2,0) + (1-p)×V(2,1)]. With V(2,0) = 1,607.06, V(2,1) = 0, p = 0.5151, the value V(1,0) is approximately:",
    options: [
      "Rs.1,607.06",
      "Rs.803.53",
      "Rs.425.04",
      "Rs.826.51"
    ],
    correct: 3,
    explanation: "V(1,0) = e^(-0.0668×0.02466) × [0.5151 × 1,607.06 + 0.4849 × 0] = 0.998354 × 827.87 = Rs.826.51. This is the call option value at the up-node one step before expiry. The discount factor e^(-r×dt) = 0.998354 accounts for one time step of time-value-of-money. Working backward one more step from V(1,0) = 826.51 and V(1,1) = 0 gives the final option price of Rs.425.04."
  },
  {
    id: 90,
    session: 5,
    topic: "Binomial vs. BSM Convergence",
    question: "The textbook's 2-step binomial tree gives a Nifty call price of Rs.425.04 vs. BSM of approximately Rs.440-450. The difference arises because:",
    options: [
      "The binomial model uses discrete dividends while BSM uses continuous",
      "BSM uses historical volatility while binomial uses implied volatility",
      "The risk-neutral probability in the binomial model is incorrect",
      "A 2-step tree is a coarse approximation; with 50+ steps, the binomial price converges to BSM"
    ],
    correct: 3,
    explanation: "A 2-step tree divides the time to expiry into only 2 periods, creating a coarse approximation of the continuous price process assumed by BSM. With more steps (50-100+), the binomial tree generates finer granularity and converges to the BSM closed-form value. The observed market price of Rs.491 is higher still because the actual IV exceeds the assumed 22%."
  },
  {
    id: 91,
    session: 5,
    topic: "American Put — Early Exercise",
    question: "When pricing an American put using a binomial tree, at each node the option value equals:",
    options: [
      "The discounted expected value using risk-neutral probabilities (same as European)",
      "The exercise value max(K - S, 0) at every node",
      "The maximum of the exercise value and the continuation value (discounted expected value)",
      "The average of the exercise value and the continuation value"
    ],
    correct: 2,
    explanation: "For American options, at each node: Value = max(Exercise Value, Continuation Value). The exercise value is what you get by exercising now: max(K - S, 0) for a put. The continuation value is the discounted expected value from waiting. If exercise value exceeds continuation value at any node, early exercise is optimal. European options only use continuation value since early exercise is not permitted."
  },
  {
    id: 92,
    session: 6,
    topic: "Log-Normal Distribution Rationale",
    question: "The BSM model assumes stock prices follow a log-normal distribution rather than a normal distribution because:",
    options: [
      "Log-normal distributions ensure prices cannot go negative, while normal distributions allow negative prices",
      "Log-normal distributions produce symmetric option payoffs",
      "Normal distributions are computationally more expensive to work with",
      "Log-normal distributions have thinner tails, reducing the probability of extreme moves"
    ],
    correct: 0,
    explanation: "Stock prices cannot be negative. If returns were normally distributed, prices could theoretically fall below zero. BSM assumes LOG returns (ln(P_t/P_{t-1})) are normally distributed, which means prices follow a log-normal distribution — they can rise without limit but never fall below zero. In practice, return distributions have fatter tails than log-normal (excess kurtosis), which is why the volatility skew exists."
  },
  {
    id: 93,
    session: 6,
    topic: "N(d2) Interpretation",
    question: "In the BSM framework, N(d2) roughly represents:",
    options: [
      "The volatility of the option premium",
      "The option's delta (sensitivity to spot price)",
      "The expected return of the underlying asset",
      "The probability that the option finishes in-the-money under the risk-neutral measure"
    ],
    correct: 3,
    explanation: "N(d2) is the cumulative standard normal probability evaluated at d2, and it approximately represents the risk-neutral probability that the option will expire in-the-money. Key reference values: N(0) = 0.50, N(1) = 0.8413, N(1.645) = 0.95. For an ATM option, d2 is near zero, so N(d2) ≈ 0.50 — roughly 50% chance of expiring ITM. N(d1), by contrast, is the option's delta."
  },
  {
    id: 94,
    session: 6,
    topic: "d2 Formula",
    question: "The relationship between d1 and d2 in the BSM model is:",
    options: [
      "d2 = d1 + σ × √T",
      "d2 = d1 × σ × √T",
      "d2 = d1 - σ × √T",
      "d2 = d1 / (σ × √T)"
    ],
    correct: 2,
    explanation: "d2 = d1 - σ√T. With d1 = [ln(S/K) + (r + σ²/2)×T] / (σ√T), substituting gives d2 = [ln(S/K) + (r - σ²/2)×T] / (σ√T). The difference σ√T between d1 and d2 captures the effect of volatility over the option's life. For the textbook's canonical inputs (σ=22%, T=0.0493): d1 = 0.0928 and d2 = 0.0440."
  },
  {
    id: 95,
    session: 6,
    topic: "India VIX Historical Extremes",
    question: "India VIX peaked at which level during the COVID crash (March 2020) and traded as low as what in late 2024?",
    options: [
      "Peak 45.2 (COVID), Low 12.5 (2024)",
      "Peak 86.6 (COVID), Low 8.7 (2024)",
      "Peak 65.0 (COVID), Low 15.0 (2024)",
      "Peak 100+ (COVID), Low 5.0 (2024)"
    ],
    correct: 1,
    explanation: "India VIX peaked at 86.6 during the COVID crash (March 2020), reflecting extreme fear and uncertainty, and traded as low as 8.7 in late 2024 before SEBI's regulatory overhaul. The current level of approximately 22 (March 2026) is elevated by historical standards. As a rule of thumb: buy options when IV is low (options are 'cheap') and sell when IV is high (options are 'expensive')."
  },
  {
    id: 96,
    session: 6,
    topic: "Volatility Skew — ATM IV vs. OTM Put IV",
    question: "In a typical March 2026 Nifty volatility skew, ATM options (strike 23,200) have IV of approximately 21-23%, while deep OTM puts (strike 22,000) have IV of:",
    options: [
      "15-17% (lower than ATM)",
      "21-23% (same as ATM)",
      "24-26% (slightly higher than ATM)",
      "28-30% (significantly higher than ATM)"
    ],
    correct: 3,
    explanation: "Deep OTM puts (strike 22,000) carry IV of 28-30%, significantly higher than ATM (21-23%). This reflects maximum crash insurance demand. The skew descends from deep OTM puts (28-30%) through OTM puts (24-26%) to ATM (21-23%) and further to OTM calls (19-20%) and deep OTM calls (17-19%). This skew compensates put sellers for bearing crash risk."
  },
  {
    id: 97,
    session: 7,
    topic: "Gamma Interpretation",
    question: "A Nifty 23,200 Call has Gamma = 0.000350. If Nifty moves up 100 points, the option's Delta changes from 0.537 to approximately:",
    options: [
      "0.572",
      "0.537 (unchanged)",
      "0.502",
      "0.640"
    ],
    correct: 0,
    explanation: "New Delta = Old Delta + Gamma × ΔS = 0.537 + 0.000350 × 100 = 0.537 + 0.035 = 0.572. Gamma measures the rate of change of delta per Rs.1 change in the underlying. It is highest for ATM options near expiry. The acceleration of delta changes (gamma risk) is why holding large short ATM positions near expiry is dangerous — delta swings violently and unpredictably."
  },
  {
    id: 98,
    session: 7,
    topic: "Theta — Time Decay Per Lot",
    question: "An ATM Nifty call option has Theta of approximately -Rs.14.6 per day per unit. For one lot (65 units), the daily time decay cost is:",
    options: [
      "Rs.14.6",
      "Rs.219",
      "Rs.949",
      "Rs.1,460"
    ],
    correct: 2,
    explanation: "Daily time decay per lot = Theta × Lot Size = Rs.14.6 × 65 = Rs.949 per day. This means a long ATM Nifty call loses nearly Rs.1,000 per lot every day just from the passage of time, even if Nifty doesn't move. For a 10-lot position, that's Rs.9,490 per day in theta bleed. This is why option buyers prefer short-dated high-conviction trades and option sellers earn theta as income."
  },
  {
    id: 99,
    session: 7,
    topic: "Delta Hedging — Number of Futures",
    question: "A market maker sells 10 lots of Nifty 23,200 Calls (Delta = 0.537, lot size = 65). To delta-hedge, they must buy approximately how many Nifty futures lots?",
    options: [
      "3 lots",
      "15 lots",
      "10 lots",
      "5 lots (approximately 5.4 lots)"
    ],
    correct: 3,
    explanation: "Hedge position = Option Delta × Number of Options × Lot Size = 0.537 × 10 × 65 = 349 units of Nifty. Since each Nifty futures lot = 65 units: 349/65 = 5.37, approximately 5.4 lots. The market maker rounds to 5 lots (pragmatically). This delta-neutral position means small spot price movements produce roughly zero P&L, isolating gamma, theta, and vega exposures."
  },
  {
    id: 100,
    session: 7,
    topic: "OI Buildup Patterns",
    question: "A trader observes Nifty futures price rising while open interest is decreasing. This pattern is called:",
    options: [
      "Long buildup — new long positions are being created",
      "Short covering — existing short positions are being closed",
      "Long unwinding — existing long positions are being closed",
      "Short buildup — new short positions are being created"
    ],
    correct: 1,
    explanation: "Rising price + decreasing OI = Short Covering. Existing short sellers are buying back their positions (closing), which pushes prices up while reducing total outstanding contracts. This is considered mildly bullish but lacks conviction compared to a long buildup (rising price + increasing OI), which indicates fresh buying and stronger bullish sentiment."
  },
  {
    id: 101,
    session: 1,
    topic: "Forward Contracts — Definition",
    question: "A forward contract differs from a futures contract primarily because a forward is:",
    options: [
      "Standardized and traded on an organized exchange with daily MTM settlement",
      "Always denominated in a foreign currency",
      "Private, customized, OTC, and settled at maturity rather than daily",
      "Guaranteed by a Central Counterparty through novation"
    ],
    correct: 2,
    explanation: "Forwards are private, customized OTC contracts settled at maturity, whereas futures are standardized, exchange-traded, and marked-to-market daily. Forwards carry direct bilateral counterparty risk since no CCP intermediates. This flexibility (custom notional, tenor, and settlement terms) makes forwards popular for corporate hedging despite the higher credit risk."
  },
  {
    id: 102,
    session: 1,
    topic: "Swap Definition — Cash Flow Exchange",
    question: "In a swap, the two parties agree to exchange:",
    options: [
      "Cash flows based on different financial variables over a specified period",
      "Shares of stock at a predetermined price",
      "Ownership of the underlying asset at a future date",
      "Physical commodities at spot prices on multiple dates"
    ],
    correct: 0,
    explanation: "A swap is an OTC derivative where two parties agree to exchange cash flows over a specified period based on different financial variables. The most common type is the plain-vanilla interest rate swap, where one party pays fixed and receives floating. Unlike forwards or futures, swaps involve multiple periodic exchanges rather than a single settlement."
  },
  {
    id: 103,
    session: 1,
    topic: "OTC Derivatives — Regulation in India",
    question: "OTC derivatives in India are primarily governed by the:",
    options: [
      "ISDA framework (for documentation) and RBI (for regulation)",
      "NSE Clearing Limited through daily novation",
      "Companies Act and Ministry of Corporate Affairs",
      "SEBI exchange rules and SPAN margining"
    ],
    correct: 0,
    explanation: "OTC derivatives use the ISDA (International Swaps and Derivatives Association) framework for documentation, including the Master Agreement and Credit Support Annex. RBI regulates currency and interest rate OTC derivatives. Exchange-traded derivatives, by contrast, are governed by SEBI/exchange rules. This dual regulatory structure reflects the fundamentally different nature of OTC and listed instruments."
  },
  {
    id: 104,
    session: 1,
    topic: "Settlement Guarantee Fund",
    question: "The Settlement Guarantee Fund (SGF) maintained by the CCP is designed to cover losses when:",
    options: [
      "A retail client fails to meet a margin call",
      "A listed company's stock price falls below its IPO price",
      "A Clearing Member itself defaults on its obligations to the CCP",
      "The exchange's matching engine experiences a technical failure"
    ],
    correct: 2,
    explanation: "The SGF is the last line of defense in the clearing hierarchy. When a client defaults, the Clearing Member absorbs the loss first. The SGF is activated only when a Clearing Member defaults on its obligations to the CCP. This multi-layered protection (client margin → CM → SGF) is why exchange-traded derivatives have near-zero counterparty risk."
  },
  {
    id: 105,
    session: 1,
    topic: "Tick Size — Nifty Contracts",
    question: "The tick size (minimum price movement) for Nifty 50 futures and options on NSE is:",
    options: [
      "0.05 points",
      "0.25 points",
      "0.10 points",
      "0.01 points"
    ],
    correct: 0,
    explanation: "Nifty 50 futures and options have a tick size of 0.05 points, meaning the price can move in increments of Rs.0.05. For one lot of 65 units, each tick represents a P&L change of 0.05 × 65 = Rs.3.25. Tick size determines the minimum possible price change and affects the precision of limit orders and the granularity of bid-ask spreads."
  },
  {
    id: 106,
    session: 1,
    topic: "Expiry Day — NSE Derivatives",
    question: "Nifty futures and monthly options on NSE expire on:",
    options: [
      "The last Thursday of each month",
      "The last Friday of each month",
      "The last Tuesday of each month",
      "The 15th of each month"
    ],
    correct: 2,
    explanation: "Nifty 50 futures and monthly options expire on the last Tuesday of the month. Weekly Nifty options also expire on Tuesdays. BSE's Sensex weekly options expire on Thursdays. This was established after SEBI's November 2024 reforms, which limited weekly expiries to one benchmark index per exchange to reduce speculative activity."
  },
  {
    id: 107,
    session: 1,
    topic: "Maintenance Margin — Percentage of Initial",
    question: "The maintenance margin for Nifty futures is approximately what percentage of the initial margin?",
    options: [
      "50-60%",
      "65-70%",
      "75-80%",
      "90-95%"
    ],
    correct: 2,
    explanation: "Maintenance margin is approximately 75-80% of the initial margin. When the margin balance falls below this threshold due to cumulative MTM losses, a margin call is triggered. The trader must then deposit funds to restore the margin to the full initial margin level — not merely back to the maintenance level — before the next trading day's opening."
  },
  {
    id: 108,
    session: 1,
    topic: "Discrete vs. Continuous Compounding",
    question: "Rs.100 invested for 1 year at 7% grows to Rs.107.00 under annual compounding and Rs.107.25 under continuous compounding. The difference arises because:",
    options: [
      "Continuous compounding uses a higher interest rate",
      "Annual compounding includes a tax deduction that reduces the terminal value",
      "Continuous compounding accounts for inflation while discrete compounding does not",
      "Continuous compounding compounds interest at every infinitesimal instant, yielding slightly more"
    ],
    correct: 3,
    explanation: "As compounding frequency increases, the terminal value approaches e^(rT) × Principal. Annual: 100 × (1.07) = 107.00. Semi-annual: 100 × (1.035)² = 107.12. Continuous: 100 × e^(0.07) = 107.25. The difference is small for short periods and low rates, but continuous compounding simplifies derivatives formulas by converting multiplication into addition of exponents."
  },
  {
    id: 109,
    session: 1,
    topic: "Contract Value Calculation",
    question: "A trader holds 3 lots of Nifty futures at 23,200 (lot size = 65). The total contract value is:",
    options: [
      "Rs.45,24,000",
      "Rs.15,08,000",
      "Rs.30,16,000",
      "Rs.69,600"
    ],
    correct: 0,
    explanation: "Contract Value = Futures Price × Lot Size × Number of Lots = 23,200 × 65 × 3 = Rs.45,24,000. This is the notional exposure of the position, not the capital required. With 15% initial margin, the trader needs only Rs.6,78,600 as margin (15% × 45,24,000), giving a leverage ratio of approximately 6.67x."
  },
  {
    id: 110,
    session: 1,
    topic: "Margin Call — Top-Up Destination",
    question: "When a margin call is triggered, the trader must deposit enough funds to restore the balance to:",
    options: [
      "The initial margin level",
      "The maintenance margin level",
      "50% of the contract value",
      "The original capital deposited at account opening"
    ],
    correct: 0,
    explanation: "A margin call always requires restoration to the INITIAL margin level, not merely back to the maintenance margin. This ensures there is a sufficient buffer for the next day's potential losses. For example, if initial margin is Rs.4,52,400 and the balance fell to Rs.3,48,400 (below maintenance of Rs.3,61,920), the trader must deposit Rs.1,04,000 — not just Rs.13,520."
  },
  {
    id: 111,
    session: 2,
    topic: "Cost-of-Carry — Interpretation",
    question: "In the cost-of-carry model F = S × e^((r - q) × T), the term (r - q) represents:",
    options: [
      "The total cost of the futures contract including brokerage",
      "The bid-ask spread in the futures market",
      "The net cost of carrying the underlying — interest cost minus dividend income",
      "The expected price appreciation of the underlying"
    ],
    correct: 2,
    explanation: "The net carry cost (r - q) is the interest cost of funding the position (r = risk-free rate) minus the income from holding the underlying (q = dividend yield). When r > q, carry cost is positive and futures trade above spot (contango). If dividends temporarily exceed funding costs, carry cost turns negative and futures can trade below spot (backwardation)."
  },
  {
    id: 112,
    session: 2,
    topic: "Fair Value with Changed Inputs",
    question: "Nifty spot = 24,000, risk-free rate = 7.00%, dividend yield = 1.50%, days to expiry = 30. Using the simple interest approximation F = S × [1 + (r - q) × T/365], the fair futures price is approximately:",
    options: [
      "24,108",
      "23,964",
      "24,036",
      "24,180"
    ],
    correct: 2,
    explanation: "F = 24,000 × [1 + (0.07 - 0.015) × 30/365] = 24,000 × [1 + 0.055 × 0.08219] = 24,000 × [1 + 0.004521] = 24,000 × 1.004521 = 24,108.50 ≈ 24,108. The net carry cost is 5.5% p.a. applied over 30/365 of a year. This positive carry cost places the futures in contango, approximately 108 points above spot."
  },
  {
    id: 113,
    session: 2,
    topic: "Convergence at Expiry",
    question: "As a futures contract approaches its expiry date, the basis (Futures - Spot) tends to:",
    options: [
      "Increase, because uncertainty rises near expiry",
      "Converge toward zero, because futures must equal spot at expiry",
      "Remain constant throughout the contract's life",
      "Become increasingly negative regardless of market conditions"
    ],
    correct: 1,
    explanation: "At expiry, the futures price must equal the spot price — any deviation would create a risk-free arbitrage. As T approaches zero, the carry cost (r - q) × T also approaches zero, so the theoretical basis shrinks to zero. This convergence principle is fundamental to hedging: the hedge lock-in price becomes the effective transaction price only because of convergence."
  },
  {
    id: 114,
    session: 2,
    topic: "Convenience Yield in Commodities",
    question: "In commodity futures, backwardation often occurs when there is a high 'convenience yield.' The convenience yield refers to:",
    options: [
      "The interest earned on margin collateral deposited with the exchange",
      "The tax advantage of trading commodity futures versus physical commodities",
      "The benefit or premium of holding physical inventory (e.g., to meet unexpected demand)",
      "The profit from rolling futures from one month to the next"
    ],
    correct: 2,
    explanation: "Convenience yield is the non-monetary benefit of holding physical stock — such as the ability to meet unexpected customer demand or keep production running during supply disruptions. When convenience yield is high (e.g., during supply shortages), it can exceed the funding cost, pushing the net carry cost negative and causing futures to trade below spot (backwardation)."
  },
  {
    id: 115,
    session: 2,
    topic: "Number of Contracts — Changed Inputs",
    question: "A mutual fund portfolio worth Rs.5,00,00,000 with beta = 0.90 is hedged using Nifty futures at 24,000 (lot size 65). The number of futures contracts needed is approximately:",
    options: [
      "29 contracts",
      "35 contracts",
      "32 contracts",
      "25 contracts"
    ],
    correct: 0,
    explanation: "Number of contracts = (beta × Portfolio Value) / (Futures Price × Lot Size) = (0.90 × 5,00,00,000) / (24,000 × 65) = 4,50,00,000 / 15,60,000 = 28.85, rounded to 29 contracts. A beta below 1.0 means the portfolio is less volatile than the index, so fewer contracts are needed than the notional ratio alone would suggest."
  },
  {
    id: 116,
    session: 2,
    topic: "Hedging — Giving Up Favorable Moves",
    question: "A key trade-off of hedging with futures is that the hedger:",
    options: [
      "Eliminates all basis risk and achieves a perfect hedge",
      "Locks in a more certain price but gives up potential gains from favorable price movements",
      "Can always unwind the hedge at zero cost if the market moves favorably",
      "Receives compensation from the exchange for reducing market volatility"
    ],
    correct: 1,
    explanation: "A hedge transforms an uncertain future price into a more certain one, but the cost is giving up potential favorable price movements. An FII who short-hedges their portfolio is protected if the market falls, but they also give up gains if the market rallies. This is fundamentally different from options-based hedging (e.g., protective puts), which preserves upside at the cost of the premium."
  },
  {
    id: 117,
    session: 2,
    topic: "Beta Calculation in Excel",
    question: "Portfolio beta for hedging purposes can be calculated using which of the following methods?",
    options: [
      "AVERAGE(PortfolioReturns) / AVERAGE(IndexReturns)",
      "CORREL(PortfolioReturns, IndexReturns) × 2",
      "STDEV(PortfolioReturns) / STDEV(IndexReturns)",
      "SLOPE(PortfolioReturns, IndexReturns) or COVARIANCE.S(Port,Index)/VAR.S(Index)"
    ],
    correct: 3,
    explanation: "Beta = Cov(Portfolio, Index) / Var(Index), computed in Excel as =COVARIANCE.S(port,nifty)/VAR.S(nifty) or equivalently =SLOPE(PortfolioReturns, NiftyReturns). Both produce identical results. The SLOPE function runs a linear regression of portfolio returns against index returns, where the slope coefficient is beta by definition."
  },
  {
    id: 118,
    session: 3,
    topic: "IRS — Who Benefits When Rates Rise",
    question: "In a plain-vanilla IRS, if market interest rates rise significantly after inception, which party benefits?",
    options: [
      "The fixed-rate payer, because they are paying a below-market fixed rate while receiving higher floating payments",
      "Neither party, because the notional principal adjusts to reflect new rates",
      "The floating-rate payer, because floating payments decrease when rates rise",
      "The swap dealer, because higher rates increase the bid-ask spread"
    ],
    correct: 0,
    explanation: "When rates rise, the fixed-rate payer benefits because they continue paying the original (now below-market) fixed rate while receiving larger floating payments tied to the higher market rate. The swap's MTM becomes positive for the fixed-rate payer. This is exactly what the textbook's valuation example shows: rates rising from 7.50% to 8.50% creates a positive Rs.10.3 lakh MTM for the fixed payer."
  },
  {
    id: 119,
    session: 3,
    topic: "Day Count Convention — Actual/365",
    question: "The Actual/365 day count convention used in Indian IRS markets means that for a semi-annual payment over exactly 180 days, the day count fraction is:",
    options: [
      "0.4959 (= 180/363)",
      "0.5000 (exactly half a year)",
      "0.4932 (= 180/365)",
      "0.5014 (= 183/365)"
    ],
    correct: 2,
    explanation: "Under Actual/365, the fraction is the actual number of days in the period divided by 365. For 180 days: 180/365 = 0.4932. This differs from the 30/360 convention (where every month is 30 days), which would give exactly 0.5. The Actual/365 convention is used in Indian OIS markets and affects cash flow calculations by a small but financially significant amount."
  },
  {
    id: 120,
    session: 3,
    topic: "Currency Swap — Principal Exchange",
    question: "In a USD/INR currency swap at an initial exchange rate of 92.50, the notional principal exchanged at maturity is returned at:",
    options: [
      "The prevailing spot exchange rate at the time of maturity",
      "The original exchange rate of 92.50, regardless of the current rate",
      "The average of the inception and maturity exchange rates",
      "The RBI reference rate on the maturity date"
    ],
    correct: 1,
    explanation: "At maturity of a currency swap, the principal is re-exchanged at the original inception exchange rate (92.50), regardless of where the spot rate has moved. This is what eliminates FX risk on the principal component entirely. If USD/INR has risen to 100, the company saves Rs.7.50 crore on a $10M principal repayment by paying back at 92.50 instead of 100."
  },
  {
    id: 121,
    session: 3,
    topic: "CCIL Clearing of OIS",
    question: "In India, most INR Overnight Index Swap (OIS) transactions are cleared by:",
    options: [
      "NSE Clearing Limited (formerly NSCCL)",
      "The individual banks' bilateral CSA arrangements",
      "CCIL (Clearing Corporation of India Limited)",
      "SEBI's settlement wing directly"
    ],
    correct: 2,
    explanation: "CCIL clears most INR OIS transactions, virtually eliminating counterparty risk for standard products. CCIL acts as the CCP for OTC interest rate and forex derivatives in India, similar to how NSE Clearing Limited handles exchange-traded derivatives. Non-cleared swaps (those not standardized enough for CCIL) rely on bilateral CSAs under the ISDA Master Agreement."
  },
  {
    id: 122,
    session: 3,
    topic: "Swap Valuation — Floating Bond PV Calculation",
    question: "In the textbook's swap valuation example, the floating-rate bond's PV is calculated as (Rs.40,93,151 + Rs.10,00,00,000) / (1.0425)^1 = Rs.9,97,97,413. The Rs.40,93,151 represents:",
    options: [
      "The next known floating payment, calculated as Rs.10 crore × (7.80% + 0.50%) × 180/365",
      "The notional principal adjustment for inflation",
      "The swap dealer's intermediation fee",
      "The fixed coupon payment due in the next period"
    ],
    correct: 0,
    explanation: "Rs.40,93,151 is the next floating payment = Notional × (MIBOR + Spread) × (Days/365) = 10,00,00,000 × (7.80% + 0.50%) × (180/365) = 10,00,00,000 × 8.30% × 0.4932. This payment is already known because MIBOR has reset at 7.80%. At the next reset date, the floating bond resets to par, so PV = (Next Payment + Par) / (1 + current rate per period)."
  },
  {
    id: 123,
    session: 4,
    topic: "Call Option — Buyer vs. Writer Obligations",
    question: "The writer (seller) of a call option has:",
    options: [
      "The right to buy the underlying at the strike price",
      "The right to choose whether to fulfil the contract or not",
      "The obligation to sell the underlying at the strike price if the buyer exercises",
      "The obligation to buy the underlying at the strike price"
    ],
    correct: 2,
    explanation: "The call writer has the OBLIGATION to sell the underlying at the strike price if the buyer chooses to exercise. In return for accepting this obligation, the writer receives the premium upfront. For Indian index options (European-style), this obligation can only arise at expiry. For stock options, physical delivery means the writer must actually deliver the shares."
  },
  {
    id: 124,
    session: 4,
    topic: "Put Option — When to Buy",
    question: "A trader who expects Nifty to decline sharply should:",
    options: [
      "Buy a put option",
      "Write a put option",
      "Buy a call option",
      "Buy Nifty futures"
    ],
    correct: 0,
    explanation: "Buying a put option gives the right to sell at the strike price. If Nifty falls below the strike, the put gains intrinsic value. The trader's maximum loss is limited to the premium paid, while the profit potential extends until the underlying reaches zero (practically, until a significant decline). This is the standard bearish strategy with defined risk."
  },
  {
    id: 125,
    session: 4,
    topic: "Time Value — Maximum at ATM",
    question: "Time value of an option is highest when the option is:",
    options: [
      "Deep in-the-money (ITM)",
      "Deep out-of-the-money (OTM)",
      "Time value is the same regardless of moneyness",
      "At-the-money (ATM)"
    ],
    correct: 3,
    explanation: "Time value is highest at ATM because this is where maximum uncertainty exists about whether the option will expire ITM or OTM. Deep ITM options have high intrinsic value but low time value (the outcome is relatively certain). Deep OTM options have zero intrinsic value and low time value (unlikely to become ITM). ATM options have the most to gain or lose from price movement."
  },
  {
    id: 126,
    session: 4,
    topic: "Intrinsic Value of a Put",
    question: "A Nifty 23,200 Put when Nifty spot is at 22,900 has an intrinsic value of:",
    options: [
      "Rs.0",
      "Rs.200",
      "Rs.300",
      "Rs.500"
    ],
    correct: 2,
    explanation: "Intrinsic value of a put = max(K - S, 0) = max(23,200 - 22,900, 0) = Rs.300. This put is ITM because the strike (23,200) is above spot (22,900), meaning the holder can sell at 23,200 while the market price is only 22,900 — a benefit of Rs.300. The remaining premium above Rs.300 would be time value."
  },
  {
    id: 127,
    session: 4,
    topic: "Long Put — Maximum Profit",
    question: "The theoretical maximum profit on a long put position is:",
    options: [
      "Unlimited, since the underlying can fall indefinitely",
      "Twice the premium paid",
      "Strike Price minus Premium (if the underlying falls to zero)",
      "Equal to the premium paid"
    ],
    correct: 2,
    explanation: "Maximum profit for a long put = K - Premium, which occurs if the underlying falls to zero. For a Nifty 23,200 Put purchased at Rs.380: max profit = 23,200 - 380 = Rs.22,820 per unit. Unlike a long call (unlimited upside since prices can rise infinitely), a long put's profit is capped because the underlying cannot fall below zero."
  },
  {
    id: 128,
    session: 4,
    topic: "Long Call vs. Long Put — Maximum Loss",
    question: "The maximum loss for both a long call and a long put position is:",
    options: [
      "Unlimited for both",
      "Different — unlimited for the call, limited to (K - Premium) for the put",
      "The strike price for the call, premium for the put",
      "The premium paid for both"
    ],
    correct: 3,
    explanation: "For both long call and long put buyers, the maximum loss is limited to the premium paid. This occurs when the option expires worthless (OTM) — the call expires with S < K, or the put expires with S > K. This limited downside is the fundamental advantage of buying options versus taking equivalent directional positions with futures."
  },
  {
    id: 129,
    session: 4,
    topic: "Long Call P&L — Expires Worthless",
    question: "A trader buys a Nifty 23,200 Call at Rs.450 (lot size 65). Nifty expires at 22,500. The per-lot loss is:",
    options: [
      "Rs.9,750",
      "Rs.45,500",
      "Rs.29,250",
      "Rs.0 (the option is simply abandoned)"
    ],
    correct: 2,
    explanation: "When Nifty expires at 22,500 (below the strike of 23,200), the call is OTM and expires worthless. The entire premium is lost: Loss = Premium × Lot Size = 450 × 65 = Rs.29,250 per lot. While the option is not exercised (payoff = 0), the premium was already paid upfront, so the loss equals the full premium. This is the maximum possible loss on any long option position."
  },
  {
    id: 130,
    session: 5,
    topic: "Put-Call Parity — No Dividend Simplification",
    question: "The simplified put-call parity C + K×e^(-rT) = P + S applies ONLY when:",
    options: [
      "The dividend yield (q) is zero",
      "The risk-free rate is zero",
      "The options are American-style",
      "Both options are deep OTM"
    ],
    correct: 0,
    explanation: "The simplified formula assumes no dividends (q = 0). When dividends are present, the correct formula is C + K×e^(-rT) = P + S×e^(-qT). For Nifty with q ≈ 1.2%, the dividend adjustment affects the spot term by e^(-0.012×T). Ignoring this introduces an error of Rs.20-25 per contract for 30-day options, which matters for arbitrage detection."
  },
  {
    id: 131,
    session: 5,
    topic: "CRR Binomial — Recombining Tree",
    question: "In the CRR binomial model, the property d = 1/u ensures the tree is 'recombining.' This means:",
    options: [
      "All up moves have the same probability as down moves",
      "An up move followed by a down move returns to the original price (Sud = S)",
      "The number of nodes doubles at each time step",
      "The tree can only be used for European options, not American"
    ],
    correct: 1,
    explanation: "When d = 1/u, an up move followed by a down move gives S × u × d = S × u × (1/u) = S. Similarly, a down-up sequence gives the same result. This recombining property dramatically reduces computation — a 2-step tree has only 3 terminal nodes instead of 4, and an n-step tree has (n+1) terminal nodes instead of 2^n. This is what makes binomial trees computationally tractable."
  },
  {
    id: 132,
    session: 5,
    topic: "Binomial — Stock Price at Node",
    question: "In a binomial tree with S = 23,151 and d = 0.96604, the stock price at the down node Sd is approximately:",
    options: [
      "Rs.23,151",
      "Rs.22,800",
      "Rs.22,365",
      "Rs.23,965"
    ],
    correct: 2,
    explanation: "Sd = S × d = 23,151 × 0.96604 = 22,364.99 ≈ Rs.22,365. This represents the stock price after one down move. After two down moves: Sdd = 22,365 × 0.96604 = 21,605. The down factor d = 0.96604 represents a decline of approximately 3.4% per step, calibrated to the volatility (22%) and the time step length (dt = 0.02466 years)."
  },
  {
    id: 133,
    session: 5,
    topic: "Binomial — Terminal Payoff at Sdd Node",
    question: "In a 2-step binomial tree for a Nifty 23,200 Call, the terminal node Sdd = 21,605.03. The call payoff at this node is:",
    options: [
      "Rs.1,594.97",
      "Rs.0",
      "Rs.21,605.03",
      "Rs.23,200"
    ],
    correct: 1,
    explanation: "Call payoff = max(Sdd - K, 0) = max(21,605.03 - 23,200, 0) = max(-1,594.97, 0) = Rs.0. The call expires worthless at this node because the stock price (21,605) is well below the strike (23,200). In the textbook's 2-step tree, only the Suu node (24,807.06) produces a positive payoff of Rs.1,607.06; both the Sud and Sdd nodes produce zero."
  },
  {
    id: 134,
    session: 5,
    topic: "Risk-Neutral Probability — Interpretation",
    question: "If the risk-neutral probability of an up move is p = 0.5151, this means:",
    options: [
      "Using p = 0.5151 and discounting at the risk-free rate produces the correct market price",
      "The stock's expected return equals 51.51% of the up-move return",
      "The market is slightly biased toward bullish outcomes",
      "There is a 51.51% real-world chance that Nifty will rise"
    ],
    correct: 0,
    explanation: "The risk-neutral probability is NOT a forecast of real-world direction. It is a mathematical construct: when you weight payoffs by p and (1-p), then discount at the risk-free rate, you get the correct arbitrage-free market price. This works because option payoffs can be perfectly replicated using the underlying and risk-free bonds, making actual probabilities irrelevant for pricing."
  },
  {
    id: 135,
    session: 6,
    topic: "BSM — Put Price Formula",
    question: "The BSM formula for a European put price is:",
    options: [
      "P = S × N(d1) - K × e^(-rT) × N(d2)",
      "P = S × N(-d1) - K × e^(-rT) × N(-d2)",
      "P = K × N(-d2) - S × e^(-rT) × N(-d1)",
      "P = K × e^(-rT) × N(-d2) - S × N(-d1)"
    ],
    correct: 3,
    explanation: "The BSM put price is P = K×e^(-rT)×N(-d2) - S×N(-d1). This can also be derived from put-call parity: P = C - S + K×e^(-rT). Note the use of N(-d2) and N(-d1), which are the complements of the call terms. Since N(-x) = 1 - N(x), the put price uses the probabilities of the option expiring OTM from the short side's perspective."
  },
  {
    id: 136,
    session: 6,
    topic: "BSM — Constant Volatility Assumption",
    question: "The BSM model assumes volatility is constant over the option's life. In practice, this assumption is violated because:",
    options: [
      "Historical volatility is always higher than implied volatility",
      "Exchanges update volatility parameters every hour",
      "Implied volatility varies across strikes (skew) and over time, creating patterns the model cannot capture",
      "Volatility is zero for index options and positive only for stock options"
    ],
    correct: 2,
    explanation: "In reality, implied volatility varies across strike prices (the volatility smile/skew) and changes over time. If BSM's constant-vol assumption held, all options on the same underlying with the same expiry would have identical IV. The Nifty skew — OTM puts at 28-30% IV versus OTM calls at 17-19% — is direct evidence that the market prices in non-constant, strike-dependent volatility."
  },
  {
    id: 137,
    session: 6,
    topic: "Historical Volatility — Log Returns",
    question: "Daily log returns used for historical volatility calculation are computed as ln(P_t/P_{t-1}). If today's close is 23,350 and yesterday's close was 23,200, the daily log return is approximately:",
    options: [
      "0.645%",
      "6.45%",
      "150 points",
      "0.65%"
    ],
    correct: 0,
    explanation: "Daily log return = ln(23,350/23,200) = ln(1.006466) = 0.006445 = 0.645%. Log returns differ slightly from simple returns (150/23,200 = 0.647%) but the difference is negligible for small moves. Log returns have the advantage of being additive over time and ensuring that the resulting price distribution is log-normal (prices cannot go negative)."
  },
  {
    id: 138,
    session: 6,
    topic: "IV Extraction — Method",
    question: "Implied volatility cannot be extracted from the BSM formula algebraically because:",
    options: [
      "The BSM formula contains sigma in only one place, making inversion trivial",
      "IV depends on the dividend yield, which is unknown",
      "Sigma appears in both d1 and d2 in a complex, non-invertible manner, requiring numerical methods like Goal Seek",
      "The cumulative normal distribution N(x) does not have a closed-form inverse"
    ],
    correct: 2,
    explanation: "In BSM, sigma appears in d1, d2, and both N(d1) and N(d2), creating a complex nonlinear relationship. There is no algebraic formula to isolate sigma — you must use iterative numerical methods. In Excel, Goal Seek sets the BSM price cell equal to the observed market price by iteratively changing the volatility cell until the target is matched."
  },
  {
    id: 139,
    session: 6,
    topic: "India VIX — Monthly Volatility",
    question: "If India VIX is at 22, the expected monthly Nifty move (one standard deviation) is approximately:",
    options: [
      "22%",
      "11%",
      "1.83%",
      "6.35%"
    ],
    correct: 3,
    explanation: "VIX is annualized volatility. To convert to monthly: VIX / √12 = 22% / 3.464 = 6.35%. This means the market expects Nifty to move approximately ±6.35% over one month (one standard deviation). For daily: 22% / √252 = 1.39%. These conversions are essential for sizing option positions and evaluating whether premium levels are reasonable."
  },
  {
    id: 140,
    session: 6,
    topic: "Volatility Skew — Trading Implication",
    question: "A trader sells an OTM Nifty put and an equidistant OTM call. Due to the volatility skew, the put premium will be:",
    options: [
      "Lower than the call premium because puts are less popular",
      "Equal to the call premium because they are equidistant from ATM",
      "Higher than the call premium because OTM puts carry higher IV (skew premium)",
      "Higher only if India VIX exceeds 30"
    ],
    correct: 2,
    explanation: "Due to the volatility skew, OTM puts carry higher IV than equidistant OTM calls. For example, a Nifty put 700 points OTM might have IV of 28% while a call 700 points OTM has IV of 19%. This 'skew premium' means put sellers receive higher premiums — compensating them for the greater crash risk associated with downside moves."
  },
  {
    id: 141,
    session: 7,
    topic: "Delta — Call vs. Put Range",
    question: "Delta ranges from 0 to +1 for calls and from -1 to 0 for puts. An ATM call option typically has a delta of approximately:",
    options: [
      "0.25",
      "0.75",
      "0.50",
      "1.00"
    ],
    correct: 2,
    explanation: "An ATM call has delta ≈ 0.50 (slightly above for options with positive carry cost). This means for every Rs.1 move in the underlying, the call price changes by approximately Rs.0.50. Delta also serves as a rough proxy for the probability of expiring ITM — an ATM option has roughly a 50% chance of finishing in-the-money."
  },
  {
    id: 142,
    session: 7,
    topic: "Vega — Interpretation with Data",
    question: "A Nifty 23,200 Call has Vega = 2,034 (for a 100% point change). If implied volatility rises from 22% to 23% (a 1 percentage point increase), the option price per unit increases by approximately:",
    options: [
      "Rs.20.34",
      "Rs.203.40",
      "Rs.2,034",
      "Rs.2.034"
    ],
    correct: 0,
    explanation: "Vega of 2,034 means a full 100-percentage-point change in IV would change the price by Rs.2,034. For a 1% (1 percentage point) change: 2,034 / 100 = Rs.20.34 per unit. Per lot (65 units): 20.34 × 65 = Rs.1,322. Vega is highest for ATM, longer-dated options. Long option holders benefit from rising IV (positive vega), while short option holders lose."
  },
  {
    id: 143,
    session: 7,
    topic: "Theta — Deep ITM European Put Exception",
    question: "Theta is generally negative for long option positions (time decay hurts the buyer). However, theta can be positive for:",
    options: [
      "Deep OTM call options with very high IV",
      "ATM options during the last week before expiry",
      "Deep ITM European put options",
      "All options when India VIX exceeds 50"
    ],
    correct: 2,
    explanation: "A deep ITM European put is worth approximately K×e^(-rT) - S. As time passes, e^(-rT) increases (approaches 1), potentially raising the put's present value. This means the passage of time can actually increase the deep ITM put's value — a positive theta. This is rare in practice for Nifty but is important for theoretical precision in Greeks calculations."
  },
  {
    id: 144,
    session: 7,
    topic: "Protective Put Strategy",
    question: "A protective put strategy consists of:",
    options: [
      "Selling the underlying stock and buying a call option",
      "Selling a put option against a short stock position",
      "Buying both a call and put at the same strike price",
      "Holding the underlying stock and buying a put option for downside protection"
    ],
    correct: 3,
    explanation: "A protective put = Long stock + Long put. The put acts as insurance — if the stock falls below the put's strike, the put's gains offset the stock's losses. The maximum loss is limited to (Stock Price - Strike + Put Premium). The strategy is bullish with downside protection: you keep unlimited upside potential while capping the downside at a known cost (the put premium)."
  },
  {
    id: 145,
    session: 7,
    topic: "Covered Call Strategy",
    question: "A covered call strategy is best suited for a market outlook that is:",
    options: [
      "Mildly bullish — expecting the stock to stay flat or rise modestly",
      "Strongly bullish — expecting large upside moves",
      "Strongly bearish — expecting a sharp decline",
      "Expecting very high volatility in either direction"
    ],
    correct: 0,
    explanation: "A covered call (Long stock + Short call) is a mildly bullish strategy. The trader earns premium income from the short call but caps their upside at the call's strike price. Maximum profit = Call Strike - Stock Entry Price + Premium Received. If the stock rises sharply above the call strike, the trader misses out on gains beyond that level. The premium provides a small cushion against moderate declines."
  },
  {
    id: 146,
    session: 7,
    topic: "Bull Call Spread — Max Profit",
    question: "A bull call spread is constructed by buying a 23,000 Call at Rs.600 and selling a 23,500 Call at Rs.250. The maximum profit per unit is:",
    options: [
      "Rs.250",
      "Rs.500",
      "Rs.350",
      "Rs.150"
    ],
    correct: 3,
    explanation: "Max Profit = (K2 - K1) - Net Premium Paid = (23,500 - 23,000) - (600 - 250) = 500 - 350 = Rs.150 per unit. This occurs when Nifty expires at or above K2 (23,500). Max Loss = Net Premium Paid = Rs.350, occurring when Nifty expires below K1 (23,000). The spread is a moderately bullish strategy with capped risk and capped reward."
  },
  {
    id: 147,
    session: 7,
    topic: "Long Straddle — Market View",
    question: "A trader buys a long straddle (buy call + buy put at the same strike). This strategy profits when:",
    options: [
      "The market stays perfectly flat near the strike price",
      "Implied volatility decreases sharply before expiry",
      "The call expires ITM but the put expires OTM",
      "The market makes a large move in either direction, exceeding the total premiums paid"
    ],
    correct: 3,
    explanation: "A long straddle profits when the underlying makes a large move in EITHER direction — beyond the breakevens (Strike ± Total Premiums). The strategy is direction-agnostic; the trader bets on high volatility. Maximum loss = total premiums paid (both call and put), occurring if the market expires exactly at the strike. Maximum profit is theoretically unlimited on the upside."
  },
  {
    id: 148,
    session: 7,
    topic: "PCR — Put-Call Ratio Interpretation",
    question: "The Put-Call Ratio (PCR) for Nifty options is 1.35. This is generally interpreted as:",
    options: [
      "Bullish — high PCR indicates put sellers showing confidence in market support",
      "Neutral — PCR near 1.0 always indicates balanced sentiment",
      "Bearish — more puts are being bought, indicating fear",
      "Invalid — PCR above 1.0 indicates a data error"
    ],
    correct: 0,
    explanation: "PCR > 1 is generally bullish because a high PCR indicates more put selling (put writing), which shows confidence that the market will stay above key put strikes. Put sellers collect premium and act as support providers. PCR < 0.7 is bearish. Extreme readings (>1.5 or <0.5) often signal potential reversals as sentiment becomes overly one-sided."
  },
  {
    id: 149,
    session: 7,
    topic: "Open Interest — Support and Resistance",
    question: "In the NSE option chain, high call OI at a particular strike acts as:",
    options: [
      "Resistance — call writers defend this level as a ceiling for the market",
      "Support — call writers defend this level from falling below it",
      "A signal that the market will expire exactly at this strike",
      "An indicator of low liquidity at this strike"
    ],
    correct: 0,
    explanation: "High call OI at a strike acts as RESISTANCE because call writers (sellers) have an interest in preventing the market from rising above that level (which would cause their calls to become ITM and generate losses). Conversely, high put OI at a strike acts as SUPPORT, since put writers want the market to stay above their put strikes. This is a key tool for sentiment analysis."
  },
  {
    id: 150,
    session: 7,
    topic: "Max Pain Theory",
    question: "The max pain strike is the price at which:",
    options: [
      "The total premium collected by all option buyers is maximized",
      "The India VIX would reach its lowest possible value",
      "The highest number of retail traders would make a profit",
      "The total value of all outstanding options (calls + puts) is minimized if the market expired there"
    ],
    correct: 3,
    explanation: "Max pain is the strike where the total payout on all outstanding options (calls + puts) is minimized. The theory suggests market makers (who are net short options) may have an incentive to push spot toward max pain near expiry. To calculate: for each strike K, sum Call_OI × max(Spot-K, 0) + Put_OI × max(K-Spot, 0) across all strikes. The strike with minimum total is max pain."
  },
  {
    id: 151,
    session: 1,
    topic: "Derivatives — Intrinsic Value Concept",
    question: "Derivatives do not have intrinsic value of their own. This means:",
    options: [
      "Derivatives are worthless and serve no economic purpose",
      "Only exchange-traded derivatives have value; OTC derivatives do not",
      "Their value is entirely derived from and dependent on the underlying asset",
      "Derivatives can only be used for speculation, not hedging"
    ],
    correct: 2,
    explanation: "Derivatives are contracts whose value is derived from the price of an underlying asset, index, rate, or event. They don't have independent or intrinsic value like a share of stock (which represents ownership in a company). A Nifty futures contract is valuable only because Nifty 50 has a value; without the underlying, the derivative contract would be meaningless."
  },
  {
    id: 152,
    session: 1,
    topic: "Exchange-Traded — Liquidity",
    question: "Exchange-traded derivatives typically have higher liquidity than OTC derivatives because:",
    options: [
      "OTC derivatives are illegal in most countries",
      "Exchange-traded contracts are standardized with visible order books, enabling price discovery and easy matching",
      "Exchanges charge lower transaction fees than OTC counterparties",
      "Exchange-traded derivatives never expire, allowing unlimited trading time"
    ],
    correct: 1,
    explanation: "Standardization (fixed lot sizes, expiry dates, tick sizes) and transparent order books on exchanges allow many participants to trade the same contract, creating high liquidity. OTC derivatives are customized to individual needs, meaning each contract is unique — reducing the pool of potential counterparties and making it harder to find a matching trade. Liquidity in OTC markets varies and is often lower."
  },
  {
    id: 153,
    session: 1,
    topic: "Multi-Regulator Structure in India",
    question: "In India, equity and commodity derivatives are regulated by SEBI, while currency derivatives are regulated by:",
    options: [
      "RBI (Reserve Bank of India)",
      "SEBI exclusively",
      "Ministry of Finance directly",
      "The respective stock exchange (NSE or BSE)"
    ],
    correct: 0,
    explanation: "India has a multi-regulator structure for derivatives. SEBI regulates equity derivatives (Nifty, stock F&O) and commodity derivatives (gold, crude oil on MCX). RBI regulates currency derivatives (USD/INR, EUR/INR). This split reflects the different underlying markets — currency markets involve monetary policy implications that fall under RBI's mandate."
  },
  {
    id: 154,
    session: 1,
    topic: "Initial Margin — Nifty Futures Range",
    question: "For Nifty futures, the total initial margin (SPAN + Exposure) is approximately:",
    options: [
      "3-5% of contract value",
      "12-15% of contract value",
      "5-8% of contract value",
      "25-30% of contract value"
    ],
    correct: 1,
    explanation: "Nifty futures total initial margin is approximately 12-15% of contract value (SPAN ~9-12% + Exposure margin 3%). For more volatile individual stocks like Tata Steel, margins can be 22-28%. The difference reflects the higher risk of single stocks versus a diversified index. Margins also change intraday as volatility shifts — what's Rs.1.5 lakh at 10 AM could become Rs.2 lakh by 2 PM."
  },
  {
    id: 155,
    session: 1,
    topic: "MTM — Cash Settlement Timing",
    question: "Mark-to-Market profits and losses on futures positions are settled:",
    options: [
      "Weekly, every Friday after market close",
      "Daily, in cash, every evening based on the day's closing settlement price",
      "Only at contract expiry",
      "Monthly, aligned with the futures contract's expiry cycle"
    ],
    correct: 1,
    explanation: "MTM is settled daily in cash. Every evening, the exchange debits or credits your margin account based on the difference between today's Daily Settlement Price (DSP) and the previous day's DSP (or your entry price on day 1). This daily cash settlement is a fundamental difference between futures and forwards, and it creates intermediate cash flow requirements that can trigger margin calls."
  },
  {
    id: 156,
    session: 1,
    topic: "Leverage — Adverse Scenario",
    question: "A trader buys 2 lots of Nifty futures at 23,200 with Rs.4,52,400 initial margin. After 5 days, Nifty has fallen to 22,400 (a 3.4% decline). The cumulative loss as a percentage of initial margin is approximately:",
    options: [
      "23%",
      "10%",
      "3.4%",
      "50%"
    ],
    correct: 0,
    explanation: "Cumulative loss = (23,200 - 22,400) × 65 × 2 = 800 × 130 = Rs.1,04,000. As percentage of initial margin: 1,04,000 / 4,52,400 = 23.0%. A 3.4% decline in Nifty produced a 23% loss on margin capital due to 6.67x leverage. This demonstrates why the textbook warns: 'Never trade with more leverage than you can absorb in a worst-case scenario.'"
  },
  {
    id: 157,
    session: 2,
    topic: "Contango — Cost Implication for Long Holder",
    question: "A trader who buys Nifty futures in contango (futures above spot) and holds to expiry faces:",
    options: [
      "A loss equal to the contango amount (basis) as futures converge down to spot at expiry, if spot doesn't change",
      "A guaranteed gain equal to the dividend yield",
      "No impact from contango — only spot price movement matters",
      "An automatic profit because futures always converge upward to spot"
    ],
    correct: 0,
    explanation: "If spot remains unchanged, a long futures position purchased in contango loses the basis amount as the futures price converges down to spot at expiry. For example, buying futures at 23,214 when spot is 23,151 means a 63-point loss if spot stays at 23,151. This is the 'cost of carry' borne by the long futures holder — equivalent to the net interest cost minus dividends."
  },
  {
    id: 158,
    session: 2,
    topic: "Hedge Notional Value",
    question: "25 contracts of Nifty futures at 23,214 (lot size 65) represent a hedge notional value of:",
    options: [
      "Rs.1,50,89,100",
      "Rs.3,77,22,750",
      "Rs.5,80,350",
      "Rs.15,08,910"
    ],
    correct: 1,
    explanation: "Hedge notional = Number of contracts × Futures Price × Lot Size = 25 × 23,214 × 65 = Rs.3,77,22,750. This notional represents the total market exposure created by the hedge. Compare this with the portfolio value of Rs.3,25,00,000 — the hedge is deliberately oversized (by the beta factor of 1.15) to match the portfolio's higher-than-index sensitivity."
  },
  {
    id: 159,
    session: 2,
    topic: "Metallgesellschaft — Position Size Risk",
    question: "MGRM's position equivalent to 160 million barrels represented approximately what percentage of total NYMEX crude oil futures open interest?",
    options: [
      "17%",
      "10%",
      "5%",
      "35%"
    ],
    correct: 0,
    explanation: "MGRM's 160 million barrel position was approximately 17% of total NYMEX oil futures open interest, creating severe position size risk. A position this large cannot be unwound without significantly moving the market against the holder. When new management liquidated all positions at once, it crystallized losses of $1.3-1.8 billion, demonstrating the danger of oversized concentrated positions."
  },
  {
    id: 160,
    session: 2,
    topic: "Metallgesellschaft — Accounting Mismatch",
    question: "A critical factor in MGRM's collapse was that German accounting rules required:",
    options: [
      "All derivatives positions to be disclosed in annual reports",
      "Hedging positions to be approved by the supervisory board",
      "Immediate recognition of futures losses without booking unrealized gains on offsetting forward contracts",
      "All commodity positions to be marked to a government-set reference price"
    ],
    correct: 2,
    explanation: "While MGRM's long-term forward contracts with customers would eventually generate offsetting gains as oil was delivered, German accounting rules required immediate recognition of futures mark-to-market losses in the income statement. The unrealized gains on 5-10 year forward commitments could not be booked. This accounting mismatch made the strategy appear disastrous on paper even if economically sound."
  },
  {
    id: 161,
    session: 3,
    topic: "IRS — Net Payment Calculation",
    question: "In an IRS with notional Rs.10 crore, fixed rate 7.50%, floating = MIBOR + 0.50%, and MIBOR at 6.50% for Period 1 (180 days, Actual/365), the net payment is approximately Rs.2,46,575 paid by:",
    options: [
      "The floating-rate payer (B) to the fixed-rate payer (A)",
      "The fixed-rate payer (A) to the floating-rate payer (B), since fixed (7.50%) exceeds floating (7.00%)",
      "Both parties to the swap dealer equally",
      "Neither — the payment is deferred to maturity"
    ],
    correct: 1,
    explanation: "Fixed payment = Rs.36,98,630 (at 7.50%). Floating payment = Rs.34,52,055 (at 6.50% + 0.50% = 7.00%). Since fixed > floating, the fixed-rate payer (A) pays the net difference of Rs.36,98,630 - Rs.34,52,055 = Rs.2,46,575 to B. In Period 2, when MIBOR rises to 8.00% (floating = 8.50% > 7.50%), the direction reverses and B pays A."
  },
  {
    id: 162,
    session: 3,
    topic: "Swap Valuation — Direction of MTM",
    question: "If market swap rates have fallen from 7.50% to 6.00% since inception, the swap's MTM value for the fixed-rate payer is:",
    options: [
      "Positive — they benefit from paying below-market rates",
      "Zero — rates affect both sides equally",
      "Negative — they are paying above-market fixed rates and receiving lower floating",
      "Unchanged — swap values only change at reset dates"
    ],
    correct: 2,
    explanation: "When market rates fall, the fixed-rate payer suffers because they are locked into paying 7.50% while the new market rate is only 6.00%. The fixed-rate bond (their liability) rises above par (discounted at the lower rate), while the floating bond (their asset) is near par. Swap Value = Floating - Fixed becomes negative. The opposite scenario (rates rising) produces a positive MTM for the fixed-rate payer."
  },
  {
    id: 163,
    session: 3,
    topic: "ALM — Asset-Liability Mismatch",
    question: "A bank has floating-rate assets (loans at MIBOR + spread) and fixed-rate liabilities (term deposits at 7%). To manage this mismatch using an IRS, the bank should:",
    options: [
      "Pay floating and receive fixed — locking in a fixed income margin",
      "Pay fixed and receive floating — converting fixed liabilities to floating",
      "Enter a currency swap to convert INR liabilities to USD",
      "Buy interest rate futures on the exchange"
    ],
    correct: 1,
    explanation: "With floating-rate assets and fixed-rate liabilities, the bank's net interest margin shrinks if floating rates fall (assets yield less while deposit costs stay fixed). By paying floating and receiving fixed in an IRS, the bank converts its floating asset income into fixed income, matching its fixed liabilities. This immunizes the net interest margin against rate declines."
  },
  {
    id: 164,
    session: 4,
    topic: "European vs. American Options — India",
    question: "All Nifty and individual stock options on NSE are European-style. This means:",
    options: [
      "They can only be exercised at expiry, not before",
      "They can be exercised at any time before expiry",
      "They can be traded only by European investors",
      "They are denominated in euros and converted to INR at settlement"
    ],
    correct: 0,
    explanation: "European-style options can only be exercised at expiry, not before. This is important for pricing — it means put-call parity holds exactly (no early exercise premium), and BSM (which prices European options) is directly applicable. American options, which can be exercised at any time, require models that account for early exercise (like binomial trees with American exercise checks)."
  },
  {
    id: 165,
    session: 4,
    topic: "Payoff Diagram — Long Call Shape",
    question: "The payoff diagram of a long call option at expiry has the shape of:",
    options: [
      "A straight line sloping downward from left to right",
      "A flat line at (-Premium) below the strike, then an upward-sloping line above the strike",
      "A horizontal line at zero profit for all spot prices",
      "A V-shape centered at the strike price"
    ],
    correct: 1,
    explanation: "Below the strike price, the call expires worthless and the payoff is a flat line at (-Premium) — the maximum loss. At the strike, the payoff begins rising at 45 degrees. The breakeven is at (Strike + Premium). Above breakeven, the payoff increases linearly with no upper bound. This hockey-stick shape is the most fundamental visual in options analysis."
  },
  {
    id: 166,
    session: 4,
    topic: "Long Put Breakeven",
    question: "A Nifty 23,200 Put purchased at Rs.380 has a breakeven at expiry of:",
    options: [
      "22,500",
      "23,200",
      "23,580",
      "22,820"
    ],
    correct: 3,
    explanation: "Long Put Breakeven = Strike - Premium = 23,200 - 380 = 22,820. Below 22,820, the put generates a profit. At 22,820, the intrinsic value (23,200 - 22,820 = 380) exactly equals the premium paid, producing zero P&L. Above 23,200, the put expires worthless and the full premium of Rs.380 is lost. The breakeven calculation is essential for evaluating whether a put trade offers a favorable risk-reward."
  },
  {
    id: 167,
    session: 4,
    topic: "Short Straddle — Maximum Profit",
    question: "A short straddle at strike 23,200 with call premium Rs.450 and put premium Rs.380 achieves maximum profit when Nifty expires at exactly:",
    options: [
      "22,370 (lower breakeven)",
      "23,650 (midpoint of breakevens)",
      "24,030 (upper breakeven)",
      "23,200 (the strike price)"
    ],
    correct: 3,
    explanation: "Maximum profit for a short straddle occurs when the underlying expires exactly at the strike (23,200). At this level, both the call and put expire worthless, and the writer keeps the full combined premium of Rs.450 + Rs.380 = Rs.830 per unit. Any move away from the strike reduces profit, and beyond the breakevens (22,370 and 24,030) the position incurs losses."
  },
  {
    id: 168,
    session: 4,
    topic: "STT Exercise vs. Regular Sale",
    question: "The STT rate on options exercise (0.125%) is how many times higher than the STT on a regular sell transaction (0.05%, from April 2026)?",
    options: [
      "2.5x",
      "5x",
      "10x",
      "25x"
    ],
    correct: 0,
    explanation: "0.125% / 0.05% = 2.5x. The textbook actually compares the exercise STT (0.125%) to the pre-April 2026 sell-side STT. From April 2026, the options sell-side STT is 0.15%, making the exercise STT (0.125%) actually slightly lower than the regular sell STT. The key practical advice remains: square off slightly ITM options before 3:00 PM on expiry day to avoid unexpected settlement costs."
  },
  {
    id: 169,
    session: 5,
    topic: "Put-Call Parity — Arbitrage Direction",
    question: "If the RHS (P + S×e^(-qT)) of put-call parity exceeds the LHS (C + K×e^(-rT)) by more than transaction costs, the correct arbitrage is to:",
    options: [
      "Sell the call, buy the put, buy the underlying",
      "Sell both the call and put, buy two lots of the underlying",
      "Buy both the call and put, sell the underlying",
      "Buy the call, sell the put, sell the underlying"
    ],
    correct: 3,
    explanation: "When RHS > LHS, the put-stock side is overpriced. The arbitrage is: buy the cheap side (call + lending at risk-free rate) and sell the expensive side (put + underlying). Specifically: buy the call, sell the put, sell (short) the underlying. This locks in a risk-free profit equal to (RHS - LHS) minus transaction costs. The direction reverses when LHS > RHS."
  },
  {
    id: 170,
    session: 5,
    topic: "Binomial — Option Value Formula",
    question: "The one-step binomial option value formula V = e^(-r×dt) × [p×V_u + (1-p)×V_d] says that the option value today equals:",
    options: [
      "The simple average of the up and down payoffs",
      "The probability-weighted average of future payoffs, discounted at the underlying's expected return",
      "The risk-neutral expected payoff, discounted at the risk-free rate",
      "The intrinsic value plus a time premium adjustment"
    ],
    correct: 2,
    explanation: "The formula computes the risk-neutral expected payoff (using probability p for up and (1-p) for down) and then discounts this expected value at the risk-free rate. The discount factor e^(-r×dt) brings the future expected payoff back to present value. This is the core of risk-neutral pricing: use constructed probabilities, discount at the risk-free rate, and get the correct market price."
  },
  {
    id: 171,
    session: 5,
    topic: "Binomial — Final Price with Changed Inputs",
    question: "A 2-step binomial tree for a European put with S=23,151, K=23,200, produces terminal nodes: Suu=24,807, Sud=23,151, Sdd=21,605. The put payoff at each terminal node is:",
    options: [
      "Suu: Rs.0, Sud: Rs.49, Sdd: Rs.1,595",
      "Suu: Rs.0, Sud: Rs.49, Sdd: Rs.0",
      "Suu: Rs.1,607, Sud: Rs.0, Sdd: Rs.0",
      "Suu: Rs.0, Sud: Rs.0, Sdd: Rs.1,595"
    ],
    correct: 0,
    explanation: "Put payoff = max(K - S, 0). At Suu=24,807: max(23,200 - 24,807, 0) = 0. At Sud=23,151: max(23,200 - 23,151, 0) = Rs.49. At Sdd=21,605: max(23,200 - 21,605, 0) = Rs.1,595. Unlike the call (which has a non-zero payoff only at Suu), the put has positive payoffs at both Sud and Sdd nodes, reflecting its downside protection nature."
  },
  {
    id: 172,
    session: 6,
    topic: "BSM — d1 Components",
    question: "In the d1 formula: d1 = [ln(S/K) + (r + σ²/2) × T] / (σ × √T), the term ln(S/K) represents:",
    options: [
      "The option's intrinsic value expressed as a percentage",
      "The natural logarithm of the moneyness ratio — how far the option is from ATM",
      "The expected return of the underlying over the option's life",
      "The risk-free rate adjusted for dividend yield"
    ],
    correct: 1,
    explanation: "ln(S/K) measures the natural log of the moneyness ratio. When S = K (ATM), ln(S/K) = 0. When S > K (ITM call), ln(S/K) > 0. When S < K (OTM call), ln(S/K) < 0. This term anchors d1 by establishing how deep in or out of the money the option currently sits. The remaining terms adjust for drift (r + σ²/2) and normalize by volatility over the time horizon."
  },
  {
    id: 173,
    session: 6,
    topic: "BSM — N(x) Key Values",
    question: "For a standard normal distribution, N(0) = 0.50 and N(1.645) = 0.95. If d1 = 0.0928, then N(d1) is closest to:",
    options: [
      "0.50 (since d1 is near zero)",
      "0.84",
      "0.537",
      "0.60"
    ],
    correct: 2,
    explanation: "Since d1 = 0.0928 is slightly positive (close to zero), N(d1) is slightly above 0.50. The exact value from the textbook's solved example is N(0.0928) = 0.537. This also serves as the option's delta. Key benchmarks: N(0)=0.50, N(1)=0.8413, N(1.645)=0.95, N(2.326)=0.99. For small d1 values near zero, N(d1) ≈ 0.50 + 0.40×d1."
  },
  {
    id: 174,
    session: 6,
    topic: "BSM — No Transaction Costs Assumption",
    question: "BSM assumes no transaction costs or taxes. In reality, this assumption is violated in Indian markets because:",
    options: [
      "There are no transaction costs in Indian derivatives markets",
      "Only commodity derivatives have transaction costs; equity derivatives are cost-free",
      "STT (0.05% futures, 0.15% options), brokerage, exchange charges, and GST create significant trading costs",
      "Transaction costs exist but are refunded by SEBI at year-end"
    ],
    correct: 2,
    explanation: "Indian markets have multiple cost layers: STT (0.05% futures, 0.15% options from April 2026), brokerage, exchange charges (0.053%), GST (18% on brokerage+exchange), and SEBI turnover fee. For a 4-leg iron condor with 10 lots per leg, total costs can be Rs.2,000-3,000, consuming 40-60% of expected profits. BSM ignores all of these, overstating theoretical profitability."
  },
  {
    id: 175,
    session: 6,
    topic: "Historical Volatility — Window Effect",
    question: "Rolling 30-day and 60-day historical volatility calculations on the same Nifty data will typically show:",
    options: [
      "Identical values since they use the same data source",
      "Different values — the 30-day window responds faster to recent events, while 60-day is smoother",
      "The 60-day window always produces higher volatility than 30-day",
      "Neither is useful because volatility is constant over time"
    ],
    correct: 1,
    explanation: "A 30-day rolling window captures recent volatility clusters more quickly (e.g., a sudden spike after an event), while a 60-day window smooths out short-term fluctuations. During volatile periods, 30-day HV will spike faster and higher. During calm periods, 30-day HV will drop more quickly. The choice of window affects trading signals — option sellers may prefer the smoother 60-day measure."
  },
  {
    id: 176,
    session: 6,
    topic: "IV vs. HV — Trading Signal",
    question: "If implied volatility is significantly higher than historical volatility (IV > HV), options are considered:",
    options: [
      "Cheap — buy options because they are underpriced",
      "Expensive — the market expects higher future volatility than recent history suggests",
      "Fairly priced — IV always exceeds HV by definition",
      "Impossible — IV can never exceed HV"
    ],
    correct: 1,
    explanation: "When IV > HV, options are 'expensive' — the market is pricing in more future volatility than recent price action suggests. This could be justified (e.g., ahead of an event like elections or RBI policy) or represent an opportunity to sell overpriced options. Conversely, when HV > IV, options may be 'cheap,' representing a buying opportunity if you believe realized volatility will remain elevated."
  },
  {
    id: 177,
    session: 7,
    topic: "Delta — Put Option Value",
    question: "If a call option has delta = 0.537, the delta of a put option at the same strike and expiry is approximately:",
    options: [
      "-0.463",
      "+0.463",
      "-0.537",
      "-1.074"
    ],
    correct: 0,
    explanation: "For European options: Put Delta = Call Delta - 1 = 0.537 - 1 = -0.463. The negative sign indicates that the put gains value when the underlying falls. In Excel: Put Delta = NORMSDIST(d1) - 1. The put delta ranges from -1 (deep ITM put) to 0 (deep OTM put), while call delta ranges from 0 (deep OTM call) to +1 (deep ITM call)."
  },
  {
    id: 178,
    session: 7,
    topic: "Gamma — Highest Where",
    question: "Gamma is highest for options that are:",
    options: [
      "Deep in-the-money with long time to expiry",
      "At-the-money with very long time to expiry",
      "Deep out-of-the-money with long time to expiry",
      "At-the-money with short time to expiry (near expiry)"
    ],
    correct: 3,
    explanation: "Gamma peaks for ATM options near expiry. This is the 'gamma explosion' — ATM Nifty gamma surges from 0.000350 with 18 days to expiry to 0.002+ with 2 days left (6x higher). Near expiry, the option's fate (ITM or OTM) depends on small price movements, causing delta to swing violently. Deep ITM and OTM options have low gamma because their outcome is relatively certain."
  },
  {
    id: 179,
    session: 7,
    topic: "Collar Strategy Construction",
    question: "A collar strategy consists of:",
    options: [
      "Long stock + Long call + Short put",
      "Long stock + Long put + Short call",
      "Short stock + Long call + Long put",
      "Long stock + Short call + Short put"
    ],
    correct: 1,
    explanation: "A collar = Long stock + Long put (downside protection) + Short call (to finance the put). The market view is neutral with a defined range. Maximum profit is capped at (Call Strike - Stock Price) because the short call limits upside. Maximum loss is limited to (Stock Price - Put Strike), net of premium difference. The collar is popular among institutional investors who want low-cost downside protection."
  },
  {
    id: 180,
    session: 7,
    topic: "Iron Condor — Maximum Loss",
    question: "An iron condor has the short strangle at 23,000 Put / 23,500 Call, with long wings at 22,500 Put / 24,000 Call. The width of each spread is 500 points. If net premium received is Rs.200, the maximum loss per unit is:",
    options: [
      "Rs.300",
      "Rs.200",
      "Rs.500",
      "Rs.700"
    ],
    correct: 0,
    explanation: "Iron condor max loss = Width of spread - Net premium received = 500 - 200 = Rs.300 per unit. This occurs when Nifty moves beyond either wing strike (below 22,500 or above 24,000). The long wings cap the loss, unlike a naked short strangle which has theoretically unlimited risk. Maximum profit = net premium (Rs.200) if Nifty expires between the short strikes (23,000-23,500)."
  },
  {
    id: 181,
    session: 7,
    topic: "Transaction Costs — Multi-Leg Strategy Impact",
    question: "A 4-leg iron condor on Nifty with 10 lots per leg incurs estimated total transaction costs of approximately:",
    options: [
      "Rs.200-500",
      "Rs.800-1,200",
      "Rs.2,000-3,000",
      "Rs.10,000-15,000"
    ],
    correct: 2,
    explanation: "Total costs include brokerage (~Rs.800 for 40 legs), STT (~Rs.600-1,200), exchange charges (~Rs.400-800), and GST (~Rs.200). Total: approximately Rs.2,000-3,000. If expected profit is Rs.5,000, costs consume 40-60% of profits. This is why the textbook emphasizes: always compute net P&L after ALL costs before entering multi-leg strategies."
  },
  {
    id: 182,
    session: 7,
    topic: "P&L Decomposition Formula",
    question: "The Greeks-based P&L decomposition for an option position breaks total P&L into:",
    options: [
      "Delta P&L + Gamma P&L + Theta P&L + Vega P&L",
      "Delta P&L + Theta P&L only",
      "Intrinsic Value change + Time Value change only",
      "SPAN margin change + Exposure margin change"
    ],
    correct: 0,
    explanation: "P&L = ΔPnL + ΓPnL + ΘPnL + VegaPnL, where: ΔPnL = Portfolio Delta × ΔS (linear price exposure), ΓPnL = 0.5 × Portfolio Gamma × (ΔS)² (convexity adjustment), ΘPnL = Portfolio Theta × Days (time decay), VegaPnL = Portfolio Vega × ΔIV (volatility change). This decomposition explains exactly how much of the P&L came from each risk factor."
  },
  {
    id: 183,
    session: 7,
    topic: "OI Change — Bearish Signal",
    question: "Call OI is increasing while Nifty price is falling. This combination indicates:",
    options: [
      "Long buildup — bullish new longs being created",
      "Short buildup — bearish, but this applies to futures, not options",
      "No meaningful interpretation for option chain OI",
      "Bearish — call writers (sellers) are adding new short call positions, expecting the market to stay below the strike"
    ],
    correct: 3,
    explanation: "Increasing call OI with falling prices signals that new call writing is occurring — traders are selling calls expecting the market to remain below those strikes. This is a bearish signal. Conversely, increasing put OI with rising prices is bullish (put writers showing confidence). OI change in the option chain reveals where money is being deployed and institutional positioning."
  },
  {
    id: 184,
    session: 7,
    topic: "Illiquidity Risk — Far OTM Strikes",
    question: "For Nifty options, the textbook recommends trading strikes within what range of the current spot price?",
    options: [
      "±100 points of spot",
      "±500 points of spot",
      "±300 points of spot",
      "±1,500 points of spot"
    ],
    correct: 1,
    explanation: "The textbook recommends trading Nifty strikes within ±500 points of spot. Options more than 500 points OTM often have zero or negligible volume, with bid-ask spreads of Rs.10-30 (vs. Rs.1-5 for ATM). For Bank Nifty, the range is ±1,500 points, and for stock options, stick to 3 strikes around ATM. Always check volume AND bid-ask spread before entering any position."
  },
  {
    id: 185,
    session: 1,
    topic: "Derivatives — Underlying Types",
    question: "Which of the following can serve as the underlying for a financial derivative in India?",
    options: [
      "Only equities and equity indices (Nifty, Bank Nifty)",
      "Only instruments approved by SEBI on a case-by-case basis",
      "Only commodities and currency pairs",
      "Equities, indices, commodities, currency pairs, interest rates, and volatility indices"
    ],
    correct: 3,
    explanation: "Derivatives can be based on a wide range of underlyings: stocks (Reliance), indices (Nifty 50), commodities (gold on MCX, crude oil), currency pairs (USD/INR), interest rates (MIBOR), and even volatility indices (India VIX). This versatility makes derivatives applicable across virtually all financial markets, each serving different hedging and speculation needs."
  },
  {
    id: 186,
    session: 1,
    topic: "Gold Futures — MCX Specifications",
    question: "Gold futures on MCX have a lot size of 1 kg and a tick size of:",
    options: [
      "Rs.0.05 per gram",
      "Rs.10 per gram",
      "Rs.100 per kg",
      "Rs.1 per 10 grams"
    ],
    correct: 3,
    explanation: "Gold futures on MCX have a lot size of 1 kg with a tick size of Rs.1 per 10 grams. Settlement can be physical or cash, and contracts expire on the 5th of the contract month. MCX gold futures are among the most traded commodity derivatives in India, used by jewellers, banks, and traders for hedging and price discovery."
  },
  {
    id: 187,
    session: 2,
    topic: "Simple vs. Continuous — When Both Work",
    question: "For an 18-day Nifty futures contract, the error between the simple interest approximation and the exact continuous compounding formula is approximately:",
    options: [
      "Approximately 1-2% — significant enough to require correction",
      "Less than 0.05% — nearly identical for short-dated contracts",
      "More than 5% — always use continuous compounding",
      "The two formulas cannot be compared"
    ],
    correct: 1,
    explanation: "For contracts under 90 days, the simple interest approximation F = S × [1 + (r-q) × T/365] gives nearly identical results to the continuous formula F = S × e^((r-q)×T), with error less than 0.05%. The difference between the two is negligible for short-dated Nifty options and futures. For longer-dated contracts or exam precision, the continuous formula should be used."
  },
  {
    id: 188,
    session: 3,
    topic: "IRS — Floating Payer Benefits When",
    question: "In a plain-vanilla IRS, the floating-rate payer benefits when:",
    options: [
      "Market interest rates fall below the fixed rate, reducing floating payments",
      "Market interest rates rise significantly above the fixed rate",
      "The notional principal is increased by mutual agreement",
      "The swap dealer reduces the bid-ask spread"
    ],
    correct: 0,
    explanation: "The floating-rate payer benefits when rates fall because their floating payments decrease while they continue receiving the higher fixed rate. Their swap MTM becomes positive as the fixed-rate bond (their asset, since they receive fixed) rises above par when rates decline. This is the mirror image of the fixed-rate payer who benefits when rates rise."
  },
  {
    id: 189,
    session: 4,
    topic: "Payoff Diagram — Short Put Shape",
    question: "The payoff diagram of a short put at expiry shows:",
    options: [
      "A V-shape with maximum profit at the strike",
      "An upward-sloping line from left to right across all prices",
      "A flat line at (-Premium) below the strike, then an upward-sloping line above",
      "A flat line at (+Premium) above the strike, then a downward-sloping line below the strike"
    ],
    correct: 3,
    explanation: "Above the strike, the short put expires worthless and the writer keeps the full premium (flat line at +Premium). Below the strike, the put is exercised against the writer and losses mount linearly as the underlying falls. At (Strike - Premium), the position breaks even. Below that, losses increase point-for-point. The maximum loss is (K - Premium) per unit if the underlying falls to zero."
  },
  {
    id: 190,
    session: 5,
    topic: "Binomial — Two Terminal Nodes at Zero",
    question: "In the textbook's 2-step call pricing tree (K=23,200), two out of three terminal nodes have zero payoff (Sud=23,151 and Sdd=21,605). This means the call's value is driven entirely by:",
    options: [
      "The average of all three terminal payoffs",
      "The mid-node Sud, which equals the original spot price",
      "The implied volatility embedded in the tree parameters",
      "The single Suu node (24,807.06) where the call expires in-the-money"
    ],
    correct: 3,
    explanation: "Since two out of three terminal nodes produce zero call payoff, the entire option value derives from the single Suu node where Nifty reaches 24,807.06 (payoff = Rs.1,607.06). This concentration of value in one tail illustrates why options are sometimes called 'lottery tickets' — for OTM or near-ATM options, a large portion of value comes from relatively unlikely but high-payoff scenarios."
  },
  {
    id: 191,
    session: 6,
    topic: "BSM Inputs — Textbook Canonical Values",
    question: "The canonical BSM inputs used throughout the textbook for Nifty option pricing are: S=23,151, K=23,200, r=6.68%, σ=22%, T=18/365. Given these inputs, d1 and d2 are approximately:",
    options: [
      "d1 = 0.50, d2 = 0.45",
      "d1 = 0.0928, d2 = 0.0440",
      "d1 = 1.645, d2 = 1.596",
      "d1 = -0.0928, d2 = -0.1416"
    ],
    correct: 1,
    explanation: "Using the BSM formula: d1 = [ln(23,151/23,200) + (0.0668 + 0.22²/2) × 0.0493] / (0.22 × √0.0493) = 0.0928. d2 = d1 - σ√T = 0.0928 - 0.22 × 0.2221 = 0.0928 - 0.0488 = 0.0440. These small positive values (near zero) confirm the option is near ATM, producing delta ≈ 0.537 and an approximately 50% chance of expiring ITM."
  },
  {
    id: 192,
    session: 7,
    topic: "Gamma Formula — PDF Not CDF",
    question: "Gamma = N'(d1) / (S × σ × √T). The N'(d1) term uses the PDF (probability density function) because:",
    options: [
      "The CDF measures cumulative probability and is used only for Delta",
      "The PDF measures the rate of change of the CDF, which is what Gamma needs — the rate of change of Delta",
      "The PDF is always larger than the CDF, producing larger Gamma values",
      "The PDF is easier to compute in Excel than the CDF"
    ],
    correct: 1,
    explanation: "Gamma measures how fast Delta changes. Since Delta = N(d1) (the CDF), Gamma is essentially the derivative of N(d1) with respect to S, which involves N'(d1) — the PDF (height of the normal curve at d1). The PDF gives the density (rate of change) at a specific point, which is exactly what's needed to quantify how Delta accelerates as the underlying moves."
  },
  {
    id: 193,
    session: 7,
    topic: "Portfolio Greeks — Aggregation",
    question: "Portfolio Delta for a multi-option position is calculated as:",
    options: [
      "The average of all individual option deltas",
      "The sum of (each position's delta × lots × lot size), accounting for long/short direction",
      "The delta of the ATM option multiplied by the total number of lots",
      "The maximum delta among all positions in the portfolio"
    ],
    correct: 1,
    explanation: "Portfolio Delta = Σ(Position Delta_i × Lots_i × Lot Size × Direction_i), where direction is +1 for long and -1 for short. For example: Long 5 lots 23,200 Call (delta 0.537) + Short 3 lots 23,500 Call (delta 0.35) + Long 4 lots 23,000 Put (delta -0.40) gives a net portfolio delta that determines how many futures lots are needed for delta-neutral hedging."
  },
  {
    id: 194,
    session: 1,
    topic: "Sensex Weekly Options — BSE",
    question: "After SEBI's November 2024 reforms, BSE retained weekly options for which benchmark index?",
    options: [
      "Bank Nifty",
      "FinNifty",
      "Nifty 50",
      "Sensex (expiring on Thursdays)"
    ],
    correct: 3,
    explanation: "SEBI's reforms limited weekly expiries to one benchmark index per exchange. NSE retained Nifty 50 weekly options (Tuesday expiry), while BSE retained Sensex weekly options (Thursday expiry). Bank Nifty, FinNifty, and Midcap Select moved to monthly-only expiry. This reform concentrated liquidity and reduced the speculative frenzy around multiple weekly expiry events."
  },
  {
    id: 195,
    session: 2,
    topic: "Nifty Contango — Typical Range",
    question: "In Indian equity markets, Nifty near-month futures typically trade in mild contango of approximately:",
    options: [
      "0-5 points above spot",
      "1,000+ points above spot",
      "200-500 points above spot",
      "15-80 points above spot"
    ],
    correct: 3,
    explanation: "Nifty futures typically trade in mild contango of 15-80 points above spot for near-month contracts. This range reflects the net carry cost of approximately 5.48% p.a. (r - q = 6.68% - 1.20%) applied over the remaining days to expiry. The contango narrows as expiry approaches due to basis convergence, eventually reaching zero at the settlement date."
  },
  {
    id: 196,
    session: 3,
    topic: "Swap Valuation — Fixed Bond PV",
    question: "In the textbook's swap valuation, the PV of the fixed-rate bond is Rs.9,87,67,111 against par of Rs.10 crore. This bond is trading below par because:",
    options: [
      "The bond's credit rating has deteriorated",
      "Inflation has eroded the bond's real value",
      "The floating payments have reduced the bond's principal",
      "The fixed coupon (7.50%) is now below the current market swap rate (8.50%), so the bond is discounted at a higher rate"
    ],
    correct: 3,
    explanation: "The fixed-rate bond pays a coupon of 7.50% p.a., but the current market rate is 8.50%. Since future cash flows are discounted at the higher 8.50% rate, the present value falls below par (Rs.9,87,67,111 < Rs.10,00,00,000). This is the basic bond price-yield relationship: when yields rise, bond prices fall. The swap's positive MTM for the fixed payer arises from this below-par valuation of their liability."
  },
  {
    id: 197,
    session: 4,
    topic: "Long Straddle — Breakeven Points",
    question: "A long straddle at strike 23,200 with call premium Rs.450 and put premium Rs.380 breaks even at expiry when Nifty is at:",
    options: [
      "22,370 or 24,030",
      "22,820 or 23,650",
      "22,750 or 23,650",
      "23,200 only"
    ],
    correct: 0,
    explanation: "Long straddle breakevens = Strike ± Total Premiums. Total premium = 450 + 380 = Rs.830. Lower breakeven = 23,200 - 830 = 22,370. Upper breakeven = 23,200 + 830 = 24,030. The straddle is profitable only when Nifty moves beyond either breakeven. Note these are the same breakevens as the short straddle — but the profit/loss zones are inverted (straddle buyer profits outside; writer profits inside)."
  },
  {
    id: 198,
    session: 5,
    topic: "Put-Call Parity — Nifty is European",
    question: "Put-call parity is directly applicable to Nifty options because:",
    options: [
      "NSE enforces put-call parity through its matching engine",
      "Nifty is the most liquid index in India",
      "Nifty has a large number of constituent stocks",
      "Nifty options are European-style (exercisable only at expiry), which is required for put-call parity to hold exactly"
    ],
    correct: 3,
    explanation: "Put-call parity holds exactly only for European options, which cannot be exercised early. Since all Nifty options on NSE are European-style, the parity relationship C + Ke^(-rT) = P + Se^(-qT) applies directly. For American options, early exercise introduces additional value for puts (and sometimes calls on dividend-paying stocks), causing put-call parity to become an inequality rather than an equality."
  },
  {
    id: 199,
    session: 6,
    topic: "Volatility Skew — Fat Left Tails",
    question: "One reason for the Nifty volatility skew (OTM puts having higher IV) is that return distributions exhibit:",
    options: [
      "Negative skewness and excess kurtosis — large drops are more common than BSM predicts",
      "Positive skewness and thin tails — large gains are more common than BSM predicts",
      "Perfect symmetry — BSM accurately captures the return distribution",
      "Zero kurtosis — returns follow a perfect normal distribution"
    ],
    correct: 0,
    explanation: "Empirical return distributions show negative skewness (more extreme left-tail events than right) and excess kurtosis (fatter tails overall than the normal distribution). This means large drops are more frequent and severe than BSM's log-normal assumption predicts. The market compensates for this by pricing OTM puts at higher IV — embedding a 'crash premium' that BSM's constant-volatility framework cannot capture."
  },
  {
    id: 200,
    session: 7,
    topic: "Long Unwinding — OI Pattern",
    question: "A trader observes Nifty futures price falling while open interest is also decreasing. This pattern is called:",
    options: [
      "Long unwinding — existing long positions are being closed",
      "Fresh selling with new short positions",
      "Short buildup",
      "Short covering"
    ],
    correct: 0,
    explanation: "Falling price + decreasing OI = Long Unwinding. Existing long position holders are selling (closing their longs), which pushes prices down while reducing total outstanding contracts. This is considered mildly bearish but lacks the conviction of a short buildup (falling price + increasing OI), which would indicate fresh directional selling and stronger bearish sentiment."
  },
  {
    id: 201,
    session: 1,
    topic: "Derivatives — Purpose of Hedging",
    question: "The primary economic purpose of derivatives markets is to:",
    options: [
      "Generate profits exclusively for exchange operators",
      "Guarantee profits for all market participants",
      "Replace the underlying cash market entirely",
      "Enable risk transfer from those who want to reduce risk (hedgers) to those willing to accept it (speculators)"
    ],
    correct: 3,
    explanation: "Derivatives serve as risk transfer instruments. Hedgers (like an FII protecting a portfolio, or IOCL locking in oil prices) use derivatives to reduce their exposure to price risk. Speculators take the other side, accepting risk in exchange for potential profit. This risk transfer function improves overall market efficiency and allows businesses to plan with greater certainty."
  },
  {
    id: 202,
    session: 1,
    topic: "CCP — Buyer to Every Seller",
    question: "The CCP becomes 'the buyer to every seller and the seller to every buyer.' This arrangement benefits market participants by:",
    options: [
      "Reducing transaction taxes on all derivative trades",
      "Eliminating the need to assess the creditworthiness of individual counterparties",
      "Guaranteeing that all trades will be profitable",
      "Allowing unlimited leverage without any margin requirements"
    ],
    correct: 1,
    explanation: "With the CCP as the counterparty to both sides, no trader needs to worry about whether the person on the other side of their trade can pay. This eliminates bilateral counterparty credit risk assessment. Instead, the CCP manages risk through standardized margining, position limits, and the Settlement Guarantee Fund. This is why exchange-traded derivatives are considered virtually free of counterparty risk."
  },
  {
    id: 203,
    session: 1,
    topic: "Clearing Member — Net Worth Requirement",
    question: "Professional Clearing Members (PCMs) on NSE must maintain a minimum net worth of:",
    options: [
      "Rs.300 crore",
      "Rs.100 crore",
      "Rs.1,000 crore",
      "Rs.50 crore"
    ],
    correct: 0,
    explanation: "Professional CMs must maintain a minimum net worth of Rs.300 crore. This high threshold ensures that CMs have sufficient financial capacity to absorb client defaults without passing losses to the CCP or other market participants. The CM sits between the client and the CCP in the risk hierarchy, acting as the first line of institutional defense after client margins are exhausted."
  },
  {
    id: 204,
    session: 1,
    topic: "SPAN — 14 Core Scenarios Detail",
    question: "The 14 core SPAN scenarios are constructed from price moves of 0, ±1/3, ±2/3, and ±1 times the scan range, combined with volatility:",
    options: [
      "Remaining constant across all 14 scenarios",
      "Increasing or decreasing by one standard deviation",
      "Increasing by 50% or decreasing by 50%",
      "Moving between the 25th and 75th percentile of historical volatility"
    ],
    correct: 1,
    explanation: "Each of the 7 price move levels (0, ±1/3, ±2/3, ±full scan range) is paired with volatility either increasing or decreasing by one standard deviation, creating 7 × 2 = 14 scenarios. Two additional extreme scenarios test 3× the scan range at 35% weight, bringing the total to 16. SPAN takes the maximum loss across all scenarios as the initial margin requirement."
  },
  {
    id: 205,
    session: 1,
    topic: "SPAN — Extreme Scenarios Weight",
    question: "The two extreme SPAN scenarios test price moves of 3 times the scan range. These extreme scenarios are weighted at:",
    options: [
      "75% — slightly reduced",
      "35% — reduced weight reflecting lower probability",
      "50% — half weight",
      "100% — same as all other scenarios"
    ],
    correct: 1,
    explanation: "The two extreme tail scenarios (3× the price scan range) carry only 35% weight because they represent very low-probability events (well beyond 3.5 standard deviations). While the core 14 scenarios at full weight capture the 99% confidence level, these additional extreme scenarios provide a stress test against more severe market dislocations, albeit at reduced impact on the margin calculation."
  },
  {
    id: 206,
    session: 1,
    topic: "Margins — Intraday Variation",
    question: "A trader checks margin requirements for a Nifty futures position at 10 AM and sees Rs.1,50,000. By 2 PM, the requirement has changed to Rs.2,00,000. This occurs because:",
    options: [
      "The exchange increased lot sizes during the day",
      "Brokerage fees are added to the margin requirement after noon",
      "SPAN margins recalculate intraday as prices and volatility change",
      "The trader must have added more contracts during the day"
    ],
    correct: 2,
    explanation: "SPAN margins are not static — they change intraday as prices and volatility move. If volatility spikes (e.g., due to unexpected news), the SPAN scan range widens and margin requirements increase. Traders must monitor real-time margins using tools like the Zerodha margin calculator or NSE SPAN calculator. An unexpected margin increase can trigger forced liquidation if insufficient funds are available."
  },
  {
    id: 207,
    session: 1,
    topic: "MTM — Entry Price vs. Previous Close",
    question: "On Day 3 of holding a Nifty futures position (entered at 23,200, Day 2 close = 23,100, Day 3 close = 22,850), the Day 3 daily MTM P&L is calculated as:",
    options: [
      "(22,850 - 23,100) × Lot Size × Lots = loss from previous day's close",
      "(22,850 - 23,200) × Lot Size × Lots = loss from entry price",
      "(23,200 - 22,850) × Lot Size × Lots = gain from entry price",
      "(23,100 - 22,850) × Lot Size × Lots = gain from previous close"
    ],
    correct: 0,
    explanation: "Daily MTM P&L is always calculated against the PREVIOUS day's settlement price, not the original entry price. Day 3 P&L = (22,850 - 23,100) × 65 × 2 = (-250) × 130 = -Rs.32,500. The cumulative P&L from entry would be (22,850 - 23,200) × 130 = -Rs.45,500, but the daily figure uses only the day-over-day change because prior days' MTM was already settled."
  },
  {
    id: 208,
    session: 2,
    topic: "Fair Value — Impact of Higher Dividend Yield",
    question: "If Nifty's dividend yield increases from 1.2% to 2.5% while the risk-free rate stays at 6.68%, the fair futures price relative to spot will:",
    options: [
      "Decrease, because higher dividends reduce the net carry cost (r - q drops from 5.48% to 4.18%)",
      "Become negative, causing the futures to trade at zero",
      "Stay the same, because dividends do not affect futures pricing",
      "Increase, because higher dividends make futures more expensive"
    ],
    correct: 0,
    explanation: "Higher dividend yield reduces the net carry cost: (r - q) changes from (6.68% - 1.2%) = 5.48% to (6.68% - 2.5%) = 4.18%. Since F = S × e^((r-q)×T), a lower (r - q) produces a lower futures price relative to spot. The contango narrows. In extreme cases (q > r), futures can trade below spot (backwardation), common during concentrated dividend seasons."
  },
  {
    id: 209,
    session: 2,
    topic: "Hedge Ratio — Portfolio Beta = 1.0",
    question: "If a portfolio has beta = 1.0 and value of Rs.4,00,00,000, with Nifty futures at 23,200 (lot size 65), the number of hedge contracts is:",
    options: [
      "27 contracts",
      "30 contracts",
      "22 contracts",
      "35 contracts"
    ],
    correct: 0,
    explanation: "Contracts = (beta × Portfolio Value) / (Futures Price × Lot Size) = (1.0 × 4,00,00,000) / (23,200 × 65) = 4,00,00,000 / 15,08,000 = 26.53, rounded to 27 contracts. With beta = 1.0, the portfolio moves exactly in line with Nifty, so the hedge ratio is simply the notional ratio without any beta adjustment."
  },
  {
    id: 210,
    session: 2,
    topic: "Roll Cost in Contango",
    question: "In a contango market, the cost of rolling a long futures position from the near-month to the next-month contract is:",
    options: [
      "Equal to the tick size × lot size",
      "Zero — rolling is free in contango",
      "Negative — you profit from selling the more expensive near-month",
      "Positive — you sell the cheaper expiring contract and buy the more expensive far-month contract"
    ],
    correct: 3,
    explanation: "In contango, the far-month contract trades above the near-month (which is converging to spot). Rolling means selling the expiring near-month at a lower price and buying the far-month at a higher price — incurring a roll cost equal to the price difference. This was MGRM's undoing: monthly rolling in a contango market consumed $900 million in losses over 1993."
  },
  {
    id: 211,
    session: 3,
    topic: "IRS — When Net Payment is Zero",
    question: "In a plain-vanilla IRS (fixed rate 7.50%, floating = MIBOR + 0.50%), the net payment is zero when MIBOR equals:",
    options: [
      "7.00%",
      "8.00%",
      "6.50%",
      "7.50%"
    ],
    correct: 0,
    explanation: "Net payment = 0 when Fixed Payment = Floating Payment, i.e., when the fixed rate equals the total floating rate. Fixed = 7.50%. Floating = MIBOR + 0.50%. Setting 7.50% = MIBOR + 0.50% gives MIBOR = 7.00%. Above this MIBOR level, the fixed payer benefits; below it, the floating payer benefits. This equilibrium rate is the 'break-even MIBOR' for the swap."
  },
  {
    id: 212,
    session: 3,
    topic: "Currency Swap — Semi-Annual INR Payment",
    question: "An Indian company enters a USD/INR currency swap: pays fixed INR 8.50% on Rs.92.50 crore notional, semi-annually. Each semi-annual INR payment is:",
    options: [
      "Rs.0.93 crore",
      "Rs.3.93 crore (= 92.50 × 8.50% × 0.5)",
      "Rs.46.25 crore (= 92.50 × 0.5)",
      "Rs.7.86 crore (= 92.50 × 8.50%)"
    ],
    correct: 1,
    explanation: "Semi-annual INR payment = Notional × Rate × 0.5 = Rs.92.50 crore × 8.50% × 0.5 = Rs.3.93 crore. In return, the company receives $10M × 6.00% × 0.5 = $3,00,000 (USD semi-annual). Through the swap, the company has converted its USD liability into a predictable INR obligation, eliminating FX risk on both interest payments and principal."
  },
  {
    id: 213,
    session: 3,
    topic: "IRS vs. Currency Swap — Summary",
    question: "The key structural differences between an IRS and a currency swap are:",
    options: [
      "IRS involves two currencies; currency swap involves one currency",
      "IRS exchanges notional at inception; currency swap does not",
      "In IRS, notional is not exchanged and payments are in one currency; in currency swaps, notional IS exchanged and payments are in two currencies",
      "There are no meaningful structural differences — they are identical instruments"
    ],
    correct: 2,
    explanation: "In an IRS, the notional principal is never exchanged (only net interest differentials settle), and all payments are in a single currency. In a currency swap, the notional IS exchanged at inception and maturity (at the original exchange rate), and periodic interest payments are made in different currencies. This principal exchange makes currency swaps more complex and adds FX settlement risk."
  },
  {
    id: 214,
    session: 4,
    topic: "Call Option — Unlimited Profit Potential",
    question: "A long call option has theoretically unlimited profit potential because:",
    options: [
      "The underlying price can rise without limit, and the call gains value for every point above the strike",
      "Call options can be rolled forward indefinitely without expiry",
      "SEBI guarantees a minimum return on all call options",
      "The premium paid can be recovered infinitely many times"
    ],
    correct: 0,
    explanation: "A long call's payoff = max(S_T - K, 0) - Premium. Since stock prices have no theoretical upper limit, S_T can rise indefinitely, making (S_T - K) arbitrarily large. This unlimited upside, combined with limited downside (maximum loss = premium), makes long calls attractive for bullish traders. In contrast, a long put's profit is capped at (K - Premium) since prices can't fall below zero."
  },
  {
    id: 215,
    session: 4,
    topic: "Moneyness — ATM Definition",
    question: "An option is At-the-Money (ATM) when:",
    options: [
      "The spot price equals the strike price (S = K)",
      "The option premium equals the intrinsic value",
      "The option's delta equals zero",
      "The option has no time value remaining"
    ],
    correct: 0,
    explanation: "ATM is defined as S = K. At this point, intrinsic value is zero for both calls and puts, and the entire premium consists of time value. ATM options have delta ≈ 0.50 (calls) or -0.50 (puts), the highest gamma and vega, and the maximum uncertainty about whether they will expire ITM or OTM. ATM is the reference point for the volatility smile/skew."
  },
  {
    id: 216,
    session: 4,
    topic: "Option Premium — Theta Decay Acceleration",
    question: "Time value decay (theta) accelerates as expiry approaches. An option with 30 days to expiry loses time value more slowly per day than the same option with 5 days to expiry. This is because:",
    options: [
      "Exchanges reduce STT rates for options closer to expiry",
      "Theta decays proportional to the square root of remaining time — the curve steepens near expiry",
      "Implied volatility always decreases as expiry approaches",
      "Near-expiry options are always deep in-the-money"
    ],
    correct: 1,
    explanation: "Time value decays proportionally to √T, not linearly. With 30 days left, the daily theta is moderate. With 5 days left, the same absolute amount of time value must decay in far fewer days, causing acceleration. Graphically, the time decay curve looks like a hockey stick — shallow early and steep near expiry."
  },
  {
    id: 217,
    session: 4,
    topic: "Short Call — Premium as Maximum Profit",
    question: "A trader writes a Nifty 23,200 Call at Rs.450 (lot size 65). The maximum possible profit is:",
    options: [
      "Unlimited",
      "Rs.29,250 per lot (= 450 × 65)",
      "Rs.450 per unit",
      "Both B and C are correct — Rs.450 per unit or Rs.29,250 per lot"
    ],
    correct: 3,
    explanation: "Maximum profit for a short call = Premium received. Per unit: Rs.450. Per lot: 450 × 65 = Rs.29,250. This maximum is achieved when the call expires worthless (Nifty at or below 23,200). Above the strike, the writer's profit shrinks and eventually turns to loss. The breakeven is at Strike + Premium = 23,650. Beyond that, losses are theoretically unlimited."
  },
  {
    id: 218,
    session: 4,
    topic: "Barings — Operational Control Failure",
    question: "A key operational failure in the Barings Bank collapse was that Nick Leeson:",
    options: [
      "Was authorized only for low-risk index arbitrage but took massive unauthorized directional bets",
      "Used sophisticated hedging strategies that were too complex for management to understand",
      "Accurately disclosed all positions but management ignored the risks",
      "Was acting on direct orders from Barings' London headquarters"
    ],
    correct: 0,
    explanation: "Leeson was authorized only for low-risk Nikkei 225 index arbitrage between SIMEX and Osaka exchanges. Instead, he took massive directional bets — primarily selling straddles — without authorization. He concealed losses in a secret error account (88888). The operational failure was the lack of segregation between front office (trading) and back office (risk/settlement), allowing Leeson to hide his activities."
  },
  {
    id: 219,
    session: 5,
    topic: "Put-Call Parity — Deriving Put from Call",
    question: "Using put-call parity, if the BSM call price is Rs.450, S=23,151, K=23,200, r=6.68%, q=1.20%, T=0.0493, the put price can be derived as:",
    options: [
      "P = C + S - K",
      "P = C + K×e^(-rT) - S×e^(-qT)",
      "P = C - K×e^(-rT) + S×e^(-qT)",
      "P = C × (K/S)"
    ],
    correct: 1,
    explanation: "From put-call parity C + K×e^(-rT) = P + S×e^(-qT), rearranging: P = C + K×e^(-rT) - S×e^(-qT). This is useful because you can price one option from the other without running BSM separately. Given C=450: P = 450 + 23,200×e^(-0.00329) - 23,151×e^(-0.000591) ≈ 450 + 23,123.68 - 23,137.30 ≈ Rs.436.38."
  },
  {
    id: 220,
    session: 5,
    topic: "Binomial — Pricing a European Put",
    question: "In a 2-step binomial tree, the European put value at node (1,1) — the down node at step 1 — is computed using payoffs V(2,1) = Rs.49 and V(2,2) = Rs.1,595 with p = 0.5151. The value V(1,1) is approximately:",
    options: [
      "Rs.0",
      "Rs.49",
      "Rs.1,595",
      "Rs.798"
    ],
    correct: 3,
    explanation: "V(1,1) = e^(-r×dt) × [p × V(2,1) + (1-p) × V(2,2)] = 0.998354 × [0.5151 × 49 + 0.4849 × 1,595] = 0.998354 × [25.24 + 773.42] = 0.998354 × 798.66 ≈ Rs.797.34 ≈ Rs.798. Both terminal payoffs are positive for the put (unlike the call where only Suu produced a payoff), giving the put a substantial value at this down node."
  },
  {
    id: 221,
    session: 6,
    topic: "BSM — European Options Only",
    question: "The BSM formula prices European options only (not American) because:",
    options: [
      "American options are not traded on any exchange",
      "European options have higher premiums than American options",
      "BSM was developed in Europe and therefore only applies to European markets",
      "BSM does not account for the possibility of early exercise, which gives American options additional value"
    ],
    correct: 3,
    explanation: "BSM assumes the option can only be exercised at expiry. American options can be exercised at any time before expiry, creating additional value (the early exercise premium) that BSM cannot capture. For American puts on dividend-paying stocks, early exercise may be optimal. Since all Indian exchange-traded options are European-style, BSM is directly applicable to Nifty and stock options on NSE."
  },
  {
    id: 222,
    session: 6,
    topic: "BSM — Continuous Trading Assumption",
    question: "BSM assumes continuous trading is possible. In practice, this assumption is violated in India because:",
    options: [
      "Indian markets trade continuously from 9:15 AM to 3:30 PM without any breaks",
      "NSE uses a discrete auction mechanism, not continuous matching",
      "Only institutional traders have access to continuous trading",
      "Trading hours are limited (9:15 AM - 3:30 PM IST) with no after-hours derivatives trading, and markets close on weekends and holidays"
    ],
    correct: 3,
    explanation: "Indian equity derivatives trade from 9:15 AM to 3:30 PM IST with no extended-hours sessions. Markets are closed on weekends and holidays. This creates overnight and weekend gaps where prices can jump significantly without the ability to hedge. BSM's continuous trading assumption means it doesn't account for gap risk — particularly relevant for short option positions near expiry."
  },
  {
    id: 223,
    session: 6,
    topic: "Volatility Skew — Deep OTM Call IV",
    question: "In the typical Nifty volatility skew, deep OTM calls (e.g., strike 24,500 when spot is 23,200) have the lowest IV (17-19%). This is primarily because:",
    options: [
      "Deep OTM calls are the most popular options, keeping premiums low",
      "BSM systematically underprices deep OTM calls",
      "SEBI caps the premium on deep OTM call options",
      "There is minimal demand for upside protection, and income strategies (covered calls) add supply, pushing call IV down"
    ],
    correct: 3,
    explanation: "Deep OTM calls have the lowest IV because demand for upside protection is minimal (market rallies are typically gradual, not sudden). Meanwhile, institutional strategies like covered calls add supply by selling calls against stock holdings. The combination of low demand and systematic supply depresses OTM call IV. This is the opposite of OTM puts, where crash fear creates strong demand."
  },
  {
    id: 224,
    session: 6,
    topic: "BSM Inputs — Sigma as Annualized Volatility",
    question: "In the BSM formula, the volatility parameter sigma (σ) must be entered as:",
    options: [
      "Monthly volatility in decimal form",
      "Annualized volatility in decimal form (e.g., 0.22 for 22%)",
      "Daily volatility in percentage terms",
      "The VIX index value divided by 100"
    ],
    correct: 1,
    explanation: "BSM requires annualized volatility in decimal form. For 22% volatility: σ = 0.22. The formula d1 = [ln(S/K) + (r + σ²/2)×T] / (σ×√T) uses σ in this form. If you input daily volatility instead of annualized, or use percentage (22) instead of decimal (0.22), the option price will be dramatically wrong. All other BSM parameters (r, T) must also be in consistent annualized form."
  },
  {
    id: 225,
    session: 7,
    topic: "Vega — Highest for Which Options",
    question: "Vega is highest for options that are:",
    options: [
      "Deep ITM with short time to expiry",
      "Deep OTM with short time to expiry",
      "ATM with short time to expiry (near expiry)",
      "ATM with long time to expiry"
    ],
    correct: 3,
    explanation: "Vega = S × √T × N'(d1). The √T factor means longer-dated options have higher vega (more time for volatility to impact the price). N'(d1) peaks at ATM, so ATM long-dated options have the maximum vega. Near expiry, vega collapses because there isn't enough time for volatility changes to affect the option's value. This contrasts with gamma, which peaks near expiry for ATM options."
  },
  {
    id: 226,
    session: 7,
    topic: "Delta Hedging — Rebalancing Need",
    question: "A delta-hedged portfolio must be rebalanced because:",
    options: [
      "Delta never changes once the hedge is established",
      "Gamma causes delta to change as the underlying moves, requiring the hedge ratio to be adjusted",
      "The exchange requires daily rebalancing of all hedged positions",
      "Vega changes cause delta to shift by the same amount"
    ],
    correct: 1,
    explanation: "Delta is not constant — it changes with the underlying price (captured by gamma), time (captured by charm), and volatility changes. As Nifty moves, the option's delta shifts, making the original hedge imprecise. The higher the gamma, the more frequently rebalancing is needed. Near expiry, ATM gamma surges (0.000350 → 0.002+), requiring near-continuous rebalancing for short option positions."
  },
  {
    id: 227,
    session: 7,
    topic: "Covered Call — Maximum Profit Calculation",
    question: "A trader holds Nifty at 23,200 and sells a 23,500 Call at Rs.150 premium. The maximum profit per unit is:",
    options: [
      "Rs.150 (premium only)",
      "Rs.300 (strike - stock price only)",
      "Rs.450 (strike - stock price + premium)",
      "Unlimited"
    ],
    correct: 2,
    explanation: "Covered call max profit = (Call Strike - Stock Price) + Premium = (23,500 - 23,200) + 150 = Rs.450 per unit. This occurs when Nifty rises to or above 23,500 at expiry. Above 23,500, the stock gains are capped by the short call's obligation to sell at 23,500. The premium provides additional income. The strategy sacrifices upside beyond the strike in exchange for premium income."
  },
  {
    id: 228,
    session: 7,
    topic: "Covered Call — Downside Risk",
    question: "A covered call (long stock + short call) does NOT protect against:",
    options: [
      "The stock trading sideways near the call strike",
      "A significant decline in the stock price — the short call premium provides only a small cushion",
      "A moderate rise in the stock price up to the call strike",
      "The risk of the short call expiring worthless"
    ],
    correct: 1,
    explanation: "A covered call provides only limited downside cushion equal to the premium received from the short call. If the stock drops significantly (e.g., 10-20%), the premium cushion (typically 2-5%) is quickly overwhelmed. For true downside protection, a protective put or collar is needed. The covered call is best for mildly bullish or sideways markets."
  },
  {
    id: 229,
    session: 7,
    topic: "PCR — Extreme Reversal Signal",
    question: "An extreme PCR reading of >1.5 or <0.5 often signals:",
    options: [
      "Normal market conditions with balanced sentiment",
      "A continuation of the current trend with increasing momentum",
      "A potential reversal, as sentiment has become overly one-sided",
      "A liquidity crisis requiring exchange intervention"
    ],
    correct: 2,
    explanation: "Extreme PCR readings signal crowded positioning. PCR > 1.5 means excessive put selling (extreme bullishness) — a contrarian reversal signal for potential decline. PCR < 0.5 means excessive call selling (extreme bearishness) — a potential reversal signal for a rally. These extremes indicate that the market consensus is one-sided, creating conditions ripe for a counter-move."
  },
  {
    id: 230,
    session: 7,
    topic: "Max Pain — Calculation Method",
    question: "To calculate max pain for Nifty options at each potential expiry level K, you sum:",
    options: [
      "The total premium value (OI × LTP) at each strike",
      "Call OI + Put OI at each strike",
      "Call OI × max(Spot - K, 0) + Put OI × max(K - Spot, 0) across all strikes, then find the K with minimum total",
      "The change in OI at each strike over the past 5 days"
    ],
    correct: 2,
    explanation: "Max pain calculation: for each potential expiry price, compute the total payout = Σ[Call_OI_i × max(Price - K_i, 0) + Put_OI_i × max(K_i - Price, 0)] across all strikes i. The expiry price that minimizes this total payout is max pain — the level where option writers collectively lose the least. It is a sentiment indicator, not a guaranteed price target."
  },
  {
    id: 231,
    session: 1,
    topic: "Futures vs. Options — Obligation",
    question: "A key difference between futures and options is that in a futures contract:",
    options: [
      "Neither party has an obligation until the contract expires",
      "Only the buyer has an obligation; the seller can choose whether to deliver",
      "Both parties have obligations — the buyer must buy and the seller must sell at the agreed price",
      "Only the seller has an obligation; the buyer can walk away"
    ],
    correct: 2,
    explanation: "In a futures contract, both parties have binding obligations: the buyer must buy and the seller must sell at the futures price on expiry (or settle the cash difference daily via MTM). This symmetry of obligation distinguishes futures from options, where only the seller has an obligation while the buyer has a right. This is why futures require margin from both sides, while option buyers simply pay the premium."
  },
  {
    id: 232,
    session: 1,
    topic: "Crude Oil Futures — MCX",
    question: "Crude oil futures on MCX have a lot size of 100 barrels and settle by:",
    options: [
      "Physical delivery of crude oil at a designated warehouse",
      "Cash settlement",
      "Conversion to Nifty futures at the prevailing exchange rate",
      "Rolling forward automatically to the next month"
    ],
    correct: 1,
    explanation: "MCX crude oil futures (100 barrels per lot, tick size Rs.1/barrel) are cash-settled, meaning no physical oil delivery takes place. Settlement occurs around the 19th-20th of the contract month. Cash settlement is practical for crude oil in India since most participants are hedgers and speculators rather than physical oil traders."
  },
  {
    id: 233,
    session: 2,
    topic: "Basis — Definition",
    question: "The 'basis' in futures trading is defined as:",
    options: [
      "The number of days remaining until expiry",
      "The initial margin required to enter a futures position",
      "The tick size of the futures contract",
      "Futures Price minus Spot Price"
    ],
    correct: 3,
    explanation: "Basis = Futures Price - Spot Price. A positive basis (contango) means futures trade above spot; a negative basis (backwardation) means futures trade below spot. Basis risk arises when the basis changes unexpectedly during a hedge. The basis converges to zero at expiry because the futures price must equal the spot price on the settlement date."
  },
  {
    id: 234,
    session: 2,
    topic: "Hedge — Complete Protection Rarity",
    question: "A perfect hedge (100% risk elimination) is rare in practice primarily because of:",
    options: [
      "SEBI regulations that limit hedge ratios to 90%",
      "The fact that futures always trade in contango",
      "Basis risk — imperfect correlation between the hedged asset and the hedging instrument",
      "Brokerage costs that make hedging unprofitable"
    ],
    correct: 2,
    explanation: "Perfect hedges are rare because of basis risk — the hedged asset may not move exactly as predicted by the hedging instrument. For equity portfolios hedged with index futures, the portfolio's actual return may differ from beta-predicted returns due to stock-specific events, sector rotation, and other factors. Even with an optimal hedge ratio, residual variance typically remains."
  },
  {
    id: 235,
    session: 3,
    topic: "IRS — Semi-Annual Payment Frequency",
    question: "In the textbook's IRS examples, payments are made semi-annually (every 180 days). If the swap had quarterly payments instead (every 90 days), each fixed payment would be:",
    options: [
      "Exactly half of the semi-annual payment",
      "The same as semi-annual — payment frequency doesn't affect the amount",
      "Double the semi-annual payment due to more frequent compounding",
      "Approximately half, calculated as Notional × Fixed Rate × (90/365)"
    ],
    correct: 3,
    explanation: "Quarterly fixed payment = Rs.10,00,00,000 × 7.50% × (90/365) = Rs.10,00,00,000 × 0.075 × 0.2466 = Rs.18,49,315. This is approximately half the semi-annual payment of Rs.36,98,630, which makes sense since the accrual period is roughly half as long. Under Actual/365, the exact fraction depends on the actual number of days in each quarter."
  },
  {
    id: 236,
    session: 4,
    topic: "Payoff Symmetry — Long Call vs. Short Put",
    question: "A long call and a short put at the same strike and expiry have similar directional exposure (both bullish). However, a key difference is:",
    options: [
      "Both have identical maximum loss profiles",
      "They produce identical payoffs under all scenarios",
      "The short put has unlimited upside while the long call does not",
      "The long call has limited loss (premium paid) while the short put has much larger potential loss (K - Premium)"
    ],
    correct: 3,
    explanation: "Both are bullish, but the risk profiles differ dramatically. A long call's maximum loss is the premium paid (e.g., Rs.450 per unit). A short put's maximum loss is K - Premium (e.g., 23,200 - 380 = Rs.22,820 per unit if the underlying falls to zero). The short put has far more downside exposure, which is why it requires margin while the long call only requires the premium."
  },
  {
    id: 237,
    session: 4,
    topic: "Options — Zero-Sum Nature",
    question: "If a long call buyer earns Rs.9,750 profit at expiry, the short call writer on the same contract:",
    options: [
      "Loses exactly Rs.9,750, because options are a zero-sum game between buyer and writer",
      "Earns zero — the exchange absorbs the difference",
      "Also earns Rs.9,750 because both benefit from rising markets",
      "Loses Rs.4,875 — the exchange splits the cost equally"
    ],
    correct: 0,
    explanation: "Options are a zero-sum game between the buyer and writer of the same contract. The writer's loss exactly equals the buyer's gain, and vice versa. If the long call buyer earns Rs.9,750 per lot, the short call writer loses exactly Rs.9,750 per lot. The exchange facilitates the trade but does not absorb gains or losses."
  },
  {
    id: 238,
    session: 5,
    topic: "Binomial — Price at Sud Node",
    question: "In a 2-step binomial tree with S=23,151, u=1.03515, d=0.96604, the price at the Sud node (up then down, or down then up) is:",
    options: [
      "Rs.23,151 (returns to original spot)",
      "Rs.24,807",
      "Rs.23,965",
      "Rs.22,365"
    ],
    correct: 0,
    explanation: "Sud = S × u × d = 23,151 × 1.03515 × 0.96604 = 23,151 × 1.0000 = Rs.23,151. Because d = 1/u, the product u × d = 1, so an up-down combination returns exactly to the original price. This is the 'recombining' property of the CRR tree — it ensures Sud = Sdu, reducing the number of nodes and making the calculation tractable."
  },
  {
    id: 239,
    session: 6,
    topic: "BSM — Call Price Calculation with Data",
    question: "Using BSM with S=23,151, K=23,200, r=6.68%, σ=22%, T=0.0493, d1=0.0928, d2=0.0440, N(d1)=0.537, N(d2)=0.518, the call price C = S×N(d1) - K×e^(-rT)×N(d2) is approximately:",
    options: [
      "Rs.350",
      "Rs.620",
      "Rs.440",
      "Rs.537"
    ],
    correct: 2,
    explanation: "C = 23,151 × 0.537 - 23,200 × e^(-0.0668×0.0493) × 0.518 = 12,432.09 - 23,200 × 0.99671 × 0.518 = 12,432.09 - 23,123.67 × 0.518 = 12,432.09 - 11,978.06 = Rs.454. With rounding differences in intermediate N() values, this falls in the Rs.440-450 range. The observed market price of Rs.491 is higher because the actual IV exceeds the assumed 22%."
  },
  {
    id: 240,
    session: 6,
    topic: "Volatility Skew — OTM Put 22,500 Strike",
    question: "In the Nifty volatility skew table, the 22,500 strike (OTM Put) has IV of 24-26%. This level is higher than ATM (21-23%) because:",
    options: [
      "Portfolio hedging demand for downside protection at this strike pushes its IV above ATM levels",
      "BSM overprices all OTM options",
      "The 22,500 strike has the highest trading volume",
      "SEBI mandates a minimum IV floor for OTM puts"
    ],
    correct: 0,
    explanation: "The 22,500 strike (about 650 points OTM) has elevated IV because institutional investors systematically buy puts at this level for portfolio insurance. Pension funds, mutual funds, and FIIs need protection against 3-5% market declines, creating persistent demand at these strikes. This demand-driven IV premium is higher than ATM but lower than the deep OTM put at 22,000 (28-30% IV)."
  },
  {
    id: 241,
    session: 7,
    topic: "Greeks — Gamma for Call vs. Put",
    question: "For a call and put at the same strike and expiry, their gamma values are:",
    options: [
      "The call gamma is always larger than the put gamma",
      "Equal in magnitude but opposite in sign",
      "Identical — gamma is the same for calls and puts at the same strike",
      "The put gamma is always larger because puts have higher IV"
    ],
    correct: 2,
    explanation: "Gamma is identical for calls and puts at the same strike and expiry. Gamma = N'(d1) / (S × σ × √T) — it depends only on d1, S, σ, and T, not on whether the option is a call or put. This makes sense because both calls and puts have delta that changes at the same rate as the underlying moves. Put-call parity also confirms this: since C - P differs from S by constants, their second derivatives are equal."
  },
  {
    id: 242,
    session: 7,
    topic: "Theta — Per-Lot Daily Cost",
    question: "If an ATM Nifty call has theta = -Rs.14.6 per day per unit, a trader long 5 lots (lot size 65) loses how much per day to time decay alone?",
    options: [
      "Rs.73",
      "Rs.4,745",
      "Rs.14,600",
      "Rs.949"
    ],
    correct: 1,
    explanation: "Daily theta cost = |Theta| × Lot Size × Number of Lots = 14.6 × 65 × 5 = Rs.4,745 per day. Over a 5-day trading week, this trader loses approximately Rs.23,725 in time decay alone, even if Nifty doesn't move. This bleed is why option buyers must have strong directional conviction and prefer short-dated trades, while option sellers earn theta as their primary income source."
  },
  {
    id: 243,
    session: 7,
    topic: "Delta Neutral — Portfolio Delta Zero",
    question: "A portfolio is delta-neutral when its aggregate delta equals zero. This means the portfolio is:",
    options: [
      "Guaranteed to make a profit regardless of market direction",
      "Insensitive to small spot price changes, though still exposed to gamma, theta, and vega risks",
      "Completely risk-free with no exposure to any market factor",
      "Immune to changes in implied volatility"
    ],
    correct: 1,
    explanation: "Delta-neutral means the portfolio has zero first-order sensitivity to small spot price changes. However, it retains exposure to: gamma (large price moves change delta, breaking neutrality), theta (time decay), and vega (volatility changes). Market makers maintain delta-neutral portfolios to isolate and trade these other Greeks. True risk-free portfolios would require neutralizing all Greeks simultaneously."
  },
  {
    id: 244,
    session: 1,
    topic: "SEBI Nov 2024 — Weekly Expiry Restriction",
    question: "SEBI's November 2024 reform restricting weekly expiries to one benchmark index per exchange was aimed at:",
    options: [
      "Increasing the number of available trading instruments",
      "Reducing speculative activity and concentrated retail losses around multiple weekly expiry events",
      "Encouraging more FII participation in derivatives markets",
      "Converting all options to American-style exercise"
    ],
    correct: 1,
    explanation: "Before the reform, multiple weekly expiries (Nifty, Bank Nifty, FinNifty, Midcap Select on NSE; Sensex, Bankex on BSE) created 5+ expiry events per week. SEBI's study found these weekly expiries attracted excessive speculative activity, with 93% of retail F&O traders losing money. The reform limited weekly expiries to one per exchange — Nifty on NSE (Tuesday) and Sensex on BSE (Thursday)."
  },
  {
    id: 245,
    session: 2,
    topic: "Fair Value — Time to Expiry Impact",
    question: "As time to expiry (T) decreases toward zero with spot unchanged, the fair futures price F = S × e^((r-q)×T) will:",
    options: [
      "Converge toward zero",
      "Move further away from spot, increasing the contango",
      "Converge toward the spot price S, as the carry cost (r-q)×T approaches zero",
      "Increase proportionally with the passage of time"
    ],
    correct: 2,
    explanation: "As T → 0, the exponent (r-q)×T → 0, so e^((r-q)×T) → 1, and F → S. This is the mathematical basis for the convergence principle: at expiry (T=0), futures must equal spot. The basis shrinks linearly as expiry approaches, and any remaining deviation at expiry would create an arbitrage opportunity that is instantly corrected."
  },
  {
    id: 246,
    session: 3,
    topic: "IRS — NPV of Net Cashflows",
    question: "To determine whether an IRS has positive or negative value to the fixed-rate payer at any point, you can calculate:",
    options: [
      "The sum of all past net payments without discounting",
      "The NPV of all remaining net cashflows, discounting at the current market swap rate",
      "The difference between the original notional and the current notional",
      "The total premium paid at inception"
    ],
    correct: 1,
    explanation: "The swap's current value equals the NPV of all remaining net cashflows, discounted at the current market swap rate. If rates have risen, future net cashflows favor the fixed payer (their fixed payments are below-market), producing a positive NPV. If rates have fallen, the NPV is negative. In Excel: =NPV(DiscountRate/2, NetCashflows) provides this valuation."
  },
  {
    id: 247,
    session: 5,
    topic: "Transaction Costs — Arbitrage Threshold",
    question: "In Indian markets, the minimum put-call parity deviation needed for actionable arbitrage is approximately:",
    options: [
      "Rs.5-10 per unit",
      "Rs.20-30 per unit",
      "Rs.50-80 per unit (total of brokerage + STT + impact cost)",
      "Rs.500+ per unit"
    ],
    correct: 2,
    explanation: "Transaction costs in Indian markets include brokerage, STT, exchange charges, GST, and impact cost, totaling approximately Rs.50-80 per unit for a round-trip arbitrage trade. Any put-call parity deviation smaller than this is not actionable because the profit would be consumed by costs. The textbook's example shows a Rs.63.38 deviation — within the cost bound and therefore not exploitable."
  },
  {
    id: 248,
    session: 6,
    topic: "BSM — N(d1) as Delta",
    question: "In the BSM framework, N(d1) = 0.537 means that the call option's delta is 0.537. For 10 lots of Nifty calls (lot size 65), the equivalent Nifty exposure is approximately:",
    options: [
      "537 units of Nifty",
      "65 units of Nifty",
      "349 units of Nifty",
      "650 units of Nifty"
    ],
    correct: 2,
    explanation: "Equivalent exposure = Delta × Lots × Lot Size = 0.537 × 10 × 65 = 349 units. This means 10 lots of calls behave as if you own 349 units of Nifty (approximately 5.4 futures lots). This is why a market maker selling these calls hedges by buying ~349 units (5 futures lots). The delta-equivalent position is the foundation of delta hedging."
  },
  {
    id: 249,
    session: 7,
    topic: "Short Buildup — OI Pattern",
    question: "Nifty futures price is falling and open interest is increasing. This pattern indicates:",
    options: [
      "Short covering — shorts are closing positions",
      "Short buildup — new short positions are being created, a bearish signal",
      "Long buildup — bullish positioning",
      "Long unwinding — longs are closing, no new directional bets"
    ],
    correct: 1,
    explanation: "Falling price + increasing OI = Short Buildup. New short sellers are entering the market, creating fresh bearish positions. This is the most bearish OI pattern because it indicates new directional conviction behind the price decline. Compare with long unwinding (falling price + decreasing OI), which is only mildly bearish since existing longs are simply exiting rather than new shorts forming."
  },
  {
    id: 250,
    session: 7,
    topic: "Transaction Costs — Strategy Selection Impact",
    question: "If a 4-leg iron condor's expected profit is Rs.5,000 and transaction costs are Rs.2,500, the cost-to-profit ratio is 50%. A better alternative for a range-bound view might be:",
    options: [
      "A 6-leg butterfly spread with even more transaction costs",
      "A short straddle (2 legs) which has lower transaction costs but higher risk",
      "Buying a deep ITM call which has minimal transaction costs",
      "A long straddle betting on a large move"
    ],
    correct: 1,
    explanation: "With 50% cost-to-profit ratio, the iron condor barely justifies its 4-leg cost structure. A short straddle achieves a similar range-bound view with only 2 legs, cutting transaction costs roughly in half. However, the straddle has higher risk (no long wings capping losses). The trade-off between cost efficiency and risk capping is a key consideration when choosing multi-leg strategies."
  },
  {
    id: 251,
    session: 2,
    topic: "Futures Pricing — Negative Carry",
    question: "If the risk-free rate is 5% and the dividend yield is 6%, the net carry cost (r - q) is -1%. This means the fair futures price is:",
    options: [
      "Above the spot price (contango)",
      "Below the spot price (backwardation)",
      "Exactly equal to the spot price",
      "Undefined — carry cost cannot be negative"
    ],
    correct: 1,
    explanation: "When q > r, the net carry cost is negative, meaning the income from holding the underlying (dividends) exceeds the funding cost (interest). F = S × e^((-0.01)×T) < S. The futures trade below spot — backwardation. This can occur in Indian equity markets during heavy dividend season when concentrated large-cap dividends temporarily push the effective yield above the risk-free rate."
  },
  {
    id: 252,
    session: 5,
    topic: "Binomial — Number of Terminal Nodes",
    question: "A 3-step recombining binomial tree has how many terminal nodes (distinct prices at the final step)?",
    options: [
      "3 nodes",
      "6 nodes",
      "4 nodes",
      "8 nodes"
    ],
    correct: 2,
    explanation: "An n-step recombining tree has (n + 1) terminal nodes. For 3 steps: 3 + 1 = 4 terminal nodes. These correspond to 3 up moves (Suuu), 2 up + 1 down (Suud = Sudu = Sduu), 1 up + 2 down, and 3 down moves (Sddd). The recombining property (d = 1/u) collapses what would be 2^3 = 8 paths into just 4 distinct terminal prices."
  },
  {
    id: 253,
    session: 6,
    topic: "BSM — Dividend Yield Adjustment",
    question: "When pricing Nifty options with BSM using a continuous dividend yield q, the spot price S in the formula should be replaced by:",
    options: [
      "S / q",
      "S + q",
      "S × (1 + q)",
      "S × e^(-qT) — the dividend-adjusted spot (present value of spot net of dividends)"
    ],
    correct: 3,
    explanation: "The Merton extension of BSM adjusts for continuous dividends by replacing S with S×e^(-qT) in the call formula: C = S×e^(-qT)×N(d1) - K×e^(-rT)×N(d2). The dividend-adjusted d1 uses (r - q + σ²/2) instead of (r + σ²/2). For Nifty with q ≈ 1.2%, this adjustment lowers the call price and raises the put price compared to the no-dividend model."
  },
  {
    id: 254,
    session: 3,
    topic: "IRS — Motivation for Entry",
    question: "Company A has a floating-rate loan at MIBOR + 0.50% and believes interest rates will rise. To protect against rising rates, Company A should enter an IRS where it:",
    options: [
      "Pays fixed and receives floating, converting its floating-rate loan to effectively fixed",
      "Pays floating and receives floating at a different reference rate",
      "Pays floating and receives fixed, doubling its floating exposure",
      "Does nothing, since rising rates benefit floating-rate borrowers"
    ],
    correct: 0,
    explanation: "By paying fixed and receiving floating in an IRS, Company A effectively converts its floating-rate loan into a fixed-rate obligation. The floating rate received from the swap offsets the floating rate paid on the loan, leaving only the fixed swap rate as the net cost. If rates rise, the company is protected because its effective borrowing cost is now fixed."
  },
  {
    id: 255,
    session: 1,
    topic: "OTC vs. Exchange — Margin System",
    question: "Exchange-traded derivatives in India use the SPAN margining system. OTC derivatives typically use:",
    options: [
      "The same SPAN system through NSE",
      "No collateral requirements whatsoever",
      "CSA (Credit Support Annex) based bilateral collateral arrangements",
      "A flat 50% margin requirement set by RBI"
    ],
    correct: 2,
    explanation: "OTC derivatives use the CSA under the ISDA Master Agreement for collateral management. Under a CSA, counterparties bilaterally agree to post margin based on mark-to-market values. This differs from SPAN, which is a centralized, formulaic system run by exchanges. For standardized OTC products in India (like INR OIS), CCIL provides central clearing, moving closer to the exchange model."
  },
  {
    id: 256,
    session: 7,
    topic: "Long Straddle — Total Premium Cost",
    question: "A long straddle on Nifty at strike 23,200 costs Rs.450 (call) + Rs.380 (put) = Rs.830 per unit. For 5 lots (lot size 65), the total premium outlay is:",
    options: [
      "Rs.4,150",
      "Rs.53,950",
      "Rs.2,69,750",
      "Rs.1,34,875"
    ],
    correct: 2,
    explanation: "Total premium = Premium per unit × Lot Size × Number of Lots = 830 × 65 × 5 = Rs.2,69,750. This is the maximum loss on the straddle — it occurs if Nifty expires exactly at 23,200. To break even, Nifty must move more than 830 points in either direction from the strike (below 22,370 or above 24,030). This significant capital outlay is why straddle buyers need strong conviction about upcoming volatility."
  },
  {
    id: 257,
    session: 2,
    topic: "Cost-of-Carry — Storage Costs in Commodities",
    question: "For physical commodities like gold, the cost-of-carry model includes storage costs. The futures pricing formula becomes F = S × e^((r + u - q)×T), where u represents:",
    options: [
      "The usage rate of the commodity",
      "The underwriting cost of the futures contract",
      "The annualized storage cost as a proportion of the spot price",
      "The utility value of holding futures instead of physical"
    ],
    correct: 2,
    explanation: "For physical commodities, holding the underlying incurs storage costs (vault fees for gold, tank rental for oil). These costs are added to the carry cost: the term u represents annualized storage costs as a percentage of spot price. Higher storage costs push futures further into contango. For financial assets like equities and indices, storage costs are zero."
  },
  {
    id: 258,
    session: 4,
    topic: "Options — Risk-Reward Asymmetry",
    question: "The risk-reward asymmetry of options means that for a long call buyer:",
    options: [
      "Risk and reward are symmetrical, as with futures",
      "Both risk and reward are unlimited",
      "Reward is limited to the premium but risk is unlimited",
      "Risk is limited to the premium but potential reward is unlimited"
    ],
    correct: 3,
    explanation: "Options create asymmetric payoffs. A long call buyer risks only the premium paid (limited downside) but can profit unlimitedly as the underlying rises. This contrasts with futures, where both profit and loss are symmetric and potentially unlimited. This asymmetry is the fundamental appeal of options — you can define your maximum loss in advance while keeping upside open."
  },
  {
    id: 259,
    session: 3,
    topic: "Swap Valuation — Zero Value at Inception",
    question: "At the moment of inception, the mark-to-market value of a plain-vanilla IRS is:",
    options: [
      "Approximately zero for both parties (fair value swap)",
      "Positive for the floating-rate payer",
      "Positive for the fixed-rate payer",
      "Equal to the first period's net payment"
    ],
    correct: 0,
    explanation: "At inception, the fixed rate is set at the prevailing market swap rate, making the NPV of future net cashflows approximately zero for both parties. Neither side has an advantage. The swap only gains or loses value after inception, when market rates move away from the original fixed rate. This is why no upfront payment is exchanged (unlike options, where the buyer pays a premium)."
  },
  {
    id: 260,
    session: 6,
    topic: "Volatility Smile — Currency Markets",
    question: "The volatility smile pattern (where both OTM puts AND OTM calls have higher IV than ATM) is most commonly observed in:",
    options: [
      "Currency option markets, where large moves in either direction are possible",
      "Indian equity index options like Nifty",
      "Only deep ITM options across all markets",
      "Bond options with fixed coupons"
    ],
    correct: 0,
    explanation: "Currency markets exhibit a true volatility 'smile' (symmetric U-shape) because exchange rates can move sharply in either direction. Equity index markets like Nifty show a volatility 'skew' or 'smirk' instead — OTM puts have much higher IV than OTM calls because crashes are more sudden and severe than rallies. The distinction between smile (symmetric) and skew (asymmetric) reflects different tail risk characteristics."
  },
  {
    id: 261,
    session: 5,
    topic: "Put-Call Parity — Synthetic Forward",
    question: "A long call + short put at the same strike K creates a synthetic position equivalent to:",
    options: [
      "A long forward contract at strike K",
      "A short futures position at strike K",
      "A protective put",
      "A long straddle"
    ],
    correct: 0,
    explanation: "Long call + short put at the same strike K creates a synthetic long forward. If S > K at expiry, you exercise the call (buy at K). If S < K, the put is exercised against you (you buy at K). Either way, you buy at K — just like a forward contract. This equivalence is a direct consequence of put-call parity: C - P = S×e^(-qT) - K×e^(-rT), which resembles the forward pricing relationship."
  },
  {
    id: 262,
    session: 1,
    topic: "DSP — Daily Settlement Price",
    question: "The Daily Settlement Price (DSP) used for MTM calculation is:",
    options: [
      "The opening price of the next trading day",
      "Published by the exchange, typically based on the closing or last-traded price of that day",
      "The average of the day's high and low prices",
      "Set by SEBI at the end of each week"
    ],
    correct: 1,
    explanation: "The DSP is published by the exchange each trading day and is typically based on the closing price or weighted average of the last few minutes of trading. MTM settlement uses the difference between today's DSP and the previous day's DSP (or entry price on day 1). This is the price at which every open position is revalued for daily cash settlement."
  },
  {
    id: 263,
    session: 7,
    topic: "Strategy — Protective Put vs. Covered Call",
    question: "Both protective puts and covered calls involve combining stock with options, but they differ in that:",
    options: [
      "Both provide unlimited upside and limited downside",
      "Protective puts cap downside losses but keep unlimited upside; covered calls provide premium income but cap upside",
      "Covered calls protect against crashes while protective puts generate income",
      "Both are bearish strategies unsuitable for long stock holders"
    ],
    correct: 1,
    explanation: "A protective put (long stock + long put) preserves unlimited upside while capping downside at (Stock Price - Strike + Put Premium). A covered call (long stock + short call) earns premium income but caps the upside at (Call Strike + Premium). The protective put costs premium (insurance expense), while the covered call generates premium income (yield enhancement)."
  },
  {
    id: 264,
    session: 3,
    topic: "Currency Swap — Eliminating FX Risk",
    question: "Through a USD/INR currency swap, an Indian company with a $10M ECB eliminates FX risk on both:",
    options: [
      "Only the interest payments, not the principal",
      "Both the principal repayment and the periodic interest payments",
      "Only the principal, not the interest payments",
      "Neither — currency swaps only change the interest rate type"
    ],
    correct: 1,
    explanation: "A currency swap converts both the periodic interest payments (from USD to INR) and the principal repayment (exchanged back at the original rate at maturity). This provides complete FX risk elimination. If the company only wanted to hedge interest payments, a simpler FX forward would suffice. The currency swap is comprehensive because it addresses the full cash flow structure of the foreign currency debt."
  },
  {
    id: 265,
    session: 2,
    topic: "Hedge — Overhedging vs. Underhedging",
    question: "A portfolio with beta = 1.15 hedged using exactly 22 Nifty futures contracts (instead of the optimal 25) would be:",
    options: [
      "Perfectly hedged — 22 contracts is close enough",
      "Overhedged — with excess short futures exposure",
      "Underhedged — retaining residual long market exposure because the futures position is too small",
      "Impossible to determine without knowing the exact portfolio composition"
    ],
    correct: 2,
    explanation: "With only 22 contracts instead of the optimal 25, the hedge is undersized. The short futures notional is less than the beta-adjusted portfolio exposure, leaving residual long market exposure. If the market falls, the portfolio will lose more than the futures gain. Underhedging exposes the portfolio to directional risk that the hedge was meant to eliminate."
  },
  {
    id: 266,
    session: 6,
    topic: "IV Extraction — Goal Seek Method",
    question: "To extract implied volatility using Excel Goal Seek, you would set the BSM price cell equal to the observed market price by changing:",
    options: [
      "The risk-free rate cell",
      "The spot price cell",
      "The strike price cell",
      "The volatility (sigma) cell"
    ],
    correct: 3,
    explanation: "Goal Seek iteratively adjusts the sigma cell until the BSM formula produces a price matching the observed market price. All other inputs (S, K, r, T) are known and fixed. The resulting sigma is the implied volatility — the market's forward-looking expectation of future volatility embedded in the option price. This numerical iteration is necessary because BSM cannot be algebraically inverted for sigma."
  },
  {
    id: 267,
    session: 5,
    topic: "Binomial — American Call on Non-Dividend Stock",
    question: "For a European call on a non-dividend-paying underlying, the American call option has:",
    options: [
      "An undefined price — American calls cannot be priced with binomial trees",
      "A significantly higher price due to early exercise premium",
      "A lower price because the American option is more restricted",
      "The same price as the European call — early exercise of a call on a non-dividend stock is never optimal"
    ],
    correct: 3,
    explanation: "It is never optimal to exercise an American call early on a non-dividend-paying stock, because the call is always worth more alive (with time value) than dead (exercised for intrinsic value only). Therefore, the American call price equals the European call price. For dividend-paying stocks, early exercise may be optimal just before an ex-dividend date to capture the dividend."
  },
  {
    id: 268,
    session: 1,
    topic: "Derivatives Market — Price Discovery",
    question: "Exchange-traded derivatives contribute to price discovery by:",
    options: [
      "Replacing the underlying cash market with more accurate derivative prices",
      "Allowing only institutional investors to set prices",
      "Aggregating the views of many buyers and sellers through transparent order books",
      "Using SEBI-mandated pricing formulas to determine fair value"
    ],
    correct: 2,
    explanation: "Derivatives markets aggregate the views of thousands of participants through transparent order books with visible bids and offers. The futures price reflects the collective market expectation of the underlying's future value, incorporating all available information. This price discovery function benefits the broader financial ecosystem, including participants who trade only in the cash market."
  },
  {
    id: 269,
    session: 7,
    topic: "OI Buildup — Long Buildup Signal",
    question: "Rising Nifty futures price accompanied by increasing open interest is classified as:",
    options: [
      "Short covering — existing shorts are closing",
      "Long buildup — new long positions being created, a bullish signal",
      "Long unwinding — existing longs are closing",
      "Short buildup — new shorts expect the rally to reverse"
    ],
    correct: 1,
    explanation: "Rising price + increasing OI = Long Buildup. New buyers are entering the market, creating fresh long positions that push prices higher. This is the most bullish OI pattern because it indicates new directional conviction behind the price rise, not just shorts closing their positions. Compare with short covering (rising price + decreasing OI), which is only mildly bullish."
  },
  {
    id: 270,
    session: 4,
    topic: "Straddle — Break-Even Distance",
    question: "A long straddle at strike K with total premium of Rs.830 needs Nifty to move at least 830 points from the strike to break even. As a percentage of a 23,200 strike, this required move is approximately:",
    options: [
      "1.8%",
      "5.0%",
      "3.6%",
      "10.0%"
    ],
    correct: 2,
    explanation: "Required move = 830/23,200 = 3.58% ≈ 3.6%. With India VIX at 22, the market expects ~6.35% monthly moves. So the straddle breakeven requires roughly 57% of one month's expected one-sigma move. This means the straddle buyer needs a larger-than-average move to profit — highlighting why long straddles are only sensible before expected high-volatility events (earnings, elections, RBI policy)."
  },
  {
    id: 271,
    session: 3,
    topic: "IRS — Period 2 Net Payment",
    question: "In the textbook's IRS example (notional Rs.10 crore, fixed 7.50%, floating = MIBOR + 0.50%), when MIBOR rises to 8.00% in Period 2, the floating payment is Rs.41,91,781 and the fixed payment is Rs.36,98,630. The net payment of Rs.4,93,151 is paid by:",
    options: [
      "Company A (fixed-rate payer) to Company B",
      "The swap dealer to both parties equally",
      "Neither — both payments are deferred to maturity",
      "Company B (floating-rate payer) to Company A (fixed-rate payer)"
    ],
    correct: 3,
    explanation: "When floating (Rs.41,91,781 at 8.50%) exceeds fixed (Rs.36,98,630 at 7.50%), the net flow goes from the floating-rate payer (B) to the fixed-rate payer (A). B pays A = Rs.41,91,781 - Rs.36,98,630 = Rs.4,93,151. This reversal from Period 1 (where A paid B) demonstrates how the swap dynamically adjusts: the fixed-rate payer benefits when rates rise above the fixed rate."
  },
  {
    id: 272,
    session: 6,
    topic: "BSM — Impact of Increasing Volatility",
    question: "If all other inputs remain constant, an increase in implied volatility from 22% to 30% will cause:",
    options: [
      "Call prices to decrease and put prices to increase",
      "Call prices to increase and put prices to decrease",
      "Both call and put prices to decrease",
      "Both call and put prices to increase"
    ],
    correct: 3,
    explanation: "Higher volatility increases the probability of large price swings in both directions, making both calls and puts more valuable. For the call, more upside potential raises its value. For the put, more downside potential raises its value. This is captured by vega, which is positive for both long calls and long puts. Option sellers (negative vega) lose from rising volatility."
  },
  {
    id: 273,
    session: 1,
    topic: "Lot Size — Purpose",
    question: "SEBI periodically revises derivative lot sizes to keep the minimum contract value around:",
    options: [
      "Rs.1-2 lakh",
      "Rs.5-7 lakh",
      "Rs.15-20 lakh",
      "Rs.50-75 lakh"
    ],
    correct: 2,
    explanation: "SEBI targets a minimum contract value of approximately Rs.15-20 lakh per lot. When Nifty rises significantly, the contract value may exceed this range, prompting lot size reduction. When Nifty falls, the reverse may happen. For Nifty at 23,200 with lot size 65: contract value = 23,200 × 65 = Rs.15,08,000 — within the target range. This ensures that derivatives remain accessible but not so small as to encourage excessive speculation."
  },
  {
    id: 274,
    session: 5,
    topic: "Put-Call Parity — Detecting Mispricing",
    question: "A trader calculates LHS = 23,614.68 and RHS = 23,551.30 from put-call parity. The parity difference is Rs.63.38. To determine if arbitrage is possible, this difference must be compared against:",
    options: [
      "The total transaction costs including brokerage, STT, and impact cost (approximately Rs.50-80)",
      "The India VIX level",
      "The overnight MIBOR rate",
      "The option's theta decay for one day"
    ],
    correct: 0,
    explanation: "A parity deviation is only exploitable if it exceeds total round-trip transaction costs. In Indian markets, these costs (brokerage + STT + exchange charges + GST + impact cost) total approximately Rs.50-80 per unit. The Rs.63.38 deviation falls within this range, so no actionable arbitrage exists. Only deviations exceeding Rs.100+ would clearly justify the risk and cost of an arbitrage trade."
  },
  {
    id: 275,
    session: 7,
    topic: "Greeks — Vega Neutrality",
    question: "To make a portfolio vega-neutral (immune to changes in implied volatility), a trader can:",
    options: [
      "Add Nifty futures — futures have significant vega exposure",
      "Add or remove options positions until portfolio vega sums to zero, since only options have meaningful vega",
      "Simply wait for expiry — vega becomes zero at expiry anyway",
      "Increase the delta hedge ratio beyond 1.0"
    ],
    correct: 1,
    explanation: "Vega neutrality requires adjusting option positions because only options have significant vega. Futures and the underlying have zero vega (their prices don't depend on implied volatility). To neutralize vega, the trader adds options with opposing vega: if the portfolio has positive vega, sell options (negative vega) until net vega = 0. Note that adjusting for vega may disturb delta, requiring further rebalancing."
  },
  {
    id: 276,
    session: 2,
    topic: "Futures — Settlement at Expiry",
    question: "On the expiry day of a Nifty futures contract, the final settlement price is based on:",
    options: [
      "The opening price of the Nifty index on expiry day",
      "The previous day's closing price of the Nifty futures",
      "The weighted average of the Nifty spot index in the last 30 minutes of trading on expiry day",
      "The highest Nifty futures price traded during the expiry week"
    ],
    correct: 2,
    explanation: "Nifty futures are cash-settled at expiry based on the weighted average of the Nifty spot index during the last 30 minutes of trading on expiry day. This averaging mechanism reduces the potential for market manipulation at a single point in time. The difference between this final settlement price and the previous day's DSP (or entry price) determines the last day's MTM profit or loss."
  },
  {
    id: 277,
    session: 4,
    topic: "Call Option — Deep ITM Behavior",
    question: "A deep in-the-money call option (e.g., Nifty 22,000 Call when Nifty is at 23,500) has a delta approaching:",
    options: [
      "0 — deep ITM calls have very low delta",
      "0.50 — same as any ATM option",
      "-1.0 — deep ITM calls have negative delta",
      "1.0 — the call behaves almost like holding the underlying itself"
    ],
    correct: 3,
    explanation: "Deep ITM calls have delta approaching +1.0, meaning they move almost point-for-point with the underlying. The time value is minimal (the outcome — expiring ITM — is nearly certain). Conversely, deep OTM calls have delta near 0 (almost no sensitivity to price changes). ATM options sit in between with delta ≈ 0.50."
  },
  {
    id: 278,
    session: 3,
    topic: "IRS — Comparative Advantage Motivation",
    question: "Companies A and B both need to borrow Rs.10 crore. A can borrow fixed at 8.50% or floating at MIBOR + 1.00%. B can borrow fixed at 9.50% or floating at MIBOR + 1.50%. The basis for a mutually beneficial swap exists because:",
    options: [
      "Both companies prefer the same type of borrowing",
      "Company A always has an absolute advantage in both markets",
      "The difference in fixed rates (1.00%) differs from the difference in floating rates (0.50%), creating a comparative advantage",
      "The floating rate market is always cheaper than the fixed rate market"
    ],
    correct: 2,
    explanation: "A has a 1.00% advantage in fixed rates (8.50% vs 9.50%) but only 0.50% advantage in floating rates (MIBOR+1.00% vs MIBOR+1.50%). This differential of 0.50% (1.00% - 0.50%) represents the total gain available from a swap. Through a swap dealer, both companies can reduce their borrowing costs — A borrows fixed (where it has the bigger advantage) and swaps to floating, while B does the reverse."
  },
  {
    id: 279,
    session: 6,
    topic: "BSM — Impact of Interest Rate Change",
    question: "If the risk-free rate increases from 6.68% to 8.00% while all other BSM inputs remain unchanged, the European call price will:",
    options: [
      "Decrease, because higher rates reduce all asset prices",
      "Remain unchanged, because interest rates do not appear in BSM",
      "Increase, because higher rates reduce the present value of the strike price K×e^(-rT)",
      "Decrease for near-month options but increase for far-month options"
    ],
    correct: 2,
    explanation: "Higher r reduces the present value of the strike price (K×e^(-rT) decreases when r increases), effectively making the 'cost' of exercising the call cheaper in present value terms. This increases the call value. Conversely, a higher r decreases put values. In practice, for short-dated Nifty options (18 days), the interest rate effect is small — a 1% rate change moves the option price by only a few rupees."
  },
  {
    id: 280,
    session: 5,
    topic: "Binomial — Risk-Free Replication",
    question: "The binomial model prices options correctly because at each node, the option payoff can be exactly replicated by:",
    options: [
      "Entering an IRS to convert the option exposure to a fixed income instrument",
      "Buying multiple options at different strikes",
      "Using the SPAN margin system to calculate the exact hedge",
      "Buying or selling the correct number of shares of the underlying plus lending or borrowing at the risk-free rate"
    ],
    correct: 3,
    explanation: "At each binomial node, you can construct a portfolio of Δ shares of the underlying plus B dollars of risk-free borrowing/lending that exactly replicates the option's payoff in both the up and down states. Since the replicating portfolio and the option produce identical payoffs, they must have the same price (no-arbitrage). This replication argument is what makes actual real-world probabilities irrelevant for pricing."
  },
  {
    id: 281,
    session: 1,
    topic: "ISDA Master Agreement",
    question: "The ISDA Master Agreement is the standard documentation framework for:",
    options: [
      "Exchange-traded futures and options on NSE and BSE",
      "Government securities issued by RBI",
      "Mutual fund NAV calculations by AMFI",
      "OTC derivative transactions between counterparties globally"
    ],
    correct: 3,
    explanation: "The ISDA (International Swaps and Derivatives Association) Master Agreement provides the legal framework for OTC derivatives globally. It covers terms like netting, close-out, events of default, and governs the CSA for collateral management. In India, most bank-to-corporate and interbank OTC derivative deals are documented under ISDA. Exchange-traded derivatives use exchange-specific rules instead."
  },
  {
    id: 282,
    session: 7,
    topic: "Collar — Net Cost",
    question: "A collar (long stock + long put + short call) can be constructed at nearly zero net premium cost when:",
    options: [
      "The put premium paid approximately equals the call premium received",
      "The stock price is exactly at the midpoint between the put and call strikes",
      "Both options are deep in-the-money",
      "The collar is set up on expiry day"
    ],
    correct: 0,
    explanation: "A zero-cost collar is achieved when the put premium paid for downside protection approximately equals the call premium received from selling the upside cap. The trader gives up some upside (above the call strike) to fund the downside protection (below the put strike) at minimal or zero net cost. This makes collars popular with institutional investors who want cost-efficient hedging."
  },
  {
    id: 283,
    session: 2,
    topic: "Hedge — Adjusting for Beta Greater Than 1",
    question: "A portfolio with beta = 1.40 requires more futures contracts than a beta = 1.00 portfolio of the same value. This is because:",
    options: [
      "Higher beta means the portfolio is more sensitive to market moves, requiring a proportionally larger offsetting futures position",
      "Higher beta portfolios have higher brokerage costs",
      "SEBI mandates extra contracts for high-beta portfolios",
      "Beta above 1.0 indicates the portfolio is already hedged"
    ],
    correct: 0,
    explanation: "Beta = 1.40 means the portfolio moves 1.40% for every 1% move in Nifty. To fully offset this amplified sensitivity, you need 40% more futures contracts than the simple notional ratio. For example, a Rs.3 crore portfolio at beta 1.40 needs (1.40 × 3,00,00,000) / (Futures Price × 65) contracts. Without the beta adjustment, the hedge would only cover 1/1.40 = 71% of the portfolio's actual risk."
  },
  {
    id: 284,
    session: 4,
    topic: "Put Option — Deep OTM Behavior",
    question: "A deep out-of-the-money put option (e.g., Nifty 21,000 Put when Nifty is at 23,200) has delta approaching:",
    options: [
      "+1.0",
      "-0.50",
      "-1.0",
      "0 — the put is insensitive to small spot price changes because it is very unlikely to expire ITM"
    ],
    correct: 3,
    explanation: "Deep OTM puts have delta near 0 (slightly negative). The option is so far from being profitable that small movements in Nifty have almost no impact on its price. Its value consists almost entirely of a small amount of time value representing the very low probability of a catastrophic market decline. As expiry approaches, the delta moves even closer to zero unless the market collapses toward the strike."
  },
  {
    id: 285,
    session: 6,
    topic: "N(x) — Key Reference Values",
    question: "For the cumulative standard normal distribution, N(1.645) = 0.95 and N(2.326) = 0.99. These values are important in finance because they define:",
    options: [
      "The delta of ATM options at different expiries",
      "The put-call parity deviation thresholds",
      "The minimum and maximum values of implied volatility",
      "The 95% and 99% confidence levels used in VaR and SPAN margin calculations"
    ],
    correct: 3,
    explanation: "N(1.645) = 0.95 and N(2.326) = 0.99 define the critical values for 95% and 99% confidence levels. SPAN uses a 99% confidence level (3.5 standard deviations for the scan range), while VaR calculations commonly use both 95% and 99% thresholds. In BSM, these N(x) values also arise when evaluating option probabilities — N(d2) ≈ 0.95 would indicate a 95% probability of the option expiring ITM."
  },
  {
    id: 286,
    session: 3,
    topic: "ECB — External Commercial Borrowing",
    question: "Indian companies with External Commercial Borrowings (ECBs) often use currency swaps because ECBs are:",
    options: [
      "Always denominated in INR, requiring conversion to foreign currency",
      "Automatically hedged by RBI through the forex reserves",
      "Only available to government-owned enterprises",
      "Denominated in foreign currency (typically USD), exposing the company to exchange rate risk on both interest and principal"
    ],
    correct: 3,
    explanation: "ECBs are foreign currency borrowings (typically USD) by Indian companies from international lenders. The company earns revenue in INR but must repay in USD, creating exchange rate risk. If USD/INR appreciates (rupee depreciates), the INR cost of repayment rises. Currency swaps convert both the periodic interest and principal obligations from USD to INR, completely eliminating this FX risk."
  },
  {
    id: 287,
    session: 7,
    topic: "PCR — Bearish Signal Level",
    question: "A Put-Call Ratio below 0.7 is generally considered:",
    options: [
      "Strongly bullish — high confidence in the market",
      "Neutral — PCR below 1 is normal",
      "Meaningless — PCR only matters above 1.0",
      "Bearish — relatively more call selling/buying than put activity signals caution"
    ],
    correct: 3,
    explanation: "PCR < 0.7 indicates relatively more call activity than put activity, which can mean excessive call buying (retail bullishness) or insufficient put support. This is a bearish signal because it suggests the market lacks the support base that put selling provides. Extreme low readings (<0.5) often precede corrections as one-sided bullish positioning unwinds."
  },
  {
    id: 288,
    session: 5,
    topic: "Binomial — Increasing Steps",
    question: "As the number of steps in a binomial tree increases from 2 to 100 to 1,000, the binomial option price:",
    options: [
      "Diverges further from the BSM price with each additional step",
      "Oscillates randomly without converging",
      "Converges toward the BSM closed-form price, with the difference becoming negligible at 100+ steps",
      "Remains exactly the same regardless of the number of steps"
    ],
    correct: 2,
    explanation: "The CRR binomial model converges to the BSM price as the number of steps increases. A 2-step tree is a coarse approximation (the textbook's example gave Rs.425 vs. BSM's ~Rs.440-450). At 50+ steps, the difference shrinks to a few rupees. At 100+ steps, it becomes negligible. This convergence validates both models — the binomial provides intuition while BSM provides the efficient closed-form solution."
  },
  {
    id: 289,
    session: 1,
    topic: "Tata Steel Futures — Higher Margin",
    question: "Tata Steel futures require an initial margin of 22-28%, much higher than Nifty futures' 12-15%. This is because:",
    options: [
      "Tata Steel has a larger lot size than Nifty",
      "SEBI charges higher fees for steel-sector derivatives",
      "Tata Steel futures are physically settled while Nifty futures are not",
      "Individual stocks are more volatile than diversified indices, requiring higher margins to cover worst-case losses"
    ],
    correct: 3,
    explanation: "Single stocks exhibit higher volatility than a diversified index like Nifty 50 because stock-specific risks (earnings surprises, management changes, sector disruptions) are not diversified away. SPAN calculates higher scan ranges for volatile stocks, leading to higher margins. Nifty's diversification across 50 stocks reduces portfolio volatility, allowing lower margin requirements."
  },
  {
    id: 290,
    session: 6,
    topic: "Volatility — Buy Low Sell High",
    question: "The practitioner rule of thumb 'buy options when IV is low and sell when IV is high' is based on the principle that:",
    options: [
      "SEBI mandates lower premiums during low-volatility periods",
      "IV always reverts to its historical mean, so buying cheap and selling expensive captures the volatility risk premium",
      "Low IV means the underlying will definitely move less, making selling safe",
      "High IV always precedes market crashes"
    ],
    correct: 1,
    explanation: "Implied volatility tends to mean-revert over time. When IV is abnormally low (e.g., VIX at 8.7 in late 2024), options are 'cheap' and buying them offers favorable risk-reward if volatility normalizes. When IV is high (e.g., VIX at 86.6 during COVID), options are 'expensive' and selling them captures elevated premiums that may not be sustained. This mean-reversion tendency is a key driver of volatility trading strategies."
  },
  {
    id: 291,
    session: 7,
    topic: "Strategy Selection — Strongly Bearish View",
    question: "A trader with a strongly bearish view on Nifty, expecting a 5-8% decline within 2 weeks, would most likely use:",
    options: [
      "A covered call strategy on their stock holdings",
      "Selling deep OTM call options for premium income",
      "A long straddle betting on a move in either direction",
      "Buying ATM or slightly OTM put options for leveraged downside exposure"
    ],
    correct: 3,
    explanation: "Buying puts provides leveraged exposure to the expected decline with defined risk (maximum loss = premium). ATM or slightly OTM puts offer the best risk-reward for a 5-8% expected move. A covered call provides minimal protection. A long straddle wastes premium on the unwanted call side. Selling deep OTM calls generates small premium but doesn't capitalize on the expected large move."
  },
  {
    id: 292,
    session: 2,
    topic: "Futures — Contango in Indian Equity Markets",
    question: "Nifty futures typically trade in contango of 15-80 points for the near-month. This contango is wider when:",
    options: [
      "FII selling pressure is extremely heavy",
      "The dividend yield exceeds the risk-free rate",
      "India VIX is very low",
      "More days remain to expiry (higher T increases the carry cost component)"
    ],
    correct: 3,
    explanation: "Contango = S × (e^((r-q)×T) - 1). With r-q constant, a higher T (more days to expiry) produces a wider contango. At the start of a monthly contract (~30 days), the contango might be 60-80 points, narrowing to 15-20 points in the last week as T shrinks. This linear convergence of basis toward zero is a fundamental property of futures pricing."
  },
  {
    id: 293,
    session: 3,
    topic: "Swap — Notional Not Exchanged in IRS",
    question: "The fact that notional principal is NOT exchanged in a plain-vanilla IRS significantly reduces:",
    options: [
      "The swap dealer's profit margin",
      "The frequency of payment exchanges",
      "The need for any documentation or legal agreements",
      "Settlement risk — since only the net interest differential (a small fraction of notional) changes hands each period"
    ],
    correct: 3,
    explanation: "Since only the net difference between fixed and floating payments is settled (typically 1-3% of notional per period), the actual cash at risk at any payment date is a tiny fraction of the notional. If the notional were exchanged, default on a Rs.10 crore notional would mean losing Rs.10 crore. With net settlement only, the maximum exposure per period is limited to the net interest differential (~Rs.2-5 lakh on a Rs.10 crore notional)."
  },
  {
    id: 294,
    session: 4,
    topic: "Options — Why Writers Require Margin",
    question: "Option writers (sellers) must deposit margin, while option buyers do not need to maintain ongoing margin, because:",
    options: [
      "Writers always make money, so margin is just a formality",
      "Exchanges favor buyers over sellers as a matter of policy",
      "Writers face potentially large losses if the market moves against them, while buyers' maximum loss is the premium already paid upfront",
      "Buyers are required to deposit margin under SEBI's November 2024 rules"
    ],
    correct: 2,
    explanation: "An option writer's potential loss can far exceed the premium received (unlimited for a naked call writer). Margin ensures the writer can meet their obligation if the option is exercised. The buyer's maximum loss is limited to the premium already paid upfront — once paid, there is no further liability. Under SEBI's Nov 2024 rules, buyers pay the full premium upfront (no leverage), but this is a one-time payment, not ongoing margin."
  },
  {
    id: 295,
    session: 6,
    topic: "BSM — Impact of Time to Expiry",
    question: "If time to expiry increases from 18 days to 45 days while all other BSM inputs remain unchanged, both the call and put prices will:",
    options: [
      "Decrease, because longer time means more risk",
      "Remain unchanged — time does not affect BSM prices",
      "Increase, because more time adds more time value to both options",
      "The call increases but the put decreases"
    ],
    correct: 2,
    explanation: "Longer time to expiry increases time value for both calls and puts. More time means more opportunity for favorable price movements, increasing the option's worth. The vega effect also increases (longer-dated options are more sensitive to volatility). The only exception is deep ITM European puts, where the rT component can dominate, but for ATM options, more time always means higher prices."
  },
  {
    id: 296,
    session: 5,
    topic: "Put-Call Parity — Rearranging for Call Price",
    question: "From put-call parity C + K×e^(-rT) = P + S×e^(-qT), the call price can be expressed as:",
    options: [
      "C = P + S×e^(-qT) - K×e^(-rT)",
      "C = P × S / K",
      "C = P + K×e^(-rT) - S×e^(-qT)",
      "C = K×e^(-rT) - P - S×e^(-qT)"
    ],
    correct: 0,
    explanation: "Rearranging: C = P + S×e^(-qT) - K×e^(-rT). This shows that a call can be synthesized from a put, a position in the dividend-adjusted underlying, and risk-free borrowing. If you know the put price, you can derive the call price without running BSM. This relationship also means that any mispricing between call and put prices creates an arbitrage opportunity."
  },
  {
    id: 297,
    session: 1,
    topic: "Crude Oil — MCX Contract Month",
    question: "MCX crude oil futures contracts expire on approximately the 19th-20th of the contract month. A trader holding March crude futures must close or settle by:",
    options: [
      "January 19-20",
      "February 28-29",
      "March 19-20",
      "April 19-20"
    ],
    correct: 2,
    explanation: "MCX crude oil futures expire on the 19th-20th of the contract month itself. A March contract expires around March 19-20. This differs from equity derivatives on NSE (which expire on the last Tuesday of the month). Commodity futures have their own expiry conventions based on global commodity market practices and delivery logistics."
  },
  {
    id: 298,
    session: 7,
    topic: "Gamma Risk — Market Makers",
    question: "Professional market makers who are net short ATM options near expiry face significant gamma risk. To manage this, they must:",
    options: [
      "Simply hold the position and accept the risk since market makers always profit",
      "Buy deep OTM options which have high gamma to offset the exposure",
      "Close all positions 10 days before expiry to avoid gamma risk entirely",
      "Continuously rebalance their delta hedge as the underlying moves, since delta changes rapidly near expiry"
    ],
    correct: 3,
    explanation: "Near expiry, ATM gamma surges to 0.002+ (from 0.000350 with 18 days left). This means a 50-point Nifty move can shift delta from 0.50 to 0.60 almost instantly, requiring immediate hedge rebalancing. Market makers must continuously buy and sell the underlying to maintain delta neutrality — a process that becomes increasingly expensive and difficult as gamma accelerates. This is the practical cost of being short gamma."
  },
  {
    id: 299,
    session: 3,
    topic: "Swap — Risk for Floating Rate Payer if Rates Fall",
    question: "Company B is the floating-rate payer in an IRS (pays MIBOR, receives fixed 7.50%). If MIBOR drops to 5.00%, Company B's effective position is:",
    options: [
      "Unfavorable — B pays 5.00% floating but receives 7.50% fixed, which sounds good, but as the floating-rate PAYER B is RECEIVING fixed, so this is actually favorable",
      "Neutral — the fixed and floating legs always balance out",
      "Favorable — B pays less floating and still receives the higher fixed rate",
      "Unfavorable — B is locked into paying floating when fixed would have been cheaper"
    ],
    correct: 2,
    explanation: "Wait — let's trace through carefully. B pays MIBOR (now 5.00%) and receives fixed 7.50%. Net: B receives 7.50% - 5.00% = 2.50% net inflow. This is favorable for B. The floating-rate payer benefits when rates fall because their floating payments decrease while they continue receiving the higher fixed rate. The swap's MTM becomes positive for B."
  },
  {
    id: 300,
    session: 2,
    topic: "Futures — Arbitrage Enforcement of Fair Value",
    question: "If Nifty futures are trading significantly above their fair value (overpriced), an arbitrageur would:",
    options: [
      "Sell futures and buy the underlying index basket (cash-and-carry arbitrage), locking in a risk-free profit",
      "Buy both futures and the underlying, hoping for convergence",
      "Buy futures and sell the underlying index basket (reverse cash-and-carry)",
      "Sell both futures and the underlying, betting on a market crash"
    ],
    correct: 0,
    explanation: "If futures are overpriced (trading above fair value), the arbitrageur sells the expensive futures and buys the cheap underlying basket. At expiry, futures converge to spot, and the arbitrageur earns the overpricing as risk-free profit. This cash-and-carry arbitrage forces futures back toward fair value. Reverse cash-and-carry applies when futures are underpriced (below fair value)."
  },
  {
    id: 301,
    session: 2,
    topic: "Futures — Cash-and-Carry Arbitrage Profit",
    question: "Nifty spot = 23,151 and fair futures = 23,214. If actual Nifty futures trade at 23,350 (overpriced by 136 points), an arbitrageur who sells futures and buys the index basket locks in a risk-free profit per unit of approximately:",
    options: [
      "Rs.63 (the normal basis)",
      "Rs.199 (the total difference between actual futures and spot)",
      "Rs.136 (the mispricing above fair value)",
      "Rs.0 (arbitrage opportunities don't exist in efficient markets)"
    ],
    correct: 2,
    explanation: "The risk-free profit equals the mispricing above fair value: 23,350 - 23,214 = Rs.136 per unit. The normal basis of 63 points reflects the legitimate cost of carry and is not profit — it compensates for the interest cost of holding the underlying minus dividends. Only the excess above fair value (136 points) represents arbitrage profit, before transaction costs."
  },
  {
    id: 302,
    session: 5,
    topic: "Binomial — dt Calculation",
    question: "In a 2-step binomial tree with T = 18 days (0.0493 years), the time step dt is:",
    options: [
      "0.0493 years (same as T)",
      "9 days (= 18/2)",
      "0.02466 years (= T/number of steps)",
      "0.09863 years (= T × 2)"
    ],
    correct: 2,
    explanation: "dt = T / number of steps = 0.0493 / 2 = 0.02466 years (approximately 9 days). Each step represents one time interval in the tree. With 2 steps, the option's 18-day life is divided into two 9-day intervals. The up/down factors and risk-neutral probabilities are all calibrated to this dt value: u = e^(σ×√dt), ensuring volatility scales correctly per step."
  },
  {
    id: 303,
    session: 6,
    topic: "BSM — Sensitivity to Spot Price",
    question: "If Nifty moves from 23,151 to 23,251 (a 100-point increase) and a 23,200 Call has delta = 0.537 and gamma = 0.000350, the estimated new option price (if original was Rs.450) is:",
    options: [
      "Rs.450 (unchanged)",
      "Rs.503.70 (delta contribution only)",
      "Rs.505.45 (delta + gamma contributions: 53.70 + 1.75)",
      "Rs.485.00 (delta is subtracted, not added)"
    ],
    correct: 2,
    explanation: "ΔC ≈ Delta × ΔS + 0.5 × Gamma × (ΔS)² = 0.537 × 100 + 0.5 × 0.000350 × 100² = 53.70 + 1.75 = Rs.55.45. New price ≈ 450 + 55.45 = Rs.505.45. The gamma term (Rs.1.75) captures the convexity — delta itself changes as the underlying moves, causing the actual price change to exceed the linear delta estimate. This second-order correction becomes more important for larger moves."
  },
  {
    id: 304,
    session: 1,
    topic: "Derivatives — Speculation Function",
    question: "Speculators are important in derivatives markets because they:",
    options: [
      "Are mandated by SEBI to maintain minimum open interest levels",
      "Reduce market volatility by always buying when prices fall",
      "Provide liquidity by taking the other side of hedgers' trades, enabling efficient risk transfer",
      "Only trade in OTC markets, leaving exchange markets for hedgers"
    ],
    correct: 2,
    explanation: "Speculators provide essential liquidity by willingly accepting the risk that hedgers want to shed. Without speculators, hedgers would struggle to find counterparties. For example, when an FII sells Nifty futures to hedge a portfolio, a speculator who is bullish buys those futures. This two-way flow creates deep, liquid markets with tight bid-ask spreads, benefiting all participants."
  },
  {
    id: 305,
    session: 3,
    topic: "Swap — Tenor and Payment Count",
    question: "A 3-year IRS with semi-annual payments involves a total of how many payment exchanges?",
    options: [
      "6 payments",
      "3 payments",
      "12 payments",
      "36 payments"
    ],
    correct: 0,
    explanation: "3 years × 2 payments per year (semi-annual) = 6 payment periods. At each semi-annual date, the fixed and floating legs are compared and the net difference is settled. In the textbook's example, 6 MIBOR rates are entered across the 6 periods to calculate the full cash flow profile of the swap."
  },
  {
    id: 306,
    session: 4,
    topic: "Options — Intrinsic Value Cannot Be Negative",
    question: "Intrinsic value of an option is defined as max(S-K, 0) for calls and max(K-S, 0) for puts. The max(…, 0) ensures that intrinsic value:",
    options: [
      "Can be any positive or negative number",
      "Is always at least zero — an option holder would never exercise at a loss",
      "Equals the full premium at all times",
      "Is only calculated at expiry, never before"
    ],
    correct: 1,
    explanation: "The max(…, 0) function ensures intrinsic value is never negative. An option holder has the RIGHT to exercise — they would simply not exercise if it means a loss (e.g., exercising a 23,200 call when Nifty is at 22,900 would mean paying 23,200 for something worth 22,900). The worst intrinsic value is zero, corresponding to an OTM or ATM option."
  },
  {
    id: 307,
    session: 7,
    topic: "Delta Hedging — Continuous vs. Discrete",
    question: "BSM assumes continuous delta hedging (rebalancing at every instant). In practice, market makers rebalance discretely (e.g., every few minutes). The cost of this discrete rebalancing is called:",
    options: [
      "Basis risk",
      "The CSA margin requirement",
      "The contango cost",
      "Hedging slippage or discrete rebalancing error, driven by gamma"
    ],
    correct: 3,
    explanation: "Discrete hedging means delta drifts between rebalances as the underlying moves. The magnitude of this drift is proportional to gamma — higher gamma means delta changes faster, creating larger hedging errors between rebalances. This gamma-driven slippage is a real cost for market makers. Near expiry, gamma surges, making discrete hedging increasingly expensive and imprecise."
  },
  {
    id: 308,
    session: 2,
    topic: "Futures — Open Interest Definition",
    question: "Open interest in a futures contract represents:",
    options: [
      "The total number of outstanding contracts that have not been closed or delivered",
      "The total number of contracts traded during the day (volume)",
      "The number of new orders placed but not yet matched",
      "The total contract value of all positions in the market"
    ],
    correct: 0,
    explanation: "Open interest counts the total number of contracts that are currently open (one long + one short = one unit of OI). It increases when a new buyer and seller both open fresh positions, and decreases when both close existing positions. Unlike volume (which measures trading activity during a day), OI measures the total outstanding commitment in the market and is used to gauge the strength of trends."
  },
  {
    id: 309,
    session: 6,
    topic: "BSM — Log Return in d1",
    question: "The ln(S/K) term in the d1 formula equals zero when the option is exactly ATM (S = K). For an ATM option, d1 simplifies to:",
    options: [
      "d1 = 0 (since ln(1) = 0 and all other terms vanish)",
      "d1 = σ × √T",
      "d1 = (r + σ²/2) × T / (σ × √T)",
      "d1 = r × T"
    ],
    correct: 2,
    explanation: "When S = K, ln(S/K) = ln(1) = 0. So d1 = [0 + (r + σ²/2) × T] / (σ × √T) = (r + σ²/2) × T / (σ × √T). This simplification shows that ATM d1 depends only on r, σ, and T. For short-dated ATM options with moderate rates, d1 is small and positive, giving delta slightly above 0.50 (which is why ATM call delta ≈ 0.537, not exactly 0.50)."
  },
  {
    id: 310,
    session: 5,
    topic: "Put-Call Parity — European Only",
    question: "Put-call parity holds as an exact equality only for European options. For American options, the relationship becomes:",
    options: [
      "Undefined — no relationship exists for American options",
      "Exactly the same — exercise style doesn't matter",
      "Inverted — the inequality reverses direction",
      "An inequality, because early exercise introduces additional value that breaks the exact balance"
    ],
    correct: 3,
    explanation: "For American options, early exercise can make the put worth more than the European parity value (especially for dividend-paying stocks). This breaks the exact equality into bounds: S - K ≤ C - P ≤ S - K×e^(-rT). Since all Nifty options are European-style, the exact put-call parity equality holds directly, making it a powerful tool for arbitrage detection in Indian markets."
  },
  {
    id: 311,
    session: 1,
    topic: "NSE Clearing — Formerly NSCCL",
    question: "NSE Clearing Limited, which acts as the CCP for NSE-traded derivatives, was formerly known as:",
    options: [
      "CCIL (Clearing Corporation of India Limited)",
      "NSCCL (National Securities Clearing Corporation Limited)",
      "SEBI Clearing Wing",
      "BSE Clearing House"
    ],
    correct: 1,
    explanation: "NSE Clearing Limited was previously called NSCCL (National Securities Clearing Corporation Limited). It acts as the CCP for all trades executed on NSE, including equity, derivatives, and debt segments. After novation, NSE Clearing becomes the counterparty to every trade. CCIL is a separate entity that clears OTC interest rate and forex derivatives, as well as government securities."
  },
  {
    id: 312,
    session: 7,
    topic: "Greeks — Theta Is Negative for Long Options",
    question: "Theta is generally negative for long option positions because:",
    options: [
      "The underlying asset depreciates over time",
      "Implied volatility always decreases as expiry nears",
      "The exchange charges a daily holding fee on long option positions",
      "Time value decays as expiry approaches — each passing day reduces the probability of favorable price moves"
    ],
    correct: 3,
    explanation: "Time value represents the probability that favorable price moves will occur before expiry. Each day that passes with no significant move reduces this probability, eroding time value. An ATM Nifty option losing Rs.14.6/day (Rs.949/lot) reflects this daily probability shrinkage. Theta accelerates near expiry because the remaining time value must decay to zero in fewer days."
  },
  {
    id: 313,
    session: 3,
    topic: "IRS — All-In Borrowing Cost Through Swap",
    question: "Company B has a floating loan at MIBOR + 1.00%. It enters a swap paying fixed 7.60% to a dealer and receiving MIBOR. Company B's all-in fixed borrowing cost is:",
    options: [
      "7.60%",
      "MIBOR + 1.00%",
      "6.60% (= 7.60% - 1.00%)",
      "8.60% (= 7.60% + 1.00%)"
    ],
    correct: 3,
    explanation: "B's all-in cost = Original loan + Swap payments - Swap receipts = (MIBOR + 1.00%) + 7.60% - MIBOR = 8.60% fixed. The MIBOR components cancel out (paid on loan, received from swap), leaving 7.60% + 1.00% = 8.60% as the effective fixed rate. Through the swap, B has converted its floating obligation into a fixed one, protecting against rising rates."
  },
  {
    id: 314,
    session: 4,
    topic: "Short Straddle — Worst Case",
    question: "A short straddle at strike 23,200 (total premium Rs.830) faces maximum loss when:",
    options: [
      "Nifty makes an extremely large move in either direction — theoretically unlimited loss on the call side if Nifty rallies sharply",
      "Nifty expires exactly at 23,200",
      "Nifty expires at either breakeven point (22,370 or 24,030)",
      "India VIX drops below 10"
    ],
    correct: 0,
    explanation: "The short straddle faces theoretically unlimited loss on the upside (short call with no cap) and loss up to (K - Premium) = 22,370 on the downside (short put). The worst case is a massive rally — since the short call has unlimited loss potential, this is the most dangerous direction. The Barings case demonstrated exactly this: Leeson's short straddles faced catastrophic losses when the Nikkei moved violently."
  },
  {
    id: 315,
    session: 6,
    topic: "IV — Forward Looking vs. Backward Looking",
    question: "Historical volatility (HV) and implied volatility (IV) differ fundamentally because:",
    options: [
      "HV is always higher than IV",
      "HV is backward-looking (based on past prices) while IV is forward-looking (derived from current option prices reflecting market expectations)",
      "IV is always higher than HV",
      "They are calculated using the same method but different data frequencies"
    ],
    correct: 1,
    explanation: "HV looks backward — it measures the realized standard deviation of past log returns (e.g., last 30 or 252 trading days). IV looks forward — it is the volatility the market is willing to pay for, reflecting expectations of future moves. The gap between IV and HV provides trading signals: IV > HV suggests options are expensive (sell); HV > IV suggests options are cheap (buy)."
  },
  {
    id: 316,
    session: 2,
    topic: "Hedge — Reducing Beta to Target",
    question: "A portfolio manager has a portfolio with beta = 1.15 and wants to reduce the effective beta to 0.50 (partial hedge). The hedge ratio to apply is:",
    options: [
      "0.65 (= 1.15 - 0.50, the beta to be removed via selling futures)",
      "1.15 (the current beta)",
      "0.50 (the target beta)",
      "1.65 (= 1.15 + 0.50)"
    ],
    correct: 0,
    explanation: "To reduce beta from 1.15 to 0.50, the manager needs to sell futures equivalent to a hedge ratio of (1.15 - 0.50) = 0.65. Number of contracts = (0.65 × Portfolio Value) / (Futures Price × Lot Size). This partial hedge retains some market exposure (beta = 0.50) while removing the excess sensitivity. A full hedge would use hedge ratio = 1.15 (reducing beta to zero)."
  },
  {
    id: 317,
    session: 5,
    topic: "Binomial — Why Risk-Neutral Pricing Works",
    question: "Risk-neutral pricing produces the correct market price because:",
    options: [
      "All investors in the real world are actually risk-neutral",
      "Exchanges enforce risk-neutral pricing through margin requirements",
      "Risk-neutral probabilities are calibrated from historical return data",
      "The option payoff can be perfectly replicated using the underlying and risk-free bonds, making real-world probabilities irrelevant for pricing"
    ],
    correct: 3,
    explanation: "Since a portfolio of Δ shares plus risk-free lending can exactly replicate any option payoff, the option and its replicating portfolio must have the same price (no-arbitrage). This replication works regardless of investors' risk preferences. The risk-neutral probability is simply the mathematical construct that, combined with risk-free discounting, produces the same price as the replication argument."
  },
  {
    id: 318,
    session: 1,
    topic: "Weekly Expiry — Tuesday for Nifty",
    question: "After SEBI's reforms, Nifty weekly options on NSE expire every:",
    options: [
      "Monday",
      "Wednesday",
      "Tuesday",
      "Thursday"
    ],
    correct: 2,
    explanation: "Nifty 50 weekly options on NSE expire every Tuesday. BSE's Sensex weekly options expire on Thursdays. This was established after SEBI's November 2024 reforms limiting weekly expiries to one benchmark index per exchange. The Tuesday expiry for Nifty is a departure from the pre-reform system where multiple indices had weekly expiries on different days."
  },
  {
    id: 319,
    session: 7,
    topic: "Strategy — Bull Put Spread",
    question: "A bull put spread is constructed by selling a higher-strike put and buying a lower-strike put. The maximum profit equals:",
    options: [
      "Unlimited, since puts have limited downside risk",
      "The width of the spread minus the net premium",
      "The net premium received (when both puts expire OTM above the higher strike)",
      "The premium of the long put only"
    ],
    correct: 2,
    explanation: "The bull put spread collects net premium upfront (the higher-strike put sells for more than the lower-strike put costs). Maximum profit = net premium received, earned when the underlying expires above the higher strike and both puts expire worthless. Maximum loss = width of spread - net premium, occurring when the underlying expires below the lower strike."
  },
  {
    id: 320,
    session: 3,
    topic: "Swap — Mark-to-Market Changes Over Time",
    question: "An IRS that was zero-value at inception can become a significant asset or liability over time if:",
    options: [
      "The notional principal is reduced by mutual agreement",
      "The swap dealer exits the intermediation",
      "Market interest rates move significantly away from the original fixed rate",
      "Both parties switch from semi-annual to quarterly payments"
    ],
    correct: 2,
    explanation: "At inception, the swap has zero value. Over time, as market rates move, the swap develops positive MTM for one party and negative for the other. A 1% rate rise on a Rs.10 crore, 3-year swap can create an MTM of Rs.10+ lakh. The textbook's example shows rates rising from 7.50% to 8.50%, producing a +Rs.10.3 lakh MTM for the fixed payer."
  },
  {
    id: 321,
    session: 6,
    topic: "Skew — Crash Insurance Demand",
    question: "After events like COVID-2020 or Adani-2023, OTM put IV typically:",
    options: [
      "Decreases because the crash has already occurred",
      "Spikes dramatically while call IV barely moves, steepening the volatility skew",
      "Increases equally across all strikes (parallel shift)",
      "Drops to zero as puts are exercised and cease to exist"
    ],
    correct: 1,
    explanation: "After crash events, demand for OTM puts surges as investors scramble for downside protection, dramatically spiking put IV. Call IV barely moves because rallies after crashes are gradual. This asymmetric IV response steepens the skew — for example, OTM puts might jump from 25% to 45% IV while ATM only moves from 22% to 28%. This 'fear premium' in puts can persist for weeks after the event."
  },
  {
    id: 322,
    session: 4,
    topic: "Payoff Diagram — Short Call Shape",
    question: "The payoff diagram of a short call at expiry shows:",
    options: [
      "An upward-sloping line from left to right across all prices",
      "A V-shape centered at the strike",
      "A flat line at (+Premium) below the strike, then a downward-sloping line above the strike descending without limit",
      "A horizontal line at (-Premium) for all spot prices"
    ],
    correct: 2,
    explanation: "Below the strike, the short call expires worthless and the writer keeps the full premium (flat line at +Premium). Above the strike, losses mount linearly as the underlying rises (the writer must sell at the strike while the market price is higher). The breakeven is at (Strike + Premium). Above that, losses are theoretically unlimited — this makes naked short calls the riskiest position in options."
  },
  {
    id: 323,
    session: 2,
    topic: "Futures Pricing — Zero Dividend Simplification",
    question: "For a commodity futures contract with no income yield (q = 0) and no storage costs, the cost-of-carry formula simplifies to:",
    options: [
      "F = S × e^(-rT)",
      "F = S × e^(rT)",
      "F = S × (1 - r × T)",
      "F = S (futures always equal spot)"
    ],
    correct: 1,
    explanation: "With q = 0: F = S × e^((r - 0) × T) = S × e^(rT). The futures price exceeds spot by the pure interest carry cost. This is the simplest form of the cost-of-carry model — the futures price reflects only the time value of money. Adding dividends (q > 0) reduces this premium; adding storage costs (u > 0) increases it."
  },
  {
    id: 324,
    session: 7,
    topic: "Vega — Option Sellers' Risk",
    question: "A trader who has sold (written) ATM Nifty options has negative vega. This means that if India VIX suddenly spikes from 22 to 35, the trader will:",
    options: [
      "Profit because higher volatility benefits option sellers",
      "Face significant losses as option prices surge with the volatility spike",
      "Be unaffected because vega only matters for long positions",
      "Receive additional margin credit from the exchange"
    ],
    correct: 1,
    explanation: "Negative vega means the position loses money when IV rises. A 13-percentage-point spike in IV (22% → 35%) multiplied by portfolio vega can produce enormous losses. For a short ATM call with vega = 20.34 per unit: loss ≈ 20.34 × 13 = Rs.264 per unit, or Rs.264 × 65 = Rs.17,160 per lot — just from the volatility move alone, before any delta or theta effects."
  },
  {
    id: 325,
    session: 1,
    topic: "Exchange-Traded vs. OTC — Settlement",
    question: "Exchange-traded futures settle daily via mark-to-market, while most OTC derivatives (like plain-vanilla IRS) settle:",
    options: [
      "Weekly, through the ISDA settlement cycle",
      "Daily, exactly like exchange-traded futures",
      "Only in the event of default",
      "At periodic intervals (e.g., semi-annually for IRS) or at maturity"
    ],
    correct: 3,
    explanation: "OTC derivatives like IRS settle at predefined periodic intervals (semi-annually, quarterly) or at maturity. They do not have daily MTM cash settlement like exchange-traded futures. However, the MTM value is tracked for collateral purposes under the CSA, and margin calls may occur if the MTM exceeds collateral thresholds. Central clearing through CCIL adds more frequent margining for standard INR OIS."
  },
  {
    id: 326,
    session: 5,
    topic: "Binomial — Practical Use Beyond Pricing",
    question: "Beyond pricing European options, binomial trees are particularly useful for pricing:",
    options: [
      "American options, where early exercise must be checked at each node",
      "Exchange-traded funds (ETFs) with daily NAV calculations",
      "Fixed-income bonds with known coupon rates",
      "Currency forwards with fixed settlement dates"
    ],
    correct: 0,
    explanation: "Binomial trees excel at pricing American options because at each node you can compare the exercise value with the continuation value and take the maximum. BSM cannot handle early exercise directly (it prices only European options). The tree's node-by-node backward induction naturally accommodates the early exercise decision, making it the go-to model for American puts and calls on dividend-paying stocks."
  },
  {
    id: 327,
    session: 3,
    topic: "Swap — CCIL vs. Bilateral CSA",
    question: "The key advantage of CCIL-cleared OIS over bilateral CSA-governed swaps is that CCIL clearing:",
    options: [
      "Allows higher notional amounts than bilateral swaps",
      "Removes the need for any collateral or margin posting",
      "Virtually eliminates counterparty risk by interposing CCIL as the CCP",
      "Converts the OIS from floating to fixed automatically"
    ],
    correct: 2,
    explanation: "When CCIL clears an OIS, it becomes the counterparty to both sides (similar to NSE Clearing for exchange-traded derivatives), virtually eliminating counterparty credit risk. Under bilateral CSAs, each party must assess and monitor the other's creditworthiness and negotiate collateral terms individually. CCIL's standardized margining and default fund provide institutional-grade credit protection."
  },
  {
    id: 328,
    session: 6,
    topic: "BSM — Why d1 > d2 Always",
    question: "d1 is always greater than d2 because d2 = d1 - σ√T, and σ√T is always:",
    options: [
      "Positive (both volatility and time are positive quantities)",
      "Zero for ATM options",
      "Negative for short-dated options",
      "Dependent on whether the option is ITM or OTM"
    ],
    correct: 0,
    explanation: "Since σ > 0 and T > 0, the product σ√T is always positive. Therefore d2 = d1 - (positive number), making d1 always greater than d2. This means N(d1) > N(d2), which makes financial sense: the call delta N(d1) exceeds the risk-neutral probability of exercise N(d2) because delta also accounts for the amount by which the call finishes ITM, not just whether it does."
  },
  {
    id: 329,
    session: 4,
    topic: "Options — Time Value Peaks at ATM",
    question: "At-the-money options have the highest time value because:",
    options: [
      "ATM options have the highest intrinsic value",
      "Maximum uncertainty exists about whether ATM options will expire ITM or OTM, so the probability premium is highest",
      "Exchanges charge the highest premiums for ATM options",
      "ATM options have the longest time to expiry"
    ],
    correct: 1,
    explanation: "ATM options sit right on the boundary between expiring ITM and OTM. This maximum uncertainty means there is the greatest 'optionality' — the highest probability that future price moves could push the option into profitable territory. Deep ITM options are almost certain to expire ITM (low uncertainty, low time value), and deep OTM options are almost certain to expire worthless (also low uncertainty, low time value)."
  },
  {
    id: 330,
    session: 7,
    topic: "Strategy — When to Use Iron Condor vs. Straddle",
    question: "An iron condor is preferred over a short straddle when the trader wants:",
    options: [
      "Capped maximum loss (defined risk) rather than the unlimited risk of a short straddle",
      "Maximum premium income with unlimited risk exposure",
      "Exposure to large directional moves",
      "To trade only one leg instead of multiple legs"
    ],
    correct: 0,
    explanation: "Both strategies profit from range-bound markets, but they differ in risk profile. A short straddle earns more premium but has theoretically unlimited loss (naked short call). An iron condor earns less premium (some is spent on protective wings) but caps the maximum loss at the width of the spread minus the premium. The iron condor's defined risk makes it more suitable for risk-averse range traders."
  },
  {
    id: 331,
    session: 2,
    topic: "Hedge — Impact of Beta Less Than 1",
    question: "A portfolio with beta = 0.70 is hedged using Nifty futures. Compared to a beta = 1.0 portfolio of the same value, this portfolio requires:",
    options: [
      "30% fewer futures contracts, because the portfolio is less sensitive to market moves",
      "30% more futures contracts",
      "The same number of contracts regardless of beta",
      "Exactly 70% of the initial margin but the same number of contracts"
    ],
    correct: 0,
    explanation: "With beta = 0.70, the portfolio moves only 70% as much as Nifty for each 1% index move. Therefore, fewer futures contracts are needed to offset this smaller sensitivity. Contracts = (0.70 × Portfolio Value) / (Futures Price × Lot Size), which is 30% less than the beta = 1.0 case. Overhedging a low-beta portfolio with the full notional ratio would create a net short position."
  },
  {
    id: 332,
    session: 1,
    topic: "Derivatives — Types of Underlyings",
    question: "India VIX is a volatility index that can itself serve as the underlying for derivatives. A high India VIX value indicates:",
    options: [
      "Low expected market volatility and cheap option premiums",
      "That FII buying activity has increased significantly",
      "That the Nifty index is at an all-time high",
      "High expected near-term volatility based on Nifty option prices"
    ],
    correct: 3,
    explanation: "India VIX measures the market's expectation of near-term volatility derived from Nifty option prices. A high VIX (e.g., 86.6 during COVID crash) signals fear and high expected price swings. A low VIX (e.g., 8.7 in late 2024) indicates complacency and calm expectations. VIX is computed using the CBOE methodology adapted for Indian markets and closely tracks ATM implied volatility."
  },
  {
    id: 333,
    session: 5,
    topic: "Put-Call Parity — Synthetic Put",
    question: "Using put-call parity, a synthetic long put can be created by:",
    options: [
      "Buying a call, selling the underlying, and lending K×e^(-rT) at the risk-free rate",
      "Buying both a call and the underlying",
      "Selling a call and buying the underlying",
      "Buying two calls at different strikes"
    ],
    correct: 0,
    explanation: "From C + K×e^(-rT) = P + S: rearranging, P = C - S + K×e^(-rT). This means: buy a call (C), sell/short the underlying (-S), and invest K×e^(-rT) at the risk-free rate. This combination replicates the put's payoff exactly. If the actual put is mispriced relative to this synthetic, an arbitrage opportunity exists."
  },
  {
    id: 334,
    session: 6,
    topic: "Volatility — Term Structure",
    question: "If 30-day Nifty ATM IV is 22% and 90-day ATM IV is 18%, the volatility term structure is said to be:",
    options: [
      "Flat — all maturities have the same IV",
      "Inverted — near-term IV exceeds longer-term IV, suggesting elevated short-term uncertainty",
      "Normal — longer-dated IV exceeds shorter-dated IV",
      "Undefined — IV cannot vary across maturities"
    ],
    correct: 1,
    explanation: "When near-term IV exceeds longer-term IV, the term structure is inverted. This typically occurs during periods of acute market stress — an upcoming event (elections, RBI policy, geopolitical crisis) inflates near-term expectations while longer-term expectations remain more moderate. A normal term structure has longer-dated IV slightly higher than near-dated, reflecting the greater uncertainty over longer horizons."
  },
  {
    id: 335,
    session: 3,
    topic: "Currency Swap — Semi-Annual USD Receipt",
    question: "In the textbook's currency swap ($10M at 6.00%), the semi-annual USD receipt is $3,00,000. At the inception exchange rate of 92.50, this equals approximately:",
    options: [
      "Rs.27.75 lakh",
      "Rs.1.85 crore",
      "Rs.2.78 crore",
      "Rs.3.00 crore"
    ],
    correct: 2,
    explanation: "USD semi-annual receipt = $10M × 6.00% × 0.5 = $3,00,000. Converting at the swap rate: $3,00,000 × 92.50 = Rs.2,77,50,000 ≈ Rs.2.78 crore. However, in the actual swap, the company receives USD (not INR) and uses it to service the ECB interest. The INR equivalent is illustrative — the swap eliminates FX risk precisely because the company pays and receives in its respective required currencies."
  },
  {
    id: 336,
    session: 7,
    topic: "Delta — Deep OTM Call",
    question: "A Nifty 25,000 Call when Nifty is at 23,200 (1,800 points OTM) has delta approximately equal to:",
    options: [
      "-0.50 — OTM calls have negative delta",
      "0.50 — same as all call options",
      "Close to 1.0 — deep OTM calls have the highest delta",
      "Close to 0 — the call is very unlikely to expire ITM and barely moves with the underlying"
    ],
    correct: 3,
    explanation: "A 1,800-point OTM call has very low probability of expiring ITM, so its delta is close to zero (perhaps 0.05-0.10). The option barely moves with small changes in Nifty. Its entire value consists of a small time value representing the low probability of a massive rally. This low delta also means the option offers very high leverage — if Nifty does rally to 25,000, the percentage gain on the option is enormous."
  },
  {
    id: 337,
    session: 4,
    topic: "Options — Writer Premium as Compensation",
    question: "An option writer receives the premium as compensation for:",
    options: [
      "The administrative cost of processing the trade on the exchange",
      "The time spent analyzing the market before writing the option",
      "Accepting the obligation and risk of the contract — the premium is the price of the risk transfer",
      "Future dividends the writer will miss by holding the option position"
    ],
    correct: 2,
    explanation: "The premium is the market-determined price of risk transfer. The buyer pays for the right to exercise; the writer receives payment for accepting the obligation and its associated risk. The premium reflects the option's intrinsic value (if any), time value (probability of favorable moves), and implied volatility (market's risk assessment). Higher risk = higher premium demanded by writers."
  },
  {
    id: 338,
    session: 2,
    topic: "Hedge — Short Futures P&L Direction",
    question: "An FII short-hedges their portfolio by selling 25 Nifty futures at 23,200. If Nifty falls to 22,500, the futures P&L is:",
    options: [
      "A loss of Rs.11,37,500 (short seller loses when prices fall)",
      "Zero — futures are settled only at expiry",
      "A profit of Rs.45,50,000",
      "A profit of Rs.11,37,500 (= (23,200 - 22,500) × 65 × 25), because the short seller profits when prices fall"
    ],
    correct: 3,
    explanation: "Short futures profit when prices fall: P&L = (Entry - Exit) × Lot Size × Contracts = (23,200 - 22,500) × 65 × 25 = 700 × 65 × 25 = Rs.11,37,500 profit. This gain offsets the portfolio's loss from the market decline, which is the purpose of the hedge. If Nifty had risen instead, the futures would generate a loss, offsetting the portfolio's gain."
  },
  {
    id: 339,
    session: 6,
    topic: "BSM — All Five Inputs",
    question: "The BSM model requires exactly five inputs. These are:",
    options: [
      "S, K, r, T, and the number of trading days until expiry",
      "S, K, r, dividend history, and trading volume",
      "S, K, sigma, open interest, and PCR",
      "S (spot), K (strike), r (risk-free rate), σ (volatility), T (time to expiry)"
    ],
    correct: 3,
    explanation: "BSM requires five inputs: S (current spot price), K (strike price), r (risk-free rate, continuously compounded), σ (annualized volatility), and T (time to expiry in years). Of these, four are directly observable (S, K, r, T). Only σ is unobservable — which is why implied volatility (the σ that makes BSM match the market price) is such an important concept."
  },
  {
    id: 340,
    session: 1,
    topic: "MTM — Top-Up Frequency",
    question: "A margin call triggered on Day 5 evening requires the trader to deposit the top-up amount:",
    options: [
      "Within 30 days, at the end of the month",
      "Within one hour during the next trading session",
      "Before trading begins on Day 6 — overnight top-up is mandatory",
      "No specific deadline — the broker sends periodic reminders"
    ],
    correct: 2,
    explanation: "The top-up must be deposited before the next trading day begins. If the trader fails to deposit, the broker may forcibly close (square off) the position to limit further losses. This overnight settlement cycle ensures that margin accounts are adequately funded at the start of each trading day. In practice, brokers may issue margin calls even intraday if real-time margins spike significantly."
  },
  {
    id: 341,
    session: 7,
    topic: "Portfolio Greeks — Delta Hedge Example",
    question: "A portfolio has: Long 5 lots 23,200 Call (delta 0.537), Short 3 lots 23,500 Call (delta 0.35), Long 4 lots 23,000 Put (delta -0.40). With lot size 65, the portfolio delta is: (5×65×0.537) + (-3×65×0.35) + (4×65×(-0.40)) =",
    options: [
      "+174.5 + (-68.25) + (-104) = +2.25 (nearly delta neutral)",
      "+174.5 + (-68.25) + (-104) = +106.25 (bullish bias)",
      "+174.5 + 68.25 - 104 = +138.75 (strongly bullish)",
      "+174.5 - 68.25 - 104 = +2.25 (nearly delta neutral)"
    ],
    correct: 3,
    explanation: "Portfolio delta = (5×65×0.537) + (-3×65×0.35) + (4×65×(-0.40)) = 174.525 - 68.25 - 104.00 = +2.275. This is nearly delta-neutral (close to zero), meaning the portfolio is almost insensitive to small Nifty moves. To achieve exact delta neutrality, the trader could sell approximately 2.3/65 ≈ 0.035 lots of Nifty futures (practically, no adjustment needed for such a small residual)."
  },
  {
    id: 342,
    session: 5,
    topic: "Put-Call Parity — Why It Matters for Exam",
    question: "Put-call parity is considered a 'fundamental pricing relationship' because it holds regardless of:",
    options: [
      "The risk-free rate, volatility, or time to expiry",
      "The exchange on which the options are traded",
      "Whether the options are in-the-money or out-of-the-money",
      "Any particular option pricing model — it is derived purely from no-arbitrage arguments"
    ],
    correct: 3,
    explanation: "Put-call parity is model-independent — it doesn't require BSM or binomial assumptions. It follows purely from no-arbitrage: two portfolios with identical payoffs at expiry must have the same price today. This makes it more robust than any specific pricing model. Whether you believe in BSM or not, violating put-call parity creates risk-free arbitrage, which markets eliminate quickly."
  },
  {
    id: 343,
    session: 3,
    topic: "IRS — Notional as Reference Only",
    question: "In a Rs.10 crore notional IRS, the maximum amount that changes hands on any single payment date is:",
    options: [
      "Rs.10 crore (the full notional)",
      "Rs.1 crore (10% of notional)",
      "Rs.5 crore (half the notional)",
      "The net interest differential — typically Rs.2-5 lakh (a tiny fraction of notional)"
    ],
    correct: 3,
    explanation: "Since only the net difference between fixed and floating payments is settled, the actual cash flow is small relative to the notional. In the textbook's example: Period 1 net = Rs.2,46,575 and Period 2 net = Rs.4,93,151 — both under Rs.5 lakh against a Rs.10 crore notional. This low actual exposure (despite large notional) is why IRS notional amounts are often very large (Rs.100+ crore for institutional deals)."
  },
  {
    id: 344,
    session: 6,
    topic: "Volatility Skew — Put Skew Premium",
    question: "A trader sells a Nifty 22,500 Put (700 points OTM, IV ≈ 25%) and buys a Nifty 23,900 Call (700 points OTM, IV ≈ 19%). Even though both are equidistant from ATM, the put premium will be higher because:",
    options: [
      "The put has a higher strike price",
      "The higher IV on the OTM put (25% vs. 19%) makes its premium larger despite equal distance from ATM",
      "Puts always cost more than calls regardless of moneyness",
      "The put is American-style while the call is European-style"
    ],
    correct: 1,
    explanation: "The volatility skew means OTM puts are priced at higher IV (25%) than equidistant OTM calls (19%). Since option premiums increase with IV (via vega), the put commands a higher premium. This 'skew premium' of ~6 percentage points compensates put sellers for the asymmetric crash risk. A risk reversal trader (sell put, buy call) can capture this IV differential."
  },
  {
    id: 345,
    session: 4,
    topic: "Barings — Leeson's Role",
    question: "Nick Leeson's age when the Barings Bank collapse occurred in 1995 was approximately:",
    options: [
      "28 years old",
      "22 years old",
      "35 years old",
      "42 years old"
    ],
    correct: 0,
    explanation: "Nick Leeson was a 28-year-old trader at Barings Futures Singapore. Despite his young age and relatively junior position, he managed to accumulate losses of GBP 827 million — more than twice the bank's equity — because of a critical operational failure: he controlled both the front office (trading) and back office (settlement), allowing him to conceal unauthorized positions in a secret error account."
  },
  {
    id: 346,
    session: 2,
    topic: "Futures — Why MTM Distinguishes from Forwards",
    question: "Daily MTM settlement in futures (but not forwards) serves the critical purpose of:",
    options: [
      "Generating transaction fees for the exchange",
      "Ensuring profits are distributed equally among all market participants",
      "Allowing traders to change their position from long to short daily",
      "Preventing the accumulation of large unrealized losses that could lead to default at expiry"
    ],
    correct: 3,
    explanation: "Without daily MTM, a losing position could accumulate massive unrealized losses by expiry, increasing the probability of default. Daily cash settlement forces losing positions to fund their losses continuously, ensuring the CCP always has adequate collateral. This is the fundamental credit risk management mechanism that makes exchange-traded futures virtually default-free, unlike forwards where losses only crystallize at maturity."
  },
  {
    id: 347,
    session: 7,
    topic: "Max Pain — Not a Guarantee",
    question: "The textbook describes max pain as:",
    options: [
      "A guaranteed price target that market makers always achieve by expiry",
      "The strike price where option buyers make the maximum profit",
      "A sentiment indicator, not a guaranteed price target, suggesting where market makers may have incentive to push spot near expiry",
      "The strike with the lowest open interest"
    ],
    correct: 2,
    explanation: "Max pain is a sentiment indicator based on the theory that market makers (who are net short options) benefit from spot converging to the price where total option payouts are minimized. However, it is NOT a guaranteed outcome — large directional flows, news events, and institutional positioning can easily override any max pain gravitational pull. Traders should use it as one input among many, not as a standalone trading signal."
  },
  {
    id: 348,
    session: 1,
    topic: "Derivatives — Nifty as Underlying",
    question: "Nifty 50 is the most actively traded underlying for derivatives in India. It is:",
    options: [
      "A single stock that represents the entire Indian market",
      "A fixed basket of 50 government bonds",
      "A diversified index of 50 large-cap stocks across multiple sectors",
      "An exchange-traded fund that can be directly bought and sold"
    ],
    correct: 2,
    explanation: "Nifty 50 is a market-capitalization-weighted index of 50 large-cap companies across 13 sectors, maintained by NSE Indices (formerly IISL). It serves as the benchmark for Indian equity markets and the most liquid underlying for derivatives. Nifty futures and options dominate NSE's derivatives turnover. The index itself cannot be bought directly — you trade it through futures, options, or ETFs that replicate it."
  },
  {
    id: 349,
    session: 6,
    topic: "BSM — Put Price from Call via Parity",
    question: "A more efficient way to price a European put (instead of running BSM with N(-d1) and N(-d2)) is to:",
    options: [
      "Use the same BSM call formula with negative inputs",
      "Price the call first using BSM, then derive the put via put-call parity: P = C - S×e^(-qT) + K×e^(-rT)",
      "Simply subtract the call price from the strike price",
      "Use the American put pricing model instead"
    ],
    correct: 1,
    explanation: "Since put-call parity guarantees an exact relationship, you can price the call using BSM (with N(d1) and N(d2)), then compute P = C - S×e^(-qT) + K×e^(-rT). This avoids separate N(-d1) and N(-d2) calculations and ensures the call and put prices are perfectly consistent with each other. This approach is standard in practice and eliminates potential rounding errors from separate BSM runs."
  },
  {
    id: 350,
    session: 3,
    topic: "Swap — Symmetry of MTM",
    question: "If the fixed-rate payer's swap MTM is +Rs.10.3 lakh, the floating-rate payer's MTM on the same swap is:",
    options: [
      "-Rs.10.3 lakh (the swap is a zero-sum contract between the two parties)",
      "+Rs.10.3 lakh (both benefit from rate changes)",
      "Rs.0 (the swap dealer absorbs all gains and losses)",
      "-Rs.5.15 lakh (the loss is split between the floating payer and the dealer)"
    ],
    correct: 0,
    explanation: "An IRS is a zero-sum contract: one party's gain is exactly the other's loss. If market rates rising creates a +Rs.10.3 lakh MTM for the fixed payer (who is paying below-market rates), the floating payer has a -Rs.10.3 lakh MTM (they are receiving below-market fixed while paying higher floating). The swap dealer's separate spread is accounted for in the dealer-intermediated version."
  }
];


// ============================================================
// DO NOT MODIFY ANYTHING BELOW THIS LINE
// ============================================================

// Utility: Get n random questions from the pool, balanced across sessions
export function getRandomQuestions(n = 20, excludeIds = new Set()) {
  // Filter out previously seen questions (for re-attempts)
  let pool = questions;
  if (excludeIds.size > 0) {
    pool = questions.filter(q => !excludeIds.has(q.id));
    if (pool.length < n) {
      pool = questions;
    }
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const sessions = [...new Set(pool.map(q => q.session))].sort();
  const perSession = Math.floor(n / sessions.length);

  const selected = [];
  const bySession = {};

  for (const q of shuffled) {
    if (!bySession[q.session]) bySession[q.session] = [];
    bySession[q.session].push(q);
  }

  for (const s of sessions) {
    const sessionPool = bySession[s] || [];
    selected.push(...sessionPool.slice(0, perSession));
  }

  const selectedIds = new Set(selected.map(q => q.id));
  for (const q of shuffled) {
    if (selected.length >= n) break;
    if (!selectedIds.has(q.id)) {
      selected.push(q);
      selectedIds.add(q.id);
    }
  }

  return selected.slice(0, n).sort(() => Math.random() - 0.5).map(q => {
    const optionIndices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    const shuffledOptions = optionIndices.map(i => q.options[i]);
    const newCorrect = optionIndices.indexOf(q.correct);

    return {
      id: q.id,
      session: q.session,
      topic: q.topic,
      question: q.question,
      options: shuffledOptions,
      correct: newCorrect,
      explanation: q.explanation
    };
  });
}

export function getTotalQuestionCount() {
  return questions.length;
}
