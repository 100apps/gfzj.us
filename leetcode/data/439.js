{
	"difficulty":"2",
	"submit_num":"90163",
	"show_id":"445",
	"leetcode_id":"445",
	"answers":[
		{
			"lc_ans_id":"92623",
			"view":"29510",
			"top":"0",
			"title":"Easy O(n) Java Solution using Stack",
			"vote":"107",
			"content":"```\\npublic class Solution {\\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n        Stack<Integer> s1 = new Stack<Integer>();\\n        Stack<Integer> s2 = new Stack<Integer>();\\n        \\n        while(l1 != null) {\\n            s1.push(l1.val);\\n            l1 = l1.next;\\n        };\\n        while(l2 != null) {\\n            s2.push(l2.val);\\n            l2 = l2.next;\\n        }\\n        \\n        int sum = 0;\\n        ListNode list = new ListNode(0);\\n        while (!s1.empty() || !s2.empty()) {\\n            if (!s1.empty()) sum += s1.pop();\\n            if (!s2.empty()) sum += s2.pop();\\n            list.val = sum % 10;\\n            ListNode head = new ListNode(sum / 10);\\n            head.next = list;\\n            list = head;\\n            sum /= 10;\\n        }\\n        \\n        return list.val == 0 ? list.next : list;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92624",
			"view":"11188",
			"top":"1",
			"title":"C++ O(1) extra space except for output. Reverse output instead. Is this cheating?",
			"vote":"31",
			"content":"Idea is to reverse output instead of input. Not sure if this is cheating.\\n```\\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\\n        int n1 = 0, n2 = 0, carry = 0;\\n        ListNode *curr1 = l1, *curr2 = l2, *res = NULL;\\n        while( curr1 ){ curr1=curr1->next; n1++; }\\n        while( curr2 ){ curr2=curr2->next; n2++; } \\n        curr1 = l1; curr2 = l2;\\n        while( n1 > 0 && n2 > 0){\\n            int sum = 0;\\n            if( n1 >= n2 ){ sum += curr1->val; curr1=curr1->next; n1--;}\\n            if( n2 > n1 ){ sum += curr2->val; curr2=curr2->next; n2--;}\\n            res = addToFront( sum, res );\\n        }\\n        curr1 = res; res = NULL;\\n        while( curr1 ){\\n            curr1->val += carry; carry = curr1->val/10;\\n            res = addToFront( curr1->val%10, res );\\n            curr2 = curr1; \\n            curr1 = curr1->next;\\n            delete curr2;\\n        }\\n        if( carry ) res = addToFront( 1, res );\\n        return res;\\n    }\\n    ListNode* addToFront( int val, ListNode* head ){\\n        ListNode* temp = new ListNode(val);\\n        temp->next = head;\\n        return temp;\\n    }\\n```"
		},
		{
			"lc_ans_id":"92643",
			"view":"10046",
			"top":"2",
			"title":"Java O(n) recursive solution by counting the difference of length",
			"vote":"20",
			"content":"````\\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n        int size1 = getLength(l1);\\n        int size2 = getLength(l2);\\n        ListNode head = new ListNode(1);\\n        // Make sure l1.length >= l2.length\\n        head.next = size1 < size2 ? helper(l2, l1, size2 - size1) : helper(l1, l2, size1 - size2);\\n        // Handle the first digit\\n        if (head.next.val > 9) {\\n            head.next.val = head.next.val % 10;\\n            return head;\\n        }\\n        return head.next;\\n    }\\n    // get length of the list\\n    public int getLength(ListNode l) {\\n        int count = 0;\\n        while(l != null) {\\n            l = l.next;\\n            count++;\\n        }\\n        return count;\\n    }\\n    // offset is the difference of length between l1 and l2\\n    public ListNode helper(ListNode l1, ListNode l2, int offset) {\\n        if (l1 == null) return null;\\n        // check whether l1 becomes the same length as l2\\n        ListNode result = offset == 0 ? new ListNode(l1.val + l2.val) : new ListNode(l1.val);\\n        ListNode post = offset == 0 ? helper(l1.next, l2.next, 0) : helper(l1.next, l2, offset - 1);\\n        // handle carry \\n        if (post != null && post.val > 9) {\\n            result.val += 1;\\n            post.val = post.val % 10;\\n        }\\n        // combine nodes\\n        result.next = post;\\n        return result;\\n    }\\n````"
		},
		{
			"lc_ans_id":"92627",
			"view":"4016",
			"top":"3",
			"title":"There is no maximum of INT in python, so.....",
			"vote":"16",
			"content":"Since there is no maximum of int in python, we can computer the sum and then construct the result link list. Does this count as cheating?\\n~~~~\\ndef addTwoNumbers(self, l1, l2):\\n\\n        x1, x2 = 0, 0\\n        while l1:\\n            x1 = x1*10+l1.val\\n            l1 = l1.next\\n        while l2:\\n            x2 = x2*10+l2.val\\n            l2 = l2.next\\n        x = x1 + x2\\n        \\n        head = ListNode(0)\\n        if x == 0: return head\\n        while x:\\n            v, x = x%10, x//10\\n            head.next, head.next.next = ListNode(v), head.next\\n            \\n        return head.next\\n~~~~"
		},
		{
			"lc_ans_id":"92629",
			"view":"6232",
			"top":"4",
			"title":"Concise C++ Solution without reverse",
			"vote":"7",
			"content":"O(n) time, O(n) space\\nAnybody knows O(1) space solution without reverse?\\nclass Solution {\\npublic:\\n\\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\\n        vector<int> nums1, nums2;\\n        while(l1) {\\n            nums1.push_back(l1->val);\\n            l1 = l1->next;\\n        }\\n        while(l2) {\\n            nums2.push_back(l2->val);\\n            l2 = l2->next;\\n        }\\n\\n        int m = nums1.size(), n = nums2.size();\\n        int sum = 0, carry = 0;\\n\\n        ListNode *head = nullptr, *p = nullptr;\\n\\n        for(int i = m - 1, j = n - 1; i >= 0 || j >= 0 || carry > 0; i--, j--) {\\n            sum = carry;\\n            if(i >= 0) \\n                sum += nums1[i];\\n\\n            if(j >= 0)\\n                sum += nums2[j];\\n\\n            carry = sum / 10;\\n\\n            p = new ListNode(sum%10);\\n            p->next = head;\\n            head = p;\\n        }\\n\\n        return head;\\n    }\\n};"
		},
		{
			"lc_ans_id":"92788",
			"view":"898",
			"top":"5",
			"title":"Java iterative O(1) space lastNot9 solution Changed from Plus One Linked List",
			"vote":"6",
			"content":"This is similar to the problem Plus One Linked List.\\nLet's first look at the solution for Plus One Linked List. This solution is learnt from [this post](https://discuss.leetcode.com/topic/49556/iterative-two-pointers-with-dummy-node-java-o-n-time-o-1-space/2).\\n            \\n\\n    /*  Go to the last one, if == 9, then put 0 and remember a carry\\n     *  Remember the node before the last 9 in front of the end node. \\n     * ==> Remeber last node not 9!\\n     *  ** Corner case: head should also be modified and add a new node as a head.\\n     */\\n     public ListNode plusOne(ListNode head) {\\n         ListNode dummy = new ListNode(0); // start with 0. If need to update dummy, then check if dummy is modified to 1\\n         dummy.next = head;\\n         ListNode cur = dummy, lastnot9 = null;\\n         \\n         while(cur != null){\\n            if(cur.val != 9){\\n                lastnot9 = cur;\\n            }\\n            cur = cur.next;\\n         }\\n         \\n         lastnot9.val += 1;\\n         cur = lastnot9.next;\\n         while(cur != null){\\n            cur.val = 0;\\n            cur = cur.next;\\n         }\\n         if(dummy.val == 1) return dummy;\\n         return dummy.next;\\n    }\\n\\nThis is the lastNot9 solution for add two numbers II. Thanks to the swap trick provided by [this post](https://discuss.leetcode.com/topic/65298/java-o-n-scanning-twice-simple-with-comments).\\n\\n    /* Carry is at most 1. \\n     * If the current node is 9, even if there is a carry, the previous node may get affected.\\n     * If the current node is not 9, even if there is a carry after this, the previous node will not get affected.\\n     */\\n    \\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n        int len1 = getLength(l1), len2 = getLength(l2);\\n        if(len1 < len2){ // swap l1 and l2 to make sure l1 is the longer one\\n            ListNode tmp = l1; l1 = l2; l2 = tmp;\\n        }\\n        int diff = Math.abs(len1-len2);\\n        \\n        ListNode dummy = new ListNode(0);\\n        ListNode tail = dummy;\\n        ListNode lastnot9node = dummy;\\n        \\n        while(diff > 0){\\n            // create new node\\n            tail.next = new ListNode(l1.val);\\n\\n            // update lastnot9node\\n            if(l1.val != 9) lastnot9node = tail.next;\\n\\n            // update tails\\n            tail = tail.next;\\n            l1 = l1.next;\\n            diff--;\\n        }\\n\\n        while(l1 != null){\\n            int val = l1.val + l2.val;\\n            \\n            if(val >= 10){\\n                val -= 10;\\n                // update previous nodes\\n                lastnot9node.val++;\\n                lastnot9node = lastnot9node.next;\\n                while(lastnot9node != null){\\n                    lastnot9node.val = 0;\\n                    lastnot9node = lastnot9node.next;\\n                }\\n                lastnot9node = tail;\\n            }\\n            \\n            // create new node\\n            tail.next = new ListNode(val);\\n            \\n            // update lastnot9node\\n            if(val != 9) lastnot9node = tail.next;\\n            \\n            // update tails\\n            tail = tail.next;\\n            l1   = l1.next;\\n            l2   = l2.next;\\n        }\\n        \\n        if(dummy.val == 1) return dummy;\\n        return dummy.next;\\n    }\\n   \\n    private int getLength(ListNode node){\\n        int len = 0;\\n        while(node != null){\\n            len++;\\n            node = node.next;\\n        }\\n        return len;\\n    }"
		},
		{
			"lc_ans_id":"92644",
			"view":"4574",
			"top":"6",
			"title":"Straightforward O(n) Java Solution Without Modifying Input Lists",
			"vote":"6",
			"content":"````\\npublic class Solution {\\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n        \\n        HashMap<Integer, Integer> hm1 = new HashMap<>(); //Store the 'index' and the value of List1\\n        HashMap<Integer, Integer> hm2 = new HashMap<>(); //Store the 'index' and the value of List2\\n        int i = 1, j = 1;\\n        \\n        while(l1 != null){\\n            hm1.put(i, l1.val);\\n            l1 = l1.next;\\n            i++;\\n        }\\n        while(l2 != null){\\n            hm2.put(j, l2.val);\\n            l2 = l2.next;\\n            j++;\\n        }\\n        \\n        int carry = 0;\\n        i--; j--;\\n        ListNode head = null;\\n        \\n      //Create new nodes to the front of a new LinkedList\\n        while(i > 0 || j > 0 || carry > 0){\\n\\n            int a = i > 0 ? hm1.get(i) : 0;\\n            int b = j > 0 ? hm2.get(j) : 0;\\n            int res = (a + b + carry) % 10;\\n            \\n            ListNode newNode = new ListNode(res);\\n            newNode.next = head;\\n            head = newNode;\\n            \\n            carry = (a + b + carry) / 10;\\n            i--; j--;\\n        }\\n        return head;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"92711",
			"view":"610",
			"top":"7",
			"title":"9-liner C++ O(N1+N2) solution with stacks to store digits, no list modification",
			"vote":"4",
			"content":"Algorithm:\\n1. Store the digits of the given two lists in separate stacks in reverse order.\\n2. Starting from top of stacks (least significant digits), calculate digit sum of each position and traverse through two stacks simultaneously.\\n```\\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\\n        stack<int> s1, s2; // store digits in stack\\n        for (; l1; l1 = l1->next) s1.push(l1->val); \\n        for (; l2; l2 = l2->next) s2.push(l2->val);\\n        \\n        ListNode *res = new ListNode(0), *tmp = NULL;\\n        for (int sum = 0; !s1.empty()||!s2.empty(); tmp = new ListNode(sum/=10), tmp->next = res, res = tmp) {\\n            if (!s1.empty()) sum += s1.top(), s1.pop(); // get digit sum\\n            if (!s2.empty()) sum += s2.top(), s2.pop();\\n            res->val = sum%10;\\n        }\\n        return res->val? res : res->next;        \\n    }\\n```"
		},
		{
			"lc_ans_id":"92640",
			"view":"805",
			"top":"8",
			"title":"Java Solution by Reversing LinkedList beating 96%",
			"vote":"3",
			"content":"```\\npublic ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n        ListNode n1 = reverse(l1);\\n        ListNode n2 = reverse(l2);\\n        int carry = 0;\\n        ListNode temp = n1;\\n        ListNode pre = n1;\\n        while(n1!= null || n2 != null || carry != 0){\\n            int v1 = n1 == null? 0: n1.val;\\n            int v2 = n2 == null? 0: n2.val;\\n            if(n1 == null){\\n                n1 = new ListNode((v1+v2+carry) % 10);\\n                pre.next = n1;\\n            }else{\\n                n1.val = (v1+v2+carry) % 10;\\n            }\\n            carry = (v1+v2+carry)/10;\\n            pre = n1;\\n            n1 = n1 == null? null : n1.next;\\n            n2 = n2 == null? null : n2.next;\\n        }\\n        return reverse(temp);\\n    }\\n    public ListNode reverse(ListNode head){\\n        ListNode newHead = null;\\n        while(head != null){\\n            ListNode next = head.next;\\n            head.next = newHead;\\n            newHead = head;\\n            head = next;\\n        }\\n        return newHead;\\n    }\\n```"
		},
		{
			"lc_ans_id":"92682",
			"view":"1493",
			"top":"9",
			"title":"Naive Python Solution",
			"vote":"3",
			"content":"    class Solution(object):\\n        def addTwoNumbers(self, l1, l2):\\n            c1, c2 = '', ''\\n            while l1:\\n                c1 += str(l1.val)\\n                l1 = l1.next\\n            while l2:\\n                c2 += str(l2.val)\\n                l2 = l2.next\\n            num = str(int(c1) + int(c2))\\n            dummy = ListNode(0)\\n            c = dummy\\n            for i in range(len(num)):\\n                c.next = ListNode(num[i])\\n                c = c.next\\n            return dummy.next"
		}
	],
	"id":"439",
	"title":"Add Two Numbers II",
	"content":"<p>You are given two <b>non-empty</b> linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.</p>\r\n\r\n<p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nWhat if you cannot modify the input lists? In other words, reversing the lists is not allowed.\r\n</p>\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\n<b>Input:</b> (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)\r\n<b>Output:</b> 7 -> 8 -> 0 -> 7\r\n</pre>\r\n</p>",
	"frequency":"408",
	"ac_num":"41550"
}