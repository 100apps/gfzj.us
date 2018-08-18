{
	"difficulty":"2",
	"submit_num":"402037",
	"show_id":"143",
	"leetcode_id":"143",
	"answers":[
		{
			"lc_ans_id":"44992",
			"view":"24181",
			"top":"0",
			"title":"Java solution with 3 steps",
			"vote":"121",
			"content":"This question is a combination of **Reverse a linked list I & II**. It should be pretty straight forward to do it in 3 steps :)\\n\\n    public void reorderList(ListNode head) {\\n                if(head==null||head.next==null) return;\\n                \\n                //Find the middle of the list\\n                ListNode p1=head;\\n                ListNode p2=head;\\n                while(p2.next!=null&&p2.next.next!=null){ \\n                    p1=p1.next;\\n                    p2=p2.next.next;\\n                }\\n                \\n                //Reverse the half after middle  1->2->3->4->5->6 to 1->2->3->6->5->4\\n                ListNode preMiddle=p1;\\n                ListNode preCurrent=p1.next;\\n                while(preCurrent.next!=null){\\n                    ListNode current=preCurrent.next;\\n                    preCurrent.next=current.next;\\n                    current.next=preMiddle.next;\\n                    preMiddle.next=current;\\n                }\\n                \\n                //Start reorder one by one  1->2->3->6->5->4 to 1->6->2->5->3->4\\n                p1=head;\\n                p2=preMiddle.next;\\n                while(p1!=preMiddle){\\n                    preMiddle.next=p2.next;\\n                    p2.next=p1.next;\\n                    p1.next=p2;\\n                    p1=p2.next;\\n                    p2=preMiddle.next;\\n                }\\n            }"
		},
		{
			"lc_ans_id":"45003",
			"view":"13489",
			"top":"1",
			"title":"A concise O(n) time, O(1) in place solution",
			"vote":"64",
			"content":"    // O(N) time, O(1) space in total\\n    void reorderList(ListNode *head) {\\n        if (!head || !head->next) return;\\n        \\n        // find the middle node: O(n)\\n        ListNode *p1 = head, *p2 = head->next;\\n        while (p2 && p2->next) {\\n            p1 = p1->next;\\n            p2 = p2->next->next;\\n        }\\n        \\n        // cut from the middle and reverse the second half: O(n)\\n        ListNode *head2 = p1->next;\\n        p1->next = NULL;\\n        \\n        p2 = head2->next;\\n        head2->next = NULL;\\n        while (p2) {\\n            p1 = p2->next;\\n            p2->next = head2;\\n            head2 = p2;\\n            p2 = p1;\\n        }\\n        \\n        // merge two lists: O(n)\\n        for (p1 = head, p2 = head2; p1; ) {\\n            auto t = p1->next;\\n            p1 = p1->next = p2;\\n            p2 = t;\\n        }\\n        \\n        //for (p1 = head, p2 = head2; p2; ) {\\n        //    auto t = p1->next;\\n        //    p1->next = p2;\\n        //    p2 = p2->next;\\n        //    p1 = p1->next->next = t;\\n        //}\\n    }"
		},
		{
			"lc_ans_id":"44988",
			"view":"6777",
			"top":"2",
			"title":"A python solution O(n) time, O(1) space",
			"vote":"32",
			"content":"\\n\\n    # Splits in place a list in two halves, the first half is >= in size than the second.\\n    # @return A tuple containing the heads of the two halves\\n    def _splitList(head):\\n        fast = head\\n        slow = head\\n        while fast and fast.next:\\n            slow = slow.next\\n            fast = fast.next\\n            fast = fast.next\\n    \\n        middle = slow.next\\n        slow.next = None\\n    \\n        return head, middle\\n    \\n    # Reverses in place a list.\\n    # @return Returns the head of the new reversed list\\n    def _reverseList(head):\\n    \\n      last = None\\n      currentNode = head\\n    \\n      while currentNode:\\n        nextNode = currentNode.next\\n        currentNode.next = last\\n        last = currentNode\\n        currentNode = nextNode\\n    \\n      return last\\n    \\n    # Merges in place two lists\\n    # @return The newly merged list.\\n    def _mergeLists(a, b):\\n    \\n        tail = a\\n        head = a\\n    \\n        a = a.next\\n        while b:\\n            tail.next = b\\n            tail = tail.next\\n            b = b.next\\n            if a:\\n                a, b = b, a\\n                \\n        return head\\n    \\n    \\n    class Solution:\\n    \\n        # @param head, a ListNode\\n        # @return nothing\\n        def reorderList(self, head):\\n    \\n            if not head or not head.next:\\n                return\\n    \\n            a, b = _splitList(head)\\n            b = _reverseList(b)\\n            head = _mergeLists(a, b)"
		},
		{
			"lc_ans_id":"45147",
			"view":"5165",
			"top":"3",
			"title":"Java solution with 3 steps",
			"vote":"30",
			"content":"      public class Solution {\\n        \\n        public void reorderList(ListNode head) {\\n          if (head == null || head.next == null)\\n              return;\\n          \\n          // step 1. cut the list to two halves\\n          // prev will be the tail of 1st half\\n          // slow will be the head of 2nd half\\n          ListNode prev = null, slow = head, fast = head, l1 = head;\\n          \\n          while (fast != null && fast.next != null) {\\n            prev = slow;\\n            slow = slow.next;\\n            fast = fast.next.next;\\n          }\\n          \\n          prev.next = null;\\n          \\n          // step 2. reverse the 2nd half\\n          ListNode l2 = reverse(slow);\\n          \\n          // step 3. merge the two halves\\n          merge(l1, l2);\\n        }\\n        \\n        ListNode reverse(ListNode head) {\\n          ListNode prev = null, curr = head, next = null;\\n          \\n          while (curr != null) {\\n            next = curr.next;\\n            curr.next = prev;\\n            prev = curr;\\n            curr = next;\\n          }\\n          \\n          return prev;\\n        }\\n        \\n        void merge(ListNode l1, ListNode l2) {\\n          while (l1 != null) {\\n            ListNode n1 = l1.next, n2 = l2.next;\\n            l1.next = l2;\\n            \\n            if (n1 == null)\\n              break;\\n                \\n            l2.next = n1;\\n            l1 = n1;\\n            l2 = n2;\\n          }\\n        }\\n    \\n      }"
		},
		{
			"lc_ans_id":"44997",
			"view":"5713",
			"top":"4",
			"title":"My O(n) C++ Method, accepted",
			"vote":"13",
			"content":"Firstly, I split the list from the middle into two lists. One from head to middle, and the other from middle to the end. Then we reverse the second list. Finally we merge these two lists. O(n) time complexity and O(1) space complexity. \\n\\n    /**\\n     * Definition for singly-linked list.\\n     * struct ListNode {\\n     *     int val;\\n     *     ListNode *next;\\n     *     ListNode(int x) : val(x), next(NULL) {}\\n     * };\\n     */\\n    class Solution {\\n    public:\\n        void reorderList(ListNode *head) {\\n            if(head == NULL || head->next == NULL || head->next->next==NULL)\\n                return;\\n            //find the middle of the list, and split into two lists.    \\n            ListNode *p=head,*q=head;\\n            while(p && q && q->next && q->next->next){\\n                p=p->next;\\n                q=q->next->next;\\n            }\\n            \\n            ListNode *mid = p->next;\\n            p->next=NULL;\\n            p=head;\\n            //reverse from the middle to the end\\n            ListNode *q1=mid, *q2,*q3;\\n            if(mid->next){\\n                q1=mid;\\n                q2=mid->next;\\n                while(q2){\\n                    q3=q2->next;\\n                    q2->next=q1;\\n                    q1=q2;\\n                    q2=q3;\\n                    \\n                }\\n                mid->next=NULL;\\n            }\\n            q=q1;\\n            //merge these two list\\n            ListNode *s=p;\\n            p=p->next;\\n            while(p && q){\\n               s->next=q;\\n               s=s->next;\\n               q=q->next;\\n               \\n               s->next=p;\\n               s=s->next;\\n               p=p->next;\\n            }\\n            if(p){\\n                s->next=p;\\n            }\\n            if(q){\\n                s->next=q;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"45113",
			"view":"1176",
			"top":"5",
			"title":"Share a consise recursive solution in C++",
			"vote":"10",
			"content":"\\n The recursive idea have been posted by yucheng.wang. Given a example, 1->2->3->4->5, the solution will reorder node(3),  then reorder 2 and 4 to have (2->4->3), then 1 and 5 get have 1->5->2->4->3. Each call of reorderList(ListNode* head, int len) will return the last element after this reorderList() call.\\n\\n   int getLength(ListNode *head){\\n        int len = 0;\\n        while( head != NULL ){\\n            ++len;  head = head->next;\\n        }\\n        return len;\\n    }\\n    \\n    ListNode * reorderList(ListNode *head, int len){\\n        if(len == 0)\\n            return NULL;\\n        if( len == 1 )\\n            return head;\\n        if( len == 2 )\\n            return head->next;\\n        ListNode * tail = reorderList(head->next, len-2);\\n        ListNode * tmp = tail->next;\\n        tail->next = tail->next->next;\\n        tmp->next = head->next;\\n        head->next = tmp;\\n        return tail;\\n    }\\n    \\n    void reorderList(ListNode *head) {  //recursive\\n        ListNode  * tail = NULL;\\n        tail = reorderList(head, getLength(head));\\n    }"
		},
		{
			"lc_ans_id":"45182",
			"view":"1831",
			"top":"6",
			"title":"My java solution in O(n) time",
			"vote":"8",
			"content":"    //1. find the middle node\\n    //2. reverse the right side of the list\\n    //3. merger the left side list and right side list\\n    \\n        \\n        public class Solution {\\n            public void reorderList(ListNode head) {\\n                if(head==null) return;\\n                ListNode slow = head, fast = head;\\n                while(fast!=null && fast.next!=null){\\n                    slow = slow.next;\\n                    fast = fast.next.next;\\n                }\\n                ListNode mid = slow, cur = slow.next;\\n                if(cur!=null){\\n                    ListNode tmp = cur.next;\\n                    cur.next = null;\\n                    cur = tmp;\\n                }\\n                while(cur!=null){\\n                    ListNode tmp = cur.next;\\n                    cur.next = mid.next;\\n                    mid.next = cur;\\n                    cur = tmp;\\n                }\\n                ListNode left = head, right = mid.next;\\n                while(right!=null){\\n                    mid.next = right.next;\\n                    right.next = left.next;\\n                    left.next = right;\\n                    left = right.next;\\n                    right = mid.next;\\n                }\\n                \\n            }\\n        }"
		},
		{
			"lc_ans_id":"45041",
			"view":"3823",
			"top":"7",
			"title":"Use Recursion is simpler and quicker",
			"vote":"8",
			"content":"This problem could be solved by recursion, we first dig down to the middle node of the list, and recurse back from that point, the time complexity is O(N), and faster than existing algorithm.\\n1 -> 2 ->3 ->4, first dig down to 3, then recurse back, concatenate 2->3 (which already together), then 1->4(we return next node of each node starting from middle one)\\n     \\n    public void reorderList(ListNode head){\\n\\t\\t      if(head == null || head.next == null) return;\\n\\t\\t      ListNode h = reorderList(head, head,head);\\n\\t     }\\n\\t\\n\\tpublic ListNode reorderList(ListNode prev, ListNode slow, ListNode faster){\\n\\t\\tif(faster == null || faster.next == null) {\\n\\t\\t\\tif(faster != null) {\\n                ListNode reverse = slow.next;\\n                slow.next = null;\\n\\t\\t\\t    return reverse;\\n\\t\\t\\t}\\n\\t\\t\\tprev.next = null;\\n\\t\\t\\treturn slow;\\n\\t\\t}\\n\\t\\tListNode retNode = reorderList(slow, slow.next, faster.next.next);\\n\\t\\t// concanate\\n\\t\\tListNode temp = retNode.next;\\n\\t\\tretNode.next = slow.next;\\n\\t\\tslow.next = retNode;\\n\\t\\treturn temp;\\n\\t}"
		},
		{
			"lc_ans_id":"45228",
			"view":"13887",
			"top":"8",
			"title":"Does this problem have a solution with O(N) time complexity and O(1) space comlexity?",
			"vote":"8",
			"content":"I solved it by using O(N) space in O(N) time."
		},
		{
			"lc_ans_id":"45168",
			"view":"803",
			"top":"9",
			"title":"Can someone help me with this testcase",
			"vote":"7",
			"content":"Input:\\t[]\\nOutput:\\t[]\\nExpected:\\t{}"
		}
	],
	"id":"143",
	"title":"Reorder List",
	"content":"<p>\nGiven a singly linked list <i>L</i>: <i>L</i><sub>0</sub>&rarr;<i>L</i><sub>1</sub>&rarr;…&rarr;<i>L</i><sub><i>n</i>-1</sub>&rarr;<i>L</i><sub>n</sub>,<br>\nreorder it to: <i>L</i><sub>0</sub>&rarr;<i>L</i><sub><i>n</i></sub>&rarr;<i>L</i><sub>1</sub>&rarr;<i>L</i><sub><i>n</i>-1</sub>&rarr;<i>L</i><sub>2</sub>&rarr;<i>L</i><sub><i>n</i>-2</sub>&rarr;…\n</p>\n\n<p>You must do this in-place without altering the nodes' values.</p>\n\n<p>\nFor example,<br>\nGiven <code>{1,2,3,4}</code>, reorder it to <code>{1,4,2,3}</code>.\n</p>",
	"frequency":"448",
	"ac_num":"106339"
}