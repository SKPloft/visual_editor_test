## Why I'm Building This

**The pain:** Users have to set up environments, seek assets, and learn Unity (and maybe some coding) just to make a VRChat/Resonite world — even when they just want a few static assets and some good prefabs as a home.

**Who feels it:** Newbies, devs with personal interest, folks who don't want to deal with all that setup — they just want to get a world done quick.

**What I'm building:** A zero-code / low-code visual world editor with in-app editing, that exports as a standard VRChat/Resonite world.

currently i only have blurry vision, next is maybe to do basic UX design:

  • User flows (flowcharts) → used at companies like Google, Spotify, everywhere, draw statemachine
  • Clickable prototypes → that's what Figma, InVision, Marvel are built for
  • Wireframes → rough sketches of screens before building them

to make a prototype, maybe using mermaid or plantuml for flowcharts, pencil for UX and sketches, i havent figured out rest
---

## What is MVP?

MVP is Minium Version of Product, something that people would actually will pay, use and recommend.

An MVP is not a prototype, a proof of concept, or a full product:

- **Prototype**

A visual or interactive mockup used to show a concept, usually without a real backend.

- **Proof of concept (PoC)**

A small experiment that tests whether something is technically possible.

- **Full product**

The more complete version you build after your MVP has proven you are solving the right problem for the right people.

## When Is a Startup Ready for MVP Development?

Before you start development, you should be able to check all of these:

- You can describe the problem your product solves in one sentence, without using the word “platform” (单句直接的描述解决了什么问题)
- You have spoken directly to at least 10 people who experience that problem and are actively trying to solve it(至少和10经历了这个问题的10个人说过了，并且这10个人都在试图解决这个问题)
- You have identified a specific, narrow user segment, not “everyone who does X”（明确确定的用户画像，不是泛泛的什么“改模的人”）
- You have some early signal of demand, such as a waitlist, pre orders, letters of intent, or people who have already paid you something(至少有了预购，意向清单这种明显需求所在)
- You have a clear definition of what “this MVP is working” means, expressed in a metric you can measure(有个明确的定义说明MVP是怎么工作的，最好以表格的形式)

MVP is only a thing you can make after PoC technically and Prototype 'productively'

> Tip: If you cannot clearly define who you are building for, what problem you solve, and how you will judge success, you are not ready to start MVP development yet.

You are probably too early for MVP development if:

- Your target user is “anyone who needs X” or “businesses of all sizes”(没想好用户是什么人，寻思他们是个模糊的定义)
- You have not talked to potential users yet and plan to do that only after you build something(还没和潜在用户谈过，或者要么是打算做完再谈)
- The main reason you want to build is that you think the idea is good, not that users have told you they need it(做的原因单纯是觉得点子好，不是真的有人要)
- You have no budget clarity and hope the MVP will be cheap enough to figure out later(没预估好MVP实现成本)

## MVP Development for Startups in 5 Clear Stages

### Stage 1: Clarify the Problem, Audience, and Value Proposition

Before any design or development work starts, you need three things written down and agreed:

