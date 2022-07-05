# HITMAN Milliseconds Time Calculator

## Site URL (Try it Yourself!)
**https://solderq35.github.io/time-calc-under-5/**

## About
Tool for calculating in-game time milliseconds for HITMAN level speedruns, **with an estimated 20 regular users among the HITMAN speedrun community**.

Technologies Used:
  * Lightweight site built with vanilla Javascript, HTML, CSS.
  * Deployed on Github Pages


### Usage Instructions and Screenshots
1.  Most video examples from [here](https://www.youtube.com/results?search_query=hitman+3+speedrun&sp=EgIYAQ%253D%253D) or [here](https://www.speedrun.com/hitman_3) will work for getting the right inputs if you have trouble finding applicable Hitman speedrun videos.
2.  For this example, let's use [this video](https://www.youtube.com/watch?v=zIRAmZdl-y4), which is an 8 second run of the "On Top of the World" Hitman level.
3. We can see that the end of this video that the score at the end of the video is `83,521`. As shown here: ![Score](https://media.discordapp.net/attachments/833505136290299935/993958134945169418/unknown.png?width=947&height=670)
4. Now, let's enter `83521` into the "Score" input field on the Milliseconds Calculator Site, and "8" into the "Seconds" field of the "Time Shown on Rating Screen" section, as shown:
![Milliseconds Score](https://media.discordapp.net/attachments/833505136290299935/993961684886622229/unknown.png?width=1429&height=669)
5. Voila! As shown above, the exact millisecond time (8.981) is calculated and displayed immediately. Click on "More Info on Time Calculation" to get more insight on the mathematics behind this site.

### Site Limitations
* It will work for any HITMAN level completed in less than 15 minutes.   
  * Note that for any HITMAN level runs of 5 to 15 minutes, you should head over to https://solderq35.github.io/time-calc-under-5/over5.
* As noted in the site itself, scores of 0 will cause the score calculation formula to fail.
* There is a certain level of (minor) discrepancy in the calculated milliseconds, since the game seems to track decimal values for scores as well. However, this calculator is as accurate as it can be given what is shown on the rating screen.

