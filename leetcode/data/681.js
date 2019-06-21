{
	"difficulty":"3",
	"submit_num":"7441",
	"show_id":"715",
	"leetcode_id":"715",
	"answers":[
		{
			"lc_ans_id":"108912",
			"view":"1619",
			"top":"0",
			"title":"C++, vector O(n) and map O(logn), compare two solutions",
			"vote":"10",
			"content":"The solution using vector of intervals (pair<int, int>) is very straightforward. The runtime is O(n) for addRange and deleteRange, and O(logn) for queryRange, where n is total number of intervals.\\n\\nAnother option is to use map (ordered map). And the runtime is still O(logn) for queryRange, but O(klogn) for addRange and deleteRange, where k is number of overlapping ranges. \\n\\nFor a single operation, it is hard to tell whether vector or map is better, because k is unknown. However, the k overlapping ranges will be erased after either add or remove ranges. Let's assume m is the total operations of add or delete ranges. Then total number of possible ranges is O(m) because add or delete may increase ranges by 1. So both n and k is O(m).\\n\\nIn summary, the run time for query is the same. However, the total run time for add and delete using vector is O(m^2), and that using map is O(mlogm). So amortized cost for delete and add is O(m) for vector, and O(logm) for map.\\n\\nVector\\n```\\nclass RangeModule {\\npublic:\\n   void addRange(int left, int right) {\\n        int n = invals.size();\\n        vector<pair<int, int>> tmp;\\n        for (int i = 0; i <= n; i++) {\\n            if (i == n || invals[i].first > right) {\\n                tmp.push_back({left, right});\\n                while (i < n) tmp.push_back(invals[i++]);\\n            }\\n            else if (invals[i].second < left) \\n                tmp.push_back(invals[i]);\\n            else {\\n                left = min(left, invals[i].first);\\n                right = max(right, invals[i].second);\\n            }\\n        }\\n        swap(invals, tmp);\\n    }\\n    \\n    bool queryRange(int left, int right) {\\n        int n = invals.size(), l = 0, r = n-1;\\n        while (l <= r) {\\n            int m = l+(r-l)/2;\\n            if (invals[m].first >= right)\\n                r = m-1;\\n            else if (invals[m].second <= left)\\n                l = m+1;\\n            else \\n                return invals[m].first <= left && invals[m].second >= right;\\n        }\\n        return false;\\n    }\\n    \\n    void removeRange(int left, int right) {\\n        int n = invals.size();\\n        vector<pair<int, int>> tmp;\\n        for (int i = 0; i < n; i++) {\\n            if (invals[i].second <= left || invals[i].first >= right)\\n                tmp.push_back(invals[i]);\\n            else {\\n                if (invals[i].first < left)  tmp.push_back({invals[i].first, left});\\n                if (invals[i].second > right) tmp.push_back({right, invals[i].second});\\n            }\\n        }\\n        swap(invals, tmp);\\n    }\\nprivate:\\n    vector<pair<int, int>> invals;\\n};\\n```\\nUsing map\\n```\\nclass RangeModule {\\npublic:\\n    void addRange(int left, int right) {\\n        auto l = invals.upper_bound(left), r = invals.upper_bound(right); \\n        if (l != invals.begin()) {\\n            l--;\\n            if (l->second < left) l++;\\n        }\\n        if (l != r) {\\n            left = min(left, l->first);\\n            right = max(right, (--r)->second);\\n            invals.erase(l,++r);\\n        }\\n        invals[left] = right;\\n    }\\n    \\n    bool queryRange(int left, int right) {\\n        auto it = invals.upper_bound(left);\\n        if (it == invals.begin() || (--it)->second < right) return false;\\n        return true;\\n    }\\n    \\n    void removeRange(int left, int right) {\\n        auto l = invals.upper_bound(left), r = invals.upper_bound(right); \\n        if (l != invals.begin()) {\\n            l--;\\n            if (l->second < left) l++;\\n        }\\n        if (l == r) return;\\n        int l1 = min(left, l->first), r1 = max(right, (--r)->second);\\n        invals.erase(l, ++r);\\n        if (l1 < left) invals[l1] = left;\\n        if (r1 > right) invals[right] = r1;\\n    }\\nprivate:\\n    map<int, int> invals;\\n};\\n```"
		},
		{
			"lc_ans_id":"108913",
			"view":"840",
			"top":"1",
			"title":"Python",
			"vote":"6",
			"content":"`self.X` is a sorted list of x-coordinates used by add/remove, where the tracking might start/stop. The corresponding `self.track` values tell whether tracking is on at the coordinate and to its right. Removing is really just adding a range of False, so I reuse addRange for it.\\n\\n```\\nclass RangeModule(object):\\n\\n    def __init__(self):\\n        self.X = [0, 10**9]\\n        self.track = [False] * 2\\n\\n    def addRange(self, left, right, track=True):\\n        def index(x):\\n            i = bisect.bisect_left(self.X, x)\\n            if self.X[i] != x:\\n                self.X.insert(i, x)\\n                self.track.insert(i, self.track[i-1])\\n            return i\\n        i = index(left)\\n        j = index(right)\\n        self.X[i:j] = [left]\\n        self.track[i:j] = [track]\\n\\n    def queryRange(self, left, right):\\n        i = bisect.bisect(self.X, left) - 1\\n        j = bisect.bisect_left(self.X, right)\\n        return all(self.track[i:j])\\n\\n    def removeRange(self, left, right):\\n        self.addRange(left, right, False)\\n```"
		},
		{
			"lc_ans_id":"108910",
			"view":"819",
			"top":"2",
			"title":"Java TreeMap",
			"vote":"6",
			"content":"Combined a few logics together to make code look cleaner.\\n`TreeMap<Integer, Integer>`, `key` is the starting index and `value` is the ending index of the interval.\\nMaintainence is done to make sure no overlap intervals exist in the Map.\\n```\\nclass RangeModule {\\n    TreeMap<Integer, Integer> map;\\n    public RangeModule() {\\n        map = new TreeMap<>();\\n    }\\n    \\n    public void addRange(int left, int right) {\\n        if (right <= left) return;\\n        Integer start = map.floorKey(left);\\n        Integer end = map.floorKey(right);\\n        if (start == null && end == null) {\\n            map.put(left, right);\\n        } else if (start != null && map.get(start) >= left) {\\n            map.put(start, Math.max(map.get(end), Math.max(map.get(start), right)));\\n    \\t} else {\\n    \\t    map.put(left, Math.max(map.get(end), right));\\n    \\t}\\n        // clean up intermediate intervals\\n        Map<Integer, Integer> subMap = map.subMap(left, false, right, true);\\n        Set<Integer> set = new HashSet(subMap.keySet());\\n        map.keySet().removeAll(set);\\n    }\\n    \\n    public boolean queryRange(int left, int right) {\\n        Integer start = map.floorKey(left);\\n        if (start == null) return false;\\n        return map.get(start) >= right;\\n    }\\n    \\n    public void removeRange(int left, int right) {\\n        if (right <= left) return;\\n        Integer start = map.floorKey(left);\\n        Integer end = map.floorKey(right);\\n    \\tif (end != null && map.get(end) > right) {\\n            map.put(right, map.get(end));\\n    \\t}\\n    \\tif (start != null && map.get(start) > left) {\\n            map.put(start, left);\\n    \\t}\\n        // clean up intermediate intervals\\n        Map<Integer, Integer> subMap = map.subMap(left, true, right, false);\\n        Set<Integer> set = new HashSet(subMap.keySet());\\n        map.keySet().removeAll(set);\\n        \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108923",
			"view":"433",
			"top":"3",
			"title":"C++ O(nlogn) based on disjoint intervals data structure",
			"vote":"4",
			"content":"```\\nclass RangeModule {\\npublic:\\n    set<pair<int,int>> s;\\n    RangeModule() {}\\n    \\n    void addRange(int x, int y) {\\n        auto it = s.upper_bound({x,INT_MAX});\\n        if (it != s.begin()){\\n            // if previous interval overlap merge and delete\\n            if ((--it)->second < x) ++it;\\n            else {\\n                x = it->first;\\n                y = max(it->second,y);\\n                it = s.erase(it);\\n            }\\n        }\\n        // while overlapping merge and delete\\n        while (it != s.end() && it->first <= y) {\\n            y = max(y,it->second);\\n            it = s.erase(it);\\n        }\\n        s.insert({x,y});\\n    }\\n    \\n    bool queryRange(int x, int y) {\\n        auto it = s.upper_bound({x,INT_MAX});\\n        return (it != s.begin() && (--it)->second >=y);\\n    }\\n    \\n    void removeRange(int x, int y) {\\n        auto it = s.upper_bound({x,INT_MAX});\\n        vector<pair<int,int>> to;\\n        if (it != s.begin()){\\n            if ((--it)->second <= x) ++it;\\n            else {\\n                // if previous interval overlap remove but add back the portion still covered\\n                to.push_back({it->first, x});\\n                if (it->second > y) to.push_back({y, it->second});\\n                it = s.erase(it);\\n            }\\n        }\\n        // while overlapping remove\\n        // if one of the removed intervals is partially covered by the remove range, add back the uncovered portion\\n        while (it != s.end() && it->first < y) {\\n            if (it->second > y) to.push_back({y, it->second});\\n            it = s.erase(it);\\n        }\\n        for (auto p : to) s.insert(p);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108926",
			"view":"793",
			"top":"4",
			"title":"Easy Understand Solution with TreeMap and Intervals 211ms",
			"vote":"3",
			"content":"```java\\nclass RangeModule {\\n    private class Interval {\\n        int start, end;\\n        public Interval(int start, int end) {\\n            this.start = start;\\n            this.end = end;\\n        }\\n    }\\n    TreeMap<Integer, Interval> intervals;\\n    public RangeModule() {\\n        intervals = new TreeMap<>();\\n    }\\n    \\n    public void addRange(int left, int right) {\\n        if (intervals.containsKey(left)) {\\n            Interval cur = intervals.get(left);\\n            cur.end = Math.max(cur.end, right);\\n            Map.Entry<Integer, Interval> high = intervals.higherEntry(cur.start);\\n            while (high != null) {\\n                if (high.getKey() > cur.end) break;\\n                intervals.remove(high.getKey());\\n                cur.end = Math.max(cur.end, high.getValue().end);\\n                high = intervals.higherEntry(cur.start);\\n            }\\n        } else {\\n            Interval cur = new Interval(left, right);\\n            Map.Entry<Integer, Interval> low = intervals.lowerEntry(left);\\n            if (low != null && low.getValue().end >= cur.start) {\\n                intervals.remove(low.getKey());\\n                cur.start = Math.min(cur.start, low.getValue().start);\\n                cur.end = Math.max(cur.end, low.getValue().end);\\n            }\\n            Map.Entry<Integer, Interval> high = intervals.higherEntry(cur.start);\\n            while (high != null) {\\n                if (high.getKey() > cur.end) break;\\n                intervals.remove(high.getKey());\\n                cur.end = Math.max(cur.end, high.getValue().end);\\n                high = intervals.higherEntry(cur.start);\\n            }\\n            intervals.put(cur.start, cur);\\n        }\\n    }\\n    \\n    public boolean queryRange(int left, int right) {\\n        if (intervals.containsKey(left)) {\\n            Interval cur = intervals.get(left);\\n            return cur.end >= right;\\n        } else {\\n            Map.Entry<Integer, Interval> low = intervals.lowerEntry(left);\\n            return low != null && low.getValue().end >= right;\\n        }\\n    }\\n    \\n    public void removeRange(int left, int right) {\\n        if (intervals.containsKey(left)) {\\n            Interval cur = intervals.get(left);\\n            while (cur != null) {\\n                if (cur.start >= right) break;\\n                intervals.remove(cur.start);\\n                if (right <= cur.end) {\\n                    cur.start = right;\\n                    intervals.put(cur.start, cur);\\n                    break;\\n                } else {\\n                    Map.Entry<Integer, Interval> high = intervals.higherEntry(cur.start);\\n                    cur = high == null ? null : high.getValue();\\n                }\\n            }\\n        } else {\\n            Map.Entry<Integer, Interval> low = intervals.lowerEntry(left);\\n            if (low != null) {\\n                if (right < low.getValue().end) {\\n                    intervals.put(right, new Interval(right, low.getValue().end));\\n                }\\n                low.getValue().end = Math.min(low.getValue().end, left);\\n            }\\n            Map.Entry<Integer, Interval> high = intervals.higherEntry(left);\\n            Interval cur = high == null ? null : high.getValue();\\n            while (cur != null) {\\n                if (cur.start >= right) break;\\n                intervals.remove(cur.start);\\n                if (right <= cur.end) {\\n                    cur.start = right;\\n                    intervals.put(cur.start, cur);\\n                    break;\\n                } else {\\n                    high = intervals.higherEntry(cur.start);\\n                    cur = high == null ? null : high.getValue();\\n                }\\n            }\\n        }\\n    }\\n}\\n\\n/**\\n * Your RangeModule object will be instantiated and called as such:\\n * RangeModule obj = new RangeModule();\\n * obj.addRange(left,right);\\n * boolean param_2 = obj.queryRange(left,right);\\n * obj.removeRange(left,right);\\n */\\n```"
		},
		{
			"lc_ans_id":"108911",
			"view":"18",
			"top":"5",
			"title":"clean python solution",
			"vote":"1",
			"content":"````\\nfrom bisect import bisect_left as bl, bisect_right as br\\nclass RangeModule:\\n\\n    def __init__(self):\\n        self.ivs = []\\n\\n    def addRange(self, left, right):\\n        ivs = self.ivs\\n        ilo, ihi = bl(ivs, left), br(ivs, right)\\n        if ilo%2 == 1:\\n            ilo -= 1\\n            left = ivs[ilo]\\n        if ihi%2 == 1:\\n            right = ivs[ihi]\\n            ihi += 1\\n        self.ivs = ivs[:ilo] + [left, right] + ivs[ihi:]\\n\\n    def queryRange(self, left, right):\\n        ivs = self.ivs\\n        ilo = br(ivs, left)\\n        return ilo%2 == 1 and ilo < len(ivs) and ivs[ilo-1] <= left < right <= ivs[ilo]\\n\\n    def removeRange(self, left, right):\\n        ivs = self.ivs\\n        ilo, ihi = bl(ivs, left), br(ivs, right)\\n        new = []\\n        if ilo%2 == 1:\\n            ilo -= 1\\n            new += [ivs[ilo], left]\\n        if ihi%2 == 1:\\n            new += [right, ivs[ihi]]\\n            ihi += 1\\n        self.ivs = ivs[:ilo] + new + ivs[ihi:]"
		},
		{
			"lc_ans_id":"108922",
			"view":"146",
			"top":"6",
			"title":"Binary search tree with interval as element, simple recursion.",
			"vote":"1",
			"content":"Recursively add interval [e0, e1): \\n* case (1), if current tree node ```p``` is empty, add new node as [e0, e1); \\n* case (2), if current node ```p``` is not intersected with [e0, e1), add interval to son of p: \\n```if (e1 < p->e0) addRange(p->left, e0, e1);```\\n``` if (e0 > p->e1) addRange(p->right, e0, e1);```\\n* case (3), if current node ```p``` is intersected with [e0, e1), add the intervals that ```p``` not covered to sons of p: \\n```if (e0 < p->e0) addRange(p->left, e0, e0);```\\n``` if (e1 > p->e1) addRange(p->right, p->e1, e1);``` \\n\\nRecursively remove interval [e0, e1):\\n* case (1), if current tree node ```p``` is empty, do nothing and return;\\n* case (2), if current node ```p``` is not intersected with [e0, e1), remove interval in son of p:  \\n```if (e1 < p->e0) removeRange(p->left, e0, e1); ```\\n```if (e0 > p->e1) removeRange(p->right, e0, e1);```\\n* case (3), if current node ```p``` is intersected  with [e0, e1):\\n **step one**: remove interval that are not covered by ```p``` in p's sons respectively:\\n```struct node *l = removeRange(p->left, e0, p->e0); ```\\n```struct node *r = removeRange(p->right, p->e1, e1); ```\\n**step two**: check whether ```p``` is fully covered by [e0, e1):\\nif ```p``` is not fully covered, just truncate ```p``` and set its sons respectively:\\n``` if (e1 > p->e0 && e1 < p->e1) { p->e0 = e1; p->left = l;}``` \\n``` if (e0 > p->e0 && e0 < p->e1) { p->e1 = e0;p->right = r;}``` \\nif ```p``` is fully covered, ```p``` should be deleted, chose a non-empty ```l``` or  ```r``` and new root node replace ```p```:\\n```if (l == NULL) { p = r; } else { p = right-most son of l }```\\n\\nRecursively query interval [e0, e1):\\n* case (1), if current tree node ```p``` is empty, return false; \\n* case (2), if current node ```p``` is not intersected with [e0, e1), add interval to son of p: \\n```if (e1 < p->e0) queryRange(p->left, e0, e1);```\\n``` if (e0 > p->e1) queryRange(p->right, e0, e1);```\\n* case (3), if current node ```p``` is intersected with [e0, e1):\\n**step one**: query the intervals that ```p``` not covered to sons of p: \\n```if (e0 < p->e0) queryRange(p->left, e0, e0);```\\n``` if (e1 > p->e1) queryRange(p->right, p->e1, e1);``` \\n**step two**: combine query results of sons:\\n```return l && r``` (```l, r``` are initialized as true originally)\\n\\n```\\nstruct node {\\n    int ends[2];\\n    struct node *left, *right;\\n};\\n\\ntypedef struct {\\n    struct node *root;\\n\\n} RangeModule;\\n\\nRangeModule* rangeModuleCreate() {\\n    RangeModule *obj;\\n    obj = (RangeModule *) malloc(sizeof(RangeModule));\\n    obj->root = NULL;\\n    return obj;\\n}\\n\\nstruct node *addRange(struct node *p, int end0, int end1) {\\n    if (p == NULL) {\\n        p = (struct node *) malloc(sizeof(struct node));\\n        p->ends[0] = end0;\\n        p->ends[1] = end1;\\n        p->left = p->right = NULL;  \\n        return p;  \\n    } \\n\\n    if (end1 <= p->ends[0]) {\\n        p->left = addRange(p->left, end0, end1);\\n    } else if (end0 >= p->ends[1]){\\n        p->right = addRange(p->right, end0, end1);\\n    } else {\\n        if (end0 < p->ends[0])\\n            p->left = addRange(p->left, end0, p->ends[0]);\\n        if (end1 > p->ends[1])\\n            p->right = addRange(p->right, p->ends[1], end1);\\n    } \\n    return p;\\n}\\n\\nvoid rangeModuleAddRange(RangeModule* obj, int left, int right) {\\n    obj->root = addRange(obj->root, left, right);\\n}\\n\\nbool queryRange(struct node *p, int end0, int end1) {\\n    if (p == NULL)\\n        return 0;\\n    if (end0 >= p->ends[0] && end1 <= p->ends[1])\\n        return 1;\\n   \\n    if (end1 <= p->ends[0])\\n        return queryRange(p->left, end0, end1);\\n    if (end0 >= p->ends[1])\\n        return queryRange(p->right, end0, end1);\\n    \\n    bool l = 1, r = 1;\\n    if (end0 < p->ends[0])\\n        l = queryRange(p->left, end0, p->ends[0]);\\n    if (end1 > p->ends[1])\\n        r = queryRange(p->right, p->ends[1], end1);\\n    return l && r;\\n}\\n\\nbool rangeModuleQueryRange(RangeModule* obj, int left, int right) {\\n    return queryRange(obj->root, left, right);\\n}\\n\\nstruct node *removeRange(struct node *p, int end0, int end1) {\\n    if (p == NULL)\\n        return NULL;\\n\\n    if (end1 <= p->ends[0]) {\\n        p->left = removeRange(p->left, end0, end1);\\n    } else if (end0 >= p->ends[1]){\\n        p->right = removeRange(p->right, end0, end1);\\n    } else if (end0 > p->ends[0] && end1 < p->ends[1]) {\\n        struct node *tmp = (struct node *) malloc(sizeof(struct node));\\n        tmp->right = p->right;\\n        tmp->left = NULL;\\n        tmp->ends[0] = end1;\\n        tmp->ends[1] = p->ends[1];\\n        p->right = tmp;\\n        p->ends[1] = end0;\\n        \\n    } else {\\n        struct node *l = removeRange(p->left, end0, p->ends[0]);\\n        struct node *r = removeRange(p->right, p->ends[1], end1);\\n        if (end1 > p->ends[0] && end1 < p->ends[1]) {\\n            p->ends[0] = end1;\\n            p->left = l;\\n        } else if (end0 > p->ends[0] && end0 < p->ends[1]) {\\n            p->ends[1] = end0;\\n            p->right = r;\\n        } else {\\n            if (l == NULL)\\n                p = r;\\n            else {\\n                struct node *tmp = l;\\n                while (tmp->right != NULL)\\n                    tmp = tmp->right;\\n                tmp->right = r;\\n                p = l;\\n            }\\n        }\\n    } \\n    return p;\\n}\\n\\nvoid rangeModuleRemoveRange(RangeModule* obj, int left, int right) {\\n    obj->root = removeRange(obj->root, left, right);\\n}\\n\\nvoid freeTree(struct node *root) {\\n    if (root == NULL)\\n        return;\\n    freeTree(root->left);\\n    freeTree(root->right);\\n    free(root);\\n}\\n\\nvoid rangeModuleFree(RangeModule* obj) {\\n    freeTree(obj->root);\\n}\\n```"
		},
		{
			"lc_ans_id":"108925",
			"view":"300",
			"top":"7",
			"title":"Java Segment Tree",
			"vote":"1",
			"content":"```\\nclass RangeModule {\\n\\n        class SegNode {\\n            int left, right, mid;\\n            SegNode lc, rc;\\n            boolean modified;\\n            boolean covered;\\n            boolean empty;\\n            public SegNode(int left, int right){\\n                this.left=left;\\n                this.right=right;\\n                this.mid=left+(right-left)/2;\\n                this.empty=true;\\n            }\\n            void addRange(int left, int right){\\n//                log.info(\"addRange({}, {}) on ({})\", left, right, this);\\n                if (left<=this.left&&right>=this.right){\\n                    if (!covered) {\\n                        covered = true;\\n                        modified=true;\\n                        empty=false;\\n                    }\\n                } else {\\n                    pushdown();\\n                    if (left<=mid) this.lc.addRange(left, right);\\n                    if (right>mid)this.rc.addRange(left, right);\\n                    maintain();\\n                }\\n//                log.info(\"after addRange({}, {}) on ({}\", left, right, this);\\n            }\\n            void maintain(){\\n                this.covered=this.lc.covered&&this.rc.covered;\\n                this.empty=this.lc.empty&&this.rc.empty;\\n            }\\n            void removeRange(int left, int right){\\n//                log.info(\"remove ({}, {}) on ({})\", left, right, this);\\n                if (left<=this.left&&right>=this.right){\\n                    if (!empty){\\n                        empty=true;\\n                        covered=false;\\n                        modified=true;\\n                    }\\n                } else {\\n                    pushdown();\\n                    if (left<=mid)this.lc.removeRange(left, right);\\n                    if (right>mid)this.rc.removeRange(left, right);\\n                    maintain();\\n\\n                }\\n//                log.info(\"after remove ({}, {}) on ({})\", left, right, this);\\n            }\\n            boolean query(int left, int right){\\n//                log.info(\"query ({}, {}) on ({}, {})\", left, right, this);\\n                if (this.empty)return false;\\n                if (this.covered)return true;\\n                if (left<=this.left&&right>=this.right) {\\n                    return this.covered;\\n                }\\n                boolean ans=true;\\n                if (left<=mid)ans&=this.lc.query(left, right);\\n                if (right>mid)ans&=this.rc.query(left, right);\\n                return ans;\\n            }\\n            void pushdown(){\\n                if (this.lc==null){\\n                    this.lc=new SegNode(left, mid);\\n                    this.lc.covered=this.covered;\\n                    this.lc.empty=this.empty;\\n                    this.rc=new SegNode(mid+1,right);\\n                    this.rc.covered=this.covered;\\n                    this.rc.empty=this.empty;\\n                    this.modified=false;\\n                } else if (modified){\\n                    this.lc.covered=this.covered;\\n                    this.lc.empty=this.empty;\\n                    this.lc.modified=true;\\n                    this.rc.covered=this.covered;\\n                    this.rc.empty=this.empty;\\n                    this.rc.modified=true;\\n                    this.modified=false;\\n                }\\n            }\\n\\n//            @Override\\n//            public String toString() {\\n//                return MoreObjects.toStringHelper(this)\\n//                        .add(\"left\", left)\\n//                        .add(\"right\", right)\\n//                        .add(\"mid\", mid)\\n//                        .add(\"modified\", modified)\\n//                        .add(\"covered\", covered)\\n//                        .add(\"empty\", empty)\\n//                        .toString();\\n//            }\\n        }\\n        SegNode root;\\n        public RangeModule() {\\n            root =new SegNode(1, 1_000_000_000);\\n\\n        }\\n\\n        public void addRange(int left, int right) {\\n            root.addRange(left, right-1);\\n\\n        }\\n\\n        public boolean queryRange(int left, int right) {\\n            return root.query(left, right-1);\\n\\n        }\\n\\n        public void removeRange(int left, int right) {\\n            root.removeRange(left, right-1);\\n\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"108914",
			"view":"57",
			"top":"8",
			"title":"c++ code",
			"vote":"0",
			"content":"// Draft version needs to be improved later on.\\n\\n    void addRange(int left, int right) {\\n        auto x = find(left, right);\\n        m[x.first] = x.second;\\n    }\\n    bool queryRange(int left, int right) {\\n        auto it = m.upper_bound(left);\\n        return it != m.begin() && (--it)->second >= right;\\n    }\\n    void removeRange(int left, int right) {\\n        auto x = find(left, right);\\n        m[x.first] = max(x.first, left);\\n        m[right] = max(x.second, right);\\n    }\\n    map<int, int> m;  \\n    pair<int, int> find(int& left, int& right){\\n        auto l = m.upper_bound(left), r = m.upper_bound(right); \\n        if (l != m.begin() && (--l)->second < left) ++l;\\n        if (l == r) return {left, right};\\n        int i = min(left, l->first), j = max(right, (--r)->second);\\n        m.erase(l, ++r);\\n        return {i, j};\\n    }"
		},
		{
			"lc_ans_id":"108915",
			"view":"59",
			"top":"9",
			"title":"JAVA TreeSet easy understand",
			"vote":"0",
			"content":"```\\nclass RangeModule {\\n    \\n    TreeSet<Node> ts = new TreeSet<>();\\n\\n    public RangeModule() {\\n        \\n    }\\n    \\n    public void addRange(int left, int right) {\\n        Node nd = new Node(left, right);\\n        ts.add(nd);\\n    }\\n    \\n    public boolean queryRange(int left, int right) {\\n        for(Node temp : ts){\\n            \\n            if(temp.end <=left){\\n                continue;\\n            }\\n            if(temp.start>left){\\n                return false;\\n            }\\n            if(temp.end>=right){\\n                return true;\\n            }\\n            left = temp.end;\\n        }\\n        return false;\\n    }\\n    \\n    public void removeRange(int left, int right) {\\n        TreeSet<Node> toAdd = new TreeSet<>();\\n        TreeSet<Node> toRem = new TreeSet<>();\\n        \\n        for(Node temp : ts){\\n            \\n            if(temp.start<right && temp.end>left){\\n                if(temp.start<left){\\n                    Node nd = new Node(temp.start, left);\\n                    toAdd.add(nd);\\n                }\\n                if(temp.end>right){\\n                    Node nd = new Node(right, temp.end);\\n                    toAdd.add(nd);\\n                }\\n                toRem.add(temp);\\n            }\\n            if(temp.start>=right){\\n                break;\\n            }            \\n        }\\n        for(Node n:toRem){\\n            ts.remove(n);\\n        }\\n        for(Node n:toAdd){\\n            ts.add(n);\\n        }\\n        /**\\n        for(Node n:ts){\\n            System.out.println(n.start+\" \"+n.end);\\n        }\\n        */\\n    }\\n    \\n    class Node implements Comparable<Node>{\\n        int start;\\n        int end;\\n        Node(int start, int end){\\n            this.start = start;\\n            this.end = end;\\n        }\\n        \\n        public int compareTo(Node n){\\n            if(this.start == n.start){\\n                return this.end-n.end;\\n            } \\n            return this.start-n.start;\\n        }\\n        \\n        public boolean equals(Object o){\\n            if(this == o){\\n                return true;\\n            }\\n            if(!(o instanceof Node)){\\n                return false;\\n            }\\n            Node n = (Node)o;\\n            \\n            return n.start==this.start && n.end==this.end;\\n        }\\n    }\\n}\\n\\n/**\\n * Your RangeModule object will be instantiated and called as such:\\n * RangeModule obj = new RangeModule();\\n * obj.addRange(left,right);\\n * boolean param_2 = obj.queryRange(left,right);\\n * obj.removeRange(left,right);\\n */\\n\\xb7\\xb7\\xb7"
		}
	],
	"id":"681",
	"title":"Range Module",
	"content":"<p>A Range Module is a module that tracks ranges of numbers. Your task is to design and implement the following interfaces in an efficient manner.</p>\r\n\r\n<p><li><code>addRange(int left, int right)</code> Adds the half-open interval <code>[left, right)</code>, tracking every real number in that interval.  Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval <code>[left, right)</code> that are not already tracked.</li></p>\r\n\r\n<p><li><code>queryRange(int left, int right)</code> Returns true if and only if every real number in the interval <code>[left, right)</code>\r\n is currently being tracked.</li></p>\r\n\r\n<p><li><code>removeRange(int left, int right)</code> Stops tracking every real number currently being tracked in the interval <code>[left, right)</code>.</li></p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>addRange(10, 20)</b>: null\r\n<b>removeRange(14, 16)</b>: null\r\n<b>queryRange(10, 14)</b>: true (Every number in [10, 14) is being tracked)\r\n<b>queryRange(13, 15)</b>: false (Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)\r\n<b>queryRange(16, 17)</b>: true (The number 16 in [16, 17) is still being tracked, despite the remove operation)\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>A half open interval <code>[left, right)</code> denotes all real numbers <code>left <= x < right</code>.</li>\r\n\r\n<li><code>0 < left < right < 10^9</code> in all calls to <code>addRange, queryRange, removeRange</code>.</li>\r\n<li>The total number of calls to <code>addRange</code> in a single test case is at most <code>1000</code>.</li>\r\n<li>The total number of calls to <code>queryRange</code> in a single test case is at most <code>5000</code>.</li>\r\n<li>The total number of calls to <code>removeRange</code> in a single test case is at most <code>1000</code>.</li>\r\n</p>",
	"frequency":"128",
	"ac_num":"2345"
}