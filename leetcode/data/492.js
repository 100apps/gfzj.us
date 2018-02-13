{
	"difficulty":"3",
	"submit_num":"17318",
	"show_id":"502",
	"leetcode_id":"502",
	"answers":[
		{
			"lc_ans_id":"98210",
			"view":"5865",
			"top":"0",
			"title":"Very Simple (Greedy) Java Solution using two PriorityQueues",
			"vote":"41",
			"content":"The idea is each time we find a project with ```max``` profit and within current capital capability.\\nAlgorithm:\\n1. Create (capital, profit) pairs and put them into PriorityQueue ```pqCap```. This PriorityQueue sort by capital increasingly.\\n2. Keep polling pairs from ```pqCap``` until the project out of current capital capability. Put them into \\nPriorityQueue ```pqPro``` which sort by profit decreasingly.\\n3. Poll one from ```pqPro```, it's guaranteed to be the project with ```max``` profit and within current capital capability. Add the profit to capital ```W```.\\n4. Repeat step 2 and 3 till finish ```k``` steps or no suitable project (pqPro.isEmpty()).\\n\\nTime Complexity: For worst case, each project will be inserted and polled from both PriorityQueues once, so the overall runtime complexity should be ```O(NlgN)```, N is number of projects.\\n\\n```\\npublic class Solution {\\n    public int findMaximizedCapital(int k, int W, int[] Profits, int[] Capital) {\\n        PriorityQueue<int[]> pqCap = new PriorityQueue<>((a, b) -> (a[0] - b[0]));\\n        PriorityQueue<int[]> pqPro = new PriorityQueue<>((a, b) -> (b[1] - a[1]));\\n        \\n        for (int i = 0; i < Profits.length; i++) {\\n            pqCap.add(new int[] {Capital[i], Profits[i]});\\n        }\\n        \\n        for (int i = 0; i < k; i++) {\\n            while (!pqCap.isEmpty() && pqCap.peek()[0] <= W) {\\n                pqPro.add(pqCap.poll());\\n            }\\n            \\n            if (pqPro.isEmpty()) break;\\n            \\n            W += pqPro.poll()[1];\\n        }\\n        \\n        return W;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98216",
			"view":"1247",
			"top":"1",
			"title":"Python solution by priority queue with explanation",
			"vote":"6",
			"content":"Loop k times:\\nAdd all possible projects (Capital <= W) into the priority queue with the priority = -Profit.\\nGet the project with the smallest priority (biggest Profit).\\nAdd the Profit to W\\n\\n\\n```\\ndef findMaximizedCapital(self, k, W, Profits, Capital):\\n        heap = []\\n        projects = sorted(zip(Profits, Capital), key=lambda l: l[1])\\n        i = 0\\n        for _ in range(k):\\n            while i < len(projects) and projects[i][1] <= W:\\n                heapq.heappush(heap, -projects[i][0])\\n                i += 1\\n            if heap: W -= heapq.heappop(heap)\\n        return W\\n````\\nEdited after sha256pki's suggestion"
		},
		{
			"lc_ans_id":"98213",
			"view":"2259",
			"top":"2",
			"title":"8-liner C++ 42ms beat 98% greedy algorithm (detailed explanation)",
			"vote":"5",
			"content":"**Key Observation:** \\n1. The more capital `W` you have now, the more maximum capital you will eventually earn.\\n2. Working on any doable project with positive `P[i] > 0` increases your capital `W`.\\n3. Any project with `P[i] = 0` is useless and should be filtered away immediately (note that the problem only guarantees all inputs non-negative).\\n\\nTherefore, always work on the most profitable project `P[i]` first as long as it is doable until we reach maximum `k` projects or all doable projects are done.\\n\\nThe algorithm will be straightforward:\\n1. At each stage, split projects into two categories:\\n   * \"doables\": ones with `C[i] <= W` (store `P[i]` in `priority_queue<int> low`)\\n   * \"undoables\": ones with `C[i] > W` (store `(C[i], P[i])` in `multiset<pair<int,int>> high`)\\n2. Work on most profitable project from `low` (`low.top()`) first, and update capital `W += low.top()`.\\n3. Move those previous undoables from `high` to doables `low` whose `C[i] <= W`.\\n4. Repeat steps 2 and 3 until we reach maximum `k` projects or no more doable projects.  \\n```\\n    int findMaximizedCapital(int k, int W, vector<int>& P, vector<int>& C) {\\n      priority_queue<int> low;      // P[i]'s within current W\\n      multiset<pair<int,int>> high; // (C[i],P[i])'s' outside current W\\n      \\n      for (int i = 0; i < P.size(); ++i) // initialize low and high\\n        if(P[i] > 0) if (C[i] <= W) low.push(P[i]); else high.emplace(C[i], P[i]);\\n    \\n      while (k-- && low.size()) { \\n        W += low.top(), low.pop(); // greedy to work on most profitable first\\n        for (auto i = high.begin(); high.size() && i->first <= W; i = high.erase(i)) low.push(i->second);\\n      }\\n      return W;\\n    }\\n```"
		},
		{
			"lc_ans_id":"98223",
			"view":"1484",
			"top":"3",
			"title":"Python solution",
			"vote":"5",
			"content":"Keep a max-heap of current possible profits. Insert possible profits as soon as their needed capital is reached.\\n\\n    def findMaximizedCapital(self, k, W, Profits, Capital):\\n        current = []\\n        future = sorted(zip(Capital, Profits))[::-1]\\n        for _ in range(k):\\n            while future and future[-1][0] <= W:\\n                heapq.heappush(current, -future.pop()[1])\\n            if current:\\n                W -= heapq.heappop(current)\\n        return W"
		},
		{
			"lc_ans_id":"98217",
			"view":"835",
			"top":"4",
			"title":"Sorting + One O(k)-size Priority Queue Solution",
			"vote":"2",
			"content":"There are many excellent solutions based on two priority queue solution, however, we do not need to maintain two priority queues that contain all projects. \\n* If we sort the Capital in increasing order, we can insert \"doable\" project into the pq until we meet an \"undoable\" project. \\n\\n* We need only one priority queue (multiset) to maintain the \"doable\" projects. Here the key observation is: we can only pop k times. So we do not need to maintain a large priority queue. Every time we find the size of PQ is larger than k (k is shrinking!!!), we just erase the project with least profit from the PQ.\\n\\n* Note that the worst case time complexity is still O(NlogN), because we need to sort : )\\n\\n```\\nclass Solution {\\npublic:\\n    struct Node {int profit, capital;};\\n\\n    int findMaximizedCapital(int k, int W, vector<int>& Profits, vector<int>& Capital) {\\n        if(Profits.empty() || Capital.empty()) return W;\\n        vector<Node*> projects;\\n        for(int i = 0; i < Profits.size(); i++) \\n            projects.push_back(new Node({Profits[i], Capital[i]}));\\n        multiset<int> pq;\\n        sort(projects.begin(), projects.end(), [&](Node* n1, Node* n2) {return n1->capital < n2->capital;});\\n        for(auto start = projects.begin(); k > 0; k--) {\\n            for(; start != projects.end() && (*start)->capital <= W; start++) {\\n                pq.insert((*start)->profit);\\n                if(pq.size() > k) pq.erase(pq.begin());\\n            } \\n            if(pq.empty()) break;\\n            W += *pq.rbegin();\\n            pq.erase(prev(pq.end()));\\n        }\\n        return W;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"98236",
			"view":"136",
			"top":"5",
			"title":"Simple Recursive Solution",
			"vote":"1",
			"content":"\\n```class Solution {\\n   \\npublic:\\n\\n\\nint MaximizedCapital(int &k, int &W, vector<int> &Profits, vector<int> &Capital, int depth)\\n{\\n   cout<<depth<<endl;\\n    if (depth==k)\\n    {\\n        return W;\\n    }\\n     int BestProfit1 =W;\\n        //vector <int> projects;\\n        \\n        int bestProfit2=0;\\n        vector <int> NewCapital;\\n        int Number=0;\\n         vector <int> NewProfits;\\n        for (int i=0; i<Capital.size(); i++)\\n        {\\n            if (Capital[i]<=W && Profits[i]>=bestProfit2)\\n            {\\n               bestProfit2=Profits[i];\\n                Number=i;\\n            }\\n        }\\n        for (int t=0; t<Capital.size(); t++)\\n           {\\n               if (t!=Number)\\n               {\\n                   NewCapital.push_back(Capital[t]);\\n                   NewProfits.push_back(Profits[t]);\\n               }\\n           }\\n           Capital.erase(Capital.begin(), Capital.end());\\n           Profits.erase(Profits.begin(), Profits.end());\\n      \\n       if (bestProfit2!=0)\\n       {\\n           W+=bestProfit2;\\n          \\n           int temp=MaximizedCapital( k, W,  NewProfits, NewCapital,  depth+1);\\n          \\n           if (temp>BestProfit1)\\n           {\\n               BestProfit1=temp;\\n           }\\n           NewCapital.clear();\\n           NewProfits.clear();\\n          W-=bestProfit2;\\n            \\n        }\\n    \\n        return BestProfit1;\\n      \\n    \\n}\\n    int findMaximizedCapital(int k, int W, vector<int> &Profits, vector<int> &Capital) {\\n        int BestProfit1 =W;\\n        int tempsum=0;\\n       // vector <int> projects;\\n        if (Capital.size()==k)\\n        {\\n            for (int i=0; i<k; i++)\\n            {\\n                tempsum+=Profits[i];\\n            }\\n            return tempsum+W;\\n        }\\n        \\n        int bestProfit2=0;\\n        vector <int> NewCapital;\\n        int Number=0;\\n         vector <int> NewProfits;\\n        for (int i=0; i<Capital.size(); i++)\\n        {\\n            if (Capital[i]<=W && Profits[i]>=bestProfit2)\\n            {\\n               bestProfit2=Profits[i];\\n                Number=i;\\n            }\\n        }\\n       \\n     // cout<<bestProfit2;\\n       if (bestProfit2!=0)\\n       {\\n           W+=bestProfit2;\\n           for (int t=0; t<Capital.size(); t++)\\n           {\\n               if (t!=Number)\\n               {\\n                   NewCapital.push_back(Capital[t]);\\n                   NewProfits.push_back(Profits[t]);\\n               }\\n           }\\n           int temp=MaximizedCapital( k, W,  NewProfits, NewCapital,  1);\\n          \\n           if (temp>BestProfit1)\\n           {\\n               BestProfit1=temp;\\n           }\\n           NewCapital.clear();\\n           NewProfits.clear();\\n          W-=bestProfit2;\\n            \\n        }\\n    \\n        return BestProfit1;\\n      \\n    \\n}\\n};```"
		},
		{
			"lc_ans_id":"98256",
			"view":"283",
			"top":"6",
			"title":"O(n log n) Solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int findMaximizedCapital(int k, int W, vector<int>& Profits, vector<int>& Capital) {\\n        int n = Profits.size();\\n        vector<pair<int, int>> a;\\n        for (int i = 0; i < n; ++i) {\\n            a.push_back(make_pair(Capital[i], Profits[i]));\\n        }\\n        sort(begin(a), end(a));\\n        \\n        priority_queue<int> heap;\\n        int j=0;\\n        for (j = 0; j < n; ++j) {\\n            if (a[j].first <= W) heap.push(a[j].second);\\n            else break;\\n        }\\n        \\n        int maxCap = W;\\n        while (heap.size() > 0 && k > 0) {\\n            auto x = heap.top(); heap.pop();\\n            maxCap += x;\\n            --k;\\n            \\n            for (; j < n; ++j) {\\n                if (a[j].first <= maxCap) heap.push(a[j].second);\\n                else break;\\n            }\\n        }\\n        return maxCap;\\n    }\\n};"
		},
		{
			"lc_ans_id":"98258",
			"view":"342",
			"top":"7",
			"title":"O(max(NK, NlogN)) algorithm, not using heap, just barely pass the OJ...",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def findMaximizedCapital(self, k, W, Profits, Capital):\\n        pc = zip(Profits, Capital)\\n        pc.sort(key=lambda (x, y): (-x, y))\\n        max_needed_capital = 0\\n        idx = 0\\n        for _ in range(k):\\n            for i in xrange(idx, len(pc)):\\n                p, c = pc[i]\\n                if c is None:\\n                    continue\\n                max_needed_capital = max(max_needed_capital, c)\\n                idx += 1\\n                if max_needed_capital > W:\\n                    idx = 0\\n                if c <= W:\\n                    W += p\\n                    pc[i] = (0, None)\\n                    break\\n            else:\\n                return W\\n        return W\\n```"
		},
		{
			"lc_ans_id":"98208",
			"view":"31",
			"top":"8",
			"title":"Test case",
			"vote":"0",
			"content":"```\\n10\\n0\\n[1,2,3]\\n[0,1,2]\\nOutput:\\n27\\nExpected:\\n6\\n```\\n\\nCan anybody explain me why? \\nPlease say where I am wrong.\\n- We are doing projects one by one\\n- We have starting capital and check can we do project at the beginning. At the first turn we can do only first project and have profit 1;\\n- On next turn do we add received profit to existing capital? So, in my understanding we have capital 1, so we are able to do 2nd project and have income 2 after two projects. So in total 3\\n- Turn 3 we can start project 3 and have income 3. \\n- and so on\\nWhat is wrong with my understanding of task?"
		},
		{
			"lc_ans_id":"98211",
			"view":"59",
			"top":"9",
			"title":"Java solution",
			"vote":"0",
			"content":"Sort the jobs first by profit, breaking ties with the cost.\\n\\n```\\nclass Solution {\\n    private class Job {\\n        int profit;\\n        int cost;\\n        \\n        Job(int p, int c) {\\n            profit = p;\\n            cost = c;\\n        }\\n    }\\n    \\n    public int findMaximizedCapital(int k, int W, int[] Profits, int[] Capital) {\\n        if (k == 0) {\\n            return W;\\n        }\\n        \\n        int n = Profits.length;\\n        List<Job> jobs = new ArrayList<>();\\n        for (int i = 0; i < Profits.length; ++i) {\\n            jobs.add(new Job(Profits[i], Capital[i]));\\n        }\\n        \\n        Collections.sort(jobs, new Comparator<Job>() {\\n            @Override\\n            public int compare(Job a, Job b) {\\n                if (a.profit == b.profit) {\\n                    return Integer.compare(a.cost, b.cost);\\n                }\\n                \\n                return Integer.compare(a.profit, b.profit);\\n            }\\n        });\\n        \\n        while (k > 0) {\\n            int temp = k;\\n            \\n            for (int i = jobs.size() - 1; i > -1; --i) {\\n                if (W >= jobs.get(i).cost) {\\n                    W += jobs.get(i).profit;\\n                    k--;\\n                    \\n                    jobs.remove(i);\\n                    break;\\n                }\\n            }\\n            \\n            if (k == temp) break;\\n        }\\n        \\n        return W;\\n    }\\n}\\n\\n```"
		}
	],
	"id":"492",
	"title":"IPO",
	"content":"<p>\r\nSuppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most <b>k</b> distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most <b>k</b> distinct projects. \r\n</p>\r\n\r\n<p>\r\nYou are given several projects. For each project <b>i</b>, it has a pure profit <b>P<sub>i</sub></b> and a minimum capital of <b>C<sub>i</sub></b> is needed to start the corresponding project. Initially, you have <b>W</b> capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.\r\n</p>\r\n\r\n<p>\r\nTo sum up, pick a list of at most <b>k</b> distinct projects from given projects to maximize your final capital, and output your final maximized capital.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> k=2, W=0, Profits=[1,2,3], Capital=[0,1,1].\r\n\r\n<b>Output:</b> 4\r\n\r\n<b>Explanation:</b> Since your initial capital is 0, you can only start the project indexed 0.\r\n             After finishing it you will obtain profit 1 and your capital becomes 1.\r\n             With capital 1, you can either start the project indexed 1 or the project indexed 2.\r\n             Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.\r\n             Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You may assume all numbers in the input are non-negative integers.</li>\r\n<li>The length of Profits array and Capital array will not exceed 50,000.</li>\r\n<li>The answer is guaranteed to fit in a 32-bit signed integer.</li>\r\n</ol>\r\n</p>",
	"frequency":"97",
	"ac_num":"6356"
}