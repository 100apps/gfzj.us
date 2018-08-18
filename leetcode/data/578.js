{
	"difficulty":"1",
	"submit_num":"54125",
	"show_id":"599",
	"leetcode_id":"599",
	"answers":[
		{
			"lc_ans_id":"103654",
			"view":"8220",
			"top":"0",
			"title":"Java O(n+m) Time O(n) Space",
			"vote":"24",
			"content":"```\\npublic String[] findRestaurant(String[] list1, String[] list2) {\\n    Map<String, Integer> map = new HashMap<>();\\n    List<String> res = new LinkedList<>();\\n    int minSum = Integer.MAX_VALUE;\\n    for (int i=0;i<list1.length;i++) map.put(list1[i], i);\\n    for (int i=0;i<list2.length;i++) {\\n        Integer j = map.get(list2[i]);\\n        if (j != null && i + j <= minSum) {\\n            if (i + j < minSum) { res.clear(); minSum = i+j; }\\n            res.add(list2[i]);\\n        }\\n    }\\n    return res.toArray(new String[res.size()]);\\n}\\n```"
		},
		{
			"lc_ans_id":"103704",
			"view":"993",
			"top":"1",
			"title":"UCSD Students?",
			"vote":"9",
			"content":"I wonder if this question is posted by a UCSD kid? \\n\\nYou will get sick of these restaurants before your second year."
		},
		{
			"lc_ans_id":"103674",
			"view":"1661",
			"top":"2",
			"title":"C++ 9 lines hash table easy to understand",
			"vote":"7",
			"content":"```\\n    vector<string> findRestaurant(vector<string>& list1, vector<string>& list2) {\\n        vector<string>res;\\n        unordered_map<string,int>m;\\n        int min = INT_MAX;\\n        for(int i = 0; i < list1.size(); i++) m[list1[i]] = i;\\n        for(int i = 0; i < list2.size(); i++)\\n            if(m.count(list2[i]) != 0)\\n                if(m[list2[i]] + i < min) min = m[list2[i]] + i, res.clear(), res.push_back(list2[i]);\\n                else if(m[list2[i]] + i == min) res.push_back(list2[i]);\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"103745",
			"view":"2645",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"6",
			"content":"Say the lists are ```A``` and ```B```.  Let ```Aindex[element]``` be the index of that element in A.  For every index, value pair (j, v) in B, we have some candidate sum-of-indexes i + j, where i = Aindex[v] if it exists.  If the candidate sum is better, it becomes our new answer; if the candidate sums are the same, then we append to our answer.\\n\\n```\\ndef findRestaurant(self, A, B):\\n    Aindex = {u: i for i, u in enumerate(A)}\\n    best, ans = 1e9, []\\n\\n    for j, v in enumerate(B):\\n        i = Aindex.get(v, 1e9)\\n        if i + j < best:\\n            best = i + j\\n            ans = [v]\\n        elif i + j == best:\\n            ans.append(v)\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"103658",
			"view":"392",
			"top":"4",
			"title":"Python, 5 lines, O(n) time, O(n) space",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def findRestaurant(self, list1, list2):\\n        \"\"\"\\n        :type list1: List[str]\\n        :type list2: List[str]\\n        :rtype: List[str]\\n        \"\"\"\\n        dict1 = {rest : i for i, rest in enumerate(list1)}\\n        dict2 = {rest : i for i, rest in enumerate(list2)}\\n        dictSum = {rest : dict1[rest]+dict2[rest] for rest in dict1 if rest in dict2}\\n        minSum = min(dictSum.values())\\n        return [key for key in dictSum if dictSum[key] == minSum]\\n```\\nOr a little bit faster solution:\\n```\\nclass Solution(object):\\n    def findRestaurant(self, list1, list2):\\n        \"\"\"\\n        :type list1: List[str]\\n        :type list2: List[str]\\n        :rtype: List[str]\\n        \"\"\"\\n        dict1 = {rest : i for i, rest in enumerate(list1)}\\n        dict2 = {rest : i for i, rest in enumerate(list2)}\\n        dictSum = {rest : dict1[rest]+dict2.get(rest, 2017) for rest in dict1}\\n        minSum = min(dictSum.values())\\n        return [key for key in dictSum if dictSum[key] == minSum]\\n```\\nThe fourth line in both solutions could be in the last one (```return [key for key in dictSum if dictSum[key] == min(dictSum.values())```), but that makes it slower. Is that because it calculates the min again every iteration?"
		},
		{
			"lc_ans_id":"103714",
			"view":"62",
			"top":"5",
			"title":"One HashMap",
			"vote":"1",
			"content":"public String[] findRestaurant(String[] list1, String[] list2) {\\n     List<String> res = new ArrayList<>();\\n     \\n     Map<String, Integer> map = new HashMap<>();\\n     \\n     \\n     \\n     int tmp = Integer.MAX_VALUE;\\n     for(int i = 0; i < list1.length; i++){\\n         \\n         map.put(list1[i],i);\\n         \\n     }\\n     \\n     for(int i = 0; i < list2.length; i++){\\n         if(map.containsKey(list2[i])){\\n             int pre = map.get(list2[i]);\\n             \\n             if(pre + i < tmp){\\n                 res = new ArrayList<>();\\n                 res.add(list2[i]);\\n                 tmp = pre + i;\\n             }\\n             else if(pre + i == tmp)\\n                res.add(list2[i]);\\n         }\\n     }\\n     \\n     String[] r = new String[res.size()];\\n     \\n     int i = 0;\\n     for(String s : res){\\n         r[i ++] = s;\\n     }\\n     \\n     return r;\\n    }\\n}"
		},
		{
			"lc_ans_id":"103733",
			"view":"61",
			"top":"6",
			"title":"Easy Understanding Java Solution with Explanation",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public String[] findRestaurant(String[] list1, String[] list2) {\\n        Map<String, Integer> map = new HashMap<>();\\n        List<String> res = new LinkedList<>();\\n        int indexSum = Integer.MAX_VALUE;\\n        \\n        for(int i = 0; i < list1.length; i++) {\\n            map.put(list1[i], i);\\n        }\\n        for(int i = 0; i < list2.length; i++) {\\n            // the same restaurant is existing && sum of the indexs are not greater than previous sum.\\n            if(map.containsKey(list2[i]) && indexSum >= map.get(list2[i]) + i) {  \\n                // if sum is less than previous sum, get rid of the previous sum, create a new list.\\n                if(indexSum > map.get(list2[i]) + i) {  \\n                    res =  new LinkedList<>();\\n                    indexSum = map.get(list2[i]) + i;\\n                }\\n                // add the same restaurant's name anyway.\\n                res.add(list2[i]);\\n            }\\n        }\\n        return res.toArray(new String[res.size()]);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103650",
			"view":"9",
			"top":"7",
			"title":"Python using Intersection of 2 sets",
			"vote":"0",
			"content":"```\\nclass Solution(object):\\n    def findRestaurant(self, list1, list2):\\n        \"\"\"\\n        :type list1: List[str]\\n        :type list2: List[str]\\n        :rtype: List[str]\\n        \"\"\"\\n        \\n        dict_list1 = {k:v for v,k in enumerate(list1)}\\n        dict_list2 = {k:v for v,k in enumerate(list2)}\\n        res_index = len(list1) + len(list2)\\n        res = []\\n        \\n        \\n        intersection = list(set(dict_list1.keys()) & set(dict_list2.keys()))\\n        if len(intersection) == 1:\\n            return intersection\\n        else:\\n            for restaurant in intersection:\\n                index = dict_list1[restaurant] + dict_list2[restaurant]\\n                if index < res_index:\\n                    res_index = index\\n                    res = [restaurant]\\n                elif (index == res_index):    \\n                    res.append(restaurant)\\n        return res    \\n```"
		},
		{
			"lc_ans_id":"103651",
			"view":"21",
			"top":"8",
			"title":"JavaScript hashmap O(n) solution",
			"vote":"0",
			"content":"```\\nvar findRestaurant = function(list1, list2) {\\n    var map = {};\\n    var result = {};\\n    var current;\\n    for(let i = 0; i < list1.length; i++){\\n        map[list1[i]] = i;\\n    }\\n    for(let i = 0; i < list2.length; i++){\\n        if(map[list2[i]] !== undefined){\\n            var temp = i + map[list2[i]];\\n            if(temp === current){\\n                result[i + map[list2[i]]]+= \",\" + list2[i];\\n            }\\n            else{\\n                result[i + map[list2[i]]] = list2[i];\\n            }\\n            current = Math.min(current === undefined ? temp : current, temp);\\n        }\\n    }\\n    return result[current].split(\",\");    \\n};"
		},
		{
			"lc_ans_id":"103652",
			"view":"30",
			"top":"9",
			"title":"Java HashMap solution beats 99% with optimizations",
			"vote":"0",
			"content":"The key idea is to build `HashMap` on the smaller list, and return early if index of the other list is greater then our current minimum sum.\\n\\n```\\nclass Solution {\\n    public String[] findRestaurant(String[] list1, String[] list2) {\\n        if (list1.length > list2.length) {\\n            return findRestaurant(list2, list1);\\n        }\\n        Map<String, Integer> map = new HashMap<>();\\n        for (int i = 0; i < list1.length; ++i) {\\n            map.put(list1[i], i);\\n        }\\n        List<String> result = new ArrayList<>();\\n        int sum = Integer.MAX_VALUE;\\n        for (int i = 0; i < list2.length && i <= sum; ++i) {\\n            String string = list2[i];\\n            if (!map.containsKey(string)) {\\n                continue;\\n            }\\n            int newSum = i + map.get(string);\\n            if (newSum <= sum) {\\n                if (newSum < sum) {\\n                    result.clear();\\n                }\\n                result.add(string);\\n                sum = newSum;\\n            }\\n        }\\n        return result.toArray(new String[result.size()]);\\n    }\\n}\\n```"
		}
	],
	"id":"578",
	"title":"Minimum Index Sum of Two Lists",
	"content":"<p>\r\nSuppose Andy and Doris want to choose a restaurant for dinner, and they both have a list of favorite restaurants represented by strings. \r\n</p>\r\n<p>\r\nYou need to help them find out their <b>common interest</b> with the <b>least list index sum</b>. If there is a choice tie between answers, output all of them with no order requirement. You could assume there always exists an answer.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[\"Shogun\", \"Tapioca Express\", \"Burger King\", \"KFC\"]\r\n[\"Piatti\", \"The Grill at Torrey Pines\", \"Hungry Hunter Steakhouse\", \"Shogun\"]\r\n<b>Output:</b> [\"Shogun\"]\r\n<b>Explanation:</b> The only restaurant they both like is \"Shogun\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[\"Shogun\", \"Tapioca Express\", \"Burger King\", \"KFC\"]\r\n[\"KFC\", \"Shogun\", \"Burger King\"]\r\n<b>Output:</b> [\"Shogun\"]\r\n<b>Explanation:</b> The restaurant they both like and have the least index sum is \"Shogun\" with index sum 1 (0+1).\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of both lists will be in the range of [1, 1000].</li>\r\n<li>The length of strings in both lists will be in the range of [1, 30].</li>\r\n<li>The index is starting from 0 to the list length minus 1.</li>\r\n<li>No duplicates in both lists.</li>\r\n</ol>\r\n</p>",
	"frequency":"185",
	"ac_num":"25186"
}