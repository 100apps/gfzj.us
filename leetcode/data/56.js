{
	"difficulty":"2",
	"submit_num":"557695",
	"show_id":"56",
	"leetcode_id":"56",
	"answers":[
		{
			"lc_ans_id":"21222",
			"view":"53948",
			"top":"0",
			"title":"A simple Java solution",
			"vote":"151",
			"content":"The idea is to sort the intervals by their starting points. Then, we take the first interval and compare its end with the next intervals starts. As long as they overlap, we update the end to be the max end of the overlapping intervals. Once we find a non overlapping interval, we can add the previous \"extended\" interval and start over.\\n\\nSorting takes O(n log(n)) and merging the intervals takes O(n). So, the resulting algorithm takes O(n log(n)).\\n\\nI used an a lambda comparator (Java 8) and a for-each loop to try to keep the code clean and simple.\\n\\n    public List<Interval> merge(List<Interval> intervals) {\\n        if (intervals.size() <= 1)\\n            return intervals;\\n        \\n        // Sort by ascending starting point using an anonymous Comparator\\n        intervals.sort((i1, i2) -> Integer.compare(i1.start, i2.start));\\n        \\n        List<Interval> result = new LinkedList<Interval>();\\n        int start = intervals.get(0).start;\\n        int end = intervals.get(0).end;\\n        \\n        for (Interval interval : intervals) {\\n            if (interval.start <= end) // Overlapping intervals, move the end if needed\\n                end = Math.max(end, interval.end);\\n            else {                     // Disjoint intervals, add the previous one and reset bounds\\n                result.add(new Interval(start, end));\\n                start = interval.start;\\n                end = interval.end;\\n            }\\n        }\\n        \\n        // Add the last interval\\n        result.add(new Interval(start, end));\\n        return result;\\n    }\\n\\nEDIT: Updated with Java 8 lambda comparator."
		},
		{
			"lc_ans_id":"21242",
			"view":"17715",
			"top":"1",
			"title":"C++ 10 line solution. easing understanding",
			"vote":"85",
			"content":"    vector<Interval> merge(vector<Interval>& ins) {\\n        if (ins.empty()) return vector<Interval>{};\\n        vector<Interval> res;\\n        sort(ins.begin(), ins.end(), [](Interval a, Interval b){return a.start < b.start;});\\n        res.push_back(ins[0]);\\n        for (int i = 1; i < ins.size(); i++) {\\n            if (res.back().end < ins[i].start) res.push_back(ins[i]);\\n            else\\n                res.back().end = max(res.back().end, ins[i].end);\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"21227",
			"view":"15213",
			"top":"2",
			"title":"7 lines, easy, Python",
			"vote":"69",
			"content":"Just go through the intervals sorted by start coordinate and either combine the current interval with the previous one if they overlap, or add it to the output by itself if they don't.\\n\\n    def merge(self, intervals):\\n        out = []\\n        for i in sorted(intervals, key=lambda i: i.start):\\n            if out and i.start <= out[-1].end:\\n                out[-1].end = max(out[-1].end, i.end)\\n            else:\\n                out += i,\\n        return out"
		},
		{
			"lc_ans_id":"21223",
			"view":"11915",
			"top":"3",
			"title":"Beat 98% Java. Sort start & end respectively.",
			"vote":"68",
			"content":"  The idea is that for the result distinct Interval, the latter one's start must > previous one's end.\\n\\n    public List<Interval> merge(List<Interval> intervals) {\\n\\t\\t// sort start&end\\n\\t\\tint n = intervals.size();\\n\\t\\tint[] starts = new int[n];\\n\\t\\tint[] ends = new int[n];\\n\\t\\tfor (int i = 0; i < n; i++) {\\n\\t\\t\\tstarts[i] = intervals.get(i).start;\\n\\t\\t\\tends[i] = intervals.get(i).end;\\n\\t\\t}\\n\\t\\tArrays.sort(starts);\\n\\t\\tArrays.sort(ends);\\n\\t\\t// loop through\\n\\t\\tList<Interval> res = new ArrayList<Interval>();\\n\\t\\tfor (int i = 0, j = 0; i < n; i++) { // j is start of interval.\\n\\t\\t\\tif (i == n - 1 || starts[i + 1] > ends[i]) {\\n\\t\\t\\t\\tres.add(new Interval(starts[j], ends[i]));\\n\\t\\t\\t\\tj = i + 1;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn res;\\n\\t}"
		},
		{
			"lc_ans_id":"21276",
			"view":"11134",
			"top":"4",
			"title":"A clean java solution",
			"vote":"41",
			"content":"    public class Solution {\\n        public List<Interval> merge(List<Interval> intervals) {\\n            Collections.sort(intervals, new Comparator<Interval>(){\\n                @Override\\n                public int compare(Interval obj0, Interval obj1) {\\n                    return obj0.start - obj1.start;\\n                }\\n            });\\n    \\n            List<Interval> ret = new ArrayList<>();\\n            Interval prev = null;\\n            for (Interval inter : intervals) {\\n                if (  prev==null || inter.start>prev.end ) {\\n                    ret.add(inter);\\n                    prev = inter;\\n                } else if (inter.end>prev.end) {\\n                    // Modify the element already in list\\n                    prev.end = inter.end;\\n                }\\n            }\\n            return ret;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"21332",
			"view":"1811",
			"top":"5",
			"title":"Short python solution",
			"vote":"13",
			"content":"Sort the list first. Check if the new interval overlaps with the previous one in the output list. If yes, update it. Otherwise, append the new one.\\n\\n    class Solution(object):\\n        def merge(self, intervals):\\n            \"\"\"\\n            :type intervals: List[Interval]\\n            :rtype: List[Interval]\\n            \"\"\"\\n            if len(intervals) == 0: return []\\n            intervals = sorted(intervals, key = lambda x: x.start)\\n            res = [intervals[0]]\\n            for n in intervals[1:]:\\n                if n.start <= res[-1].end: res[-1].end = max(n.end, res[-1].end)\\n                else: res.append(n)\\n            return res"
		},
		{
			"lc_ans_id":"21560",
			"view":"2258",
			"top":"6",
			"title":"Fast ana simple java code",
			"vote":"11",
			"content":"\\n The idea is to sort intervals based on start and iterate all itervals to merge them if:\\n\\n    curr.end >= iter.start\\n\\nThe time complexity is : sort nO(logn)+ merge: O(n) = nO(logn)\\n\\nNo Extra space except necessary result : )\\n\\n       public class Solution {\\n            public List<Interval> merge(List<Interval> intervals) {\\n                List<Interval> res = new LinkedList<Interval>();\\n                if(intervals.size()<2) return intervals;\\n                Collections.sort(intervals, new Comparator<Interval>() {\\n                @Override\\n                    public int compare(Interval o1, Interval o2) {\\n                        return o1.start-o2.start;\\n                    }\\n                });\\n                Interval curr = intervals.get(0);\\n                for(Interval iter: intervals) {\\n                    if(curr.end >= iter.start) {\\n                        curr.end = Math.max(curr.end,iter.end);\\n                    }else {\\n                        res.add(curr);\\n                        curr = iter;\\n                    }\\n                }\\n                res.add(curr);\\n                return res;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"21488",
			"view":"3832",
			"top":"7",
			"title":"My easy C++ solution",
			"vote":"11",
			"content":"    static bool comp(const Interval& a, const Interval& b){\\n        return a.start < b.start;\\n    }\\n    vector<Interval> merge(vector<Interval> &intervals) {\\n        vector<Interval> result;\\n        if(intervals.empty()){\\n            return result;\\n        }\\n        sort(intervals.begin(), intervals.end(), comp);\\n        result.push_back(intervals[0]);\\n        for(int i = 1; i < intervals.size(); i++){\\n            if(intervals[i].start <= result.back().end){\\n                Interval temp(result.back().start, max(result.back().end, intervals[i].end));\\n                result.pop_back();\\n                result.push_back(temp);\\n            }\\n            else{\\n                result.push_back(intervals[i]);\\n            }\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"21467",
			"view":"1700",
			"top":"8",
			"title":"My C++ O(NlogN) solution 580ms",
			"vote":"9",
			"content":"Just copy the input to res and do sorting (in ascending order of start). Then try to merge the sorted interval: cur is the last processed interval and i is the current to-be-processed interval. if cur is ahead of i and no overlapping, just copy i to cur+1, and update cur to cur+1, otherwise, merge interval cur and i and move to i+1. At last, we need to resize res to remove the redundent intervals.  \\n\\n    class Solution {\\n    public:\\n        vector<Interval> merge(vector<Interval>& intervals) {\\n            int len = intervals.size(),i,cur;\\n            vector<Interval> res(intervals);\\n            if(len>1)\\n            {\\n                std::sort(res.begin(), res.end(), [](Interval i, Interval j){return i.start<j.start;});\\n                for(cur=0, i=1;i<len; ++i)\\n                    if(res[cur].end<res[i].start) res[++cur] = res[i]; // no overlapping, copy to cur+1, \\n                    else res[cur].end = max(res[cur].end, res[i].end); // cur and i overlap with each other, merge\\n                res.resize(cur+1); // resize to remove redundant intervals\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"21451",
			"view":"1629",
			"top":"9",
			"title":"Share my BST interval tree solution C++ No sorting!",
			"vote":"6",
			"content":"I share this solution because my friend was asked in his FB interview. He was asked to do it without sorting, for a large stream of intervals. The solution can be interval tree, but that is too complicated. Here I maintain a BST of distinct intervals. We dont need to maintain all the intervals like interval tree. We will merge intervals while we inserting. The code did not balance the tree. That is why performance is still 500+ms. \\n\\nSuppose we already have a BST of disjoint intervals. Given a new interval A, it will first find the toppest interval that has overlapping with A. Suppose it is B. Until now everything is easy. We simply traversed tree to reach this. \\n\\nThen, it will try to expand interval B. Now it becomes tricky. There are 3 cases. 1 case is simple. For the other 2 cases, you will need to delete currentNode, because it is already merged. You need to always correctly maintain prevNode and direction, in order to merge correctly in next round. For 1 case, you can end there. For another case, you need to continue exploration. \\nThe 2nd and 3rd case have duplicate code. However, I just keep it for better understanding.\\n\\nThe whole reason we can do this, is because: we will never meet a situation that we delete 1 node with 2 children but still keep its 2 children. If we remove 1 node, that means either his left or right is deleted. So, this is not really traditional node deletion in BST!!!!!! \\n\\nI only share my code that insert a new interval to a BST. Other parts are simple. \\nPlease see notes when we exploring left Children, comments are omitted when exploring right children.\\n\\n    void InsertInterval(BSTInterval *node, Interval \\xa4tInterval, BSTInterval *prev, int sign){\\n    //sign=1 if prev->left = node, sign=-1 if prev->right=node. \\n    \\n    int start=currentInterval.start, end = currentInterval.end;\\n    if(node==NULL){\\n        BSTInterval *newnode = new BSTInterval(start, end);\\n        if(sign==1){\\n            prev->left = newnode;\\n            return;\\n        }\\n        else{\\n            prev->right = newnode;\\n            return;\\n        }\\n    }\\n    if (node->start<=start && node->end>=end)\\n        return;\\n        \\n    if (node->start>end){\\n        InsertInterval(node->left, currentInterval, node, 1);\\n        return;\\n    }\\n    if (node->end<start){\\n        InsertInterval(node->right, currentInterval, node, -1);\\n        return;\\n    }\\n    \\n    \\n    /* Now we find the node that overlap with the interval we want to insert. \\n       We start from here and merge intervals. */\\n    //newLeft is always the new start after explore. \\n    int newLeft=min(start, node->start);\\n    if(start<node->start){\\n        BSTInterval * currentNode = node;\\n        BSTInterval * prevNode = NULL;\\n        while(currentNode != NULL){\\n            if (newLeft>currentNode->end){\\n                //apparently need to explore right direction. \\n                prevNode = currentNode;\\n                currentNode = currentNode->right;\\n                sign = -1;\\n            }\\n            else if (newLeft>currentNode->start){\\n                //apparently currentNode is not node, otherwise will not hit here\\n                //so, it is safe to delete currentNode\\n                //also, in this case, no need to explore more nodes, why?\\n                newLeft=currentNode->start;\\n                clear(currentNode->right);\\n                currentNode->right=NULL;\\n                if(sign==1) \\n                    prevNode->left = currentNode->left;\\n                else\\n                    prevNode->right = currentNode->left;\\n                //we don't need to explore. \\n                delete currentNode;\\n                break;//no need to continue, why?\\n            }\\n            else{ \\n                //be careful: currentNode will be deleted if it is not node\\n                //then, we need to update prevNode and sign directly\\n                //otherwise we can not properly delete next node!!!\\n                //this case still needs exploration.\\n                BSTInterval *leftChild = currentNode->left;\\n                if(currentNode!=node){\\n                    //prevNode and sign not changed. Just delete currentNode\\n                    clear(currentNode->right);\\n                    currentNode->right=NULL;\\n                    if(sign==1)\\n                        prevNode->left = leftChild;\\n                    else\\n                        prevNode->right = leftChild;\\n                    delete currentNode;\\n                }\\n                else{\\n                    //prevNode and sign changed. \\n                    prevNode = currentNode;\\n                    sign = 1;\\n                }\\n                currentNode=leftChild;\\n            }\\n        }\\n    }\\n    node->start = newLeft;\\n\\n    int newRight=max(end, node->end);\\n    if(end>node->end){\\n        BSTInterval * currentNode = node;\\n        BSTInterval * prevNode = NULL;\\n        while(currentNode != NULL){\\n            if (newRight<currentNode->start){\\n                prevNode = currentNode;\\n                currentNode = currentNode->left;\\n                sign = +1;\\n            }\\n            else if (newRight<currentNode->end){\\n                newRight=currentNode->end;\\n                clear(currentNode->left);\\n                currentNode->left=NULL;\\n                if(sign==1) \\n                    prevNode->left = currentNode->right;\\n                else\\n                    prevNode->right = currentNode->right;\\n                delete currentNode;\\n                break;\\n            }\\n            else{ \\n                BSTInterval *rightChild = currentNode->right;\\n                if(currentNode!=node){\\n                    clear(currentNode->left);\\n                    currentNode->left=NULL;\\n                    if(sign==1)\\n                        prevNode->left = rightChild;\\n                    else\\n                        prevNode->right = rightChild;\\n                    delete currentNode;\\n                }\\n                else{\\n                    prevNode = currentNode;\\n                    sign = -1;\\n                }\\n                currentNode=rightChild;                    \\n            }\\n        }\\n    }\\n    node->end = newRight;\\n\\n    return;\\n}"
		}
	],
	"id":"56",
	"title":"Merge Intervals",
	"content":"<p>Given a collection of intervals, merge all overlapping intervals.</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <code>[1,3],[2,6],[8,10],[15,18]</code>,<br />\r\nreturn <code>[1,6],[8,10],[15,18]</code>.\r\n</p>",
	"frequency":"543",
	"ac_num":"175834"
}