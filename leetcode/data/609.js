{
	"difficulty":"3",
	"submit_num":"5997",
	"show_id":"631",
	"leetcode_id":"631",
	"answers":[
		{
			"lc_ans_id":"104857",
			"view":"966",
			"top":"0",
			"title":"Java, implement the logic in Cell class, easy to understand",
			"vote":"8",
			"content":"O(1)  set() operation, only do the traverse in get()/sum() operation, 103ms.\\nGood for set() heavy system.\\n\\n```\\npublic class Excel {\\n    Cell[][] table;\\n\\n    public Excel(int H, char W) {\\n        table = new Cell[H+1][W-'A'+1];\\n    }\\n    \\n    public void set(int r, char c, int v) {\\n        if(table[r][c-'A'] == null) table[r][c-'A'] = new Cell (v); \\n        else table[r][c-'A'].setValue(v); \\n    }\\n    \\n    public int get(int r, char c) {\\n        if( table[r][c-'A'] == null) return 0;\\n        else return table[r][c-'A'].getValue();  \\n    }\\n    \\n    public int sum(int r, char c, String[] strs) {\\n        if (table[r][c-'A'] == null) {\\n            table[r][c-'A'] = new Cell(strs);\\n        } else {\\n            table[r][c-'A'].setFormula(strs);\\n        }\\n        \\n        return table[r][c-'A'].getValue();\\n    }\\n    \\n    \\n    private class Cell{\\n        int val=0;\\n        HashMap<Cell, Integer> formula=new HashMap<>();//one cell might appear multiple times\\n        \\n        public Cell(int val){\\n            setValue(val); \\n        }\\n        public Cell(String[] formulaStr){\\n            setFormula(formulaStr);\\n        }\\n        \\n        public void setValue(int val) {           \\n            formula.clear(); //will not be treated as a formula cell anymore        \\n            this.val = val;\\n        }\\n        \\n        public void setFormula(String[] formulaStr){\\n            formula.clear();            \\n            for(String str : formulaStr){\\n                if (str.indexOf(\":\")<0){\\n                    int[] pos = getPos(str);\\n                    addFormulaCell(pos[0], pos[1]);\\n                } else {\\n                    String[] pos = str.split(\":\");\\n                    int[] startPos = getPos(pos[0]);\\n                    int[] endPos = getPos(pos[1]);\\n                    for(int r = startPos[0]; r<=endPos[0]; r++){\\n                        for(int c = startPos[1]; c<=endPos[1]; c++){\\n                            addFormulaCell(r, c);\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n        \\n        private int[] getPos(String str){\\n            int[] pos = new int[2];\\n            pos[1]=str.charAt(0)-'A';\\n            pos[0]=Integer.parseInt(str.substring(1));\\n            return pos;\\n        }\\n        \\n        private void addFormulaCell(int r, int c){\\n            if(table[r][c] == null) table[r][c] = new Cell(0);\\n            Cell rangeCell = table[r][c];                            \\n            formula.put(rangeCell, (formula.containsKey(rangeCell)? formula.get(rangeCell) : 0)+1);\\n        }\\n        \\n        //recursive method\\n        private int getValue(){\\n            if(this.formula.isEmpty()) return this.val;\\n            int sum = 0;\\n            for(Cell cell : formula.keySet()){\\n                sum+=cell.getValue()*formula.get(cell);\\n            }\\n            return sum;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104880",
			"view":"1456",
			"top":"1",
			"title":"C++, 3 ms, concise and easy to understand",
			"vote":"8",
			"content":"I have put detailed explanation in the comments. A vector<vector<int>> is used for the Excel. Here I just want to highlight two things.\\n1) When a cell changes, all the sum related have to update. So a forward link from a cell to all the cells with it in the sum is required. Because a cell may be used for multiple times in the sum due to overlapping ranges, unordered_map<cell, unordered_map<cell, weight>> is used. The weight could improve the efficiency in the worst case.\\n2) When reset a cell's value, or reassign a new sum range to it, the cells contribute to its sum will change. So a backward link from this cell to all those cells is necessary. unordered_map<cell, unordered_set<cell>>  is sufficient.\\n\\nThe excel is small, at most 26 by 26. So we can use row*26+col as the key of a cell, which is int.\\nSee the code below.\\n```\\nclass Excel {\\npublic:\\n    Excel(int H, char W) {\\n        // initialization. Because r starts from 1, I used H+1 instead of H.\\n        Exl = vector<vector<int>> (H+1, vector<int>(W-'A'+1, 0));\\n        fward.clear();\\n        bward.clear();\\n    }\\n    \\n    void set(int r, char c, int v) {\\n        int col = c-'A', key = r*26+col;\\n        // update its value and all the sum related\\n        update(r, col, v);\\n        // This is a reset, so break all the forward links if existing\\n        if (bward.count(key)) {\\n            for (int k:bward[key]) {\\n                fward[k].erase(key);\\n            }\\n            bward[key].clear();\\n        }\\n    }\\n    // update a cell and all the sum related, using BFS\\n    // weights are used to improve efficiency for overlapping ranges\\n    void update(int r, int col, int v) {\\n        int prev = Exl[r][col];\\n        Exl[r][col] = v;\\n        // myq is keys for cells in next level, and update is the increment for each cell\\n        queue<int> myq, update;\\n        myq.push(r*26+col);\\n        update.push(v-prev);\\n        while (!myq.empty()) {\\n            int key = myq.front(), dif = update.front();\\n            myq.pop();\\n            update.pop();\\n            if (fward.count(key)) {\\n                for (auto it = fward[key].begin(); it != fward[key].end(); it++) {\\n                    int k = it->first;\\n                    myq.push(k);\\n                    update.push(dif*(it->second));\\n                    Exl[k/26][k%26] += dif*(it->second);\\n                }\\n            }\\n        }\\n    }\\n    \\n    int get(int r, char c) {\\n        return Exl[r][c-'A'];\\n    }\\n    \\n    int sum(int r, char c, vector<string> strs) {\\n        // this is another reset, so break all the forward links\\n        int col = c-'A', key = r*26+col, ans = 0;\\n        if (bward.count(key)) {\\n            for (int k:bward[key]) {\\n                fward[k].erase(key);\\n            }\\n            bward[key].clear();\\n        }\\n        // get the sum over multiple ranges\\n        for (string str:strs) {\\n            int p = str.find(':'), left, right, top, bot;\\n            left = str[0]-'A';\\n            right = str[p+1]-'A';\\n            if (p == -1) \\n                top = stoi(str.substr(1));\\n            else\\n                top = stoi(str.substr(1, p-1));\\n            bot = stoi(str.substr(p+2));\\n            for (int i = top; i <= bot; ++i) {\\n                for (int j = left; j <= right; ++j) {\\n                    ans += Exl[i][j];\\n                    fward[i*26+j][key]++;\\n                    bward[key].insert(i*26+j);\\n                }\\n            }\\n        }\\n        // update this cell and all the sum related\\n        update(r, col, ans);\\n        return ans;\\n    }\\nprivate:\\n    // The key of a cell is defined as 26*row+col, which is int;\\n    // fward links a cell to all the cells which use it for sum, and it may be used for \\n    // multiple times due to overlap ranges, so another map is used for its weight\\n    // bward links a cell to all the cells that contribute to its sum. When reset its value,\\n    // or reassign a new sum range to it, we need disconnect the forward link of those cells to it. \\n    unordered_map<int, unordered_map<int, int>> fward;\\n    unordered_map<int, unordered_set<int>> bward;\\n    vector<vector<int>> Exl;\\n};\\n```"
		},
		{
			"lc_ans_id":"104862",
			"view":"515",
			"top":"2",
			"title":"Python easy understand solution",
			"vote":"5",
			"content":"`````\\nclass Excel(object):\\n\\n    def __init__(self, H, W):\\n        self.M = [[{'v': 0, 'sum': None} for i in range(H)] for j in range(ord(W) - 64)]\\n\\n    def set(self, r, c, v):\\n        self.M[r - 1][ord(c) - 65] = {'v': v, 'sum': None}\\n\\n    def get(self, r, c):\\n        cell = self.M[r - 1][ord(c) - 65]\\n        if not cell['sum']: return cell['v']\\n        return sum(self.get(*pos) * cell['sum'][pos] for pos in cell['sum'])\\n\\n    def sum(self, r, c, strs):\\n        self.M[r - 1][ord(c) - 65]['sum'] = self.parse(strs)\\n        return self.get(r, c)\\n\\n    def parse(self, strs):\\n        c = collections.Counter()\\n        for s in strs:\\n            s, e = s.split(':')[0], s.split(':')[1] if ':' in s else s\\n            for i in range(int(s[1:]), int(e[1:]) + 1):\\n                for j in range(ord(s[0]) - 64, ord(e[0]) - 64 + 1):\\n                    c[(i, chr(j + 64))] += 1\\n        return c"
		},
		{
			"lc_ans_id":"104883",
			"view":"636",
			"top":"3",
			"title":"Java, OOP style, easy to understand",
			"vote":"4",
			"content":"```\\npublic class Excel {\\n    private final static int BASE = 'A';\\n    private final Expression[][] spreadsheet;\\n\\n    public Excel(int H, char W) {\\n        this.spreadsheet = new Expression[H+1][W - BASE+1];\\n    }\\n\\n    public void set(int r, char c, int v) {\\n        spreadsheet[r][c - BASE] = new Value(v);\\n    }\\n\\n    public int get(int r, char c) {\\n        Expression cell = spreadsheet[r][c - BASE];\\n        if (cell != null) {\\n            return cell.evaluate(this);\\n        } else {\\n            return 0;\\n        }\\n    }\\n\\n    public int sum(int r, char c, String[] strs) {\\n        Expression[] expressions = new Expression[strs.length];\\n\\n        for (int i = 0; i < strs.length; i++) {\\n            String[] split = strs[i].split(\":\");\\n            if (split.length == 1) {\\n                expressions[i] = new Reference(split[0]);\\n            } else {\\n                String topLeft = split[0];\\n                String bottomRight = split[1];\\n                expressions[i] = new Rectangle(topLeft, bottomRight);\\n            }\\n        }\\n\\n        spreadsheet[r][c - BASE] = new Formula(expressions);\\n        return spreadsheet[r][c - BASE].evaluate(this);\\n    }\\n\\n    private int getRow(String cell) {\\n        return Integer.valueOf(cell.substring(1));\\n    }\\n\\n    private int getColumn(String cell) {\\n        return cell.charAt(0) - BASE;\\n    }\\n\\n    private interface Expression {\\n        int evaluate(Excel excel);\\n    }\\n\\n    private class Value implements Expression {\\n        private final int value;\\n\\n        Value(int value) {\\n            this.value = value;\\n        }\\n\\n        public int evaluate(Excel excel) {\\n            return value;\\n        }\\n    }\\n\\n    private class Formula implements Expression {\\n        private final Expression[] expressions;\\n\\n        Formula(Expression[] expressions) {\\n            this.expressions = expressions;\\n        }\\n\\n        public int evaluate(Excel excel) {\\n            int value = 0;\\n\\n            for (Expression expression : expressions) {\\n                value += expression.evaluate(excel);\\n            }\\n\\n            return value;\\n        }\\n    }\\n\\n    private class Reference implements Expression {\\n        private final int row;\\n        private final int column;\\n\\n        Reference(String cell) {\\n            this.row = getRow(cell);\\n            this.column = getColumn(cell);\\n        }\\n\\n        public int evaluate(Excel excel) {\\n            Expression cell = excel.spreadsheet[row][column];\\n            if (cell != null) {\\n                return cell.evaluate(excel);\\n            } else {\\n                return 0;\\n            }\\n        }\\n    }\\n\\n    private class Rectangle implements Expression {\\n        private final int rowStart;\\n        private final int rowEnd;\\n        private final int columnStart;\\n        private final int columnEnd;\\n\\n        Rectangle(String topLeft, String bottomRight) {\\n            this.rowStart = getRow(topLeft);\\n            this.rowEnd = getRow(bottomRight);\\n            this.columnStart = getColumn(topLeft);\\n            this.columnEnd = getColumn(bottomRight);\\n        }\\n\\n        public int evaluate(Excel excel) {\\n            int value = 0;\\n\\n            for (int i = rowStart; i <= rowEnd; i++) {\\n                for (int j = columnStart; j <= columnEnd; j++) {\\n                    Expression cell = excel.spreadsheet[i][j];\\n                    if (cell != null) {\\n                        value += cell.evaluate(excel);\\n                    }\\n                }\\n            }\\n\\n            return value;\\n        }\\n    }\\n}\\n```\\n\\nIt could be optimized by \\n- caching Expressions results\\n- marking Expressions as dirty on 'set' operations\\n- not recalculating cached results if expression is not dirty (doesn't depend on dirty expressions)"
		},
		{
			"lc_ans_id":"104876",
			"view":"136",
			"top":"4",
			"title":"Just some advice. At the first glance, I thought this is a 2D Binary Indexed Tree or Segment Tree problem.",
			"vote":"3",
			"content":"For this kind of design problems, at least give some hint like the number of calls of \"set\" and \"sum\" and \"get\" next time please."
		},
		{
			"lc_ans_id":"104879",
			"view":"205",
			"top":"5",
			"title":"C++ 3 ms solution, easy to understand",
			"vote":"3",
			"content":"```\\nclass Excel {\\npublic:\\n    Excel(int H, char W) {\\n        m.clear();\\n        mat.resize(H);\\n        for(int i = 1; i <= H; i++) mat[i-1].resize(W-'A');\\n    }\\n    \\n    void set(int r, char c, int v) {\\n        if(m.count({r, c})) m.erase({r, c});\\n        mat[r-1][c-'A'] = v;\\n    }\\n    \\n    int get(int r, char c) {\\n        if(m.count({r, c})) return sum(r, c, m[{r, c}]);\\n        return mat[r-1][c-'A'];\\n    }\\n    \\n    int sum(int r, char c, vector<string> strs) {\\n        int sum = 0;\\n        for(string str : strs) {\\n            if(str.find(':') == string::npos) {\\n                char w = str[0];\\n                int h = stoi(str.substr(1));\\n                sum += get(h, w);\\n            }else {\\n                int pos = str.find(':');\\n                int w1 = str[0] - 'A';\\n                int h1 = stoi(str.substr(1, pos-1));\\n                int w2 = str[pos+1] - 'A';\\n                int h2 = stoi(str.substr(pos+2));\\n                for(int i = h1; i <= h2; i++) {\\n                    for(int j = w1; j <= w2; j++) {\\n                        sum += get(i, j+'A');\\n                    }\\n                }\\n            }\\n        }\\n        //mat[r-1][c-'A'] = sum;\\n        m[{r, c}] = strs;\\n        return sum;\\n    }\\nprivate:\\n    vector<vector<int>> mat;\\n    map<pair<int, char>, vector<string>> m;\\n};\\n```"
		},
		{
			"lc_ans_id":"104868",
			"view":"640",
			"top":"6",
			"title":"C++ straight forward",
			"vote":"3",
			"content":"```\\nclass Excel {\\nprivate:\\n    int **dict;\\n    int offset, H, W;\\n    unordered_map<int, vector<string>> mp;\\npublic:\\n    Excel(int H, char W) {\\n        offset = 'A';\\n        this->H = H;\\n        this->W = W - offset + 1;\\n        mp.clear();\\n        dict = new int*[H];\\n        for (int i = 0; i < H; i++) {\\n            dict[i] = new int[this->W];\\n            memset(dict[i], 0, sizeof(int)*this->W);\\n        }\\n    }\\n    \\n    void set (int r, char c, int v) {\\n        int k = (r << 10) + c;\\n        dict[r - 1][c - offset] = v;\\n        mp.erase(k);\\n    }\\n    \\n    int get (int r, char c) {\\n        int k = (r << 10) + c;\\n        if (mp.find(k) == mp.end())\\n            return dict[r - 1][c - offset];\\n        return get_cells(mp[k]);\\n    }\\n    \\n    int sum (int r, char c, vector<string> strs) {\\n        int k = (r << 10) + c;\\n        dict[r - 1][c - offset] = get_cells(strs);\\n        mp[k] = strs;\\n        return dict[r - 1][c - offset];\\n    }\\n    \\n    int get_cells(vector<string> &strs) {\\n        int res = 0;\\n        for (auto s : strs) {\\n            if (s.find(':')  == -1)\\n                res += get_cell(s);\\n            else\\n                res += get_cell_range(s);\\n        }\\n        return res;\\n    }\\n    \\n    int get_cell(string &cell) {\\n        int r = 0, idx = 0;\\n        char c = cell[idx++];\\n        while (idx < cell.length())\\n            r = 10 * r + cell[idx++] - '0';\\n        return get(r, c);\\n    }\\n    \\n    int get_cell_range(string &cell_range) {\\n        int rs = 0, re = 0, idx = 0, res = 0;\\n        char cs, ce;\\n        \\n        int seg = cell_range.find(':');\\n        cs = cell_range[idx++];\\n        while (idx < seg)\\n            rs = 10 * rs + cell_range[idx++] - '0';\\n        \\n        idx++;\\n        ce = cell_range[idx++];\\n        while (idx < cell_range.length())\\n            re = 10 * re + cell_range[idx++] - '0';\\n        \\n        for (int r = rs; r <= re; r++) {\\n            for (char c = cs; c <= ce; c++) {\\n                res += get(r, c);\\n            }\\n        }\\n        return res;\\n    }\\n};\\n\\n/**\\n * Your Excel object will be instantiated and called as such:\\n * Excel obj = new Excel(H, W);\\n * obj.set(r,c,v);\\n * int param_2 = obj.get(r,c);\\n * int param_3 = obj.sum(r,c,strs);\\n */\\n````"
		},
		{
			"lc_ans_id":"104881",
			"view":"255",
			"top":"7",
			"title":"Design excel formula problem - Contest 38",
			"vote":"2",
			"content":"My approach for the problem :\\n\\n**Data structure used**\\n \\n* input[26][26] as maximum height and width is 26\\n* vector<pair<int,int> > for each (i,j)'th cell which contains all the cell indices whose sum is equal to the cell for (i,j). As an example, consider this \"Sum(3, \"C\", [\"A1\", \"A1:B2\"]);\" then vector for cell (3,\"C\") contains cells (A1, A1,B1,A2,B2). \\nThe maximum size limit for this vector can be 26*26 for the last cell.\\n\\n**get(r,c)**\\nI simply return the value of input[r-1][c-'A']. Time complexity O(1).\\n\\n**sum(r,c,vector<string>)**\\nI find out the cells for the strings passed in the vector and calculate the sum for the required **r** and **c** and return that. Time complexity : O(HXW) in worst case.\\n\\n**set(r,c,v)**\\nI set the value of required **r** and **c** to **v**. I clear the vector for this cell as now it has the entirely new value. And I check all other cells if they have this (r,c)'th cell i their sum vector. If yes, I update the sum of all those cells. Time complexity : O(HXW) - for iterating over all the cells and for every cell, O(HXW) - worst case vector size.\\n\\nMy last function seems to be taking much time complexity. Any improvements can be suggested? As I think for large number of queries, it'll surely time out."
		},
		{
			"lc_ans_id":"104884",
			"view":"136",
			"top":"8",
			"title":"Simple elegant Python solution",
			"vote":"2",
			"content":"They key here is to store a dictionary of cells to formulas, and as you parse the formula, recursively look up the dictionary to determine whether the cell contains a formula or a raw value. The bulk of the logic is within the `process` function which I added.\\n\\n```\\nclass Excel(object):\\n\\n    def __init__(self, H, W):\\n        \"\"\"\\n        :type H: int\\n        :type W: str\\n        \"\"\"\\n        self.height = H\\n        self.width = ord(W) - ord('A') + 2\\n        self.grid = [[0] * self.width for i in range(self.height+1)]\\n        self.formulas = {}\\n\\n    def set(self, r, c, v):\\n        \"\"\"\\n        :type r: int\\n        :type c: str\\n        :type v: int\\n        :rtype: void\\n        \"\"\"\\n        char = ord(c) - ord('A') + 1\\n        self.grid[r][char] = v\\n        if (r, char) in self.formulas:\\n            del self.formulas[(r, char)]\\n\\n    def get(self, r, c):\\n        \"\"\"\\n        :type r: int\\n        :type c: str\\n        :rtype: int\\n        \"\"\"\\n        return self.process(r, c)\\n\\n\\n    def sum(self, r, c, strs):\\n        \"\"\"\\n        :type r: int\\n        :type c: str\\n        :type strs: List[str]\\n        :rtype: int\\n        \"\"\"\\n        char = ord(c) - ord('A') + 1\\n        self.formulas[(r, char)] = strs\\n        return self.get(r, c)\\n\\n    def process(self, r, c):\\n        \"\"\"\\n        :type r: int\\n        :type c: str\\n        :rtype: void\\n        \"\"\"\\n        total = 0\\n        c = ord(c) - ord('A') + 1\\n        if (r, c) not in self.formulas:\\n            return self.grid[r][c]\\n\\n        formula = self.formulas[(r, c)]\\n        for fragment in formula:\\n            if ':' in fragment:\\n                start, end = fragment.split(':')\\n                start_row, start_col = int(start[1:]), ord(start[0])\\n                end_row, end_col = int(end[1:]), ord(end[0])\\n                for i in range(start_row, end_row+1):\\n                    for j in range(start_col, end_col+1):\\n                        total += self.get(i, chr(j))\\n            else:\\n                total += self.get(int(fragment[1]), fragment[0])\\n        return total\\n```"
		},
		{
			"lc_ans_id":"104866",
			"view":"124",
			"top":"9",
			"title":"A different solution in Java, Beats 80%",
			"vote":"1",
			"content":"I wrote a Cell class. a Cell can be a number or a formula. If it's a formula, every time we call get, we recalculate the cell's value.\\n```\\npublic class Excel {\\n    class Cell {\\n        boolean isNum;\\n        Integer val;\\n        String[] formula;\\n        public void setFormula(String[] formula) {\\n            this.formula = formula;\\n            isNum = false;\\n        }\\n        public int calFormula() {\\n            int sum = 0;\\n            for (String s : formula) {\\n                int c1 = s.charAt(0) - 'A';\\n                if (s.length() > 3) {\\n                    int i = 1;\\n                    while (s.charAt(i) != ':') {\\n                        i++;\\n                    }\\n                    int r1 = Integer.parseInt(s.substring(1, i)) - 1;\\n                    int c2 = s.charAt(i + 1) - 'A';\\n                    int r2 = Integer.parseInt(s.substring(i + 2)) - 1;\\n                    for (i = r1; i <= r2; i++) {\\n                        for (int j = c1; j <= c2; j++) {\\n                            if (grid[i][j].isNum) {\\n                                sum += grid[i][j].val;\\n                            } else {\\n                                sum += grid[i][j].calFormula();\\n                            }\\n                        }\\n                    }\\n                } else {\\n                    int r1 = Integer.parseInt(s.substring(1)) - 1;\\n                    if (grid[r1][c1].isNum) {\\n                        sum += grid[r1][c1].val;\\n                    } else {\\n                        sum += grid[r1][c1].calFormula();\\n                    } \\n                }            \\n            }\\n            \\n            val = sum;\\n            return val;\\n        }\\n        public void setNum(int val) {\\n            this.val = val;\\n            isNum = true;\\n        }\\n    }\\n    \\n    Cell[][] grid;\\n    public Excel(int H, char W) {\\n        grid = new Cell[H][W - 'A' + 1];\\n        for (int i = 0; i < grid.length; i++) {\\n            for (int j = 0; j < grid[0].length; j++) {\\n                grid[i][j] = new Cell();\\n                grid[i][j].setNum(0);\\n            }\\n        }\\n    }\\n    \\n    public void set(int r, char c, int v) {\\n        grid[r - 1][c - 'A'].setNum(v);\\n    }\\n    \\n    public int get(int r, char c) {\\n        if (grid[r - 1][c - 'A'].isNum) {\\n            return grid[r - 1][c - 'A'].val;\\n        } else {\\n            return grid[r - 1][c - 'A'].calFormula();\\n        }\\n    }\\n    \\n    public int sum(int r, char c, String[] strs) {\\n        grid[r - 1][c - 'A'].setFormula(strs);\\n        return grid[r - 1][c - 'A'].calFormula();\\n    }\\n}\\n```"
		}
	],
	"id":"609",
	"title":"Design Excel Sum Formula",
	"content":"<p>Your task is to design the basic function of Excel and implement the function of sum formula.  Specifically, you need to implement the following functions:</p>\r\n\r\n\r\n\r\n<p><code>Excel(int H, char W):</code> This is the constructor. The inputs represents the height and width of the Excel form. <b>H</b> is a positive integer, range from 1 to 26. It represents the height. <b>W</b> is a character range from 'A' to 'Z'. It represents that the width is the number of characters from 'A' to <b>W</b>. The Excel form content is represented by a height * width 2D integer array <code>C</code>, it should be initialized to zero. You should assume that the first row of <code>C</code> starts from 1, and the first column of <code>C</code> starts from 'A'.</p>\r\n\r\n<br>\r\n\r\n<p><code>void Set(int row, char column, int val):</code> Change the value at <code>C(row, column)</code> to be val.</p>\r\n<br>\r\n<p><code>int Get(int row, char column):</code> Return the value at <code>C(row, column)</code>.</p>\r\n<br>\r\n<p><code>int Sum(int row, char column, List of Strings : numbers):</code> This function calculate and set the value at <code>C(row, column)</code>, where the value should be the sum of cells represented by <code>numbers</code>. This function return the sum result at <code>C(row, column)</code>. This sum formula should exist until this cell is overlapped by another value or another sum formula.</p>\r\n\r\n<p><code>numbers</code> is a list of strings that each string represent a cell or a range of cells. If the string represent a single cell, then it has the following format : <code>ColRow</code>. For example, \"F7\" represents the cell at (7, F). </p>\r\n\r\n<p>If the string represent a range of cells, then it has the following format : <code>ColRow1:ColRow2</code>. The range will always be a rectangle, and ColRow1 represent the position of the top-left cell, and ColRow2 represents the position of the bottom-right cell. </p>\r\n<br>\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nExcel(3,\"C\"); \r\n// construct a 3*3 2D array with all zero.\r\n//   A B C\r\n// 1 0 0 0\r\n// 2 0 0 0\r\n// 3 0 0 0\r\n\r\nSet(1, \"A\", 2);\r\n// set C(1,\"A\") to be 2.\r\n//   A B C\r\n// 1 2 0 0\r\n// 2 0 0 0\r\n// 3 0 0 0\r\n\r\nSum(3, \"C\", [\"A1\", \"A1:B2\"]);\r\n// set C(3,\"C\") to be the sum of value at C(1,\"A\") and the values sum of the rectangle range whose top-left cell is C(1,\"A\") and bottom-right cell is C(2,\"B\"). Return 4. \r\n//   A B C\r\n// 1 2 0 0\r\n// 2 0 0 0\r\n// 3 0 0 4\r\n\r\nSet(2, \"B\", 2);\r\n// set C(2,\"B\") to be 2. Note C(3, \"C\") should also be changed.\r\n//   A B C\r\n// 1 2 0 0\r\n// 2 0 2 0\r\n// 3 0 0 6\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You could assume that there won't be any circular sum reference. For example, A1 = sum(B1) and B1 = sum(A1).</li>\r\n<li> The test cases are using double-quotes to represent a character.</li>\r\n<li>Please remember to <b>RESET</b> your class variables declared in class Excel, as static/class variables are <b>persisted across multiple test cases</b>. Please see <a href=\"https://leetcode.com/faq/#different-output\">here</a> for more details.</li>\r\n</ol>\r\n</p>",
	"frequency":"62",
	"ac_num":"1643"
}