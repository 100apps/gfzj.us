{
	"difficulty":"2",
	"submit_num":"525557",
	"show_id":"61",
	"leetcode_id":"61",
	"answers":[
		{
			"lc_ans_id":"22735",
			"view":"17620",
			"top":"0",
			"title":"My clean C++ code, quite standard (find tail and reconnect the list)",
			"vote":"106",
			"content":"There is no trick for this problem. Some people used slow/fast pointers to find the tail node but I don't see the benefit (in the sense that it doesn't reduce the pointer move op) to do so. So I just used one loop to find the length first.\\n\\n    class Solution {\\n    public:\\n        ListNode* rotateRight(ListNode* head, int k) {\\n            if(!head) return head;\\n            \\n            int len=1; // number of nodes\\n            ListNode *newH, *tail;\\n            newH=tail=head;\\n            \\n            while(tail->next)  // get the number of nodes in the list\\n            {\\n                tail = tail->next;\\n                len++;\\n            }\\n            tail->next = head; // circle the link\\n\\n            if(k %= len) \\n            {\\n                for(auto i=0; i<len-k; i++) tail = tail->next; // the tail node is the (len-k)-th node (1st node is head)\\n            }\\n            newH = tail->next; \\n            tail->next = NULL;\\n            return newH;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"22715",
			"view":"18692",
			"top":"1",
			"title":"Share my java solution with explanation",
			"vote":"71",
			"content":"Since n may be  a large number compared to the length of list. So we need to know the length of linked list.After that, move the list after the (l-n%l )th node to the front to finish the rotation.\\n\\nEx: {1,2,3} k=2 Move the list after the 1st node to the front\\n\\n\\nEx: {1,2,3} k=5, In this case Move the list after (3-5%3=1)st node to the front.\\n\\nSo  the code has three parts. \\n\\n1) Get the length\\n\\n2) Move to the (l-n%l)th node\\n\\n3)Do the rotation\\n\\n\\n\\n    public ListNode rotateRight(ListNode head, int n) {\\n        if (head==null||head.next==null) return head;\\n        ListNode dummy=new ListNode(0);\\n        dummy.next=head;\\n        ListNode fast=dummy,slow=dummy;\\n\\n        int i;\\n        for (i=0;fast.next!=null;i++)//Get the total length \\n        \\tfast=fast.next;\\n        \\n        for (int j=i-n%i;j>0;j--) //Get the i-n%i th node\\n        \\tslow=slow.next;\\n        \\n        fast.next=dummy.next; //Do the rotation\\n        dummy.next=slow.next;\\n        slow.next=null;\\n        \\n        return dummy.next;\\n    }"
		},
		{
			"lc_ans_id":"22751",
			"view":"4568",
			"top":"2",
			"title":"Clean Java Solution with Brief Explanation",
			"vote":"26",
			"content":"The basic idea is to link the tail of the list with the head, make it a cycle. Then count to the rotate point and cut it.\\n\\n    if (head == null)\\n\\t\\t\\treturn head;\\n\\t\\t\\n\\t\\tListNode copyHead = head;\\n\\t\\t\\n\\t\\tint len = 1;\\n\\t\\twhile (copyHead.next != null) {\\n\\t\\t\\tcopyHead = copyHead.next;\\n\\t\\t\\tlen++;\\n\\t\\t}\\n\\t\\t\\n\\t\\tcopyHead.next = head;\\n\\t\\t\\n\\t\\tfor (int i = len - k % len; i > 1; i--)\\n\\t\\t\\thead = head.next;\\n\\n\\t\\tcopyHead = head.next;\\n\\t\\thead.next = null;\\n\\n\\t\\treturn copyHead;\\n\\t}"
		},
		{
			"lc_ans_id":"22726",
			"view":"8717",
			"top":"3",
			"title":"Anyone solve the problem without counting the length of List?",
			"vote":"26",
			"content":"My solution has O(n) time complexity and O(1) memory.\\nThe basic idea is to connect the list into a circle. First, count the length of list while going through the list to find the end of it. Connect the tail to head. The problem asked to rotate k nodes, however, now the tail is at the end of the list and its difficult to move backward, so move *(k - len)* nodes along the list instead. *\"k = k % len\"* saves the unnecessary moves because rotate a list with length = *len* by *len* times doesn't change the list at all.\\n\\n    ListNode *rotateRight(ListNode *head, int k) {\\n            if (head == NULL || head->next == NULL || k == 0) return head;\\n            int len = 1;\\n            ListNode *tail = head;\\n\\n            /* find the end of list */\\n            while (tail->next != NULL) {\\n                tail = tail->next;\\n                len++;\\n            }\\n\\n            /* form a circle */\\n            tail->next = head;\\n            k = k % len;\\n            for (int i = 0; i < len - k; i++) {\\n                tail = tail->next;\\n            }\\n            head = tail->next;\\n            tail->next = NULL;\\n            return head;\\n        }"
		},
		{
			"lc_ans_id":"22719",
			"view":"8271",
			"top":"4",
			"title":"What to do when k is greater than size of list ?",
			"vote":"26",
			"content":"i am not getting that what i should do when K is greater than size of the list."
		},
		{
			"lc_ans_id":"22917",
			"view":"922",
			"top":"5",
			"title":"I think the description of this problem is misleading.",
			"vote":"23",
			"content":"Recalling the problems about rotated array, this description is misleading. For those who have trouble understanding this problem like me, think of the SLL as a circle."
		},
		{
			"lc_ans_id":"22905",
			"view":"1584",
			"top":"6",
			"title":"My short java solution with comments",
			"vote":"14",
			"content":"\\n    public ListNode rotateRight(ListNode head, int k) {\\n        if(head==null||head.next==null||k==0) return head;\\n        \\n        //make it a cricle, break from k postion far from the head\\n        ListNode index=head; int len=1;// int len to record the length of list\\n        while(index.next!=null)\\n        {index=index.next; len++;}\\n        index.next=head;\\n        \\n        for(int i=0;i<len-k%len;i++)\\n        {\\n           index=index.next;\\n        }\\n        ListNode result=index.next;\\n        index.next=null;\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"22827",
			"view":"1255",
			"top":"7",
			"title":"Java clean solution, only one pointer used",
			"vote":"13",
			"content":"I first used a ListNode p, and point it to the head, then move it to the end of the list, and at the same time get the length of the list.  Then `p.next = head;` gives me a circle.   At this time, by moving `p` for `len-k` times, it will be pointing to the node before the break point.  Then all we need to do is record the next node as head, and break the circle with `p.next = null.`  \\n\\n    public ListNode rotateRight(ListNode head, int k) {\\n        if(head == null || k == 0) {\\n            return head;\\n        }\\n        ListNode p = head;\\n        int len = 1;\\n        while(p.next != null) {\\n            p = p.next;\\n            len++;\\n        }\\n        p.next = head;\\n        k %= len;\\n        for(int i = 0; i < len - k; i++) {\\n            p = p.next;\\n        }\\n        head = p.next;\\n        p.next = null;\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"22908",
			"view":"1720",
			"top":"8",
			"title":"C++ simple algorithm with explanation",
			"vote":"11",
			"content":" 1. Enumerate through the list to find the last node, count the size along the way.\\n 2. Make a loop, by connection last to first\\n 3. Get modulo of |k/size| - avoiding extra rotation\\n 4. Enumerate again *size-k* nodes\\n 5. Break the loop and return new head\\n\\ncode:\\n\\n     ListNode *rotateRight(ListNode *head, int k) \\n         {\\n            if(head == NULL || head->next == NULL||k==0) return head;\\n            \\n            ListNode* node = head;\\n            int size =1;\\n            \\n            while(node->next != NULL)\\n            {\\n                size++;\\n                node = node->next;\\n            }\\n            \\n            //loop the list\\n            node->next=head;\\n            \\n            //handle the case of k>size\\n            k = k%size;\\n            \\n            //find the node to break the loop at\\n            while(--size >= k)\\n            {\\n                node=node->next;\\n            }\\n            \\n            ListNode* first = node->next;\\n            node->next=NULL;\\n            \\n            return first;\\n        }"
		},
		{
			"lc_ans_id":"22842",
			"view":"1734",
			"top":"9",
			"title":"97.63% Python Solution",
			"vote":"10",
			"content":"    class Solution(object):\\n    def rotateRight(self, head, k):\\n        \"\"\"\\n        :type head: ListNode\\n        :type k: int\\n        :rtype: ListNode\\n        \"\"\"\\n        if not head:\\n            return None\\n        \\n        if head.next == None:\\n            return head\\n            \\n        pointer = head\\n        length = 1\\n        \\n        while pointer.next:\\n            pointer = pointer.next\\n            length += 1\\n        \\n        rotateTimes = k%length\\n        \\n        if k == 0 or rotateTimes == 0:\\n            return head\\n        \\n        fastPointer = head\\n        slowPointer = head\\n        \\n        for a in range (rotateTimes):\\n            fastPointer = fastPointer.next\\n        \\n        \\n        while fastPointer.next:\\n            slowPointer = slowPointer.next\\n            fastPointer = fastPointer.next\\n        \\n        temp = slowPointer.next\\n        \\n        slowPointer.next = None\\n        fastPointer.next = head\\n        head = temp\\n        \\n        return head"
		}
	],
	"id":"61",
	"title":"Rotate List",
	"content":"<p>Given a list, rotate the list to the right by <i>k</i> places, where <i>k</i> is non-negative.</p>\r\n\r\n<br />\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nGiven <b>1->2->3->4->5->NULL</b> and <i>k</i> = <b>2</b>,\r\n\r\nreturn <b>4->5->1->2->3->NULL</b>.\r\n</pre>\r\n</p>",
	"frequency":"345",
	"ac_num":"128389"
}