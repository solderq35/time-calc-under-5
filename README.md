# HITMAN Milliseconds Time Calculator

## Site URL (Try it Yourself!)
**https://solderq35.github.io/time-calc-under-5/**

Don't like using a website? Check our **[Discord Bot Version of This](https://github.com/solderq35/timmy-mk-3)**

## About
Tool for calculating in-game time milliseconds for HITMAN level speedruns, **with an estimated 20 regular users among the HITMAN speedrun community**.

### Technologies Used:
  * Lightweight site built with vanilla Javascript, HTML, CSS.
  * Deployed on Github Pages


### Usage Instructions and Screenshots
1.  Most video examples from [here](https://www.youtube.com/results?search_query=hitman+3+speedrun&sp=EgIYAQ%253D%253D) or [here](https://www.speedrun.com/hitman_3) will work for getting the right inputs if you have trouble finding applicable Hitman speedrun videos.
2.  For this example, let's use [this video](https://www.youtube.com/watch?v=zIRAmZdl-y4), which is an 8 second run of the "On Top of the World" Hitman level.
3. We can see that the end of this video that the score at the end of the video is `83,521`. As shown here: ![Score](https://i.ibb.co/DG3xzbt/goronscore.png)
4. Now, let's enter `83521` into the "Score" input field on the Milliseconds Calculator Site, and "8" into the "Seconds" field of the "Time Shown on Rating Screen" section, as shown:
![Milliseconds Score](https://i.ibb.co/z8MsCsv/demo.png)
5. Voila! As shown above, the exact millisecond time (8.981) is calculated and displayed immediately. Click on "More Info on Time Calculation" to get more insight on the mathematics behind this site.

### Mathematics/ Code Explanation

The full mathematical formula for calculating in game time from score, for runs of less than 5 minutes in-game time, is:  
  
**(210,000 - (N \* 100,000 / M)) \* (3 / 400)**  
  
The full mathematical formula for calculating in game time from score, for runs of 5 to 15 minutes, is:  
  
**(175,000 - (N \* 100,000 / M)) \* (3 / 50)**  
  
Let N = The Score shown on screen.  
Let M = The Bonuses and Penalties added up.  
  
Each Silent Assassin Bonus (Objectives Complete, Never Spotted, No Noticed Kills, No Bodies Found, No Recordings) is 20k points towards the M value, while each nontarget kill is -5k points towards the M value. Note that the Time Bonus does not count towards the M value. The maximum M value is 100,000.  
  
[If confused by terminology in above paragraph, refer to this reference image of Detailed Score (press P on a Hitman mission rating screen to get to this menu in-game)](https://i.ibb.co/BPPf3wn/detailedscore.png)  
  
Since most players do not show Detailed Score Menu in their run submissions, this site runs a script to account for all 20 possible M values, and calculates 20 possible decimal times as a result. The user is asked to report the the time shown on the rating screen (which rounds down to the nearest second). The calculated decimal time that is closest to the time shown on the rating screen is displayed to the user.  
  
Any decimal values smaller than 0.001 seconds in the final result are rounded down. In addition, in some rare cases, the rating screen time does not match the calculated decimal time rounded down to the nearest second. These can be manually rounded to the next fastest second as needed for leaderboard purposes.  

### Usage Quirks

*   This formula does not work when the N value (Score) and/or M value (Penalties/Bonuses) are 0. Note that one of the Silent Assassin bonuses is "Objectives Complete", and you are almost guaranteed to get points for this simply by killing all targets and exiting the mission. The score can become 0 either due to:

*   Killing too many nontargets (each nontarget kill is -5k in the Bonuses and Penalties (M) score).
*   Finishing the mission in less than 7 seconds (IOI's "anticheat", currently this only applies to Dubai any% in terms of main missions).

*   Any decimal values smaller than a millisecond in the final result are rounded down to the nearest millisecond.

*   Example: 26.1857 rounds down to 26.185.

*   Disclaimer: The calculated decimal score is not quite accurate (due to the game internally tracking decimals in the score). These can be manually rounded to the next fastest second as needed for leaderboard purposes.
    *   Example: 27.000 seconds (calculated via score) may need to be rounded down to 26.999 manually, if the rating screen shows 26 seconds.
    *   To be precise: **Error = (Z \* 100,000 / M) \* (3 / 400)**  
        *   Where M = the penalties and bonuses added up (each SA bonus 20k, ntk -5k, etc)
        *   And Z= how much the score shown on screen is off, between 0 and 1
    *   Assuming Z is up to 0.999, the error can be as low as 0.0075 seconds (for SA run) or as high as 0.15 seconds (any% run with M score of 5k).

