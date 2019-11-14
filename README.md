# Making a Mario-type Game with Canvas

This project was made for my Ironhack Game project. The idea was to create a super mario bros type game in 2d  with canvas. This is a super simplified version with sprites, animations, collision detection... 

The game can be played at  [here](https://esalamanca.github.io/canvas-dinoGame/). The game is wrapped into a [game bootstrap](https://github.com/ESalamanca/canvas-dinoGame) project that you can use to quickly get started. I recommend checking out the source code. It can run locally by opening `index.html`.

![](https://i.imgur.com/qcXQzSZ.png)

## JS Libraries

I essentially used basic javascript with the possibilities offered by the [Canvas html tag](https://html.spec.whatwg.org/multipage/canvas.html)

To handle the loading of images, I used the PreloadJS library from the [CreateJS](https://www.createjs.com/) suite. The code is in the `ressources.js`file. 

## Using free graphics 

There are many websites that offer free game assets. I found almost all I needed on www.gameart2d.com. You can the create your own sprites with online tools such as https://www.codeandweb.com/free-sprite-sheet-packer. 

## Game Dynamics 

### Game components: 
-The Dino, principal character. The aim of the game is to gather a maximum of points before dying. It gets harder with time and score. 

-Mushrooms and Birds : those are generated randomly and come from the left or the right. The Dino dies if there is a collision. 

-Eggs: normal eggs provide 1pt, silver eggs provide 2pts and an "armour" that prevents the dino from dying when there is a collision with a Mushroom or a Bird and golden eggs provide 5pts. Eggs appear regularly, golden and silver eggs are rarer and all types of eggs disappear after 10s. 

-The platforms that enable to catch a maximum of eggs. When the score has reached 16 and the player has played for more than 30s, a new set of platforms are generated. Then every 30s, the platforms are generated again. 

-The ground/background : just for graphics 

### Game animation: 
The game runs into an Animation Loop that continuously updates and draws all the components `requestAnimationFrame() ` 

In order to animate the dino and the birds, the images of the component change with time through the technique of "Sprites". 

When the Dino Dies, the image of the dead dino appears before the Game Over Screen is displayed  


