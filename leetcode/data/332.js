{
	"difficulty":"2",
	"submit_num":"148212",
	"show_id":"332",
	"leetcode_id":"332",
	"answers":[
		{
			"lc_ans_id":"78768",
			"view":"52777",
			"top":"0",
			"title":"Short Ruby / Python / Java / C++",
			"vote":"254",
			"content":"Just Eulerian path. Greedy DFS, building the route backwards when retreating.\\n\\nMore explanation and example under the codes.\\n\\nIterative versions inspired by [fangyang](https://leetcode.com/discuss/84706/share-solution-java-greedy-stack-15ms-with-explanation) (I had only thought of recursion, d'oh).\\n\\n---\\n\\n**Ruby**\\n\\n    def find_itinerary(tickets)\\n      tickets = tickets.sort.reverse.group_by(&:first)\\n      route = []\\n      visit = -> airport {\\n        visit[tickets[airport].pop()[1]] while (tickets[airport] || []).any?\\n        route << airport\\n      }\\n      visit[\"JFK\"]\\n      route.reverse\\n    end\\n\\nIterative version:\\n\\n    def find_itinerary(tickets)\\n      tickets = tickets.sort.reverse.group_by(&:first)\\n      route, stack = [], [\"JFK\"]\\n      while stack.any?\\n        stack << tickets[stack[-1]].pop()[1] while (tickets[stack[-1]] || []).any?\\n        route << stack.pop()\\n      end\\n      route.reverse\\n    end\\n\\n---\\n\\n**Python**\\n\\n    def findItinerary(self, tickets):\\n        targets = collections.defaultdict(list)\\n        for a, b in sorted(tickets)[::-1]:\\n            targets[a] += b,\\n        route = []\\n        def visit(airport):\\n            while targets[airport]:\\n                visit(targets[airport].pop())\\n            route.append(airport)\\n        visit('JFK')\\n        return route[::-1]\\n\\nIterative version:\\n\\n    def findItinerary(self, tickets):\\n        targets = collections.defaultdict(list)\\n        for a, b in sorted(tickets)[::-1]:\\n            targets[a] += b,\\n        route, stack = [], ['JFK']\\n        while stack:\\n            while targets[stack[-1]]:\\n                stack += targets[stack[-1]].pop(),\\n            route += stack.pop(),\\n        return route[::-1]\\n\\n---\\n\\n**Java**\\n\\n    public List<String> findItinerary(String[][] tickets) {\\n        for (String[] ticket : tickets)\\n            targets.computeIfAbsent(ticket[0], k -> new PriorityQueue()).add(ticket[1]);\\n        visit(\"JFK\");\\n        return route;\\n    }\\n    \\n    Map<String, PriorityQueue<String>> targets = new HashMap<>();\\n    List<String> route = new LinkedList();\\n    \\n    void visit(String airport) {\\n        while(targets.containsKey(airport) && !targets.get(airport).isEmpty())\\n            visit(targets.get(airport).poll());\\n        route.add(0, airport);\\n    }\\n\\nIterative version:\\n\\n    public List<String> findItinerary(String[][] tickets) {\\n        Map<String, PriorityQueue<String>> targets = new HashMap<>();\\n        for (String[] ticket : tickets)\\n            targets.computeIfAbsent(ticket[0], k -> new PriorityQueue()).add(ticket[1]);\\n        List<String> route = new LinkedList();\\n        Stack<String> stack = new Stack<>();\\n        stack.push(\"JFK\");\\n        while (!stack.empty()) {\\n            while (targets.containsKey(stack.peek()) && !targets.get(stack.peek()).isEmpty())\\n                stack.push(targets.get(stack.peek()).poll());\\n            route.add(0, stack.pop());\\n        }\\n        return route;\\n    }\\n\\n---\\n\\n**C++**\\n\\n    vector<string> findItinerary(vector<pair<string, string>> tickets) {\\n        for (auto ticket : tickets)\\n            targets[ticket.first].insert(ticket.second);\\n        visit(\"JFK\");\\n        return vector<string>(route.rbegin(), route.rend());\\n    }\\n\\n    map<string, multiset<string>> targets;\\n    vector<string> route;\\n\\n    void visit(string airport) {\\n        while (targets[airport].size()) {\\n            string next = *targets[airport].begin();\\n            targets[airport].erase(targets[airport].begin());\\n            visit(next);\\n        }\\n        route.push_back(airport);\\n    }\\n\\n---\\n\\n**Explanation**\\n\\nFirst keep going forward until you get stuck. That's a good main path already. Remaining tickets form cycles which are found on the way back and get merged into that main path. By writing down the path backwards when retreating from recursion, merging the cycles into the main path is easy - the end part of the path has already been written, the start part of the path hasn't been written yet, so just write down the cycle now and then keep backwards-writing the path.\\n\\nExample:\\n\\n![enter image description here][1]\\n\\nFrom JFK we first visit JFK -> A -> C -> D -> A. There we're stuck, so we write down A as the end of the route and retreat back to D. There we see the unused ticket to B and follow it: D -> B -> C -> JFK -> D. Then we're stuck again, retreat and write down the airports while doing so: Write down D before the already written A, then JFK before the D, etc. When we're back from our cycle at D, the written route is D -> B -> C -> JFK -> D -> A. Then we retreat further along the original path, prepending C, A and finally JFK to the route, ending up with the route JFK -> A -> C -> D -> B -> C -> JFK -> D -> A.\\n\\n  [1]: http://www.stefan-pochmann.info/misc/reconstruct-itinerary.png"
		},
		{
			"lc_ans_id":"78766",
			"view":"16828",
			"top":"1",
			"title":"Share my solution",
			"vote":"102",
			"content":"See also [here](http://algobox.org/reconstruct-itinerary/)\\n\\nAll the airports are vertices and tickets are directed edges. Then all these tickets form a directed graph.\\n\\nThe graph must be Eulerian since we know that a Eulerian path exists.\\n\\nThus, start from \"JFK\", we can apply the Hierholzer's algorithm to find a Eulerian path in the graph which is a valid reconstruction.\\n\\nSince the problem asks for lexical order smallest solution, we can put the neighbors in a min-heap. In this way, we always visit the smallest possible neighbor first in our trip.\\n\\n    public class Solution {\\n\\n        Map<String, PriorityQueue<String>> flights;\\n        LinkedList<String> path;\\n\\n        public List<String> findItinerary(String[][] tickets) {\\n            flights = new HashMap<>();\\n            path = new LinkedList<>();\\n            for (String[] ticket : tickets) {\\n                flights.putIfAbsent(ticket[0], new PriorityQueue<>());\\n                flights.get(ticket[0]).add(ticket[1]);\\n            }\\n            dfs(\"JFK\");\\n            return path;\\n        }\\n\\n        public void dfs(String departure) {\\n            PriorityQueue<String> arrivals = flights.get(departure);\\n            while (arrivals != null && !arrivals.isEmpty())\\n                dfs(arrivals.poll());\\n            path.addFirst(departure);\\n        }\\n    }\\n\\n    79 / 79 test cases passed.\\n    Status: Accepted\\n    Runtime: 11 ms"
		},
		{
			"lc_ans_id":"78832",
			"view":"9156",
			"top":"2",
			"title":"Short C++ DFS iterative 44ms solution with explanation.  No recursive calls, no backtracking.",
			"vote":"39",
			"content":"    class Solution {\\n    public:\\n    \\tvector<string> findItinerary(vector<pair<string, string>> tickets) {\\n    \\t\\t// Each node (airport) contains a set of outgoing edges (destination).\\n    \\t\\tunordered_map<string, multiset<string>> graph;\\n    \\t\\t// We are always appending the deepest node to the itinerary, \\n    \\t\\t// so will need to reverse the itinerary in the end.\\n    \\t\\tvector<string> itinerary;\\n    \\t\\tif (tickets.size() == 0){\\n    \\t\\t\\treturn itinerary;\\n    \\t\\t}\\n    \\t\\t// Construct the node and assign outgoing edges\\n    \\t\\tfor (pair<string, string> eachTicket : tickets){\\n    \\t\\t\\tgraph[eachTicket.first].insert(eachTicket.second);\\n    \\t\\t}\\n    \\t\\tstack<string> dfs;\\n    \\t\\tdfs.push(\"JFK\");\\n    \\t\\twhile (!dfs.empty()){\\n    \\t\\t\\tstring topAirport = dfs.top();\\n    \\t\\t\\tif (graph[topAirport].empty()){\\n    \\t\\t\\t\\t// If there is no more outgoing edges, append to itinerary\\n    \\t\\t\\t\\t// Two cases: \\n    \\t\\t\\t\\t// 1. If it searchs the terminal end first, it will simply get\\n    \\t\\t\\t\\t//    added to the itinerary first as it should, and the proper route\\n    \\t\\t\\t\\t//    will still be traversed since its entry is still on the stack.\\n    \\t\\t\\t\\t// 2. If it search the proper route first, the dead end route will also\\n    \\t\\t\\t\\t//    get added to the itinerary first.\\n    \\t\\t\\t\\titinerary.push_back(topAirport);\\n    \\t\\t\\t\\tdfs.pop();\\n    \\t\\t\\t}\\n    \\t\\t\\telse {\\n    \\t\\t\\t\\t// Otherwise push the outgoing edge to the dfs stack and \\n    \\t\\t\\t\\t// remove it from the node.\\n    \\t\\t\\t\\tdfs.push(*(graph[topAirport].begin()));\\n    \\t\\t\\t\\tgraph[topAirport].erase(graph[topAirport].begin());\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\t// Reverse the itinerary.\\n    \\t\\treverse(itinerary.begin(), itinerary.end());\\n    \\t\\treturn itinerary;\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"78841",
			"view":"9721",
			"top":"3",
			"title":"[Share Solution] Java, Greedy, Stack, 15ms with explanation",
			"vote":"28",
			"content":"Noticed some folks are using Hierholzer's algorithm to find a Eulerian path.\\n\\nMy solution is similar, considering this passenger has to be physically in one place before move to another airport, we are considering using up all tickets and choose lexicographically smaller solution if in tie as two constraints.\\n\\nThinking as that passenger, the passenger choose his/her flight greedy as the lexicographical order, once he/she figures out go to an airport without departure with more tickets at hand. the passenger will push current ticket in a stack and look at whether it is possible for him/her to travel to other places from the airport on his/her way.\\n\\nPlease let me know if you have any suggestions.\\n\\n        public List<String> findItinerary(String[][] tickets) {\\n            List<String> ans = new ArrayList<String>();\\n            if(tickets == null || tickets.length == 0) return ans;\\n            Map<String, PriorityQueue<String>> ticketsMap = new HashMap<>();\\n            for(int i = 0; i < tickets.length; i++) {\\n                if(!ticketsMap.containsKey(tickets[i][0])) ticketsMap.put(tickets[i][0], new PriorityQueue<String>());\\n                ticketsMap.get(tickets[i][0]).add(tickets[i][1]);\\n            }\\n    \\n            String curr = \"JFK\";\\n            Stack<String> drawBack = new Stack<String>();\\n            for(int i = 0; i < tickets.length; i++) {\\n                while(!ticketsMap.containsKey(curr) || ticketsMap.get(curr).isEmpty()) {\\n                    drawBack.push(curr);\\n                    curr = ans.remove(ans.size()-1);\\n                }\\n                ans.add(curr);\\n                curr = ticketsMap.get(curr).poll();\\n            }\\n            ans.add(curr);\\n            while(!drawBack.isEmpty()) ans.add(drawBack.pop());\\n            return ans;\\n        }"
		},
		{
			"lc_ans_id":"78785",
			"view":"7372",
			"top":"4",
			"title":"Java 11ms solution(HashMap & sorted List)",
			"vote":"22",
			"content":"    public class Solution {\\n        public List<String> findItinerary(String[][] tickets) {\\n            ArrayList<String> result = new ArrayList<String>();\\n            \\n            if(tickets == null || tickets.length == 0){\\n                return result;\\n            }\\n            \\n            int total = tickets.length + 1;\\n            \\n            HashMap<String, ArrayList<String>> map = new HashMap<String, ArrayList<String>>();\\n            \\n            for(int i = 0; i < tickets.length; i++){\\n                if(map.containsKey(tickets[i][0])){\\n                    ArrayList<String> tmp = map.get(tickets[i][0]);\\n                    listAdd(tickets[i][1], tmp);\\n                }\\n                else{\\n                    ArrayList<String> tmp = new ArrayList<String>();\\n                    tmp.add(tickets[i][1]);\\n                    map.put(tickets[i][0], tmp);\\n                }\\n            }\\n            \\n            result.add(\"JFK\");\\n            \\n            itineraryHelper(\"JFK\", map, result, total, 1);\\n            \\n            return result;\\n        }\\n        \\n        public boolean itineraryHelper(String current, HashMap<String, ArrayList<String>> map, ArrayList<String> result, int total, int num){\\n            \\n            if(num >= total){\\n                return true;\\n            }\\n            \\n            if(!map.containsKey(current) || map.get(current).size() == 0){\\n                return false;\\n            }\\n            \\n            ArrayList<String> curList = map.get(current);\\n            int i = 0;\\n            \\n            while(i < curList.size()){\\n                String next = curList.remove(i);\\n                result.add(next);\\n                \\n                if(itineraryHelper(next, map, result, total, num + 1)){\\n                    return true;\\n                }\\n                \\n                result.remove(result.size() - 1);\\n                listAdd(next, curList);\\n                i++;\\n            }\\n            \\n            return false;\\n        }\\n        \\n        \\n        public void listAdd(String value, ArrayList<String> list){\\n            if(list.size() == 0){\\n                list.add(value);\\n                return;\\n            }\\n            else{\\n                int i = 0;\\n                while(i < list.size()){\\n                    if(value.compareTo(list.get(i)) <= 0){\\n                        list.add(i, value);\\n                        return;\\n                    }\\n                    i++;\\n                }\\n                list.add(value);\\n                return;\\n            }\\n        }\\n        \\n    }"
		},
		{
			"lc_ans_id":"78842",
			"view":"2198",
			"top":"5",
			"title":"C++ non-recursive O(N)-time O(N)-space solution with detail explanations",
			"vote":"19",
			"content":"The idea of this algorithm, which was originally found in fangyang's thread [https://leetcode.com/discuss/84706/share-solution-java-greedy-stack-15ms-with-explanation][1], consists of two steps:\\n\\n- **Step 1**: Store the flight in a hash map. (say `m` in the code below. This map enables us to find all possible destinations from a place in amortized constant time.)\\n\\n- **Step 2**: Use a greedy and trace-back approach to find the optimal itinerary. Specifically, we use greedy method to find a lexicographically-smallest path until we can not move any further (the path can be stored in a vector, say `march` in the code below). Each time we reach such an exhaustive state, we find a place which is exactly the end of the itinerary. (The reason is, the path `march` is an optimal itinerary expect that some loops are omitted. The optimal itinerary can be obtained by inserting some loops into this path, which does not change the last vertex of the path.) Therefore, we can record the last vertex in another place (say `results` in the code below). So and so forth, the vector `results` stores the optimal itinerary reversely, since we always place the optimal last vertex at the end of this vector. Reversing the vertex `results` leads to the correct answer.\\n\\n\\n-----\\n\\n**Example**:\\nThis example is originally shown in  StefanPochmann's thread [https://leetcode.com/discuss/84659/short-ruby-python-java-c][2]\\n\\n\\n![][3]  \\n[ Source of this picture: http://www.stefan-pochmann.info/misc/reconstruct-itinerary.png[][4] ]\\n\\n\\nIn Step 2, we first march greedily, and get the vector `march` as:\\n\\n    march: JFK -> A -> C -> D -> A      (the red path)\\n\\nHowever, the optimal itinerary, is \\n\\n    JFK -> A -> C -> D( -> B -> C -> JFK -> D) -> A\\n\\nwhere the loop (D -> B -> C -> JFK -> D) shall be inserted in the vector `march`. However, we have already found the last vertex A, Therefore, we can record this result. So `march` and `results` become\\n\\n    march: JFK -> A -> C -> D\\n    results: A\\n\\nThen we march greedily again, results in\\n\\n    march: JFK -> A -> C -> D -> B -> C -> JFK -> D\\n    results: A\\n\\nNow all edges are used. Before the final reversion, `march` and `results` become\\n\\n    march: (empty)\\n    results: A <- D <- JFK <- C <- B <- D <- C <- A <- JFK\\n\\n\\n----\\n\\n**Overall Complexities**:\\n\\nLet N be the number of tickets. Let D be the largest outgoing degree of a vertex.\\n\\n- **Time**: *O*(N log D)  \\nStep 1: O(N log D)  \\nStep 2: O(N). Each vertex needs to be put into `march` once and be moved from `march` to `results`. At the very end, `results` is reversed.\\n- **Space**: *O*(N)            \\nThe map `m` needs to store all vertices.\\n\\n\\n-----\\n\\n**Code** (40 ms):\\n\\n    class Solution {\\n    public:\\n        vector<string> findItinerary(vector<pair<string, string>> tickets) {\\n            \\n            // Step 1: Store directed edges in a hash map\\n            unordered_map<string, multiset<string>> m;\\n            for (const pair<string, string> & ticket : tickets) {\\n                m[ticket.first].insert(ticket.second);\\n            }\\n            \\n            // Step 2: March greedily and traceback\\n            vector<string> march = { \"JFK\" }; // the storage for greedy searching\\n            vector<string> results; // store the final results reversely\\n            while (march.empty() == false) {\\n                string & from = march.back();\\n                if ((m.find(from) != m.end()) && (m[from].empty() == false)) { // march further\\n                    multiset<string> & to = m[from];\\n                    march.push_back(*(to.begin()));\\n                    to.erase(to.begin());\\n                } else { // can not march further, trace back\\n                    results.push_back(march.back()); // archive the last place\\n                    march.pop_back();\\n                }\\n            }\\n            reverse(results.begin(), results.end()); // reverse the entries back\\n            return results;\\n        }\\n    };\\n\\n\\n  [1]: https://leetcode.com/discuss/84706/share-solution-java-greedy-stack-15ms-with-explanation\\n  [2]: https://leetcode.com/discuss/84659/short-ruby-python-java-c\\n  [3]: http://www.stefan-pochmann.info/misc/reconstruct-itinerary.png\\n  [4]: https://leetcode.com/discuss/84659/short-ruby-python-java-c"
		},
		{
			"lc_ans_id":"78799",
			"view":"3479",
			"top":"6",
			"title":"Very Straightforward DFS Solution with Detailed Explanations",
			"vote":"17",
			"content":"The nice thing about DFS is it tries a path, and if that's wrong (i.e. path does not lead to solution), DFS goes one step back and tries another path. It continues to do so until we've found the correct path (which leads to the solution). You need to always bear this nice feature in mind when utilizing DFS to solve problems.\\n\\nIn this problem, the path we are going to find is an itinerary which:\\n1. uses all tickets to travel among airports\\n2. preferably in ascending lexical order of airport code\\n\\nKeep in mind that requirement 1 must be satisfied before we consider 2. If we always choose the airport with the smallest lexical order, this would lead to a perfectly lexical-ordered itinerary, but pay attention that when doing so, there can be a \"dead end\" somewhere in the tickets such that we are not able visit all airports (or we can't use all our tickets), which is bad because it fails to satisfy requirement 1 of this problem. Thus we need to take a step back and try other possible airports, which might not give us a perfectly ordered solution, but will use all tickets and cover all airports.\\n\\nThus it's natural to think about the \"backtracking\" feature of DFS. We start by building a graph and then sorting vertices in the adjacency list so that when we traverse the graph later, we can guarantee the lexical order of the itinerary can be as good as possible. When we have generated an itinerary, we check if we have used all our airline tickets. If not, we revert the change and try another ticket. We keep trying until we have used all our tickets.\\n\\n    public class Solution {\\n        private HashMap<String, List<String>> adjList = new HashMap<>();\\n        private LinkedList<String> route = new LinkedList<>();\\n        private int numTickets = 0;\\n        private int numTicketsUsed = 0;\\n        \\n        public List<String> findItinerary(String[][] tickets) {\\n            if (tickets == null || tickets.length == 0) return route;\\n            // build graph\\n            numTickets = tickets.length;\\n            for (int i = 0; i < tickets.length; ++i) {\\n                if (!adjList.containsKey(tickets[i][0])) {\\n                    // create a new list\\n                    List<String> list = new ArrayList<>();\\n                    list.add(tickets[i][1]);\\n                    adjList.put(tickets[i][0], list);\\n                } else {\\n                    // add to existing list\\n                    adjList.get(tickets[i][0]).add(tickets[i][1]);\\n                }\\n            }\\n            // sort vertices in the adjacency list so they appear in lexical order\\n            for (Map.Entry<String, List<String>> entry : adjList.entrySet()) {\\n                Collections.sort(entry.getValue());\\n            }\\n            \\n            // start DFS\\n            route.add(\"JFK\");\\n            dfsRoute(\"JFK\");\\n            return route;\\n        }\\n        \\n        private void dfsRoute(String v) {\\n            // base case: vertex v is not in adjacency list\\n            // v is not a starting point in any itinerary, or we would have stored it\\n            // thus we have reached end point in our DFS\\n            if (!adjList.containsKey(v)) return;\\n            List<String> list = adjList.get(v);\\n            for (int i = 0; i < list.size(); ++i) {\\n                String neighbor = list.get(i);\\n                // remove ticket(route) from graph\\n                list.remove(i);\\n                route.add(neighbor);\\n                numTicketsUsed++;\\n                dfsRoute(neighbor);\\n                // we only return when we have used all tickets\\n                if (numTickets == numTicketsUsed) return;\\n                // otherwise we need to revert the changes and try other tickets\\n                list.add(i, neighbor);\\n                // This line took me a long time to debug\\n                // we must remove the last airport, since in an itinerary, the same airport can appear many times!!\\n                route.removeLast();\\n                numTicketsUsed--;\\n            }\\n        }\\n        \\n    }"
		},
		{
			"lc_ans_id":"78835",
			"view":"1306",
			"top":"7",
			"title":"28ms C++ beats 100% Short and Elegant.",
			"vote":"15",
			"content":"I think this algorithm is often called Fleury's algorithm. But actually it is  Hierholzer's algorithm according to the wiki. Anyway, it works like this:\\n\\nKeep going one path until stuck, then retreat and push the vertices along the route to a stack until it reaches a vertex that has alternative paths, then go along that path and repeat the process.\\nThe assumption for this to work is there is guaranteed to exist one Euler path. (This problem is basically to find a Euler path of a graph).\\n\\n      class Solution {\\n            unordered_map<string, priority_queue<string, vector<string>, greater<string>>> graph;\\n            vector<string> result;\\n            void dfs(string vtex)\\n            {\\n                auto & edges = graph[vtex];\\n                while (!edges.empty())\\n                {\\n                    string to_vtex = edges.top();\\n                    edges.pop();\\n                    dfs(to_vtex);\\n                }\\n                result.push_back(vtex);\\n            }\\n        public:\\n            vector<string> findItinerary(vector<pair<string, string>> tickets) {\\n                for (auto e : tickets)\\n                    graph[e.first].push(e.second);\\n                dfs(\"JFK\");\\n                reverse(result.begin(), result.end());\\n                return result;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"78773",
			"view":"1369",
			"top":"8",
			"title":"Wrong testcase?",
			"vote":"15",
			"content":"Input:\\n[[\"JFK\",\"KUL\"],[\"JFK\",\"NRT\"],[\"NRT\",\"JFK\"]]\\nOutput:\\n[\"JFK\",\"KUL\"]\\nExpected:\\n[\"JFK\",\"NRT\",\"JFK\",\"KUL\"]\\n\\nHow could \"NRT\" have a higher lexical ordering than \"KUL\"?"
		},
		{
			"lc_ans_id":"78789",
			"view":"4764",
			"top":"9",
			"title":"Java 14ms. DFS backtrack",
			"vote":"14",
			"content":"Calculate Euler path. For each point, try to DFS its out-going point. There is chance that a DFS won't get a result. So, we do backtrack. Out-going points should keep ascending order.\\n\\n    public static List<String> findItinerary(String[][] tickets) {\\n        // construct graph\\n        HashMap<String, ArrayList<String>> graph = new HashMap<String, ArrayList<String>>();\\n        ArrayList<String> al = null;\\n        for (String[] ticket : tickets) {\\n            al = graph.get(ticket[0]);\\n            if (al == null) {\\n                al = new ArrayList<String>();\\n                graph.put(ticket[0], al);\\n            }\\n            al.add(ticket[1]);\\n        }\\n        for (ArrayList<String> curr : graph.values()) {\\n            Collections.sort(curr);\\n        }\\n        ArrayList<String> ans = new ArrayList<>();\\n        itineraryHelper(\"JFK\", ans, graph, tickets.length + 1);\\n        return ans;\\n    }\\n\\n    // n is how many stops totally should contain\\n    public static boolean itineraryHelper(String curr, List<String> ans, HashMap<String, ArrayList<String>> graph, int n) {\\n        ans.add(curr);\\n        if (ans.size() >= n) {\\n            return true;\\n        }\\n        if (!graph.containsKey(curr) || graph.get(curr).isEmpty()) {\\n            return false;\\n        }\\n        ArrayList<String> arrivals = graph.get(curr);\\n        for (int i = 0; i < arrivals.size(); i++) { // iterate each arrival point\\n            String arrival = graph.get(curr).remove(i);\\n            if (itineraryHelper(arrival, ans, graph, n)) {\\n                return true;\\n            }\\n            ans.remove(ans.size() - 1); // backtrack\\n            arrivals.add(i, arrival);\\n        }\\n        return false;\\n    }"
		}
	],
	"id":"332",
	"title":"Reconstruct Itinerary",
	"content":"<p>Given a list of airline tickets represented by pairs of departure and arrival airports <code>[from, to]</code>, reconstruct the itinerary in order. All of the tickets belong to a man who departs from <code>JFK</code>. Thus, the itinerary must begin with <code>JFK</code>.\r\n</p>\r\n<p>\r\n<b>Note:</b><br />\r\n<ol>\r\n<li>If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string. For example, the itinerary <code>[\"JFK\", \"LGA\"]</code> has a smaller lexical order than <code>[\"JFK\", \"LGB\"]</code>.</li>\r\n<li>All airports are represented by three capital letters (IATA code).</li>\r\n<li>You may assume all tickets form at least one valid itinerary.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\n    <b>Example 1:</b><br/>\r\n    <code>tickets</code> = <code>[[\"MUC\", \"LHR\"], [\"JFK\", \"MUC\"], [\"SFO\", \"SJC\"], [\"LHR\", \"SFO\"]]</code><br/>\r\n    Return <code>[\"JFK\", \"MUC\", \"LHR\", \"SFO\", \"SJC\"]</code>.<br/>\r\n</p>\r\n<p>\r\n    <b>Example 2:</b><br/>\r\n    <code>tickets</code> = <code>[[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]</code><br/>\r\n    Return <code>[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]</code>.<br/>\r\n    Another possible reconstruction is <code>[\"JFK\",\"SFO\",\"ATL\",\"JFK\",\"ATL\",\"SFO\"]</code>. But it is larger in lexical order.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"288",
	"ac_num":"44048"
}