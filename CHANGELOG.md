# Change Log

## 1.0.0

Basic featureset implemented

- Settings
  - Set directory where scripts live
  - Set speed of typing in ms
  - Set queue position (queue uses fs to read files into array and queue position works off of array...stays static in workspace)
- Status Bar
  - Always shows current queue position and moves as playing happens
- Commands
  - Play all scripts (from beginning)
  - Play next script
  - Play next <#> scripts
  - Play all remaining scripts
  - Play specific script by name (does not affect queue position)
  - Play queue from position to position
  - Set queue position
  - Set typing delay (takes affect immediately even if script is currently playing to speed up or slow down during long scripts)