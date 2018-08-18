{
	"difficulty":"2",
	"submit_num":"17866",
	"show_id":"659",
	"leetcode_id":"659",
	"answers":[
		{
			"lc_ans_id":"106496",
			"view":"10016",
			"top":"0",
			"title":"Java O(n) Time O(n) Space",
			"vote":"52",
			"content":"1) We iterate through the array once to get the frequency of all the elements in the array\\n2) We iterate through the array once more and for each element we either see if it can be appended to a previously constructed consecutive sequence or if it can be the start of a new consecutive sequence. If neither are true, then we return false.\\n\\n\\n```\\npublic boolean isPossible(int[] nums) {\\n    Map<Integer, Integer> freq = new HashMap<>(), appendfreq = new HashMap<>();\\n    for (int i : nums) freq.put(i, freq.getOrDefault(i,0) + 1);\\n    for (int i : nums) {\\n        if (freq.get(i) == 0) continue;\\n        else if (appendfreq.getOrDefault(i,0) > 0) {\\n            appendfreq.put(i, appendfreq.get(i) - 1);\\n            appendfreq.put(i+1, appendfreq.getOrDefault(i+1,0) + 1);\\n        }   \\n        else if (freq.getOrDefault(i+1,0) > 0 && freq.getOrDefault(i+2,0) > 0) {\\n            freq.put(i+1, freq.get(i+1) - 1);\\n            freq.put(i+2, freq.get(i+2) - 1);\\n            appendfreq.put(i+3, appendfreq.getOrDefault(i+3,0) + 1);\\n        }\\n        else return false;\\n        freq.put(i, freq.get(i) - 1);\\n    }\\n    return true;\\n}\\n```"
		},
		{
			"lc_ans_id":"106495",
			"view":"4403",
			"top":"1",
			"title":"Java O(n) time & O(1) space solution",
			"vote":"30",
			"content":"The basic idea is that, for each distinct element `ele` in the input array, we only need to maintain three pieces of information: the number of consecutive subsequences ending at `ele` with length  of `1`, length of `2` and length `>= 3`.\\n\\nThe input array will be scanned linearly from left to right. Let `cur` be the element currently being examined and `cnt` as its number of appearance. `pre` is the element processed immediately before `cur`. The number of consecutive subsequences ending at `pre` with length  of `1`, length of `2` and length `>= 3` are denoted as `p1`, `p2` and `p3`, respectively. There are two cases in general:\\n\\n1. `cur != pre + 1`: for this case, `cur` cannot be added to any consecutive subsequences ending at `pre`, therefore, we must have `p1 == 0 && p2 == 0`; otherwise the input array cannot be split into consecutive subsequences of length `>= 3`. Now let `c1, c2, c3` be the number of consecutive subsequences ending at `cur` with length  of `1`, length of `2` and length `>= 3`, respectively, we will have `c1 = cnt, c2 = 0, c3 = 0`, which means we only have consecutive subsequence ending at `cur` with length of `1` and its number given by `cnt`.\\n\\n2. `cur == pre + 1`: for this case, `cur` can be added to consecutive subsequences ending at `pre` and thus extend those subsequences. But priorities should be given to those with length of `1` first, then length of `2` and lastly length `>= 3`. Also we must have `cnt >= p1 + p2`; otherwise the input array cannot be split into consecutive subsequences of length `>= 3`. Again let `c1, c2, c3` be the number of consecutive subsequences ending at `cur` with length  of `1`, length of `2` and length `>= 3`, respectively, we will have: `c2 = p1, c3 = p2 + min(p3, cnt - (p1 + p2)), c1 = max(cnt - (p1 + p2 + p3), 0)`. The meaning is as follows: first adding `cur` to the end of subsequences of length `1` will make them subsequences of length `2`, and we have `p1` such subsequences, therefore `c2 = p1`. Then adding `cur` to the end of subsequences of length `2` will make them subsequences of length `3`, and we have `p2` such subsequences, therefore `c3` is at least `p2`. If `cnt > p1 + p2`, we can add the remaining `cur` to the end of subsequences of length  `>= 3` to make them even longer subsequences. The number of such subsequences is the smaller one of `p3` and `cnt - (p1 + p2)`. In total, `c3 = p2 + min(p3, cnt - (p1 + p2))`. If `cnt > p1 + p2 + p3`, then we still have remaining `cur` that cannot be added to any subsequences. These residue `cur` will form subsequences of length `1`, hence `c1 = max(cnt - (p1 + p2 + p3), 0)`. \\n\\nFor either case, we need to update: `pre = cur, p1 = c1, p2 = c2, p3 = c3` after processing the current element. When all the elements are done, we check the values of `p1` and `p2`. The input array can be split into consecutive subsequences of length `>= 3` if and only if `p1 == 0 && p2 == 0`.\\n\\nHere is the `O(n)` time and `O(1)` space Java solution:\\n\\n```\\npublic boolean isPossible(int[] nums) {\\n    int pre = Integer.MIN_VALUE, p1 = 0, p2 = 0, p3 = 0;\\n    int cur = 0, cnt = 0, c1 = 0, c2 = 0, c3 = 0;\\n        \\n    for (int i = 0; i < nums.length; pre = cur, p1 = c1, p2 = c2, p3 = c3) {\\n        for (cur = nums[i], cnt = 0; i < nums.length && cur == nums[i]; cnt++, i++);\\n            \\n        if (cur != pre + 1) {\\n            if (p1 != 0 || p2 != 0) return false;\\n            c1 = cnt; c2 = 0; c3 = 0;\\n                \\n        } else {\\n            if (cnt < p1 + p2) return false;\\n            c1 = Math.max(0, cnt - (p1 + p2 + p3));\\n            c2 = p1;\\n            c3 = p2 + Math.min(p3, cnt - (p1 + p2));\\n        }\\n    }\\n    \\n    return p1 == 0 && p2 == 0;\\n}\\n```"
		},
		{
			"lc_ans_id":"106516",
			"view":"3113",
			"top":"2",
			"title":"Simple C++ Greedy O(nlogn) Solution (with explanation)",
			"vote":"13",
			"content":"**The Algorithm**\\n\\nMaintain a set of consecutive sequences, call this set `s`. `s` begins as an empty set of consecutive sequences.\\n\\nNow, iterate through each `num` in `nums`. For each iteration, if there exists a consecutive sequence in `s` that ends with element `num-1`, then append `num` to the end of the shortest such sequence; otherwise, create a new sequence that begins with `num`. \\n\\nThe problem has a solution (i.e. the array can be split into consecutive subsequences such that each subsequence consists of at least 3 consecutive integers) if and only if each sequence in `s` has size greater than or equal to 3.\\n\\n**Proof of Algorithm**\\n\\nWhy does this algorithm work? It was intuitive to me, but I could not indisputably prove that it was correct. Hopefully, someone else can prove it.\\n\\n**Implementation**\\n\\nWe don't need to actually store each sequence. Instead, we just need to know (1) the number of sequences that end at a particular element, and (2) the size of each of those sequences. To implement this, we can have an unordered map `backs` to represent the sequences: `backs[key]` returns a priority queue (smallest value at top) of the sizes of all sequences that end with element `key`. Now that we have (1) and (2), we can implement the algorithm above without knowing each particular sequence. \\n\\nFor each `num` in `nums`, if there exists any sequence that ends with `num-1` (i.e. if `backs[num-1]` is a non-empty priority queue), then find such a sequence with the smallest possible size (get the smallest value from the priority queue at `backs[num-1]`). Now, the sequence will be extended by 1 since we will add `num` to it. So pop the smallest value `count` from the priority queue at `backs[num-1]`, and add a new value `count+1` to the priority queue at `backs[num]`.\\n\\nIf no sequence was found that ends in `num-1` (i.e. `backs[num-1]` is empty), then create a new sequence. In other words, add `1` to the priority queue at `backs[num]`.\\n\\n**The Code**\\n\\n```\\nclass Solution {\\npublic:\\n\\tbool isPossible(vector<int>& nums)\\n\\t{\\n\\t\\tunordered_map<int, priority_queue<int, vector<int>, std::greater<int>>> backs;\\n\\n\\t\\t// Keep track of the number of sequences with size < 3\\n\\t\\tint need_more = 0;\\n\\n\\t\\tfor (int num : nums)\\n\\t\\t{\\n\\t\\t\\tif (! backs[num - 1].empty())\\n\\t\\t\\t{\\t// There exists a sequence that ends in num-1\\n\\t\\t\\t\\t// Append 'num' to this sequence\\n\\t\\t\\t\\t// Remove the existing sequence\\n\\t\\t\\t\\t// Add a new sequence ending in 'num' with size incremented by 1 \\n\\t\\t\\t\\tint count = backs[num - 1].top();\\n\\t\\t\\t\\tbacks[num - 1].pop();\\n\\t\\t\\t\\tbacks[num].push(++count);\\n\\n\\t\\t\\t\\tif (count == 3)\\n\\t\\t\\t\\t\\tneed_more--;\\n\\t\\t\\t}\\n\\t\\t\\telse\\n\\t\\t\\t{\\t// There is no sequence that ends in num-1\\n\\t\\t\\t\\t// Create a new sequence with size 1 that ends with 'num'\\n\\t\\t\\t\\tbacks[num].push(1);\\n\\t\\t\\t\\tneed_more++;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn need_more == 0;\\n\\t}\\n};\\n```\\n**Improvements**\\n\\nI know that there are O(n) solutions out there that use different algorithms. Can my algorithm be implemented more efficiently to be O(n) instead of O(nlogn)? \\n\\nThoughts?"
		},
		{
			"lc_ans_id":"106493",
			"view":"795",
			"top":"3",
			"title":"C++ O(n) solution, two pass",
			"vote":"8",
			"content":"The idea is , we scan the array for two times.\\nIn first pass we count the frequencies of all numbers and record them in ```cnt```\\nFor the second pass, we are \"building\" our subsequences by the following rules:\\n1. We use a hashmap called ```tails``` to record extra information, where ```tails[i]``` means the number of consecutive subsequences we've found so far, who are longer than 3 , and tailed by number ```i```,\\n2. When we meet number ```i```, try to put it to the tail of one of found subsequences tailed by ```i-1```. No need to worry that we might have a better choice to consider ```i``` as a brand new head for another subsequence, because we can always append the new subsequence to a previous one tailed by ```i-1```.\\n3. If we can't, it will cost one ```i+1``` and one ```i+2``` later to generate a new sequence. We just pay that right now by decrease ```cnt[i+1]``` and ```cnt[i+2]```. Some one may worry that we make use of the numbers we haven't scanned so far. But actually we've already kept track of the numbers remained by ```cnt```.  Just imaging we grab the numbers needed from the very end of the string, and mark them as \"used\". If there is no such number available to pay, ```cnt``` will tell us by checking ```cnt[i+1]``` ```cnt[i+2]``` is positive or not \\n\\nThe code is short and concise, shown below: \\n```\\nbool isPossible(vector<int>& nums) {\\n        unordered_map<int,int> cnt, tails;\\n        for(int &i : nums) cnt[i]++;\\n        for(int &i : nums){\\n            if(!cnt[i]) continue;\\n            cnt[i]--;\\n            if(tails[i-1] > 0){\\n                tails[i-1]--;\\n                tails[i]++;\\n            }\\n            else if(cnt[i+1] && cnt[i+2]){\\n                cnt[i+1]--;\\n                cnt[i+2]--;\\n                tails[i+2]++;\\n            }\\n            else return false;\\n        }\\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"106521",
			"view":"2436",
			"top":"4",
			"title":"C++, DP easy to understand, O(n) time O(1) space",
			"vote":"7",
			"content":"I feel this problem hard. The idea here is DP.\\n\\n1) If numbers are not continuous, I check each segment. For example, 1,2,3,3,4,5,    9,10,11;\\n2) Count frequency of each continuous number. Note the value of numbers doesn't matter.\\n3) DP part. I use parameter \"ones\" for subsequences with length 1 ending with index i, \"twos\" for subsequences with length 2 ending with index i, and \"tot\" for all subsequences ending with index i. \\nWhen processing next number, if the frequency of new number mp[i+1] < ones+twos, there is no way to split, return false. \\nIn a greedy way, we need append the new number to short sequences first.  So\\ntwos[i+1] = ones[i]; \\nones[i+1] = mp[i+1]-tot,  i.e. the extra new number\\nIf it is possible to split, ones and twos would be 0 by the end of the loop.\\n\\nThe run time is clearly O(n).\\n```\\nclass Solution {\\npublic:\\n    bool isPossible(vector<int>& nums) {\\n        int n = nums.size(), k = 0;\\n        //if nums are not continuous, check each section\\n        //for example, 1,2,3, 6,7,8;\\n        for (int i = 1; i < n; i++) {\\n            if (nums[i]-nums[i-1] > 1) {\\n                if (!check(nums, k, i-1)) \\n                    return false;\\n                k = i;\\n            }\\n        }\\n        return check(nums, k, n-1);\\n    }\\nprivate:\\n    bool check(vector<int>& nums, int s, int e) {\\n        int n = nums[e]-nums[s]+1;\\n        // count frequency of each number\\n        vector<int> mp(n, 0);\\n        for (int i = s, tmp = nums[s]; i <= e; i++)\\n            mp[nums[i]-tmp]++;\\n        // ones is subsequences with length 1 ending with index i-1\\n        // twos is subsequences with length 2 ending with index i-1\\n        // tot  is all subsequences ending with index i-1\\n        // initially ones[0] ending with index -1, i.e. nonexistent \\n        vector<int> ones(n+1, 0), twos(n+1, 0), tot(n+1, 0);\\n        for (int i = 0; i < n; i++) {\\n            // we need at least ones+twos new number to make consecutive sequence\\n            // for examle, two 2, five 1,2, we need at least seven 3\\n            if (mp[i] < ones[i] + twos[i]) return false;\\n            // Greedy, appending to short sequences first\\n            // so twos = ones, and new ones is the extra new number\\n            twos[i+1] = ones[i];\\n            ones[i+1] = max(0, mp[i]-tot[i]);\\n            tot[i+1] = mp[i];\\n        }\\n        // if no subsequence length <= 2, return true\\n        return ones[n] == 0 && twos[n] == 0;\\n    }\\n};\\n```\\nSame code but O(1) space\\n```\\nclass Solution {\\npublic:\\n    bool isPossible(vector<int>& nums) {\\n        int n = nums.size(), k = 0;\\n        for (int i = 1; i < n; i++) {\\n            if (nums[i]-nums[i-1] > 1) {\\n                if (!check(nums, k, i)) \\n                    return false;\\n                k = i;\\n            }\\n        }\\n        return check(nums, k, n);\\n    }\\nprivate:\\n    bool check(vector<int>& nums, int s, int e) {\\n        int ones = 0, twos = 0, tot = 0;\\n        for (int i = s+1, cnt = 1; i <= e; i++) {\\n            if (i < e && nums[i] == nums[i-1])\\n                cnt++;\\n            else {\\n                if (cnt < ones + twos) return false;\\n                twos = ones;\\n                ones = max(0, cnt-tot);\\n                tot = cnt;\\n                cnt = 1;\\n            }\\n        }\\n        return ones == 0 && twos == 0;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106538",
			"view":"1724",
			"top":"5",
			"title":"Python, O(N) Straightforward Solution",
			"vote":"7",
			"content":"First, let's break up the problem into groups based on if elements are adjacent.  These are disjoint subproblems that don't interfere with each other since each subsequence cannot be in more than one group, so we can solve them separately.\\n\\nNow, for each group of consecutive elements, we'll work with how many copies of each element there is.  For example, if we have ```[1, 2, 3, 3, 4, 4, 4, 5, 6, 7, 7]```, then the copies are ```chunk = [1, 1, 2, 3, 1, 1, 2]```.\\n\\nThe key idea is: if we go from say, two copies of 10 to five copies of 11, we know that 3 subsequences must have started at 11.  Similarly, if we go from five copies of 11 to three copies of 12, we know that 2 subsequences must have ended at 11.\\n\\nNow knowing the start and ending positions of every subsequence, let's try to pair the k-th starting position with the k-th ending position.  This will make the minimum sized subsequence as long as possible.  If they are all legal subsequences, it's possible; otherwise, it's impossible.\\n\\nNote that this solution can easily be modified to change the minimum of ```K = 3``` to any minimum, by changing ```s+2```.  Also note that in the above argument, there could have been more starting and ending positions, but adding more will only make some subsequences smaller, so we don't need to consider those cases.\\n\\n```\\ndef isPossible(self, A):\\n    counts = [(x, len(list(group)))\\n              for x, group in itertools.groupby(A)]\\n\\n    def possible(chunk):\\n        starts, ends = [], []\\n        prev_count = 0\\n        for time, count in enumerate(chunk):\\n            if count > prev_count:\\n                starts.extend([time] * (count - prev_count))\\n            elif count < prev_count:\\n                ends.extend([time-1] * (prev_count - count))\\n            prev_count = count\\n\\n        ends.extend([time] * count)\\n        return all(e >= s+2 for s, e in zip(starts, ends))\\n\\n    chunk = []\\n    prev = None\\n    for x, count in counts:\\n        if prev is None or x - prev == 1:\\n            chunk.append(count)\\n        else:\\n            if not possible(chunk):\\n                return False\\n            chunk = []\\n        prev = x\\n\\n    return possible(chunk)\\n```"
		},
		{
			"lc_ans_id":"106503",
			"view":"1137",
			"top":"6",
			"title":"Please explain why [1,2,3,4,5] is correct",
			"vote":"5",
			"content":"result should be false or just note the length of input  is guaranteed >= 6"
		},
		{
			"lc_ans_id":"106508",
			"view":"398",
			"top":"7",
			"title":"The problem is unclear and tests seem contradictive",
			"vote":"5",
			"content":"Two test cases:\\n\\n[1,2,3,4,4,5] yields false\\n[1,2,3] yields true\\n\\nIf the original array without split can be a sub-sequence, then [1,2,3,4,4,5] can be a sub-sequence where 3 consecutive integers are present. So the result should be True.\\n\\nIf it's not, then how can [1,2,3] be True?"
		},
		{
			"lc_ans_id":"106514",
			"view":"509",
			"top":"8",
			"title":"Python esay understand solution",
			"vote":"5",
			"content":"I used a greedy alorithme.\\n ```left```is a hashmap, ```left[i]``` counts the number of ``` i ``` that I haven't placed yet.\\n ```end ```is a hashmap, ```end[i]``` counts the number of  consecutive subsequences that ends at number ```i```\\nThen I tried to split the nums one by one.\\nIf I could neigther add a number to the end of a existing consecutive subsequence nor find two following number in the left, I returned ```False```\\n\\n\\n````\\ndef isPossible(self, nums):\\n        left = collections.Counter(nums)\\n        end = collections.Counter()\\n        for i in nums:\\n            if not left[i]: continue\\n            left[i] -= 1\\n            if end[i - 1] > 0:\\n                end[i - 1] -= 1\\n                end[i] += 1\\n            elif left[i + 1] and left[i + 2]:\\n                left[i + 1] -= 1\\n                left[i + 2] -= 1\\n                end[i + 2] += 1\\n            else:\\n                return False\\n        return True"
		},
		{
			"lc_ans_id":"106539",
			"view":"912",
			"top":"9",
			"title":"Python Solution using PriorityQueue",
			"vote":"5",
			"content":"I am using a kind of greedy method. `runs` build a map between `tail number` and the current `run length`. For example, for a consecutive seq `3,4,5`, the `key(tail number)` is `5` and length is `3`. \\n\\nThe problem is there might be multiple sub seqs which all end with the same number, but have different length.  like we have another subseq `4,5`. So there are two entries in the value part of `5`:  `runs: {5: [3,2]}`\\n\\nso, when we met a new number `6`, we want to merge it into existing subseqs. Which one should we use? Intuitively, if we pick up the shorter one and append the new number into that, we are more likely to make sure all the seqs are longer than `3`. So I use a PriorityQueue to store these length.\\n\\n```\\nimport heapq\\nclass Solution(object):\\n    def isPossible(self, A):\\n        runs = {} # end -> [lengths]\\n        for v in A:\\n            if v - 1 not in runs:\\n                if v not in runs:\\n                    runs[v] = [1]\\n                else:\\n                    heapq.heappush(runs[v], 1)\\n            else:\\n                length = heapq.heappop(runs[v-1]) + 1\\n                if len(runs[v-1]) == 0:\\n                    del runs[v-1]\\n                if v not in runs:\\n                    runs[v] = []\\n                heapq.heappush(runs[v], length)\\n        for v, arr in runs.items():\\n            if len(arr) > 0 and min(arr) < 3:\\n                return False\\n        return True\\n```"
		}
	],
	"id":"636",
	"title":"Split Array into Consecutive Subsequences",
	"content":"<p>You are given an integer array sorted in ascending order (may contain duplicates), you need to split them into several subsequences, where each subsequences consist of at least 3 consecutive integers. Return whether you can make such a split.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3,3,4,5]\r\n<b>Output:</b> True\r\n<b>Explanation:</b>\r\nYou can split them into two consecutive subsequences : \r\n1, 2, 3\r\n3, 4, 5\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3,3,4,4,5,5]\r\n<b>Output:</b> True\r\n<b>Explanation:</b>\r\nYou can split them into two consecutive subsequences : \r\n1, 2, 3, 4, 5\r\n3, 4, 5\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3,4,4,5]\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of the input is in range of [1, 10000]</li>\r\n</ol>\r\n</p>",
	"frequency":"138",
	"ac_num":"6550"
}