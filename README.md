# **With One Vision Live Coder**

First off, we freely admit this was borrowed and ported from the existing extension auto-type, but that had some features we didn't need, did not work on Windows, and had not been updated in a few years, so we borrowed the idea and coded it to our needs.  This extension is simply meant to take an existing "script" file and allow you to place your cursor anywhere in any file and have that "script" replayed verbatim.  Some good uses for this are:
- A live-coding scenario where you need something typed out as you are presenting to pass some time while you're talking but you don't need the "peril" of typing on the fly while trying to present.
- A video scenario in which you need part of the video to show "live-coding" at different speeds.

## **Feature Set**

- **Settings**
  - _**Directory**_ => Set directory where scripts live (defaults to /.liveCoder).  Any scripts to be "played" are to be placed in this folder.
  - _**Typing Speed**_ => Set speed of typing in ms (defaults to 250).  Useful at slower speeds for explanations and useful at higher speeds for video production.
  - _**Queue Position**_ => Set queue position.  The "Queue" is the alpha-sorted list of scripts in the script directory.  The queue uses fs to read those files into an array and queue position shows the current 1-based position of the array.
- **Status Bar**
  - _**Queue Position**_ => Always shows current queue position and moves as the script player advances
- **Commands**
  - _**Play all scripts**_ => Start at the beginning of the queue (irrespective of current position) and play to the end (resetting the queue position at the end).
  - _**Play next script**_ => Play the next script in the queue (advances the queue position).
  - _**Play next <#> scripts**_ => Play the desired next number of scripts (advances the queue position).  Good for breaking up code but playing sections at a time.
  - _**Play all remaining scripts**_ => Starts at the current queue position and plays all remaining scripts until the end of the queue (queue position advances and then resets at the end).
  - _**Play specific script by name**_ => Play a script by its file name (does not affect queue position).
  - _**Play queue from position to position**_ => Resets the queue position to your given beginning position and plays until your given ending position (affects the queue position along the way).
  - _**Set queue position**_ => Simply sets the queue position so you can queue things up as you are speaking or presenting.  Only affects the workspace...not the global setting.
  - _**Set typing delay**_ => Sets the typing delay.  This takes affect immediately even if script is currently playing to speed up or slow down during long scripts.  Only affects the workspace...not the global setting.
