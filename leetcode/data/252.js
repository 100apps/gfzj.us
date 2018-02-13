{
	"difficulty":"1",
	"submit_num":"91748",
	"show_id":"252",
	"leetcode_id":"252",
	"answers":[
		{
			"lc_ans_id":"67786",
			"view":"16500",
			"top":"0",
			"title":"AC clean Java solution",
			"vote":"62",
			"content":"    public boolean canAttendMeetings(Interval[] intervals) {\\n      if (intervals == null)\\n        return false;\\n\\n      // Sort the intervals by start time\\n      Arrays.sort(intervals, new Comparator<Interval>() {\\n        public int compare(Interval a, Interval b) { return a.start - b.start; }\\n      });\\n      \\n      for (int i = 1; i < intervals.length; i++)\\n        if (intervals[i].start < intervals[i - 1].end)\\n          return false;\\n      \\n      return true;\\n    }"
		},
		{
			"lc_ans_id":"67780",
			"view":"8331",
			"top":"1",
			"title":"Easy JAVA solution beat 98%",
			"vote":"32",
			"content":"    public boolean canAttendMeetings(Interval[] intervals) {\\n            int len=intervals.length;\\n            if(len==0){\\n                return true;\\n            }\\n            int[]begin=new int[len];\\n            int[]stop=new int[len];\\n            for(int i=0;i<len;i++){\\n                begin[i]=intervals[i].start;\\n                stop[i]=intervals[i].end;\\n            }\\n            Arrays.sort(begin);\\n            Arrays.sort(stop);\\n            int endT=0;\\n            for(int i=1;i<len;i++){\\n                if(begin[i]<stop[i-1]){\\n                    return false;\\n                }\\n            }\\n            return true;\\n    }"
		},
		{
			"lc_ans_id":"67782",
			"view":"4882",
			"top":"2",
			"title":"Easy C++ Solution with Explanations",
			"vote":"16",
			"content":"The idea is pretty simple: first we sort the `intervals` in the ascending order of `start`; then we check for the overlapping of each pair of neighboring intervals. If they do, then return `false`; after we finish all the checks and have not returned `false`, just return `true`. \\n\\nSorting takes `O(nlogn)` time and the overlapping checks take `O(n)` time, so this idea is `O(nlogn)` time in total.\\n\\nThe code is as follows.\\n\\n    class Solution {\\n    public:\\n        bool canAttendMeetings(vector<Interval>& intervals) {\\n            sort(intervals.begin(), intervals.end(), compare);\\n            int n = intervals.size();\\n            for (int i = 0; i < n - 1; i++)\\n                if (overlap(intervals[i], intervals[i + 1]))\\n                    return false;\\n            return true;\\n        }\\n    private:\\n        static bool compare(Interval& interval1, Interval& interval2) {\\n            return interval1.start < interval2.start;\\n        }\\n        bool overlap(Interval& interval1, Interval& interval2) {\\n            return interval1.end > interval2.start;\\n        } \\n    };"
		},
		{
			"lc_ans_id":"67812",
			"view":"3195",
			"top":"3",
			"title":"My Python Solution",
			"vote":"12",
			"content":"    def canAttendMeetings(self, intervals):\\n        intervals.sort(key=lambda x: x.start)\\n        \\n        for i in range(1, len(intervals)):\\n            if intervals[i].start < intervals[i-1].end:\\n                return False\\n            \\n        return True"
		},
		{
			"lc_ans_id":"67850",
			"view":"1360",
			"top":"4",
			"title":"10 line c++ solution using lambda function",
			"vote":"7",
			"content":"    class Solution {\\n    public:\\n        bool canAttendMeetings(vector<Interval>& intervals) {\\n            sort(intervals.begin(), intervals.end(), \\n                [](const Interval& interval1, const Interval& interval2){\\n                    return interval1.start < interval2.start;\\n                });\\n            \\n            for (int i = 1; i < intervals.size(); i++){\\n                if (intervals[i].start < intervals[i-1].end)\\n                    return false;\\n            }\\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"67830",
			"view":"787",
			"top":"5",
			"title":"My c++ solution, hashtable.",
			"vote":"5",
			"content":"        class Solution {\\n    public:\\n        bool canAttendMeetings(vector<Interval>& intervals) {\\n            map<int, int> m;\\n            for(int i = 0; i < intervals.size(); ++i){\\n    \\t\\t\\tm[intervals[i].start] = intervals[i].end; \\n    \\t\\t}\\n    \\t\\tif(m.size() < intervals.size()) return false; \\n    \\t\\tint tmp = 0;\\n    \\t\\tfor (map<int,int>::iterator it=m.begin(); it!=m.end(); ++it){ \\n            if(tmp > it->first) return false;\\n            tmp = it->second;\\n            }\\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"67846",
			"view":"1591",
			"top":"6",
			"title":"C++ implementation using interval tree",
			"vote":"3",
			"content":"The first response I had was to use an interval tree. But it may be overkill for this question.\\n\\n    struct Node {\\n        Interval itv;\\n        int max;\\n        Node *left;\\n        Node *right;\\n        Node() : max(0), left(NULL), right(NULL) {}\\n        Node(const Interval &i) : itv(i), max(i.end), left(NULL), right(NULL) {}\\n    };\\n    \\n    bool canAttendMeetings(vector<Interval>& intervals) {\\n        Node *root = NULL;\\n        bool result = true;\\n        for (int i = 0; i < intervals.size(); i++) {\\n            if (root == NULL) {\\n                root = buildTree(intervals[i]);\\n            }\\n            else {\\n                if (searchTree(root, intervals[i])) {\\n                    result = false;\\n                    break;\\n                }\\n                addNode(root, intervals[i]);\\n            }\\n        }\\n        \\n        deleteTree(root);\\n        return result;\\n    }\\n    \\n    Node *buildTree(const Interval &i) {\\n        Node *root = new Node(i);\\n        return root;\\n    }\\n    \\n    void deleteTree(Node *root) {\\n        if (root) {\\n            if (root->left) {\\n                deleteTree(root->left);\\n                root->left = NULL;\\n            }\\n            if (root->right) {\\n                deleteTree(root->right);\\n                root->right = NULL;\\n            }\\n            delete root;\\n        }\\n    }\\n    \\n    void addNode(Node *root, const Interval &i) {\\n        if (root->left && i.start < root->itv.start) {\\n            addNode(root->left, i);\\n            if (root->left->max > root->max)\\n                root->max = root->left->max;\\n        }\\n        else if (root->right && i.start >= root->itv.start) {   \\n            addNode(root->right, i);\\n            if (root->right->max > root->max)\\n                root->max = root->right->max;\\n        }\\n        else {    \\n            Node *n = new Node(i);\\n            if (i.start < root->itv.start)\\n                root->left = n;\\n            else\\n                root->right = n;\\n            \\n            if (n->max > root->max)\\n                root->max = n->max;\\n        }\\n    }\\n    \\n    bool searchTree(const Node *root, const Interval &i) {\\n        const Node *node = root;\\n        while (node && !overlap(node->itv, i)) {\\n            if (node->left && node->left->max > i.start)\\n                node = node->left;\\n            else\\n                node = node->right;\\n        }\\n        if (node) return true;\\n        else return false;\\n    }\\n    \\n    bool overlap(const Interval &a, const Interval &b) {\\n        if (a.start < b.end && b.start < a.end)\\n            return true;\\n        return false;    \\n    }"
		},
		{
			"lc_ans_id":"67832",
			"view":"1560",
			"top":"7",
			"title":"Accepted Java Solution",
			"vote":"3",
			"content":"    public class Solution {\\n        public boolean canAttendMeetings(Interval[] intervals) {\\n            Arrays.sort(intervals, new Comparator<Interval>(){\\n                @Override\\n                public int compare(Interval lhs, Interval rhs){\\n                    if (lhs.start == rhs.start) return 0;\\n                    return lhs.start > rhs.start ? 1 : -1;\\n                }\\n            });\\n    \\n            int firstEndTime = intervals[0].end;\\n            for (int i = 1; intervals.length > 1 && i < intervals.length; i++) {\\n                if (firstEndTime > intervals[i].start) return false;\\n                firstEndTime = intervals[i].end;\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67824",
			"view":"797",
			"top":"8",
			"title":"C++ beat 100% so far, simple and easy",
			"vote":"2",
			"content":"code below\\n\\n    bool canAttendMeetings(vector<Interval>& intervals) {\\n        sort(intervals.begin(), intervals.end(), [](const Interval& a, const Interval& b){ return a.start < b.start; });\\n        int currend=INT_MIN;\\n        for(int i = 0; i < intervals.size(); ++i) {\\n            if(intervals[i].start < currend) { return false; }\\n            currend = intervals[i].end;\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"67840",
			"view":"625",
			"top":"9",
			"title":"Python simple solution easy to understand",
			"vote":"2",
			"content":"    class Solution(object):\\n        def canAttendMeetings(self, intervals):\\n            \"\"\"\\n            :type intervals: List[Interval]\\n            :rtype: bool\\n            \"\"\"\\n            if len(intervals) < 2:\\n                return True\\n            else:\\n                intervals = sorted(intervals, key=lambda x: x.start)\\n                for p, q in zip(intervals, intervals[1:]):\\n                    if q.start < p.end:\\n                        return False\\n                return True"
		}
	],
	"id":"252",
	"title":"Meeting Rooms",
	"content":"<p>Given an array of meeting time intervals consisting of start and end times <code>[[s1,e1],[s2,e2],...]</code> (s<sub>i</sub> < e<sub>i</sub>), determine if a person could attend all meetings.</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <code>[[0, 30],[5, 10],[15, 20]]</code>,<br />\r\nreturn <code>false</code>.\r\n</p>",
	"frequency":"295",
	"ac_num":"44693"
}