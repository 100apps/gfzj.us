{
	"difficulty":"2",
	"submit_num":"20912",
	"show_id":"582",
	"leetcode_id":"582",
	"answers":[
		{
			"lc_ans_id":"103133",
			"view":"4904",
			"top":"0",
			"title":"Java DFS O(n) Time O(n) Space",
			"vote":"11",
			"content":"```\\npublic List<Integer> killProcess(List<Integer> pid, List<Integer> ppid, int kill) {\\n    \\n    // Store process tree as an adjacency list\\n    Map<Integer, List<Integer>> adjacencyLists = new HashMap<>();\\n    for (int i=0;i<ppid.size();i++) {\\n        adjacencyLists.putIfAbsent(ppid.get(i), new LinkedList<>());\\n        adjacencyLists.get(ppid.get(i)).add(pid.get(i));\\n    }\\n    \\n    // Kill all processes in the subtree rooted at process \"kill\"\\n    List<Integer> res = new LinkedList<>();\\n    Stack<Integer> stack = new Stack<>();\\n    stack.add(kill);\\n    while (!stack.isEmpty()) {\\n        int cur = stack.pop();\\n        res.add(cur);\\n        List<Integer> adjacencyList = adjacencyLists.get(cur);\\n        if (adjacencyList == null) continue;\\n        stack.addAll(adjacencyList);\\n    }\\n    return res;   \\n\\n}\\n```"
		},
		{
			"lc_ans_id":"103176",
			"view":"2126",
			"top":"1",
			"title":"Java Solution, HashMap",
			"vote":"10",
			"content":"```\\npublic class Solution {\\n    public List<Integer> killProcess(List<Integer> pid, List<Integer> ppid, int kill) {\\n        if (kill == 0) return pid;\\n        \\n        int n = pid.size();\\n        Map<Integer, Set<Integer>> tree = new HashMap<>();\\n        for (int i = 0; i < n; i++) {\\n            tree.put(pid.get(i), new HashSet<Integer>());\\n        }\\n        for (int i = 0; i < n; i++) {\\n            if (tree.containsKey(ppid.get(i))) {\\n                Set<Integer> children = tree.get(ppid.get(i));\\n                children.add(pid.get(i));\\n                tree.put(ppid.get(i), children);\\n            }\\n        }\\n        \\n        List<Integer> result = new ArrayList<>();\\n        traverse(tree, result, kill);\\n        \\n        return result;\\n    }\\n    \\n    private void traverse(Map<Integer, Set<Integer>> tree, List<Integer> result, int pid) {\\n        result.add(pid);\\n        \\n        Set<Integer> children = tree.get(pid);\\n        for (Integer child : children) {\\n            traverse(tree, result, child);\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103131",
			"view":"1815",
			"top":"2",
			"title":"[C++] Clean Code - 2 Solution - DFS & BFS",
			"vote":"6",
			"content":"**DFS**\\n```\\nclass Solution {\\npublic:\\n    vector<int> killProcess(vector<int>& pid, vector<int>& ppid, int kill) {\\n        vector<int> killed;\\n        map<int, set<int>> children;\\n        for (int i = 0; i < pid.size(); i++) {\\n            children[ppid[i]].insert(pid[i]);\\n        }\\n        killAll(kill, children, killed);\\n        return killed;\\n    }\\n\\nprivate:\\n    void killAll(int pid, map<int, set<int>>& children, vector<int>& killed) {\\n        killed.push_back(pid);\\n        for (int child : children[pid]) {\\n            killAll(child, children, killed);\\n        }\\n    }\\n};\\n```\\n\\n**BFS**\\n```\\nclass Solution {\\npublic:\\n    vector<int> killProcess(vector<int>& pid, vector<int>& ppid, int kill) {\\n        vector<int> killed;\\n        map<int, set<int>> children;\\n        for (int i = 0; i < pid.size(); i++) {\\n            children[ppid[i]].insert(pid[i]);\\n        }\\n\\n        queue<int> q;\\n        q.push(kill);\\n        while (!q.empty()) {\\n            int p = q.front(); q.pop();\\n            killed.push_back(p);\\n            for (int child : children[p]) {\\n                q.push(child);\\n            }\\n        }\\n\\n        return killed;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103170",
			"view":"727",
			"top":"3",
			"title":"Simple python bfs solution",
			"vote":"5",
			"content":"Build a  ```(int parent: list[int] children) ```hashMap and do a simple bfs.\\n``````\\ndef killProcess(self, pid, ppid, kill):\\n        d = collections.defaultdict(list)\\n        for c, p in zip(pid, ppid): d[p].append(c)\\n        bfs = [kill]\\n        for i in bfs: bfs.extend(d.get(i, []))\\n        return bfs"
		},
		{
			"lc_ans_id":"103208",
			"view":"722",
			"top":"4",
			"title":"Simple Java Solution using DFS",
			"vote":"3",
			"content":"The idea is to build the tree first, and do a DFS to return all the child nodes starting from the node that is Killed.\\n\\n```\\npublic static List<Integer> killProcess(List<Integer> pid, List<Integer> ppid, int kill) {\\n        HashMap<Integer, Node> map = new HashMap<>();\\n        for(Integer i : pid) {\\n            map.put(i, new Node(i));\\n        }\\n\\n        for(int i = 0; i < ppid.size(); i++) {\\n            if(ppid.get(i) != 0) {\\n                map.get(ppid.get(i)).childs.add(map.get(pid.get(i)));\\n            }\\n        }\\n        List<Integer> res = new ArrayList<>();\\n        dfs(map.get(kill), res);\\n        return res;\\n    }\\n\\npublic static void dfs(Node node, List<Integer> res) {\\n        if(node == null) return;\\n        res.add(node.id);\\n        for(Node n : node.childs) {\\n            dfs(n, res);\\n        }\\n    }\\n\\nprivate static class Node {\\n        Integer id;\\n        List<Node> childs;\\n\\n        public Node(Integer id) {\\n            this.id = id;\\n            this.childs = new ArrayList<>();\\n        }\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"103136",
			"view":"137",
			"top":"5",
			"title":"Fast Java solution",
			"vote":"1",
			"content":"```public class Solution {\\n    public List<Integer> killProcess(List<Integer> pid, List<Integer> ppid, int kill) {\\n        Map<Integer, List<Integer>> processTree = new HashMap<Integer, List<Integer>>();\\n        int total = pid.size(), i;\\n        \\n        for (i=0;i<total;i++) {\\n            Integer process = pid.get(i);\\n            Integer parent = ppid.get(i);\\n            \\n            if (parent != 0) {\\n                List<Integer> children = processTree.get(parent);\\n                if (children == null) {\\n                    children = new ArrayList<Integer>();\\n                }\\n                children.add(process);\\n                processTree.put(parent, children);\\n            } else if(parent == kill)\\n                return pid;\\n        }\\n        \\n        List<Integer> result = new ArrayList<>();\\n        Queue<Integer> queue = new LinkedList<Integer>();\\n        queue.add(kill);\\n        while (!queue.isEmpty()) {\\n            Integer child = queue.poll();\\n            result.add(child);\\n            List<Integer> children = processTree.get(child);\\n            if (children != null)\\n                queue.addAll(children);\\n        }\\n        return result;\\n    }\\n}"
		},
		{
			"lc_ans_id":"103166",
			"view":"220",
			"top":"6",
			"title":"c# solution - seek advice to shorten time",
			"vote":"1",
			"content":"Still work on the problem solving basics, run-time error on null pointer, need to use DFS/ BFS to get all children, timeout issue to avoid using hashtable. \\n\\nWork on coding styles, avoid bugs in writing. \\n```\\nusing System;\\nusing System.Collections.Generic;\\nusing System.Linq;\\nusing System.Text;\\nusing System.Threading.Tasks;\\n\\nnamespace Leetcode582_KillProcess\\n{\\n    /// <summary>\\n    /// problem statement: \\n    /// https://leetcode.com/problems/kill-process/#/description\\n    /// </summary>\\n    class Program\\n    {\\n        internal class Node\\n        {\\n            public int Id { get; set; }\\n            public int ParentId { get; set; }\\n            public HashSet<int> Children { get; set; }\\n\\n            public Node(int id)\\n            {\\n                Id = id; \\n            }\\n\\n            public void AddChild(int id)\\n            {\\n                if (Children == null)\\n                {\\n                    Children = new HashSet<int>(); \\n                }\\n\\n                Children.Add(id); \\n            }\\n        }\\n\\n        static void Main(string[] args)\\n        {\\n            RunTestcase(); \\n        }\\n\\n        public static void RunTestcase()\\n        {\\n            IList<int> pid = new List<int>() { 1, 3, 10, 5 };\\n            IList<int> ppid = new List<int>() { 3, 0, 5, 3};\\n\\n            var result = KillProcess(pid, ppid, 5); \\n        }\\n\\n        public static void RunTestcase2()\\n        {\\n            IList<int> pid = new List<int>() { 1, 2, 3 };\\n            IList<int> ppid = new List<int>() { 0, 1, 2 };\\n\\n            var result = KillProcess(pid, ppid, 1);\\n        }\\n\\n        public static IList<int> KillProcess(IList<int> pid, IList<int> ppid, int kill)\\n        {\\n            IList<int> children = new List<int>();            \\n\\n            // create nodes in the tree one by one\\n            IList<Node> nodes = new List<Node>(); \\n            foreach (var item in pid)\\n            {\\n                var current = new Node(item);\\n                nodes.Add(current); \\n            }\\n\\n            var lookup = getHashSet(pid); \\n\\n            // build the tree's children and parent node info, get root node info            \\n            for (int i = 0; i < ppid.Count; i++)\\n            {\\n                var parentId = ppid[i];\\n                var id = nodes[i].Id; \\n\\n                nodes[i].ParentId = ppid[i];\\n\\n                if (parentId == 0)\\n                {\\n                    continue;\\n                }\\n\\n                // add child node to node with id \\n                int index = lookup[parentId];\\n                nodes[index].AddChild(id); \\n            }\\n\\n            // find kill Id's children\\n            return getKillChildren(lookup, nodes, kill);            \\n        }\\n\\n        /// <summary>\\n        /// Dictionary is important to avoid timeout, Array.IndexOf does not work. \\n        /// </summary>\\n        /// <param name=\"ids\"></param>\\n        /// <returns></returns>\\n        private static Dictionary<int, int> getHashSet(IList<int> ids)\\n        {\\n            var lookup = new Dictionary<int, int>();\\n            for (int i = 0; i < ids.Count; i++)\\n            {\\n                lookup.Add(ids[i], i); \\n            }\\n\\n            return lookup; \\n        }\\n        /// <summary>\\n        /// BFS search \\n        /// </summary>\\n        /// <param name=\"lookup\"></param>\\n        /// <param name=\"nodes\"></param>\\n        /// <param name=\"kill\"></param>\\n        /// <returns></returns>\\n        private static IList<int> getKillChildren(Dictionary<int,int> lookup, IList<Node> nodes, int kill)\\n        {\\n            IList<int> children = new List<int>();\\n\\n            int index = lookup[kill];\\n            int id = nodes[index].Id; \\n\\n            var queue = new Queue<int>();\\n            queue.Enqueue(id); \\n\\n            while (queue.Count > 0 )\\n            {\\n                int visitId = queue.Dequeue();                              \\n\\n                children.Add(visitId);\\n\\n                index = lookup[visitId];\\n                var visitNode = nodes[index]; \\n\\n                var childrenNodes = visitNode.Children;\\n\\n                if (childrenNodes != null)   // need more attention here!\\n                {\\n                    foreach (var item in childrenNodes)\\n                    {\\n                        queue.Enqueue(item);\\n                    }\\n                }\\n            }\\n\\n            var array = children.ToArray();\\n            Array.Sort(array); \\n\\n            return array.ToList(); \\n        }      \\n    }\\n}"
		},
		{
			"lc_ans_id":"103187",
			"view":"72",
			"top":"7",
			"title":"C++ solution 175ms, beats 100%",
			"vote":"1",
			"content":"Similar to Java Solution using HashMap.\\nvector instead of stack/queue.\\n```\\nclass Solution {\\npublic:\\n    vector<int> killProcess(vector<int>& pid, vector<int>& ppid, int kill) {\\n        unordered_map<int,vector<int>> mMap;\\n        for(int i = 0;i<ppid.size();++i) {\\n            mMap[ppid[i]].push_back(pid[i]);\\n        }\\n        vector<int> retVec;\\n        vector<int> mVec;\\n        mVec.emplace_back(kill);\\n        while(!mVec.empty()){\\n            auto val = *(mVec.end()-1);\\n            retVec.emplace_back(val);\\n            mVec.pop_back();\\n            if(mMap.find(val)!=mMap.end()) {\\n                mVec.insert(mVec.begin(),mMap[val].begin(),mMap[val].end());\\n            }\\n        }\\n        return retVec;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103128",
			"view":"10",
			"top":"8",
			"title":"Simple Python Dictionary + DFS solution",
			"vote":"0",
			"content":"```\\nclass Solution(object):\\n    def killProcess(self, pid, ppid, kill):\\n\\n        #create a hashmap: key is parent, value is a list of its children\\n        tree = { }\\n        for i in range(len(ppid)):\\n            if ppid[i] in tree:\\n                tree[ppid[i]].append(pid[i])\\n            else:\\n                tree[ppid[i]] = [pid[i]]\\n        \\n        #use dfs to traverse the tree branch to kill\\n        result = [ ]\\n        stack = [kill]\\n        while(stack != []):\\n            cur = stack.pop()\\n            result.append(cur)\\n            if cur in tree and tree[cur] != []:\\n                stack += tree[cur]\\n        return result\\n```"
		},
		{
			"lc_ans_id":"103130",
			"view":"17",
			"top":"9",
			"title":"Javascript solution beats 100% with hashmap",
			"vote":"0",
			"content":"Since we have all of the children and the parents of the tree. We could construct a hash map with parents => [children] pair. and push each child in a bfs way.\\n\\n```\\nconst killProcess = (pid, ppid, kill) => {\\n  // using map since we are storing int, []int pair\\n  let map = new Map()\\n  let res = []\\n\\n  for (let i = 0; i < ppid.length; i++) {\\n    let par = ppid[i]\\n    let child = pid[i]\\n    if (map.has(par)) {\\n      map.get(par).push(child)\\n    } else {\\n      map.set(par, [child])\\n    }\\n  }\\n\\n  const killChild = target => {\\n    res.push(target)\\n\\n    if (map.has(target)) {\\n      for (let i = 0; i < map.get(target).length; i++) {\\n        killChild(map.get(target)[i])\\n      }\\n    }\\n  }\\n\\n  killChild(kill)\\n\\n  return res\\n}\\n```"
		}
	],
	"id":"563",
	"title":"Kill Process",
	"content":"<p>Given <b>n</b> processes, each process has a unique <b>PID (process id)</b> and its <b>PPID (parent process id)</b>. \r\n\r\n<p>Each process only has one parent process, but may have one or more children processes. This is just like a tree structure.  Only one process has PPID that is 0, which means this process has no parent process. All the PIDs will be distinct positive integers.</p>\r\n\r\n<p>We use two list of integers to represent a list of processes, where the first list contains PID for each process and the second list contains the corresponding PPID. </p>\r\n \r\n<p>Now given the two lists, and a PID representing a process you want to kill, return a list of PIDs of processes that will be killed in the end. You should assume that when a process is killed, all its children processes will be killed. No order is required for the final answer.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\npid =  [1, 3, 10, 5]\r\nppid = [3, 0, 5, 3]\r\nkill = 5\r\n<b>Output:</b> [5,10]\r\n<b>Explanation:</b> \r\n           3\r\n         /   \\\r\n        1     5\r\n             /\r\n            10\r\nKill 5 will also kill 10.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The given kill id is guaranteed to be one of the given PIDs.</li>\r\n<li>n >= 1.</li>\r\n</ol>\r\n</p>",
	"frequency":"133",
	"ac_num":"10533"
}