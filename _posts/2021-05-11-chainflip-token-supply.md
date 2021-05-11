---
layout: post
title: Cryptoeconomics Series P1: FLIP’s Token Model & Supply: To Cap or Not to Cap?
---
![FLIP’s Token Model & Supply: To Cap or Not to Cap?](/assets/defibull.png)

Ah, dear reader. Whether you meant to or not, you have stumbled upon the first part of a series on Cryptoeconomics, mostly related to Chainflip, but be warned: this will get deep. Simon H, [10. If you haven’t got the time to chew through some in-depth analysis, steer clear of this series and perhaps check out the info on Chainflip’s economic parameters in the  [FAQ](https://chainflip.io/learn).

Every part in this series will be paired with its  [own topic](https://forum.chainflip.io/t/cryptoeconomics-series-part-1-to-cap-or-not-to-cap/12)  in the brand new  [Chainflip Governance Forum](http://forum.chainflip.io/). If after reading this you have comments, questions, or things to add, head on over and join the discussion.

To avoid writing a 20 page long article (trust me nobody wants that), I’ve had to break down the discussion of Chainflip’s cryptoeconomics into multiple, limited pieces. I’ll try to avoid jumping between topics, but given the tightly coupled nature of the Chainflip project as a whole, we may have to brush over certain related topics and get back to them in another part. LET’S DO IT.

Part 1: Uncapped Supply

Part 2: Validator Auction Theory

Part 3: Swapping Logic

Part 4: Liquidity Incentive Structure

Part 5: Economic Security

# P1: FLIP’s Token Model & Supply: To Cap or Not to Cap?

To get stuck into the series, I’ll start with a topic that requires less background knowledge about Chainflip’s inner workings. Everyone’s gotta warm up, right?

An aspect of the token design of Chainflip that investors have asked about more than I’d expect is regarding the so-called ‘infinite’ supply of the $FLIP token. In other words, there is no hard limit to the number of tokens that could be minted in the future.

What caught me off guard about this topic is that this is still perceived to be a strange move — to me personally it seems reasonable that any incentive driven protocol  _should_  have a means of sustainably expanding its supply in order to be a viable product — but this is actually not the case in the vast majority of projects on the market.

In a world where  _big daddy Bitcoin_  famously has a maximum supply of 21m and the bulk of major token projects of the last couple of years have been fixed supply Ethereum tokens with no network of their own, it’s easy to understand why an ‘elastic’ supply token might catch people off guard.

It’s easy to think ‘infinite’ supply tokens have  **infinite**  inflationary pressure and therefore  **do not constitute**  ultra-sound crypto money. This is quite a surprising viewpoint to me, not only because it ignores the  _many_  downsides that come from having  _no_  emissions for many types of tokens, but also because the vast majority of ‘fixed’ supply tokens on the market are nowhere near their max supply limits and are rapidly inflating through token unlocks, reward programs, and other emission producing activities.

One of the key tools protocol designers have in their toolbox is the creation and distribution of tokens. This isn’t always necessary, but the creation of an emissions schedule is the key mechanism by which all proof of stake, proof of work, liquidity mining, and governance incentive schemes function.

**“But wait!”**  — you say. “My token has  _no emission!_” Well dear reader, I must ask in reply, what about those 146% APY yields on your token’s key liquidity pool? Are  _they_ not emissions too?

Just because they may be manually released on fixed or variable schedules,  _do not get it twisted_: at a  _fundamental_  level, these rewards are released from a  _non-circulating_  state into a state where market participants are free to exchange them on the wider market and  **can not be put back in the box**  from which they came. That sounds an  _awful_  lot like emission to me.  **All**  forms of incentives should be considered when discussing emissions and coin supply, whether or not they are part of a wider block reward or ‘capped’ emission or unlock schedule.

**A Misleading Practice**

Many token projects have an arbitrary ‘max supply’, and a circulating supply that is often a fraction of this arbitrary limit. Particularly in the ethereum/bsc/etc token space, where minting of new tokens often isn’t possible, project teams essentially retain  **unilateral**  control over  _vast swathes_  of token supply, not because they are malicious, but just because they have not built other means to regulate the rate of coin release to pay for important incentives.

It’s for this reason we see over 100 $1bn projects today. In most cases, these huge valuations (ie. the ‘supply’ multiplied by the current price) arise as a result of a small amount of liquid tokens and incredible demand resulting in extraordinary market caps. Looking at reported fully diluted valuations further distorts the picture of the space.

Personally I see this as misleading. Reporting giant valuations on fixed or capped supply tokens implies a stable supply and token price, where in a lot of these cases, not only is there emission occurring (often at incredible rates well over 100% per year), but also there is often very little to prevent project teams from altering effective emissions without community awareness. More importantly, in most cases there is  _no way to offset the supply increases_.

Further to this, there is also a hard-limit to incentive schemes — once the tokens of fixed supply projects have been released, that removes the possibility of using them ever again. In other words, most incentive schemes seen today will stop not because they are necessarily a bad idea, but simply because there aren’t enough tokens to fund them.

Market capitalisations as they are represented today are very unhelpful as they almost never paint an accurate picture of how a token’s supply is really broken down — in the majority of cases the notion of a ‘circulating supply’ and ‘max supply’ vary in definition from project to project with no real way of making an apples to apples comparison. It’s safe to say that although tokens with a ‘fixed supply’ are common, that often doesn’t mean much in practice.

I think it’s worth pointing out at this stage that crypto economics remains a highly experimental (and hotly debated) area of research. I’m not saying any particular approach is right or wrong, nor do I claim to know the perfect setup for any particular project (including Chainflip). We have however tried to do our homework and assess various models to derive a set of hypotheses. Conversations around token models can get murky very quickly. Given the cross-section of disciplines required to have informed debate, it’s often difficult to do so in a wider setting. We are very much open to feedback on the ideas presented in this article, as we strive to make the best economic decisions to ensure the success of the Chainflip protocol.

**Chainflip’s Approach**

At Chainflip, we settled on an emission style that can broadly be likened to  [Ethereum’s EIP-1559 token model.](https://www.coindesk.com/ethereum-improvement-proposal-1559-london-hard-fork)

Set emission rates are defined for Validator rewards, liquidity incentives, and other programmatic initiatives. These all create newly minted tokens which are allocated to the various operators of these systems.

On the  _flip side_, we have introduced mechanisms which also remove tokens from circulation **forever**. Burning is an underappreciated topic. While the narrative around ‘deflationary’ assets is strong, the reality is very few protocols even have the technical ability to be truly deflationary. Bitcoin, for example,  **can not**  be described as deflationary. At best, it can be described as  _supply neutral_  in its final form, with the  _only_  mechanism for circulating supply to go down is just people losing their keys (a non-trivial proportion actually!). Ethereum has been  _far from_  deflationary, having grown from 70m ETH in 2015 to 115m ETH today, but in relative terms, supply hasn’t increased much more over time compared to Bitcoin, which has also minted heaps to miners over the years. Now that gas fees will be partially burned on Ethereum, there  _is actually_  a potential (if unlikely) future in which overall Ethereum supply declines over time.

Chainflip shares a similar model. For every swap that passes through the Chainflip system, a small fee is taken from the user (in USDC) and is used to buy FLIP tokens in the built-in USDC/FLIP pool. This purchased flip is automatically burned, removing it from the supply.

**Fee Collection**

Exchanges are incredibly lucrative businesses. An exchange charging fees of 0.1% on trades with $500m in daily volume (a mere fraction of Uniswap’s) should yield $182,500,000 in revenue every year. If  _all_  of those fees were directed into the purchasing of a token directly from the liquidity pool and then burning those tokens, the token holders would  _automatically_ benefit from this without having to lift a finger — it’s simply automatically reflected in the token price.

If said exchange bought $182m worth of tokens over a year, and if the average price was $10 each (based on comparable DeFi tokens), that’s  **18.2 million tokens.**  Putting that in FLIP terms, that would be over a  **fifth**  of the initial supply, meaning emissions would have to exceed 20% per annum to  _even come close_  to the amount of tokens being removed from circulation. That means that if this did occur, the FLIP supply would  **decrease** over time based on current models, where we anticipate between 11 and 16% inflation per year. That’s pretty neat I’d say.

DISCLAIMER: Chainflip may alter its model over time. Nothing is guaranteed, especially the potential daily volumes, and the other parameters are likely to change. Chainflip is a risky project — get involved, but only when you have a good understanding of these risks.

**Determining Distribution**

So why not pay the fees directly to Validators? Why not just have a fixed supply and have the Validators bid for access to exchange fees?

Well, this doesn’t help token holders. Token holders play an important role in the protocol too — not everyone can be a Validator and yet non-Validators still provide liquidity, are incentivised to bring on more users to the protocol, and they play a key role in user-informed governance.

The other main reason why fees shouldn't be given straight to Validators is simple: Validators  **must**  provide economic security  _at all times_  — fluctuations in volumes, and therefore incentives, are impossible to reliably model. The potential upside for Validator operation is important to encourage operators to make _long term_  investments in Validator slots and time investment in the infrastructure. A slow month in volume could result in Validators dropping out, reducing collateralisation and therefore economic security. This limits liquidity capacity and therefore increases slippage for users, reducing volumes and therefore fees — a downward spiral to be avoided.

Further to this, a regular emission is also useful for LP incentives which can be altered to bootstrap certain pools that do not yet yield fees. The creation of new tokens allows parameters to be tweaked to account for more or less token incentives — all while keeping the community involved and aware of the actual emissions in place at any given time.

In practice, the supply of FLIP is likely to track closely with token emission until fees pick up enough to offset newly created tokens, but will fluctuate with volumes. Although impossible to predict with certainty, modelling it is  **really**  enjoyable.

**Summing Up**

Chainflip’s token model can be described as  **smashing**  **an exchange’s business model straight into EIP-1559**. It’s simple to model, honest about it’s metrics, and has a  _realistic chance_  of turning FLIP into a deflationary asset.

So while yes — FLIP may have a theoretically ‘infinite’ supply, this isn’t the full story. I prefer the term ‘elastic.’ I’m personally very excited by this model and I hope you are as well.

Got thoughts? Post them here:  [forum.chainflip.io](https://forum.chainflip.io/t/cryptoeconomics-series-part-1-to-cap-or-not-to-cap/12)

Next up in the series: Validator Auction Theory. Coming soon!
