window.SLIDES = [
  {
    no: 1,
    title: "标题：EROICA 是什么",
    image: "assets/slides/slide-01.jpg",
    chapter: "开场",
    start: 18,
    point: "这页建立对象：EROICA 是面向大规模模型训练的在线性能故障排查系统。",
    explain: [
      "标题里的两个词最关键：Online 和 Large-Scale。它不是离线复盘工具，而是要在生产训练任务运行时捕捉问题。",
      "作者来自阿里巴巴和 UIUC，后文的生产数据来自阿里内部大规模 GPU 集群。"
    ],
    talk: "讲解时先把 EROICA 定位成「训练任务慢了以后，用来回答哪台机器、哪个函数、哪类资源异常的系统」。"
  },
  {
    no: 2,
    title: "整条训练栈都可能出问题",
    image: "assets/slides/slide-02.jpg",
    chapter: "问题定义",
    start: 32,
    point: "性能问题横跨用户代码、框架、kernel、通信、硬件和网络，单点问题会拖慢全局训练。",
    explain: [
      "左侧列出训练栈：数据管道、训练框架、GPU/CPU 函数、通信库，以及 GPU、CPU、NVLink、PCIe、NIC、远端存储等硬件。",
      "右侧根因统计说明真实生产问题很分散：应用级问题接近一半，硬件问题也接近一半，还有少量未知。",
      "这页的作用是把「训练慢」从抽象症状具体化为定位问题：必须找出哪台机器上的哪行代码或哪个硬件出了问题。"
    ],
    talk: "可以用一句话收束：大模型训练的性能诊断不是看一个 GPU 利用率就够了，而是要穿透整条系统栈。"
  },
  {
    no: 3,
    title: "Monitoring 看得广，但看得浅",
    image: "assets/slides/slide-03.jpg",
    chapter: "现有方法",
    start: 71,
    point: "在线监控覆盖所有 worker、开销低，但粒度偏粗，难以直接看到代码级问题。",
    explain: [
      "DCGM、NCCL Profiler、eBPF 这类监控可以长期在线运行，适合持续观察 GPU、CPU、网络和存储指标。",
      "问题在于它们通常只能给出粗粒度硬件采样。看到 CPU 或 GPU 异常后，仍然不知道是哪段函数或哪条调用链导致异常。"
    ],
    talk: "讲这页时强调「wide coverage」：所有机器都能看，但诊断深度不足。"
  },
  {
    no: 4,
    title: "Profiling 看得深，但覆盖窄",
    image: "assets/slides/slide-04.jpg",
    chapter: "现有方法",
    start: 110,
    point: "离线 profiling 能看到代码和硬件细节，但数据量巨大，无法覆盖所有 worker 和迭代。",
    explain: [
      "Nsight Systems 和 Torch Profiler 能给出细粒度函数、kernel 和硬件 trace。",
      "在大规模训练里，原始 profiling 数据可以达到 10 TB 量级，实时消费和传输都不可行。",
      "因此生产中通常只能抽少量 worker、少量 iteration，容易错过只发生在个别机器或随机迭代的问题。"
    ],
    talk: "这页要和上一页形成对照：profiling 的问题不是看不清，而是不能大规模持续看。"
  },
  {
    no: 5,
    title: "核心目标：又广又深",
    image: "assets/slides/slide-05.jpg",
    chapter: "目标",
    start: 146,
    point: "EROICA 试图同时拿到监控的覆盖面和 profiling 的细粒度。",
    explain: [
      "这页提出全场核心问题：能不能覆盖全部 worker、在线运行、低开销，同时保留代码级可见性和硬件 trace？",
      "EROICA 的答案不是把所有原始 profiling 数据搬回中心，而是先在本地压缩成可比较的行为指纹。"
    ],
    talk: "把这一页当成论文的 thesis slide：后面所有设计都在回答「wide + deep 如何同时成立」。"
  },
  {
    no: 6,
    title: "在线 profiling 的两个难点",
    image: "assets/slides/slide-06.jpg",
    chapter: "挑战",
    start: 184,
    point: "数据量过大，以及异常像大海捞针，是在线排障的直接阻碍。",
    explain: [
      "每个 worker 细粒度 profiling 约 100 MB/s，10,000 GPU 任务会达到约 1 TB/s。",
      "简单丢弃或下采样会丢掉关键线索；但加载所有数据又不现实。",
      "跨机器时间戳也不可靠，因为 worker 之间存在时钟不同步。EROICA 后面的指纹设计正是为绕开这些问题。"
    ],
    talk: "讲解时不要只说数据大，还要说为什么不能直接 downsample：异常可能恰好藏在被丢掉的细节里。"
  },
  {
    no: 7,
    title: "洞察：多数 worker 行为相似",
    image: "assets/slides/slide-07.jpg",
    chapter: "核心洞察",
    start: 220,
    point: "大规模训练有大量对称 worker；差异本身就是诊断信号。",
    explain: [
      "Ring AllReduce 示例里，正常 worker 的通信行为应该相近。",
      "如果某条链路慢，受影响 worker 会出现不同模式：有的吞吐在标准值和 0 之间波动，有的持续低吞吐。",
      "这就是 differential observability：不是孤立看一个 worker，而是把同类 worker 彼此比较。"
    ],
    talk: "这页适合用「同一个班级里大家都按节奏跑，突然有人掉队」来解释 peer comparison。"
  },
  {
    no: 8,
    title: "行为指纹：用均值和方差描述函数行为",
    image: "assets/slides/slide-08.jpg",
    chapter: "核心洞察",
    start: 260,
    point: "把函数执行期间的资源行为压缩成 Behavior Fingerprint，使异常 worker 直接凸显。",
    explain: [
      "示例使用带宽利用率的平均值和标准差。慢链路 worker 的平均带宽低，或者标准差异常高。",
      "指纹不依赖绝对时间戳，因此不需要跨机器时钟同步。",
      "关键不是保留完整 trace，而是保留足以区分正常和异常的统计摘要。"
    ],
    talk: "这页是全场核心图。讲清楚后，后面的 beta、mu、sigma 都只是把这个思想系统化。"
  },
  {
    no: 9,
    title: "EROICA 总览：检测、采样、压缩、比较、修复",
    image: "assets/slides/slide-09.jpg",
    chapter: "系统设计",
    start: 327,
    point: "系统只在变慢时短时触发 profiling，并把每个 worker 的数据从约 3 GB 压到约 30 KB。",
    explain: [
      "流程从 iteration time degradation 开始，慢了才触发，平时零 routine overhead。",
      "所有 worker 在相同 iteration 附近做短窗口 profiling，采集 GPU、NIC、memory、Python 等数据。",
      "每台机器本地抽取函数行为指纹，再把小摘要传到中心比较定位，输出异常函数和异常 host。"
    ],
    talk: "把这页讲成一个数据工程故事：真正解决问题的是「先压缩，再比较」，而不是中心化吞下所有 trace。"
  },
  {
    no: 10,
    title: "中心服务只处理摘要",
    image: "assets/slides/slide-10.jpg",
    chapter: "系统设计",
    start: 360,
    point: "中心服务器收集的是每个 worker 的 fingerprint，而不是原始 profiling 数据。",
    explain: [
      "slide 强调 10K hosts 规模下，中心只需要 8 CPU cores。",
      "每个 worker 从 3 GB 原始数据压缩到 30 KB 指纹，中心负责 Compare & Localize。",
      "这个设计把昂贵的数据处理放在本地完成，避免网络和中心存储成为瓶颈。"
    ],
    talk: "这页重点是可扩展性：EROICA 能在线运行，是因为系统边界设计正确。"
  },
  {
    no: 11,
    title: "只给关键路径上的函数建指纹",
    image: "assets/slides/slide-11.jpg",
    chapter: "指纹抽取",
    start: 387,
    point: "EROICA 只关注阻塞训练 iteration 的 critical path 函数，减少无关数据。",
    explain: [
      "critical path 指直接决定 iteration 总时长的函数执行。",
      "当 GPU 忙时，GPU kernel 是关键；当 GPU 空闲时，真正阻塞 GPU 的 Python、通信或内存操作才是关键。",
      "只有在 critical path 上占比超过 1% 的函数会被 fingerprint，通常每个 worker 少于 20 个函数。"
    ],
    talk: "讲解时要说清「不是所有函数都重要」：性能排障关注的是谁在拖慢主路径。"
  },
  {
    no: 12,
    title: "beta、mu、sigma 三个维度",
    image: "assets/slides/slide-12.jpg",
    chapter: "指纹抽取",
    start: 440,
    point: "函数行为指纹由持续时间占比、资源利用均值和资源利用稳定性构成。",
    explain: [
      "beta 回答：这个函数是否主导了 critical path？",
      "mu 回答：函数执行期间关键硬件资源是否利用不足？",
      "sigma 回答：资源利用是否剧烈波动，是否被其他因素间歇阻塞？",
      "组合起来，Pf,w = (beta, mu, sigma) 表示 worker w 上函数 f 的行为。"
    ],
    talk: "建议把三个量翻译成排障语言：卡多久、用得满不满、稳不稳定。"
  },
  {
    no: 13,
    title: "不同函数对应不同硬件指标",
    image: "assets/slides/slide-13.jpg",
    chapter: "指纹抽取",
    start: 501,
    point: "mu 和 sigma 不是固定看一个指标，而是按函数类型选择决定性能的资源。",
    explain: [
      "GPU compute kernel 看 GPU frequency，跨机通信看 GPU-NIC bandwidth，机内通信看 NVLink，Python/host 函数看 CPU utilization。",
      "对于同一函数多次执行，mu 和 sigma 按执行时长加权平均，beta 则做求和。",
      "EROICA 还过滤 idle wait time，避免把非执行等待误算进硬件行为。"
    ],
    talk: "这页说明 EROICA 的指纹不是粗暴统计，而是把函数语义和资源指标做了匹配。"
  },
  {
    no: 14,
    title: "把所有 worker 的指纹放进一张表",
    image: "assets/slides/slide-14.jpg",
    chapter: "定位",
    start: 541,
    point: "中心化比较的输入是一张 worker x function 的行为指纹表。",
    explain: [
      "行是 worker，列是函数类型，每个单元格是 (beta, mu, sigma)。",
      "异常定位问题被转化为表格里的 outlier detection：哪一行、哪一列的行为偏离预期或偏离同伴？",
      "这也是为什么前面的压缩很重要：中心不需要原始 trace，只需要可比较的指纹矩阵。"
    ],
    talk: "讲这页时可以把 EROICA 类比成把复杂 trace 变成结构化诊断表。"
  },
  {
    no: 15,
    title: "异常类型一：偏离预期范围",
    image: "assets/slides/slide-15.jpg",
    chapter: "定位",
    start: 565,
    point: "不同函数类型有自己的 expected range，超出范围就是异常候选。",
    explain: [
      "例如 Python 函数的 beta 通常不应超过 1%，通信函数的 beta 通常不应超过 30%。",
      "这个规则提供了先验知识：即使没有同伴比较，也能判断某些行为不合理。",
      "Expected range 是把工程经验变成可自动化判断的边界。"
    ],
    talk: "这页可以解释成「规则型异常检测」：先问这个函数按常识应该长什么样。"
  },
  {
    no: 16,
    title: "异常类型二：偏离同伴分布",
    image: "assets/slides/slide-16.jpg",
    chapter: "定位",
    start: 592,
    point: "同一个函数在不同 worker 上应该聚类，离群点指向异常 worker 或异常资源。",
    explain: [
      "EROICA 使用 beta、mu、sigma 的三维行为分布做 peer comparison。",
      "如果某个 worker 的同一函数显著偏离其他 worker，就说明它的运行环境、输入、通信链路或硬件可能异常。",
      "论文里基于 Manhattan distance 做离群判断，细节在正文公式中展开。"
    ],
    talk: "这页和 slide 7 呼应：核心不是单点观测，而是利用大规模训练里的对称性。"
  },
  {
    no: 17,
    title: "结构化输出：给人，也给 AI",
    image: "assets/slides/slide-17.jpg",
    chapter: "定位",
    start: 623,
    point: "EROICA 输出异常函数、worker、时长和资源行为，既能给工程师看，也能作为 AI 修复提示。",
    explain: [
      "输出不是一句「训练慢了」，而是类似 dataloader.py: socket recv、Ring Allreduce、CUDA GEMM 这样的结构化条目。",
      "每个条目带 duration、平均资源利用率、标准差，以及和正常情况的差异。",
      "这让后续人工诊断或 AI-assisted fix 有明确上下文。"
    ],
    talk: "这里要强调 EROICA 的最后一公里：它不一定自动修好所有问题，但能把问题缩小到可行动的范围。"
  },
  {
    no: 18,
    title: "生产评估：100K GPU、1.5 年、97.5%",
    image: "assets/slides/slide-18.jpg",
    chapter: "评估",
    start: 673,
    point: "EROICA 已在阿里生产 GPU 集群运行 1.5 年，覆盖约 100K GPU，诊断成功率 97.5%。",
    explain: [
      "这页给出系统可信度：不是小规模实验，而是生产部署。",
      "最大排障任务达到 6,144 GPUs，现有工具无法诊断的 80+ cases 中，成功诊断率达到 97.5%。",
      "覆盖 NVIDIA、AMD，x86、arm，以及多种训练框架，说明它依赖的是通用行为模式，而不是某个框架特例。"
    ],
    talk: "讲评估时不要只念数字，要把数字和前面的设计目标对应起来：大规模、在线、跨栈。"
  },
  {
    no: 19,
    title: "案例：混合硬件与网络问题",
    image: "assets/slides/slide-19.jpg",
    chapter: "案例",
    start: 738,
    point: "3,400 GPU 视频生成训练中，EROICA 先定位 SendRecv 和 NIC/网络吞吐异常。",
    explain: [
      "该任务出现 unexpected throughput drops。",
      "EROICA 发现 40 个 worker 的 SendRecv latency 和其他 worker 不同，其中一个 worker 的 mu 和 sigma 又不同于其他 39 个。",
      "进一步定位到 NIC downgrade 和网络吞吐差异，并关联到缺少 affinity-based flow scheduling。"
    ],
    talk: "案例讲解要突出「混合问题」：不是单纯代码 bug，也不是单纯硬件坏，而是多个层面叠加。"
  },
  {
    no: 20,
    title: "案例：输入负载和 pin_memory",
    image: "assets/slides/slide-20.jpg",
    chapter: "案例",
    start: 790,
    point: "同一任务里，EROICA 还发现 GPU kernel 时长差异和 pin_memory 异常。",
    explain: [
      "GPU frequency 相似但 kernel execution duration 不同，说明不是 GPU 频率问题，而更像输入负载不均衡。",
      "少数 worker 的 pin_memory beta 过长，人工验证发现 DataLoader processes 过多。",
      "这说明行为指纹可以把硬件资源表现和上层数据管道问题连接起来。"
    ],
    talk: "这页适合说明 EROICA 不只是通信诊断工具，也能发现数据加载和输入分布问题。"
  },
  {
    no: 21,
    title: "案例收益：端到端性能提升 34.4%",
    image: "assets/slides/slide-21.jpg",
    chapter: "案例",
    start: 832,
    point: "修复网络、pin_memory 和负载均衡后，训练端到端性能提升 34.4%。",
    explain: [
      "修网络带来 10.3% throughput 提升。",
      "修 pin_memory 带来 3.6% 提升。",
      "修视频输入负载均衡带来 20.5% 提升。",
      "这页证明定位结果不是事后解释，而是能转化为可观的训练效率收益。"
    ],
    talk: "讲这页时可以回到成本：34.4% 在大规模 GPU 训练里意味着非常直接的时间和预算节省。"
  },
  {
    no: 22,
    title: "结论：从 always watching 到 deeply understanding",
    image: "assets/slides/slide-22.jpg",
    chapter: "结论",
    start: 958,
    point: "EROICA 用函数行为指纹连接了长期监控和深度 profiling。",
    explain: [
      "第一点总结核心贡献：Function Behavior Fingerprint 桥接了两类传统方法。",
      "第二点强调 AI-assisted performance troubleshooting 的尝试。",
      "第三点强调生产验证：since 2024，不只是一个研究故事。"
    ],
    talk: "结尾可以把整篇论文概括成一句话：用行为指纹把海量 profiling 数据压缩成可在线比较的诊断信号。"
  },
  {
    no: 23,
    title: "Q&A",
    image: "assets/slides/slide-23.jpg",
    chapter: "结尾",
    start: 1016,
    point: "主报告结束，进入问题讨论。",
    explain: [
      "如果做二次解读，这里可以转入自己的评价：EROICA 的最大价值是把复杂性能诊断工程化为结构化输出。",
      "也可以在这里补充论文没有在主报告里展开的实现挑战。"
    ],
    talk: "不要停在 thank you，而是接着总结它对 AIOps 和训练平台工程的启发。"
  },
  {
    no: 24,
    title: "补充：开销与可扩展性",
    image: "assets/slides/slide-24.jpg",
    chapter: "附录",
    start: 0,
    point: "附录页展示 profiling、summarization、upload、localization 的开销分布。",
    explain: [
      "这页用于回答一个自然疑问：在线 profiling 会不会反过来拖慢训练？",
      "EROICA 的策略是短窗口触发，采集后快速 summarization，再上传指纹而不是原始数据。",
      "如果要深入论文，可以结合正文的 overhead evaluation 进一步解释。"
    ],
    talk: "作为扩展讲解材料，适合放在「系统为什么能在生产里跑」的小节。"
  },
  {
    no: 25,
    title: "生产实现挑战一",
    image: "assets/slides/slide-25.jpg",
    chapter: "附录",
    start: 0,
    point: "同步 profiling、内存泄漏和硬件指标权限，是落地生产时必须处理的问题。",
    explain: [
      "跨 worker 同步需要保证大家在目标 step 同时开始 profiling，避免比较窗口错位。",
      "profiling 后残留 hook 会拖慢训练，因此需要改 profiling 逻辑清理 hook。",
      "客户容器通常没有硬件读权限，所以 EROICA 用 privileged sidecar 收集指标，再通过 shared dir 暴露给用户容器。"
    ],
    talk: "这页说明从论文算法到生产系统，中间有大量工程边界要处理。"
  },
  {
    no: 26,
    title: "生产实现挑战二",
    image: "assets/slides/slide-26.jpg",
    chapter: "附录",
    start: 0,
    point: "监控冲突、容错和 profiler 开销优化，是 EROICA 能长期运行的关键工程细节。",
    explain: [
      "某些硬件指标一次只能被一个进程订阅，因此需要和其他监控协同暂停与恢复。",
      "个别 worker 缺数据不能让整体诊断失效，所以系统支持 partial worker fingerprint 定位。",
      "底层 Torch Profiler 也做了优化，报告中提到开销降低 33%。"
    ],
    talk: "这页可以作为最后的工程总结：EROICA 的贡献不只是指纹算法，也包括把 profiler 放进生产集群的完整方法。"
  }
];
