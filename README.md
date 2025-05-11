# typing-monkey

## Infinite Monkey Theorem

The infinite monkey theorem states that if a monkey hits keys randomly on a typewriter for an endless amount of time, he will eventually type out any given text. This includes full William Shakespeare plays, rap songs, and newspaper articles. Anything written can and eventually will be typed out by the monkey. I suggest visiting its Wikipedia page to read about this theorem more in-depth. There, they go into the proofs and math behind it.

## Inspiration

This theorem intrigued me when I first heard of it, mostly because of the name. I also like how it puts the idea of infinity into perspective. Although other websites already exist based upon this theorem, I still thought it would be an amusing personal project. This website was not based on any of those other websites. This is my take on the infinite monkey theorem.

## Behind the Scenes (About the Code)

This webpage was written with HTML, CSS, and Javascript. It uses the “Holy Grail” layout via a CSS grid. I am still working on my style,but I am pleased with how this webpage turned out.

There was some trial and error on the backend. The “monkey that is typing” is a method that randomly picks a character from “a - z”. That character is then added to a temporary working string. There are four outcomes once that new character is added to the word. The word is either a prefix and a word, prefix and not a word, not a prefix and a word, not a prefix or word. These conditions are checked whenever a character is added.

Originally, I went with an API-based solution to get more experience with them. Unfortunately, waiting for the API hindered the program's speed, leading to little words being “typed”. I changed course with a local dictionary implemented as a de la Briandais Trie (DLB). This DLB is stored in a JSON file within the webpage. This greatly increased the speed and output of our “monkey”.
