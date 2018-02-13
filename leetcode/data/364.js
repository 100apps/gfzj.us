{
	"difficulty":"2",
	"submit_num":"36943",
	"show_id":"364",
	"leetcode_id":"364",
	"answers":[
		{
			"lc_ans_id":"83641",
			"view":"18237",
			"top":"0",
			"title":"No depth variable, no multiplication",
			"vote":"166",
			"content":"Inspired by [lzb700m's solution](https://leetcode.com/discuss/110042/share-my-2ms-intuitive-one-pass-bfs-solution) and [one of mine](https://leetcode.com/discuss/95184/no-depth-variable). Instead of multiplying by depth, add integers multiple times (by going level by level and adding the unweighted sum to the weighted sum after each level).\\n\\n    public int depthSumInverse(List<NestedInteger> nestedList) {\\n        int unweighted = 0, weighted = 0;\\n        while (!nestedList.isEmpty()) {\\n            List<NestedInteger> nextLevel = new ArrayList<>();\\n            for (NestedInteger ni : nestedList) {\\n                if (ni.isInteger())\\n                    unweighted += ni.getInteger();\\n                else\\n                    nextLevel.addAll(ni.getList());\\n            }\\n            weighted += unweighted;\\n            nestedList = nextLevel;\\n        }\\n        return weighted;\\n    }"
		},
		{
			"lc_ans_id":"83655",
			"view":"7036",
			"top":"1",
			"title":"JAVA AC BFS solution",
			"vote":"40",
			"content":"    public int depthSumInverse(List<NestedInteger> nestedList) {\\n            if (nestedList == null) return 0;\\n            Queue<NestedInteger> queue = new LinkedList<NestedInteger>();\\n            int prev = 0;\\n            int total = 0;\\n            for (NestedInteger next: nestedList) {\\n                queue.offer(next);\\n            }\\n            \\n            while (!queue.isEmpty()) {\\n                int size = queue.size();\\n                int levelSum = 0;\\n                for (int i = 0; i < size; i++) {\\n                    NestedInteger current = queue.poll();\\n                    if (current.isInteger()) levelSum += current.getInteger();\\n                    List<NestedInteger> nextList = current.getList();\\n                    if (nextList != null) {\\n                        for (NestedInteger next: nextList) {\\n                            queue.offer(next);\\n                        }\\n                    }\\n                }\\n                prev += levelSum;\\n                total += prev;\\n            }\\n            return total;\\n        }"
		},
		{
			"lc_ans_id":"83649",
			"view":"5695",
			"top":"2",
			"title":"Share my 2ms intuitive-one pass-no multiplication solution",
			"vote":"31",
			"content":"The idea is to pass the current found integer sum into the next level of recursion, and return it back again. So that we don't have to count the number of levels in the nested list.\\n\\nI think code itself is quite self explanatory.\\n\\n\\n\\n\\n    public class Solution {\\n        public int depthSumInverse(List<NestedInteger> nestedList) {\\n            return helper(nestedList, 0);\\n        }\\n        \\n        private int helper(List<NestedInteger> niList, int prev) {\\n            int intSum = prev;\\n            List<NestedInteger> levelBreak = new ArrayList<>();\\n            \\n            for (NestedInteger ni : niList) {\\n                if (ni.isInteger()) {\\n                    intSum += ni.getInteger();\\n                } else {\\n                    levelBreak.addAll(ni.getList());\\n                }\\n            }\\n            \\n            int listSum = levelBreak.isEmpty()? 0 : helper(levelBreak, intSum);\\n    \\n            return listSum + intSum;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83677",
			"view":"2994",
			"top":"3",
			"title":"The question needs to be re-defined.",
			"vote":"20",
			"content":"The weight increases from the leaf to the root.\\n\\nHowever, the following situation is not clearly defined. I will illustrate it using a tree structure.\\n\\n        a\\n      /    \\\\\\n     b      c\\n              \\\\\\n               d\\n\\nWhat is the weight of a?  Is it 2 to 3?"
		},
		{
			"lc_ans_id":"83701",
			"view":"2845",
			"top":"4",
			"title":"4ms One-pass DFS C++ solution",
			"vote":"15",
			"content":"Simple idea: Use an array to save the \"level sum\" by level, then do post-processing\\n\\n    class Solution {\\n    public:\\n        int depthSumInverse(vector<NestedInteger>& nestedList) {\\n            vector<int> result;\\n            for(auto ni : nestedList) {\\n                dfs(ni, 0, result);\\n            }\\n            //post processing \\n            int sum = 0;\\n            for(int i = result.size()-1,level = 1; i >=0; i--, level++) {\\n                sum += result[i]*level;\\n            }\\n            \\n            return sum;\\n        }\\n        \\n    private:\\n        void dfs(NestedInteger &ni, int depth, vector<int> & result) {\\n            if(result.size() < depth+1) result.resize(depth+1);\\n            if(ni.isInteger()) {\\n                result[depth] += ni.getInteger();\\n            } else {\\n                for(auto n_ni : ni.getList()) {\\n                    dfs(n_ni, depth+1, result);\\n                }\\n            }\\n            \\n        }\\n        \\n        \\n    };"
		},
		{
			"lc_ans_id":"83642",
			"view":"2616",
			"top":"5",
			"title":"Java Two Pass DFS solution",
			"vote":"14",
			"content":"    /**\\n     * // This is the interface that allows for creating nested lists.\\n     * // You should not implement it, or speculate about its implementation\\n     * public interface NestedInteger {\\n     *\\n     *     // @return true if this NestedInteger holds a single integer, rather than a nested list.\\n     *     public boolean isInteger();\\n     *\\n     *     // @return the single integer that this NestedInteger holds, if it holds a single integer\\n     *     // Return null if this NestedInteger holds a nested list\\n     *     public Integer getInteger();\\n     *\\n     *     // @return the nested list that this NestedInteger holds, if it holds a nested list\\n     *     // Return null if this NestedInteger holds a single integer\\n     *     public List<NestedInteger> getList();\\n     * }\\n     */\\n    \\n    public class Solution {\\n        \\n        public int depthSumInverse(List<NestedInteger> nestedList) {\\n            if(nestedList == null || nestedList.size() == 0) return 0;\\n            int h = helper(nestedList);\\n            int res = getSum(nestedList, h);\\n            return res;\\n        }\\n        private int getSum(List<NestedInteger> l, int layer) {\\n            int sum = 0;\\n            if(l == null || l.size() == 0) return sum;\\n            for(NestedInteger n : l) {\\n                if(n.isInteger()) sum += n.getInteger() * layer;\\n                else sum += getSum(n.getList(), layer - 1);\\n            }\\n            return sum;\\n        }\\n        private int helper(List<NestedInteger> l) {\\n            if(l == null || l.size() == 0) return 0;\\n            int max = 0;\\n            for(NestedInteger n : l) {\\n                if(n.isInteger()) max = Math.max(max, 1);\\n                else max = Math.max(max, helper(n.getList()) + 1);\\n            }\\n            return max;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83703",
			"view":"821",
			"top":"6",
			"title":"HashMap Java solution with Explanation",
			"vote":"9",
			"content":"HashMap solution\\n \\nWe have to find the maxDepth before we can do the sum calculation. So we use a HashMap to record the \\ninteger we visited so far.\\n\\nAfter we visited all inputs and got the maxDepth, we can start to calculate the sum.\\nIn the HashMap we don't need to record all integers we visited, we just need to record the sum of integers\\nin current depth\\n\\nTime complexity: O(N), N is num of inputs we have\\nSpace complexity: O(H), H is maxDepth\\n\\n\\n     int maxDepth = 0;\\n    \\n     public int depthSumInverse(List<NestedInteger> nestedList) {\\n        //HashMap solution. We use HashMap to store nums in each depth before we find the maxDepth\\n        //we will do the sum calculation in the last\\n        \\n        HashMap<Integer, Integer> hs = new HashMap<Integer, Integer>();\\n        \\n        DFS( nestedList, 1, hs );\\n        \\n        int sum = 0;\\n        \\n        //get sum \\n        for( int i = 1; i <= maxDepth; i++ ){\\n            //put a checker here in case we dont have integer in one layer\\n            if( hs.containsKey(i ) ) sum += hs.get(i) * (maxDepth + 1 -i);\\n        }\\n        \\n        return sum;\\n    }\\n    \\n     private void DFS(List<NestedInteger> nestedList, int depth,  HashMap<Integer, Integer> hs ){\\n        //boundary check\\n        \\n        if(nestedList.isEmpty()) return;\\n        \\n        //update maxDepth if possible\\n        maxDepth = Math.max(maxDepth, depth);\\n        \\n        for( NestedInteger temp : nestedList ){\\n            if( temp.isInteger() ){\\n                //if temp is integer\\n                if( !hs.containsKey(depth) ){\\n                    hs.put( depth, temp.getInteger()  );\\n                }else{\\n                    hs.put( depth, hs.get(depth) + temp.getInteger()  );\\n                }\\n            }else{\\n                //if temp is list\\n                DFS(  temp.getList(), depth + 1, hs  );\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83645",
			"view":"344",
			"top":"7",
			"title":"Short  and clear Python BFS+stack easy to understand solution O(n) time, O(n) space",
			"vote":"4",
			"content":"The idea is simply BFS and use a stack to keep track of the levels.\\nThen calculate the sum.\\n\\n```\\nclass Solution(object):\\n    def depthSumInverse(self, nestedList):\\n        \"\"\"\\n        :type nestedList: List[NestedInteger]\\n        :rtype: int\\n        \"\"\"\\n        \\n        cur_level=nestedList\\n        stack=[]\\n        \\n        # bfs\\n        while cur_level:\\n            t=0\\n            next_level=[]\\n            for element in cur_level:\\n                if element.isInteger():\\n                    t+=element.getInteger()\\n                else:\\n                    next_level.extend(element.getList())\\n            cur_level=next_level\\n            stack.append(t)\\n            \\n        # cal. res\\n        res=0\\n        for i,n in enumerate(stack[::-1]):\\n            res+=(i+1)*n\\n        return res\\n```"
		},
		{
			"lc_ans_id":"83674",
			"view":"260",
			"top":"8",
			"title":"Super easy AC JAVA solution using HashMap<>()",
			"vote":"3",
			"content":"This solution is not super efficient, but it is super easy to understand. \\n\\n```\\npublic class Solution {\\n    // map<depth, value>\\n    Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n    public int depthSumInverse(List<NestedInteger> nestedList) {\\n        for (NestedInteger v : nestedList) {\\n            DFS(v, 1);\\n        }\\n        int sum = 0;\\n        if (map.size() == 0) return 0;\\n        int maxDepth = Collections.max(map.keySet()) + 1;\\n        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {\\n            int depth = maxDepth - entry.getKey();\\n            sum += depth * entry.getValue();\\n        }\\n        return sum;\\n    }\\n    \\n    private void DFS(NestedInteger cur, int depth) {\\n        if (cur.isInteger()) {\\n            map.put(depth, map.getOrDefault(depth, 0) + cur.getInteger());\\n        } else {\\n            for (NestedInteger c : cur.getList()) {\\n                DFS(c, depth + 1);\\n            }\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"83675",
			"view":"342",
			"top":"9",
			"title":"C++ one pass solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    int depthSumInverse(vector<NestedInteger>& nestedList) {\\n        int_sum = weight_sum = max_depth = 0;\\n        calculate(nestedList, 0);\\n        return (max_depth + 1) * int_sum - weight_sum;\\n    }\\nprivate:\\n    void calculate(const vector<NestedInteger>& nestedList, int depth) {\\n        max_depth = max(max_depth, depth);\\n        for (auto & ni : nestedList) {\\n            if (ni.isInteger()) {\\n                int_sum += ni.getInteger();\\n                weight_sum += depth * ni.getInteger();\\n            } else {\\n                calculate(ni.getList(), depth + 1);\\n            }\\n        }\\n    }\\n    \\n    int max_depth;\\n    int int_sum;\\n    int weight_sum;\\n};"
		}
	],
	"id":"364",
	"title":"Nested List Weight Sum II",
	"content":"<p>Given a nested list of integers, return the sum of all integers in the list weighted by their depth.</p>\r\n\r\n<p>Each element is either an integer, or a list -- whose elements may also be integers or other lists.</p>\r\n\r\n<p>Different from the <a href=\"https://leetcode.com/problems/nested-list-weight-sum/\">previous question</a> where weight is increasing from root to leaf, now the weight is defined from bottom up. i.e., the leaf level integers have weight 1, and the root level integers have the largest weight.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\nGiven the list <code>[[1,1],2,[1,1]]</code>, return <b>8</b>. (four 1's at depth 1, one 2 at depth 2)</p>\r\n\r\n<p><b>Example 2:</b><br />\r\nGiven the list <code>[1,[4,[6]]]</code>, return <b>17</b>. (one 1 at depth 3, one 4 at depth 2, and one 6 at depth 1; 1*3 + 4*2 + 6*1 = 17)\r\n</p>",
	"frequency":"208",
	"ac_num":"19911"
}