{
	"difficulty":"1",
	"submit_num":"63426",
	"show_id":"492",
	"leetcode_id":"492",
	"answers":[
		{
			"lc_ans_id":"97210",
			"view":"11991",
			"top":"0",
			"title":"3 line Clean and easy understand solution",
			"vote":"45",
			"content":"The W is always less than or equal to the square root of area\\nso we start searching at sqrt(area) till we find the result\\n```\\npublic int[] constructRectangle(int area) {\\n        int w = (int)Math.sqrt(area);\\n\\twhile (area%w!=0) w--;\\n\\treturn new int[]{area/w, w};\\n}\\n```"
		},
		{
			"lc_ans_id":"97217",
			"view":"6708",
			"top":"1",
			"title":"Simple Java Solution, Beats 100%",
			"vote":"9",
			"content":"```\\npublic int[] constructRectangle(int area) {\\n        int[] result = new int[2];\\n        if(area == 0){\\n            return result;\\n        }\\n        int a = (int)Math.sqrt(area);\\n        while(area%a != 0){\\n            a--;\\n        }\\n        int b = area/a;\\n        result[0] = b;\\n        result[1] = a;\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"97244",
			"view":"1606",
			"top":"2",
			"title":"3 line C++ clean solution with Explanation",
			"vote":"8",
			"content":" 1. Because question requires L, D as close as possible, I start the finding from the middle point which is sqrt(area).\\n2. when the Area divide Width have remainder 0, it should be the solution\\n```    \\nvector<int> constructRectangle(int area) {\\n        for(int mid = sqrt(area); mid>0; mid--)\\n            if (!(area%mid))\\n                return {area/mid, mid};\\n    }\\n```"
		},
		{
			"lc_ans_id":"97218",
			"view":"3865",
			"top":"3",
			"title":"Simple Python",
			"vote":"8",
			"content":"```\\nclass Solution(object):\\n    def constructRectangle(self, area):\\n        mid = int(math.sqrt(area))\\n        while mid > 0:\\n            if area % mid == 0:\\n                return [int(area / mid), int(mid)]\\n            mid -= 1\\n```"
		},
		{
			"lc_ans_id":"97230",
			"view":"558",
			"top":"4",
			"title":"Python solution (linear time, constant space) with explanation",
			"vote":"3",
			"content":"    import math\\n    class Solution(object):\\n        # based on area input, linear time, and constant space complexity\\n        def constructRectangle(self, area):\\n            # to meet the requirements of point 3, getting closest to the center,\\n            # the square root will get as close as the center as possible\\n            mid = int(math.sqrt(area))\\n\\n            # consider mid to be W here, and until you get to a point where there\\n            # are exact integers that will equate to a rectangle with area, subtract from mid/W\\n            # because point 2 states that L >= W\\n            while area % mid != 0:\\n                mid -= 1\\n        \\n            # compute L from W (mid), and W (mid)\\n            return [int(area/mid),mid]"
		},
		{
			"lc_ans_id":"97235",
			"view":"1653",
			"top":"5",
			"title":"3ms concise c++",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> constructRectangle(int area) {\\n        if (area <= 0) return vector<int> {};\\n        vector<int> res;\\n        int w = area;\\n        for (int i = 1; i * i <= area; ++i) {\\n            if (area % i == 0) w = i;\\n        }\\n        return vector<int> {area / w, w};\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97255",
			"view":"450",
			"top":"6",
			"title":"Clean JavaScript Solution",
			"vote":"2",
			"content":"```\\nvar largestDividable = (area) => {\\n  for (let i = Math.sqrt(area) | 0; i > 0; i--) {\\n    if (area % i === 0) return i;\\n  }\\n}\\n\\nvar constructRectangle = function(area) {\\n  if (area === 0) return [0, 0];\\n\\n  let w = largestDividable(area);\\n  let l = area / w;\\n  return [l, w];\\n};\\n```"
		},
		{
			"lc_ans_id":"97248",
			"view":"121",
			"top":"7",
			"title":"JS solution",
			"vote":"1",
			"content":"```\\nvar constructRectangle = function(area) {\\n    let w = Math.floor(Math.sqrt(area));\\n    while (area % w !== 0) {\\n        w--;\\n    }\\n    return [area / w, w];\\n};\\n```"
		},
		{
			"lc_ans_id":"97249",
			"view":"381",
			"top":"8",
			"title":"Straightforward Java solution",
			"vote":"1",
			"content":"This problem links me to [Sqrt(x)](https://leetcode.com/problems/sqrtx/). Very similar idea:\\n\\n```\\n\\n    public int[] constructRectangle(int area) {\\n        int i = 0, j = area;\\n        int[] result = new int[2];\\n        while (i <= j){\\n            long product = i*j;\\n            if (product == area){\\n                result[0] = j--;\\n                result[1] = i++;\\n            } else if (product > area){\\n                j--;\\n            } else {\\n                i++;\\n            }\\n        }\\n        return result;\\n    }\\n```\\n\\nAlso viewable [here](https://github.com/fishercoder1534/Leetcode/blob/master/leetcode-algorithms/src/main/java/com/stevesun/solutions/ConstructTheRectangle.java)."
		},
		{
			"lc_ans_id":"97261",
			"view":"927",
			"top":"9",
			"title":"Beats 100% of the solutions - JAVA - explained",
			"vote":"1",
			"content":"     public int[] constructRectangle(int area) {\\n        \\n        int[] output = new int[2];\\n\\t\\t\\n\\t\\toutput[0] = 1;\\n\\t\\toutput[1] = area;\\n\\t\\tint length = 0;\\n\\t\\t\\n\\t\\tfor (int width = 1; width <= Math.ceil(Math.sqrt(area)); width++) {\\n\\t\\t\\t\\n\\t\\t\\tlength = area/width;\\n\\t\\t\\t\\n\\t\\t\\tif ((length * width) == area && Math.abs(length - width) <= Math.abs(output[0] - output[1]) && length >= width) {\\n\\t\\t\\t\\toutput[0] = length;\\n\\t\\t\\t\\toutput[1] = width;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn output;\\n\\t}\\n\\nThe idea is simple:\\n1.) Initialise the output with 1 and area as they are the most prominent factors of a given number.\\n2.) Remember, the question simply asks us to factorise a given number such that their difference is minimum.\\n3.) We can factorise a given number by simply iterating from 1 to sqrt(n)\\n4.) Divide area by each number while looping to get length.\\n5.) The if condition checks a) whethe if the combination of length and width are area b) whether if the current combination we hold the smallest difference and c) whether if length >= width\\n6.) return output"
		}
	],
	"id":"483",
	"title":"Construct the Rectangle",
	"content":"<p>\nFor a web developer, it is very important to know how to design a web page's size. So, given a specific rectangular web page’s area, your job by now is to design a rectangular web page, whose length L and width W satisfy the following requirements:<pre>\n1. The area of the rectangular web page you designed must equal to the given target area.\n<br>2. The width W should not be larger than the length L, which means L >= W.\n<br>3. The difference between length L and width W should be as small as possible.\n</pre>\nYou need to output the length L and the width W of the web page you designed in sequence.\n</p>\n\n\n<p><b>Example:</b><br />\n<pre>\n<b>Input:</b> 4\n<b>Output:</b> [2, 2]\n<b>Explanation:</b> The target area is 4, and all the possible ways to construct it are [1,4], [2,2], [4,1]. \nBut according to requirement 2, [1,4] is illegal; according to requirement 3,  [4,1] is not optimal compared to [2,2]. So the length L is 2, and the width W is 2.\n</pre>\n</p>\n\n<p><b>Note:</b><br>\n<ol>\n<li>The given area won't exceed 10,000,000 and is a positive integer</li>\n<li>The web page's width and length you designed must be positive integers.</li>\n</ol>\n</p>",
	"frequency":"228",
	"ac_num":"30584"
}