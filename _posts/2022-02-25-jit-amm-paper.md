---
layout: post
title: Just In Time AMM: A Novel Protocol Design for Crosschain Swaps
---

**Overview**

Chainflip’s AMM design differs substantially from industry standards due to limitations introduced by the nature of cross-chain transfers. The Chainflip AMM protocol has several distinguishing features which radically alter the optimal liquidity provider strategy and offer significant capital efficiency and pricing accuracy advantages for users. We call this style of AMM a “JIT (Just In Time Liquidity) AMM.” There are very few examples of similar trading products in use today. 

**Background**

Uniswap v3 introduced the concept of range orders into the AMM world, which brought about a number of improvements to the capital efficiency and user experience of many of Uniswap’s most popular pools. Chainflip, as a cross-chain product, does not share the same execution environment assumptions as typical AMMs, and therefore additional features are required to prevent front-running which negatively impacts users. Unlike in a single chain environment, Chainflip must address the following issues:

* The protocol must wait several blocks to confirm external chain deposits, due to the risk of chain reorganisations external to Chainflip. As a decentralised and programmatic system, there is no way to manually reorder transactions if this occurs, and so several block confirmations are needed to operate safely. Given that there is a non-trivial delay to confirm incoming swap deposits, and they are on public chains, all market participants will know the swaps that will be executed before they occur. This leaves the protocol vulnerable to various forms of front-running.
* Furthermore, the confirmation times also cause pricing and arbitrage to be significantly delayed, resulting in prolonged price differences compared to market index prices. This can be observed on other AMM-based cross chain DEXes that have not mitigated this problem, where prices consistently deviate from the market rate by as much as 10%.
* Finally, new proposed features of the AMM would be largely untested in the wild, as existing AMM designs have not been built with custom execution environments in mind and as such there are few examples of protocols with similar properties to derive learnings from.

There is also a unique opportunity to explore the possibilities of AMMs running on a custom execution environment. As Chainflip runs in its own independent execution environment, much of the swap execution can be automated and executed by the validator network without complex user interactions. This should be leveraged to the maximum extent, and new features should be designed to capitalise on this for the benefit of users.

**Just In Time AMM Core Features**

Chainflip offers several new features on top of the existing Uniswap v3 AMM design, which set out to mitigate the aforementioned problems, and leverage the unique advantages afforded by a custom execution environment. The two core features that drive the JIT AMM are:

1. Faster-than-swap Range Order Updates - Range Orders can be updated before known swaps are executed, meaning market makers can actively respond to incoming trade flow.
2. Swap Batching - Swaps are grouped together and executed periodically, cancelling out a lot of slippage, and rendering trade frontrunning unprofitable.

These features are implemented directly in the Chainflip State Chain and accompanying software that Chainflip Validators run. 

**How JIT works**

The core concept that drives the JIT AMM design is to flip frontrunning on it’s head. Instead of users being frontrun by MEV seeking bots, the protocol naturally incentivises liquidity providers to frontrun each other to the benefit of the user. Several months after first publishing our protocol design of a JIT AMM, MEV seekers spotted examples of this in action on Uniswap v3. For trades of a large enough size, there are opportunities to front-run other LPs even on the expensive and generalised Ethereum blockchain, proving the viability of this strategy in the wild.

The fixed liquidity fee in each pool (between 5 and 30 bps in most pools) acts as a built-in delta for market makers to attempt to capture. The way market makers capture that delta is to move their liquidity position right up to the market price. The market price is dictated by the availability of instantaneous liquidity on separate primary and secondary markets (including centralised exchanges, derivatives markets, and any other liquidity sources, such as OTC desks) just before a swap is executed. By opening hedging positions or taking existing liquidity on other markets, market makers can capture the liquidity fee entirely if they take on more price risk than all other liquidity providers. Once the swap is executed, the market makers can update their range order again to rebalance their position ready for the next swap batch.

As long as a few market makers compete with each other for the delta, this protocol design should ensure that users performing swaps are always getting market pricing or better than market pricing at the time of swap execution, with reliable fees and minimal slippage, and that capital efficiency in this protocol should exceed all other existing AMM designs depending on the level of competition between market makers.

**An Example Of JIT Swaps**

Let’s trace the path of a typical swap to examine how this works in practice. For this example, our hypothetical user will swap USDC (ERC20) for DOT (Native), and market makers A, B, and C will compete to win the liquidity fee from the trade. There is a 25bps liquidity fee on this pool.

1. The user (A DOT buyer) generates a quote which creates a unique deposit address associated with their destination address and swap intentions for DOT. The user initiates the swap by depositing 10,000 USDC to their quote address.

2. The Ethereum blockchain includes the USDC deposit in the next block. The market makers spot that the deposit has occurred and track other upcoming USDC deposits. There are also DOT sellers making deposits on the Polkadot chain. Although it will take several Ethereum and Polkadot blocks for the transactions to be recognized on the Chainflip State Chain, the market makers can watch both the Polkadot and Ethereum chains to calculate the overall direction of the trades in the next Chainflip batch ahead of execution.

