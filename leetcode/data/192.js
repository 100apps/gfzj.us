{
	"difficulty":"2",
	"submit_num":"41699",
	"show_id":"192",
	"leetcode_id":"192",
	"answers":[
		{
			"lc_ans_id":"55443",
			"view":"15145",
			"top":"0",
			"title":"My simple solution (one line with pipe)",
			"vote":"53",
			"content":"```\\ncat words.txt | tr -s ' ' '\\\\n' | sort | uniq -c | sort -r | awk '{ print $2, $1 }'\\n```\\n\\n**tr -s**: truncate the string with target string, but only remaining one instance (e.g. multiple whitespaces)\\n\\n**sort**: To make the same string successive so that `uniq` could count the same string fully and correctly.\\n\\n**uniq -c**: uniq is used to filter out the repeated lines which are successive, -c means counting\\n\\n**sort -r**: -r means sorting in descending order\\n\\n**awk '{ print $2, $1 }'**: To format the output, see [here][1].\\n\\n\\n  [1]: http://linux.cn/article-3945-1.html"
		},
		{
			"lc_ans_id":"55462",
			"view":"4477",
			"top":"1",
			"title":"Solution using awk and pipes with explaination",
			"vote":"11",
			"content":"\\n1. I should count the words. So I chose the `awk` command.\\n  - I use a dictionary in `awk`. For every line I count every word in the dictionary.\\n  - After deal with all lines. At the `END`, use `for (item in Dict) { #do someting# } ` to print every words and its frequency.\\n2. Now the printed words are unsorted. Then I use a `|` pipes and sort it by `sort`\\n  - `sort -n` means \"compare according to string numerical value\".\\n  - `sort -r` means \"reverse the result of comparisons\".\\n  - `sort -k 2` means \"sort by the second word\"\\n\\n---\\n\\n\\n    awk '\\\\\\n    { for (i=1; i<=NF; i++) { ++D[$i]; } }\\\\\\n    END { for (i in D) { print i, D[i] } }\\\\\\n    ' words.txt | sort -nr -k 2\\n\\n---\\n\\nAre there any other solutions without `awk`?  \\nSuch as using `sed` or `grep`."
		},
		{
			"lc_ans_id":"55470",
			"view":"2416",
			"top":"2",
			"title":"My accepted answer using tr, sort, uniq and awk",
			"vote":"7",
			"content":"    tr -s ' ' '\\\\n' < words.txt|sort|uniq -c|sort -nr|awk '{print $2, $1}'"
		},
		{
			"lc_ans_id":"55472",
			"view":"1728",
			"top":"3",
			"title":"Share my accepted solution, using awk and sort!",
			"vote":"5",
			"content":"    cat words.txt | awk '{for(i=1;i<=NF;++i){count[$i]++}} END{for(i in count) {print i,count[i]}}' | sort -k2nr"
		},
		{
			"lc_ans_id":"55464",
			"view":"607",
			"top":"4",
			"title":"My 16ms unix-pipe cat+tr+awk+sort+(hash) solution",
			"vote":"3",
			"content":"    # Read from the file words.txt and output the word frequency list to stdout.\\n    \\n    # use cat+tr+awk+sort\\n    # use hashtables\\n    # use Unix pipes\\n    \\n    cat words.txt | \\\\\\n    tr -s ' ' '\\\\n' | \\\\\\n    awk '{nums[$1]++}END{for(word in nums) print word, nums[word]}' | \\\\\\n    sort -rn -k2"
		},
		{
			"lc_ans_id":"55449",
			"view":"2266",
			"top":"5",
			"title":"My 1 line solution using awk, sort and pipe",
			"vote":"3",
			"content":"\\nFirst, use awk to count the number for each word.\\nThen sort to sort the result by decreasing order.\\n\\n    awk '{for(i=1;i<=NF;i++) a[$i]++} END {for(k in a) print k,a[k]}' words.txt | sort -k2 -nr"
		},
		{
			"lc_ans_id":"55454",
			"view":"1776",
			"top":"6",
			"title":"My AC solution(one pipe command but cost 20ms)",
			"vote":"2",
			"content":"    grep -oE '[a-z]+' words.txt | sort | uniq -c | sort -r | awk '{print $2\" \"$1}' \\n\\nbut it costs 20ms."
		},
		{
			"lc_ans_id":"55467",
			"view":"538",
			"top":"7",
			"title":"Use sed to strip the spaces\\uff0c one line solution with explain",
			"vote":"2",
			"content":"sed 's/^\\\\s\\\\+//g; s/\\\\s\\\\+/ /g; s/\\\\s\\\\+$//g' words.txt | tr ' ' '\\\\n' | sort | uniq -c | sort -nr | awk -F' ' '{print $2\" \"$1}'\\n\\n1. use sed to strip head & tail spaces\\uff0cand change inline spaces to one space\\n2. use tr to trans space to return (these two steps also can be done cat words.txt | tr -s ' ' '\\\\n') \\n3. sort the words\\n4. uniq to count words\\n5. sort the stats result\\uff0c-n for numeric sort\\uff0c-r for reverse\\n6. use awk to format the output"
		},
		{
			"lc_ans_id":"55465",
			"view":"968",
			"top":"8",
			"title":"1 Line Solution using Pipes",
			"vote":"2",
			"content":"    cat words.txt | tr '\\\\n' ' ' | sed \"s/\\\\s\\\\s*/ /g\" | awk -v RS=' ' '{print $0}' | sort | uniq -c | sort -nr -k1 | awk '{print $2\" \"$1}'\\n\\n**cat word.txt** :\\noutput the text in the file\\n\\n**tr '\\\\n' ' '** :\\nsubstitute endlines with single space\\n\\n**sed \"s/\\\\s\\\\s*/ /g\"** :\\nsubstitute multiple spaces with single space\\n\\n**awk -v RS=' ' '{print $0}'** :\\noutput one word per line by changing Record Separator in AWK to single space. $0 is the entire record (1 word).\\n\\n**sort** :\\nsort alphabetically the list of words (with repetitions) to prepare it for uniq command.\\n\\n**uniq -c** :\\nprint the list of unique words with their count. Before uniq you need to sort the list of words.\\n\\n**sort -nr -k1** :\\nsort the list of unique words by their count  (-nr numerical reverse sorting) (-k1 sort by the first field that is the count of repetitions for the current word)\\n\\n**awk '{print $2\" \"$1}'** :\\nfor each line print before the second field $2, that is the word, and then the first field that is the count of repetitions for the word."
		},
		{
			"lc_ans_id":"55463",
			"view":"752",
			"top":"9",
			"title":"My solution using only awk",
			"vote":"1",
			"content":"    cat words.txt | awk '{for(i=1;i<=NF;++i) { arr[$i]++; } } END { x=0; for(var in arr) {newarr[arr[var]]=var; if(arr[var]>x) x=arr[var];} for(i=x;i>0;--i) if (newarr[i] > 0) print newarr[i] \" \"i; }'"
		}
	],
	"id":"192",
	"title":"Word Frequency",
	"content":"<p>Write a bash script to calculate the frequency of each word in a text file <code>words.txt</code>.</p>\r\n\r\n<p>For simplicity sake, you may assume:</p>\r\n<ul>\r\n<li><code>words.txt</code> contains only lowercase characters and space <code>' '</code> characters.</li>\r\n<li>Each word must consist of lowercase characters only.</li>\r\n<li>Words are separated by one or more whitespace characters.</li>\r\n</ul>\r\n</p>\r\n\r\n<p>For example, assume that <code>words.txt</code> has the following content:</p>\r\n<pre>the day is sunny the the\r\nthe sunny is is\r\n</pre>\r\n\r\nYour script should output the following, sorted by descending frequency:\r\n<pre>\r\nthe 4\r\nis 3\r\nsunny 2\r\nday 1\r\n</pre>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nDon't worry about handling ties, it is guaranteed that each word's frequency count is unique.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">[show hint]</a></p>\r\n<div class=\"spoilers\"><b>Hint:</b><br />\r\nCould you write it in one-line using <a href=\"http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-4.html\">Unix pipes</a>?\r\n</div>",
	"frequency":"555",
	"ac_num":"10801"
}