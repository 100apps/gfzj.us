{
	"difficulty":"2",
	"submit_num":"204909",
	"show_id":"223",
	"leetcode_id":"223",
	"answers":[
		{
			"lc_ans_id":"62142",
			"view":"20682",
			"top":"0",
			"title":"If you want to laugh, look at my solution",
			"vote":"235",
			"content":"    This is utterly ridiculous. As I was writing this I knew I was going about it wrong but I wanted to finish it before I thought of a different method or looked at any other solutions.\\n    \\n      int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {\\n    \\tint area1 = (D - B)*(C - A);\\n    \\tint area2 = (H - F)*(G - E);\\n    \\tint area3;\\n    \\tif (area1 == 0) {\\n    \\t\\treturn area2;\\n    \\t}\\n    \\tif (area2 == 0) {\\n    \\t\\treturn area1;\\n    \\t}\\n    \\tif ((A == D) && (B == F) && (C == G) && (D == H)) {\\n    \\t\\treturn area1;\\n    \\t}\\n    \\tif ((E >= C) | (G <= A) | (H <= B) | (D <= F)) {    //not overlapping\\n    \\t\\treturn (area1 + area2);\\n    \\t}\\n    \\tif (((G - E) <= (C - A)) && ((H - F) <= (D - B)) && (E >= A) && (F >= B) && (G <= C) && (D >= H)) {                        //rect2 is inside rect1\\n    \\t\\treturn area1;\\n    \\t}\\n    \\tif (((C - A) <= (G - E)) && ((D - B) <= (H - F)) && (E <= A) && (B >= F) && (G >= C) && (H >= D)) {                        //rect1 is inside rect2\\n    \\t\\treturn area2;\\n    \\t}\\n    \\tif ((F >= B) && (E >= A) && (G >= C) && (H >= D)) {                       //overlapping upper right corner\\n    \\t\\tarea3 = (C - E)*(D - F);\\n    \\t}\\n    \\telse if ((F >= B) && (E <= A) && (G <= C) && (H >= D)) {                       //overlapping upper left corner\\n    \\t\\tarea3 = (G - A)*(D - F);\\n    \\t}\\n    \\telse if ((F <= B) && (E <= A) && (G <= C) && (H <= D)) {                       //overlapping bottom left corner\\n    \\t\\tarea3 = (G - A)*(H - B);\\n    \\t}\\n    \\telse if ((F <= B) && (E >= A) && (G >= C) && (H <= D)) {                        //overlapping bottom right corner\\n    \\t\\tarea3 = (H - B)*(C - E);\\n    \\t}\\n    \\telse if (((C - A) <= (G - E)) && (H <= D) && (G >= C) && (E <= A) && (F <= B)) {               //overlapping bottom side\\n    \\t\\tarea3 = (C - A)*(H - B);\\n    \\t}\\n    \\telse if (((C - A) <= (G - E)) && (H >= D) && (G >= C) && (E <= A) && (F >= B)) {               //overlapping top side\\n    \\t\\tarea3 = (C - A)*(D - F);\\n    \\t}\\n    \\telse if (((D - B) <= (H - F)) && (E <= A) && (F <= B) && (H >= D) && (G <= C)) {               //overlapping left side\\n    \\t\\tarea3 = (G - A)*(D - B);\\n    \\t}\\n    \\telse if (((D - B) <= (H - F)) && (E >= A) && (F <= B) && (H >= D) && (G >= C)) {               //overlapping right side\\n    \\t\\tarea3 = (C - E)*(D - B);\\n    \\t}\\n    \\telse if (((C - A) >= (G - E)) && (E >= A) && (F >= B) && (C >= G) && (D <= H)) {      //overlapping part of top side\\n    \\t\\tarea3 = (G - E)*(D - F);\\n    \\t}\\n    \\telse if (((C - A) >= (G - E)) && (A <= E) && (B >= F) && (G <= C) && (D >= H)) {       //overlapping part of bottom side\\n    \\t\\tarea3 = (G - E)*(H - B);\\n    \\t}\\n    \\telse if (((D - B) >= (H - F)) && (E <= A) && (F >= B) && (G <= C) && (H <= D)) {      //overlapping part of left side\\n    \\t\\tarea3 = (G - A)*(H - F);\\n    \\t}\\n    \\telse if (((D - B) >= (H - F)) && (E >= A) && (F >= B) && (G >= C) && (H <= D)) {       //overlapping part of right side\\n    \\t\\tarea3 = (C - E)*(H - F);\\n    \\t}\\n    \\telse if (((G - E) <= (C - A)) && (E >= A) && (F <= B) && (G <= C) && (H >= D)) {     //overlapping top and bottom\\n    \\t\\tarea3 = (G - E)*(D - B);\\n    \\t}\\n    \\telse if (((H - F) <= (D - B)) && (E <= A) && (F >= B) && (C <= G) && (D >= H)) {     //overlapping left and right\\n    \\t\\tarea3 = (C - A)*(H - F);\\n    \\t}\\n    \\n    \\treturn (area1 + area2 - area3);\\n    }"
		},
		{
			"lc_ans_id":"62149",
			"view":"20130",
			"top":"1",
			"title":"Just another short way",
			"vote":"211",
			"content":"Instead of checking whether the rectangles overlap, I max `right` with `left` (and `top` with `bottom`). Haven't seen that in other solutions.\\n\\n    int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {\\n        int left = max(A,E), right = max(min(C,G), left);\\n        int bottom = max(B,F), top = max(min(D,H), bottom);\\n        return (C-A)*(D-B) - (right-left)*(top-bottom) + (G-E)*(H-F);\\n    }"
		},
		{
			"lc_ans_id":"62138",
			"view":"16247",
			"top":"2",
			"title":"My Java solution [Sum of areas - Overlapped area]",
			"vote":"140",
			"content":"    public int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {\\n            \\n            int areaOfSqrA = (C-A) * (D-B);\\n             int areaOfSqrB = (G-E) * (H-F);\\n            \\n            int left = Math.max(A, E);\\n            int right = Math.min(G, C);\\n            int bottom = Math.max(F, B);\\n            int top = Math.min(D, H);\\n            \\n            //If overlap\\n            int overlap = 0;\\n            if(right > left && top > bottom)\\n                 overlap = (right - left) * (top - bottom);\\n            \\n            return areaOfSqrA + areaOfSqrB - overlap;\\n        }\\n\\nHello! So, the code should be fairly straightforward. I first calculate the area of each rectangle and then calculate the overlapping area between the two rectangles (if there is one!). At the end, we sum up the individual areas and subtract the overlapping area/0 ! \\n\\nFeel free to ask should you have any queries for me OR if my solution can be improved upon! :)"
		},
		{
			"lc_ans_id":"62139",
			"view":"2565",
			"top":"3",
			"title":"Python concise solution.",
			"vote":"38",
			"content":"        \\n    def computeArea(self, A, B, C, D, E, F, G, H):\\n        overlap = max(min(C,G)-max(A,E), 0)*max(min(D,H)-max(B,F), 0)\\n        return (A-C)*(B-D) + (E-G)*(F-H) - overlap"
		},
		{
			"lc_ans_id":"62135",
			"view":"4280",
			"top":"4",
			"title":"Errors in Test Data",
			"vote":"32",
			"content":"In the statement, it says\\n*\"Each rectangle is defined by its bottom left corner and top right corner\"*\\n\\nHowever, there are test cases like \\n\\nInput:\\t-2, -2, 2, 2, -3, 3, -4, 4\\n\\nWhich is wrong, because there are no rectangles with bottom left corner (-3, 3) and top right corner (-4, 4)."
		},
		{
			"lc_ans_id":"62257",
			"view":"2050",
			"top":"5",
			"title":"An explanation in plain language",
			"vote":"29",
			"content":"We should consider the following two problems:\\n\\n 1. How to know whether the two rectangle areas are not overlapped.\\n 2. If the two rectangle areas are overlapped, how to calculate the overlapped area.\\n\\nFor me, both situations are not intuitive to see. I tried the intuitive solution, but I gave up as it needs too many lines of code. Here I write down a smarter way in plain language which is actually from other user's codes to solve the problem.\\n\\n1, To know whether the two areas are not overlapped: \\n\\n - We actually only need to consider four situations: B>=H or E>=C or F>=D or A>=G. For example, if B is larger than H, the area (A,B,C,D) is definitely not overlapped with area (E,F,G,H), and we even know that area (A,B,C,D) is on the upper area of the plot compared with area (E,F,G,H). You can also check if other situations work.\\n\\n2, To calculate the overlapped area:\\n\\n - When the two areas are overlapped, we only need to know the bottom left corner and top right corner of the overlapped area: the larger one of A and E, the larger one of B and F, the smaller one of C and G, and the smaller one of D and H. For example, in the case of the given figure of the original problem, we just consider the point (E,B) and the point (C,H), and the overlapped area is (E,B,C,H) which could be calculated intuitively. So how about other kinds of overlapping? The formula given above never change! You can try imagining other kind of  overlapped area, you will see that in any case we only need to know max(A,E), max(B,F), min(C,G), and min(D,H) to calculate the overlapped area.\\n\\nI don't consider this problem as an easy one, if you try to solve it intuitively."
		},
		{
			"lc_ans_id":"62202",
			"view":"3131",
			"top":"6",
			"title":"An easy to understand solution in JAVA",
			"vote":"19",
			"content":"Calculate the area of each rectangle at first. Judge whether they have intersection. If not, return the sum area of them. Otherwise, count the intersection area and subtract it by one time of total area.  \\n\\n    public class Solution {\\n        public int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {\\n            int rectOne = (C - A) * (D - B);\\n            int rectTwo = (G - E) * (H - F);\\n            \\n            if(A >= G || B >= H || C <= E || D <= F){\\n                return rectOne + rectTwo;\\n            }\\n            \\n            int length = Math.min(C, G) - Math.max(A, E);\\n            int height = Math.min(D, H) - Math.max(B, F);\\n            \\n            return rectOne + rectTwo - length * height;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"62164",
			"view":"2378",
			"top":"7",
			"title":"My easy c++ solution",
			"vote":"17",
			"content":"    int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) \\n    {\\n        int total = (C-A) * (D-B) + (G-E) * (H-F);\\n        \\n        if (C<=E || A>=G || B>=H || D<=F )\\n            return total;\\n        else\\n        {\\n            vector <int> h;\\n            h.push_back(A);\\n            h.push_back(C);\\n            h.push_back(E);\\n            h.push_back(G);\\n       \\n            vector <int> v;\\n            v.push_back(B);\\n            v.push_back(D);\\n            v.push_back(F);\\n            v.push_back(H);\\n        \\n            sort(h.begin(), h.end());\\n            sort(v.begin(), v.end());\\n        \\n            total = total - (h[2] - h [1]) * (v[2] - v[1]);\\n            return total;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"62260",
			"view":"794",
			"top":"8",
			"title":"Simple python solution",
			"vote":"14",
			"content":"    class Solution(object):\\n        def computeArea(self, A, B, C, D, E, F, G, H):\\n            total = (C - A) * (D - B) + (G - E) * (H - F)\\n      \\n            width = max(0, min(C, G) - max(A, E))\\n            height = max(0, min(D, H) - max(B, F))\\n            \\n            return total - width * height"
		},
		{
			"lc_ans_id":"62254",
			"view":"1239",
			"top":"9",
			"title":"My Java Solution",
			"vote":"12",
			"content":"    public int computeAreaJoin(int A, int B, int C, int D, int E, int F, int G, int H) {\\n        int hTop = Math.min(D, H);\\n        int hBot = Math.max(B, F);\\n        int wTop = Math.min(C, G);\\n        int wBot = Math.max(A, E);\\n        if (hTop < hBot || wTop < wBot) {\\n            return 0;\\n        } else {\\n            return (hTop - hBot) * (wTop - wBot);\\n        }\\n    }\\n    // A U B = A + B - A * B\\n    public int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {\\n        return (C-A)*(D-B) + (G-E)*(H-F) - computeAreaJoin(A,B,C,D,E,F,G,H);\\n    }"
		}
	],
	"id":"223",
	"title":"Rectangle Area",
	"content":"<p>Find the total area covered by two <b>rectilinear</b> rectangles in a <b>2D</b> plane.</p>\r\n<p>Each rectangle is defined by its bottom left corner and top right corner as shown in the figure.</p>\r\n<div style=\"width:529px; height:300px; background-color:rgb(235, 235, 235);\">\r\n<img src=\"/static/images/problemset/rectangle_area.png\" border=\"0\" alt=\"Rectangle Area\">\r\n</div>\r\n<div style=\"padding-top:23px;\">\r\n<p>Assume that the total area is never beyond the maximum possible value of <b>int</b>.</p>\r\n</div>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/mithmatt\">@mithmatt</a> for adding this problem, creating the above image and all test cases.</p>",
	"frequency":"519",
	"ac_num":"68617"
}