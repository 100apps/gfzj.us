{
	"difficulty":"1",
	"submit_num":"71615",
	"show_id":"195",
	"leetcode_id":"195",
	"answers":[
		{
			"lc_ans_id":"55544",
			"view":"13910",
			"top":"0",
			"title":"Share four different solutions",
			"vote":"57",
			"content":"\\n    # Solution 1\\n    cnt=0\\n    while read line && [ $cnt -le 10 ]; do\\n      let 'cnt = cnt + 1'\\n      if [ $cnt -eq 10 ]; then\\n        echo $line\\n        exit 0\\n      fi\\n    done < file.txt\\n\\n    # Solution 2\\n    awk 'FNR == 10 {print }'  file.txt\\n    # OR\\n    awk 'NR == 10' file.txt\\n\\n    # Solution 3\\n    sed -n 10p file.txt\\n\\n    # Solution 4\\n    tail -n+10 file.txt|head -1"
		},
		{
			"lc_ans_id":"55529",
			"view":"6535",
			"top":"1",
			"title":"Super simple solution",
			"vote":"18",
			"content":"    awk 'NR == 10' file.txt\\n\\nNR: the current row number (start from 1).\\nBecause the default action of awk is {print $0}, we can ignore the action."
		},
		{
			"lc_ans_id":"55537",
			"view":"5435",
			"top":"2",
			"title":"My three simple solutions",
			"vote":"15",
			"content":"    # Read from the file file.txt and output the tenth line to stdout.\\n    \\n    #Solution One:\\n    #head -n 10 file.txt | tail -n +10\\n    \\n    #Solution Two:\\n    #awk 'NR==10' file.txt\\n    \\n    #Solution Three:\\n    sed -n 10p file.txt"
		},
		{
			"lc_ans_id":"55539",
			"view":"2376",
			"top":"3",
			"title":"A generalized approach with head/tail",
			"vote":"9",
			"content":"Extract NLINES lines from STARTING line\\n\\n    STARTING=10; NLINES=1; cat file.txt | tail -n+${STARTING} | head -n${NLINES}"
		},
		{
			"lc_ans_id":"55552",
			"view":"1714",
			"top":"4",
			"title":"Simple Solution using AWK",
			"vote":"6",
			"content":"    awk '{if(NR==10) print $0}' file.txt\\n\\nIf the record number (NR) is 10, print the entire record $0.\\nNR in AWK by default is any single line (en of record delimiter is \\\\n).\\nRecords start numbering from 1."
		},
		{
			"lc_ans_id":"55547",
			"view":"1037",
			"top":"5",
			"title":"My solution by using head and tail",
			"vote":"4",
			"content":"    tail -n +10 file.txt | head -n 1"
		},
		{
			"lc_ans_id":"55549",
			"view":"524",
			"top":"6",
			"title":"Share a solution based on array",
			"vote":"3",
			"content":"Since there already have solutions based on `awk` or `sed` or `head | tail`, here is a unique soluton.\\n\\n    IFS=$'\\\\n' ;arr=($(<file.txt)); echo ${arr[9]}"
		},
		{
			"lc_ans_id":"55546",
			"view":"1255",
			"top":"7",
			"title":"12 ms awk based solution",
			"vote":"2",
			"content":"This is all it takes. I tried to do the same thing with sed, but I couldn't remember how to do it with sed.\\n\\n    awk 'NR == 10' < file.txt\\n\\nGiven that the awk binary is slightly larger than the sed binary on my box I wonder if I'll get better runtime using sed, since some of the runtime will be affected by loading that binary before executing it. But given that those binaries are so small (on my OS X box), I wonder if it will make a difference.\\n\\n    panzani leetcode$ which sed\\n    /usr/bin/sed\\n    panzani leetcode$ du -h /usr/bin/sed\\n     20K\\t/usr/bin/sed\\n    panzani leetcode$ which awk \\n    /usr/bin/awk\\n    panzani leetcode$ du -h /usr/bin/awk \\n     52K\\t/usr/bin/awk"
		},
		{
			"lc_ans_id":"55550",
			"view":"793",
			"top":"8",
			"title":"Very neat solution using Awk!",
			"vote":"2",
			"content":"Only one line in awk\\n    \\n    awk 'NR == 10' file.txt"
		},
		{
			"lc_ans_id":"55543",
			"view":"1172",
			"top":"9",
			"title":"A \"pure bash\" solution",
			"vote":"1",
			"content":"    #!/bin/env bash\\n    # Read from the file file.txt and output the tenth line to stdout.\\n    \\n    filename=${1:-file.txt}\\n    lineth=${2:-10}\\n    \\n    i=$lineth\\n    while read line && ((--i))\\n    do\\n        :\\n    done <$filename\\n    \\n    if [[ $i -gt 0 ]]\\n    then\\n        #echo \"This file has not enough lines\"\\n        exit 1\\n    fi\\n    \\n    echo $line\\n\\nI had thought that this solution may has an better efficiency than such as `tail -n+10 file.txt|head -1` which forks other processes, but I am wrong.\\n\\nThe above solution only beats 3% submissions while `tail&&head` combination beats 17% submissions, I don't know why...."
		}
	],
	"id":"195",
	"title":"Tenth Line",
	"content":"<p>How would you print just the 10th line of a file?</p>\r\n\r\n<p>For example, assume that <code>file.txt</code> has the following content:</p>\r\n<pre>\r\nLine 1\r\nLine 2\r\nLine 3\r\nLine 4\r\nLine 5\r\nLine 6\r\nLine 7\r\nLine 8\r\nLine 9\r\nLine 10\r\n</pre>\r\n\r\nYour script should output the tenth line, which is:\r\n<pre>\r\nLine 10\r\n</pre>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">[show hint]</a></p>\r\n<div class=\"spoilers\"><b>Hint:</b><br />\r\n1. If the file contains less than 10 lines, what should you output?<br>\r\n2. There's at least three different solutions. Try to explore all possibilities.\r\n</div>",
	"frequency":"609",
	"ac_num":"23958"
}