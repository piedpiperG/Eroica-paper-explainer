window.TRANSCRIPT = [
  {
    "index": 1,
    "start": 18.0,
    "en": "OK. Hello. I'm Yu Guang from Alibaba Group.",
    "zh": "大家好，我是来自阿里巴巴集团的余光。"
  },
  {
    "index": 2,
    "start": 21.8,
    "en": "In this talk, I will introduce Eroica, an online performance troubleshooting system for large scale model training.",
    "zh": "今天，我将向大家介绍 Eroica，这是阿里巴巴专为大规模模型训练研发的一套在线性能故障排查系统。"
  },
  {
    "index": 3,
    "start": 32.2,
    "en": "Performance troubleshooting for large model training is always challenging because anything can go wrong.",
    "zh": "大模型训练的性能故障排查向来棘手，因为任何环节都可能出问题。"
  },
  {
    "index": 4,
    "start": 38.5,
    "en": "User code training frameworks, kernel functions, hardware and network.",
    "zh": "问题可能出在用户代码、训练框架、内核函数，亦或是硬件或网络上。"
  },
  {
    "index": 5,
    "start": 45.8,
    "en": "Any line of code or one piece of hardware on a single machine can slow down the whole job.",
    "zh": "哪怕只是一行代码，或单机上的一块硬件，都足以让整体任务降速。"
  },
  {
    "index": 6,
    "start": 52.6,
    "en": "The figure on the right shows diverse root cause we found over 9 months.",
    "zh": "右图汇总了过去九个月我们发现的各类根本原因。"
  },
  {
    "index": 7,
    "start": 60.5,
    "en": "So the question is how to quickly find which line of code or which hardware on which machine is the root cause.",
    "zh": "所以，核心问题是如何快速锁定故障根源：究竟是哪台机器上的哪行代码或哪个硬件出了问题。"
  },
  {
    "index": 8,
    "start": 71.7,
    "en": "Today, there are two approaches for performance troubleshooting,",
    "zh": "当前，性能故障排查主要有两种思路，"
  },
  {
    "index": 9,
    "start": 77.5,
    "en": "online monitoring, like monitors for GPU, CPU, memory, storage, and like Nico Profiler for Communication, EBPF for host function executions.",
    "zh": "在线监控手段，既包括对 GPU、CPU、内存和存储的常规监测，也涵盖用于通信分析的 Nico Profiler 以及追踪主机函数执行的 eBPF。"
  },
  {
    "index": 10,
    "start": 90.4,
    "en": "Low overhead covers all workers always on,",
    "zh": "低开销、全覆盖，所有工作节点实时在线，"
  },
  {
    "index": 11,
    "start": 95.6,
    "en": "but it cannot see code level details and only does cross grain hardware sampling.",
    "zh": "然而，它无法深入代码层面，仅支持粗粒度的硬件采样。"
  },
  {
    "index": 12,
    "start": 103.2,
    "en": "So wide coverage but shallow visibility.",
    "zh": "因此虽覆盖面广，却缺乏深度可见性。"
  },
  {
    "index": 13,
    "start": 110.7,
    "en": "Offline profiling like Inside Systems, Torch Profiler, they are two dominant tools.",
    "zh": "以 Inside Systems 和 Torch Profiler 为代表的离线剖析工具，是业界两大主流方案。"
  },
  {
    "index": 14,
    "start": 116.8,
    "en": "They give detailed code visibility and precious hardware tracing.",
    "zh": "它们既能提供细致的代码级可见性，又能捕捉珍贵的硬件追踪数据。"
  },
  {
    "index": 15,
    "start": 123.5,
    "en": "But for the large scale training, the data is about 10 terabytes, impossible to consume in real time.",
    "zh": "可到了大规模训练阶段，数据量激增至 10 TB，实时处理根本无从谈起。"
  },
  {
    "index": 16,
    "start": 132.3,
    "en": "So usually we only profile a few workers for a few training iterations instead of all workers.",
    "zh": "所以通常我们只剖析少量节点和少数几次迭代，而不是所有节点。"
  },
  {
    "index": 17,
    "start": 139.9,
    "en": "So deep visibility, but narrow coverage.",
    "zh": "可谓深度有余，广度不足。"
  },
  {
    "index": 18,
    "start": 146.8,
    "en": "So we say monitoring sees wide and profiling sees deep.",
    "zh": "所以说，监控看的是面，剖析看的是点。"
  },
  {
    "index": 19,
    "start": 152.7,
    "en": "But can we combine the advantages of both to cover all workers, run online with low overhead, and at the same time give you detailed code visibility and precious hardware tracing.",
    "zh": "那么，我们能否博采众长，既全覆盖所有工作节点、低开销在线运行，又兼具深入的代码可见性与珍贵的硬件追踪能力？"
  },
  {
    "index": 20,
    "start": 165.8,
    "en": "In other words, can we do online profiling for troubleshooting?",
    "zh": "也就是说，我们能不能实现在线性能剖析以辅助故障排查？"
  },
  {
    "index": 21,
    "start": 174.6,
    "en": "To do online profiling for troubleshooting, there are two fundamental challenges.",
    "zh": "若要利用在线性能分析来排查故障，主要面临两大根本挑战。"
  },
  {
    "index": 22,
    "start": 179.9,
    "en": "First, data volume, fine grain profiling produce about 100 megabytes per second per worker.",
    "zh": "首先是数据量挑战：细粒度性能分析会在每个工作节点上产生高达每秒 100 兆字节的数据。"
  },
  {
    "index": 23,
    "start": 187.8,
    "en": "Then for a 10,000 GPU task, that is about 1 terabyte per second.",
    "zh": "若任务规模扩大至一万个 GPU，数据量将激增至每秒 1TB。"
  },
  {
    "index": 24,
    "start": 193.5,
    "en": "It is impractical to store or transfer. And profiling itself slows down training.",
    "zh": "存储和传输均不现实，且剖析过程本身就会拖慢训练。"
  },
  {
    "index": 25,
    "start": 203.3,
    "en": "Second, even if you had all the data, how do you find the needle?",
    "zh": "其次，即便手握全量数据，又要如何大海捞针？"
  },
  {
    "index": 26,
    "start": 208.3,
    "en": "Loading all data is even impractical, and naive downsampling lose critical clues for troubleshooting.",
    "zh": "全量加载数据根本不现实，粗暴的下采样还会丢掉排查故障的关键线索。"
  },
  {
    "index": 27,
    "start": 216.3,
    "en": "Moreover, you cannot compare timestamps you collect across workers because of clock desynchronization.",
    "zh": "再者，由于存在时钟不同步问题，跨工作节点的时间戳根本无法直接对比。"
  },
  {
    "index": 28,
    "start": 225.9,
    "en": "So how to efficiently spot issues in massive data?",
    "zh": "面对海量数据，我们该如何高效定位问题？"
  },
  {
    "index": 29,
    "start": 233.0,
    "en": "Here's our insight in model training. All workers run the same code, so they should have similar behaviors.",
    "zh": "我们的核心洞察在于：在模型训练中，所有工作节点执行相同代码，其行为表现理应趋同。"
  },
  {
    "index": 30,
    "start": 241.7,
    "en": "When one worker behaves differently and that difference reveals the problem.",
    "zh": "只要某个 Worker 行为异常，其差异即可暴露问题所在。"
  },
  {
    "index": 31,
    "start": 248.9,
    "en": "Take this example of ring or reduce, a collective communication function with 16 workers, where every 8 workers pass data around the ring.",
    "zh": "以 Ring All-Reduce 为例，这是一种由 16 个 worker 参与的集体通信，每 8 个 worker 构成一环来传递数据。"
  },
  {
    "index": 32,
    "start": 261.1,
    "en": "Normally, all workers should achieve standard throughput,",
    "zh": "正常情况下，各工作节点的吞吐量理应保持一致。"
  },
  {
    "index": 33,
    "start": 266.9,
    "en": "but when a worker has a slow link here, it reduces its own throughput and forces other links to fluctuate between full speed and zero.",
    "zh": "可一旦某节点在此处出现慢链路，不仅自身吞吐量下降，更会迫使其他链路在全速运行与完全停滞之间反复震荡。"
  },
  {
    "index": 34,
    "start": 279.1,
    "en": "This is due to trunk based synchronization in collective communication where faster links must wait for the slowest link after each chunk.",
    "zh": "这是因为集体通信采用主干同步机制，每传完一个数据块，快链路都得等慢链路。"
  },
  {
    "index": 35,
    "start": 292.4,
    "en": "Now let's try to describe the function execution using a behavior fingerprint.",
    "zh": "下面，我们试着用行为指纹来刻画函数的执行特征。"
  },
  {
    "index": 36,
    "start": 298.1,
    "en": "For example, average and standard deviation of bandwidth utilization",
    "zh": "比如带宽利用率的均值和标准差"
  },
  {
    "index": 37,
    "start": 305.6,
    "en": "in normal ring communication, all transmissions have high average and low standard deviation of bandwidth utilization",
    "zh": "正常环形通信下，所有传输的带宽利用率均表现为高均值、低波动。"
  },
  {
    "index": 38,
    "start": 315.8,
    "en": "when a slow link is included in a ring. Other links in the ring have low average but high standard deviation because they frequently wait for the slow link.",
    "zh": "一旦环中出现慢速链路，其余链路因频繁等待，带宽利用率便会表现为低均值、高标差。"
  },
  {
    "index": 39,
    "start": 326.4,
    "en": "And the slow link itself has both low average and low standard deviation.",
    "zh": "至于慢链路本身，其平均值和标准差则双双偏低。"
  },
  {
    "index": 40,
    "start": 334.1,
    "en": "So with just these two numbers per worker, in this example, worker 11 immediately stands out because it differs from all other workers and because this approach uses statistical metrics rather than absolute timestamps, so there is no need for clock synchronization between workers.",
    "zh": "因此，每个工作节点仅需这两个数值，本例中的工作节点 11 便因与众不同而立即凸显。加之该方法基于统计指标而非绝对时间戳，各节点间也无需时钟同步。"
  },
  {
    "index": 41,
    "start": 357.5,
    "en": "Now we find that we do not need to compare raw profiling data for troubleshooting.",
    "zh": "现在我们知道，排查故障不再需要对比原始的性能剖析数据。"
  },
  {
    "index": 42,
    "start": 363.5,
    "en": "Instead, a well designed behavior fingerprint can tell the difference.",
    "zh": "反之，只需精心设计的行为指纹，即可 discern 出差异。"
  },
  {
    "index": 43,
    "start": 372.7,
    "en": "With this insight, here's Eroica's overview.",
    "zh": "基于这一洞察，我们来 overview 一下 Eroica 系统。"
  },
  {
    "index": 44,
    "start": 376.3,
    "en": "First, Eroica detect performance degradation by monitoring iteration time.",
    "zh": "首先，Eroica 通过监测迭代时间来发现性能下降。"
  },
  {
    "index": 45,
    "start": 383.5,
    "en": "Then profile all workers simultaneously only when performance degradation. That means zero routine overhead.",
    "zh": "因此，系统仅在性能下降时才对所有工作节点同步进行剖析，从而实现日常零开销。"
  },
  {
    "index": 46,
    "start": 394.2,
    "en": "With profiling data, Eroica, extract behavior fingerprints.",
    "zh": "依托性能剖析数据，Eroica 即可提取行为指纹。"
  },
  {
    "index": 47,
    "start": 398.2,
    "en": "It makes a 100,000 times data reduction.",
    "zh": "数据量因此锐减十万倍。"
  },
  {
    "index": 48,
    "start": 405.5,
    "en": "Then Eroica compares fingerprints across workers and localize the abnormal function execution behavior.",
    "zh": "随后，Eroica 比对各节点的行为指纹，从而锁定异常的函数执行行为。"
  },
  {
    "index": 49,
    "start": 415.1,
    "en": "Usually, we feed Eroica's output to an AI agent for auto fix.",
    "zh": "通常，我们会将 Eroica 的输出交由 AI 代理进行自动修复。"
  },
  {
    "index": 50,
    "start": 421.7,
    "en": "So in the above process, fingerprint extraction and compare localize are two key design of Eroica in this talk.",
    "zh": "总之，在本次分享中，Eroica 系统的两大核心设计正是指纹提取与对比定位。"
  },
  {
    "index": 51,
    "start": 434.8,
    "en": "This slide shows the overview again from the system perspective.",
    "zh": "这张幻灯片再次从系统视角回顾了整体架构。"
  },
  {
    "index": 52,
    "start": 439.0,
    "en": "Usually a GPU cluster has tens of thousands of machines.",
    "zh": "通常，GPU 集群的规模高达数万台机器。"
  },
  {
    "index": 53,
    "start": 444.6,
    "en": "Profiling data and fingerprints are generated at each machine in the GPU cluster,",
    "zh": "GPU 集群中各节点均会生成性能剖析数据及行为指纹，"
  },
  {
    "index": 54,
    "start": 451.6,
    "en": "and all fingerprints are uploaded to one centralized server to compare and localize.",
    "zh": "所有指纹汇总至中央服务器，以便比对并定位问题。"
  },
  {
    "index": 55,
    "start": 457.3,
    "en": "The centralized survey is very light weighted with only eight C8 CPU cores.",
    "zh": "这套集中式分析服务极其轻量，只需八个 C8 CPU 核心即可运行。"
  },
  {
    "index": 56,
    "start": 466.4,
    "en": "Now let's dive into the fingerprint extraction.",
    "zh": "下面我们来深入了解指纹提取。"
  },
  {
    "index": 57,
    "start": 470.7,
    "en": "Eroica does not fingerprint every function. It only focus on functions on the critical path, the function executions which block the training process determining the total iteration time.",
    "zh": "Eroica 无需为所有函数提取指纹，仅需针对关键路径上的函数进行处理，即那些阻碍训练流程并决定总迭代耗时的执行环节。"
  },
  {
    "index": 58,
    "start": 487.2,
    "en": "To define critical paths mathematically, we first prioritize functions based on their types, GPU kernels first and then memory operations and then communication and then Python functions,",
    "zh": "若要从数学角度定义关键路径，需先按函数类型设定优先级：首推 GPU 核函数，继而是内存操作、通信，最后才是 Python 函数。"
  },
  {
    "index": 59,
    "start": 501.7,
    "en": "a function execution or a part time of execution is critical if and only if no higher priority function is executing at that time.",
    "zh": "唯有在无更高优先级函数运行的时段，某次函数执行（或其片段）才算作关键路径。"
  },
  {
    "index": 60,
    "start": 515.5,
    "en": "In other words, when the GPU is busy, GPU kernels are critical.",
    "zh": "换句话说，只要 GPU 在忙，GPU 核函数就是关键。"
  },
  {
    "index": 61,
    "start": 521.0,
    "en": "And when the GPU is idle, whatever block the GPU becomes critical.",
    "zh": "反之，若 GPU 空闲，则任何阻塞它的操作便构成关键路径。"
  },
  {
    "index": 62,
    "start": 529.9,
    "en": "In Aerokit only functions that spend more than 1% of time on the critical path get fingerprinted, typically fewer than 20 functions per worker.",
    "zh": "Aerokit 仅对关键路径上耗时占比超 1% 的函数提取指纹，通常每节点不到 20 个。"
  },
  {
    "index": 63,
    "start": 544.2,
    "en": "Now let's define fingerprint of for general function executions.",
    "zh": "下面我们来定义通用函数执行的行为指纹。"
  },
  {
    "index": 64,
    "start": 549.0,
    "en": "The fingerprint is a three dimensional vector beta mu Sigma.",
    "zh": "行为指纹即由 beta、mu 和 Sigma 构成的三维向量。"
  },
  {
    "index": 65,
    "start": 555.6,
    "en": "Beta is a fraction of function's execution time on the critical path.",
    "zh": "Beta 代表该函数在关键路径上的耗时占比。"
  },
  {
    "index": 66,
    "start": 560.0,
    "en": "It tells you whether the function dominates the performance.",
    "zh": "这能判断该函数是否是性能瓶颈。"
  },
  {
    "index": 67,
    "start": 566.2,
    "en": "In this example, maybe forward has 30 or reduce has 10 and data loading has only 8.",
    "zh": "比如在这个例子中，forward 可能是 30，reduce 是 10，而数据加载只有 8。"
  },
  {
    "index": 68,
    "start": 576.3,
    "en": "Mill is the average hardware utilization during the function execution.",
    "zh": "Mill 代表该函数执行时的平均硬件利用率。"
  },
  {
    "index": 69,
    "start": 580.9,
    "en": "It tells you whether the hardware is underperforming.",
    "zh": "它能揭示硬件是否存在性能瓶颈。"
  },
  {
    "index": 70,
    "start": 586.1,
    "en": "And Sigma is a standard deviation of hardware utilization.",
    "zh": "Sigma 则表示硬件利用率的标准差。"
  },
  {
    "index": 71,
    "start": 589.9,
    "en": "It tells you whether the function execution is stable or maybe being blocked by something else.",
    "zh": "它能告诉你函数执行是否平稳，抑或正被其他因素所阻塞。"
  },
  {
    "index": 72,
    "start": 598.3,
    "en": "So we define behavior fingerprint of function F executed on worker w as beta mu Sigma.",
    "zh": "因此，工作节点 w 上函数 F 的行为指纹被定义为 beta、mu 和 sigma。"
  },
  {
    "index": 73,
    "start": 609.8,
    "en": "Here are some details of fingerprint extraction.",
    "zh": "下面详细介绍指纹提取的过程。"
  },
  {
    "index": 74,
    "start": 613.9,
    "en": "MU and Sigma depends on hardware utilization since different function execution require different hardware.",
    "zh": "MU 和 Sigma 取决于硬件利用率，毕竟不同函数的执行对硬件的需求各不相同。"
  },
  {
    "index": 75,
    "start": 620.7,
    "en": "So given a function mu and Sigma measures the specific hardware that determines the function's performance.",
    "zh": "因此，对于任意函数，μ 和 Σ 反映了决定其性能的关键硬件特征。"
  },
  {
    "index": 76,
    "start": 628.0,
    "en": "For example, for GPU kernel functions, we focus on GPU frequency.",
    "zh": "比如对于 GPU 内核函数，我们重点关注其频率。"
  },
  {
    "index": 77,
    "start": 632.1,
    "en": "And for Python functions, we focus on CPU utilization.",
    "zh": "对于 Python 函数，我们则聚焦于 CPU 利用率。"
  },
  {
    "index": 78,
    "start": 638.2,
    "en": "And to get the hardware throughput accurately, we filter out idle wait time to get accurate mu and Sigma values.",
    "zh": "为精确测算硬件吞吐量，我们剔除了空闲等待时间，以获取准确的 mu 和 Sigma 值。"
  },
  {
    "index": 79,
    "start": 648.8,
    "en": "And when a function executes multiple times in the profiling window, mu and Sigma are weighted, averaged across all executions. For beta, we simply make summation.",
    "zh": "如果函数在分析窗口内运行了多次，我们会对所有执行结果计算 mu 和 Sigma 的加权平均值，beta 则直接累加即可。"
  },
  {
    "index": 80,
    "start": 665.8,
    "en": "Now let's go to the second key design, compare and localize.",
    "zh": "下面来看第二个关键设计：对比与定位。"
  },
  {
    "index": 81,
    "start": 671.4,
    "en": "So all critical functions from all workers get fingerprints, the centralized server, class them all together just like a giant table.",
    "zh": "于是，各工作节点的关键函数均生成了行为指纹，并由中央服务器统一汇总归类，形成一张巨大的表格。"
  },
  {
    "index": 82,
    "start": 682.5,
    "en": "And the next question is how to define abnormal behaviors based on these fingerprints.",
    "zh": "那么，如何依据这些指纹来判定异常行为呢？"
  },
  {
    "index": 83,
    "start": 691.8,
    "en": "The first type of abnormal behavior is a behavior that differ from expectation, because for some functions, we know what normal looks like in advance.",
    "zh": "第一类异常即偏离预期的行为，毕竟对某些函数而言，我们早已掌握其正常表现。"
  },
  {
    "index": 84,
    "start": 702.9,
    "en": "So we define an expected range for different function types.",
    "zh": "为此，我们为各类函数设定了预期的取值范围。"
  },
  {
    "index": 85,
    "start": 708.2,
    "en": "For example, beta should be less than 1% for any Python function because CPU is never expected to be the performance bottleneck.",
    "zh": "例如，任何 Python 函数的 beta 值都应低于 1%，毕竟 CPU 从来都不是预期的性能瓶颈。"
  },
  {
    "index": 86,
    "start": 715.8,
    "en": "And similarly, beta for communication functions should be less than 30.",
    "zh": "同理，通信函数的 beta 值上限为 30。"
  },
  {
    "index": 87,
    "start": 722.9,
    "en": "So behaviors that fall outside the expected range are immediately flagged as abnormal.",
    "zh": "因此，一旦行为超出预期范围，系统便会立即将其标记为异常。"
  },
  {
    "index": 88,
    "start": 734.1,
    "en": "And the second type of abnormal behavior is the behaviors that differ from peers.",
    "zh": "第二类异常行为，则是指那些与其他节点表现不一致的情况。"
  },
  {
    "index": 89,
    "start": 742.3,
    "en": "Recall that in model training functions across workers should behave similarly.",
    "zh": "需注意的是，模型训练时各工作节点上的函数行为理应高度一致。"
  },
  {
    "index": 90,
    "start": 747.8,
    "en": "In other words, the 3d behavior fingerprint of the same function across all workers should cluster together or from a regular distribution,",
    "zh": "换言之，各工作节点上同一函数的三维行为指纹理应紧密聚集，或呈现出规律的分布形态，"
  },
  {
    "index": 91,
    "start": 762.5,
    "en": "so points outside of the distribution are outliers, and outliers indicate abnormal behavior.",
    "zh": "因此，偏离该分布的点即为离群点，代表着异常行为。"
  },
  {
    "index": 92,
    "start": 772.7,
    "en": "Eroica use Manhattan Distance to compute distance and determine whether each point is an outlier.",
    "zh": "Eroica 通过计算曼哈顿距离，来识别哪些点属于异常值。"
  },
  {
    "index": 93,
    "start": 782.9,
    "en": "After compare and localize, Eroica outputs all abnormal function behaviors.",
    "zh": "对比定位完成后，Eroica 会输出所有异常的函数行为。"
  },
  {
    "index": 94,
    "start": 789.4,
    "en": "Then it tries AI auto fix first. Like the training task has the following performance issues and here is the relevant code. AI will take actions to fix it.",
    "zh": "接着，系统会优先尝试 AI 自动修复。例如，一旦训练任务出现下述性能问题并锁定相关代码，AI 就会立即采取措施进行修复。"
  },
  {
    "index": 95,
    "start": 801.5,
    "en": "If the AI cannot fix it. For example, some problems are hardware problems. It will be fixed by manpower.",
    "zh": "若 AI 无法解决（如硬件故障），则转由人工处理。"
  },
  {
    "index": 96,
    "start": 812.2,
    "en": "Eroica is a production of Alibaba Cloud for one and a half years, deployed on approximately 100,000 GPUs.",
    "zh": "Eroica 已在阿里云稳定运行一年半，覆盖约 10 万张 GPU。"
  },
  {
    "index": 97,
    "start": 822.1,
    "en": "Eroica has diagnosed over 80 cases that existing tools could not handle.",
    "zh": "Eroica 已解决了 80 多起现有工具无法处理的疑难杂症。"
  },
  {
    "index": 98,
    "start": 827.5,
    "en": "The largest one includes 6144 GPUs.",
    "zh": "最大规模集群更是拥有 6144 块 GPU。"
  },
  {
    "index": 99,
    "start": 832.5,
    "en": "It supports diverse GPUs, diverse host architectures and diverse training frameworks.",
    "zh": "系统兼容各类 GPU、主机架构与训练框架。"
  },
  {
    "index": 100,
    "start": 839.3,
    "en": "The product is available on the official website of Alibaba Cloud.",
    "zh": "您可前往阿里云官网获取该产品。"
  },
  {
    "index": 101,
    "start": 847.5,
    "en": "And here is a real case study, a video generation model training, training on 3,000 and 400 GPUs had unexpected throughput drops.",
    "zh": "接下来分享一个真实案例：某视频生成模型在 3400 张 GPU 上训练期间，遭遇了意外的吞吐量骤降。"
  },
  {
    "index": 102,
    "start": 859.8,
    "en": "First heroic found that the beta value of send receive for 40 workers differed from the rest.",
    "zh": "首先，Eroica 检测到这 40 个 Worker 的收发 Beta 值异于其他节点。"
  },
  {
    "index": 103,
    "start": 868.9,
    "en": "And in these 40 workers, one has different MU and Sigma from the other 39.",
    "zh": "而这 40 个 worker 中，有一个的 MU 和 Sigma 与另外 39 个存在差异。"
  },
  {
    "index": 104,
    "start": 877.4,
    "en": "Then the problem is clear. The worker's network card is downgraded.",
    "zh": "问题至此已十分清晰：该工作节点的网卡发生了降级。"
  },
  {
    "index": 105,
    "start": 883.9,
    "en": "Then let's go back to the first figure. We found that despite the 40 workers with higher beta, the beta value of other 33, 60 workers also varies from maybe 9% to 16%.",
    "zh": "让我们回看第一张图。可以发现，除了那 40 个 beta 值偏高的 worker，其余 33,600 个 worker 的 beta 值也存在差异，波动范围约为 9% 至 16%。"
  },
  {
    "index": 106,
    "start": 899.5,
    "en": "The range is much larger than expected, which means the network throughput varies across workers.",
    "zh": "波动幅度远超预期，说明各工作节点的网络吞吐量并不一致。"
  },
  {
    "index": 107,
    "start": 907.8,
    "en": "Then in a very short time, our engineers confirm that this GPU cluster did not have affinity based flow scheduling deployed.",
    "zh": "很快，工程师便确认该 GPU 集群并未启用基于亲和性的流调度。"
  },
  {
    "index": 108,
    "start": 921.1,
    "en": "Eroica also found other problems in the same job.",
    "zh": "Eroica 还在此任务中识别出其他问题。"
  },
  {
    "index": 109,
    "start": 924.9,
    "en": "First, a lot of GPU kernel functions showed similar GPU frequency across workers, but different execution duration, which indicating, indicating imbalance input workload.",
    "zh": "首先，多数 GPU 内核函数在各节点上的运行频率相似，但执行时长却各不相同，这说明输入负载并不均衡。"
  },
  {
    "index": 110,
    "start": 940.4,
    "en": "This is because the task is a video task. Videos have different duration leading to different workload to each workers.",
    "zh": "这是因为该任务涉及视频处理，而视频时长不一，致使各工作节点负载不均。"
  },
  {
    "index": 111,
    "start": 950.5,
    "en": "Moreover, three workers out of 3,400 had long pin memory times.",
    "zh": "此外，3,400 个 Worker 中有三个存在 Pin Memory 耗时过长的问题。"
  },
  {
    "index": 112,
    "start": 957.8,
    "en": "And this is a classical issue caused by too many data loader processes confirmed by manual verification.",
    "zh": "经人工排查确认，这是数据加载进程过多导致的典型问题。"
  },
  {
    "index": 113,
    "start": 968.4,
    "en": "And based on Heroic's output, our engineer fixed the network issue, pin memory issue and load balance issue.",
    "zh": "依托 Eroica 的诊断结果，工程师成功解决了网络、Pin Memory 和负载均衡三大问题。"
  },
  {
    "index": 114,
    "start": 977.6,
    "en": "In total, 34 4 end-to-end performance improvement.",
    "zh": "最终，端到端性能整体提升了 34.4%。"
  },
  {
    "index": 115,
    "start": 985.8,
    "en": "To conclude, first, Eroica presents function behavior fingerprint.",
    "zh": "总结来说，Eroica 的首要贡献在于提出了函数行为指纹。"
  },
  {
    "index": 116,
    "start": 991.7,
    "en": "It bridges the gap between always watching and deeply understanding the two classical performance troubleshooting approaches.",
    "zh": "它在“持续监控”和“深入理解”这两种经典的性能故障排查方法之间架起了桥梁。"
  },
  {
    "index": 117,
    "start": 1001.8,
    "en": "And then Eroica is also the first attempt at ai-assisted performance troubleshooting for large model training.",
    "zh": "此外，Eroica 更是业界首个利用 AI 辅助进行大模型训练性能故障排查的系统。"
  },
  {
    "index": 118,
    "start": 1011.1,
    "en": "Finally, heroic is not a story.",
    "zh": "最后，Eroica 不只是个故事。"
  },
  {
    "index": 119,
    "start": 1014.1,
    "en": "It's real. It is used in production since 2022.",
    "zh": "这并非虚言，该系统自 2022 年起就已正式上线运行。"
  },
  {
    "index": 120,
    "start": 1019.4,
    "en": "Thanks.",
    "zh": "谢谢。"
  }
];
