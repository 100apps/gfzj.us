{
	"difficulty":"2",
	"submit_num":"349252",
	"show_id":"86",
	"leetcode_id":"86",
	"answers":[
		{
			"lc_ans_id":"29185",
			"view":"23248",
			"top":"0",
			"title":"Very concise one pass solution",
			"vote":"179",
			"content":"    ListNode *partition(ListNode *head, int x) {\\n        ListNode node1(0), node2(0);\\n        ListNode *p1 = &node1, *p2 = &node2;\\n        while (head) {\\n            if (head->val < x)\\n                p1 = p1->next = head;\\n            else\\n                p2 = p2->next = head;\\n            head = head->next;\\n        }\\n        p2->next = NULL;\\n        p1->next = node2.next;\\n        return node1.next;\\n    }"
		},
		{
			"lc_ans_id":"29183",
			"view":"12921",
			"top":"1",
			"title":"Concise java code with explanation, one pass",
			"vote":"89",
			"content":"the basic idea is to maintain two queues, the first one stores all nodes with val less than x , and the second queue stores all the rest nodes. Then concat these two queues. Remember to set the tail of second queue a null next, or u will get TLE.\\n\\n    public ListNode partition(ListNode head, int x) {\\n        ListNode dummy1 = new ListNode(0), dummy2 = new ListNode(0);  //dummy heads of the 1st and 2nd queues\\n        ListNode curr1 = dummy1, curr2 = dummy2;      //current tails of the two queues;\\n        while (head!=null){\\n            if (head.val<x) {\\n                curr1.next = head;\\n                curr1 = head;\\n            }else {\\n                curr2.next = head;\\n                curr2 = head;\\n            }\\n            head = head.next;\\n        }\\n        curr2.next = null;          //important! avoid cycle in linked list. otherwise u will get TLE.\\n        curr1.next = dummy2.next;\\n        return dummy1.next;\\n    }"
		},
		{
			"lc_ans_id":"29181",
			"view":"5367",
			"top":"2",
			"title":"10 lines concise C++ Solution",
			"vote":"22",
			"content":"    class Solution {\\n    public:\\n        ListNode* partition(ListNode* head, int x) {\\n            ListNode left(0), right(0);\\n            ListNode *l = &left, *r = &right;\\n\\n            while(head){\\n                ListNode* & ref = head->val < x ? l : r;\\n                ref->next = head;\\n                ref = ref->next;\\n                \\n                head = head->next;\\n            }\\n            l->next = right.next;\\n            r->next = NULL;\\n            return left.next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29174",
			"view":"3202",
			"top":"3",
			"title":"Python concise solution with dummy nodes.",
			"vote":"20",
			"content":"        \\n    def partition(self, head, x):\\n        h1 = l1 = ListNode(0)\\n        h2 = l2 = ListNode(0)\\n        while head:\\n            if head.val < x:\\n                l1.next = head\\n                l1 = l1.next\\n            else:\\n                l2.next = head\\n                l2 = l2.next\\n            head = head.next\\n        l2.next = None\\n        l1.next = h2.next\\n        return h1.next"
		},
		{
			"lc_ans_id":"29335",
			"view":"4436",
			"top":"4",
			"title":"My accepted solution. Any improvement?",
			"vote":"11",
			"content":"This is my accepted solution:\\n\\n    public class Solution {\\n        public ListNode partition(ListNode head, int x) {\\n            ListNode cur=head;\\n            \\n            ListNode smaller_sentinel=new ListNode(0);\\n            ListNode smaller_cur=smaller_sentinel;\\n            ListNode larger_sentinel=new ListNode(0);\\n            ListNode larger_cur=larger_sentinel;\\n    //Now, go along the list, partitioning into two halves.        \\n            while(cur!=null){\\n                if(cur.val<x){\\n                        smaller_cur.next=cur;\\n                        smaller_cur=smaller_cur.next;\\n                    \\n                }else{\\n                        larger_cur.next=cur;\\n                        larger_cur=larger_cur.next;\\n                }\\n                cur=cur.next;\\n            }\\n    //Now, do the concatenation of two havles. Make sure the last node points to null \\n            larger_cur.next=null;\\n            smaller_cur.next=larger_sentinel.next;\\n            return smaller_sentinel.next;\\n        }\\n    }\\n\\nIt's pretty straightforward. I used multiple references (including sentinels), first to get the two halves, and then link them together. It took 400+ ms to pass the tests (in Java). I guess it's not the optimal solution. Any idea improving it?"
		},
		{
			"lc_ans_id":"29366",
			"view":"1152",
			"top":"5",
			"title":"Concise and simple C++ solution.",
			"vote":"8",
			"content":"    ListNode *partition(ListNode *head, int x) {\\n            \\n            ListNode *head1 = new ListNode(0);\\n            ListNode *head2 = new ListNode(0);\\n            ListNode *h1 = head1;\\n            ListNode *h2 = head2;\\n            while(head)\\n            {\\n                int v = head->val;\\n                if(v < x)\\n                {\\n                    head1->next = head;\\n                    head1 = head1->next;\\n                } else {\\n                    head2->next = head;\\n                    head2 = head2->next;\\n                }\\n                head = head->next;\\n            }\\n            head2->next = NULL;\\n            head1->next = h2->next;;\\n            return h1->next;\\n        }"
		},
		{
			"lc_ans_id":"29349",
			"view":"693",
			"top":"6",
			"title":"Share my 3 ms C solution, it's very clean and easy to understand",
			"vote":"6",
			"content":"more codes see:  [https://github.com/lightmen/leetcode.git][1]\\n\\nstruct ListNode* partition(struct ListNode* head, int x) {\\n\\n    struct ListNode left,right;\\n    struct ListNode *left_cursor,*right_cursor;\\n\\n    left_cursor = &left;\\n    right_cursor = &right;\\n\\n    while(head){\\n        if(head->val < x){\\n            left_cursor->next = head;\\n            left_cursor = left_cursor->next;\\n        }else{\\n            right_cursor->next = head;\\n            right_cursor = right_cursor->next;\\n        }\\n        head = head->next;\\n    }\\n    \\n    right_cursor->next = NULL;\\n    left_cursor->next = right.next;\\n    \\n    return left.next;\\n}\\n\\n\\n  [1]: https://github.com/lightmen/leetcode.git"
		},
		{
			"lc_ans_id":"29375",
			"view":"1693",
			"top":"7",
			"title":"My O(n)/O(1) Solution",
			"vote":"6",
			"content":"I use tail to keep track of the end point where the nodes before it are smaller than x.\\n\\n----------\\n\\n    public ListNode partition(ListNode head, int x) {\\n        ListNode dummy=new ListNode(0);\\n        dummy.next=head;\\n        ListNode p=dummy;\\n        ListNode tail=dummy;\\n        while(p!=null && p.next!=null){\\n            if(p.next.val>=x)\\n                p=p.next;\\n            else{\\n                if(p==tail){  // don't forget the edge cases when p==tail\\n                    tail=tail.next;\\n                    p=p.next;\\n                }\\n                else{\\n                    ListNode tmp=p.next;\\n                    p.next=tmp.next;\\n                    tmp.next=tail.next;\\n                    tail.next=tmp;\\n                    tail=tmp; // don't forget to move tail.\\n                }\\n            }\\n        }\\n        return dummy.next;\\n    }"
		},
		{
			"lc_ans_id":"29263",
			"view":"559",
			"top":"8",
			"title":"8ms c++, easy to understand",
			"vote":"5",
			"content":"    class Solution {\\n    public:\\n        ListNode* partition(ListNode* head, int x) {\\n            ListNode *l1 = new ListNode(0),*l2 = new ListNode(0); /*create two list for two partitions*/\\n            ListNode *p1=l1,*p2=l2,*p=head;\\n            while(p!=NULL){\\n                if((p->val)<x) p1 = p1->next = p;\\n                else p2 = p2->next = p;\\n                p = p->next;\\n            }\\n            p2->next = NULL;\\n            p1->next = l2->next;\\n            return l1->next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29272",
			"view":"1585",
			"top":"9",
			"title":"My ac java code",
			"vote":"5",
			"content":"public ListNode partition(ListNode head, int x) {\\n\\t\\t\\n\\t\\tListNode firstHead = new ListNode(0);\\n\\t\\tfirstHead.next = head;\\n\\t\\tListNode secondHead = new ListNode(x);\\n\\t\\n\\t\\t\\n\\t\\tListNode first = firstHead;\\n\\t\\tListNode second = secondHead;\\n\\t\\tListNode curNode = head;\\n\\t\\twhile(curNode!=null){\\n\\t\\t\\tListNode tmp = curNode.next;\\n\\t\\t\\tif(curNode.val<x){\\n\\t\\t\\t\\t\\n\\t\\t\\t\\tfirst.next = curNode;\\n\\t\\t\\t\\tfirst = curNode; \\n\\t\\t\\t}else{\\n\\t\\t\\t\\tsecond.next = curNode;\\n\\t\\t\\t\\tsecond = curNode;\\n\\t\\t\\t\\tsecond.next = null;// important\\n\\t\\t\\t}\\n\\t\\t\\tcurNode = tmp;\\n\\t\\t}\\n\\t\\tfirst.next = secondHead.next;\\n\\t\\treturn firstHead.next;\\n\\t}"
		}
	],
	"id":"86",
	"title":"Partition List",
	"content":"<p>Given a linked list and a value <i>x</i>, partition it such that all nodes less than <i>x</i> come before nodes greater than or equal to <i>x</i>.\r\n</p>\r\n<p>\r\nYou should preserve the original relative order of the nodes in each of the two partitions.\r\n</p>\r\n<p>\r\nFor example,<br />\r\nGiven <code>1->4->3->2->5->2</code> and <i>x</i> = 3,<br />\r\nreturn <code>1->2->2->4->3->5</code>.\r\n</p>",
	"frequency":"353",
	"ac_num":"116172"
}