3. Chainflip requires 6 Ethereum blocks to consider a deposit transaction ‘final.’ It also processes swaps in 6 Ethereum block batches (or about 18 Polkadot blocks), so there is a minimum of a 6 block delay between swap deposits being made on the Ethereum blockchain  and the swap being executed on Chainflip. This means market makers have about 90 seconds where they know exactly what the swaps will be, can source liquidity or calculate risk on other markets, and can adjust their range orders via a state chain transaction.

4. While this is happening, the user is waiting between 6 and 12 Ethereum blocks for the batch to be executed. In this case, there are 10 trades totalling $280,000 worth of volume in the batch, however only $90,000 worth of that volume is buying DOT. Therefore, for everyone’s trades in the batch to go through, overall the batch needs to sell about $170,000 worth of DOT. To capture up to 25bps of fees on the total volume of $280,000 (about $700), the market makers must now offer the best possible price on $170,000 worth of DOT within the 6 block delay window. This is where the name “Just In Time” comes into the picture, as they need to get liquidity sources and push forward some buy liquidity ‘Just In Time’ to win.

5. By having additional capital float on other exchanges like FTX, Binance, and so on, market makers can use risk model calculations to determine their best possible price for the trade. Using this calculation, they update their range orders and move their USDC in the USDC-DOT pool right up to that price. In this case, Market Maker A moves their USDC range order to have $170,000 of USDC liquidity concentrated at $23.45 per DOT, whereas Market Maker B moves their $170,000 of USDC with a concentration at $23.47 per DOT.

6. The Chainflip network executes the batch. Even though the overall direction is selling, even those users who are buying do not suffer unnecessary slippage as the market makers have sourced liquidity externally in order for the pool price to naturally gravitate close to the market index price. Market Maker B captures 100% of the liquidity fee, assuming they concentrated ahead of all other market makers. The Market makers that didn’t take the trade make no fees, but also experience 0 impermanent loss (as their balances remain unchanged).

7. Market Maker B, knowing that they have won the fee and how much DOT they just bought, goes ahead and sells $170,000 of DOT at $23.47 or higher on other markets. If managed correctly, the market maker just pulled in $700 or more of profit on one batch, and did so by taking on a mere 6 seconds of price risk. These opportunities occur every time a batch is executed, which occur as often as every couple of minutes for each pool.

8. The Chainflip Validator network now sends the funds to the users, who receive funds based on a swap price that closely tracks the global market price. Our DOT buyer receives their funds directly to their native DOT wallet.

9. Market Maker B might now make some withdrawals or deposits to their LP position to rebalance their portfolio to prepare to capture future batch opportunities, while Market Makers A and C are ready to take opportunities in batches in the immediate future. The next one is just 6 Ethereum blocks away.

This swap flow relies on market makers executing behaviour which is nearly identical to that of typical software driven OTC desks, but in an open and competitive environment. This strategy can easily be integrated into typical market making strategies as a method of generating trade flow without needing to build or expand a customer base.

**Some Caveats to the Example**

In reality, it would likely be rare that a single liquidity provider takes 100% of the liquidity fee, but rather one or two market makers taking the large majority of a given trade with inconsequential amounts filled by an assortment of other liquidity providers just due to the nature of AMM curves. In any case, the market makers will always know what trades they just did and will follow the same steps and principles. 

Furthermore, in the wider Chainflip protocol design, it is intended to have dozens of these pools operating simultaneously, all moving at slightly different speeds on the basis of the block and confirmation times of each chain. A BTC to ETH swap for example would not be facilitated in a single swap. Instead, a user’s funds would automatically be routed through two pools, BTC-USDC and then USDC-ETH, which would involve two swap batches that both follow the same rules as described above. 

Due to this arrangement, market makers must not only track future deposits into the pool in question, but also the expected path of deposits into other pools that will ultimately be routed into the pool in question in order to accurately predict batches. Routing everything through USDC does mean that users will be exposed to USDC for a short window of time while they wait for their swaps to be routed, which may not be desirable in some circumstances, but is assessed to be a worthwhile tradeoff in order to minimise liquidity fragmentation, which would arguably be worse for users under normal market conditions. If particular routes within the protocol become popular enough, direct asset-to-asset pools (such as ETH-BTC) can be added through protocol upgrades to allow users to avoid this price exposure.

Lastly, with all market making strategies, there are degrees of complexity. Advanced risk and prediction modelling would certainly give competing market makers an edge over one another. At a basic level, a JIT bot could be written that would simply wait until the future batch is completely known, make an instantaneous assessment of liquidity on other order books, update the range order price, and then wait for the batch to confirm before market buying or selling on other order books. This way, the bot would never make trades on other books unless it knew for a fact that it had taken some flow on the JIT AMM, and wouldn't rely on any advanced modelling to function at its core. It would however be quite easy to outcompete this simple JIT bot with a more holistic market making strategy. It can therefore be expected that as the volume increases, natural competitive dynamics will force the performance of market makers to constantly improve, leading to even better pricing for users.

