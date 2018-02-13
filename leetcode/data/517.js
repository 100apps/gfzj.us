{
	"difficulty":"2",
	"submit_num":"11347",
	"show_id":"533",
	"leetcode_id":"533",
	"answers":[
		{
			"lc_ans_id":"100216",
			"view":"4906",
			"top":"0",
			"title":"Verbose Java O(m*n) Solution, HashMap",
			"vote":"32",
			"content":"The difficult parts are validating the two rules:\\n1. Row ```R``` and column ```C``` both contain exactly ``N`` black pixels.\\n2. For all rows that have a black pixel at column ```C```, they should be exactly the same as row ```R```\\n\\nMy solution:\\n1. Scan each row. If that row has ```N``` black pixels, put a string ```signature```, which is concatenation of each characters in that row, as key and how many times we see that ```signature``` into a HashMap. Also during scan each row, we record how many black pixels in each column in an array ```colCount``` and will use it in step 2.\\nFor input:\\n[['W', 'B', 'W', 'B', 'B', 'W'],    \\n  ['W', 'B', 'W', 'B', 'B', 'W'],    \\n  ['W', 'B', 'W', 'B', 'B', 'W'],    \\n  ['W', 'W', 'B', 'W', 'B', 'B']] \\nWe will get a HashMap:\\n{\"WBWBBW\": 3, \"WWBWBB\": 1}\\nand colCount array:\\n[0, 3, 1, 3, 4, 1]\\n2. Go through the HashMap and if the count of one ```signature``` is ```N```, those rows potentially contain black pixels we are looking for. Then we validate each of those columns. For each column of them has ```N``` black pixels (lookup in ```colCount``` array), we get ```N``` valid black pixels.\\nFor above example, only the first ```signature``` \"WBWBBW\" has count == 3. We validate 3 column 1, 3, 4 where char == 'B', and column 1 and 3  have 3 'B', then answer is 2 * 3 = 6.\\n\\nTime complexity analysis:\\nBecause we only scan the matrix for one time, time complexity is O(m*n). m = number of rows, n = number of columns.\\n\\n```\\npublic class Solution {\\n    public int findBlackPixel(char[][] picture, int N) {\\n        int m = picture.length;\\n        if (m == 0) return 0;\\n        int n = picture[0].length;\\n        if (n == 0) return 0;\\n        \\n        Map<String, Integer> map = new HashMap<>();\\n        int[] colCount = new int[n];\\n        \\n        for (int i = 0; i < m; i++) {\\n            String key = scanRow(picture, i, N, colCount);\\n            if (key.length() != 0) {\\n                map.put(key, map.getOrDefault(key, 0) + 1);\\n            }\\n        }\\n        \\n        int result = 0;\\n        for (String key : map.keySet()) {\\n            if (map.get(key) == N) {\\n                for (int j = 0; j < n; j++) {\\n                    if (key.charAt(j) == 'B' && colCount[j] == N) {\\n                        result += N;\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return result;\\n    }\\n    \\n    private String scanRow(char[][] picture, int row, int target, int[] colCount) {\\n        int n = picture[0].length;\\n        int rowCount = 0;\\n        StringBuilder sb = new StringBuilder();\\n        \\n        for (int j = 0; j < n; j++) {\\n            if (picture[row][j] == 'B') {\\n                rowCount++;\\n                colCount[j]++;\\n            }\\n            sb.append(picture[row][j]);\\n        }\\n        \\n        if (rowCount == target) return sb.toString();\\n        return \"\";\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100223",
			"view":"1175",
			"top":"1",
			"title":"Explanation of rule 2, which confused me for a long time.",
			"vote":"15",
			"content":"I was very confused by the rule 2 before I read the solutions. Then I realized that the rule 2 means: \\n\"For all rows that have a black pixel at column C, they should be exactly the same as the row R ***in terms of looking***\"\\n\\nSo in the example, row 1 looks exactly the same as the row 0, but row 3 looks not the same as row 0.\\n\\nI got confused by thinking row 1 and row 0 being the same means that the number of black pixels they have are the same or all other possibilities. Maybe that's because English is not my native language."
		},
		{
			"lc_ans_id":"100237",
			"view":"1107",
			"top":"2",
			"title":"Short Python",
			"vote":"14",
			"content":"Mainly I group and count equal rows. Look for rows that appear N times and that have N black pixels. If you find one, add N for each of its black columns that doesn't have extra black pixels (in other rows).\\n\\n    def findBlackPixel(self, picture, N):\\n        ctr = collections.Counter(map(tuple, picture))\\n        cols = [col.count('B') for col in zip(*picture)]\\n        return sum(N * zip(row, cols).count(('B', N))\\n                   for row, count in ctr.items()\\n                   if count == N == row.count('B'))"
		},
		{
			"lc_ans_id":"100222",
			"view":"1349",
			"top":"3",
			"title":"[Java] [C++] Clean Code with Explanation - map<int, set<int>>",
			"vote":"4",
			"content":"**Analysis**\\n```\\n/**\\n * Steps:\\n * >> 1. create map<int, set<int>> cols, rows; -- to store black dots on that row;\\n * \\n *     _0_1_2_3_4_5_\\n *  0 | 0 l 0 1 1 0     rows[0] = {1, 3, 4}\\n *  1 | 0 l 0 1 1 0     rows[1] = {1, 3, 4}\\n *  2 | 0 l 0 1 1 0     rows[2] = {1, 3, 4}\\n *  3 | 0 0 1 0 1 0     rows[3] = {  2,  4}\\n * \\n * >> 2. for every pixel meet rule 1, that is: pic[i][j] == 'B' && rows[i].size() == N && cols[j].size() == N\\n *       check rule2: for every row k in cols[j];  check that row[k] = row[i];\\n * \\n * We can tell the 6 black pixel in col 1 and col 3 are lonely pixels\\n *     _0_1_2_3_4_5_\\n *  0 | 0 L 0 L 1 0     rows[0] = {1, 3, 4}  =\\n *  1 | 0 L 0 L 1 0     rows[1] = {1, 3, 4}  =\\n *  2 | 0 L 0 L 1 0     rows[2] = {1, 3, 4} \\n *  3 | 0 0 1 0 1 0     rows[3] = {  2,  4}\\n *\\n */\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int findBlackPixel(vector<vector<char>>& pic, int N) {\\n        int m = pic.size();\\n        int n = pic[0].size();\\n        unordered_map<int, set<int>> rows;  // black pixels in each row\\n        unordered_map<int, set<int>> cols;  // black pixels in each col\\n        /* 1. create map<int, set<int>> cols, rows; -- to store black dots on that row; */\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (pic[i][j] == 'B') {\\n                    rows[i].insert(j);\\n                    cols[j].insert(i);\\n                }\\n            }\\n        }\\n        /* 2. for every pixel meet rule 1: pic[i][j] == 'B' && rows[i].size() == N && cols[j].size() == N */\\n        int lonelys = 0;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n && rows.count(i); j++) {\\n                if (pic[i][j] == 'B' && rows[i].size() == N && cols[j].size() == N) {   // rule 1 fulfilled\\n                    /* check rule2: for every row k in cols[j];  check that row[k] = row[i]; */\\n                    bool lonely = true;\\n                    for (int r : cols[j]) {\\n                        if (rows[r] != rows[i]) {\\n                            lonely = false; break;\\n                        }\\n                    }\\n                    lonelys += lonely;\\n                }\\n            }\\n        }\\n        return lonelys;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public int findBlackPixel(char[][] pic, int N) {\\n        int m = pic.length;\\n        int n = pic[0].length;\\n        Map<Integer, Set<Integer>> rows = new HashMap<Integer, Set<Integer>>(); // black pixels in each row;\\n        Map<Integer, Set<Integer>> cols = new HashMap<Integer, Set<Integer>>(); // black pixels in each col;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (pic[i][j] == 'B') {\\n                    if (!rows.containsKey(i)) { rows.put(i, new HashSet<Integer>()); }\\n                    if (!cols.containsKey(j)) { cols.put(j, new HashSet<Integer>()); }\\n                    rows.get(i).add(j);\\n                    cols.get(j).add(i);\\n                }\\n            }\\n        }\\n        int lonelys = 0;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n && rows.containsKey(i); j++) {\\n                if (pic[i][j] == 'B' && rows.get(i).size() == N && cols.containsKey(j) && cols.get(j).size() == N) {   // rule 1 fulfilled\\n                    int lonely = 1;\\n                    for (int row : cols.get(j)) {\\n                        if (!rows.get(i).equals(rows.get(row))) {\\n                            lonely = 0; break;\\n                        }\\n                    }\\n                    lonelys += lonely;\\n                }\\n            }\\n        }\\n        return lonelys;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100241",
			"view":"926",
			"top":"4",
			"title":"O(mn) concise solution, C++",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    int findBlackPixel(vector<vector<char>>& picture, int N) {\\n        int m = picture.size();\\n        if(!m) return 0;\\n        int n = picture[0].size();\\n        if(!n) return 0;\\n        vector<int> rows(m,0), cols(n,0);\\n        unordered_map<string,int> um;\\n        vector<string> srows;\\n        for(int i = 0; i < m; ++i){\\n            string s;\\n            for(int j = 0; j < n; ++j){\\n                if(picture[i][j] == 'B'){\\n                    rows[i]++;\\n                    cols[j]++;\\n                }\\n                s.push_back(picture[i][j]);\\n            }\\n            um[s]++;\\n            srows.push_back(s);\\n        }\\n        int res = 0;\\n        for(int i = 0; i < m; ++i)\\n            if(rows[i] == N && um[srows[i]] == N)\\n                for(int j = 0; j < n; ++j)\\n                     if(picture[i][j] == 'B' && cols[j] == N) ++res;        \\n        return res;\\n    }\\n};;\\n```"
		},
		{
			"lc_ans_id":"100217",
			"view":"62",
			"top":"5",
			"title":"why is this problem tagged with DFS?",
			"vote":"2",
			"content":"why is this problem tagged with DFS?"
		},
		{
			"lc_ans_id":"100215",
			"view":"41",
			"top":"6",
			"title":"Concise C++ O(nm) solution using hashmap",
			"vote":"1",
			"content":"Group rows into identical groups. For each group with N grows, count the number of columns having N black pixels at the same locations in these rows.\\n```\\nclass Solution {\\npublic:\\n    int findBlackPixel(vector<vector<char>>& p, int N) {\\n        if (p.empty()) return 0;\\n        int n = p.size(), m = p[0].size();\\n        vector<int> cc(m);\\n        for (int i = 0; i < n; ++i) for (int j = 0; j < m; ++j)  if (p[i][j] == 'B')\\n            ++cc[j];\\n        unordered_map<string,int> mp;\\n        for (int i = 0; i < n; ++i) mp[string(p[i].begin(), p[i].end())]++;\\n        int ans = 0;\\n        for (auto x:mp) if (x.second == N) {\\n            int cnt = 0, cur = 0;\\n            for (int i = 0; i < x.first.size(); ++i) if (x.first[i] == 'B') {\\n                ++cnt;\\n                if (cc[i] == N) ++cur;\\n            }\\n            if (cnt == N) ans += cur*N;\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100219",
			"view":"63",
			"top":"7",
			"title":"Short Python solution that beats 100%",
			"vote":"1",
			"content":"Short Fast python solution based on @StefanPochmann solution.\\n\\nThe key insight is that if a valid column (satisfying rule2 and rule1) would contribute exactly N nodes. The problem then reduces to finding the number of valid columns.\\n\\nThe conditions for a valid column are:\\n1. col.count('B') == N **<---- rule 1**\\n2. first_row_with_B_intersecting_with_col.count('B') == N **<---- rule 1**\\n3. picture.count(first_row_with_B_intersecting_with_col) == N **<---- rule 2**\\n\\n\\nCode:\\n```\\ndef findBlackPixel(self, picture, N):\\n    \"\"\"\\n    :type picture: List[List[str]]\\n    :type N: int\\n    :rtype: int\\n    \"\"\"\\n    count = 0\\n    for c in zip(*picture):\\n        if c.count('B') != N: continue\\n        first_row = picture[c.index('B')]\\n        if first_row.count('B') != N: continue\\n        if picture.count(first_row) != N: continue\\n        count += 1\\n    return count*N\\n```"
		},
		{
			"lc_ans_id":"100220",
			"view":"162",
			"top":"8",
			"title":"Easy Java Solution(beats 90% solutions)",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int findBlackPixel(char[][] picture, int N) {\\n        int m = picture.length, n = picture[0].length;\\n        int[] row = new int[m], col = new int[n];\\n        \\n        for(int i = 0; i < m; i++) {\\n            for(int j = 0; j < n; ++j) {\\n                if(picture[i][j] == 'B') {\\n                    row[i]++;\\n                    col[j]++;\\n                }\\n            }\\n        }\\n        \\n        int count = 0;\\n        for(int j = 0; j < n; j++) {\\n            if(col[j] == N) {\\n            List<Integer> list = new ArrayList<>();\\n            int num = 0;\\n            for(int i = 0; i < m; ++i) {\\n                if(picture[i][j] == 'B' && row[i] == N) {\\n                    num++;\\n                }\\n                if(picture[i][j] == 'B') list.add(i);\\n            }\\n            \\n            if(num > 0) {\\n                boolean flag = true;\\n                for(int x = 1; x < list.size(); ++x) {\\n                    if(!Arrays.equals(picture[list.get(x)], picture[list.get(x - 1)])){\\n                        flag = false;\\n                        break;\\n                    }\\n                }\\n                    if(flag) count += num;\\n              }\\n            }\\n        }\\n        \\n        return count;\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"100235",
			"view":"443",
			"top":"9",
			"title":"two lines solution inspired by StefanPochmann",
			"vote":"1",
			"content":"First I would like to thank Stefan's amazing solution in Pixel I, this is inspired by that:\\nclass Solution(object):\\n\\n    def findBlackPixel(self, picture, N):\\n        \"\"\"\\n        :type picture: List[List[str]]\\n        :type N: int\\n        :rtype: int\\n        \"\"\"\\n        l=[col for col in zip(*picture) if col.count('B')>0]\\n        return sum(col.count('B')==picture[col.index('B')].count('B')==picture.count(picture[col.index('B')])==N for col in l)*N"
		}
	],
	"id":"517",
	"title":"Lonely Pixel II",
	"content":"<p>Given a picture consisting of black and white pixels, and a positive integer N, find the number of black pixels located at some specific row <b>R</b> and column <b>C</b> that align with all the following rules:</p>\r\n\r\n<ol>\r\n<li> Row R and column C both contain exactly N black pixels.</li>\r\n<li> For all rows that have a black pixel at column C, they should be exactly the same as row R</li>\r\n</ol>\r\n\r\n<p>The picture is represented by a 2D char array consisting of 'B' and 'W', which means black and white pixels respectively. </p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b>                                            \r\n[['W', 'B', 'W', 'B', 'B', 'W'],    \r\n ['W', 'B', 'W', 'B', 'B', 'W'],    \r\n ['W', 'B', 'W', 'B', 'B', 'W'],    \r\n ['W', 'W', 'B', 'W', 'B', 'W']] \r\n\r\nN = 3\r\n<b>Output:</b> 6\r\n<b>Explanation:</b> All the bold 'B' are the black pixels we need (all 'B's at column 1 and 3).\r\n        0    1    2    3    4    5         column index                                            \r\n0    [['W', <b>'B'</b>, 'W', <b>'B'</b>, 'B', 'W'],    \r\n1     ['W', <b>'B'</b>, 'W', <b>'B'</b>, 'B', 'W'],    \r\n2     ['W', <b>'B'</b>, 'W', <b>'B'</b>, 'B', 'W'],    \r\n3     ['W', 'W', 'B', 'W', 'B', 'W']]    \r\nrow index\r\n\r\nTake 'B' at row R = 0 and column C = 1 as an example:\r\nRule 1, row R = 0 and column C = 1 both have exactly N = 3 black pixels. \r\nRule 2, the rows have black pixel at column C = 1 are row 0, row 1 and row 2. They are exactly the same as row R = 0.\r\n\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The range of width and height of the input 2D array is [1,200].</li>\r\n</ol>\r\n</p>",
	"frequency":"30",
	"ac_num":"5118"
}