- A problem statement that describes what your target user is struggling with, how often it happens, and what they currently do about it. Vague problem statements produce vague products. (能明确描述目标用户有什么困难，困难发生多频繁，他们现在是怎么处理的)
- A user persona that captures who your early adopter is, including their role, context, technical comfort, and what they care about most. You are not building for the average user, you are building for the person most likely to try something new and give you honest feedback. (你的早期的支持者/目标用户的用户画像是什么，角色，知识，技术偏好，喜好，不能只是泛泛而谈的给“用户”做`，而是应该给能给你明确反馈，并且愿意尝试新东西的用户去做)
- A value proposition that states what your product does, for whom, and why that is better than what they do today. If you cannot write this in two sentences, your scope is not clear enough to build from. (能用两句话表示产品的功能，目标用户，为什么比现有产品更好)

This stage usually takes one to two weeks and should not involve any design software or code.
**必须做调查搞清楚以上问题**

### Stage 2: Validate the Idea Quickly

Validation happens before the build, not after. The goal is to stress test your assumptions using the cheapest possible methods. At minimum this means:

- Competitor research: who else is solving this problem, how they do it, and what gaps their users complain about in reviews (研究竞品，他们怎么试图解决问题的，他们的用户抱怨什么问题)
- Direct interviews with 5 to 10 people who fit your persona, focused on what they do today rather than their opinions about your future product (和符合你的用户画像的，至少5到10个人直接讨论他们今天都做了什么)
- A simple landing page or waitlist that describes your product and measures whether people are willing to give you their email or pre purchase access (一个简单的描述你的产品的网页，最好带一个waitlist，用于衡量多少人想要这个东西)

A landing page that converts at 15 to 30 percent from targeted traffic is a meaningful signal. One that converts at 2 percent despite repeated copy changes is telling you something important before you spend money on development.
（最终的流量转化在 15 到 30 % 是比较好的）

### Stage 3: Define What to Build vs What to Skip

Focus on what really matters, and discard everything else.

A useful exercise is to write every feature on a separate card or line, then remove anything that **a user could work around manually in the first 30 days**. If a user can send you an email instead of using an in app notification, the notification is not MVP scope. If they can export a CSV instead of having a reporting dashboard, reporting is not MVP scope.

What typically belongs in an MVP:

- The core action your product enables (the thing users came for) (核心作用)
- User authentication (login, basic account management) (基础的用户系统)
- One payment method if your business model requires it (支付方式，如果你的经济模式需要的话)
- Enough feedback surface to learn from, even just a simple survey or contact form (需要有个反馈渠道)

What typically does not belong:

- Admin dashboards and analytics beyond the basics (管理面板或者数据分析)
- Notification systems more complex than email (比电子邮件更复杂的通知系统)
- Social features, referral programs, loyalty mechanics (用户忠诚度，社交功能)
- Multiple integrations with third party tools (第三方应用集成)
- Extensive settings and customization options (额外的自定义选项)

The discipline here matters more than the technical choices you make in the next stage.

### Stage 4: Design, Build, and Launch Your MVP

Once scope is locked, development can begin. The build phase has three parts.

- Design: Lean UX for an MVP is not about beautiful interfaces, it is about clear ones. Users should not be confused about what to do next. A handful of high fidelity screens for the core workflow is enough. Design the happy path first, edge cases come later. （清晰直接的，足够重要的UX交互路径，艺术风格其次）
- Development: Build in short cycles, review working software frequently, and resist scope additions during development. Every “while we are at it” feature request represents unplanned cost and timeline risk. Log them for phase two. （短周期构建，经常review更新，开发期间避免增加目标，避免未计划的pr花费和时间花费）
- Launch: A soft launch to a small group of real users, ideally the people you interviewed in stage two, is almost always more useful than a big public launch. You learn more from 20 engaged users than from 500 who bounce after one session. Structure your beta so you can actually talk to the people using it. （第一次要建立起和资深/真实的长期用户关系，这比广撒网更好，20个长期用户比500个用几次就不用的用户更好）

apart from stuffs above, The full custom software development process involves more detail than a single section can hold, particularly around the design to development handoff and how to structure your QA process before launch.

### Stage 5: Measure, Learn, and Iterate

(MVP启动后，至少追踪用户是不是使用了核心功能，是否会继续使用，以及查看反馈的内容，如果第一次使用的人不多，那么基本的产品价值就有问题，如果没人长期使用，那么软件只解决了一时的用户需求问题而不是长期问题)

Shipping is not the end of MVP development, it is the beginning of the learning phase the whole process was designed to reach.

Define your success metrics before launch, not after. Decide what “this MVP is working” means in one or two numbers, then use them to guide your decisions after release.

At a minimum, you should track whether users complete the core action, whether they come back, and what they tell you in conversations, support tickets, and surveys. If activation is low, the problem is usually onboarding or value clarity. If retention is low after strong activation, the product is solving a one time need rather than a recurring one.

You can go deeper into specific benchmarks and signals in the later section on metrics that show if your MVP is working.

## Types of MVPs and Which One Fits Your Startup

（不同MVP用不一样的开发开始办法和时间）

Not every MVP requires months of custom development. The right format depends on what assumption you are trying to test and how quickly you need to test it.

### No‑Code or Low‑Code MVP

（使用低代码开发MVP基本4到8周开发解决，5000到20000美元，适用与非技术人员演示流程，或是核心工作量不复杂的情况下的用例，缺点是性能不够，以及不好调整）

Tools like Bubble, Webflow, Glide, and Notion let non‑technical founders build functional products without writing code. A no‑code MVP typically takes 4 to 8 weeks and costs 5,000 to 20,000 dollars if you are working with someone who specializes in these platforms.

Best suited for: idea validation at pre seed stage, non‑technical founders who need to demonstrate traction before raising money, and use cases where the core workflow is not technically complex.

The trade off is scalability. No‑code tools impose architectural constraints that become expensive to work around when you need performance at scale or custom integrations with enterprise systems.

### Clickable Prototype or Design Only MVP

（使用原型交互或设计软件开发MVP，2到4周，适用于偏界面类的而不是重数据处理类的，或者只是给企业做采购前做演示）

A high fidelity prototype built in Figma or similar tools can simulate a real product well enough to gather meaningful feedback from users who are willing to engage with it. It costs less than development and can be built in 2 to 4 weeks.

Best suited for: products where the primary value is in the interface and user experience rather than in data processing or backend logic, and for testing with enterprise buyers who need to see something before agreeing to a pilot.

### Custom Built Web, Mobile, or AI MVP

(使用自建网站，手机或者AI开发MVP，适用与低代码根本没办法处理的情况，比如实时数据处理，机器学习，复杂的整合，或者在合理的成都上需要性能)

When your value proposition depends on functionality that no‑code tools cannot deliver, such as real time data processing, machine learning, complex integrations, or performance at meaningful scale, custom development is the right choice.

This is the most expensive and time consuming option, but it is also the one that produces a product you can actually build a business on. Cost and timeline ranges are covered in the next section.

the rest is in: https://adevs.com/blog/mvp-development-for-startup/