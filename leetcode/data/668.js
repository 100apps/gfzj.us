{
	"difficulty":"3",
	"submit_num":"9458",
	"show_id":"691",
	"leetcode_id":"691",
	"answers":[
		{
			"lc_ans_id":"108318",
			"view":"3932",
			"top":"0",
			"title":"C++/Java/Python, DP + Memoization with optimization, 29 ms (C++)",
			"vote":"31",
			"content":"There are potentially a lot of overlapping sub problems, but meanwhile we don't exactly know what those sub problems are. DP with memoization works pretty well in such cases. The workflow is like backtracking, but with memoization. Here I simply use a sorted string of target as the key for the unordered_map DP. A sorted target results in a unique sub problem for possibly different strings.\\n```\\ndp[s] is the minimum stickers required for string s (-1 if impossible). Note s is sorted.\\nclearly, dp[\"\"] = 0, and the problem asks for dp[target].\\n```\\nThe DP formula is:\\n```\\ndp[s] = min(1+dp[reduced_s]) for all stickers, \\nhere reduced_s is a new string after certain sticker applied\\n```\\nOptimization: If the target can be spelled out by a group of stickers, at least one of them has to contain character target[0]. So I explicitly require next sticker containing target[0], which significantly reduced the search space.\\n\\nBTW, I am not good at Java. Looking forward to your revision!\\n\\nC++\\n```\\nclass Solution {\\npublic:\\n    int minStickers(vector<string>& stickers, string target) {\\n        int m = stickers.size();\\n        vector<vector<int>> mp(m, vector<int>(26, 0));\\n        unordered_map<string, int> dp;\\n        // count characters a-z for each sticker \\n        for (int i = 0; i < m; i++) \\n            for (char c:stickers[i]) mp[i][c-'a']++;\\n        dp[\"\"] = 0;\\n        return helper(dp, mp, target);\\n    }\\nprivate:\\n    int helper(unordered_map<string, int>& dp, vector<vector<int>>& mp, string target) {\\n        if (dp.count(target)) return dp[target];\\n        int ans = INT_MAX, n = mp.size();\\n        vector<int> tar(26, 0);\\n        for (char c:target) tar[c-'a']++;\\n        // try every sticker\\n        for (int i = 0; i < n; i++) {\\n            // optimization\\n            if (mp[i][target[0]-'a'] == 0) continue; \\n            string s;\\n            // apply a sticker on every character a-z\\n            for (int j = 0; j < 26; j++) \\n                if (tar[j]-mp[i][j] > 0) s += string(tar[j]-mp[i][j], 'a'+j);\\n            int tmp = helper(dp, mp, s);\\n            if (tmp!= -1) ans = min(ans, 1+tmp);\\n        }\\n        dp[target] = ans == INT_MAX? -1:ans;\\n        return dp[target];\\n    }\\n};\\n```\\nJava \\n```\\nclass Solution {\\n    public int minStickers(String[] stickers, String target) {\\n        int m = stickers.length;\\n        int[][] mp = new int[m][26];\\n        Map<String, Integer> dp = new HashMap<>();\\n        for (int i = 0; i < m; i++) \\n            for (char c:stickers[i].toCharArray()) mp[i][c-'a']++;\\n        dp.put(\"\", 0);\\n        return helper(dp, mp, target);\\n    }\\n    private int helper(Map<String, Integer> dp, int[][] mp, String target) {\\n        if (dp.containsKey(target)) return dp.get(target);\\n        int ans = Integer.MAX_VALUE, n = mp.length;\\n        int[] tar = new int[26];\\n        for (char c:target.toCharArray()) tar[c-'a']++;\\n        // try every sticker\\n        for (int i = 0; i < n; i++) {\\n            // optimization\\n            if (mp[i][target.charAt(0)-'a'] == 0) continue;\\n            StringBuilder sb = new StringBuilder();\\n            // apply a sticker on every character a-z\\n            for (int j = 0; j < 26; j++) {\\n                if (tar[j] > 0 ) \\n                    for (int k = 0; k < Math.max(0, tar[j]-mp[i][j]); k++)\\n                        sb.append((char)('a'+j));\\n            }\\n            String s = sb.toString();\\n            int tmp = helper(dp, mp, s);\\n            if (tmp != -1) ans = Math.min(ans, 1+tmp);\\n        }\\n        dp.put(target, ans == Integer.MAX_VALUE? -1:ans);\\n        return dp.get(target);\\n    }\\n}\\n```\\nPython\\n```\\nclass Solution(object):\\n    def minStickers(self, stickers, target):\\n        m = len(stickers)\\n        mp = [[0]*26 for y in range(m)] \\n        for i in range(m):\\n            for c in stickers[i]:\\n                mp[i][ord(c)-ord('a')] += 1    \\n        dp = {}\\n        dp[\"\"] = 0\\n        \\n        def helper(dp, mp, target):\\n            if target in dp:\\n                return dp[target]\\n            n = len(mp)\\n            tar = [0]*26\\n            for c in target:\\n                tar[ord(c)-ord('a')] += 1   \\n            ans = sys.maxint\\n            for i in xrange(n):\\n                if mp[i][ord(target[0])-ord('a')] == 0:\\n                    continue\\n                s = ''\\n                for j in range(26):\\n                    if tar[j] > mp[i][j]:\\n                        s += chr(ord('a')+j)*(tar[j] - mp[i][j]) \\n                tmp = helper(dp, mp, s)\\n                if (tmp != -1): \\n                    ans = min(ans, 1+tmp)    \\n            dp[target] = -1 if ans == sys.maxint else ans\\n            return dp[target]\\n                \\n        return helper(dp, mp, target)\\n```"
		},
		{
			"lc_ans_id":"108333",
			"view":"1647",
			"top":"1",
			"title":"Rewrite of contest winner's solution",
			"vote":"3",
			"content":"@dreamoon's [contest solution](https://leetcode.com/contest/leetcode-weekly-contest-53/ranking) is quite nice, but it uses lots of macros. I rewrote it without them and also made it faster (about 130 ms vs 200 ms). Thanks to @feng-peng-3597 for [pointing it out](https://discuss.leetcode.com/topic/106337/dreamoon-s-code-with-comment-added-by-me).\\n\\n    int minStickers(vector<string>& stickers, string target) {\\n        int n = target.size(), N = 1 << n;\\n        vector<uint> dp(N, -1);\\n        dp[0] = 0;\\n        for (int i = 0; i < N; i++) if (dp[i] != -1) {\\n            for (string& s : stickers) {\\n                int now = i;\\n                for (char c : s) {\\n                    for (int r = 0; r < n; r++) {\\n                        if (target[r] == c && !((now >> r) & 1)) {\\n                            now |= 1 << r;\\n                            break;\\n                        }\\n                    }\\n                }\\n                dp[now] = min(dp[now], dp[i] + 1);\\n            }\\n        }\\n        return dp[N-1];\\n    }"
		},
		{
			"lc_ans_id":"108339",
			"view":"453",
			"top":"2",
			"title":"A Python Solution",
			"vote":"2",
			"content":"After spending quite a while to tune the program, I finally got a Python program to pass all the test cases. I am not sure whether others have better Python solution, but I feel the time restriction is not quite friendly to Python. Let's get to the code. \\n\\nThe idea is essentially BFS, but I've done some preprocessing to make the set of \"useful stickers\" smaller so that every time I extend my BFS, I can extend fewer states.\\n\\n```python\\nfrom collections import Counter\\nfrom heapq import heappush, heappop\\nclass Solution(object):\\n    def minStickers(self, stickers, target):\\n        def get_key(cnt):\\n            return \"\".join(sorted(list(cnt.elements())))\\n\\n        #The first section just make the available number of stickers smaller\\n        #Some stickers will actually have the same results on making the target\\n        #Example (1), if target = 'abc', two stickers 'aef' and 'agh' are actually the same thing \\n        #in terms of making the target, so we only need to reserve one sticker\\n        #Example (2), if target = 'abc', two stickers 'abf' and 'agh'. We only need to reserve `abf`, \\n        #because whatever 'agh' can contribute, we can use 'abf' to achieve the same result,\\n        #or a better one. \\n        target_cnt = Counter(target)\\n        stks_cnt = [Counter(sticker) & target_cnt for sticker in stickers]\\n        stks_key = [get_key(stk) for stk in stks_cnt]\\n        stks_key = sorted(list(set(stks_key)), key = lambda x: -len(x))\\n        stks_cnt = []\\n        for stk_key in stks_key:\\n            sub = False\\n            for cnt in stks_cnt:\\n                if len(Counter(stk_key) - cnt) == 0:\\n                    sub = True\\n            if not sub:\\n                stks_cnt.append(Counter(stk_key))\\n        #The result stks_cnt only contains useful stickers that never give the same results\\n        #in the process of making the target. In some cases, only 14 / 50 stickers remained.\\n        \\n        visited = set()\\n        target_key = get_key(target_cnt)\\n        \\n        #now we have a BFS to search for the minimal number of stickers\\n        queue = [(0, len(target_key), target_key)]\\n        visited.add(target_key)\\n        print(len(stks_cnt), len(stickers))\\n        \\n        while queue:\\n            #Here, I actuall maintain a priority queue in BFS\\n            #I just want to get the results as early as possible, \\n            #so I prioritize a new state of shorter length \\n            length, key_len, cnt = heappop(queue) \\n            for stk in stks_cnt:\\n                res = Counter(cnt) - stk\\n                key = get_key(res)\\n                if len(key) == 0:\\n                    return length + 1\\n                elif key not in visited:\\n                    visited.add(key)\\n                    heappush(queue, (length + 1, len(key), key))\\n        return -1\\n```"
		},
		{
			"lc_ans_id":"108320",
			"view":"98",
			"top":"3",
			"title":"My DFS Code . (Python)",
			"vote":"1",
			"content":"```\\ndef minStickers(self, stickers, target):\\n        m = collections.Counter(target)\\n        ret = [(1 << 31) - 1]#A Big Number   \\n        def dfs(_m, c, i):\\n            if i == len(target):\\n                ret[0] = min(ret[0], c)\\n                return\\n            if _m[target[i]] >= m[target[i]]:\\n                dfs(_m, c, i + 1)\\n                return\\n            if c >= ret[0]-1:#Here is  {ret[0]-1} not {ret[0]} because of the next loop {c} will add 1\\n                return\\n            for j in stickers:\\n                if target[i] in j:\\n                    for n in j:\\n                        _m[n] += 1\\n                    dfs(_m, c + 1, i + 1)\\n                    for n in j:\\n                        _m[n] -= 1\\n\\n        dfs(collections.defaultdict(int), 0, 0)\\n        if ret[0]==(1 << 31) - 1:\\n            return -1\\n        return ret[0]\\n```"
		},
		{
			"lc_ans_id":"108329",
			"view":"106",
			"top":"4",
			"title":"Super Verbose Java Solution - DFS with Memoization",
			"vote":"1",
			"content":"Not the best approach but works.\\nE.g. stickers -  [\"with\", \"example\", \"science\"]\\ntarget - \"thehat\"\\n1) Convert the target word into a map of character counts (thehat - > {'t' : 2, 'h' : 2, 'e' : 1, 'a' : 1}\\n2) Create a map of character to possible sticker options ({'t' : [\"with\"], 'h' : [\"with\"], 'e' : [\"example\", \"science\"], 'a' : [\"example\"] })\\n3) Get the character which has minimum options available (i.e. minimum number of stickers to try from) (e.g. here 't', 'h' and 'a' can only be built from one kind of sticker, so we take one of these characters)\\n4) Try each of the possible stickers in 'minOptions', try it, update the target character count, and repeat Step 3. To prevent recomputation, store results in Map.\\n5) Return the minimum number of stickers needed.\\n\\nRunning Time 250 ms.\\n\\n```\\nclass Solution {\\n    \\n    Map<Character, List<String>> options;\\n    Map<String, Integer> table = new HashMap();\\n    \\n    public int minStickers(String[] stickers, String target) {\\n        Map<Character, Integer> charCounts = getCharCounts(target);\\n        if(!possible(stickers, charCounts)) {\\n            return -1;\\n        }       \\n        options = getOptions(stickers, charCounts);\\n        return minStickers(stickers, charCounts);\\n    }\\n    \\n    public int minStickers(String[] stickers, Map<Character, Integer> charCounts) {\\n        String key = getKey(charCounts);\\n        \\n        if(table.containsKey(key)) {\\n            return table.get(key);\\n        }\\n        \\n        List<String> minOptions = getMinOptions(charCounts);\\n        int minStickers = Integer.MAX_VALUE;\\n        \\n        for(int i= 1; i < minOptions.size(); i++) {\\n            String word = minOptions.get(i);\\n            \\n            Map<Character, Integer> updateMap = update(charCounts, word );\\n            \\n            if(updateMap.size() == 0) {\\n                return 1;\\n            }\\n            \\n            int stickerl = minStickers(stickers, updateMap);\\n            minStickers = Math.min(minStickers, stickerl + 1);\\n        }\\n        \\n        minStickers = minStickers == Integer.MAX_VALUE ? 0 : minStickers;\\n        table.put(key, minStickers);\\n        return minStickers;\\n    }\\n    \\n    public Map<Character, List<String>> getOptions(String[] stickers, Map<Character, Integer> charCounts) {\\n        Map<Character, List<String>> options = new HashMap();\\n        \\n        for(char c : charCounts.keySet()) {\\n            List<String> words = new ArrayList();\\n            \\n            for(String sticker : stickers) {\\n                if(sticker.indexOf(c) >= 0) {\\n                    words.add(sticker);\\n                }\\n            }\\n            \\n            options.put(c, words);\\n        }\\n        \\n        return options;\\n    }\\n    \\n    public List<String> getOptions(Map<Character, Integer> charCounts) {\\n        char minChar = '0';\\n        List<String> minOptions = null;\\n        int minLength = Integer.MAX_VALUE;\\n        \\n        for(char c : charCounts.keySet()) {\\n            List<String> optionsList = options.get(c);\\n            \\n            if(optionsList.size() < minLength) {\\n                minLength = optionsList.size();\\n                minChar = c;\\n                minOptions = new ArrayList();\\n                minOptions.add(c+\"\");\\n                minOptions.addAll(optionsList);\\n            }\\n        }\\n        \\n        return minOptions;\\n    }\\n    \\n    public Map<Character, Integer> getCharCounts(String target) {\\n        Map<Character, Integer> map = new HashMap();\\n        \\n        for(int i = 0; i < target.length(); i++) {\\n            char c = target.charAt(i);\\n            if(map.containsKey(c)) {\\n                map.put(c, map.get(c) + 1);\\n            }\\n            else {\\n                map.put(c, 1);\\n            }\\n        }\\n        \\n        return map;\\n    }\\n    \\n    public Map<Character, Integer> update(Map<Character, Integer> charCounts, String word) {\\n        Map<Character, Integer> updateMap = new HashMap(charCounts);\\n        \\n        for(int i = 0 ; i < word.length(); i++) {\\n            char c = word.charAt(i);\\n            \\n            if(updateMap.containsKey(c)) {\\n                updateMap.put(c, updateMap.get(c) - 1);\\n                \\n                if(updateMap.get(c) == 0) {\\n                    updateMap.remove(c);\\n                }\\n            }\\n        }\\n        \\n        return updateMap;\\n    }\\n    \\n    public boolean possible(String[] stickers, Map<Character, Integer> charCounts) {\\n        for(char c : charCounts.keySet()) {\\n            boolean possible = false;\\n            for(String sticker : stickers) {\\n                if(sticker.indexOf(c) >= 0) {\\n                    possible = true;\\n                }\\n            }\\n            if(!possible) {\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n    \\n    public String getKey(Map<Character, Integer> charCounts) {\\n        List<Character> list = new ArrayList();\\n        \\n        for(char c : charCounts.keySet()) {\\n            for(int i = 0; i < charCounts.get(c); i++) {\\n                list.add(c);\\n            }\\n        }\\n        \\n        Collections.sort(list);\\n        \\n        StringBuilder s = new StringBuilder();\\n        for(Character c : list) {\\n            s.append(c);\\n        }\\n        \\n        return s.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108334",
			"view":"391",
			"top":"5",
			"title":"Explaining StefanPochmann's Rewrite of contest winner's solution & +java",
			"vote":"1",
			"content":"This is trying to explain @StefanPochmann 's post in here:\\nhttps://discuss.leetcode.com/topic/106368/rewrite-of-contest-winner-s-solution\\n\\n1. The big idea is to use unsigned number from `0` to `2^n-1` as bitmap to represent every `subset` of `target`;\\n2.  then populate all of these subset from `0` to `2^n-1` by trying to apply 1 sticker at each time.\\n3. Eventually you might or might not get the ultimate result `2^n-1`, which is `target`, populated.\\n4. If not, it is -1;\\n\\n```\\nclass Solution {\\npublic:\\n    int minStickers(vector<string>& stickers, string target) {\\n        int n = target.size(), m = 1 << n; // if target has n chars, there will be m=2^n subset of characters in target\\n        vector<uint> dp(m, -1); // use index 0 - 2^n as bitmaps to represent each subset of all chars of target\\n        dp[0] = 0; // first thing we know is : dp[empty set] requires 0 stickers,\\n        for (int i = 0; i < m; i++) { // for every subset i, start from 00000...(emptyset) to 111111...(the target)\\n            if (dp[i] == -1) continue;\\n            for (string& s : stickers) { // try use each sticker as an char provider to populate a super-set of i,\\n                int sup = i;\\n                for (char c : s) { // to do that, for each char in the sticker, \\n                    for (int r = 0; r < n; r++) {\\n                        if (target[r] == c && !((sup >> r) & 1)) { // try apply it on a missing char in the subset of target\\n                            sup |= 1 << r;\\n                            break;\\n                        }\\n                    }\\n                }\\n               // after you apply all possible chars in a sticker, you get an superset that take 1 extra sticker than subset\\n               // would take, so you can try to update the superset's minsticker number with dp[sub]+1;\\n                dp[sup] = min(dp[sup], dp[i] + 1); \\n            }\\n        }\\n        return dp[m - 1]; // and the ultimate result\\n    }\\n};\\n```\\n**Java**\\n```\\nclass Solution {\\n    public int minStickers(String[] stickers, String target) {\\n        int n = target.length(), m = 1 << n; // if target has n chars, there will be m=2^n subset of characters in target\\n        int[] dp = new int[m];\\n        for (int i = 0; i < m; i++) dp[i] = Integer.MAX_VALUE; // use index 0 - 2^n as bitmaps to represent each subset of all chars in target\\n        dp[0] = 0; // first thing we know is : dp[empty set] requires 0 stickers,\\n        for (int i = 0; i < m; i++) { // for every subset i, start from 000...000\\n            if (dp[i] == Integer.MAX_VALUE) continue;\\n            for (String s : stickers) { // try use each sticker as an char provider to populate 1 of its superset, to do that:\\n                int sup = i;\\n                for (char c : s.toCharArray()) { // for each char in the sticker, try apply it on a missing char in the subset of target\\n                    for (int r = 0; r < n; r++) {\\n                        if (target.charAt(r) == c && ((sup >> r) & 1) == 0) {\\n                            sup |= 1 << r;\\n                            break;\\n                        }\\n                    }\\n                }\\n               // after you apply all possible chars in a sticker, you get an superset that take 1 extra sticker than subset\\n               // would take, so you can try to update the superset's minsticker number with dp[sub]+1;\\n                dp[sup] = Math.min(dp[sup], dp[i] + 1);\\n            }\\n        }\\n        return dp[m - 1] != Integer.MAX_VALUE ? dp[m - 1] : -1;\\n    }\\n}\\n```\\n\\nDoes these explanation make any sense?"
		},
		{
			"lc_ans_id":"108330",
			"view":"648",
			"top":"6",
			"title":"Dreamoon's code with comment added by me",
			"vote":"1",
			"content":"Really awesome and difficult to understand for idiot as me\\n```\\n#include <bits/stdc++.h>\\n#define SZ(X) ((int)(X).size())\\n#define ALL(X) (X).begin(), (X).end()\\n#define REP(I, N) for (int I = 0; I < (N); ++I)\\n#define REPP(I, A, B) for (int I = (A); I < (B); ++I)\\n#define RI(X) scanf(\"%d\", &(X))\\n#define RII(X, Y) scanf(\"%d%d\", &(X), &(Y))\\n#define RIII(X, Y, Z) scanf(\"%d%d%d\", &(X), &(Y), &(Z))\\n#define DRI(X) int (X); scanf(\"%d\", &X)\\n#define DRII(X, Y) int X, Y; scanf(\"%d%d\", &X, &Y)\\n#define DRIII(X, Y, Z) int X, Y, Z; scanf(\"%d%d%d\", &X, &Y, &Z)\\n#define RS(X) scanf(\"%s\", (X))\\n#define CASET int ___T, case_n = 1; scanf(\"%d \", &___T); while (___T-- > 0)\\n#define MP make_pair\\n#define PB push_back\\n#define MS0(X) memset((X), 0, sizeof((X)))\\n#define MS1(X) memset((X), -1, sizeof((X)))\\n#define LEN(X) strlen(X)\\n#define PII pair<int,int>\\n#define VI vector<int>\\n#define VL vector<long long>\\n#define VPII vector<pair<int,int> >\\n#define PLL pair<long long,long long>\\n#define VPLL vector<pair<long long,long long> >\\n#define F first\\n#define S second\\ntypedef long long LL;\\nusing namespace std;\\nconst int MOD = 1e9+7;\\nconst int SIZE = 1<<15;\\nint dp[SIZE];\\nvoid update(int &x,int v){\\n    if(x==-1||x>v)x=v;\\n}\\nclass Solution {\\n    public:\\n        int minStickers(vector<string>& stickers, string target) {\\n            // init dp array to -1, means invalid value\\n            // if (1<<pos)& (index of dp array)==1, target[pos] is satisfied, else not\\n            // dp[index] means to fill target on all positions of 1 of index, minimum stickers needed,\\n            // for example, for 0b101, means target[0], target[2] is satisfied\\n            MS1(dp);\\n            // to fill an empty string, need 0 stickers\\n            dp[0]=0;\\n            int n=SZ(target);\\n            // count of  all subset of n letters of target is 1<<n\\n            int N=1<<n;\\n            REP(i,N){\\n                // dp[i] is invalid, can't expand it by adding more stickers\\n                if(dp[i]==-1)continue;\\n                // for each sticker\\n                REP(j,SZ(stickers)){\\n                    // try apply sticker[j] to dp[i]\\n                    int now=i;\\n                    // for each letter of stickers[j]\\n                    REP(k,SZ(stickers[j])){\\n\\n                        // for every position of target, if it's not set and == stickers[j][k]\\n                        // set that position in now, remember to break after finding match because each letter of sticker can be used only once\\n                        REP(r,n){\\n                            if((now>>r)&1)continue;\\n                            if(target[r]==stickers[j][k]){\\n                                now|=1<<r;\\n                                break;\\n                            }\\n                        }\\n                    }\\n                    // update dp array for result after applying sticker[j] on dp[i[\\n                    update(dp[now],dp[i]+1);\\n                }\\n            }\\n            return dp[N-1];\\n        }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"108315",
			"view":"1024",
			"top":"7",
			"title":"java BFS solution",
			"vote":"1",
			"content":"\\n```\\n    String toKey(int[] arr){\\n        StringBuilder sb=new StringBuilder();\\n        boolean allZ=true;\\n        for (int i=0;i<26;++i){\\n            int n=arr[i];\\n            sb.append(n).append(\",\");\\n            if (n>0)allZ=false;\\n        }\\n        if (allZ)return \"\";\\n        return sb.toString();\\n    }\\n    public int minStickers(String[] stickers, String target) {\\n        if (target.isEmpty())return 0;\\n        int ns=stickers.length;\\n        int tl=target.length();\\n        int[][] letters=new int[ns][26];\\n        for (int i=0;i<stickers.length;++i){\\n            String s=stickers[i];\\n            for (char c:s.toCharArray())++letters[i][c-'a'];\\n        }\\n        int[] targetLetters=new int[27];\\n        for (char c:target.toCharArray())++targetLetters[c-'a'];\\n        targetLetters[26]=0;\\n        String key=toKey(targetLetters);\\n        int ans=0;\\n        if (key.isEmpty())return 0;\\n        Queue<int[]>q=new LinkedList<>();\\n        Set<String> seenKey= new HashSet<>();\\n        seenKey.add(key);\\n        q.add(targetLetters);\\n        while (!q.isEmpty()){\\n            int[]cur=q.remove();\\n            for (int i=0;i<ns;++i){\\n                int[] next=cur.clone();\\n                int[]letter=letters[i];\\n                for (int j=0;j<26;++j){\\n                    if (letter[j]>=0)\\n                        next[j]=Math.max(next[j]-letter[j], 0);\\n                }\\n                ++next[26];\\n                String nextKey=toKey(next);\\n                if (nextKey.isEmpty())return next[26];\\n                if (seenKey.add(nextKey)){\\n//                    log.info(\"add key: {}\", nextKey);\\n                    q.add(next);\\n                }\\n            }\\n        }\\n        return -1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"108316",
			"view":"15",
			"top":"8",
			"title":"Super clean C++ solution with memoization",
			"vote":"0",
			"content":"```\\nclass Solution {\\n    vector<int> memo;\\n    string target;\\n    vector<string> stickers;\\n    \\n    // Returns the best solution if I've already covered the target letters indicated in mask.\\n    int f(int mask) {\\n        if (mask == (1 << target.size()) - 1) return 0; // All letters are done!\\n        if (memo[mask] != -1) return memo[mask];\\n        \\n        int best = INT_MAX / 2; // I divide by 2 to avoid overflow.\\n        for (const string &s : stickers) { // Brute-force the next sticker.\\n            \\n            int new_mask = mask;\\n            for (const char &c : s) {\\n                for (int i = 0; i < target.size(); ++i) {\\n                    if (new_mask & (1 << i)) continue;\\n                    if (target[i] == c) {\\n                        new_mask |= (1 << i);\\n                        break;\\n                    }\\n                }\\n            }\\n            if (new_mask != mask) {\\n                best = min(best, f(new_mask) + 1);\\n            }\\n        }\\n        return memo[mask] = best;\\n    }\\n    \\npublic:\\n    int minStickers(vector<string>& s, string t)  {\\n        stickers = std::move(s);\\n        target = std::move(t);\\n        memo.assign(1 << target.size(), -1);\\n        int ans = f(0);\\n        if (ans > target.size()) return -1;\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108317",
			"view":"34",
			"top":"9",
			"title":"Python DP solution",
			"vote":"0",
			"content":"Let assume that we have partially spellout `target` by (i-1) picking words. Now we pick word `k`. Let dp[i][k] be all possible partial spelling of the `target` using word `stickers[k]` and differt partial spelling from `i-1`. Then dp[i][k] is the best (maximum len of partial spelling) of spelling using word k.\\n\\n```\\nn_stickers = len(stickers)\\n        dp = [[[target]]*n_stickers for _ in range(len(target))]\\n\\n        for i in range(len(target)):\\n            for k in range(n_stickers):\\n                res = set([])\\n                word = stickers[k]\\n                for j in range(n_stickers):\\n                    ws = dp[i-1][j]\\n                    for w in ws:\\n                        for s in word:\\n                            w = w.replace(s, '', 1)\\n                        if len(w) == 0:\\n                            return i+1\\n                        res.add(w)\\n                smallest_len_sofar = len(sorted(res, key=lambda x: len(x))[0])\\n                dp[i][k] = [x for x in res if len(x) == smallest_len_sofar]\\n\\n        return -1\\n```"
		}
	],
	"id":"668",
	"title":"Stickers to Spell Word",
	"content":"<p>\r\nWe are given N different types of stickers.  Each sticker has a lowercase English word on it.\r\n</p><p>\r\nYou would like to spell out the given <code>target</code> string by cutting individual letters from your collection of stickers and rearranging them.\r\n</p><p>\r\nYou can use each sticker more than once if you want, and you have infinite quantities of each sticker.\r\n</p><p>\r\nWhat is the minimum number of stickers that you need to spell out the <code>target</code>?  If the task is impossible, return -1.\r\n</p>\r\n\r\n<p><b>Example 1:</b></p>\r\n<p>Input:<pre>\r\n[\"with\", \"example\", \"science\"], \"thehat\"\r\n</pre></p>\r\n\r\n<p>Output:<pre>\r\n3\r\n</pre></p>\r\n\r\n<p>Explanation:<pre>\r\nWe can use 2 \"with\" stickers, and 1 \"example\" sticker.\r\nAfter cutting and rearrange the letters of those stickers, we can form the target \"thehat\".\r\nAlso, this is the minimum number of stickers necessary to form the target string.\r\n</pre></p>\r\n\r\n<p><b>Example 2:</b></p>\r\n<p>Input:<pre>\r\n[\"notice\", \"possible\"], \"basicbasic\"\r\n</pre></p>\r\n\r\n<p>Output:<pre>\r\n-1\r\n</pre></p>\r\n\r\n<p>Explanation:<pre>\r\nWe can't form the target \"basicbasic\" from cutting letters from the given stickers.\r\n</pre></p>\r\n\r\n<p><b>Note:</b>\r\n<li><code>stickers</code> has length in the range <code>[1, 50]</code>.</li>\r\n<li><code>stickers</code> consists of lowercase English words (without apostrophes).</li>\r\n<li><code>target</code> has length in the range <code>[1, 15]</code>, and consists of lowercase English letters.</li>\r\n<li>In all test cases, all words were chosen <u>randomly</u> from the 1000 most common US English words, and the target was chosen as a concatenation of two random words.</li>\r\n<li>The time limit may be more challenging than usual.  It is expected that a 50 sticker test case can be solved within 35ms on average.</li>\r\n</p>",
	"frequency":"47",
	"ac_num":"3256"
}