{
	"difficulty":"2",
	"submit_num":"18603",
	"show_id":"721",
	"leetcode_id":"721",
	"answers":[
		{
			"lc_ans_id":"109157",
			"view":"2557",
			"top":"0",
			"title":"[Java/C++] Union Find",
			"vote":"21",
			"content":"1. The key task here is to `connect` those `emails`, and this is a perfect use case for union find.\\n2. to group these emails, each group need to have a `representative`, or `parent`.\\n3. At the beginning, set each email as its own representative.\\n4. Emails in each account naturally belong to a same group, and should be joined by assigning to the same parent (let's use the parent of first email in that list);\\n\\nSimple Example:\\n```\\na b c // now b, c have parent a\\nd e f // now e, f have parent d\\ng a d // now abc, def all merged to group g\\n\\nparents populated after parsing 1st account: a b c\\na->a\\nb->a\\nc->a\\n\\nparents populated after parsing 2nd account: d e f\\nd->d\\ne->d\\nf->d\\n\\nparents populated after parsing 3rd account: g a d\\ng->g\\na->g\\nd->g\\n\\n```\\n\\n**Java**\\n```\\nclass Solution {\\n    public List<List<String>> accountsMerge(List<List<String>> acts) {\\n        Map<String, String> owner = new HashMap<>();\\n        Map<String, String> parents = new HashMap<>();\\n        Map<String, TreeSet<String>> unions = new HashMap<>();\\n        for (List<String> a : acts) {\\n            for (int i = 1; i < a.size(); i++) {\\n                parents.put(a.get(i), a.get(i));\\n                owner.put(a.get(i), a.get(0));\\n            }\\n        }\\n        for (List<String> a : acts) {\\n            String p = find(a.get(1), parents);\\n            for (int i = 2; i < a.size(); i++)\\n                parents.put(find(a.get(i), parents), p);\\n        }\\n        for(List<String> a : acts) {\\n            String p = find(a.get(1), parents);\\n            if (!unions.containsKey(p)) unions.put(p, new TreeSet<>());\\n            for (int i = 1; i < a.size(); i++)\\n                unions.get(p).add(a.get(i));\\n        }\\n        List<List<String>> res = new ArrayList<>();\\n        for (String p : unions.keySet()) {\\n            List<String> emails = new ArrayList(unions.get(p));\\n            emails.add(0, owner.get(p));\\n            res.add(emails);\\n        }\\n        return res;\\n    }\\n    private String find(String s, Map<String, String> p) {\\n        return p.get(s) == s ? s : find(p.get(s), p);\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<vector<string>> accountsMerge(vector<vector<string>>& acts) {\\n        map<string, string> owner;\\n        map<string, string> parents;\\n        map<string, set<string>> unions;\\n        for (int i = 0; i < acts.size(); i++) {\\n            for (int j = 1; j < acts[i].size(); j++) {\\n                parents[acts[i][j]] = acts[i][j];\\n                owner[acts[i][j]] = acts[i][0];\\n            }\\n        }\\n        for (int i = 0; i < acts.size(); i++) {\\n            string p = find(acts[i][1], parents);\\n            for (int j = 2; j < acts[i].size(); j++)\\n                parents[find(acts[i][j], parents)] = p;\\n        }\\n        for (int i = 0; i < acts.size(); i++)\\n            for (int j = 1; j < acts[i].size(); j++)\\n                unions[find(acts[i][j], parents)].insert(acts[i][j]);\\n\\n        vector<vector<string>> res;\\n        for (pair<string, set<string>> p : unions) {\\n            vector<string> emails(p.second.begin(), p.second.end());\\n            emails.insert(emails.begin(), owner[p.first]);\\n            res.push_back(emails);\\n        }\\n        return res;\\n    }\\nprivate:\\n    string find(string s, map<string, string>& p) {\\n        return p[s] == s ? s : find(p[s], p);\\n    }\\n};\\n```\\n**C++ Lambda**\\n```\\nclass Solution {\\npublic:\\n    vector<vector<string>> accountsMerge(vector<vector<string>>& acts) {\\n        map<string, string> owner;\\n        map<string, string> parents;\\n        function<string(string)> find = [&](string s) {return parents[s] == s ? s : find(parents[s]); };\\n        for (int i = 0; i < acts.size(); i++) {\\n            for (int j = 1; j < acts[i].size(); j++) {\\n                parents[acts[i][j]] = acts[i][j];\\n                owner[acts[i][j]] = acts[i][0];\\n            }\\n        }\\n        for (int i = 0; i < acts.size(); i++) {\\n            string p = find(acts[i][1]);\\n            for (int j = 2; j < acts[i].size(); j++) {\\n                parents[find(acts[i][j])] = p;\\n            }\\n        }\\n        map<string, set<string>> unions;\\n        for (int i = 0; i < acts.size(); i++) {\\n            for (int j = 1; j < acts[i].size(); j++) {\\n                unions[find(acts[i][j])].insert(acts[i][j]);\\n            }\\n        }\\n        vector<vector<string>> merged;\\n        for (pair<string, set<string>> p : unions) {\\n            vector<string> emails(p.second.begin(), p.second.end());\\n            emails.insert(emails.begin(), owner[p.first]);\\n            merged.push_back(emails);\\n        }\\n        return merged;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109161",
			"view":"1962",
			"top":"1",
			"title":"Python Simple DFS with explanation!!!",
			"vote":"17",
			"content":"We give each account an ID, based on the index of it within the list of accounts.\\n\\n```\\n[\\n[\"John\", \"johnsmith@mail.com\", \"john00@mail.com\"], # Account 0\\n[\"John\", \"johnnybravo@mail.com\"], # Account 1\\n[\"John\", \"johnsmith@mail.com\", \"john_newyork@mail.com\"],  # Account 2\\n[\"Mary\", \"mary@mail.com\"] # Account 3\\n]\\n```\\n\\nNext, build an `emails_accounts_map` that maps an email to a list of accounts, which can be used to track which email is linked to which account. This is essentially our graph.\\n\\n```\\n# emails_accounts_map of email to account ID\\n{\\n  \"johnsmith@mail.com\": [0, 2],\\n  \"john00@mail.com\": [0],\\n  \"johnnybravo@mail.com\": [1],\\n  \"john_newyork@mail.com\": [2],\\n  \"mary@mail.com\": [3]\\n}\\n```\\n\\nNext we do a DFS on each account in accounts list and look up `emails_accounts_map` to tell us which accounts are linked to that particular account via common emails. This will make sure we visit each account only once. This is a recursive process and we should collect all the emails that we encounter along the way.\\n\\nLastly, sort the collected emails and add it to final results, `res` along with the name.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def accountsMerge(self, accounts):\\n        from collections import defaultdict\\n        visited_accounts = [False] * len(accounts)\\n        emails_accounts_map = defaultdict(list)\\n        res = []\\n        # Build up the graph.\\n        for i, account in enumerate(accounts):\\n            for j in range(1, len(account)):\\n                email = account[j]\\n                emails_accounts_map[email].append(i)\\n        # DFS code for traversing accounts.\\n        def dfs(i, emails):\\n            if visited_accounts[i]:\\n                return\\n            visited_accounts[i] = True\\n            for j in range(1, len(accounts[i])):\\n                email = accounts[i][j]\\n                emails.add(email)\\n                for neighbor in emails_accounts_map[email]:\\n                    dfs(neighbor, emails)\\n        # Perform DFS for accounts and add to results.\\n        for i, account in enumerate(accounts):\\n            if visited_accounts[i]:\\n                continue\\n            name, emails = account[0], set()\\n            dfs(i, emails)\\n            res.append([name] + sorted(emails))\\n        return res\\n```"
		},
		{
			"lc_ans_id":"109158",
			"view":"2382",
			"top":"2",
			"title":"Java Solution (Build graph + DFS search)",
			"vote":"12",
			"content":"I have tried my best to make my code clean. Hope the basic idea below may help you. Happy coding!\\n\\nBasicly, this is a graph problem. Notice that each account[ i ] tells us some edges. What we have to do is as follows:\\n1. Use these edges to build some components. Common email addresses are like the intersections that connect each single component for each account.\\n2. Because each component represents a merged account, do DFS search for each components and add into a list. Before add the name into this list, sort the emails. Then add name string into it.\\n\\nExamples: Assume we have three accounts, we connect them like this in order to use DFS. \\n{Name, 1, 2, 3} => Name -- 1 -- 2 -- 3\\n{Name, 2, 4, 5} => Name -- 2 -- 4 -- 5 (The same graph node 2 appears)\\n{Name, 6, 7, 8} => Name -- 6 -- 7 -- 8\\n(Where numbers represent email addresses).\\n\\n```\\nclass Solution {\\n    public List<List<String>> accountsMerge(List<List<String>> accounts) {\\n        List<List<String>> res = new ArrayList<>();\\n        Map<String, Node> map = new HashMap<>();    // <Email, email node>  \\n                \\n        // Build the graph;\\n        for (List<String> list : accounts) {\\n            for (int j = 1; j < list.size(); j++) {\\n                String email = list.get(j);\\n                \\n                if (!map.containsKey(email)) {\\n                    Node node = new Node(email, list.get(0));\\n                    map.put(email, node);\\n                }\\n                \\n                if (j == 1) continue;\\n                //Connect the current email node to the previous email node;\\n                map.get(list.get(j - 1)).neighbors.add(map.get(email));\\n                map.get(email).neighbors.add(map.get(list.get(j - 1)));\\n            }\\n        }\\n        \\n        // DFS search for each components(each account);\\n        Set<String> visited = new HashSet<>();\\n        for (String s : map.keySet()) {\\n            if (visited.add(s)) {\\n                List<String> list = new LinkedList<>();\\n                list.add(s);              \\n                dfs(map.get(s), visited, list);\\n                Collections.sort(list);\\n                list.add(0, map.get(s).username);\\n                res.add(list);\\n            }\\n        }        \\n        return res;\\n    }\\n    \\n    public void dfs(Node root, Set<String> visited, List<String> list) {\\n        for (Node node : root.neighbors) {\\n            if (visited.add(node.val)) {\\n                list.add(node.val);\\n                dfs(node, visited, list);\\n            }\\n        }\\n    }\\n    \\n    class Node {\\n        String val;         // Email address;\\n        String username;    // Username;\\n        List<Node> neighbors;\\n        Node(String val, String username) {\\n            this.val = val;\\n            this.username = username;\\n            neighbors = new ArrayList<>();\\n        }\\n    }\\n}\\n````\\nPlease check the clean version posted by @zhangchunli below. Thanks for updating."
		},
		{
			"lc_ans_id":"109160",
			"view":"860",
			"top":"3",
			"title":"HashMap plus union found solution using Java programming!",
			"vote":"5",
			"content":"```\\nclass Solution {\\n    public List<List<String>> accountsMerge(List<List<String>> accounts) {\\n        if(accounts==null || accounts.size()<1){\\n            return new ArrayList<>();\\n        }\\n        int[] parent = new int[accounts.size()];\\n        for(int i=0;i<parent.length;i++){\\n            parent[i] = i;\\n        }\\n        \\n        Map<String,Integer> map = new HashMap<>();\\n        for(int i=0;i<accounts.size();i++){\\n            List<String> eleStrs = accounts.get(i);\\n            for(int j=1;j<eleStrs.size();j++){\\n                String email = eleStrs.get(j);\\n                if(map.containsKey(email)){\\n                    int pre_id = map.get(email);\\n                    int cur_id = i;\\n                    int parent_pre_id = findParent(parent,pre_id);\\n                    int parent_cur_id = findParent(parent,cur_id);\\n                    if(parent_pre_id!=parent_cur_id){\\n                        parent[parent_cur_id] = parent_pre_id;\\n                    }\\n                }else{\\n                    map.put(email,i);\\n                }\\n            }\\n        }\\n        \\n        Map<Integer,Set<String>> hm = new HashMap<>();\\n        for(int i=0;i<parent.length;i++){\\n            int index = findParent(parent,i);\\n            if(!hm.containsKey(index)){\\n                hm.put(index,new HashSet<>());\\n            }\\n            \\n            Set<String> temp = new HashSet<>();\\n            for(int j=1;j<accounts.get(i).size();j++){\\n                temp.add(accounts.get(i).get(j));\\n            }\\n            hm.get(index).addAll(temp);\\n        }\\n        \\n        List<List<String>> ans = new ArrayList<>();\\n        for(Integer id : hm.keySet()){\\n            ans.add(new ArrayList<>());\\n            ans.get(ans.size()-1).add(accounts.get(id).get(0));\\n            \\n            List<String> addemails = new ArrayList<>(hm.get(id));\\n            Collections.sort(addemails);\\n            ans.get(ans.size()-1).addAll(addemails);\\n        }\\n        \\n        return ans;\\n        \\n    }\\n    \\n    public int findParent(int[] parent,int index){\\n             while(index!=parent[index]){\\n                 parent[index] = parent[parent[index]];\\n                 index = parent[index];\\n             }\\n        \\n             return index;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109194",
			"view":"409",
			"top":"4",
			"title":"Easy python solution, dfs",
			"vote":"3",
			"content":"```\\n    class Account:\\n        def __init__(self, l):\\n            self.name = l[0]\\n            self.emails = l[1:]\\n\\n        def __hash__(self):\\n            return hash(str(self))\\n\\n        def __eq__(self, other):\\n            return self.name == other.name and len(self.emails) == len(other.emails) \\\\\\n                   and set(self.emails) == set(other.emails)\\n\\n    def accountsMerge(self, accounts):\\n        accounts = [self.Account(a) for a in accounts]\\n        email_dict, visited, finalres = defaultdict(set), set(), []\\n\\n        for acc in accounts:\\n            for email in acc.emails:\\n                email_dict[email].add(acc)\\n\\n        for acc in accounts:\\n            if acc in visited: continue\\n            res = set()\\n            self.dfs(acc, email_dict, visited, res)\\n            finalres.append([acc.name] + sorted(res))\\n        return finalres\\n\\n    def dfs(self, acc, email_dict, visited, res):\\n        if acc in visited: return\\n        visited.add(acc)\\n        for email in acc.emails:\\n            res.add(email)\\n            for a in email_dict[email]:\\n                self.dfs(a, email_dict, visited, res)\\n```"
		},
		{
			"lc_ans_id":"109186",
			"view":"232",
			"top":"5",
			"title":"python union-find with path compression and building disjoint set on the fly",
			"vote":"2",
			"content":"Create two maps for fast query\\n1. ```email_to_id``` - email to the id unique for each email which is also used as the index for our disjoint set\\n2. ```id_to_name - the unique id to name (also means email to name)```\\n\\nFor the disjoint set part, we use the negative values represent the size of the set, when we union two sets we link smaller set to bigger set, this potentially give us a relatively shorter path. However if we call find more frequently this shouldn't matter too much.\\nAlso we are build the data structure on the fly by append id to ds every time we see a new email.  \\n```\\nclass Solution(object):\\n    def accountsMerge(self, accounts):\\n        \\n        def find(a):\\n            if ds[a] < 0:\\n                return a\\n            ds[a] = find(ds[a])\\n            return ds[a]\\n        \\n        def union(a, b):\\n            a, b = find(a), find(b)\\n            if a != b:\\n                if ds[a] < ds[b]:\\n                    ds[a] += ds[b]\\n                    ds[b] = a\\n                else:\\n                    ds[b] += ds[a]\\n                    ds[a] = b\\n\\n        c, ds, email_to_id, id_to_name = 0, [], {}, {}\\n        for account in accounts:\\n            for email in account[1:]:\\n                if email not in email_to_id:\\n                    email_to_id[email] = c\\n                    id_to_name[c] = account[0]\\n                    ds.append(-1)\\n                    c += 1\\n                union(email_to_id[account[1]], email_to_id[email])        \\n                \\n        res = {}\\n        for email, id in email_to_id.items():\\n            master = find(id)\\n            res[master] = res.get(master, []) + [email]\\n        return [[id_to_name[id]] + sorted(emails) for id, emails in res.items()]"
		},
		{
			"lc_ans_id":"109176",
			"view":"372",
			"top":"6",
			"title":"How did the sorting work?",
			"vote":"2",
			"content":"How did the sorting work?\\n\\nFor the example, it has the following:\\n\\nInput: \\n```accounts = [[\"John\", \"johnsmith@mail.com\", \"john00@mail.com\"], [\"John\", \"johnnybravo@mail.com\"], [\"John\", \"johnsmith@mail.com\", \"john_newyork@mail.com\"], [\"Mary\", \"mary@mail.com\"]]```\\nOutput: ```[[\"John\", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  [\"John\", \"johnnybravo@mail.com\"], [\"Mary\", \"mary@mail.com\"]]```\\n\\nIn the input, the \"johnsmith\" email address is listed first, but in the output, that address is listed last. Am I missing something here?"
		},
		{
			"lc_ans_id":"109162",
			"view":"84",
			"top":"7",
			"title":"Summary for DFS Templates",
			"vote":"1",
			"content":"The run time of my AC solution is 95 ms which beats 90% cpp solutions. I have met this kind of problem several times, such as [547. Friend Circles](https://leetcode.com/problems/friend-circles/description/) and [737. Sentence Similarity II](https://leetcode.com/problems/sentence-similarity-ii/description/), and you can see my [solution](https://discuss.leetcode.com/topic/112575/real-interview-follow-up-preprocessing-for-multiple-queries) for [737. Sentence Similarity II](https://leetcode.com/problems/sentence-similarity-ii/description/). For this kind of problem, we can use both union-find and DFS algorithms. To make a brief summary, I would like to write a general DFS template, hope it helps.\\n\\nLet us look at this problem, treat each email accounts group (an entity in the given input accounts) as a component, we want to find all connected components among these email accounts. Two components are connected if they have any emails in common. \\n\\nSo the first step is to build a map that can help us to find connected components. For this problem, we should find all components that each email belongs to.\\n```\\n//  build a map that can help us to find connected components. \\n//  treat each entity in accounts as a unique component\\n//  find all component index for each email\\nunordered_map<string, vector<int>> acct;\\nfor (int i = 0; i < n; ++i) {\\n      for (int j = 1; j < accounts[i].size(); ++j) {\\n            acct[accounts[i][j]].push_back(i);\\n      }\\n}\\n```\\n\\nThe second step is to find all emails that in a connected component and generate the output. The idea is simple, we iterate for all component in the input accounts, add all emails into a hash set in case of duplicated emails. At the same time, we need to keep the index of connected components so that we can process the connected components in a DFS manner. To make sure that we just visit each component once, we can use a bool vector to mask the visited component. \\n\\n\\n```\\n//  DFS find all emails in a connected component\\n{       \\n        vector<vector<string>> res;\\n        vector<bool> visited(n, false);\\n        for (int i = 0; i < n; ++i) {\\n            if (visited[i]) continue;    // skip visited component\\n            visited[i] = true;\\n\\n            set<string> emails;\\n            // keep the components index need to visit\\n            vector<int> to_visit{i};    \\n            // find all accounts in a DFS manner\\n            for (int j = 0; j < to_visit.size(); ++j) {\\n                int cur = to_visit[j];\\n                \\n                //  push all email in the current component into emails\\n                emails.insert(accounts[cur].begin() + 1, accounts[cur].end());\\n                \\n                // DFS find all connected components\\n                for (int k = 1; k < accounts[cur].size(); ++k) {\\n                    for (int idx: acct[accounts[cur][k]]) {\\n                        if (visited[idx]) continue;\\n                        visited[idx] = true;\\n                        to_visit.push_back(idx);\\n                    }    \\n                }\\n            }\\n            \\n            //  first save the user name, then save all emails\\n            res.push_back(vector<string> {accounts[i][0]});\\n            auto& r = res.back();\\n            r.insert(r.end(), emails.begin(), emails.end());\\n        }\\n}\\n```\\n\\n\\nSo we can summarize the abstract template as a two-step solution to crack such kind of problem:\\n\\n```\\n//  The first step is to find the connection between connected components.\\n//  In this way, we can visit next component when finishing current component.\\n//  Usually, we can use a map or unordered_map to represent such kind of connection.\\nunordered_map<string, vector<int>> map_connection;\\nfor (int i = 0; i < components.size(); ++i) {\\n      for (int j = 0; j < components[i].size(); ++j) {\\n            //  build connection\\n      }\\n}\\n\\n//  The second step is to merge connected components in a DFS manner.\\n//  To avoid visit any components more than once, we need to remember visited components.\\n//  Usually, this step is a three-layer nested for loop.\\nvector<vector<string>> res;\\nvector<bool> visited(n, false);   // make sure visit each component only once\\n//  first for loop, iterate for each component in the given input\\nfor (int i = 0; i < components.size(); ++i) {\\n    if (visited[i]) continue;   // skip visited component\\n    visited[i] = true;\\n\\n    //  keep the components index need to visit\\n    vector<int> to_visit{i};\\n    \\n    //  save the merged result\\n    set<string> merged_components;\\n\\n    //  second loop, find all connected components in a DFS manner\\n    for (int j = 0; j < to_visit.size(); ++j) {\\n         int cur = to_visit[j];\\n\\n         //   deal with current component\\n         merged_components.insert(components[cur].begin(), components[cur].end());\\n\\n         // thid loop, DFS find all connected components\\n         for (int k = 1; k < accounts[cur].size(); ++k) {\\n              for (int idx: acct[accounts[cur][k]]) {\\n                   if (visited[idx]) continue;   // skip visited component\\n                   visited[idx] = true;\\n                   to_visit.push_back(idx);    //  push into to_visit\\n              }    \\n         }\\n    }\\n}\\n```\\n\\n\\nSolution for [547. Friend Circles](https://leetcode.com/problems/friend-circles/description/):\\n```\\nint findCircleNum(vector<vector<int>>& M) {\\n        int n = M.size();\\n        vector<bool> visited(n, false);\\n        \\n        int cnt = 0;\\n        for (int i = 0; i < n; ++i) {\\n            if (visited[i]) continue;\\n            visited[i] = true;\\n            \\n            ++cnt;\\n            vector<int> to_visit{i};\\n            \\n            for (int j = 0; j < to_visit.size(); ++j) {               \\n                int cur = to_visit[j];\\n                for (int k = 0; k < n; ++k) {\\n                    if (visited[k] || M[cur][k] == 0) continue;\\n                    visited[k] = true;\\n                    \\n                    to_visit.push_back(k);\\n                }\\n            }\\n        }\\n        \\n        return cnt;\\n    }\\n```"
		},
		{
			"lc_ans_id":"109173",
			"view":"61",
			"top":"8",
			"title":"92ms beats 92.12% with union find",
			"vote":"1",
			"content":"```\\nFor example:\\ndata:{name1,mail1,mail2},{name1,mail1,mail3},{name1,mail4},{name2,mail5}\\n\\nDATA structure:\\nhash:\\n key   value(key)   value(value)\\nname1    mail1         id1\\n         mail2         id1\\n         mail3         id2\\n         mail4         id3\\nname2    mail5         id4\\n\\nidx:\\nid: id1 id2 id3 id4\\n    id1 id1 id3 id4\\n```\\n```\\ntypedef map<string,int> mtype;\\nclass Solution {\\npublic:\\n    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {\\n        map<string,mtype >hash;\\n        vector<pair<int,int> >idx;\\n        for(int i=0;i<accounts.size();i++){//for1\\n            string name=accounts[i][0];\\n            idx.push_back(pair<int,int>(i,1));\\n            bool f=(hash.find(name)==hash.end());\\n            for(int j=1;j<accounts[i].size();j++){//for2\\n                string mail=accounts[i][j];\\n                if(f)hash[name][mail]=i;\\n                else{//else1\\n                    mtype::iterator it=hash[name].find(mail);\\n                    if(it==hash[name].end())hash[name][mail]=i;\\n                    else{\\n                        int id1=find(it->second,idx),id2=find(i,idx);\\n                        if(idx[id1].second<idx[id2].second){\\n                            idx[id1].first=id2;\\n                            idx[id2].second+=idx[id1].second;\\n                        }else{\\n                            idx[id2].first=id1;\\n                            idx[id1].second+=idx[id2].second;\\n                        }\\n                    }\\n                }//else1\\n            }//for2\\n        }//for1\\n        vector<vector<string> >res;\\n        for(auto it=hash.begin();it!=hash.end();it++){\\n            map<int,int>hasht;\\n            for(auto it2=it->second.begin();it2!=it->second.end();it2++){\\n                int id=find(it2->second,idx);\\n                if(hasht.find(id)==hasht.end()){\\n                    res.push_back(vector<string>{it->first,it2->first});\\n                    hasht[id]=res.size()-1;\\n                }else res[hasht[id]].push_back(it2->first);\\n            }\\n        }\\n        return res;\\n    }//func\\n    int find(int id,vector<pair<int,int> >&idx){\\n        while(id!=idx[id].first){\\n            idx[id].first=idx[idx[id].first].first;\\n            id=idx[id].first;\\n        }\\n        return id;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109181",
			"view":"180",
			"top":"9",
			"title":"Java Union-Find solution with explanation",
			"vote":"1",
			"content":"Intuitively, we could think of using HashMap to solve this problem. \\nSince User name could be duplicated, it couldn't be used as key. But we still need a way to record how potentially different user names associate with the same account.\\nSo need to be able to:\\n1) Given an email address,we need to know if it occurred before;if it did,we need to know the user associate with it.\\n2) Given a user name,we know which account it belongs to\\nFor (2), we could assume every account is unique and use the index as the account number.So the user name could be easily found with accounts.get(index).get(0); Then we build Map<Integer,Set<String>> m2 to map the account index with all its emails\\nFor (1), we build Map<String,Integer> m1 to record email and its account number.And use Union-Find to build account connection: When we find current email address is already in m1, we union current account number.\\n\\n```\\nclass Solution {\\n    int[] id;\\n    int[] size;\\n    public int find(int p){\\n        while(p != id[p]){\\n            id[p] = id[id[p]];\\n            p = id[p];\\n        }\\n        return p;\\n    }\\n    public void union(int p ,int q){\\n        int rootP = find(p);\\n        int rootQ = find(q);\\n        if(rootP == rootQ) return;\\n        if(size[rootP] < size[rootQ]){\\n            id[rootP] = id[rootQ];\\n            size[rootQ] += size[rootP];\\n        }\\n        else{\\n            id[rootQ] = id[rootP];\\n            size[rootP] += size[rootQ];\\n        }\\n    }\\n    public List<List<String>> accountsMerge(List<List<String>> accounts) {\\n        List<List<String>> res = new LinkedList<>();        \\n        if(accounts == null||accounts.size() == 0) return res;\\n        int n = accounts.size();\\n        //m1 records \"email,accountIndex\" pairs\\n        Map<String,Integer> m1 = new HashMap<>();\\n        //m2 records \"accountIndex, emails associated with it\" pairs\\n        Map<Integer,Set<String>> m2 = new HashMap<>();\\n        //Initialize the id for union-find\\n        id = new int[n];\\n        size = new int[n];\\n        for(int i = 0;i < n;i++){\\n            id[i] = i;\\n        }\\n        for(int i = 0;i < n;i++){\\n            if(!m2.containsKey(i)){\\n                m2.put(i,new HashSet<>());\\n            }            \\n            for(int j = 1;j < accounts.get(i).size();j++){\\n                String email = accounts.get(i).get(j);\\n                // if email occurred before, we know the (m1.containsKey(email))th account is the same one as the ith account\\n                //We could simply merge the two accounts \\n                if(m1.containsKey(email)){\\n                    union(m1.get(email),i);\\n                }\\n                m1.put(email,i);\\n                m2.get(i).add(email);\\n            }\\n        }\\n        //We use map to record the merging result\\n        Map<Integer,Set<String>> map = new HashMap<>();\\n        for(int i = 0;i < n;i++){\\n            int idx = i;\\n            //find current idx's parent p\\n            while(idx != id[idx]){\\n                id[idx] = id[id[idx]];\\n                idx = id[idx];\\n            }\\n            int p = id[idx];\\n            //merge all emails associate with i to p\\n            if(!map.containsKey(p)) map.put(p,new HashSet<>());\\n            if(m2.containsKey(i) && m2.get(i).size() > 0){\\n                map.get(p).addAll(m2.get(i));                \\n            }\\n        }\\n        //Adding entries to the list\\n        for(int key : map.keySet()){\\n            List<String> oneres = new LinkedList<>();\\n            //adding emails\\n            oneres.addAll(map.get(key));\\n            //Sort the list\\n            Collections.sort(oneres);            \\n            //get \"name\" using index \\n            oneres.add(0,accounts.get(key).get(0));\\n            res.add(oneres);\\n        }\\n        return res;\\n    }\\n}\\n```"
		}
	],
	"id":"687",
	"title":"Accounts Merge",
	"content":"<p>Given a list <code>accounts</code>, each element <code>accounts[i]</code> is a list of strings, where the first element <code>accounts[i][0]</code> is a <i>name</i>, and the rest of the elements are <i>emails</i> representing emails of the account.</p>\r\n\r\n<p>Now, we would like to merge these accounts.  Two accounts definitely belong to the same person if there is some email that is common to both accounts.  Note that even if two accounts have the same name, they may belong to different people as people could have the same name.  A person can have any number of accounts initially, but all of their accounts definitely have the same name.</p>\r\n\r\n<p>After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails <b>in sorted order</b>.  The accounts themselves can be returned in any order.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre style=\"white-space: pre-wrap\">\r\n<b>Input:</b> \r\naccounts = [[\"John\", \"johnsmith@mail.com\", \"john00@mail.com\"], [\"John\", \"johnnybravo@mail.com\"], [\"John\", \"johnsmith@mail.com\", \"john_newyork@mail.com\"], [\"Mary\", \"mary@mail.com\"]]\r\n<b>Output:</b> [[\"John\", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  [\"John\", \"johnnybravo@mail.com\"], [\"Mary\", \"mary@mail.com\"]]\r\n<b>Explanation:</b> \r\nThe first and third John's are the same person as they have the common email \"johnsmith@mail.com\".\r\nThe second John and Mary are different people as none of their email addresses are used by other accounts.\r\nWe could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], \r\n['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The length of <code>accounts</code> will be in the range <code>[1, 1000]</code>.</li>\r\n<li>The length of <code>accounts[i]</code> will be in the range <code>[1, 10]</code>.</li>\r\n<li>The length of <code>accounts[i][j]</code> will be in the range <code>[1, 30]</code>.</li>\r\n</p>",
	"frequency":"91",
	"ac_num":"5978"
}