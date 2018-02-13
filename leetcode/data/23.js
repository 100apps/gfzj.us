{
	"difficulty":"3",
	"submit_num":"706905",
	"show_id":"23",
	"leetcode_id":"23",
	"answers":[
		{
			"lc_ans_id":"10528",
			"view":"80901",
			"top":"0",
			"title":"A java solution based on Priority Queue",
			"vote":"186",
			"content":"If someone understand how priority queue works, then it would be trivial to walk through the codes. \\n\\nMy question: is that possible to solve this question under the same time complexity without implementing the priority queue?\\n\\n\\n    public class Solution {\\n        public ListNode mergeKLists(List<ListNode> lists) {\\n            if (lists==null||lists.size()==0) return null;\\n            \\n            PriorityQueue<ListNode> queue= new PriorityQueue<ListNode>(lists.size(),new Comparator<ListNode>(){\\n                @Override\\n                public int compare(ListNode o1,ListNode o2){\\n                    if (o1.val<o2.val)\\n                        return -1;\\n                    else if (o1.val==o2.val)\\n                        return 0;\\n                    else \\n                        return 1;\\n                }\\n            });\\n            \\n            ListNode dummy = new ListNode(0);\\n            ListNode tail=dummy;\\n            \\n            for (ListNode node:lists)\\n                if (node!=null)\\n                    queue.add(node);\\n                \\n            while (!queue.isEmpty()){\\n                tail.next=queue.poll();\\n                tail=tail.next;\\n                \\n                if (tail.next!=null)\\n                    queue.add(tail.next);\\n            }\\n            return dummy.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"10531",
			"view":"32072",
			"top":"1",
			"title":"Sharing my straightforward C++ solution without data structure other than vector",
			"vote":"96",
			"content":"    ListNode *mergeKLists(vector<ListNode *> &lists) {\\n        if(lists.empty()){\\n            return nullptr;\\n        }\\n        while(lists.size() > 1){\\n            lists.push_back(mergeTwoLists(lists[0], lists[1]));\\n            lists.erase(lists.begin());\\n            lists.erase(lists.begin());\\n        }\\n        return lists.front();\\n    }\\n    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {\\n        if(l1 == nullptr){\\n            return l2;\\n        }\\n        if(l2 == nullptr){\\n            return l1;\\n        }\\n        if(l1->val <= l2->val){\\n            l1->next = mergeTwoLists(l1->next, l2);\\n            return l1;\\n        }\\n        else{\\n            l2->next = mergeTwoLists(l1, l2->next);\\n            return l2;\\n        }\\n    }\\n\\nThe second function is from Merge Two Sorted Lists. \\n\\nThe basic idea is really simple. We can merge first two lists and then push it back. Keep doing this until there is only one list left in vector. Actually, we can regard this as an iterative divide-and-conquer solution."
		},
		{
			"lc_ans_id":"10522",
			"view":"26898",
			"top":"2",
			"title":"My simple java Solution use recursion",
			"vote":"90",
			"content":"    public static ListNode mergeKLists(ListNode[] lists){\\n        return partion(lists,0,lists.length-1);\\n    }\\n\\n    public static ListNode partion(ListNode[] lists,int s,int e){\\n        if(s==e)  return lists[s];\\n        if(s<e){\\n            int q=(s+e)/2;\\n            ListNode l1=partion(lists,s,q);\\n            ListNode l2=partion(lists,q+1,e);\\n            return merge(l1,l2);\\n        }else\\n            return null;\\n    }\\n\\n    //This function is from Merge Two Sorted Lists.\\n    public static ListNode merge(ListNode l1,ListNode l2){\\n        if(l1==null) return l2;\\n        if(l2==null) return l1;\\n        if(l1.val<l2.val){\\n            l1.next=merge(l1.next,l2);\\n            return l1;\\n        }else{\\n            l2.next=merge(l1,l2.next);\\n            return l2;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"10527",
			"view":"17269",
			"top":"3",
			"title":"Difference between Priority-Queue and Heap, and C++ implementation",
			"vote":"62",
			"content":"I have seen lots of solutions confuse `priority queue` with `heap`. I find a good [link][1] and list the talk below.\\n\\n**Concept:**\\n\\n1.`Heap` is a kind of `data structure`. It is a name for a particular way of storing data that makes certain operations very efficient. We can use a tree or array to describe it.\\n\\n       18\\n      /\\t\\\\\\n     10\\t 16\\n    / \\\\   / \\\\\\n    9  5  8  12\\n    \\n    18, 10, 16, 9, 5, 8, 12\\n\\n2.`Priority queue` is an `abstract datatype`. It is a shorthand way of describing a particular interface and behavior, and says nothing about the underlying implementation.\\n\\nA heap is a very good data structure to implement a priority queue. The operations which are made efficient by the heap data structure are the operations that the priority queue interface needs.\\n\\n\\n**Implementation: c++** \\n\\n1.`priority_queue`: we can only get the top element (from ChiangKaiShrek's [solution][2])\\n\\n    struct compare {\\n        bool operator()(const ListNode* l, const ListNode* r) {\\n            return l->val > r->val;\\n        }\\n    };\\n    ListNode *mergeKLists(vector<ListNode *> &lists) { //priority_queue\\n        priority_queue<ListNode *, vector<ListNode *>, compare> q;\\n        for(auto l : lists) {\\n            if(l)  q.push(l);\\n        }\\n        if(q.empty())  return NULL;\\n\\n        ListNode* result = q.top();\\n        q.pop();\\n        if(result->next) q.push(result->next);\\n        ListNode* tail = result;            \\n        while(!q.empty()) {\\n            tail->next = q.top();\\n            q.pop();\\n            tail = tail->next;\\n            if(tail->next) q.push(tail->next);\\n        }\\n        return result;\\n    }\\n\\n2.`make_heap`: we can access all the elements (from my answer for that solution)\\n\\n    static bool heapComp(ListNode* a, ListNode* b) {\\n            return a->val > b->val;\\n    }\\n    ListNode* mergeKLists(vector<ListNode*>& lists) { //make_heap\\n        ListNode head(0);\\n        ListNode *curNode = &head;\\n        vector<ListNode*> v;   \\n        for(int i =0; i<lists.size(); i++){\\n            if(lists[i]) v.push_back(lists[i]);\\n        }\\n        make_heap(v.begin(), v.end(), heapComp); //vector -> heap data strcture\\n    \\n        while(v.size()>0){\\n            curNode->next=v.front();\\n            pop_heap(v.begin(), v.end(), heapComp); \\n            v.pop_back(); \\n            curNode = curNode->next;\\n            if(curNode->next) {\\n                v.push_back(curNode->next); \\n                push_heap(v.begin(), v.end(), heapComp);\\n            }\\n        }\\n        return head.next;\\n    }\\n\\nIf there is something wrong, please figure it out. Hoping to learn more about them.\\n\\n\\n  [1]: http://stackoverflow.com/questions/18993269/difference-between-priority-queue-and-a-heap\\n  [2]: https://leetcode.com/discuss/21363/brief-c-solution-with-priority_queue"
		},
		{
			"lc_ans_id":"10511",
			"view":"11272",
			"top":"4",
			"title":"10-line python solution with priority queue",
			"vote":"48",
			"content":"    from Queue import PriorityQueue\\n    class Solution(object):\\n        def mergeKLists(self, lists):\\n            dummy = ListNode(None)\\n            curr = dummy\\n            q = PriorityQueue()\\n            for node in lists:\\n                if node: q.put((node.val,node))\\n            while q.qsize()>0:\\n                curr.next = q.get()[1]\\n                curr=curr.next\\n                if curr.next: q.put((curr.next.val, curr.next))\\n            return dummy.next"
		},
		{
			"lc_ans_id":"10513",
			"view":"4949",
			"top":"5",
			"title":"108ms python solution with heapq and avoid changing heap size",
			"vote":"32",
			"content":"    def mergeKLists(self, lists):\\n        from heapq import heappush, heappop, heapreplace, heapify\\n        dummy = node = ListNode(0)\\n        h = [(n.val, n) for n in lists if n]\\n        heapify(h)\\n        while h:\\n            v, n = h[0]\\n            if n.next is None:\\n                heappop(h) #only change heap size when necessary\\n            else:\\n                heapreplace(h, (n.next.val, n.next))\\n            node.next = n\\n            node = node.next\\n    \\n        return dummy.next"
		},
		{
			"lc_ans_id":"10640",
			"view":"5036",
			"top":"6",
			"title":"Simple Java Merge Sort",
			"vote":"23",
			"content":"For this problem, use merge sort is simple and fast, I wonder why some guys solve it use PriorityQueue.\\n\\nI think the complexity is k * n * logk. Because the recursion depth is logK,  and in each level, every element will be compared.\\n\\n    public ListNode mergeKLists(ListNode[] lists) {\\n\\t\\tif (lists == null || lists.length == 0)\\n\\t\\t\\treturn null;\\n        return mergeKLists(lists, 0, lists.length - 1);\\n    }\\n\\tprivate ListNode mergeKLists(ListNode[] lists, int start, int end) {\\n\\t\\tif (start == end) {\\n\\t\\t\\treturn lists[start];\\n\\t\\t} else if (start < end){\\n\\t\\t\\tint mid = (end - start) / 2 + start;\\n\\t\\t\\tListNode left = mergeKLists(lists, start, mid);\\n\\t\\t\\tListNode right = mergeKLists(lists, mid + 1, end);\\n\\t\\t\\treturn mergeTwoLists(left, right);\\n\\t\\t} else {\\n\\t\\t\\treturn null;\\n\\t\\t}\\n\\t}\\n\\nmergeTwoLists is base on the Merge Two Sorted Lists problem."
		},
		{
			"lc_ans_id":"10610",
			"view":"3373",
			"top":"7",
			"title":"C++ code O(NlogK) in time, O(1) in space, Divide_Conquer",
			"vote":"16",
			"content":"    ListNode* mergeKLists(vector<ListNode*>& lists) {\\n        int k = (int)lists.size();\\n        if(k==0) return NULL;\\n        if(k==1) return lists[0];\\n        return doMerge(lists, 0, (int)lists.size()-1);\\n    }\\n    \\n    \\n    ListNode* doMerge(vector<ListNode*>& lists, int left, int right) {\\n        if(left==right) return lists[left];\\n        else if(left+1==right) return merge2Lists(lists[left], lists[right]);\\n        ListNode* l1 = doMerge(lists, left, (left+right)/2);\\n        ListNode* l2 = doMerge(lists, (left+right)/2+1, right);\\n        return merge2Lists(l1, l2);\\n    }\\n    \\n    \\n    ListNode* merge2Lists(ListNode* l1, ListNode* l2) {\\n        if(l1==l2) return l1;\\n        if(!l1) return l2;\\n        if(!l2) return l1;\\n        if(l1->val>l2->val) return merge2Lists(l2, l1);\\n        ListNode* newl2 = new ListNode(0); newl2->next = l2;\\n        ListNode* p1 = l1;\\n        while (p1->next && newl2->next) {\\n            if (p1->next->val<newl2->next->val) {\\n                p1 = p1->next;\\n            } else {\\n                ListNode* temp = p1->next;\\n                p1->next = newl2->next;\\n                newl2->next = newl2->next->next;\\n                p1->next->next = temp;\\n                p1 = p1->next;\\n            }\\n        }\\n        if(!p1->next) p1->next = newl2->next;\\n        delete newl2;\\n        return l1;\\n    }"
		},
		{
			"lc_ans_id":"10543",
			"view":"5639",
			"top":"8",
			"title":"Brief C++ solution with priority_queue",
			"vote":"16",
			"content":"We just need to define a comparison struct for ListNodes, then managing the priority\\\\_queue is quite straightforward. After filling the priority\\\\_queue, if it is non-empty, we set the head and tail. Then we repeatedly pop the top off the queue and append that to the tail. If the next node is not null, we push it onto the queue.\\n\\n\\n\\n    class Solution {\\n        struct compare {\\n            bool operator()(const ListNode* l, const ListNode* r) {\\n                return l->val > r->val;\\n            }\\n        };\\n        \\n    public:\\n        ListNode *mergeKLists(vector<ListNode *> &lists) {\\n            priority_queue<ListNode *, vector<ListNode *>, compare> q;\\n            for (auto l : lists) {\\n                if (l) {\\n                    q.push(l);\\n                }\\n            }\\n            \\n            if (q.empty()) {\\n                return NULL;\\n            }\\n            \\n            ListNode* result = q.top();\\n            q.pop();\\n            if (result->next) {\\n                q.push(result->next);\\n            }\\n\\n            ListNode* tail = result;            \\n            while (!q.empty()) {\\n                tail->next = q.top();\\n                q.pop();\\n                tail = tail->next;\\n                if (tail->next) {\\n                    q.push(tail->next);\\n                }\\n            }\\n            \\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"10809",
			"view":"5075",
			"top":"9",
			"title":"13-lines in Java",
			"vote":"15",
			"content":"Hi guys!\\n\\nThe approach is standard - PriorityQueue, but I noticed that solutions presented before are kind of a bit long. So that's the concise version. :)\\n\\nHope it helps!\\n\\n----------\\n\\n    public class Solution {\\n        public ListNode mergeKLists(List<ListNode> lists) {\\n            Queue<ListNode> heap = new PriorityQueue(new Comparator<ListNode>(){\\n                @Override public int compare(ListNode l1, ListNode l2) { \\n                    return l1.val - l2.val; \\n                }\\n            });\\n            ListNode head = new ListNode(0), tail = head;\\n            for (ListNode node : lists) if (node != null) heap.offer(node);\\n            while (!heap.isEmpty()) {\\n                tail.next = heap.poll();\\n                tail = tail.next;\\n                if (tail.next != null) heap.offer(tail.next);\\n            }\\n            return head.next;\\n        }\\n    }"
		}
	],
	"id":"23",
	"title":"Merge k Sorted Lists",
	"content":"<p>\r\nMerge <i>k</i> sorted linked lists and return it as one sorted list. Analyze and describe its complexity.\r\n</p>",
	"frequency":"577",
	"ac_num":"197770"
}