**Other Tradeoffs of the JIT AMM**

Using this swap flow has some other non-trivial benefits for users. Firstly, by grouping trades into blocks or even batches of blocks, frontrunning traders becomes nonsensical, as all traders in the batch get the same price. Furthermore, for a good majority of trades in normal market conditions, this liquidity strategy should totally neutralise effective slippage for the bulk of users.

There are however some tradeoffs which we must accept to achieve this. Namely, this protocol can not give users certainty about the ultimate outcome of their swap ahead of time. Until all trades are in, the final state of the batch can not be guaranteed, and even then until the range order updates are in, a final slippage/pricing calculation can not be made. This is exacerbated in multi-swap trade routes.

However, with the development of risk models and prediction models displayed on trade estimation tools on user front ends, it will be relatively straightforward to inform the users about the likely outcome of their trades given the intended size, current market state, and historical data.

On top of this, if a pool ever becomes very imbalanced because of large trades in one direction in a short window of time, users who are relying on the JIT model for accurate pricing might end up suffering. This is because all of the market makers would have been cleaned out on one side, and passive liquidity is not generally expected to be prevalent on JIT AMMs to mitigate this problem. Market makers also have to wait longer to rebalance a portfolio than normal AMMs, as there is an additional lag to confirm deposits and process withdrawals than other on-chain AMMs. That being said, rebalancing wouldn't take any longer than on a typical centralised exchange. This could be mitigated again by displaying a warning to users when generating quotes if the front-end detects a current imbalance or significant deviation in the relevant pools from index prices.

**The Extremes of Capital Efficiency**

The TVL of the pools in a JIT AMM can not be compared to a typical liquidity pool, as the TVL of a pool actually represents as much as half of the maximum practical trade size - a kind of capital efficiency that pushes at the extremes of what is possible. If all LPs are executing an active strategy, a pool with popular assets that has a TVL of $10m could in theory tolerate a trade batch of up to around $3.5m to $4m in one direction with sub 2% price impact in most cases (depending on the trade pair and global liquidity state across all markets). This kind of capital efficiency can not be replicated effectively on single-chain AMMs. This price impact estimation is based on observing typical instantaneous liquidity on major pairs using tools such as [cryptosor.info](cryptosor.info), but further reductions in price impact are possible.

However, it is not possible to have greater than 100% capital efficiency. Large deposits that exceed or heavily exhaust the available liquidity in the pool change the underlying game theory, and incentivise the market makers to collude rather than compete. If Market Makers know that they can’t fill the order, and also know that the other Market Makers can’t fill the order, Market makers stand to gain much more if they all shift their range orders away from the market price to effectively buy the incoming deposit at a fraction of the global market price. 

This isn’t too different to what happens when liquidity pools on other AMMs accept huge deposits with non linear slippage, where exceeding the effective liquidity of the pool progressively degrades the effective price. However, because the market makers on the JIT AMM have time to respond to incoming deposits, there is greater room for exploitation. It only makes sense for the market makers to play this new game if liquidity on one side will definitely be exhausted in a given trade, but the consequences for the trader in this case are worse than if they had used a typical AMM.

For those large trade batches with significant direction changes, there is also a form of arbitrage that could mitigate the likelihood of pool exhaustion occurring. If a large deposit is detected, arbitrageurs could make counter deposits within the same block to be exposed to the price impact expected from the overall batch. This would effectively allow the arbitrageur to buy cheap or sell at a higher than index price, but the opportunities would only exist when large imbalanced batches are expected. Arbitrageurs following this strategy would help to reduce the impact of large trades on other traders in the batch, further improve capital efficiency, and would mean that the market makers would be able to handle even larger flows without exhausting liquidity.

Another potential feature that would help avoid exhausting liquidity pools and incentivising predatory market maker behaviour is to break up extremely large deposits automatically. By splitting large deposits into several of the upcoming batches, arbitrageurs and market makers would have more time to handle the trade. This is similar to how most OTC desks handle large orders on the backend in any case. The depositor should theoretically get similar prices as if they had used an OTC desk if this deposit splitting feature is implemented effectively. At this stage, we don’t plan to implement this feature early on, but if proven to be important in the wild, a protocol upgrade can occur.

**Summary**

The Chainflip AMM protocol is an implementation of a potentially new class of AMM called a “Just In Time AMM” (JIT AMM), which is a decentralised method of getting users close to market prices at all times in spite of the unique challenges faced by a multichain AMM like Chainflip. It is also a way to give free trade flow to market makers who can integrate the AMM into their existing flow sources. Significant work must be conducted in order to implement this design, and it is expected that both the protocol engineers and market makers will also have to iterate through many cycles of development in order to optimise and capitalise on the protocol effectively.
